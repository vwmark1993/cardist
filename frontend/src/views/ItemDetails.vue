<template>
  <div>
    <ConfirmDeleteModal 
      :id="deleteId"
      apiService="Comment"
      :index="selectedCommentPaginatedIndex"
      @confirmDeleteMessage="(message, mode) => showMessage(message, mode)"
      @confirmDeleteComment="() => confirmDeleteComment()"
    />
    <EditCommentModal 
      :id="paginatedComments[selectedCommentPaginatedIndex] ? paginatedComments[selectedCommentPaginatedIndex].id : ''"
      :itemName="itemDetails.name"
      :date="paginatedComments[selectedCommentPaginatedIndex] ? paginatedComments[selectedCommentPaginatedIndex].updated_on : ''"
      :message="paginatedComments[selectedCommentPaginatedIndex] ? paginatedComments[selectedCommentPaginatedIndex].message : ''"
      @updatedCommentAlertMessage="(message, mode) => showMessage(message, mode)"
      @updatedCommentNewValue="(newValue) => updateComment(newValue)"
    />
    <FlagCommentModal 
      :id="paginatedComments[selectedCommentPaginatedIndex] ? paginatedComments[selectedCommentPaginatedIndex].id : ''"
      :username="flaggedCommentUsername"
      :itemName="itemDetails.name"
      :date="paginatedComments[selectedCommentPaginatedIndex] ? paginatedComments[selectedCommentPaginatedIndex].updated_on : ''"
      :message="paginatedComments[selectedCommentPaginatedIndex] ? paginatedComments[selectedCommentPaginatedIndex].message : ''"
      @flaggedCommentModalSubmission="(message, mode) => showMessage(message, mode)"
    />
    <UserHeader />
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="alertMessage" :message="alertMessage" :mode="alertMessageMode" />
        <AlertMessage v-else-if="$store.state.cart.cartMessage" :message="$store.state.cart.cartMessage" :mode="$store.state.cart.cartMessageStatus" />
      </Transition>
    </div>
    <div class="grid grid-cols-12 grid-flow-col">
      <div class="md:col-span-4 grid grid-cols-4 m-3">
        <div v-if="itemDetails.images.length > 1 && itemDetails.images[0] !== ''" class="col-span-1 flex flex-col mx-2">
          <img @click="setImageIndex(index)" v-for="(image, index) in itemDetails.images" :key="index" :src="image" class="border rounded mb-2 cursor-pointer opacity-50 hover:opacity-100 transition delay-75 ease-in-out" />
        </div>
        <div 
          :class="{
            'col-span-3' : itemDetails.images.length > 1 && itemDetails.images[0] !== '',
            'col-span-4' : itemDetails.images.length <= 1,
          }"
        >
          <img v-if="itemDetails.images.length > 0 && itemDetails.images[0] !== ''" :src="itemDetails.images[selectedIndex]" class="border rounded m-auto" />
          <img v-else src="../assets/images/image-placeholder.png" class="border rounded m-auto" />
        </div>
      </div>
      <div class="col-span-8 text-left m-3">
        <div class="border-b pb-3 mb-3">
          <h1 class="text-4xl font-bold">{{ itemDetails.name }}</h1>
          <span class="text-xs font-medium text-slate-500">Sold By: </span>
          <span class="text-sm text-slate-800 font-semibold">{{ itemDetails.seller_username }}</span>
          <span v-if="itemDetails.seller_id === $store.state.user.currentUser.id" class="text-sm text-slate-800 font-semibold italic">(you)</span>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <h6 class="text-sm font-medium text-slate-500">Price</h6>
            <p class="text-2xl text-slate-800 mb-6">{{ itemDetails.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</p>
          </div>
          <div v-if="$store.state.user.authenticated">
            <button 
              v-if="!$store.state.user.currentUser.admin && itemDetails.seller_id !== $store.state.user.currentUser.id" @click="addItemToCart" 
              class="cart-button bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded select-none"
            >
              Add to Cart
            </button>
          </div>
        </div>  
        <div v-if="itemDetails.description">
          <h6 class="text-sm font-medium text-slate-500">Description</h6>
          <p class="text-xl text-slate-800 mb-10">{{ itemDetails.description }}</p>
        </div>
        <div v-else>
          <h6 class="text-sm font-medium text-slate-500 mb-8">No Description Provided</h6>
        </div>
        <div class="mb-5">
          <div v-if="comments.length == 0">
            <h6 class="text-sm font-medium text-slate-500">This item has no comments written about it.</h6>
          </div>
          <div v-else>
            <h6 class="text-sm font-medium text-slate-500">Comments</h6>
            <ItemDetailsComment 
              v-for="comment, index in paginatedComments" 
              :key="comment.id" 
              :id="comment.id"
              :userId="comment.user_id" 
              :message="comment.message" 
              :date="comment.updated_on"
              @userError="(error) => showMessage(error, 'failure')"
              @commentFlagged="(username) => flagComment(index, username)"
              @editComment="() => editComment(index)"
              @deleteComment="(id) => deleteComment(id)"
            />
            <div class="pagination-container">
              <ul class="pagination">
                <li 
                  class="pagination-item text-secondary bg-slate-200 hover:bg-primary hover:text-white transition duration-150"
                >
                  <button 
                    type="button" 
                    @click="onClickFirstPage"
                    :disabled="isInFirstPage"
                    :class="{ disabled: isInFirstPage }"
                    aria-label="Go to first page"
                  >
                    First
                  </button>
                </li>

                <li
                  class="pagination-item text-secondary bg-slate-200 hover:bg-primary hover:text-white transition duration-150"
                >
                  <button 
                    type="button" 
                    @click="onClickPreviousPage"
                    :disabled="isInFirstPage"
                    :class="{ disabled: isInFirstPage }"
                    aria-label="Go to previous page"
                  >
                    Previous
                  </button>
                </li>

                <li v-for="page in pages" :key="page.name" class="pagination-item text-secondary bg-slate-200 hover:bg-primary hover:text-white transition duration-150">
                  <button 
                    type="button" 
                    @click="onClickPage(page.name)"
                    :disabled="page.isDisabled"
                    :class="{ active: isPageActive(page.name) }"
                    :aria-label="`Go to page number ${page.name}`"
                    
                  >
                    {{ page.name }}
                  </button>
                </li>

                <li class="pagination-item text-secondary bg-slate-200 hover:bg-primary hover:text-white transition duration-150">
                  <button 
                    type="button" 
                    @click="onClickNextPage"
                    :disabled="isInLastPage"
                    :class="{ disabled: isInLastPage }"
                    aria-label="Go to next page"
                  >
                    Next
                  </button>
                </li>

                <li class="pagination-item text-secondary bg-slate-200 hover:bg-primary hover:text-white transition duration-150">
                  <button 
                    type="button" 
                    @click="onClickLastPage"
                    :disabled="isInLastPage"
                    :class="{ disabled: isInLastPage }"
                    aria-label="Go to last page"
                  >
                    Last
                  </button>
                </li>
              </ul>
            </div>
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
import UserDataService from '@/services/UserDataService.js'
import CommentDataService from '@/services/CommentDataService.js'

import UserHeader from '@/components/UserHeader.vue'
import ItemDetailsComment from '@/components/ItemDetailsComment.vue'
import AlertMessage from '@/components/AlertMessage.vue'

import { $vfm } from 'vue-final-modal'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
import EditCommentModal from '@/components/EditCommentModal.vue'
import FlagCommentModal from '@/components/FlagCommentModal.vue'

export default {
  name: 'ItemDetails',
  components: {
    UserHeader,
    ItemDetailsComment,
    AlertMessage,
    ConfirmDeleteModal,
    EditCommentModal,
    FlagCommentModal
  },
  data() {
      return {
          userId: store.state.user.currentUser.id,
          itemId: this.$route.params.itemId,
          itemDetails: {
            id: null,
            seller_id: null,
            name: null,
            description: null,
            price: 0,
            images: []
          },

          comments: [],
          selectedIndex: 0,
          newCommentMessage: '',
          currentPage: 1,
          perPage: 3,
          maxVisibleButtons: 3,

          deleteId: '',

          selectedCommentPaginatedIndex: 0,
          flaggedCommentUsername: '', 

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
    async createNewComment() {
      try {
        let data = {
          userId: this.userId,
          itemId: this.itemId,
          message: this.newCommentMessage
        }

        let response = await CommentDataService.create(data);
        let newComment = response.data;
        this.comments.push(newComment);
        this.newCommentMessage = '';

        this.showMessage('Comment Added', 'success')
      } catch (e) {
        this.showMessage(e.message, 'failure')
      }
    },
    async flagComment(paginatedIndex, username) {
      this.selectedCommentPaginatedIndex = paginatedIndex;
      this.flaggedCommentUsername = username;

      $vfm.show("FlagCommentModal");
    },
    async getItem() {
      try {
        let response = await ItemDataService.get(this.itemId);
        this.itemDetails = response.data;

        response = await UserDataService.get(this.itemDetails.seller_id);
        this.itemDetails.seller_username = response.data.username;
      } catch (e) {
        this.showMessage(e, 'failure');
      }
    },
    async getComments() {
      try {
        let response = await CommentDataService.getCommentsByItem(this.itemId)
        this.comments = response.data;
      } catch (e) {
        this.showMessage(e, 'failure');
      }
    },
    async addItemToCart() {
      store.dispatch('cart/addCartItem', this.itemId)
    },
    editComment(paginatedIndex) {
      this.selectedCommentPaginatedIndex = paginatedIndex;
      
      $vfm.show("EditCommentModal");
    },
    updateComment(value) {
      this.paginatedComments[this.selectedCommentPaginatedIndex].message = value;
    },
    async deleteComment(id) {
      this.deleteId = id;

      $vfm.show('ConfirmDeleteModal');
    },
    confirmDeleteComment() {
      this.comments.splice(this.selectedCommentPaginatedIndex, 1);
    },
    setImageIndex(index) {
      this.selectedIndex = index;
    },
    onPageChange(page) {
      this.currentPage = page;
    },
    onClickFirstPage() {
      this.onPageChange(1);
    },
    onClickPreviousPage() {
      this.onPageChange(this.currentPage - 1);
    },
    onClickPage(page) {
      this.onPageChange(page);
    },
    onClickNextPage() {
      this.onPageChange(this.currentPage + 1);
    },
    onClickLastPage() {
      this.onPageChange(this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) { 
        return this.totalPages - this.maxVisibleButtons + 1 > 0 ? this.totalPages - this.maxVisibleButtons + 1 : 1;
      }

      return this.currentPage - 1;

    },
    endPage() {
      
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
      
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1 ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage 
        });
      }

      return range;
    },
    totalPages() {
      return this.comments.length > 0 ? Math.ceil(this.comments.length / this.perPage) : 1
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
    paginatedComments() {
      let startIndex = 1;

      if (this.currentPage == 1) {
        startIndex = 0;
      } else {
        startIndex = this.currentPage * this.perPage - this.perPage;
      }

      return this.comments.slice(startIndex, startIndex + this.perPage);
    }
  },
  async mounted() {
    await this.getItem();
    await this.getComments();

    // Re-route and refresh item search if the item is deleted.
    if (this.itemDetails.id === null) {
      this.$router.push({ name: 'home' });
      store.dispatch('search/searchItems', '');
    }
  }
}
</script>
<style scoped>
  .cart-button {
    height: 46px;
  }

  .pagination-container {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
  margin: 5px;
  border-radius: 5px;
}

.pagination-item button {
  padding: 2px 10px;
}

.active {
  background-color: #FF947C;
  color: #ffffff;
  border-radius: 5px;
  font-weight: bold;
}

.disabled {
  background-color: #ffffff;
  color: #94a3b8;
}
</style>
