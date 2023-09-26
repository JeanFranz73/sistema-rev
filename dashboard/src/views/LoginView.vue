<script>
import { useSessionStore } from '@/stores'
import { mapActions } from 'pinia'
import { RouterLink } from 'vue-router'
useSessionStore
export default {
    name: 'LoginView',
    data: () => ({
        loading: false,
        form: {
            username: '',
            password: '',
            keepLogged: false
        }
    }),
    components: {
        RouterLink
    },
    methods: {
        ...mapActions(useSessionStore, ['login', 'setToken']),
        async doLogin() {
            this.loading = true
            await this.login(this.form)
                .then((res) => {
                    if (res.status >= 300) {
                        console.log('faiou')
                        this.$toasts.error(res.data.message)
                        return false
                    }
                    this.setToken(res.data.token)
                    this.$router.push({ name: 'dashboard' }).then(() => {
                        this.$toasts.success('Login efetuado com sucesso!')
                    })
                }).catch((error) => {
                    this.$toasts.error(error.response.data.message)
                }).finally(() => {
                    this.loading = false
                })
        }
    }
}
</script>

<template>
    <main class="main" id="top">
        <div class="container">
            <div class="row flex-center min-vh-100 py-5">
                <div class="col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xxl-3">
                    <router-link to="/" class="d-flex flex-center text-decoration-none mb-4">
                        <div class="d-flex align-items-center fw-bolder fs-5 d-inline-block">
                            <!-- <img src="@/assets/logo.svg" width="58" /> -->
                        </div>
                    </router-link>
                    <div class="text-center mb-7">
                        <h3 class="text-1000">Login</h3>
                        <p class="text-700">Entre com sua conta</p>
                    </div>
                    <form @submit.prevent="doLogin">
                        <div class="mb-3 text-start">
                            <label class="form-label" for="username">Nome de usuário</label>
                            <div class="form-icon-container">
                                <input v-model="form.username" :disabled="loading" class="form-control form-icon-input"
                                    id="username" placeholder="nomedeusuario" required />
                                <fontawesome-icon icon="user" class="form-icon fs--1" />
                            </div>
                        </div>
                        <div class="mb-3 text-start">
                            <label class="form-label" for="password">Senha</label>
                            <div class="form-icon-container">
                                <input v-model="form.password" :disabled="loading" class="form-control form-icon-input"
                                    id="password" type="password" placeholder="Senha" />
                                <fontawesome-icon icon="key" class="form-icon fs--1" />
                            </div>
                        </div>
                        <div class="row flex-between-center mb-3">
                            <div class="col-auto">
                                <div class="form-check mb-0">
                                    <input class="form-check-input" id="basic-checkbox" type="checkbox" />
                                    <label class="form-check-label mb-0" for="basic-checkbox">Lembrar login</label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" :disabled="loading" class="btn btn-primary w-100 mb-3">
                            <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            <span v-else>Entrar</span>
                        </button>
                    </form>
                    <div class="text-center">
                        <span class="fs--1">Novo por aqui?
                            <router-link :to="{ name: 'register' }" class="fw-bold">
                                <span>Criar uma conta</span>
                            </router-link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style></style>