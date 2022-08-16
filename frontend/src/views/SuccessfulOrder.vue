<template>
  <div>
    <span>success order page</span>
  </div>
</template>

<script>
import OrderDataService from '@/services/OrderDataService.js'

export default {
  name: 'SuccessfulOrder',
  data() {
    return {
      customerName: '',
      currency: '',
      orderTotal: ''
    }
  },
  methods: {

  },
  async mounted() {
     if (!store.state.user.authenticated || !this.$route.query.session_id) {
      this.$router.push({ name: 'login' });
    } else {
      let sessionId = this.$route.query.session_id
      let response = await OrderDataService.successfulOrder(sessionId);
      let successfulOrder = response.data;
      
      this.customerName = successfulOrder.customerName;
      this.currency = successfulOrder.currency;
      this.orderTotal = successfulOrder.total * 100;
    }
  }
}
</script>
