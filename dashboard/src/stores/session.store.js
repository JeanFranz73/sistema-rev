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
            if (localStorage.getItem('token')) {
                await api.get('/auth/verify').then((res) => {
                    this.token = JWT.getToken(localStorage.getItem('token'))
                    this.user = JWT.getUser(localStorage.getItem('token'))
                }).catch((err) => {
                    this.logout()
                })
                api.setBearerToken(this.token)
            }
        },
        async login(login) {
            const { username, password } = login

            return await api.post('/auth', { username, password })
        },
        logout() {
            this.token = ''
            localStorage.removeItem('token')
        },
        updateUser(user) {
            this.user = user
        },
        setToken(token) {
            localStorage.setItem('token', token)
            api.setBearerToken(token)
            this.fetch()
        }
    }
})