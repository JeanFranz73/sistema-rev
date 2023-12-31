<script>
import { useConfigStore, useSessionStore, useCartStore } from '@/stores'
import { mapState, mapActions } from 'pinia'
import { isDesktop, getAvatar } from '@/helpers'

export default {
    name: 'DefaultHeader',
    data: () => ({
        navTheme: false,
        noAvatar: false,
        getAvatar
    }),
    computed: {
        ...mapState(useConfigStore, ['getTheme']),
        ...mapState(useSessionStore, ['getFirstName', 'getEmail', 'isAdmin', 'getLoggedUser']),
        ...mapState(useCartStore, ['getTotalItems']),
        greetings() {
            return `Olá ${this.getFirstName}!`
        }
    },
    methods: {
        ...mapActions(useConfigStore, ['setTheme']),
        ...mapActions(useSessionStore, ['logout']),
        async doLogout() {
            await this.logout().then(() => {
                this.$router.push({ name: 'login' }).then(() => {
                    this.$toasts.success('Logout efetuado com sucesso!')
                })
            })
        }
    },
    watch: {
        navTheme(val) {
            this.setTheme(val)
        }
    },
    mounted() {
        this.navTheme = this.getTheme
        if (!isDesktop) {
            this.$refs.defaultHeaderNav.querySelectorAll('.navbar-dropdown-caret > li').forEach((item) => {
                item.addEventListener('click', () => {
                    this.$refs.defaultHeaderNav.querySelector('.navbar-toggler').click()
                    this.$refs.defaultHeaderNav.querySelectorAll('.dropdown').forEach((dropdown) => {
                        dropdown.hide()
                    })
                })
            })
        }
    },
}
</script>

