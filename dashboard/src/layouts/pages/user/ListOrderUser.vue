<script>
import api from '@/utils/api'
import { installList, getAvatar } from '@/helpers'

export default {
   name: 'UserDetails',
   data: () => ({
      pedidos: [],
      ordersOptions: {
         valueNames: ['id', 'status', 'date', 'total'],
         page: 5,
      },
   }),
   methods: {
      async getOrders() {
         await api.get(`/user/${this.$route.params.id}/orders`)
               .then(res => {
                  this.pedidos = res.data
                  this.list = installList(this.$refs.profileOrdersTable, this.ordersOptions)
               }).catch(() => {
                  this.$toasts.error('Não foi possível carregar os pedidos do usuário.')
               })
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
      this.getOrders()
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
                  Meus pedidos
              </li>
          </ol>
      </nav>
      <div class="row g-2 mb-4">
         <div class="col-auto">
             <h2 class="mb-0">
                 Meus pedidos
             </h2>
         </div>
     </div>
      <div class="tab-content" id="profileTabContent">
         <div class="tab-pane fade show active" id="user-orders">
            <div class="border-top border-bottom border-200" ref="profileOrdersTable" id="profile-orders">
               <div class="table-responsive scrollbar">
                     <table class="table fs--1 mb-0">
                        <thead>
                           <tr>
                                 <th class="sort white-space-nowrap align-middle pe-3 ps-0" scope="col"
                                    data-sort="order_id" style="width:15%; min-width:140px">Código do pedido</th>
                                 <th class="sort align-middle pe-3" scope="col" data-sort="status"
                                    style="width:15%; min-width:180px">
                                    Pagamento do pedido</th>
                                 <th class="sort align-middle pe-3" scope="col" data-sort="status"
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
                           <tr v-if="pedidos" v-for="pedido in pedidos" :key="pedido.id"
                                 class="hover-actions-trigger btn-reveal-trigger position-static">
                                 <td class="order align-middle white-space-nowrap py-2 ps-0">
                                    <router-link class="fw-semi-bold text-primary"
                                                :to="`/painel/pedido/${pedido.id}`">#{{ pedido.id }}</router-link>
                                                </td>
                                 <td class="status align-middle white-space-nowrap text-start fw-bold text-700 py-2">
                                    <span class="badge badge-snipe fs--2"
                                             :class="`badge-snipe-${getPaymentStatus(pedido.payment_status).badge}`">
                                       <span class="badge-label">{{ getPaymentStatus(pedido.payment_status).desc }}</span>
                                       <icones class="ms-1" :type="getPaymentStatus(pedido.payment_status).icon" size="12.8" />
                                    </span>
                                 </td>
                                 <td class="status align-middle white-space-nowrap text-start fw-bold text-700 py-2">
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
                           <tr v-if="pedidos.length == 0" class="hover-actions-trigger btn-reveal-trigger position-static">
                              <td colspan="5" class="text-center">Você não possui pedidos</td>
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
         
      </div>
  </main>
</template>