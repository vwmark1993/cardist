<template>
  <vue-final-modal v-model="showModal" classes="flex justify-center items-center" content-class="modal-content" name="ChangePasswordModal">
    <div class="flex justify-between">
      <span class="font-bold text-2xl truncate">Change Password</span>
      <button class="my-auto" @click="showModal = false">
      </button>
    </div>
    <div class="flex flex-col rounded bg-white my-4">
      <div>
        <div class="flex items-center mb-1">
          <label class="block text-gray-700 text-sm font-bold text-left" for="currentPassword">Current Password</label>
          <input v-model="showCurrentPassword" type="checkbox" class="block text-gray-700 text-sm font-bold ml-2">
          <span class="text-xs text-gray-500 ml-1">Show</span>
        </div>
        <input v-model="currentPassword" v-if="showCurrentPassword" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="currentPassword" type="text">
        <input v-model="currentPassword" v-else class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="currentPassword" type="password">
        <div class="flex items-center mb-1">
          <label class="block text-gray-700 text-sm font-bold text-left" for="newPassword">New Password</label>
          <input v-model="showNewPassword" type="checkbox" class="block text-gray-700 text-sm font-bold ml-2">
          <span class="text-xs text-gray-500 ml-1">Show</span>
        </div>
        <input v-model="newPassword" v-if="showNewPassword" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="newPassword" type="text">
        <input v-model="newPassword" v-else class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="newPassword" type="password">
        <div class="flex items-center mb-1">
          <label class="block text-gray-700 text-sm font-bold text-left" for="confirmNewPassword">Confirm New Password</label>
          <input v-model="showConfirmNewPassword" type="checkbox" class="block text-gray-700 text-sm font-bold ml-2">
          <span class="text-xs text-gray-500 ml-1">Show</span>
        </div>
        <input v-model="confirmNewPassword" v-if="showConfirmNewPassword" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="confirmNewPassword" type="text">
        <input v-model="confirmNewPassword" v-else class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="confirmNewPassword" type="password">
      </div>
    </div>
    <div>
      <button @click="updatePassword" class="user-profile-item-remove-button bg-green-600 hover:bg-green-800 text-white text-sm px-4 py-2 mr-1 rounded">Change Password</button>
      <button @click="closeModal" class="user-profile-item-remove-button bg-red-600 hover:bg-red-800 text-white text-sm px-4 py-2 mr-1 rounded">Cancel</button>
    </div>
  </vue-final-modal>
</template>

<script>
  import UserDataService from '@/services/UserDataService.js'

  export default {
    name: 'ChangePasswordModal',
    props: {
      id: String
    },
    data() {
      return {
        showModal: false,
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmNewPassword: false,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }
    },
    methods: {
      async updatePassword() {
        if (this.newPassword !== this.confirmNewPassword) {
          alert("passwords don't match");
          return;
        }

        let data = {
          currentPassword: this.currentPassword,
          newPassword: this.confirmNewPassword
        }

        let response = await UserDataService.changePassword(this.id, data);
        console.log(response.data)

        this.showModal = false;
      },
      closeModal() {
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
        this.showModal = false;
      }
    }, 
    async mounted() {
      // Password is retrieved separately for security reasons (so that it doesn't go through Vuex and end up being saved in localstorage).
      let response = await UserDataService.get(this.id);
      let user = response.data;
      this.password = user.password;
      this.updatedPassword = user.password;
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
