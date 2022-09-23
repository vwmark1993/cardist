<template>
  <vue-final-modal v-model="showModal" classes="flex justify-center items-center" content-class="modal-content" name="UserSettingsModal">
    <div class="flex justify-between">
      <span class="font-bold text-2xl truncate">User Settings</span>
      <button class="my-auto" @click="closeModal">
        <span class="material-symbols-outlined hover:text-tertiary">close</span>
      </button>
    </div>
    <div class="flex flex-col rounded bg-white my-4">
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-1 text-left" for="password">Email</label>
        <input v-model="updatedEmail" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="email" type="email">
        <label class="block text-gray-700 text-sm font-bold mb-1 text-left" for="password">Phone Number</label>
        <input v-model="updatedPhone" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="phone" type="phone">
      </div>
      <div class="my-2">
        <span class="block text-gray-700 text-sm font-bold mr-1 text-left">Profile Picture</span>
        <div class="flex flex-wrap justify-center mx-2 mt-1 mb-4">
          <div class="flex justify-center items-center">
            <input v-model="pictureMode" @click="pictureMode === 'upload' ? updatedPicture = '' : null" class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-slate-600 checked:border-slate-600 focus:outline-none transition duration-200 ml-3 mr-1 cursor-pointer" type="radio" name="pictureLink" id="pictureLink" value="link">
            <label class="font-semibold form-check-label inline-block text-slate-600" for="pictureLink">URL Link</label>
          </div>
          <div class="flex justify-center items-center">
            <input v-model="pictureMode" class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-slate-600 checked:border-slate-600 focus:outline-none transition duration-200 ml-3 mr-1 cursor-pointer" type="radio" name="pictureUpload" id="pictureUpload" value="upload">
            <label class="font-semibold form-check-label inline-block text-slate-600" for="pictureUpload">Upload Picture</label>
          </div>
        </div>
        <div v-if="pictureMode === 'link'" class="border rounded p-4">
          <label class="block text-gray-700 text-sm font-bold mb-1 text-left" for="password">Picture Link</label>
          <input v-model="updatedPicture" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="updatedPicture" type="text">
        </div>
        <div v-else-if="pictureMode === 'upload'" class="border rounded p-4">
          <SelectAndPreviewSingleFile @fileSelected="(file) => setPicture(file)" :reset="resetPicture" />
        </div>
      </div>
    </div>
    <div>
      <button @click="updateUser" class="user-profile-item-remove-button bg-green-600 hover:bg-green-800 text-white text-sm px-4 py-2 mr-1 rounded">Change Settings</button>
      <button @click="closeModal" class="user-profile-item-remove-button bg-red-600 hover:bg-red-800 text-white text-sm px-4 py-2 mr-1 rounded">Cancel</button>
    </div>
  </vue-final-modal>
</template>

<script>
  import store from '@/store';

  import UserDataService from '@/services/UserDataService.js'
  
  import SelectAndPreviewSingleFile from '@/components/SelectAndPreviewSingleFile'

  export default {
    name: 'UserSettingsModal',
    components: {
      SelectAndPreviewSingleFile
    },
    props: {
      id: String,
      email: String,
      phone: String,
      picture: String
    },
    data() {
      return {
        showModal: false,
        pictureMode: 'link',
        updatedEmail: this.email,
        updatedPhone: this.phone,
        updatedPicture: this.picture,
        resetPicture: false
      }
    },
    methods: {
      async updateUser() {
        try {
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

          this.closeModal();
        } catch (e) {
          this.$emit('updatedUser', e, 'failure');

          this.closeModal();
        }
        
      },
      setPicture(file) {
        this.updatedPicture = file;
      },
      closeModal() {
        this.updatedEmail = this.email;
        this.updatedPhone = this.phone;
        this.updatedPicture = this.picture;
        this.pictureMode = 'link';
        this.resetPicture = true;
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
