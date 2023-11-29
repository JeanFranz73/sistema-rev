import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
   state: () => ({
      items: [],
   }),
   getters: {
      getItems(state){
         return state.items
      },
      getTotalItems(state){
         let total = 0;
         state.items.forEach(item => {
            total += item.amount
         })

         return total;
      },
      getTotalPrice(state){
         let totalPrice = 0;
         state.items.forEach(item => {
            totalPrice += item.price * item.amount
         })
         return totalPrice.toFixed(2);
      }
   },
   actions: {
      add(product, amount) {
         const index = this.items.findIndex(item => item.id === product.id);
         if(index === -1){
            this.items.push({...product, amount});
         } else {
            this.items[index].amount += amount;
         }
      },
      remove(product){
         const index = this.items.findIndex(item => item.id === product.id);
         if(index !== -1){
            this.items.splice(index, 1);
         }
      }
   }
})