<script>
import { useCartStore } from '@/stores'
import { useSessionStore } from '@/stores'
import { mapState, mapActions } from 'pinia'

import { getPrice } from '@/utils'

import api from '@/utils/api'

export default {
    name: 'CartView',
    data: () => ({
        loading: false,
        ordering: false,
    }),
    computed: {
        ...mapState(useCartStore, ['getItems', 'getCategory', 'getTotalPrice', 'isCartEmpty']),
        ...mapState(useSessionStore, ['getLoggedUser']),
    },
    methods: {
        getPrice,
        ...mapActions(useCartStore, ['remove', 'clear', 'decrement', 'increment']),
        removeItem(id) {
            this.remove(id)
            this.$toasts.success('Produto removido do carrinho.')
        },
        clearCart() {
            this.clear()
        },
        createOrder() {
            this.ordering = true
            const order = {
                user: this.getLoggedUser.id,
                total: parseFloat(this.getTotalPrice),
                products: this.getItems.map(item => ({
                    id: item.id,
                    amount: item.amount,
                    unit_price: parseFloat(item.price),
                })),
                delivery_status: 1,
                payment_status: 1,
            }

            api.post('/order/new', order).then((res) => {
                this.clearCart()
                this.$router.push({ name: 'order-detail', params: { id: res.data.id }})
                this.$toasts.success('Pedido realizado com sucesso!')
            }).catch(() => {
                this.$toasts.error('Erro ao realizar o pedido.')
            }).finally(() => {
                this.ordering = false
            })
        }
    },
    mounted() {
    }
}
</script>

<template>
    <section class="pt-5 pb-9">
        <div class="container-small cart">
            <nav class="mb-2" aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <router-link :to="{ name: 'dashboard' }">Painel</router-link></li>
                    <li class="breadcrumb-item active" aria-current="page">Carrinho</li>
                </ol>
            </nav>
            <h2 class="mb-6">Carrinho</h2>
            <div class="row g-5">
                <div class="col-12 col-lg-8">
                    <div id="cartTable">
                        <div class="table-responsive scrollbar mx-n1 px-1">
                            <table class="table fs--1 mb-0 border-top border-200">
                                <thead>
                                    <tr>
                                        <th class="sort white-space-nowrap align-middle fs--2" scope="col"></th>
                                        <th class="sort white-space-nowrap align-middle" scope="col" style="min-width:250px;">Produtos</th>
                                        <th class="sort align-middle" scope="col" style="width:80px;">Categoria</th>
                                        <th class="sort align-middle text-end" scope="col" style="width:300px;">Valor</th>
                                        <th class="sort align-middle text-center ps-5" scope="col" style="width:200px;">Quantidade</th>
                                        <th class="sort align-middle text-end" scope="col" style="width:250px;">Total</th>
                                        <th class="sort text-end align-middle pe-0" scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody class="list" id="cart-table-body">
                                    <tr v-if="loading">
                                        <td colspan="7" class="text-center">Carregando...</td>
                                    </tr>
                                    <tr v-else-if="isCartEmpty">
                                        <td colspan="7" class="text-center">Nenhum item no carrinho.</td>
                                    </tr>
                                    <tr v-else v-for="item, i in getItems" :key="i" class="cart-table-row btn-reveal-trigger">
                                        <td class="align-middle white-space-nowrap py-0">
                                            <router-link :to="{ name: 'product-detail', params: { id: item.id }}" class="d-block border rounded-2">
                                                <img src="https://placehold.co/400x400/png" class="rounded-1" width="53" />
                                            </router-link>
                                        </td>
                                        <td class="products align-middle">
                                            <router-link :to="{ name: 'product-detail', params: { id: item.id }}">{{ item.name }}</router-link>
                                        </td>
                                        <td class="category align-middle white-space-nowrap fs--1 text-900">{{ getCategory(item.category).name }}</td>
                                        <td class="price align-middle text-900 fs--1 fw-semi-bold text-end">{{ getPrice(item.price) }}</td>
                                        <td class="amount align-middle fs-0 ps-5">
                                            <div class="input-group input-group-sm flex-nowrap">
                                                <button @click="if (item.amount > 1) decrement(item.id);" class="btn btn-sm px-2">-</button>
                                                <input class="form-control text-center input-spin-none bg-transparent border-0 px-0" type="number" min="1" v-model="item.amount" />
                                                <button @click="if (item.amount < item.stock) increment(item.id);" class="btn btn-sm px-2">+</button>
                                            </div>
                                        </td>
                                        <td class="total align-middle fw-bold text-1000 text-end">{{ getPrice(item.price * item.amount) }}</td>
                                        <td class="align-middle white-space-nowrap text-end pe-0 ps-3">
                                            <button @click="removeItem(item.id)" class="btn btn-sm text-500 hover-text-600 me-2">
                                                <icones type="trash" size="16" />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr class="cart-table-row btn-reveal-trigger">
                                        <td class="text-1100 fw-semi-bold ps-0 fs-0" colspan="5">Subtotal</td>
                                        <td class="text-1100 fw-bold text-end fs-0">{{ getPrice(getTotalPrice) }}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex flex-between-center mb-3">
                                <h3 class="card-title mb-0">Resumo do pedido</h3>
                            </div>
                            <div class="d-flex justify-content-between border-y border-dashed py-3 mb-4">
                                <h4 class="mb-0">Total :</h4>
                                <h4 class="mb-">{{ getPrice(getTotalPrice) }}</h4>
                            </div>
                            <button :disabled="isCartEmpty || loading || ordering" class="btn btn-primary w-100" @click="createOrder">
                                {{ ordering ? 'Realizando pedido...' : 'Finalizar pedido' }}
                                <icones class="fs--2" type="chevron-right" size="16" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>@/utils