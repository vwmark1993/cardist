<template>
  <div class="flex flex-col items-center h-screen bg-primary">
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="alertMessage" :message="alertMessage" :mode="alertMessageMode" />
      </Transition>
    </div>
    <div class="m-auto px-20 pt-12 pb-10 rounded bg-secondary text-primary">
      <span class="material-symbols-outlined scale mt-2 mb-8">check_circle</span>
      <span class="block font-bold text-2xl mb-3">Order Confirmation</span>
      <span class="block mb-2">Name: <span class="font-bold">{{ customerName }}</span></span>
      <span class="block mb-2">Total: <span class="font-bold">$ {{ orderTotal }} {{ currency.toUpperCase() }}</span></span>
      <div class="mb-2">
        <span class="block font-bold">Items Ordered:</span>
        <div class="scroll-container overflow-auto">
          <span v-for="item in orderItems" :key="item.id" class="block">{{ item.name }} x {{ item.quantity }}</span>
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <button @click="goToHomepage" class="bg-secondary text-primary hover:bg-tertiary text-lg font-semibold py-1 px-3 rounded flex items-center">
          <span class="material-symbols-outlined mr-1">exit_to_app</span>
          <span>Return to Website</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

import AlertMessage from '@/components/AlertMessage.vue'

import CartItemDataService from '@/services/CartItemDataService.js'
import OrderDataService from '@/services/OrderDataService.js'
import OrderItemDataService from '@/services/OrderItemDataService.js'
import ItemDataService from '@/services/ItemDataService.js'
import UserDataService from '@/services/UserDataService.js'

export default {
  name: 'OrderConfirmation',
  components: {
    AlertMessage
  }, 
  data() {
    return {
      alertMessage: '',
      alertMessageMode: '',

      customerName: '',
      currency: '',
      orderTotal: 0,
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
        if (store.state.user.authenticated) {
          let userResponse = await UserDataService.get(store.state.user.currentUser.id);

          if (userResponse.data.length === 0) {
            store.dispatch('user/authentication', {
              authenticated: false,
              user: {
                id: null,
                username: null,
                email: null,
                phone: null,
                picture: null,
                settings: null,
                totalEarnings: null,
                totalSpending: null,
                admin: null
              }
            });

            store.dispatch('search/searchItems', '')
            store.dispatch('search/resetFilters');
            store.dispatch('cart/emptyCart');

            this.$router.push({ name: 'home' });

            return;
          }
        }

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

        // Only execute order confirmation API call once per page mount.
        if (!store.state.cart.orderConfirmationFlag) {
          let data = {
            buyerId: store.state.user.currentUser.id
          }

          // Create new order.
          response = await OrderDataService.create(data);
          let orderResponse = response.data;
          let orderId = orderResponse.id;

          // Update the buyer's total spending.
          data = {
            total_spending: store.state.user.currentUser.totalSpending + this.orderTotal
          }

          response = await UserDataService.update(store.state.user.currentUser.id, data);


          // Create new order item for each item ordered.
          // Increase numbers sold for each item.
          this.orderItems.forEach(async orderItem =>  {
            let data = {
              orderId: orderId,
              itemId: orderItem.itemId,
              sellerId: orderItem.sellerId,
              quantity: orderItem.quantity,
              price: orderItem.price
            }

            response = await OrderItemDataService.create(data);

            // Update number sold on item.
            response = await ItemDataService.get(orderItem.itemId);
            let currentNumberSold = response.data.number_sold;

            data = {
              number_sold: currentNumberSold + orderItem.quantity
            }

            response = await ItemDataService.update(orderItem.itemId, data);

            // Update each seller's total earnings.
            response = await UserDataService.get(orderItem.sellerId);

            let currentTotalEarnings = response.data.total_earnings;

            data = {
              total_earnings: currentTotalEarnings + ( orderItem.quantity * orderItem.price )
            }
            response = await UserDataService.update(orderItem.sellerId, data);
          })

          // Empty the cart.
          this.orderItems.forEach(async cartItem => {
            await CartItemDataService.delete(cartItem.id);
          })
        }
        
        store.dispatch('cart/setOrderConfirmationFlag', true);
      }

    } catch (e) {
      this.alertMessage = e;
      this.alertMessageMode = 'failure';

      setTimeout(() => {
        this.alertMessage = null;
        this.alertMessageMode = null;

        this.$router.push({ name: 'home' });
      }, 3000)
    }
  }
}
</script>
<style scoped>
   .scroll-container {
      max-height: 250px;
    }
  .scale {
    transform: scale(3);
  }
</style>
