<template>
  <vue-final-modal v-model="showModal" classes="flex justify-center items-center" content-class="modal-content" name="UserSettingsModal">
    <div class="flex justify-between">
      <span class="font-bold text-2xl truncate">User Settings</span>
      <button class="my-auto" @click="showModal = false">
        <span class="material-symbols-outlined hover:text-tertiary">close</span>
      </button>
    </div>
    <div class="flex flex-col rounded bg-white my-4">
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-1 text-left" for="password">Email</label>
        <input v-model="updatedEmail" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="email" type="email">
        <label class="block text-gray-700 text-sm font-bold mb-1 text-left" for="password">Phone Number</label>
        <input v-model="updatedPhone" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="phone" type="phone">
        <label class="block text-gray-700 text-sm font-bold mb-1 text-left" for="password">Profile Picture</label>
        <input v-model="updatedPicture" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="picture" type="text">
      </div>
    </div>
    <div>
      <button @click="updateUser" class="user-profile-item-remove-button bg-green-600 hover:bg-green-800 text-white text-sm px-4 py-2 mr-1 rounded">Change Settings</button>
      <button @click="closeModal" class="user-profile-item-remove-button bg-red-600 hover:bg-red-800 text-white text-sm px-4 py-2 mr-1 rounded">Cancel</button>
    </div>
  </vue-final-modal>
</template>

<script>
  import UserDataService from '@/services/UserDataService.js'
import store from '@/store';

  export default {
    name: 'UserSettingsModal',
    props: {
      id: String,
      email: String,
      phone: String,
      picture: String
    },
    data() {
      return {
        showModal: false,
        updatedEmail: this.email,
        updatedPhone: this.phone,
        updatedPicture: this.picture
      }
    },
    methods: {
      async updateUser() {
        if (this.updatedEmail !== null && this.updatedEmail.trim() === '') {
          this.updatedEmail = null;
        }

        if (this.updatedPhone !== null && this.updatedPhone.trim() === '') {
          this.updatedPhone = null;
        }

        if (this.updatedPicture !== null && this.updatedPicture.trim() === '') {
          this.updatedPicture = null;
        }

        let data = {
          email: this.updatedEmail,
          phone: this.updatedPhone,
          picture: this.updatedPicture
        }

        let response = await UserDataService.update(this.id, data);

        if (response.status === 200) {
          this.$emit('updatedUser', 'Updated Profile', 'success');

          store.dispatch('user/updateUser', data)
        } else {
          this.$emit('updatedUser', response.data.message, 'failure');
        }

        this.showModal = false;
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
