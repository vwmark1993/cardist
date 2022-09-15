<template>
  <vue-final-modal v-model="showModal" classes="flex justify-center items-center" content-class="modal-content" name="EditCommentModal">
    <div class="flex justify-between">
      <span class="font-bold text-2xl truncate">Edit Comment</span>
      <button class="my-auto" @click="closeModal">
      </button>
    </div>
    <div class="flex flex-col rounded bg-white my-4">
      <div>
        <label class="block text-gray-700 text-sm font-bold text-left" for="date">Date</label>
        <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2 text-left" id="date">{{ new Date(date).toLocaleDateString("en-US") }}</span>
        <label class="block text-gray-700 text-sm font-bold text-left" for="itemName">Item Name</label>
        <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2 text-left" id="itemName">{{ itemName }}</span>
        <label class="block text-gray-700 text-sm font-bold text-left" for="message">Message</label>
        <textarea v-model="updatedMessage" class="resize-none border rounded-md focus:outline-none p-2 w-full"></textarea>
      </div>
    </div>
    <div>
      <button @click="updateComment" class="user-profile-item-remove-button bg-green-600 hover:bg-green-800 text-white text-sm px-4 py-2 mr-1 rounded">Change Comment</button>
      <button @click="closeModal" class="user-profile-item-remove-button bg-red-600 hover:bg-red-800 text-white text-sm px-4 py-2 mr-1 rounded">Cancel</button>
    </div>
  </vue-final-modal>
</template>

<script>
  import CommentDataService from '@/services/CommentDataService.js'

  export default {
    name: 'EditCommentModal',
    props: {
      id: String,
      date: String,
      itemName: String,
      message: String
    },
    data() {
      return {
        showModal: false,
        updatedMessage: ''
      }
    },
    watch: {
      message() {
        this.updatedMessage = this.message;
      }
    }, 
    methods: {
      async updateComment() {
        let data = {
          message: this.updatedMessage
        }

        let response = await CommentDataService.update(this.id, data);

        let mode = '';

        if (response.status === 200) {
          mode = 'success';
        } else {
          mode = 'failure';
        }

        this.showModal = false;

        this.$emit('updatedCommentAlertMessage', response.data.message, mode);
        this.$emit('updatedCommentNewValue', this.updatedMessage);
      },
      closeModal() {
        this.updatedMessage = this.message;
        this.showModal = false;
      }
    }, 
    mounted() {
      
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
