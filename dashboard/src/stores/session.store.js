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
        getUser(state) {
            return state.user
        },
        getFirstName(state) {
            return state.user.name.split(' ')[0]
        }
    },
    actions: {
        fetch() {
            if (localStorage.getItem('token')) {
                this.token = JWT.getToken(localStorage.getItem('token'))
                this.user = JWT.getUser(localStorage.getItem('token'))
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