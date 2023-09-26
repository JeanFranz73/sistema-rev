<script>
import { RouterLink } from 'vue-router'
import IMask from 'imask'

export default {
    name: 'RegisterView',
    data: () => ({
        masks: {
            cpf: Object,
            cpfMask: ''
        },
        form: {
            cpf: ''
        }
    }),
    components: {
        RouterLink
    },
    watch: {
        masks: {
            handler(val) {
                this.form.cpf = this.masks.cpf.unmaskedValue
            },
            deep: true
        }
    },
    methods: {
        initMasks() {
            this.masks.cpf = IMask(document.getElementById('cpf'), {
                mask: '000.000.000-00'
            })
        }
    },
    mounted() {
        this.initMasks()
    }
}
</script>

<template>
    <div class="container">
        <div class="row flex-center min-vh-100 py-5">
            <div class="col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xxl-3">
                <router-link to="/" class="d-flex flex-center text-decoration-none mb-4">
                    <div class="d-flex align-items-center fw-bolder fs-5 d-inline-block">
                        <!-- <img src="@/assets/logo.svg" width="58" /> -->
                    </div>
                </router-link>
                <div class="text-center mb-7">
                    <h3 class="text-1000">Registrar-se</h3>
                    <p class="text-700">Crie sua conta</p>
                </div>
                <form>
                    <div class="mb-3 text-start">
                        <label class="form-label" for="name">Nome</label>
                        <input class="form-control" id="name" type="text" placeholder="Nome" />
                    </div>
                    <div class="mb-3 text-start">
                        <label class="form-label" for="email">E-mail</label>
                        <input class="form-control" id="email" type="email" placeholder="nome@exemplo.com" />
                    </div>
                    <div class="mb-3 text-start">
                        <label class="form-label" for="cpf">CPF</label>
                        <input class="form-control" id="cpf" v-model="masks.cpfMask" placeholder="000.000.000-00"
                            maxlength="14" />
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col-sm-6">
                            <label class="form-label" for="password">Senha</label>
                            <input class="form-control form-icon-input" id="password" type="password" placeholder="Senha" />
                        </div>
                        <div class="col-sm-6">
                            <label class="form-label" for="confirmPassword">Repita a senha</label>
                            <input class="form-control form-icon-input" id="confirmPassword" type="password"
                                placeholder="Repita a senha" />
                        </div>
                    </div>
                    <button class="btn btn-primary w-100 mb-2">Registrar-se</button>
                    <div class="position-relative">
                        <hr class="bg-200" />
                        <div class="divider-content-center mb-3">ou</div>
                    </div>
                    <div class="text-center">
                        <router-link :to="{ name: 'login' }" class="fs--1 fw-bold">
                            <span>Entrar com uma conta existente</span>
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>