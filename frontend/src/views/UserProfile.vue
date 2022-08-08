<template>
  <div>
    <UserHeader />
    <div class="grid grid-cols-12 grid-flow-col items-start">
      <div class="col-span-3 m-3 p-3 border border-slate-400 rounded">
        <div class="mb-2">
          <img v-if="user.picture != null" :src="user.picture" class="rounded m-auto" />
          <img v-else src="../assets/images/profile-picture-placeholder.png" class="rounded m-auto" />
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm">Items Sold: {{ itemsSold }}</span>
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
        <!-- Item Listings -->
        <div class="user-profile-group-container border rounded border-slate-400 bg-white m-3 p-3">
          <div>
            <span class="block text-left text-xl font-bold ml-3">Current Item Listings</span>
          </div>
          <div v-if="itemListings.length > 0" class="user-profile-scroll-container">
            <div v-for="item in itemListings" :key="item.id" class="user-profile-item-container border rounded border-slate-300 bg-slate-100 p-3 m-3 flex">
              <div class="flex items-center mr-3">
                <img v-if="item.images.length > 0" :src="item.images[0]" class="user-profile-item-image border rounded m-auto" />
                <span v-else class="material-symbols-outlined m-auto">image</span>
              </div>
              <div class="w-full relative">
                <div class="user-profile-item-header flex justify-between items-center border-b border-slate-400 mb-1">
                  <h6 class="text-lg truncate">{{ item.name }}</h6>
                  <div>
                    <button class="user-profile-item-remove-button bg-slate-500 hover:bg-slate-700 text-white text-sm px-3 py-1 mr-1 rounded">Details</button>
                    <button class="user-profile-item-remove-button bg-slate-500 hover:bg-slate-700 text-white text-sm px-3 py-1 rounded">Remove</button>
                  </div>
                </div>
                <span class="block text-left text-xs mb-1">Posted on: {{ item.created_on }}</span>
                <span class="block text-left">Total Earnings: {{ (item.number_sold * item.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
                <div class="bottom-0 mb-1 absolute">
                  <div class="flex flex-row items-center">
                    <span class="text-sm">Unit Sales: {{ item.number_sold }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <span class="text-left text-lg text-slate-700">No Item Listings</span>
          </div>
        </div>

        <!-- Order History -->
        <div class="user-profile-group-container border rounded border-slate-400 bg-white m-3 p-3">
          <div>
            <span class="block text-left text-xl font-bold ml-3">Order History</span>
          </div>
          <div v-if="ordersAsBuyer.length > 0" class="user-profile-scroll-container">
            <div v-for="order in ordersAsBuyer" :key="order.id" class="user-profile-item-container border rounded border-slate-300 bg-slate-100 p-3 m-3 flex">
              <div class="flex items-center mr-3">
                <img v-if="order.images.length > 0" :src="order.images[0]" class="user-profile-item-image border rounded m-auto" />
                <span v-else class="material-symbols-outlined m-auto">image</span>
              </div>
              <div class="w-full relative">
                <div class="user-profile-item-header flex justify-between items-center border-b border-slate-400 mb-1">
                  <h6 class="text-lg truncate">{{ order.item_name }}</h6>
                  <div>
                    <button class="user-profile-item-remove-button bg-slate-500 hover:bg-slate-700 text-white text-sm px-3 py-1 mr-1 rounded">Details</button>
                    <button class="user-profile-item-remove-button bg-slate-500 hover:bg-slate-700 text-white text-sm px-3 py-1 rounded">Remove</button>
                  </div>
                </div>
                <span class="block text-left text-xs mb-1">Ordered on: {{ order.created_on }}</span>
                <span class="block text-left">Total Price: {{ order.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
                <div class="bottom-0 mb-1 absolute">
                  <div class="flex flex-row items-center">
                    <span class="text-sm">Quantity: {{ order.quantity }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <span class="text-left text-lg text-slate-700">No Orders</span>
          </div>
        </div>

        <!-- Comments -->
        <div class="user-profile-group-container border rounded border-slate-400 bg-white m-3 p-3">
          <div>
            <span class="block text-left text-xl font-bold ml-3">Comments</span>
          </div>
          <div v-if="comments.length > 0" class="user-profile-scroll-container">
            <div v-for="comment in comments" :key="comment.id" class="user-profile-item-container border rounded border-slate-300 bg-slate-100 p-3 m-3 flex">
              <div class="w-full">
                <div class="user-profile-item-header flex justify-between items-center border-b border-slate-400 mb-1">
                  <h6 class="text-lg truncate">{{ comment.item_name }}</h6>
                  <div>
                    <button class="user-profile-item-remove-button bg-slate-500 hover:bg-slate-700 text-white text-sm px-3 py-1 mr-1 rounded">Edit</button>
                    <button class="user-profile-item-remove-button bg-slate-500 hover:bg-slate-700 text-white text-sm px-3 py-1 rounded">Delete</button>
                  </div>
                </div>
                <span class="block text-left text-xs mb-1">Posted on: {{ comment.created_on }}</span>
                <span class="block text-left line-clamp-3">{{ comment.message }}</span>
              </div>
            </div>
          </div>
          <div v-else>
            <span class="text-left text-lg text-slate-700">No Comments</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

import UserDataService from '@/services/UserDataService.js'
import ItemDataService from '@/services/ItemDataService.js'
import OrderDataService from '@/services/OrderDataService.js'
import CommentDataService from '@/services/CommentDataService.js'

import UserHeader from '@/components/UserHeader.vue'

export default {
  name: 'UserProfile',
  components: {
    UserHeader
  },
  data() {
      return {
          userId: store.state.user.user.id,
          user: {
            username: null,
            email: null,
            phone: null,
            picture: null,
            totalEarnings: 0,
            totalSpending: 0,
            admin: false
          },
          itemListings: [],
          ordersAsBuyer: [],
          ordersAsSeller: [],
          comments: []
      }
  },
  methods: {
    editProfile() {

    },
    async getUser() {
      let response = await UserDataService.get(this.userId);
      this.user = response.data;
    },
    async getItemsSold() {
      let response = await OrderDataService.getOrdersBySeller(this.userId);
      this.ordersAsSeller = response.data;
    },
    async getItemListings() {
      let response = await ItemDataService.getItemsBySeller(this.userId);
      this.itemListings = response.data;
    },
    async getOrders() {
      let response = await OrderDataService.getOrdersByBuyer(this.userId);

      response.data.forEach(async order => {
        let id = order.id
        let buyer_id = order.buyer_id;
        let seller_id = order.seller_id;
        let item_id = order.item_id;
        let quantity = order.quantity;
        let created_on = order.created_on;
        let updated_on = order.updated_on;

        let itemResponse = await ItemDataService.get(order.item_id);
        let item_name = itemResponse.data.name;
        let images = itemResponse.data.images;
        let item_price = itemResponse.data.price;

        this.ordersAsBuyer.push({
          id: id,
          buyer_id: buyer_id,
          seller_id: seller_id,
          item_id: item_id,
          item_name: item_name,
          images: images,
          quantity: quantity,
          price: item_price * quantity,
          created_on: created_on,
          updated_on: updated_on
        })
      })
    }, 
    async getComments() {
      let response = await CommentDataService.getCommentsByUser(this.userId);

      response.data.forEach(async comment => {
        let id = comment.id
        let user_id = comment.user_id;
        let item_id = comment.item_id;
        let message = comment.message;
        let flagged_reason = comment.flagged_reason;
        let flagged = comment.flagged;
        let created_on = comment.created_on;
        let updated_on = comment.updated_on;

        let itemResponse = await ItemDataService.get(comment.item_id);
        let item_name = itemResponse.data.name;

        this.comments.push({
          id: id,
          user_id: user_id,
          item_id: item_id,
          item_name: item_name,
          message: message,
          flagged_reason: flagged_reason,
          flagged: flagged,
          created_on: created_on,
          updated_on: updated_on
        })
      })
    }
  },
  computed: {

  },
  async mounted() {
    if (!store.state.user.authenticated) {
      this.$router.push({ name: 'login' });
    }

    await this.getUser();
    await this.getItemsSold();
    await this.getItemListings();
    await this.getOrders();
    await this.getComments();
  }
}
</script>
<style scoped>
.user-profile-group-container {
    height: auto;
  }
  .user-profile-scroll-container {
    max-height: 195px;
    overflow: auto;
  }
  .user-profile-item-container {
    height: 166px;
  }

  .user-profile-item-input-field {
    height: 30px;
    width: 40px;
  }

  .user-profile-item-image {
    max-width: 144px;
  }

  .user-profile-item-header {
    height: 46px;
  }

</style>
