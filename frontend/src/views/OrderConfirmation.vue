<template>
  <div class="flex flex-col items-center h-screen bg-slate-100">
    <div class="m-auto px-20 pt-12 pb-10 bg-slate-400 rounded">
      <span class="material-symbols-outlined mt-2 mb-8">check_circle</span>
      <span class="block font-bold text-2xl mb-2">Order Confirmation</span>
      <span class="block">Name: <span class="font-bold">{{ customerName }}</span></span>
      <span class="block">Total: <span class="font-bold">$ {{ orderTotal }} {{ currency.toUpperCase() }}</span></span>
      <div>
        
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

export default {
  name: 'OrderConfirmation',
  data() {
    return {
      customerName: '',
      currency: '',
      orderTotal: ''
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
    }

  } catch (e) {
      this.$router.push({ name: 'home' });
    }
  }
}
</script>
<style scoped>
  .material-symbols-outlined {
    transform: scale(3);
  }
</style>
