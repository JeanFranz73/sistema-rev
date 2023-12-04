<script>
import api from '@/utils/api'
import { asPhone } from '@/utils/validator'
import { installList, getAvatar } from '@/helpers'

export default {
    name: 'UserDetails',
    data: () => ({
        loading: true,
        avatar: '',
        noAvatar: false,
        pedidos: [],
        user: {
            initial: '',
            name: 'Nome de usuário',
            phone: '00000000000',
            username: 'usuario',
            image: null,
        },
        totalSpend: 0,
        ordersOptions: {
            valueNames: ['id', 'status', 'date', 'total'],
            page: 5,
        },
        odersList: null,
    }),
    methods: {
        asPhone,
        displayIcon(status) {
            return status ? 'user-minus' : 'user-check'
        },
        getPedidoStatus(status) {
            switch (status) {
            case 3:
                return {
                    desc: 'Cancelado',
                    badge: 'danger',
                    icon: 'x'
            }
            case 2:
                return {
                    desc: 'Entregue',
                    badge: 'success',
                    icon: 'check'
                }
            case 1:
                return {
                    desc: 'Pendente',
                    badge: 'secondary',
                    icon: 'clock'
                }
            }
        },
        getPaymentStatus(status) {
            switch (status) {
            case 3:
                return {
                    desc: 'Cancelado',
                    badge: 'secondary',
                    icon: 'check'
            }
            case 2:
                return {
                    desc: 'Pago',
                    badge: 'success',
                    icon: 'check'
                }
            case 1:
                return {
                    desc: 'Pendente',
                    badge: 'secondary',
                    icon: 'clock'
                }
            }
        },
        async getUser() {
            await api.get(`/user/${this.$route.params.id}`)
                .then((res) => {
                    this.user = {
                        ...res.data,
                        initial: res.data.name.charAt(0),
                        image: res.data.image ? res.data.image : undefined
                    }
                    
                    this.avatar = getAvatar(this.user.email, 150)
                    this.noAvatar = false

                    
                    this.loading = false
                }).catch(() => {
                    this.$toasts.error('Não foi possível carregar o usuário.')
                })
        },
        async activateUser() {
            await api.post(`/user/${this.user.username}/enable`)
                .then(res => {
                    this.$router.push({ name: 'users' }).then(() => {
                        this.$toasts.success('Usuário ativado com sucesso.')
                    })
                    this.user.active = true
                }).catch(error => {
                    console.log(error)
                })
        },
        async desactivateUser() {
            await api.post(`/user/${this.user.username}/disable`)
                .then(res => {
                    this.$router.push({ name: 'users' }).then(() => {
                        this.$toasts.success('Usuário desativado com sucesso.')
                    })
                    this.user.active = false
                }).catch(error => {
                    console.log(error)
                })
        },
        async getOrders() {
            await api.get(`/user/${this.$route.params.id}/orders`)
                .then(res => {
                    this.pedidos = res.data
                    for(let value = 0; value < res.data.length; value ++) {
                        this.totalSpend += parseFloat(res.data[value].total)
                    }

                    this.list = installList(this.$refs.profileOrdersTable, this.ordersOptions)
                }).catch(() => {
                    this.$toasts.error('Não foi possível carregar os pedidos do usuário.')
                })
        },
        formatDate(date){
         let dateObject = new Date(date);
         let day = dateObject.getDate();
         let month = dateObject.getMonth() + 1; 
         let year = dateObject.getFullYear() % 100; 
         let hours = dateObject.getHours();
         let minutes = dateObject.getMinutes();

         hours = hours < 10 ? "0" + hours : hours;
         minutes = minutes < 10 ? "0" + minutes : minutes;
         let formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
         return formattedDateTime;
      }
    },
    mounted() {
        this.getUser()
        this.getOrders();
    }
}
</script>
<template>
    <nav class="mb-2" aria-label="breadcrumb">
        <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
                <router-link :to="{ name: 'dashboard' }">Painel</router-link>
            </li>

            <li class="breadcrumb-item">
                <router-link :to="{ name: 'users' }">Usuários</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Usuário {{ user.id ? `#${user.id}` : '' }}</li>
        </ol>
    </nav>
    <div class="row align-items-center justify-content-between g-3 mb-4">
        <div class="col-auto">
            <h2 class="mb-0">Perfil</h2>
        </div>
        <div class="col-auto">
            <div class="row g-2">
                <div class="col-auto">
                    <button :disabled="loading" v-if="user.active" @click="desactivateUser" class="btn btn-snipe-danger">
                        <icones type="user-minus" class="me-2" size="13" />
                        <span>Desativar</span>
                    </button>
                    <button v-else @click="activateUser" class="btn btn-snipe-primary">
                        <icones type="user-check" class="me-2" size="13" />
                        <span>Ativar</span>
                    </button>
                </div>
                <div class="col-auto">
                    <button class="btn btn-snipe-secondary" @click="$router.push({ name: 'user-edit', params: { id: user.username }})">
                        <icones type="user-edit" class="me-2" />
                        <span>Editar usuário</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="row g-3 mb-6">
        <div class="col-12 col-lg-8">
            <div class="card h-100">
                <div class="card-body">
                    <div class="border-bottom border-dashed border-300 pb-4">
                        <div class="row align-items-center g-3 g-sm-5 text-center text-sm-start">
                            <div class="col-12 col-sm-auto">
                                <div class="user-select-none pe-none avatar avatar-5xl">
                                    <img v-if="!noAvatar" class="rounded-circle" :src="avatar" @error="noAvatar = true" />
                                    <div v-else class=" avatar-name rounded-circle">
                                        <span>{{ user.initial }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-auto flex-1 placeholder-wave">
                                <h3>
                                    <span :class="loading ? 'placeholder rounded' : ''">{{ user.name }}</span>
                                </h3>
                                <p :class="loading ? 'placeholder rounded' : ''" class="text-800">{{ user.username }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-between-center pt-4">
                        <div>
                            <h6 class="mb-2 text-800">Total gasto</h6>
                            <h4 class="fs-1 text-1000 mb-0">R$ {{ totalSpend }}</h4>
                        </div>
                        <div class="text-end">
                            <h6 class="mb-2 text-800">Último pedido</h6>
                            <h4 class="fs-1 text-1000 mb-0">ontem</h4>
                        </div>
                        <div class="text-end">
                            <h6 class="mb-2 text-800">Total de pedidos</h6>
                            <h4 class="fs-1 text-1000 mb-0">{{ this.pedidos.length }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-4">
            <div class="card h-100">
                <div class="card-body">
                    <div class="border-bottom border-dashed border-300">
                        <h4 class="mb-3 lh-sm lh-xl-1">Endereço padrão<button class="btn btn-link p-0"
                                                                              type="button"></button>
                        </h4>
                    </div>
                    <div class="pt-4 mb-7 mb-lg-4 mb-xl-7">
                        <div class="row justify-content-between">
                            <div class="col-auto">
                                <h5 class="text-1000">Endereço</h5>
                            </div>
                            <div class="col-auto">
                                <p class="text-800">Desconhecido<br /></p>
                            </div>
                        </div>
                    </div>
                    <div class="border-top border-dashed border-300 pt-4">
                        <div class="row flex-between-center mb-2">
                            <div class="col-auto">
                                <h5 class="text-1000 mb-0">Email</h5>
                            </div>
                            <div class="col-auto">
                                <a class="lh-1 placeholder-wave">
                                    <span :class="loading ? 'placeholder rounded w-100' : ''">{{ user.email }}</span>
                                </a>
                            </div>
                        </div>
                        <div class="row flex-between-center">
                            <div class="col-auto">
                                <h5 class="text-1000 mb-0">Telefone</h5>
                            </div>
                            <div class="col-auto">
                                <a class="lh-1 placeholder-wave">
                                    <span :class="loading ? 'placeholder rounded w-100' : ''">{{ asPhone(user.phone)
                                    }}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="scrollbar">
            <ul class="nav nav-underline flex-nowrap mb-3 pb-1" id="myTab" role="tablist">
                <li class="nav-item me-3">
                    <a class="nav-link text-nowrap active" id="orders-tab" data-bs-toggle="tab" href="#user-orders">
                        <icones type="shopping-cart" class="me-2" />
                        <span class="me-1">Pedidos</span>
                        <span class="text-700 fw-normal">({{ this.pedidos.length }})</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-nowrap" id="personal-info-tab" data-bs-toggle="tab" href="#user-info"
                       role="tab">
                        <icones type="user" class="me-2" />
                        <span class="me-1">Informações pessoais</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="tab-content" id="profileTabContent" v-if="pedidos">
            <div class="tab-pane fade show active" id="user-orders">
                <div class="border-top border-bottom border-200" ref="profileOrdersTable" id="profile-orders">
                    <div class="table-responsive scrollbar">
                        <table class="table fs--1 mb-0">
                            <thead>
                                <tr>
                                    <th class="sort white-space-nowrap align-middle pe-3 ps-0" scope="col"
                                        data-sort="order_id" style="width:15%; min-width:140px">Código do pedido</th>
                                    <th class="text-center sort align-middle pe-3" scope="col" data-sort="status"
                                        style="width:15%; min-width:180px">
                                        Pagamento do pedido</th>
                                    <th class="text-center sort align-middle pe-3" scope="col" data-sort="status"
                                        style="width:15%; min-width:180px">
                                        Status do pedido</th>
                                    <th class="text-center sort align-middle pe-0 text-end" scope="col" data-sort="date"
                                        style="width:15%; min-width:160px">Data</th>
                                    <th class="text-center sort align-middle text-end" scope="col" data-sort="total"
                                        style="width:15%; min-width:160px">
                                        Total</th>
                                </tr>
                            </thead>
                            <tbody class="list" id="profile-order-table-body">
                                <tr v-for="pedido in pedidos" :key="pedido.id"
                                    class="hover-actions-trigger btn-reveal-trigger position-static">
                                    <td class="order align-middle white-space-nowrap py-2 ps-0">
                                        <router-link class="fw-semi-bold text-primary"
                                                     :to="`/painel/pedido/${pedido.id}`">#{{ pedido.id }}</router-link>
                                                    </td>
                                    <td class="text-center status align-middle white-space-nowrap text-start fw-bold text-700 py-2">
                                        <span class="badge badge-snipe fs--2"
                                                :class="`badge-snipe-${getPaymentStatus(pedido.payment_status).badge}`">
                                            <span class="badge-label">{{ getPaymentStatus(pedido.payment_status).desc }}</span>
                                            <icones class="ms-1" :type="getPaymentStatus(pedido.payment_status).icon" size="12.8" />
                                        </span>
                                    </td>
                                    <td class="text-center status align-middle white-space-nowrap text-start fw-bold text-700 py-2">
                                        <span class="badge badge-snipe fs--2"
                                              :class="`badge-snipe-${getPedidoStatus(pedido.delivery_status).badge}`">
                                            <span class="badge-label">{{ getPedidoStatus(pedido.delivery_status).desc }}</span>
                                            <icones class="ms-1" :type="getPedidoStatus(pedido.delivery_status).icon" size="12.8" />
                                        </span>
                                    </td>
                                    <td class="text-center date align-middle text-700 text-end py-2">{{ formatDate(pedido.created) }}</td>
                                    <td class="text-center total align-middle fw-semi-bold text-end py-2 text-1000">R$ {{ pedido.total }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row align-items-center justify-content-between py-2 pe-0 fs--1">
                        <div class="col-auto d-flex">
                            <p class="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900" data-list-info>
                            </p>
                            <a class="fw-semi-bold" data-list-view="*">
                                <span>Ver todos</span>
                                <icones type="chevron-right" class="ms-1" />
                            </a>
                            <a class="fw-semi-bold d-none" data-list-view="less">
                                <span>Ver menos</span>
                                <icones type="chevron-right" class="ms-1" />
                            </a>
                        </div>
                        <div class="col-auto d-flex">
                            <button class="page-link" data-list-pagination="prev">
                                <icones type="chevron-left" />
                            </button>
                            <ul class="mb-0 pagination"></ul>
                            <button class="page-link pe-0" data-list-pagination="next">
                                <icones type="chevron-right" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="user-info">
                <form>
                    <div class="row g-3 mb-5">
                        <div class="col-12 col-lg-6">
                            <label class="form-label text-1000 fs-0 ps-0 text-capitalize lh-sm" for="fullName">
                                <span>Usuário</span>
                            </label>
                            <input class="form-control" id="fullName" type="text" placeholder="Username" />
                        </div>
                        <div class="col-12 col-lg-6">
                            <label class="form-label text-1000 fs-0 ps-0 text-capitalize lh-sm" for="gender">Cargo</label>
                            <select class="form-select" id="gender">
                                <option value="male">Usuário</option>
                                <option value="female">Administrador</option>
                            </select>
                        </div>
                        <div class="col-12 col-lg-6">
                            <label class="form-label text-1000 fs-0 ps-0 text-capitalize lh-sm" for="email">
                                <span>Email</span>
                            </label>
                            <input class="form-control" id="email" type="text" placeholder="Email" />
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="row g-2 gy-lg-0">
                                <label class="form-label text-1000 fs-0 ps-1 text-capitalize lh-sm mb-1">
                                    <span>Data de nascimento</span>
                                </label>
                                <div class="col-6 col-sm-2 col-lg-3 col-xl-2">
                                    <select class="form-select" id="date">
                                        <option v-for=" index in 30 " :key="index" :value="index">{{ index }}</option>
                                    </select>
                                </div>
                                <div class="col-6 col-sm-2 col-lg-3 col-xl-2">
                                    <select class="form-select" id="month">
                                        <option value="Jan">Jan</option>
                                        <option value="Feb">Feb</option>
                                        <option value="Mar">Mar</option>
                                        <option value="Apr">Apr</option>
                                        <option value="May">May</option>
                                        <option value="Jun">Jun</option>
                                        <option value="Jul">Jul</option>
                                        <option value="Aug">Aug</option>
                                        <option value="Sep">Sep</option>
                                        <option value="Oct">Oct</option>
                                        <option value="Nov">Nov</option>
                                        <option value="Dec">Dec</option>
                                    </select>
                                </div>
                                <div class="col-12 col-sm-8 col-lg-6 col-xl-8">
                                    <select class="form-select" id="year">
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6">
                            <label class="form-label text-1000 fw-bold fs-0 ps-0 text-capitalize lh-sm" for="phone">
                                <span>Telefone</span>
                            </label>
                            <input class="form-control" id="phone" type="text" placeholder="+1234567890" />
                        </div>
                        <div class="col-12 col-lg-6">
                            <label class="form-label text-1000 fw-bold fs-0 ps-0 text-capitalize lh-sm"
                                   for="alternative_phone">
                                <span>CPF</span>
                            </label>
                            <input class="form-control" id="alternative_phone" type="text" placeholder="000.000.000-00" />
                        </div>
                    </div>
                    <div class="text-end">
                        <button class="btn btn-primary px-7">Salvar usuário</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>