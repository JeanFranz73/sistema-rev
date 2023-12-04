import { defineStore } from 'pinia'
import api from '@/utils/api'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        categories: []
    }),
    getters: {
        getCart(state) {
            return {
                items: state.items,
                totalItems: state.items.length,
                totalPrice: state.items.reduce((total, item) => total + (item.price * item.amount), 0)
            }
        },
        getCategory(state) {
            return (id) => state.categories.find(category => category.id === id)
        },
        getItems(state) {
            return state.items
        },
        getTotalItems(state) {
            let total = 0
            state.items.forEach(item => {
                total += item.amount
            })

            return total
        },
        getTotalPrice(state) {
            let totalPrice = 0
            state.items.forEach(item => {
                totalPrice += item.price * item.amount
            })
            return totalPrice.toFixed(2)
        },
        isCartEmpty(state) {
            return state.items.length === 0
        }
    },
    actions: {
        fetch() {
            api.get('/products/categories').then((response) => {
                this.categories = response.data
            })
            localStorage.getItem('cart')
                ? this.items = JSON.parse(localStorage.getItem('cart'))
                : this.items = []
        },
        add(product, amount) {
            const index = this.items.findIndex(item => item.id === product.id)
            if (index === -1) {
                this.items.push({ ...product, amount })
            } else {
                this.items[index].amount += amount
            }

            localStorage.setItem('cart', JSON.stringify(this.items))
        },
        change(id, amount) {
            const index = this.items.findIndex(item => item.id === id)
            this.items[index].amount = amount
            localStorage.setItem('cart', JSON.stringify(this.items))
        },
        remove(id) {
            const index = this.items.findIndex(item => item.id === id)
            this.items.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(this.items))
        },
        clear() {
            this.items = []
            localStorage.removeItem('cart')
        },
        decrement(id) {
            this.change(id, this.items.find(item => item.id === id).amount - 1)
            localStorage.setItem('cart', JSON.stringify(this.items))
        },
        increment(id) {
            this.change(id, this.items.find(item => item.id === id).amount + 1)
            localStorage.setItem('cart', JSON.stringify(this.items))
        }
    }
})