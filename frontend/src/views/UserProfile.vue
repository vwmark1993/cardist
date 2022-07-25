<template>
  <div>
    <UserHeader />
    <div class="grid grid-cols-12 grid-flow-col">
      <div class="col-span-3 m-3 p-3 border border-slate-400 rounded">
        <div class="mb-2">
          <img v-if="user.picture != null" :src="user.picture" class="rounded m-auto" />
          <span v-else class="material-symbols-outlined m-auto">image</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm">Items Sold: 85</span>
          <button @click="editProfile" class="bg-slate-500 hover:bg-slate-700 text-white text-sm font-semibold py-1 px-2 rounded">Edit Profile</button>
        </div>
        <div class="rounded bg-slate-100 text-left mt-3 p-2">
          <div>
            <span class="text-xs">Username:</span>
            <span class="block font-semibold">{{ user.username }}</span>
          </div>
          <div>
            <span class="text-xs">Email:</span>
            <span class="block font-semibold">{{ user.email }}</span>
          </div>
          <div>
            <span class="text-xs">Phone:</span>
            <span class="block font-semibold">{{ user.phone }}</span>
          </div>
        </div>
      </div>
      <div class="col-span-9">
        <div class="border rounded border-slate-400 m-3 p-3">
          <div>
            <span class="text-left text-xl font-bold">Order History</span>
          </div>
          <div class="shopping-cart-item-container border rounded border-slate-400 p-3 m-3 flex">
            <div class="flex items-center mr-3">
              <img src="https://cdn.britannica.com/95/124395-004-3B484C8B/hand-cards-trump-spades.jpg" class="shopping-cart-item-image border rounded m-auto" />
            </div>
            <div class="w-full truncate relative">
              <div class="shopping-cart-item-header flex justify-between items-center border-b border-slate-400 mb-1">
                <h6 class="text-lg truncate">Bicycle Playing Cards</h6>
                <button class="shopping-cart-item-remove-button bg-slate-500 hover:bg-slate-700 text-white text-sm px-3 py-1 rounded">Remove</button>
              </div>
              <span class="block text-left text-xs">Ordered On: 2022-07-24</span>
              <span class="block text-left">$100</span>
              <div class="bottom-0 mb-1 absolute">
                <div class="flex flex-row items-center">
                  <span class="text-sm">Quantity: 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from '@/services/UserDataService.js'
import OrderDataService from '@/services/OrderDataService.js'

import UserHeader from '@/components/UserHeader.vue'

export default {
  name: 'UserProfile',
  components: {
    UserHeader
  },
  data() {
      return {
          userId: '0afa8ff9-61b0-4792-9b75-1edb752875a4',
          user: {
            username: null,
            email: null,
            phone: null,
            picture: null,
            totalEarnings: 0,
            totalSpending: 0,
            admin: false
          },
          orders: []
      }
  },
  methods: {
    editProfile() {

    },
    async getUser() {
      let response = await UserDataService.get(this.userId);
      this.user = response.data;
    },
    async getOrders() {
      let response = await OrderDataService.getOrdersByBuyer(this.userId);
      this.orders = response.data;
    },
  },
  computed: {

  },
  async mounted() {
    await this.getUser();
    await this.getOrders();
  }
}
</script>
<style scoped>
    .shopping-cart-item-container {
    min-width: 00px;
    min-height: 166px;
  }

  .shopping-cart-item-input-field {
    height: 30px;
    width: 40px;
  }

  .shopping-cart-item-image {
    max-width: 150px;
  }

  .shopping-cart-item-header {
    height: 52px;
  }

</style>
