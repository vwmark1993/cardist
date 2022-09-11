<template>
  <vue-final-modal v-model="showModal" classes="flex justify-center items-center" content-class="modal-content" name="CreateNewTagModal">
    <div class="flex justify-between">
      <span class="font-bold text-2xl truncate">Create New Tag</span>
      <button class="my-auto" @click="showModal = false; name = ''">
        <span class="material-symbols-outlined hover:text-tertiary">close</span>
      </button>
    </div>
    <div class="flex flex-col rounded bg-white my-4">
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-1 text-left" for="name">Tag Name</label>
        <input v-model="name" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="name" type="name">
      </div>
    </div>
    <div>
      <button @click="createTag" class="user-profile-item-remove-button bg-green-600 hover:bg-green-800 text-white text-sm px-4 py-2 mr-1 rounded">Create</button>
      <button @click="showModal = false; name = ''" class="user-profile-item-remove-button bg-slate-600 hover:bg-slate-800 text-white text-sm px-4 py-2 mr-1 rounded">Cancel</button>
    </div>
  </vue-final-modal>
</template>

<script>
  import TagDataService from '@/services/TagDataService.js'

  export default {
    name: 'CreateNewTagModal',
    data() {
      return {
        showModal: false,
        name: ''
      }
    },
    methods: {
      async createTag() {
        if (this.name === null || this.name.trim() === '') {
          this.$emit('createdTagMessage', 'Invalid Tag Name', 'failure');
          this.name = '';
          this.showModal = false;
          return;
        }

        let data = {
          name: this.name
        }

        let response = await TagDataService.create(data);

        console.log(response)

        if (response.status === 200) {
          this.$emit('createdTagMessage', 'Tag Created', 'success');
          this.$emit('newTag', response.data);
        } else {
          this.$emit('createdTagMessage', response.data.message, 'failure');
        }

        this.name = '';
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
