<template>
  <vue-final-modal v-model="showModal" @opened="getUser" classes="flex justify-center items-center" content-class="modal-content" name="UserDetailsModal">
    <div class="flex justify-between">
      <span class="font-bold text-2xl truncate">User Details</span>
      <button class="my-auto" @click="showModal = false">
        <span class="material-symbols-outlined hover:text-tertiary">close</span>
      </button>
    </div>
    <div class="flex flex-col rounded bg-white my-4">
      <div class="text-left">
        <div v-if="admin">
          <span class="block text-gray-700 font-bold mb-2">Admin Account</span>
        </div>
        <div>
          <span class="block text-gray-700 text-sm font-bold mb-1">Username</span>
          <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2">{{ username }}</span>
        </div>
        <div v-if="email && email !== ''">
          <span class="block text-gray-700 text-sm font-bold mb-1">Email</span>
          <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2">{{ email }}</span>
        </div>
        <div v-if="phone && phone !== ''">
          <span class="block text-gray-700 text-sm font-bold mb-1">Phone</span>
          <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2">{{ phone }}</span>
        </div>
        <div>
          <span class="block text-gray-700 text-sm font-bold mb-1">Created On</span>
          <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2">{{ new Date(createdOn).toLocaleDateString("en-US") }}</span>
        </div>
        <div v-if="!admin">
          <span class="block text-gray-700 text-sm font-bold mb-1">Items Sold</span>
          <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2">{{ itemsSold }}</span>
          <span class="block text-gray-700 text-sm font-bold mb-1">Total Earnings</span>
          <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2">{{ totalEarnings.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
          <span class="block text-gray-700 text-sm font-bold mb-1">Total Spending</span>
          <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2">{{ totalSpending.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
        </div>
      </div>
    </div>
    <div>
      <button @click="closeModal" class="user-profile-item-remove-button bg-red-600 hover:bg-red-800 text-white text-sm px-4 py-2 mr-1 rounded">Close</button>
    </div>
  </vue-final-modal>
</template>

<script>
  import UserDataService from '@/services/UserDataService.js'
  import OrderItemDataService from '@/services/OrderItemDataService.js'

  export default {
    name: 'UserDetailsModal',
    props: {
      id: String
    },
    data() {
      return {
        showModal: false,
        username: '',
        email: '',
        phone: '',
        admin: false,
        createdOn: '',
        itemsSold: '',
        totalSpending: '',
        totalEarnings: ''
      }
    },
    methods: {
      async getUser() {
        let response = await UserDataService.get(this.id);
        let user = response.data;

        this.username = user.username;
        this.email = user.email;
        this.phone = user.phone;
        this.admin = user.admin;
        this.createdOn = user.created_on;
        this.totalSpending = user.total_spending;
        this.totalEarnings = user.total_earnings;

        response = await OrderItemDataService.getOrderItemsBySeller(this.id);
        let count = response.data.length;

        this.itemsSold = count;
      },
      closeModal() {
        this.updatedEmail = this.email;
        this.updatedPhone = this.phone;
        this.updatedPicture = this.picture;
        this.showModal = false;
      }
    }
  } 
  </script>

<style scoped>
  ::v-deep .modal-content {
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    padding: 1rem 1.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
    min-width: 600px;
  }
  .dark-mode div::v-deep .modal-content {
    border-color: #2d3748;
    background-color: #1a202c;
  }
  </style>
