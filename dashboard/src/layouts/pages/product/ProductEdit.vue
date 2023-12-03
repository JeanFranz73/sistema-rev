<script>
import api from '@/utils/api'
export default {
   name: 'ProductEdit',
   data: () => ({
      product: {
         name: '',
         description: '',
         category: '',
         price: '',
         stock: '',
         active: 1,
      },
      categories: [],
      hasParameter: null,
   }),
   methods: {
      async getProduct() {
         await api.get(`/product/${this.$route.params.id}`)
            .then(res => {
               this.product = res.data;
            })
      },
      async doSubmit() {
         if(this.hasParameter){
            await api.patch(`/product/${this.$route.params.id}`, this.product)
               .then(() => {
                  this.$toasts.success('Produto editado com sucesso.')
                  this.$router.push({ name: 'admin-products' })
               })
               .catch(err => {
                  console.log(err);
                  this.$toasts.error('Não foi possível editar o produto.');
               })
         } else {
            await api.post('/product/new', this.product)
            .then(() => {
               this.$toasts.success('Produto adicionado com sucesso.')
               this.$router.push({ name: 'admin-products' })
            })
            .catch(err => {
               console.log(err);
               this.$toasts.error('Não foi possível adicionar o produto.')
            })
         }
      },
      async init() {
         await api.get('/products/categories')
               .then(async (res) => {
                  this.categories = res.data
                  console.log(res.data)
               })
               .catch((err) => {
                  if (err.response) {
                     this.$toasts.error(err.response.data.message)
                  } else {
                     this.$toasts.error('Não foi possível carregar as categorias.')
                  }
               })
      }
   },
   mounted() {
      this.hasParameter = this.$route.params.id;
      if(this.hasParameter) {
         this.getProduct();
      }
      this.init()
   },
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
            <li class="breadcrumb-item">
               Produtos
            </li>
            <li class="breadcrumb-item active">
               Adicionar produto
            </li>
         </ol>
   </nav>
   <div class="content">
      <form class="mb-9" @submit.prevent="doSubmit">
        <div class="row g-3 flex-between-end mb-5">
          <div class="col-auto">
            <h2 class="mb-2">Cadastre um produto</h2>
          </div>
          <div class="col-auto">
            <button class="btn btn-primary mb-2 mb-sm-0" type="submit">Cadastrar produto</button>
          </div>
        </div>
        <div class="row g-5">
          <div class="col-12 col-xl-8">
            <h4 class="mb-3">Nome do produto</h4>
            <input v-model="product.name" required class="form-control mb-5" type="text" placeholder="Digite o nome aqui...">
            <div class="mb-6">
               <h4 class="mb-3">Descrição do produto</h4>
               <div class="form-group">
                  <textarea v-model="product.description" required class="form-control" id="description" placeholder="Digite a descrição aqui..." rows="3"></textarea>
                </div>
            </div>
            <!-- <h4 class="mb-3">Imagem do produto</h4>
            <div class="dropzone dropzone-multiple p-0 mb-5 dz-clickable" id="my-awesome-dropzone" data-dropzone="data-dropzone">
              <div class="dz-preview d-flex flex-wrap"></div>
              <div class="dz-message text-600" data-dz-message="data-dz-message">Arraste a foto do produto aqui<span class="text-800 px-1">ou</span>
                  <button class="btn btn-link p-0" type="button">Procure em seu dispositivo</button>
                  <br>
                  <img class="mt-3 me-2" src="../../../assets/img/icons/image-icon.png" width="40" alt="">
               </div>
            </div> -->
            <h4 class="mb-3">Inventário</h4>
            <div class="row g-0 border-top border-bottom border-300">
              <div class="col-sm-4">
                <div class="nav flex-sm-column border-bottom border-bottom-sm-0 border-end-sm border-300 fs--1 vertical-tab h-100 justify-content-between" role="tablist" aria-orientation="vertical">
                  <a class="nav-link border-end border-end-sm-0 border-bottom-sm border-300 text-center text-sm-start cursor-pointer outline-none d-sm-flex align-items-sm-center active" id="pricingTab" data-bs-toggle="tab" data-bs-target="#pricingTabContent" role="tab" aria-controls="pricingTabContent" aria-selected="false" tabindex="-1">
                     <icones type="tag" size="16" class="fs--2" />
                     <span class="d-none d-sm-inline p-2">Preço</span>
                  </a>
                  <a class="nav-link border-end border-end-sm-0 border-bottom-sm border-300 text-center text-sm-start cursor-pointer outline-none d-sm-flex align-items-sm-center" id="restockTab" data-bs-toggle="tab" data-bs-target="#restockTabContent" role="tab" aria-controls="restockTabContent" aria-selected="false" tabindex="-1">                        
                     <icones type="box" size="16" class="fs--2" />
                     <span class="d-none d-sm-inline p-2">Estoque</span>
                  </a>
                  <a class="nav-link border-end border-end-sm-0 border-bottom-sm border-300 text-center text-sm-start cursor-pointer outline-none d-sm-flex align-items-sm-center" id="categoryTab" data-bs-toggle="tab" data-bs-target="#categoryTabContent" role="tab" aria-controls="categoryTabContent" aria-selected="false" tabindex="-1">                        
                     <icones type="category" size="16" class="fs--2" />
                     <span class="d-none d-sm-inline p-2">Categoria</span>
                  </a>
                  </div>
              </div>
              <div class="col-sm-8">
                <div class="tab-content py-3 ps-sm-4 h-100">
                  <div class="tab-pane fade active show" id="pricingTabContent" role="tabpanel" aria-labelledby="pricingTab">
                     <div class="col-12 col-lg-6">
                        <h5 class="mb-2 text-1000">Valor do produto</h5>
                        <input v-model="product.price" required="true" class="form-control" type="text" placeholder="R$">
                     </div>
                  </div>
                  <div class="tab-pane fade h-100" id="restockTabContent" role="tabpanel" aria-labelledby="restockTab">
                    <div class="d-flex flex-column h-100">
                      <h5 class="mb-3 text-1000">Quantidade de produtos a serem adicionados</h5>
                        <div class="col-sm-7">
                           <input v-model="product.stock" required  class="form-control" type="number" placeholder="Quantidade">
                        </div>
                    </div>
                  </div>
                  <div class="tab-pane fade h-100" id="categoryTabContent" role="tabpanel" aria-labelledby="categoryTab">
                     <div class="d-flex flex-column h-100">
                        <h5 class="mb-3 text-1000">Escolha uma categoria para o produto</h5>
                          <div class="col-sm-7">
                           <select v-model="product.category" class="form-select mb-3" aria-label="Categoria" required>
                              <option value="0" disabled select>Selecione uma categoria</option>
                              <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                            </select>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
</main>
</template>