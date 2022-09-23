<template>
  <div>
    <UserSettingsModal 
      :id="user.id"
      :email="user.email"
      :phone="user.phone"
      :picture="user.picture"
      @updatedUser="(message, mode) => showMessage(message, mode)"
    />
    <ChangePasswordModal 
      :id="user.id"
      @updatedPassword="(message, mode) => showMessage(message, mode)"
      @incorrectPasswords="(message) => showMessage(message, 'failure')"
    />
    <EditCommentModal 
      :id="selectedComment.id"
      :date="selectedComment.updatedOn" 
      :itemName="selectedComment.itemName"
      :message="selectedComment.message"
      @updatedCommentAlertMessage="(message, mode) => showMessage(message, mode)"
      @updatedCommentNewValue="(newValue) => updateComment(newValue)"
    />
    <UserHeader />
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="alertMessage" :message="alertMessage" :mode="alertMessageMode" />
      </Transition>
    </div>
    <div class="grid grid-cols-12 grid-flow-col items-start">
      <div class="col-span-3 m-3 p-3 border border-slate-400 rounded">
        <div class="mb-2">
          <img v-if="user.picture != null" :src="user.picture" class="rounded m-auto" />
          <img v-else src="../assets/images/profile-picture-placeholder.png" class="rounded m-auto" />
        </div>
        <div>
          <div class="text-right mb-1">
            <button @click="editProfile" class="bg-slate-500 hover:bg-slate-700 text-white text-sm font-semibold mb-1 py-1 px-2 rounded">Edit Profile</button>
            <button @click="changePassword" class="bg-slate-500 hover:bg-slate-700 text-white text-sm font-semibold mb-1 ml-1 py-1 px-2 rounded">Change Password</button>
          </div>
          <span v-if="!$store.state.user.currentUser.admin" class="block text-sm text-left">Items Sold: {{ itemsSold }}</span>
        </div>
        <div class="rounded bg-slate-100 text-left mt-2 p-2">
          <div>
            <span class="text-xs">Username:</span>
            <span class="block font-semibold">{{ user.username }}</span>
          </div>
          <div v-if="user.email && user.email !== ''">
            <span class="text-xs">Email:</span>
            <span class="block font-semibold">{{ user.email }}</span>
          </div>
          <div v-else>
            <span class="text-xs">No Email</span>
          </div>
          <div v-if="user.phone && user.phone !== ''">
            <span class="text-xs">Phone:</span>
            <span class="block font-semibold">{{ user.phone }}</span>
          </div>
          <div v-else>
            <span class="text-xs">No Phone Number</span>
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
                <img v-if="item.images && item.images.length > 0 && item.images[0] !== ''" :src="item.images[0]" class="user-profile-item-image border rounded m-auto" />
                <img v-else-if="!item.images && item.imageBlobs && item.imageBlobs.length > 0 && item.imageBlobs[0] !== ''" :src="item.imageBlobs[0]" class="user-profile-item-image border rounded m-auto" />
                <img v-else src="../assets/images/image-placeholder.png" class="user-profile-item-image border rounded m-auto" />
              </div>
              <div class="w-full relative">
                <div class="user-profile-item-header flex justify-between items-center border-b border-slate-400 mb-1">
                  <h6 class="text-lg truncate">{{ item.name }}</h6>
                  <div>
                    <button class="bg-slate-500 hover:bg-slate-700 text-white text-sm px-3 py-1 mr-1 rounded">Details</button>
                    <button class="bg-slate-500 hover:bg-red-700 text-white text-sm px-3 py-1 rounded">Remove</button>
                  </div>
                </div>
                <span class="block text-left text-xs mb-1">Posted on: {{ new Date(item.created_on).toLocaleDateString("en-US") }}</span>
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
            <span class="inline-block text-left text-lg text-slate-400 my-2">No Item Listings</span>
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
                <img v-if="order.images.length > 0 && order.images[0] !== ''" :src="order.images[0]" class="user-profile-item-image border rounded m-auto" />
                <img v-else src="../assets/images/image-placeholder.png" class="item-listings-item-image border rounded m-auto" />
              </div>
              <div class="w-full relative">
                <div class="user-profile-item-header flex justify-between items-center border-b border-slate-400 mb-1">
                  <h6 class="text-lg truncate">{{ order.itemName }}</h6>
                  <div>
                    <button class="bg-slate-500 hover:bg-slate-700 text-white text-sm px-3 py-1 mr-1 rounded">Details</button>
                  </div>
                </div>
                <span class="block text-left text-xs mb-1">Ordered on: {{ new Date(order.createdOn).toLocaleDateString("en-US") }}</span>
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
            <span class="inline-block text-left text-lg text-slate-400 my-2">No Orders</span>
          </div>
        </div>

        <!-- Comments -->
        <div class="user-profile-group-container border rounded border-slate-400 bg-white m-3 p-3">
          <div>
            <span class="block text-left text-xl font-bold ml-3">Comments</span>
          </div>
          <div v-if="comments.length > 0" class="user-profile-scroll-container">
            <div v-for="comment, index in comments" :key="comment.id" class="user-profile-item-container border rounded border-slate-300 bg-slate-100 p-3 m-3 flex">
              <div class="w-full">
                <div class="user-profile-item-header flex justify-between items-center border-b border-slate-400 mb-1">
                  <h6 class="text-lg truncate">{{ comment.itemName }}</h6>
                  <div>
                    <button @click="editComment(index)" class="bg-slate-500 text-white text-sm mr-1 px-3 py-1 rounded">Edit</button>
                    <button @click="removeComment(comment.id, index)" class="bg-slate-500 hover:bg-red-700 text-white text-sm px-3 py-1 rounded">Remove</button>
                  </div>
                </div>
                <span class="block text-left text-xs mb-1">Posted on: {{ new Date(comment.createdOn).toLocaleDateString("en-US") }}</span>
                <span class="block text-left line-clamp-3">{{ comment.message }}</span>
              </div>
            </div>
          </div>
          <div v-else>
            <span class="inline-block text-left text-lg text-slate-400 my-2">No Comments</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

