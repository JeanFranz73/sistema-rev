<script>
import { mapState } from 'pinia'
import { getPrice } from '@/utils'
import api from '@/utils/api'
import { asPhone } from '@/utils/validator'
import { useSessionStore } from '@/stores'

export default {
    name: 'OrderView',
    data: () => ({
        loading: true,
        categories: [],
        deliveryDays: [],
        user: {},
        order: {},
    }),
    computed: {
        ...mapState(useSessionStore, ['isAdmin']),
        getCategory() {
            return (id) => {
                const category = this.categories.find(category => category.id === id)
                return category ? category.name : ''
            }
        },
        getDeliveryDay() {
            return (id) => {
                const deliveryDay = this.deliveryDays.find(deliveryDay => deliveryDay.id === id)
                return deliveryDay ? `${deliveryDay.name} - ${deliveryDay.desc}` : ''
            }
        },
        getPedidoPgtoStatus() {
            return (status) => {
                switch (status) {
                default:
                case 1:
                    return {
                        desc: 'Pendente',
                        badge: 'secondary',
                        icon: 'clock'
                    }
                case 2:
                    return {
                        desc: 'Pago',
                        badge: 'success',
                        icon: 'check'
                    }
                case 3:
                    return {
                        desc: 'Cancelado',
                        badge: 'danger',
                        icon: 'x'
                    }
                }
            }
        },
        getPedidoEntregaStatus() {
            return (status) => {
                switch (status) {
                default:
                case 1:
                    return {
                        desc: 'Pendente',
                        badge: 'secondary',
                        icon: 'clock'
                    }
                case 2:
                    return {
                        desc: 'Entregue',
                        badge: 'success',
                        icon: 'check'
                    }
                case 3:
                    return {
                        desc: 'Cancelado',
                        badge: 'danger',
                        icon: 'x'
                    }
                }
            }
        },
    },
    methods: {
        getPrice,
        updateOrder(update) {
            api.patch(`/order/${this.order.id}`, update)
                .then(() => {
                    api.get(`/order/${this.order.id}`)
                        .then(({ data }) => {
                            this.order = data
                        })
                        .catch(() => {
                            this.$toasts.error('Erro ao carregar pedido.')
                        })
                    this.$toasts.success('Pedido atualizado com sucesso.')
                })
                .catch(() => {
                    this.$toasts.error('Erro ao atualizar pedido.')
                })
        },
    },
    mounted() {
        api.get('/product/categories')
            .then(({ data }) => {
                this.categories = data
            })
            .catch(() => {
                this.$toasts.error('Erro ao carregar categorias.')
            })

        api.get('/delivery-days')
            .then(({ data }) => {
                this.deliveryDays = data
            })
            .catch(() => {
                this.$toasts.error('Erro ao carregar dias de entrega.')
            })

        api.get(`/order/${this.$route.params.id}`)
            .then(({ data }) => {
                this.order = data

                api.get(`/user/${data.user}`)
                    .then(({ data }) => {
                        this.user = { ...data, phone: asPhone(data.phone) }
                    })
                    .catch(() => {
                        this.$toasts.error('Erro ao carregar usuário.')
                    })
            })
            .catch(() => {
                this.$toasts.error('Erro ao carregar pedido.')
            })
            .finally(() => {
                this.loading = false
            })
    }
}
</script>

