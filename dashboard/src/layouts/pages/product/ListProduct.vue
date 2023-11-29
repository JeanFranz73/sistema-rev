<script>
import api from '@/utils/api'
import { installList } from '@/helpers'
import { getAvatar } from '@/helpers'

export default {
    name: 'ListProducts',
    data: () => ({
        loading: true,
        getAvatar,
        products: [],
        optionsList: {
            valueNames: ['id', 'name', 'category', 'price', 'stock', 'created'],
            page: 15
        },
        categories: [],
        list: null,
        activeProducts: 0,
        productsFilter: 'all'
    }),
    methods: {
        showAllProducts() {
            this.productsFilter = 'all'
            this.list.filter(() => {
                return true
            })
        },
        showProductsWithStock(val) {
            this.productsFilter = val ? 'active' : 'inactive'
            this.list.filter((product) => {
                return product.values().stock > 0 === val
            })
        },
        async init() {
            await api.get('/products/categories')
                .then(async (res) => {
                    this.categories = res.data
                })
                .catch((err) => {
                    if (err.response) {
                        this.$toasts.error(err.response.data.message)
                    } else {
                        this.$toasts.error('Não foi possível carregar as categorias.')
                    }
                })
            await api.get('/products')
                .then(async (res) => {
                    this.products = res.data
                    this.products.forEach((product) => {
                        if (product.stock > 0) this.activeProducts++
                    })

                    this.loading = false
                    this.list = await installList(this.$refs.productsList, this.optionsList)
                })
                .catch((err) => {
                    if (err.response) {
                        this.$toasts.error(err.response.data.message)
                    } else {
                        this.$toasts.error('Não foi possível carregar os produtos.')
                    }
                })
        },
        addNewProduct(){
            this.$router.push({ name: 'new-product' })
        },
        getCategory(val) {
            return this.categories.find((category) => category.id == val).name
        }
    },
    mounted() {
        this.init()
    }
}
</script>
<template>
    <main class="main" id="top">
        <nav class="mb-2" aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'dashboard' }">
                        Painel
                    </router-link>
                </li>
                <li class="breadcrumb-item active">
                    Produtos
                </li>
            </ol>
        </nav>
        <div class="mb-9">
            <div class="row g-2 mb-4">
                <div class="col-auto">
                    <h2 class="mb-0">
                        Produtos
                    </h2>
                </div>
            </div>
            <div id="products-list" ref="productsList" :data-list="JSON.stringify(optionsList)">
                <ul class="nav nav-links mb-3 mb-lg-2 mx-n3 product-select-none">
                    <li class="nav-item">
                        <a class="nav-link" :class="productsFilter === 'all' ? 'active' : ''" @click="showAllProducts">
                            <span>Todos </span>
                            <span class="text-700 fw-semi-bold">({{ products.length }})</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="productsFilter === 'active' ? 'active' : ''" @click="showProductsWithStock(true)">
                            <span>Com estoque </span>
                            <span class="text-700 fw-semi-bold">({{ activeProducts }})</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="productsFilter == 'inactive' ? 'active' : ''"
                           @click="showProductsWithStock(false)">
                            <span>Sem estoque </span>
                            <span class="text-700 fw-semi-bold">({{ (products.length - activeProducts) }})</span>
                        </a>
                    </li>
                </ul>
                <div class="mb-4">
                    <div class="row g-3">
                        <div class="col-auto flex-grow-1">
                            <div class="search-box">
                                <form class="position-relative" data-bs-toggle="search" data-bs-display="static">
                                    <input class="form-control search-input search" :disabled="loading"
                                           placeholder="Pesquisar produto" />
                                    <icones type="search" class="search-box-icon" />
                                </form>
                            </div>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-primary" @click="addNewProduct">
                                <icones type="cube-plus" class="me-2" size="16" />
                                Adicionar produto
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    class="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
                    <div class="table-responsive scrollbar-overlay mx-n1 px-1">
                        <table class="table table-list table-hover table-sm fs--1 mb-0">
                            <thead>
                                <tr>
                                    <th class="sort align-middle pe-5" data-sort="id">
                                        Código
                                    </th>
                                    <th></th>
                                    <th class="sort align-middle pe-5" scope="col" data-sort="name" style="width:10%;">
                                        Nome
                                    </th>
                                    <th class="sort align-middle" scope="col" data-sort="category" style="width:25%">
                                        Categoria
                                    </th>
                                    <th class="sort align-middle text-end" scope="col" data-sort="price">
                                        Preço
                                    </th>
                                    <th class="sort align-middle text-end" scope="col" data-sort="stock">
                                        Qnt. itens
                                    </th>
                                    <th class="sort align-middle text-end" scope="col" data-sort="created">
                                        Criado em
                                    </th>
                                    <th class="sort align-middle text-end" scope="col">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="list" id="customers-table-body">
                                <tr v-if="loading"
                                    class="hover-actions-trigger btn-reveal-trigger position-static product-select-none">
                                    <td class="id align-middle pe-5 placeholder-wave">
                                        <span class="placeholder rounded">0000</span>
                                    </td>
                                    <td class="image align-middle white-space-nowrap pe-5 ps-1">
                                        <div class="avatar avatar-m">
                                            <div class="avatar-name rounded" style="width: 53px;"></div>
                                        </div>
                                    </td>
                                    <td class="name align-middle pe-5">
                                        <span class="placeholder rounded">nome de produto</span>
                                    </td>
                                    <td class="category align-middle pe-5">
                                        <span class="placeholder rounded">categoria de produto</span>
                                    </td>
                                    <td class="price align-middle text-end">
                                        <span class="placeholder rounded">R$0,00</span>
                                    </td>
                                    <td class="stock align-middle text-end">
                                        <span class="placeholder rounded">0000</span>
                                    </td>
                                    <td class="stock align-middle text-end">
                                        <span class="placeholder rounded">{{ new Date().toLocaleString() }}</span>
                                    </td>
                                    <td class="stock align-middle text-end">
                                        <span class="placeholder rounded">ação</span>
                                    </td>
                                </tr>
                                <template v-for="product in products" :key="product.id">
                                    <tr class="position-static" @click="$router.push({ name: 'product-detail', params: { id: product.id } })" :id="product.id">
                                        <td class="id align-middle white-space-nowrap fw-semi-bold">
                                            #{{product.id}}
                                        </td>
                                        <td class="image align-middle white-space-nowrap">
                                            <a class="d-block">
                                                <img src="https://placehold.co/53x53/png" class=" border rounded-2" alt="" width="53" />
                                            </a>
                                        </td>
                                        <td class="name align-middle ">                        
                                                {{product.name}}
                                        </td>
                                        <td class="category align-middle white-space-nowrap text-600 fs--1  fw-semi-bold">
                                            {{ getCategory(product.category) }}
                                        </td>
                                        <td class="price align-middle white-space-nowrap text-end fw-bold text-700 ">
                                            R$ {{ parseInt(product.price).toFixed(2).replace('.', ',') }}
                                        </td>
                                        
                                        <td class="stock align-middle white-space-nowrap text-end fw-bold text-700 ">
                                            {{ product.stock }}
                                        </td>
                                        <td class="created align-middle white-space-nowrap text-600  text-end">
                                            {{ new Date(product.created).toLocaleString() }}
                                        </td>
                                        <td class="align-middle white-space-nowrap text-end pe-0  btn-reveal-trigger">
                                            <div class="font-sans-serif btn-reveal-trigger position-static">
                                                <button class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs--2" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent">
                                                    <icones type="dots" class="fs--2" />
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-end py-2">
                                                    <router-link :to="{ name: 'product-detail', params: { id: product.id } }" class="dropdown-item">Ver</router-link>
                                                    <router-link :to="{ name: 'product-detail', params: { id: product.id } }" class="dropdown-item">Editar</router-link>
                                                    <div class="dropdown-divider"></div>
                                                    <a class="dropdown-item text-danger">Desativar</a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </template>
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
        </div>
    </main>
</template>
