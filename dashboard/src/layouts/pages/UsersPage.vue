<script>
import List from 'list.js';

export default {
   name: "UsersPage",
   data: () => ({
      users: [
         { id: 1, username: 'Ana', email: 'ana@mail.com', phone: '(51) 12345-6789', active: true },
         { id: 2, username: 'Fulano', email: 'fulano@mail.com', phone: '(51) 12345-6789', active: false },
         { id: 3, username: 'Ciclano', email: 'ciclano@mail.com', phone: '(51) 12345-6789', active: true },
         { id: 4, username: 'Beltrano', email: 'beltrano@mail.com', phone: '(51) 12345-6789', active: true },
      ],
      optionsList: {
         valueNames: ['id', 'username', 'email', 'phone', 'active'],
         page: 15,
      }
   }),
   methods: {
      goToUserProfile(event) {
         const userId = event.currentTarget.id;
         this.$router.push({
            name: 'user-profile',
            params: {
               id: userId
            }
         })
      }
   }
}

</script>
<template>
   <main class="main" id="top">
      <nav class="mb-2" aria-label="breadcrumb">
         <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="/dashboard">Painel</a></li>
            <li class="breadcrumb-item active">Usuários</li>
         </ol>
      </nav>
      <div class="mb-9">
         <div class="row g-2 mb-4">
            <div class="col-auto">
               <h2 class="mb-0">Usuários</h2>
            </div>
         </div>
         <div id="users-list" :data-list="JSON.stringify(optionsList)">
            <ul class="nav nav-links mb-3 mb-lg-2 mx-n3">
               <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                     <span>Todos </span>
                     <span class="text-700 fw-semi-bold">(5)</span>
                  </a>
               </li>
               <li class="nav-item">
                  <a class="nav-link" href="#">
                     <span>Ativos </span>
                     <span class="text-700 fw-semi-bold">(3)</span>
                  </a>
               </li>
               <li class="nav-item">
                  <a class="nav-link" href="#">
                     <span>Inativos </span>
                     <span class="text-700 fw-semi-bold">(3)</span>
                  </a>
               </li>
            </ul>
            <div class="mb-4">
               <div class="row g-3">
                  <div class="col-auto">
                     <div class="search-box">
                        <form class="position-relative" data-bs-toggle="search" data-bs-display="static">
                           <input class="form-control search-input search" type="search" placeholder="Pesquisar usuário"
                              aria-label="Pesquisar" />
                           <span class="fas fa-search search-box-icon"></span>

                        </form>
                     </div>
                  </div>
                  <div class="col-auto scrollbar overflow-hidden-y flex-grow-1">
                     <div class="btn-group position-static" role="group">
                        <div class="btn-group position-static text-nowrap">
                           <button class="btn btn-sm btn-phoenix-secondary px-7 flex-shrink-0" type="button"
                              data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false"
                              data-bs-reference="parent">
                              Tipo<span class="fas fa-angle-down ms-2"></span></button>
                           <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Tipo 1</a></li>
                              <li><a class="dropdown-item" href="#">Tipo 2</a></li>
                              <li><a class="dropdown-item" href="#">Tipo 3</a></li>
                              <li></li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div class="col-auto">
                     <button class="btn btn-primary"><span class="fas fa-plus me-2"></span>Adicionar usuário</button>
                  </div>
               </div>
            </div>
            <div class="mx-n4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
               <div class="table-responsive scrollbar-overlay mx-n1 px-1">
                  <table class="table table-list table-hover table-sm fs--1 mb-0">
                     <thead>
                        <tr>
                           <th class="sort align-middle pe-5" scope="col" data-sort="username" style="width:10%;">Nome</th>
                           <th class="sort align-middle pe-5" scope="col" data-sort="email" style="width:20%;">Email</th>
                           <th class="sort align-middle text-end" scope="col" data-sort="phone" style="width:10%">Telefone
                           </th>
                           <th class="sort align-middle text-end ps-3" scope="col" data-sort="active" style="width:10%">
                              Status</th>
                        </tr>
                     </thead>
                     <tbody class="list" id="customers-table-body">
                        <tr v-for="user in users" @click="goToUserProfile" :id="user.username"
                           class="hover-actions-trigger btn-reveal-trigger position-static" role="button">
                           <td class="customer align-middle white-space-nowrap pe-5 ps-1">
                              <div class="d-flex align-items-center text-1100">
                                 <div class="avatar avatar-m">
                                    <div class="avatar-name rounded-circle"><span>R</span></div>
                                 </div>
                                 <p class="mb-0 ms-3 text-1100 fw-bold">{{ user.username }}</p>
                              </div>
                           </td>
                           <td class="email align-middle white-space-nowrap pe-5 fw-semi-bold">{{ user.email }}</td>
                           <td class="align-middle white-space-nowrap fw-semi-bold text-end text-1000">
                              {{ user.phone }}</td>
                           <td class="align-middle white-space-nowrap fw-bold text-end ps-3 text-1100 pe-2">
                              {{ user.active ? 'Ativo' : 'Inativo' }}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div class="row align-items-center justify-content-between py-2 pe-0 fs--1">
                  <div class="col-auto d-flex">
                     <p class="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900" data-list-info="data-list-info"></p>
                     <a class="fw-semi-bold" data-list-view="*">Ver todos
                        <span class="fas fa-angle-right ms-1" data-fa-transform="down-1">
                        </span>
                     </a>
                     <a class="fw-semi-bold d-none" data-list-view="less">Ver menos
                        <span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span>
                     </a>
                  </div>
                  <div class="col-auto d-flex">
                     <button class="page-link" data-list-pagination="prev"><span
                           class="fas fa-chevron-left"></span></button>
                     <ul class="mb-0 pagination"></ul>
                     <button class="page-link pe-0" data-list-pagination="next"><span
                           class="fas fa-chevron-right"></span></button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </main>
</template>
<style></style>