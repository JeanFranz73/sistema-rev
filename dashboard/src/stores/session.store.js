import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
    state: () => ({
        token: String,
        user: Object
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
        }
    },
    actions: {
        fetch() {
            this.token = localStorage.getItem('token') || ''
        },
        setToken(token) {
            this.token = token
            localStorage.setItem('token', token)
        },
        logout() {
            this.token = ''
            localStorage.removeItem('token')
        },
        updateUser(user) {
            this.user = user
        }
    }
})