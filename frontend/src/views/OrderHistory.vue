<template>
  <div>
    <OrderItemDetailsModal 
      :id="orderItemDetailsModalId"
      @orderItemDetailsError="(message) => showMessage(message, 'failure')"
    />
    <UserHeader />
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="alertMessage" :message="alertMessage" :mode="alertMessageMode" />
      </Transition>
    </div>
    <div>
      <div class="flex items-center mb-6">
        <h1 class="text-4xl font-bold text-slate-700 text-left m-3">Item Listings</h1>
      </div>
      <div v-if="orderItems.length === 0">
        <span class="block text-slate-400 text-xl italic mb-4">No Items Ordered</span>
      </div>
      <div v-else>
        <div v-for="order in orderItems" :key="order.id" class="item-listings-item-container border rounded border-slate-300 bg-slate-100 p-3 m-3 flex">
          <div class="flex items-center mr-3">
            <img v-if="order.images && order.images.length > 0 && order.images[0] !== ''" :src="order.images[0]" class="item-listings-item-image border rounded m-auto" />
            <img v-else src="../assets/images/image-placeholder.png" class="item-listings-item-image border rounded m-auto" />
          </div>
          <div class="w-full relative">
            <div class="item-listings-item-header flex justify-between items-center border-b border-slate-400 mb-1">
              <h6 class="text-lg truncate">{{ order.name }}</h6>
              <div>
                <button @click="showOrderItemDetails(order.id)" class="bg-slate-500 hover:bg-slate-700 text-white text-sm px-3 py-1 mr-1 rounded">Details</button>
              </div>
            </div>
            <span class="block text-left text-xs mb-1">Posted on: {{ new Date(order.created_on).toLocaleDateString("en-US") }}</span>
            <span class="block text-left">Total Earnings: {{ (order.number_sold * order.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
            <div class="bottom-0 mb-1 absolute">
              <div class="flex flex-row items-center">
                <span class="text-sm">Unit Sales: {{ order.number_sold }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store';

  import UserHeader from '@/components/UserHeader.vue'
  import AlertMessage from '@/components/AlertMessage.vue'

  import { $vfm } from 'vue-final-modal'
  import OrderItemDetailsModal from '@/components/OrderItemDetailsModal.vue'

  import OrderDataService from '@/services/OrderDataService.js'
  import OrderItemDataService from '@/services/OrderItemDataService.js'
  import ItemDataService from '@/services/ItemDataService.js'

  

  export default {
    name: 'OrderHistory',
    components: {
      UserHeader,
      AlertMessage,
      OrderItemDetailsModal
    },
    data() {
      return {
        orderItems: [],

        deleteId: '',
        deleteName: '',
        deleteIndex: 0,

        orderItemDetailsModalId: '',

        alertMessage: null,
        alertMessageMode: null
      }
    },
    methods: {
      showMessage(message, mode) {
        this.alertMessage = message;
        this.alertMessageMode = mode;

        setTimeout(() => {
          this.alertMessage = null;
          this.alertMessageMode = null;
        }, 3000)
      },
      showOrderItemDetails(id) {
        this.orderItemDetailsModalId = id;

        $vfm.show('OrderItemDetailsModal');
      },
      async getOrders() {
      let orderResponse = await OrderDataService.getOrdersByBuyer(store.state.user.currentUser.id);
      let orders = orderResponse.data;

      orders.forEach(async order => {
        let orderItemResponse = await OrderItemDataService.getOrderItems(order.id);
        let orderItems = orderItemResponse.data;

        orderItems.forEach(async orderItem => {
          let itemResponse = await ItemDataService.get(orderItem.item_id);
          let item = itemResponse.data;

          this.orderItems.push({
            id: orderItem.id,
            buyerId: order.buyer_id,
            sellerId: orderItem.seller_id,
            itemId: orderItem.item_id,
            itemName: item.name,
            images: item.images,
            quantity: orderItem.quantity,
            price: item.price * orderItem.quantity,
            createdOn: orderItem.created_on,
            updatedOn: orderItem.updated_on
          })
        })
      })
    }, 
    },
    mounted() {
      this.getOrders();
    }
  }
</script>

<style scoped>
  .item-listings-item-header {
    height: 46px;
  }
  .item-listings-item-container {
    min-height: 166px;
  }
  .item-listings-item-image {
    max-width: 144px;
    max-height: 150px;
  }
</style>