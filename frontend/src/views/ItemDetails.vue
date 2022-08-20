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
          <div v-if="$store.state.user.authenticated">
            <button @click="addItemToCart" class="cart-button bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded select-none">Add to Cart</button>
          </div>
        </div>
        <h6 class="text-sm font-medium text-slate-500">Description</h6>
        <p class="text-xl text-slate-800 mb-10">{{itemDetails.description}}</p>
        <div class="mb-5">
          <div v-if="comments.length == 0">
            <h6 class="text-sm font-medium text-slate-500">This item has no comments written about it.</h6>
          </div>
          <div v-else>
            <h6 class="text-sm font-medium text-slate-500">Comments</h6>
            <ItemDetailsComment v-for="comment in comments" :key="comment.id" :user_id="comment.user_id" :message="comment.message" :date="comment.updated_on" />
          </div>
        </div>
        <div v-if="$store.state.user.authenticated">
          <hr class="border-t border-slate-300 mx-6 mt-5" />
          <div class="bg-slate-300 rounded p-3 mx-3 mb-3 mt-5">
            <h6 class="font-semibold text-lg mb-1">Add a comment</h6>
            <textarea v-model="newCommentMessage" placeholder="What do you think about this product?" class="resize-none rounded-md focus:outline-none p-2 w-full"></textarea>
            <div class="text-right">
              <button @click="createNewComment" class="text-white bg-slate-500 hover:bg-slate-700 font-semibold mt-1 py-1 px-3 rounded select-none">Add Comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

import ItemDataService from '@/services/ItemDataService.js'
import CommentDataService from '@/services/CommentDataService.js'
// import CartDataService from '@/services/CartDataService.js'
// import CartItemDataService from '@/services/CartItemDataService.js'

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
          userId: store.state.user.currentUser.id,
          itemId: this.$route.params.itemId,
          itemDetails: {
            id: null,
            name: null,
            description: null,
            price: 0,
            images: []
          },
          comments: [],
          selectedIndex: 0,
          newCommentMessage: ''
      }
  },
  methods: {
    async createNewComment() {
      let response = await CommentDataService.create(this.userId, this.itemId, this.newCommentMessage)
      let newComment = response.data;
      this.comments.push(newComment);
    },
    async getItem() {
      let response = await ItemDataService.get(this.itemId)
      let itemDetails = response.data;
      this.itemDetails = itemDetails;
    },
    async getComments() {
      let response = await CommentDataService.getCommentsByItem(this.itemId)
      let comments = response.data;
      this.comments = comments;
    },
    async addItemToCart() {
      store.dispatch('cart/addCartItem', this.itemId)
    },
    setImageIndex(index) {
      this.selectedIndex = index;
    }
  },
  computed: {

  },
  mounted() {
    // this.getCart();
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
