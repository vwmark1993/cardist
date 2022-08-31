<template>
  <div class="flex flex-col items-center h-screen bg-slate-100">
    <div class="m-auto px-20 pt-12 pb-10 bg-slate-400 rounded">
      <span class="material-symbols-outlined mt-2 mb-8">check_circle</span>
      <span class="block font-bold text-2xl mb-2">Order Confirmation</span>
      <span class="block mb-2">Name: <span class="font-bold">{{ customerName }}</span></span>
      <span class="block mb-2">Total: <span class="font-bold">$ {{ orderTotal }} {{ currency.toUpperCase() }}</span></span>
      <div class="mb-2">
        <span class="block font-bold">Items Ordered:</span>
        <span v-for="item in orderItems" :key="item.id" class="block">{{ item.name }} x {{ item.quantity }}</span>
      </div>
      <div class="flex justify-center mt-5">
        <button @click="goToHomepage" class="bg-slate-500 hover:bg-slate-700 text-white text-lg font-semibold py-1 px-3 rounded">Return to Website</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import OrderDataService from '@/services/OrderDataService.js'
import OrderItemDataService from '@/services/OrderItemDataService.js'

export default {
  name: 'OrderConfirmation',
  data() {
    return {
      customerName: '',
      currency: '',
      orderTotal: '',
      orderItems: store.state.cart.cartItems
    }
  },
  methods: {
    goToHomepage() {
      this.$router.push({ name: 'home' })
    }
  },
  async mounted() {
    try {
      if (!store.state.user.authenticated) {
        this.$router.push({ name: 'login' });
      } else {
        if (!this.$route.query.session_id || this.$route.query.session_id === undefined) {
          this.$router.push({ name: 'home' });
        }

        let sessionId = this.$route.query.session_id
        let response = await OrderDataService.successfulOrder(sessionId);

        if (response.status !== 200) {
          this.$router.push({ name: 'home' });
        }

        let successfulOrder = response.data;
        
        this.customerName = successfulOrder.customerName;
        this.currency = successfulOrder.currency;
        this.orderTotal = successfulOrder.total / 100;

        if (!store.state.cart.orderConfirmationFlag) {
          let data = {
            buyerId: store.state.user.currentUser.id
          }

          response = await OrderDataService.create(data);
          let orderResponse = response.data;
          let orderId = orderResponse.id;

          this.orderItems.forEach(async orderItem =>  {
            let data = {
              orderId: orderId,
              itemId: orderItem.itemId,
              sellerId: orderItem.sellerId,
              quantity: orderItem.quantity,
              price: orderItem.price
            }

            response = await OrderItemDataService.create(data);
          })

          store.dispatch('cart/setOrderConfirmationFlag', true);
        }
      }

    } catch (e) {
      this.$router.push({ name: 'home' });
    }
  },
  beforeRouteLeave () {
    // Reset shopping cart once the user leaves the page.
    store.dispatch('cart/emptyCart');
    store.dispatch('cart/setOrderConfirmationFlag', false);
  }
}
</script>
<style scoped>
  .material-symbols-outlined {
    transform: scale(3);
  }
</style>
