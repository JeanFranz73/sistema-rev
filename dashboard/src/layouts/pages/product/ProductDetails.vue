<script>
import { mapActions } from 'pinia'
import api from '@/utils/api'
import { useSessionStore } from '@/stores/session.store'
import { useCartStore } from '@/stores/cart.store'

export default {
    name: 'ProductDetails',
    data: () => ({
        loading: true,
        avatar: '',
        noAvatar: false,
        product: {
            initial: '',
            name: 'Nome do produto',
            phone: '00000000000',
            username: 'produto',
            image: null,
            active: true
        },
        admin: false,
        currentAmount: 1,
    }),
    computed: {
        isEmpty() {
            return this.product.stock == 0
        }
    },
    methods: {
        ...mapActions(useCartStore, { addItem: 'add' }),
        async getProduct() {
            await api.get(`/product/${this.$route.params.id}`)
                .then((res) => {
                    this.product = {
                        ...res.data,
                        initial: res.data.name.charAt(0),
                        image: res.data.image ? res.data.image : undefined
                    }
                  
                    this.noAvatar = false

                    this.loading = false

                }).catch((err) => {
                    this.$toasts.error('Não foi possível carregar o produto.')
                })
        },
        isAdmin() {
            return useSessionStore().isAdmin
        },
        async disableProduct() {
            await api.post(`/product/${this.user.username}/change`)
                .then(res => {
                    this.$toasts.success('Produto desativado com sucesso.')
                    this.$router.push({ name: 'products' })
                }).catch(error => {
                    console.log(error)
                })
        },
        handleQuantityItens(operation) {
            if (operation == 'minus' && this.currentAmount > 1) {
                this.currentAmount--
            }

            if (operation == 'plus' && this.currentAmount < this.product.stock) {
                this.currentAmount++
            }
        },
        addToCart(item){
            this.addItem(item, this.currentAmount)
            this.$toasts.success('Produto adicionado ao carrinho.')
        }
    },
    mounted() {
        this.getProduct()
    }
}
</script>
<template>
    <div class="pt-5 pb-9">
        <section class="py-0">
            <div class="container-small">
                <nav class="mb-3" aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'dashboard' }">Painel</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'products' }">Produtos</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Produto #{{ product.id }}</li>
                    </ol>
                </nav>
                <div class="row g-5 mb-5 mb-lg-8" data-product-details="data-product-details">
                    <div class="col-12 col-lg-6">
                        <div class="row g-3 mb-3">
                            <div class="col-12 col-md-10 col-lg-12 col-xl-10">
                                <div class="d-flex align-items-center border rounded-3 text-center p-5 h-100">
                                    <img class="w-100" src="https://placehold.co/400x400/png" /> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="d-flex flex-column h-100">
                            <div class="mb-5">
                                <h3 class="mb-3 lh-sm">{{ product.name }}</h3>
                                <div class="d-flex flex-wrap align-items-center">
                                    <h1 class="me-3">R$ {{ product.price }}</h1>
                                </div>
                                <p class="text-success fw-semi-bold fs-1 mb-2">{{ product.stock }} itens no estoque</p>
                                <p class="mb-2 text-800">{{ product.description }}</p>
                            </div>
                            <div>
                                <div class="row g-3 g-sm-5 align-items-end">
                                    <div class="col-12 col-sm">
                                        <p class="fw-semi-bold mb-2 text-900">Quantidade: </p>
                                        <div class="d-sm-flex align-items-end mb-5">
                                            <div class="d-flex mb-5 mb-sm-0" data-quantity="data-quantity">
                                                <button :disabled="isEmpty" class="btn btn-phoenix-primary px-3" @click="handleQuantityItens('minus')">
                                                    <icones class="me-2" type="minus" size="16" />
                                                </button>
                                                <input :disabled="isEmpty" class="form-control text-center input-spin-none bg-transparent border-0 outline-none" style="width:50px;" type="number" min="1" v-model="currentAmount">
                                                <button :disabled="isEmpty" class="btn btn-phoenix-primary px-3" @click="handleQuantityItens('plus')">
                                                    <icones class="me-2" type="plus" size="16" />
                                                </button>
                                            </div>
                                            <div class="d-flex">
                                                <button class="btn btn-lg btn-warning rounded-pill w-100 fs--1 fs-sm-0" @click="addToCart(product)">
                                                    <icones class="me-2" type="shopping-cart" size="16" />
                                                    Adicionar no carrinho
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-auto" v-if="isAdmin">
                                            <button class="btn-snipe-danger btn" @click="disableProduct">
                                                <icones type="cube-off" class="me-2" size="13" />
                                                <span>Desativar</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>