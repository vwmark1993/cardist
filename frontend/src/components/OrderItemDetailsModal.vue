<template>
  <vue-final-modal v-model="showModal" @opened="getItem" classes="flex justify-center items-center" content-class="modal-content" name="OrderItemDetailsModal">
    <div class="flex justify-between">
      <span class="font-bold text-2xl truncate">Order Item Details</span>
      <button class="my-auto" @click="showModal = false">
        <span class="material-symbols-outlined hover:text-tertiary">close</span>
      </button>
    </div>
    <div class="flex flex-col rounded bg-white my-4">
      <div v-if="images.length > 0" class="flex justify-center mb-2">
        <div class="width-300">  
          <div class="col-span-3">
            <img v-if="images.length > 0" :src="images[selectedIndex]" class="max-height-300  border rounded m-auto" />
          </div>
          <div v-if="images.length > 1" class="flex flex-row flex-wrap my-2">
            <img @click="setImageIndex(index)" v-for="(image, index) in images" :key="index" :src="image" class="image-thumbnail border rounded mb-2 cursor-pointer opacity-50 hover:opacity-100 transition delay-75 ease-in-out" />
          </div>
        </div>
      </div>
      <div class="text-left">
        <div>
          <span class="block text-gray-700 text-sm font-bold mb-1">Name</span>
          <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2">{{ name }}</span>
        </div>
        <div>
          <span class="block text-gray-700 text-sm font-bold mb-1">Price</span>
          <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2">{{ price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
        </div>
        <div>
          <span class="block text-gray-700 text-sm font-bold mb-1">Quantity</span>
          <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2">{{ quantity }}</span>
        </div>
        <div>
          <span class="block text-gray-700 text-sm font-bold mb-1">Ordered On</span>
          <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2">{{ new Date(orderedOn).toLocaleDateString("en-US") }}</span>
        </div>
        <div v-if="description && description !== ''">
          <span class="block text-gray-700 text-sm font-bold mb-1">Description</span>
          <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2">{{ description }}</span>
        </div>
        <div>
          <span class="block text-gray-700 text-sm font-bold mb-1">Seller Name</span>
          <span class="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2">{{ sellerName }}</span>
        </div>
      </div>
    </div>
    <div>
      <button @click="showModal = false" class="bg-slate-600 hover:bg-slate-800 text-white text-sm px-4 py-2 mr-1 rounded">Close</button>
    </div>
  </vue-final-modal>
</template>

<script>
  import UserDataService from '@/services/UserDataService.js'
  import OrderItemDataService from '@/services/OrderItemDataService.js'
  import ItemDataService from '@/services/ItemDataService.js'

  export default {
    name: 'OrderItemDetailsModal',
    props: {
      id: String
    },
    data() {
      return {
        showModal: false,
        loading: false,

        name: '',
        description: '',
        price: '',
        quantity: 0,
        orderedOn: '',
        sellerName: '',
        images: [],

        selectedIndex: 0
      }
    },
    methods: {
      setImageIndex(index) {
        this.selectedIndex = index;
      },
      async getItem() {
        try {
          this.selectedIndex = 0;

          this.loading = true;

          let response = await OrderItemDataService.get(this.id);
          let orderItem = response.data;

          this.orderedOn = orderItem.created_on;
          this.quantity = orderItem.quantity;

          response = await ItemDataService.get(orderItem.item_id);
          let item = response.data;

          this.name = item.name;
          this.description = item.description;
          this.price = item.price;
          this.images = item.images;

          response = await UserDataService.get(item.seller_id);
          this.sellerName = response.data.username;

          this.loading = false;
        } catch (e) {
          this.$emit('orderItemDetailsError', e);
          this.showModal = false;
        }
      }
    }
  } 
  </script>

<style scoped>
  .width-300 {
    width: 300px;
  }

  .max-height-300 {
    max-height: 300px;
  }

  .image-thumbnail {
    max-width: 75px;
    max-height: 100px;
    margin: 0 3px;
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
