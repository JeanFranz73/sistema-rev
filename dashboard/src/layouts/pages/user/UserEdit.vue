<script>
import { getAvatar } from '@/helpers'
import api from '@/utils/api'

export default {
    name: 'UserEdit',
    data: () => ({
        getAvatar,
        noAvatar: false,
        user: {
            name: 'Novo usuário',
            username: '',
            email: '',
            cpf: '',
            phone: '',
            oldPassword: '',
            password: '',
            confirmPassword: ''
        },
        loading: false,
        hasParameter: false
    }),
    methods: {
        async getUser(){
            await api.get(`/user/${this.$route.params.id}`)
                .then((res) => {
                    this.user = {
                        image: res.data.image ? res.data.image : undefined
                    }
                    this.user.username = res.data.username
                    this.user.name = res.data.name
                    this.user.email = res.data.email
                    this.user.cpf = res.data.cpf
                    this.user.phone = res.data.phone
                    this.avatar = getAvatar(this.user.email, 150)
                    this.noAvatar = false

                    this.loading = false
                }).catch((err) => {
                    console.error(err)
                    this.$toasts.error('Não foi possível carregar o usuário.')
                })
        },
        async doSubmit(){
            this.loading = true
            if (this.user.password && this.user.password !== this.user.confirmPassword){
                this.$toasts.error('As senhas informadas não são iguais.')
                this.loading = false
                throw new Error()
            }
            
            if (this.hasParameter){
                delete this.user.confirmPassword
                delete this.user.oldPassword
                delete this.user.initial
                delete this.user.created
                await api.patch(`/user/${this.$route.params.id}`, this.user)
                    .then(res => {
                        this.$toasts.success('Usuário editado com sucesso.')
                        this.$router.push({ name: 'users' })
                    }).catch(error => {
                        console.log(error)
                    })
            } else {
                delete this.user.confirmPassword
                delete this.user.oldPassword
                await api.post('/user/new', this.user)
                    .then(res => {
                        this.$toasts.success('Usuário adicionado com sucesso.')
                        this.$router.push({ name: 'users' })
                    }).catch(error => {
                        console.log(error)
                    })
            }
            this.loading = false
        },
        getOutOfPage(){
            this.$router.push({ name: 'users' })
        }
    },
    mounted(){
        this.hasParameter = this.$route.params.id
        if (this.hasParameter){
            this.getUser()
        }
    }
}
</script>

