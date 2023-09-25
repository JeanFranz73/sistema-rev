<script>
import { RouterLink } from 'vue-router'
export default {
    name: 'LoginView',
    components: {
        RouterLink
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
                    <div class="mb-3 text-start">
                        <label class="form-label" for="email">E-mail</label>
                        <div class="form-icon-container">
                            <input class="form-control form-icon-input" id="email" type="email"
                                placeholder="nome@exemplo.com" />
                            <fontawesome-icon icon="user" class="form-icon fs--1" />
                        </div>
                    </div>
                    <div class="mb-3 text-start">
                        <label class="form-label" for="password">Senha</label>
                        <div class="form-icon-container">
                            <input class="form-control form-icon-input" id="password" type="password" placeholder="Senha" />
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
                    <button class="btn btn-primary w-100 mb-3">Entrar</button>
                    <div class="text-center">
                        <span class="fs--1">Novo por aqui?
                            <router-link to="/register" class="fw-bold">
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