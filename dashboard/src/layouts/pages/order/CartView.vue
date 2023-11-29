<script>
import { useCartStore } from  '@/stores/cart.store';
import { mapState } from 'pinia';

export default {
   name: 'Carrinho',
   data: () => ({
      loading: true,
      admin: false,
      currentAmount: 0,
      listItem: [],
   }),
   computed: {
      ...mapState(useCartStore, ['getItems', 'getTotalPrice'])
   },
   methods: {},
   mounted() {}
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
        <h2 class="mb-6">Meu carrinho</h2>
        <div class="row g-5">
          <div class="col-12 col-lg-8">
            <div id="cartTable">
              <div class="table-responsive scrollbar mx-n1 px-1">
                <table class="table fs--1 mb-0 border-top border-200">
                  <thead>
                    <tr>
                      <th class="sort white-space-nowrap align-middle fs--2" scope="col"></th>
                      <th class="sort white-space-nowrap align-middle" scope="col" style="min-width:250px;">Nome</th>
                      <th class="sort align-middle" scope="col" style="width:80px;">Categoria</th>
                      <th class="sort align-middle" scope="col" style="width:150px;">Preço</th>
                      <th class="sort align-middle text-end" scope="col" style="width:300px;">Qnt. Itens</th>
                      <th class="sort align-middle text-end" scope="col" style="width:300px;">Total</th>
                      <th class="sort text-end align-middle pe-0" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody class="list" id="cart-table-body">
                     <tr class="cart-table-row btn-reveal-trigger" v-for="item in getItems">
                      <td class="align-middle white-space-nowrap py-0">
                        <img src="https://placehold.co/32x32" alt="" width="53">
                      </td>
                      <td class="products align-middle">
                        <router-link :to="{name: 'product-detail', params: {id: item.id}}" class="fw-semi-bold mb-0 line-clamp-2">{{ item.name }}</router-link>
                      </td>
                      <td class="color align-middle white-space-nowrap fs--1 text-900">{{ item.name }}</td>
                      <td class="size align-middle white-space-nowrap text-700 fs--1 fw-semi-bold">R$ {{ item.price.replace('.', ',') }}</td>
                      <td class="price align-middle text-900 fs--1 fw-semi-bold text-end">{{ item.amount }}</td>
                      <td class="total align-middle fw-bold text-1000 text-end">R$ {{ (item.price * item.amount).toFixed(2).replace('.', ',') }}</td>
                     </tr>
                     <!-- <tr class="cart-table-row btn-reveal-trigger">
                      <td class="text-1100 fw-semi-bold ps-0 fs-0" colspan="5">Itens subtotal :</td>
                      <td class="text-1100 fw-bold text-end fs-0">R$ {{ getTotalPrice }}</td>
                    </tr> -->
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
                  <h4 class="mb-">R$ {{ getTotalPrice.replace('.', ',') }}</h4>
                </div>
                  <button class="btn btn-primary w-100">
                     Realizar o pedido
                     <icones class="me-2" type="arrow-right" size="20" />
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>