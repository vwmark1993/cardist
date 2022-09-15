<template>
  <vue-final-modal v-model="showModal" classes="flex justify-center items-center" content-class="modal-content" name="FlagCommentModal">
    <div class="flex justify-between">
      <span class="font-bold text-2xl truncate">Report a Comment</span>
      <button class="my-auto" @click="closeModal">
        <span class="material-symbols-outlined hover:text-tertiary">close</span>
      </button>
    </div>
    <div class="bg-slate-300 rounded p-3 m-3">
      <div class="flex border-slate-400 border-b pb-2 mb-2 justify-between">
        <div class="flex">
          <span class="material-symbols-outlined">account_circle</span>
          <span class="font-bold ml-1">{{ username }}</span>
        </div>
      </div>
      <div class="text-left">
        <p class="text-sm text-slate-500 mb-1">{{ new Date(date).toLocaleDateString("en-US") }}</p>
        <p class="text-slate-800 mb-2">{{ message }}</p>
      </div>
    </div>
    <div class="text-left">
      <span class="inline-block text-lg font-semibold mb-2">Reason:</span>
      <div class="border rounded px-2 py-2 mb-4 mx-3">
        <div class="flex flex-wrap">
          <div class="flex justify-center items-center my-2">
            <input v-model="flaggedReason" class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 ml-3 mr-1 cursor-pointer" type="radio" name="reason" id="inappropriateLanguage" value="Inappropriate Language">
            <label class="form-check-label inline-block text-gray-800" for="inappropriateLanguage">Inappropriate Language</label>
          </div>
          <div class="flex justify-center items-center my-2">
            <input v-model="flaggedReason" class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 ml-3 mr-1 cursor-pointer" type="radio" name="reason" id="spam" value="Spam">
            <label class="form-check-label inline-block text-gray-800" for="spam">Spam</label>
          </div>
          <div class="flex justify-center items-center my-2">
            <input v-model="flaggedReason" class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 ml-3 mr-1  cursor-pointer" type="radio" name="reason" id="other" value="Other">
            <label class="form-check-label inline-block text-gray-800" for="other">Other (please specify): </label>
            <input v-model="flaggedReasonMessage" class="appearance-none border rounded border-gray-300 bg-white focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain ml-2 mr-4 px-2 py-1" type="text" name="otherText" id="otherText" size=30 maxlength=30>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button @click="flagComment" class="user-profile-item-remove-button bg-green-600 hover:bg-green-800 text-white text-sm px-4 py-2 mr-1 rounded">Flag Comment</button>
      <button @click="closeModal" class="user-profile-item-remove-button bg-red-600 hover:bg-red-800 text-white text-sm px-4 py-2 mr-1 rounded">Cancel</button>
    </div>
  </vue-final-modal>
</template>

<script>
  import CommentDataService from '@/services/CommentDataService.js'

  export default {
    name: 'FlagCommentModal',
    props: {
      id: String,
      username: String,
      itemName: String,
      date: String,
      message: String
    },
    data() {
      return {
        showModal: false,
        flaggedReason: null,
        flaggedReasonMessage: null
      }
    },
    methods: {
      async flagComment() {
        if (!this.flaggedReason || (this.flaggedReason === 'Other' && !this.flaggedReasonMessage) || (this.flaggedReason === 'Other' && this.flaggedReasonMessage.trim() === '')) {
          this.$emit('flaggedCommentModalSubmission', 'Invalid Submission', 'failure');
          return
        }

        let data = {
          flagged: true,
          flagged_reason: this.flaggedReason,
          flagged_reason_message: this.flaggedReasonMessage ? this.flaggedReasonMessage.trim() : null
        }

        if (this.flaggedReason !== 'Other') {
          data.flagged_reason_message = null;
        }

        let response = await CommentDataService.update(this.id, data);

        if (response.status === 200) {
          this.$emit('flaggedCommentModalSubmission', 'Comment Flagged', 'success');
        } else {
          this.$emit('flaggedCommentModalSubmission', response.data.message, 'failure');
        }

        this.showModal = false;
      },
      closeModal() {
        this.flaggedReason = '';
        this.flaggedReasonMessage = '';
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
