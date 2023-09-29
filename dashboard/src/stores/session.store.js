import { defineStore } from 'pinia'
import api from '@/utils/api'
import JWT from '@/utils/jwt'

export const useSessionStore = defineStore('session', {
    state: () => ({
        token: '',
        user: {}
    }),
    getters: {
        isLoggedIn(state) {
            return !!state.token
        },
        isAdmin(state) {
            return state.user && state.user.role === 1
        },
        getLoggedUser(state) {
            return state.user
        },
        getFirstName(state) {
            return state.user.name.split(' ')[0]
        }
    },
    actions: {
        async fetch() {
            let token = localStorage.getItem('token')
            if (token) {
                this.token = JWT.getToken(token)
                this.user = JWT.getUser(token)
            }
        },
        async login(login) {
            return await api.post('/auth', login).then(async (res) => {
                await this.setToken(res.data.token)
            })
        },
        async logout() {
            localStorage.removeItem('token')
            return this.$reset()
        },
        async setToken(token) {
            api.setBearerToken(token)
            localStorage.setItem('token', token)
            this.fetch()
        }
    }
})