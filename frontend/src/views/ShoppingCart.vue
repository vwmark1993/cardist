<template>
  <div>
    <UserHeader />
    <div class="grid grid-cols-12 grid-flow-col justify-between m-3">
      <div class="col-span-9 text-left">
        <h1 class="text-4xl font-bold text-slate-700 mb-6">Shopping Cart</h1>
        <div v-if="cartItems.length > 0">
          <ShoppingCartItem 
            v-for="(cartItem, index) in cartItems" 
            :key="cartItem.id" 
            :index="index" 
            :id="cartItem.id" 
            :name="cartItem.name" 
            :thumbnail="cartItem.thumbnail" 
            :quantityProp="cartItem.quantity" 
            :price="cartItem.price"
            />
        </div>
        <div v-else>
          <span class="font-semi-bold text-lg text-slate-400 italic">Empty Cart</span>
        </div>
      </div>
      <div class="col-span-3 text-right">
        <button v-if="cartItems.length > 0" @click="checkout" class="cart-button bg-slate-500 hover:bg-slate-700 text-white font-bold text-lg py-3 px-7 rounded select-none">Checkout</button>
        <div v-if="cartItems.length > 0" class="border rounded bg-slate-100 border-slate-500 p-3 mt-3 ml-6 flex">
          <div class="w-full px-4">
            <div v-for="cartItem in cartItems" :key="cartItem.id">
              <div v-if="cartItem.quantity > 0" class="flex justify-between text-sm mb-1">
                <span class="truncate">{{ cartItem.name }} x {{ cartItem.quantity }}</span>
                <span>{{ cartItem.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
              </div>
            </div>
            <div class="flex flex-wrap justify-between items-center border-t border-slate-400 mt-4 pt-1">
              <span class="text-lg font-bold truncate">SUBTOTAL</span>
              <span>{{ subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

import CartDataService from '@/services/CartDataService.js'

import UserHeader from '@/components/UserHeader.vue'
import ShoppingCartItem from '@/components/ShoppingCartItem.vue'

export default {
  name: 'ShoppingCart',
  components: {
    UserHeader,
    ShoppingCartItem
  },
  data() {
      return {
          userId: store.state.user.currentUser.id,
          cartId: store.state.cart.cartId,
          cartItems: store.state.cart.cartItems
      }
  },
  computed: {
    subtotal() {
      let subtotal = 0;

      this.cartItems.forEach(item => {
        subtotal += item.price
      })

      return subtotal;
    }
  },
  methods: {
    checkout() {
      let data = {
        items: this.cartItems.map(item => {
          return {
            id: item.itemId,
            quantity: item.quantity
          }
        })
      }

      CartDataService.checkout(data)
      .then (res => {
        if (res.status == 200) {
          let url = res.data.url
          window.location = url
          // window.location.replace(url)
        }

      })
      .catch(e => {
        console.error(e.error)
      })
    }
  },
  async mounted() {
    if (!store.state.user.authenticated) {
      this.$router.push({ name: 'login' });
    }
  }
}
</script>
<style scoped>
  .checkout-button {
    height: 46px;
  }
</style>