import ItemDataService from '@/services/ItemDataService.js'
import OrderDataService from '@/services/OrderDataService.js'
import OrderItemDataService from '@/services/OrderItemDataService.js'
import CommentDataService from '@/services/CommentDataService.js'

import UserHeader from '@/components/UserHeader.vue'
import AlertMessage from '@/components/AlertMessage.vue'

import { $vfm } from 'vue-final-modal'
import UserSettingsModal from '@/components/UserSettingsModal.vue'
import ChangePasswordModal from '@/components/ChangePasswordModal.vue'
import EditCommentModal from '@/components/EditCommentModal.vue'

export default {
  name: 'UserProfile',
  components: {
    UserHeader,
    AlertMessage,
    UserSettingsModal,
    ChangePasswordModal,
    EditCommentModal
  },
  data() {
      return {
          itemListings: [],
          ordersAsBuyer: [],
          ordersAsSeller: [],
          comments: [],
          alertMessage: null,
          alertMessageMode: null,
          selectedCommentIndex: 0
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
    editProfile() {
      $vfm.show("UserSettingsModal");
    },
    changePassword() {
      $vfm.show("ChangePasswordModal");
    },
    editComment(index) {
      this.selectedCommentIndex = index;
      $vfm.show("EditCommentModal");
    },
    async getItemsSold() {
      let response = await OrderItemDataService.getOrderItemsBySeller(this.user.id);
      this.ordersAsSeller = response.data;
    },
    async getItemListings() {
      let response = await ItemDataService.getItemsBySeller(this.user.id);
      this.itemListings = response.data;
    },
    async getOrders() {
      let orderResponse = await OrderDataService.getOrdersByBuyer(this.user.id);
      let orders = orderResponse.data;

      orders.forEach(async order => {
        let orderItemResponse = await OrderItemDataService.getOrderItems(order.id);
        let orderItems = orderItemResponse.data;

        orderItems.forEach(async orderItem => {
          let itemResponse = await ItemDataService.get(orderItem.item_id);
          let item = itemResponse.data;

          this.ordersAsBuyer.push({
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
    async getComments() {
      let response = await CommentDataService.getCommentsByUser(this.user.id);

      response.data.forEach(async comment => {

        let itemResponse = await ItemDataService.get(comment.item_id);
        let itemName = itemResponse.data.name;

        this.comments.push({
          id: comment.id,
          userId: comment.user_id,
          itemId: comment.item_id,
          itemName: itemName,
          message: comment.message,
          flaggedReason: comment.flagged_reason,
          flagged: comment.flagged,
          createdOn: comment.created_on,
          updatedOn: comment.updated_on
        })
      })
    },
    async removeComment(id, index) {
      try {
        await CommentDataService.delete(id);
        this.comments.splice(index, 1);

        this.showMessage('Comment Removed', 'success');
      } catch(e) {
        this.showMessage(e, 'failure');
      }
    },
    updateComment(value) {
      this.comments[this.selectedCommentIndex].message = value;
    }
  },
  computed: {
    itemsSold() {
      if (this.ordersAsSeller.length == 0) {
        return 0
      } else {
        let itemCount = 0;

        this.ordersAsSeller.forEach(order => {
          itemCount += order.quantity;
        })

        return itemCount;
      }
    },
    user() {
      return {
        id: store.state.user.currentUser.id,
        username: store.state.user.currentUser.username,
        email: store.state.user.currentUser.email,
        phone: store.state.user.currentUser.phone,
        picture: store.state.user.currentUser.picture,
        totalEarnings: store.state.user.currentUser.total_earnings,
        totalSpending: store.state.user.currentUser.total_spending,
        admin: store.state.user.currentUser.admin
      }
    },
    selectedComment() {
      if (this.comments[this.selectedCommentIndex]) {
        return this.comments[this.selectedCommentIndex];
      } else {
        return {
          id: null,
          date: null,
          itemName: null,
          message: null
        };
      }
    },
  },
  async mounted() {
    if (!store.state.user.authenticated) {
      this.$router.push({ name: 'login' });
    } else {
      await this.getItemListings();
      await this.getOrders();
      await this.getItemsSold();
      await this.getComments();
    }
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
    min-height: 166px;
  }

  .user-profile-item-image {
    max-width: 144px;
    max-height: 150px;
  }

  .user-profile-item-header {
    height: 46px;
  }

</style>
