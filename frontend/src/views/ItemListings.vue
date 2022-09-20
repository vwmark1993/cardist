<template>
  <div>
    <ConfirmDeleteModal 
      :id="deleteId"
      apiService="Item"
      :name="deleteName"
      :index="deleteIndex"
      @confirmDeleteMessage="(message, mode) => showMessage(message, mode)"
      @confirmDeleteItem="(index) => confirmDeleteItem(index)"
    />
    <CreateItemListingModal
      @showMessage="(message, mode) => showMessage(message, mode)"
      @createdItem="(item) => addNewItem(item)"
    />
    <UserHeader />
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="alertMessage" :message="alertMessage" :mode="alertMessageMode" />
      </Transition>
    </div>
    <div>
      <div class="flex items-center mb-6">
        <h1 class="text-4xl font-bold text-slate-700 text-left m-3">Item Listings</h1>
        <button @click="createItemListing" class="flex items-center bg-slate-500 hover:bg-slate-700 text-white font-semibold text-lg px-2 rounded select-none">
          <span class="material-symbols-outlined text-2xl mr-1">add</span>
          <span>Create</span>
        </button>
      </div>
      <div v-if="itemListings.length === 0">
        <span class="block text-slate-400 text-xl italic mb-4">No Items Being Sold</span>
        <button @click="createItemListing" class="flex items-center bg-slate-500 hover:bg-slate-700 text-white mx-auto py- px-3 font-semibold tracking-wider rounded select-none">
          <span class="material-symbols-outlined text-3xl mr-1">add</span>
          <span>Create New Item Listing</span>
        </button>
      </div>
      <div v-else>
        <div v-for="item, index in itemListings" :key="item.id" class="item-listings-item-container border rounded border-slate-300 bg-slate-100 p-3 m-3 flex">
          <div class="flex items-center mr-3">
            <img v-if="item.images && item.images.length > 0 && item.images[0] !== ''" :src="item.images[0]" class="item-listings-item-image border rounded m-auto" />
            <img v-else-if="item.images === null && item.imageBlobs && item.imageBlobs.length > 0 && item.imageBlobs[0] !== ''" :src="item.imageBlobs[0]" class="item-listings-item-image border rounded m-auto" />
            <img v-else src="../assets/images/image-placeholder.png" class="item-listings-item-image border rounded m-auto" />
          </div>
          <div class="w-full relative">
            <div class="item-listings-item-header flex justify-between items-center border-b border-slate-400 mb-1">
              <h6 class="text-lg truncate">{{ item.name }}</h6>
              <div>
                <button class="bg-slate-500 hover:bg-slate-700 text-white text-sm px-3 py-1 mr-1 rounded">Details</button>
                <button @click="deleteItem(item.id, item.name, index)" class="bg-slate-500 hover:bg-red-700 text-white text-sm px-3 py-1 rounded">Remove</button>
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
    </div>
  </div>
</template>

<script>
  import store from '@/store';

  import UserHeader from '@/components/UserHeader.vue'
  import AlertMessage from '@/components/AlertMessage.vue'

  import { $vfm } from 'vue-final-modal'
  import CreateItemListingModal from '@/components/CreateItemListingModal.vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'

  import ItemDataService from '@/services/ItemDataService.js'
import ItemImageDataService from '@/services/ItemImageDataService';

  export default {
    name: 'ItemListings',
    components: {
      UserHeader,
      AlertMessage,
      CreateItemListingModal,
      ConfirmDeleteModal
    },
    data() {
      return {
        itemListings: [],

        deleteId: '',
        deleteName: '',
        deleteIndex: 0,

        alertMessage: null,
        alertMessageMode: null
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
      createItemListing() {
        $vfm.show('CreateItemListingModal');
      },
      async getItemListings() {
        let response = await ItemDataService.getItemsBySeller(store.state.user.currentUser.id);
        this.itemListings = response.data;

        this.itemListings.forEach(async item => {
          item.imageBlobs = null;

          if (item.images === null) {
            response = await ItemImageDataService.getItemImages(item.id);
            let itemImages = response.data;
            let images = []

            itemImages.forEach(itemImage => {
              images.push(itemImage.image)
            })

            item.imageBlobs = images;
          }
        })
      },
      async deleteItem(id, name, index) {
        this.deleteId = id;
        this.deleteIndex = index;
        this.deleteName = name;

        $vfm.show('ConfirmDeleteModal');
      },
      confirmDeleteItem(index) {
        // Refresh item search.
        store.dispatch('search/searchItems', '');

        this.itemListings.splice(index, 1);
      },
      addNewItem(item) {
        console.log('RECEIVED')
        console.log(item.imageBlobs)
        this.itemListings.push(item);
      }
    },
    mounted() {
      this.getItemListings();
    }
  }
</script>

<style scoped>
  .item-listings-item-header {
    height: 46px;
  }
  .item-listings-item-container {
    min-height: 166px;
  }
  .item-listings-item-image {
    max-width: 144px;
    max-height: 150px;
  }
</style>