<template>
  <vue-final-modal v-model="showModal" classes="flex justify-center items-center" content-class="modal-content" name="CreateItemListingModal">
    <div class="flex justify-between">
      <span class="font-bold text-2xl truncate">Create Item Listing</span>
      <button class="my-auto" @click="closeModal">
        <span class="material-symbols-outlined hover:text-tertiary">close</span>
      </button>
    </div>
    <div class="flex flex-col rounded bg-white my-4">
      <div class="mb-2">
        <label class="block text-gray-700 text-sm font-bold mb-1 text-left" for="name">Name</label>
        <input v-model="name" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="name" type="text">
        <label class="block text-gray-700 text-sm font-bold mb-1 text-left" for="price">Price</label>
        <input v-model="price" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2" id="price" type="number" step="0.01" min="0">
        <label class="block text-gray-700 text-sm font-bold mb-1 text-left" for="password">Description</label>
        <textarea v-model="description" class="border resize-none rounded-md focus:outline-none p-2 w-full"></textarea>
      </div>
      <div>
        <div class="flex items-center mb-3">
          <span class="block text-gray-700 text-sm font-bold mr-1">Image Links</span>
          <button @click="addImage" class="bg-slate-500 hover:bg-slate-700 text-white mr-1 px-2 rounded flex items-center">
            <span class="text-sm">Add</span>
          </button>
          <button v-if="images.length > 1" @click="removeImage" class="bg-slate-500 hover:bg-slate-700 text-white mr-1 px-2 rounded flex items-center">
            <span class="text-sm">Remove</span>
          </button>
          <button v-else class="bg-slate-300 text-white mr-1 px-2 rounded flex items-center">
            <span class="text-sm">Remove</span>
          </button>
        </div>
        <div class="image-links-container overflow-auto mb-2">
          <div v-for="image, index in images" :key="index" class="flex items-center mb-1">
            <span class="text-slate-600 font-semibold text-sm mr-2">{{ index + 1 }}.</span>
            <input @input="updateImage(index, $event)" class="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="name" type="text">
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center mb-2">
          <span class="block text-gray-700 text-sm font-bold mr-1">Tags</span>
        </div> 
        <div class="flex mb-2">
            <button @click="tag.selected = !tag.selected" v-for="tag, index in tags" :key="index" :class="{  'opacity-75' : !tag.selected }" class="bg-secondary text-white mr-1 px-3 py-1 rounded">{{ tag.name }}</button>
        </div>
      </div>
    </div>
    <div>
      <button @click="createItemListing" class="bg-green-600 hover:bg-green-800 text-white text-sm px-4 py-2 mr-1 rounded">Create</button>
      <button @click="closeModal" class="bg-red-600 hover:bg-red-800 text-white text-sm px-4 py-2 mr-1 rounded">Cancel</button>
    </div>
  </vue-final-modal>
</template>

<script>
  import store from '@/store';

  import TagDataService from '@/services/TagDataService.js'
  import ItemDataService from '@/services/ItemDataService.js'
  import ItemTagDataService from '@/services/ItemTagDataService';

  export default {
    name: 'CreateItemListingModal',
    data() {
      return {
        showModal: false,

        name: '',
        price: '',
        description: '',
        images: [''],
        tags: []
      }
    },
    methods: {
      async createItemListing() {
        try {
          if (this.name === null || this.name.trim() === '') {
            this.$emit('showMessage', 'Invalid Name', 'failure');
            this.closeModal();
            return;
          }

          if (this.price === null || this.price === '' || isNaN(this.price)) {
            this.$emit('showMessage', 'Invalid Price', 'failure');
            this.closeModal();
            return;
          }

          let data = {
            sellerId: store.state.user.currentUser.id,
            name: this.name,
            price: this.price,
            email: this.email,
            images: this.images
          }

          let response = await ItemDataService.create(data);
          this.$emit('createdItem', response.data);

          let itemId = response.data.id;

          let selectedTags = this.tags.filter(tag => tag.selected === true);

          selectedTags.forEach(async tag => {
            data = {
              itemId: itemId,
              tagId: tag.id
            }

            await ItemTagDataService.create(data);
          });

          this.$emit('showMessage', 'Item Listing Created', 'success');
          this.closeModal();
        } catch (e) {
          this.$emit('showMessage', e, 'failure');
          this.closeModal();
        }
        
      },
      async getTags() {
        try {
          let response = await TagDataService.getAll();
          this.tags = response.data;

          this.tags.forEach(tag => {
            tag.selected = false;
          })
        } catch(e) {
          this.$emit('showMessage', e, 'failure');
        }
      },
      addImage() {
        this.images.push('');
      },
      removeImage() {
        this.images.pop();
      },
      updateImage(index, e) {
        this.images[index] = e.target.value;
      }, 
      closeModal() {
        this.name = '';
        this.price = '';
        this.description = '';
        this.images = [];

        this.tags.forEach(tag => {
          tag.selected = false;
        });

        this.showModal = false;
      }
    },
    mounted() {
      this.getTags();
    }
  } 
  </script>

<style scoped>
  .image-links-container {
    max-height: 150px;
  }

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