<template>
    <div class="mb-9">
        <div class="row g-6">
            <div class="col-12 col-xl-4">
                <div class="card mb-5">
                    <div class="card-header hover-actions-trigger position-relative mb-6" style="min-height: 60px; ">
                        <div class="bg-holder rounded-top" style="background-image: linear-gradient(0deg, #00000044 -3%, rgba(0, 0, 0, 0) 83%)">
                        </div>
                        <div class="avatar avatar-4xl status-online feed-avatar-profile">
                            <img v-if="!noAvatar" class="rounded-circle img-thumbnail bg-white shadow-sm" :src="getAvatar(user.email, 200)" width="200" @error="noAvatar = true" />
                            <div v-else class="avatar-name rounded-circle">
                                <span>{{ user.name.charAt(0) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="d-flex flex-wrap mb-2 align-items-center">
                                    <h3 class="me-2">{{ user.name ?? 'Novo usuário' }}</h3>
                                    <span class="fw-normal fs-0">{{ user.username ?? 'usuario' }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-8">
                <form @submit.prevent="doSubmit" class="border-bottom border-300 mb-4">
                    <div class="mb-6">
                        <h4 class="mb-4">Informações Pessoais</h4>
                        <div class="row g-3">
                            <div class="col-12 col-sm-6">
                                <div class="form-icon-container">
                                    <div class="form-floating">
                                        <input v-model="user.username" class="form-control form-icon-input" id="name" type="text" placeholder="Nome" />
                                        <label class="text-700 form-icon-label" for="name">Username</label>
                                    </div>
                                    <icones type="user" class="text-900 fs--1 form-icon" />
                                </div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="form-icon-container">
                                    <div class="form-floating">
                                        <input v-model="user.name" class="form-control form-icon-input" id="name" type="text" placeholder="Nome" />
                                        <label class="text-700 form-icon-label" for="name">Nome</label>
                                    </div>
                                    <icones type="user" class="text-900 fs--1 form-icon" />
                                </div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="form-icon-container">
                                    <div class="form-floating">
                                        <input v-model="user.email" class="form-control form-icon-input" id="email" type="email" placeholder="E-mail" />
                                        <label class="text-700 form-icon-label" for="email">E-mail</label>
                                    </div>
                                    <icones type="mail" class="text-900 fs--1 form-icon" />
                                </div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="form-icon-container">
                                    <div class="form-floating">
                                        <input v-model="user.cpf" class="form-control form-icon-input" id="cpf" type="cpf" placeholder="E-mail" />
                                        <label class="text-700 form-icon-label" for="cpf">CPF</label>
                                    </div>
                                    <icones type="mail" class="text-900 fs--1 form-icon" />
                                </div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="form-icon-container">
                                    <div class="form-floating">
                                        <input v-model="user.phone" class="form-control form-icon-input" id="phone" type="tel" placeholder="Telefone" />
                                        <label class="text-700 form-icon-label" for="phone">Telefone</label>
                                    </div>
                                    <icones type="phone" class="text-900 fs--1 form-icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row gx-3 mb-6 gy-6 gy-sm-3">
                        <div class="col-12 col-sm-6">
                            <h4 class="mb-4">{{ hasParameter ? "Alterar senha ": "Criar senha" }}</h4>
                            <div v-if="hasParameter" class="form-icon-container mb-3">
                                <div class="form-floating">
                                    <input v-model="user.oldPassword" class="form-control form-icon-input" id="oldPassword" type="password" placeholder="Senha antiga" />
                                    <label class="text-700 form-icon-label" for="oldPassword">Senha antiga</label>
                                </div>
                                <icones type="lock" size="15" class="text-900 fs--1 form-icon" />
                            </div>
                            <div class="form-icon-container mb-3">
                                <div class="form-floating">
                                    <input v-model="user.password" class="form-control form-icon-input" id="password" type="password" placeholder="Nova senha" />
                                    <label class="text-700 form-icon-label" for="password">{{ hasParameter ? "Nova senha" : "Digite uma senha"}}</label>
                                </div>
                                <icones type="key" size="15" class="text-900 fs--1 form-icon" />
                            </div>
                            <div class="form-icon-container">
                                <div class="form-floating">
                                    <input v-model="user.confirmPassword" class="form-control form-icon-input" id="confirmPassword" type="password" placeholder="Confirmar nova senha" />
                                    <label class="text-700 form-icon-label" for="confirmPassword">{{ hasParameter ? "Confirmar nova senha" : "Confirme a senha"}}</label>
                                </div>
                                <icones type="key" size="15" class="text-900 fs--1 form-icon" />
                            </div>
                        </div>
                    </div>
                    <div class="text-end mb-6">
                        <div>
                            <button class="btn btn-snipe-secondary me-2" @click="getOutOfPage">
                                <span>Cancelar</span>
                            </button>
                            <button :disabled="loading" type="submit" class="btn btn-snipe-success">
                                <icones type="user-check" class="me-2" size="13" />
                                <span>{{ hasParameter ? "Salvar alterações" : "Criar usuário"}}</span>
                            </button>
                        </div>
                    </div>
                </form>
                <div v-if="hasParameter" class="row gy-5">
                    <div class="col-12 col-md-6">
                        <h4 class="text-black">Inativar conta</h4>
                        <p class="text-700">Desativar o usuário e bloquear o acesso ao sistema</p>

                        <button class="btn btn-snipe-danger">
                            <icones type="user-minus" class="me-2" size="13" />
                            <span>Inativar conta</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>