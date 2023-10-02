<script>
import api from '@/utils/api'
import { installList } from '@/helpers'
import { asPhone } from '@/utils/validator'
import { getAvatar } from '@/helpers'


export default {
    name: "ListUsers",
    data: () => ({
        loading: true,
        getAvatar,
        users: [],
        optionsList: {
            valueNames: ['id', 'name', 'username', 'role', 'email', 'phone', 'active'],
            page: 15
        },
        list: null,
        activeUsers: 0,
        usersFilter: 'all'
    }),
    methods: {
        asPhone,
        showAllUsers() {
            this.usersFilter = 'all'
            this.list.filter(() => {
                return true
            })
        },
        showActiveUsers(activeUsers) {
            this.usersFilter = activeUsers ? 'active' : 'inactive'
            this.list.filter((user) => {
                return user.values().active == activeUsers
            })
        },
        async init() {
            await api.get('/users')
                .then(async (res) => {
                    this.users = res.data

                    this.users.forEach((user) => {
                        if (user.active) this.activeUsers++
                        user = {
                            ...user
                        }

                    })

                    this.loading = false

                    this.list = await installList(this.$refs.usersList, this.optionsList)

                })
                .catch((err) => {
                    this.$toasts.error('Não foi possível carregar os usuários.')
                })
        },
        goToUserProfile(user) {
            this.$router.push({
                name: 'user-profile',
                params: {
                    id: user.username,
                }
            })
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
                    <router-link :to="{ name: 'dashboard' }">Painel</router-link>
                </li>
                <li class="breadcrumb-item active">Usuários</li>
            </ol>
        </nav>
        <div class="mb-9">
            <div class="row g-2 mb-4">
                <div class="col-auto">
                    <h2 class="mb-0">Usuários</h2>
                </div>
            </div>
            <div id="users-list" ref="usersList" :data-list="JSON.stringify(optionsList)">
                <ul class="nav nav-links mb-3 mb-lg-2 mx-n3 user-select-none">
                    <li class="nav-item">
                        <a class="nav-link" :class="usersFilter == 'all' ? 'active' : ''" @click="showAllUsers">
                            <span>Todos </span>
                            <span class="text-700 fw-semi-bold">({{ users.length }})</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="usersFilter == 'active' ? 'active' : ''" @click="showActiveUsers(true)">
                            <span>Ativos </span>
                            <span class="text-700 fw-semi-bold">({{ activeUsers }})</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="usersFilter == 'inactive' ? 'active' : ''"
                            @click="showActiveUsers(false)">
                            <span>Inativos </span>
                            <span class="text-700 fw-semi-bold">({{ (users.length - activeUsers) }})</span>
                        </a>
                    </li>
                </ul>
                <div class="mb-4">
                    <div class="row g-3">
                        <div class="col-auto flex-grow-1">
                            <div class="search-box">
                                <form class="position-relative" data-bs-toggle="search" data-bs-display="static">
                                    <input class="form-control search-input search" :disabled="loading"
                                        placeholder="Pesquisar usuário" />
                                    <icones type="user-search" class="search-box-icon" />
                                </form>
                            </div>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-primary">
                                <icones type="user-plus" class="me-2" size="16" />
                                Adicionar usuário
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
                                    <th class="sort align-middle pe-5" scope="col" data-sort="name" style="width:10%;">
                                        Nome</th>
                                    <th class="sort align-middle pe-5" scope="col" data-sort="username" style="width:10%;">
                                        Usuário</th>
                                    <th class="sort align-middle pe-5" scope="col" data-sort="email" style="width:20%;">
                                        Email</th>
                                    <th class="sort align-middle" scope="col" data-sort="phone" style="width:25%">
                                        Telefone
                                    </th>
                                    <th class="sort align-middle text-end" scope="col" data-sort="role" style="width:20%;">
                                        Função
                                    </th>
                                    <th class="sort align-middle text-end ps-3" scope="col" data-sort="active"
                                        style="width:10%">
                                        Status</th>
                                </tr>
                            </thead>
                            <tbody class="list" id="customers-table-body">
                                <tr v-if="loading"
                                    class="hover-actions-trigger btn-reveal-trigger position-static user-select-none">
                                    <td class="align-middle white-space-nowrap pe-5 ps-1">
                                        <div class="d-flex align-items-center placeholder-wave">
                                            <div class="avatar avatar-m">
                                                <div class="avatar-name rounded-circle">
                                                </div>
                                            </div>
                                            <p class="name mb-0 ms-3 placeholder rounded">Nome de usuário</p>
                                        </div>
                                    </td>
                                    <td class="username align-middle white-space-nowrap pe-5 fw-semi-bold placeholder-wave">
                                        <span class="placeholder rounded">usuario</span>
                                    </td>
                                    <td class="email align-middle white-space-nowrap pe-5 fw-semi-bold">
                                        <span class="placeholder rounded">email@usuario.com</span>
                                    </td>
                                    <td class="phone align-middle white-space-nowrap pe-5 fw-semi-bold">
                                        <span class="placeholder rounded">(00) 00000-0000</span>
                                    </td>
                                    <td class="role align-middle white-space-nowrap text-end fw-semi-bold">
                                        <span class="placeholder rounded">Usuário</span>
                                    </td>
                                    <td class="active align-middle white-space-nowrap fw-semi-bold text-end ps-3">
                                        <span class="placeholder rounded">Ativo</span>
                                    </td>
                                </tr>
                                <template v-for="user in users">
                                    <tr @click="$router.push({ name: 'user-profile', params: { id: user.username } })"
                                        :id="user.id" ref="usersList" class="position-static">
                                        <td class="align-middle white-space-nowrap pe-5 ps-1">
                                            <div class="d-flex align-items-center">
                                                <div class="avatar avatar-m">
                                                    <img v-if="!user.noAvatar" class="rounded-circle"
                                                        :src="getAvatar(user.email, 32)" @error="user.noAvatar = true" />
                                                    <div v-else class="avatar-name rounded-circle">
                                                        <span>{{ user.name.charAt(0) }}</span>
                                                    </div>
                                                </div>
                                                <p class="name mb-0 ms-3 text-1100 fw-bold">{{ user.name }}</p>
                                            </div>
                                        </td>
                                        <td class="align-middle white-space-nowrap pe-5 fw-semi-bold">
                                            <span class="username">{{ user.username }}</span>
                                        </td>
                                        <td class="align-middle white-space-nowrap pe-5 fw-semi-bold">
                                            <span class="email d-none">{{ user.email }}</span>
                                            <span>{{ user.email }}</span>
                                        </td>
                                        <td class="align-middle white-space-nowrap fw-semi-bold">
                                            <span class="phone d-none">{{ user.phone }}</span>
                                            <span>{{ asPhone(user.phone) }}</span>
                                        </td>
                                        <td class="align-middle white-space-nowrap text-end fw-semi-bold">
                                            <span class="role">{{ user.role.name }}</span>
                                        </td>
                                        <td class="align-middle white-space-nowrap fw-semi-bold text-end ps-3 pe-2">
                                            <span class="active d-none">{{ user.active }}</span>
                                            <span>{{ user.active ? 'Ativo' : 'Inativo' }}</span>
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
<style></style>