<script>
import api from '@/utils/api'
import { installList } from '@/helpers'

export default {
   name: 'ListProductsClient',
   data: () => ({
      loading: true,
      products: [],
      categories: [],
      checkedCategory: [],
      optionsList: {
         valueNames: ['id', 'name', 'price', 'description'],
         page: 15
      },
      activeProducts: 0,
   }),
   computed: {
      computedProducts() {
         return this.checkedCategory.length > 0 ? this.products.filter(product => this.checkedCategory.includes(product.category)) : this.products
      },
   },
   methods: {
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
            })
            .catch((err) => {
               if (err.response) {
                  this.$toasts.error(err.response.data.message)
               } else {
                  this.$toasts.error('Não foi possível carregar os produtos.')
               }
            })
    },
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
         <div class="row" id="products-list" ref="productsList" :data-list="JSON.stringify(optionsList)">
            <div class="col-lg-3 col-xxl-2 ps-2 ps-xxl-3">
            <div class="product-filter-offcanvas bg-soft scrollbar phoenix-offcanvas phoenix-offcanvas-fixed" id="productFilterColumn">
               <div class="d-flex justify-content-between align-items-center mb-3">
                  <h3 class="mb-0">Filtros</h3>
               </div><a class="btn px-0 d-block collapse-indicator" data-bs-toggle="collapse" href="#collapseAvailability" role="button" aria-expanded="true" aria-controls="collapseAvailability">
                  <div class="d-flex align-items-center justify-content-between w-100">
                  <div class="fs-0 text-1000">Categoria</div>

                  </div>
               </a>
               <div class="collapse show" id="collapseAvailability">
                  <div class="mb-2">
                  <div class="form-check mb-0" v-for="category in categories">
                        <input 
                          v-model="checkedCategory" 
                          :key="category.id"
                          :id="`category-${category.name}`"
                          :value="category.id" 
                          type="checkbox" 
                          class="form-check-input mt-0" >
                        <label class="form-check-label d-block lh-sm fs-0 text-900 fw-normal mb-0" :for="`category-${category.name}`">{{ category.name }}</label>
                  </div>
                  </div>
               </div>
            </div>
            <div class="phoenix-offcanvas-backdrop d-lg-none"></div>
            </div>
            <div class="col-lg-9 col-xxl-10">
            <div class="row gx-3 gy-6 mb-8 list">
               <router-link 
                  :to="{ name: 'product-detail', params: { id: product.id }}" 
                  v-for="product in computedProducts" 
                  :key="product.id"  
                  class="text-decoration-none col-12 col-sm-6 col-md-4 col-xxl-2">
                  <div class="product-card-container h-100">
                  <div class="position-relative text-decoration-none product-card h-100">
                     <div class="d-flex flex-column justify-content-between h-100">
                        <div>
                        <div class="border border-1 rounded-3 position-relative mb-3">
                           <img class="img-fluid" src="https://placehold.co/400x400" alt="">
                           </div>
                           <div class="stretched-link">
                           <h6 class="mb-2 lh-sm line-clamp-3 product-name">{{ product.name }}</h6>
                           </div>
                        </div>
                        <div>
                        <p class="fs--1 text-700 mb-2">{{ product.description }}</p>
                        <div class="d-flex align-items-center mb-1">
                           <h3 class="text-1100 mb-0">R$ {{ product.price }}</h3>
                        </div>
                        </div>
                     </div>
                  </div>
                  </div>
               </router-link>
            </div>
            </div>
         </div>
      </div>
</main>
</template>