<template>
    <nav class="navbar navbar-top fixed-top navbar-expand-lg" id="navbarTop" ref="defaultHeaderNav">
        <div class="navbar-logo">
            <button class="btn navbar-toggler navbar-toggler-humburger-icon hover-bg-transparent" data-bs-toggle="collapse"
                    data-bs-target="#navbarTopCollapse">
                <span class="navbar-toggle-icon">
                    <span class="toggle-line"></span>
                </span>
            </button>
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
            <ul class="navbar-nav navbar-nav-top">
                <li v-if="isAdmin" class="nav-item dropdown" dropdown-hover>
                    <router-link :to="{ name: 'orders' }" class="nav-link dropdown-toggle lh-1" data-bs-toggle="dropdown">
                        <icones class="fs-0 me-2" type="basket" size="16" />
                        <span>Pedidos</span>
                    </router-link>
                    <ul class="dropdown-menu navbar-dropdown-caret">
                        <li>
                            <router-link class="dropdown-item" :to="{ name: 'orders' }">
                                <div class="dropdown-item-wrapper align-items-center">
                                    <icones class="me-2" type="basket" size="16" />
                                    <span>Ver pedidos</span>
                                </div>
                            </router-link>
                        </li>
                        <!-- <li>
                            <router-link class="dropdown-item" :to="{ name: 'new-order' }">
                                <div class="dropdown-item-wrapper align-items-center">
                                    <icones class="me-2" type="basket-plus" size="16" />
                                    <span>Novo pedido</span>
                                </div>
                            </router-link>
                        </li> -->
                        <!-- <li>
                            <router-link class="dropdown-item" :to="{ name: 'delivery-days' }">
                                <div class=" dropdown-item-wrapper align-items-center">
                                    <icones class="me-2" type="calendar-event" size="16" />
                                    <span>Dias de entrega</span>
                                </div>
                            </router-link>
                        </li> -->
                    </ul>
                </li>
                <li class="nav-item dropdown" dropdown-hover>
                    <router-link :to="{ name: 'admin-products' }" class="nav-link dropdown-toggle lh-1" data-bs-toggle="dropdown">
                        <icones type="cube" class="fs-0 me-2" />
                        <span>Produtos</span>
                    </router-link>
                    <ul class="dropdown-menu navbar-dropdown-caret">
                        <li>
                            <router-link class="dropdown-item" :to="{ name: 'admin-products' }">
                                <div class="dropdown-item-wrapper">
                                    <icones class="me-2" type="cube" size="16" />
                                    <span>Ver produtos</span>
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item" :to="{ name: 'new-product' }">
                                <div class="dropdown-item-wrapper">
                                    <icones class="me-2" type="cube-plus" size="16" />
                                    <span>Novo produto</span>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown" dropdown-hover>
                    <router-link :to="{ name: 'users' }" class="nav-link dropdown-toggle lh-1" data-bs-toggle="dropdown">
                        <icones class=" fs-0 me-2" type="users" size="16" />
                        <span>Usuários</span>
                    </router-link>
                    <ul class="dropdown-menu navbar-dropdown-caret">
                        <li>
                            <router-link class="dropdown-item" :to="{ name: 'users' }">
                                <div class="dropdown-item-wrapper">
                                    <icones class="me-2" type="users" size="16" />
                                    <span>Ver usuários</span>
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item" :to="{ name: 'new-user' }">
                                <div class="dropdown-item-wrapper">
                                    <icones class="me-2" type="user-plus" size="16" />
                                    <span>Novo usuário</span>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <ul class="navbar-nav navbar-nav-icons flex-row">
            <div class="nav-item">
                <router-link class="nav-link icon-indicator icon-indicator-primary" :to="{ name: 'cart' }">
                    <icones type="shopping-cart" size="20" />
                    <span class="icon-indicator-number">{{ getTotalItems ?? 0 }}</span>
                </router-link>
            </div>
            <li class="nav-item">
                <div class="theme-control-toggle px-2">
                    <input class="form-check-input ms-0 theme-control-toggle-input" type="checkbox" v-model="navTheme"
                           true-value="dark" false-value="light" id="themeControlToggle" />
                    <label class="mb-0 theme-control-toggle-label theme-control-toggle-light" for="themeControlToggle"
                           data-bs-toggle="tooltip" desktop-only data-bs-placement="left" title="Alterar para tema claro">
                        <icones type="moon" size="16" />
                    </label>
                    <label class="mb-0 theme-control-toggle-label theme-control-toggle-dark" for="themeControlToggle"
                           data-bs-toggle="tooltip" desktop-only data-bs-placement="left" title="Alterar para tema escuro">
                        <icones type="sun" size="16" />
                    </label>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link lh-1 pe-0" id="navbarDropdownUser" href="#!" role="button"
                   data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                    <div class="avatar avatar-l">
                        <img v-if="!noAvatar" class="rounded-circle" :src="getAvatar(getEmail, 40)"
                             @error="noAvatar = true" />
                        <div v-else class="avatar-name rounded-circle">
                            <span>{{ getFirstName.charAt(0) }}</span>
                        </div>
                    </div>
                </a>
                <div class="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border border-300"
                     aria-labelledby="navbarDropdownUser">
                    <div class="card position-relative border-0">
                        <div class="card-body p-0">
                            <div class="text-center pt-4 pb-3">
                                <div class="avatar avatar-xl ">
                                    <img v-if="!noAvatar" class="rounded-circle" :src="getAvatar(getEmail, 48)"
                                         @error="noAvatar = true" />
                                    <div v-else class="avatar-name rounded-circle">
                                        <span>{{ getFirstName.charAt(0) }}</span>
                                    </div>
                                    <!-- <img class="rounded-circle " src="https://github.com/jeanfranz73.png" alt="" /> -->
                                </div>
                                <h6 class="mt-2 text-black">{{ greetings }}</h6>
                            </div>
                        </div>
                        <div class="overflow-auto scrollbar">
                            <ul class="nav d-flex flex-column mb-2 pb-1">
                                <!-- <li class="nav-item">
                                    <a class="nav-link px-3" href="#!">
                                        <icones type="user" size="16" class="me-2 text-900" />
                                        <span>Perfil</span>
                                    </a>
                                </li> -->
                                <li class="nav-item">
                                    <router-link :to="{ name: 'dashboard' }" class="nav-link px-3">
                                        <icones type="chart-bar" size="16" class="me-2 text-900" />
                                        <span>Dashboard</span>
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link :to="{ name: 'user-orders', params: { id: getLoggedUser.id } }" class="nav-link px-3">
                                        <icones type="clipboard-list" size="16" class="me-2 text-900" />
                                        <span>Meus pedidos</span>
                                    </router-link>
                                </li>
                                <!-- <li class="nav-item">
                                    <a class="nav-link px-3" href="#!">
                                        <icones type="settings" size="16" class="me-2 text-900" />
                                        <span>Configurações</span>
                                    </a>
                                </li> -->
                            </ul>
                        </div>
                        <div class="card-footer p-0">
                            <div class="p-3">
                                <a class="btn btn-snipe-secondary d-flex flex-center w-100" @click="doLogout">
                                    <icones size="16" class="me-2" type="logout-2" />
                                    <span class="h-auto">Sair</span>
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