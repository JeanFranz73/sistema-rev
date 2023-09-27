<script>
import { defineComponent } from 'vue'

import { useConfigStore, useSessionStore } from '@/stores'
import { mapState, mapActions } from 'pinia'

export default defineComponent({
    name: 'DefaultHeader',
    data: () => ({
        navTheme: false
    }),
    computed: {
        ...mapState(useConfigStore, ['getTheme']),
        ...mapState(useSessionStore, ['getFirstName']),
        greetings() {
            return `Olá ${this.getFirstName}!`
        }
    },
    methods: {
        ...mapActions(useConfigStore, ['setTheme']),
        ...mapActions(useSessionStore, ['logout']),
        doLogout() {
            this.logout()
            this.$router.push('/login').then(() => {
                this.$toasts.success('Logout efetuado com sucesso!')
            })
        }
    },
    mounted() {
        this.navTheme = this.getTheme
    },
    watch: {
        navTheme(val) {
            this.setTheme(val)
        }
    }
})
</script>

<template>
    <nav class="navbar navbar-top fixed-top navbar-expand-lg" id="navbarTop">
        <div class="navbar-logo">
            <button class="btn navbar-toggler navbar-toggler-humburger-icon hover-bg-transparent" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarTopCollapse">
                <span class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>
            <router-link :to="{ name: 'dashboard' }" class="navbar-brand me-1 me-sm-3">
                <div class="d-flex align-items-center">
                    <div class="d-flex align-items-center">
                        <p class="logo-text ms-2 d-none d-sm-block">Sistema</p>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="collapse navbar-collapse navbar-top-collapse order-1 order-lg-0 justify-content-center"
            id="navbarTopCollapse">
            <ul class="navbar-nav navbar-nav-top" dropdown-hover="dropdown-hover">
                <li class="nav-item dropdown">
                    <router-link :to="{ name: 'orders' }" class="nav-link dropdown-toggle lh-1" role="button">
                        <feather-icon class="fs-0 me-2" icon="shopping-bag" size="16" />
                        <span>Pedidos</span>
                    </router-link>
                    <ul class="dropdown-menu navbar-dropdown-caret">
                        <li>
                            <router-link class="dropdown-item" :to="{ name: 'orders' }">
                                <div class="dropdown-item-wrapper">
                                    <feather-icon class="me-2" icon="shopping-bag" size="16" />
                                    <span>Ver pedidos</span>
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item" :to="{ name: 'new-order' }">
                                <div class="dropdown-item-wrapper">
                                    <feather-icon class="me-2" icon="plus-square" size="16" />
                                    <span>Novo pedido</span>
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item" :to="{ name: 'new-order' }">
                                <div class=" dropdown-item-wrapper">
                                    <feather-icon class="me-2" icon="calendar" size="16" />
                                    <span>Dias de entrega</span>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle lh-1" role="button" data-bs-toggle="dropdown"
                        data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                        <unicon-icon icon="cube" class="fs-0 me-2" />
                        <span>Produtos</span>
                    </a>
                    <ul class="dropdown-menu navbar-dropdown-caret">
                        <li>
                            <router-link class="dropdown-item" to="/produtos">
                                <div class="dropdown-item-wrapper">
                                    <feather-icon class="me-2" icon="shopping-cart" size="16" />Ver produtos
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item" to="/produtos/novo">
                                <div class="dropdown-item-wrapper">
                                    <feather-icon class="me-2" icon="clipboard" size="16" />Novo produto
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <router-link class="nav-link lh-1" :to="{ name: 'users' }">
                        <feather-icon class=" fs-0 me-2" icon="users" size="16" />
                        <span>Usuários</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <ul class="navbar-nav navbar-nav-icons flex-row">
            <li class="nav-item">
                <div class="theme-control-toggle px-2">
                    <input class="form-check-input ms-0 theme-control-toggle-input" type="checkbox" v-model="navTheme"
                        true-value="dark" false-value="light" id="themeControlToggle" />
                    <label class="mb-0 theme-control-toggle-label theme-control-toggle-light" for="themeControlToggle"
                        data-toggle="tooltip" data-bs-placement="left" title="Alterar para tema claro">
                        <feather-icon icon="moon" size="16" /></label>
                    <label class="mb-0 theme-control-toggle-label theme-control-toggle-dark" for="themeControlToggle"
                        data-toggle="tooltip" data-bs-placement="left" title="Alterar para tema escuro">
                        <feather-icon icon="sun" size="16" /></label>
                </div>
            </li>
            <li class="nav-item dropdown"><a class="nav-link lh-1 pe-0" id="navbarDropdownUser" href="#!" role="button"
                    data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                    <div class="avatar avatar-l">
                        <img class="rounded-circle " src="https://github.com/jeanfranz73.png" alt="" />
                    </div>
                </a>
                <div class="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border border-300"
                    aria-labelledby="navbarDropdownUser">
                    <div class="card position-relative border-0">
                        <div class="card-body p-0">
                            <div class="text-center pt-4 pb-3">
                                <div class="avatar avatar-xl ">
                                    <img class="rounded-circle " src="https://github.com/jeanfranz73.png" alt="" />
                                </div>
                                <h6 class="mt-2 text-black">{{ greetings }}</h6>
                            </div>
                        </div>
                        <div class="overflow-auto scrollbar">
                            <ul class="nav d-flex flex-column mb-2 pb-1">
                                <li class="nav-item">
                                    <a class="nav-link px-3" href="#!">
                                        <feather-icon icon="user" size="16" class="me-2 text-900" />
                                        <span>Perfil</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link px-3" href="#!">
                                        <feather-icon icon="pie-chart" size="16" class="me-2 text-900" />
                                        <span>Dashboard</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link px-3" href="#!">
                                        <feather-icon icon="settings" size="16" class="me-2 text-900" />
                                        <span>Configurações</span></a>
                                </li>
                            </ul>
                        </div>
                        <div class="card-footer p-0">
                            <div class="p-3">
                                <a class="btn btn-snipe-secondary d-flex flex-center w-100" @click="doLogout">
                                    <feather-icon size="16" class="me-2" icon="log-out" />
                                    <span>Sair</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss"></style>