<template>
  <div>
    <UserHeader />
    <div class="grid grid-cols-12 grid-flow-col">
      <div class="md:col-span-4 grid grid-cols-4 m-3">
        <div class="col-span-1 flex flex-col mx-2">
          <img @click="setImageIndex(index)" v-for="(image, index) in itemDetails.images" :key="index" :src="image" class="border rounded mb-2 cursor-pointer opacity-50 hover:opacity-100 transition delay-75 ease-in-out" />
        </div>
        <div class="col-span-3">
          <img v-if="itemDetails.images.length > 0" :src="itemDetails.images[selectedIndex]" class="border rounded m-auto" />
          <span v-else class="material-symbols-outlined m-auto">image</span>
        </div>
      </div>
      <div class="col-span-8 text-left m-3">
        <h1 class="text-4xl font-bold border-b pb-3 mb-3">{{itemDetails.name}}</h1>
        <div class="flex justify-between items-center">
          <div>
            <h6 class="text-sm font-medium text-slate-500">Price</h6>
            <p class="text-2xl text-slate-800 mb-6">${{itemDetails.price}}</p>
          </div>
          <div>
            <button class="cart-button bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
            <!-- <div class="text-center text-sm flex items-center">
              Quantity: {{ 10 }} 
              <span class="material-symbols-outlined">add</span>
              <span class="material-symbols-outlined">remove</span>
            </div> -->
          </div>
        </div>
        <h6 class="text-sm font-medium text-slate-500">Description</h6>
        <p class="text-xl text-slate-800 mb-10">{{itemDetails.description}}</p>
        <div v-if="comments.length == 0">
          <h6 class="text-sm font-medium text-slate-500">This item has no comments written about it.</h6>
        </div>
        <div v-else>
          <h6 class="text-sm font-medium text-slate-500">Comments</h6>
          <ItemDetailsComment v-for="comment in comments" :key="comment.id" :user_id="comment.user_id" :message="comment.message" :date="comment.updated_on" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemDataService from '@/services/ItemDataService.js'
import CommentDataService from '@/services/CommentDataService.js'

import UserHeader from '@/components/UserHeader.vue'
import ItemDetailsComment from '@/components/ItemDetailsComment.vue'


export default {
  name: 'ItemDetails',
  components: {
    UserHeader,
    ItemDetailsComment
  },
  data() {
      return {
          id: this.$route.params.itemId,
          itemDetails: {
            id: null,
            name: null,
            description: null,
            images: []
          },
          comments: [],
          selectedIndex: 0
      }
  },
  methods: {
    getItem() {
      ItemDataService.get(this.id)
      .then(response => {
        this.itemDetails = response.data;
      }).catch(e => {
        console.log(e)
      })
    },
    getComments() {
      CommentDataService.getItemComments(this.id)
      .then( response => {
        this.comments = response.data
      }).catch(e => {
        console.log(e)
      })
    },
    setImageIndex(index) {
      this.selectedIndex = index;
    }
  },
  computed: {

  },
  mounted() {
    this.getItem();
    this.getComments();
  }
}
</script>
<style scoped>
  .cart-button {
    height: 46px;
  }
</style>