<template>
    <div class="container-small">
        <nav class="mb-2" aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'dashboard' }">
                        Painel
                    </router-link>
                </li>
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'orders' }">
                        Pedidos
                    </router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Pedido #{{ $route.params.id }}</li>
            </ol>
        </nav>
        <div class="d-flex justify-content-between align-items-end mb-4">
            <h2 class="mb-0">Detalhes do Pedido</h2>
            <div>
                <div v-if="isAdmin" class="dropdown font-sans-serif d-inline-block">
                    <button class="btn btn-snipe-secondary me-2 dropdown-toggle" id="dropdownPayment" data-bs-toggle="dropdown">
                        <icones type="cash" class="me-sm-2" />
                        <span class="d-none d-sm-inline-block">Status de pagamento</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end py-0" aria-labelledby="dropdownPayment" style="">
                        <a class="dropdown-item" @click="updateOrder({payment_status: 1})">Pendente</a>
                        <a class="dropdown-item" @click="updateOrder({payment_status: 2})">Pago</a>
                        <a class="dropdown-item" @click="updateOrder({payment_status: 3})">Cancelado</a>
                    </div>
                </div>
                
                <div v-if="isAdmin" class="dropdown font-sans-serif d-inline-block">
                    <button class="btn btn-snipe-secondary me-2 dropdown-toggle" id="dropdownDelivery" data-bs-toggle="dropdown">
                        <icones type="truck" class="me-sm-2" />
                        <span class="d-none d-sm-inline-block">Status de entrega</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end py-0" aria-labelledby="dropdownDelivery" style="">
                        <a class="dropdown-item" @click="updateOrder({delivery_status: 1})">Pendente</a>
                        <a class="dropdown-item" @click="updateOrder({delivery_status: 2})">Entregue</a>
                        <a class="dropdown-item" @click="updateOrder({delivery_status: 3})">Cancelado</a>
                    </div>
                </div>
                
                <button class="btn btn-snipe-secondary me-2">
                    <icones type="download" class="me-sm-2" />
                    <span class="d-none d-sm-inline-block">Baixar</span>
                </button>
                <button class="btn btn-snipe-secondary">
                    <icones type="printer" class="me-sm-2" />
                    <span class="d-none d-sm-inline-block">Imprimir</span>
                </button>
            </div>
        </div>
        <div class="bg-soft dark__bg-1100 p-4 mb-4 rounded-2">
            <div class="row g-4">
                <div class="col-12 col-lg-3">
                    <div class="row g-4 g-lg-2">
                        <div class="col-12 col-sm-6 col-lg-12">
                            <div class="row align-items-center g-0">
                                <div class="col-auto col-lg-6 col-xl-5">
                                    <h6 class="mb-0 me-3">Pedido Nº:</h6>
                                </div>
                                <div class="col-auto col-lg-6 col-xl-7">
                                    <p class="fs--1 text-800 fw-semi-bold mb-0">#{{ order.id ?? '' }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-lg-12">
                            <div class="row align-items-center g-0">
                                <div class="col-auto col-lg-6 col-xl-5">
                                    <h6 class="me-3">Data :</h6>
                                </div>
                                <div class="col-auto col-lg-6 col-xl-7">
                                    <p class="fs--1 text-800 fw-semi-bold mb-0">{{ new Date(order.created).toLocaleString() }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-lg-12">
                            <div class="row align-items-center g-0">
                                <div class="col-auto col-lg-6 col-xl-5">
                                    <h6 class="me-3">Pagamento: </h6>
                                </div>
                                <div class="col-auto col-lg-6 col-xl-7">
                                    <span class="badge badge-snipe fs--2"
                                          :class="`badge-snipe-${getPedidoPgtoStatus(order.payment_status).badge}`">
                                        <span class="badge-label">{{ getPedidoPgtoStatus(order.payment_status).desc }}</span>
                                        <icones class="ms-1" :type="getPedidoPgtoStatus(order.payment_status).icon" size="12.8" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-lg-12">
                            <div class="row align-items-center g-0">
                                <div class="col-auto col-lg-6 col-xl-5">
                                    <h6 class="me-3">Entrega: </h6>
                                </div>
                                <div class="col-auto col-lg-6 col-xl-7">
                                    <span class="badge badge-snipe fs--2"
                                          :class="`badge-snipe-${getPedidoEntregaStatus(order.delivery_status).badge}`">
                                        <span class="badge-label">{{ getPedidoEntregaStatus(order.delivery_status).desc }}</span>
                                        <icones class="ms-1" :type="getPedidoEntregaStatus(order.delivery_status).icon" size="12.8" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-lg-5">
                    <div class="row g-4 gy-lg-5">
                        <div class="col-12 col-lg-8">
                            <h6 class="mb-2 me-3">Vendido por:</h6>
                            <p class="fs--1 text-800 fw-semi-bold mb-0">Divar Semijóias</p>
                        </div>
                        <div class="col-12 col-lg-4">
                            <h6 class="mb-2">Dia de entrega</h6>
                            <p class="fs--1 text-800 fw-semi-bold mb-0">{{ getDeliveryDay(user.delivery_day) }}</p>
                        </div>
                        <div class="col-12 col-lg-4">
                            <h6 class="mb-2"> Instagram:</h6>
                            <p class="fs--1 text-800 fw-semi-bold mb-0">@divar.semijoias</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-lg-4">
                    <div class="row">
                        <div class="col-12 col-lg-6">
                            <h6 class="mb-2"> Usuário </h6>
                            <div class="fs--1 text-800 fw-semi-bold mb-0">
                                <p class="mb-2">{{ user.name }}</p>
                                <p class="mb-2">{{ user.email }}</p>
                                <p class="mb-2"></p>
                                <p class="mb-0">{{ user.phone }}</p>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <h6 class="mb-2"> Endereço de entrega </h6>
                            <div class="fs--1 text-800 fw-semi-bold mb-0">
                                <p class="mb-2">Rua alameda etc</p>
                                <p class="mb-2">123, Rua dos Bobos,</p>
                                <p class="mb-2">Centro - Lajeado</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="px-0 pb-2">
            <div class="table-responsive scrollbar">
                <table class="table fs--1 text-900 mb-0">
                    <thead class="bg-200">
                        <tr>
                            <th scope="col" style="min-width: 24px;"></th>
                            <th scope="col" style="min-width: 60px;">#</th>
                            <th scope="col" style="min-width: 360px;" colspan="5">Produto</th>
                            <th class="ps-5" scope="col" style="min-width: 150px;">Categoria</th>
                            <th class="text-end" scope="col" style="min-width: 80px;">Quantidade</th>
                            <th class="text-end" scope="col" style="min-width: 100px;">Preço unid.</th>
                            <th class="text-end" scope="col" style="min-width: 60px;">Total</th>
                            <th scope="col" style="min-width: 24px;"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in order.products" :key="product.id">
                            <td class="border-0"></td>
                            <td class="align-middle">1</td>
                            <td class="align-middle" colspan="5">
                                <p class="line-clamp-1 mb-0 fw-semi-bold">{{ product.name }}</p>
                            </td>
                            <td class="align-middle ps-5">{{ getCategory(product.category) }}</td>
                            <td class="align-middle text-700 fw-semi-bold text-end">{{ product.amount }}</td>
                            <td class="align-middle text-end text-1000 fw-semi-bold">{{ getPrice(product.unit_price) }}</td>
                            <td class="align-middle text-end fw-semi-bold">{{ getPrice(product.unit_price * product.amount) }}</td>
                            <td class="border-0"></td>
                        </tr>
                        <tr class="bg-200">
                            <td class="align-middle ps-4 fw-bold text-1000" colspan="8"></td>
                            <td class="align-middle fw-bold text-1000 text-end" colspan="2">Total</td>
                            <td class="align-middle text-end fw-bold">{{ getPrice(order.total) }}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>