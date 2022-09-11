<template>
  <vue-final-modal v-model="showModal" classes="flex justify-center items-center" content-class="modal-content" name="ConfirmDeleteModal">
    <div class="flex justify-between">
      <span class="font-bold text-2xl truncate">Confirm Delete</span>
      <button class="my-auto" @click="showModal = false">
        <span class="material-symbols-outlined hover:text-tertiary">close</span>
      </button>
    </div>
    <div class="flex flex-col rounded bg-white my-4">
      <span v-if="name && name !== ''" class="text-lg text-slate-400">Are you sure you want to delete "{{ name }}"?</span>
      <span v-else class="text-lg text-slate-400">Are you sure you want to delete this {{ apiService.toLowerCase() }}?</span>
    </div>
    <div>
      <button @click="confirmDelete" class="user-profile-item-remove-button bg-red-600 hover:bg-red-800 text-white text-sm px-4 py-2 mr-1 rounded">Delete</button>
      <button @click="closeModal" class="user-profile-item-remove-button bg-slate-500 hover:bg-slate-700 text-white text-sm px-4 py-2 mr-1 rounded">Cancel</button>
    </div>
  </vue-final-modal>
</template>

<script>
  import UserDataService from '@/services/UserDataService.js'
  import ItemDataService from '@/services/ItemDataService.js'
  import TagDataService from '@/services/TagDataService.js'
  import CommentDataService from '@/services/CommentDataService.js'

  export default {
    name: 'ConfirmDeleteModal',
    props: {
      id: String,
      apiService: String,
      name: {
        type: String,
        default: ''
      },
      index: Number
    },
    data() {
      return {
        showModal: false,
      }
    },
    methods: {
      async confirmDelete() {
        try {
          let response;

          if (this.apiService === 'User') {
            response = await UserDataService.delete(this.id);
          } else if (this.apiService === 'Item') {
            response = await ItemDataService.delete(this.id);
          } else if (this.apiService === 'Tag') {
            response = await TagDataService.delete(this.id);
          } else if (this.apiService === 'Comment') {
            response = await CommentDataService.delete(this.id);
          }

          if (response.status === 200) {
            this.$emit('confirmDeleteMessage', this.apiService + ' Deleted', 'success');

            if (this.apiService === 'User') {
              this.$emit('confirmDeleteUser', this.index);
            } else if (this.apiService === 'Item') {
              this.$emit('confirmDeleteItem', this.index);
            } else if (this.apiService === 'Tag') {
              this.$emit('confirmDeleteTag', this.index);
            } else if (this.apiService === 'Comment') {
              this.$emit('confirmDeleteComment', this.index);
            }
          } else {
            this.$emit('confirmDeleteMessage', response.data.message, 'success');
          }

          this.showModal = false;
        } catch(e) {
          this.$emit('Could not delete ' + this.apiService.toLowerCase() + '.', 'failure');
          this.showModal = false;
        }
      },
      closeModal() {
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
