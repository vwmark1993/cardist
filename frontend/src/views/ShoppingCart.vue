<template>
  <div>
    <UserHeader />
    <div class="grid grid-cols-12 grid-flow-col justify-between m-3">
      <div class="col-span-9 text-left">
        <h1 class="text-4xl font-bold text-slate-700 mb-6">Shopping Cart</h1>
        <ShoppingCartItem />
      </div>
      <div class="col-span-3 text-right">
        <button class="cart-button bg-slate-500 hover:bg-slate-700 text-white font-bold text-lg py-3 px-7 rounded">Checkout</button>
        <div class="border rounded bg-slate-100 border-slate-500 p-3 mt-3 ml-6 flex">
          <div class="w-full mx-4">
            <div class="flex justify-between">
              <span>Playing Cards</span>
              <span>$35.00</span>
            </div>
            <div class="flex justify-between border-t border-slate-400 mt-4 pt-1">
              <span class="text-lg font-bold">SUBTOTAL</span>
              <span>$35.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ItemDataService from '@/services/ItemDataService.js'

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
          
      }
  },
  methods: {
    
  },
  computed: {

  },
  mounted() {
    
  }
}
</script>
<style scoped>
  .checkout-button {
    height: 46px;
  }
</style>
