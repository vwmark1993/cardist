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
    <ItemListingsDetailsModal 
      :id="itemListingsDetailsModalId"
      @itemDetailsError="(message) => showMessage(message, 'failure')"
    />
    <UserHeader />
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="alertMessage" :message="alertMessage" :mode="alertMessageMode" />
      </Transition>
    </div>
    <div>
      <div class="flex items-center mb-2 mt-3">
        <h1 class="text-4xl font-bold text-slate-700 text-left mr-3">Item Listings</h1>
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
        <div class="flex items-center justify-end border-b pb-2 mx-3">
          <label for="sort" class="text-sm font-medium text-slate-900 dark:text-slate-400">Sort:&nbsp;&nbsp;</label>
          <select v-model="sortMode" id="sort" class="p-1 bg-slate-100 border border-slate-300 text-slate-800 text-sm rounded focus:border-slate-500">
            <option selected value="latest">Latest Date</option>
            <option value="earliest">Earliest Date</option>
          </select>
        </div>
        <div v-for="item, index in paginatedItems" :key="item.id" class="item-listings-item-container border rounded border-slate-300 bg-slate-100 p-3 m-3 flex">
          <div class="flex items-center mr-3">
            <img v-if="item.images && item.images.length > 0 && item.images[0] !== ''" :src="item.images[0]" class="item-listings-item-image border rounded m-auto" />
            <img v-else src="../assets/images/image-placeholder.png" class="item-listings-item-image border rounded m-auto" />
          </div>
          <div class="w-full relative">
            <div class="item-listings-item-header flex justify-between items-center border-b border-slate-400 mb-1">
              <h6 class="text-lg truncate">{{ item.name }}</h6>
              <div>
                <button @click="showItemDetails(item.id)" class="bg-slate-500 hover:bg-slate-700 text-white text-sm px-3 py-1 mr-1 rounded">Details</button>
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
        <div class="pagination-container mb-5">
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
  </div>
</template>

<script>
  import store from '@/store';

  import UserHeader from '@/components/UserHeader.vue'
  import AlertMessage from '@/components/AlertMessage.vue'

  import { $vfm } from 'vue-final-modal'
  import CreateItemListingModal from '@/components/CreateItemListingModal.vue'
  import ItemListingsDetailsModal from '@/components/ItemListingsDetailsModal.vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'

  import ItemDataService from '@/services/ItemDataService.js'

  export default {
    name: 'ItemListings',
    components: {
      UserHeader,
      AlertMessage,
      CreateItemListingModal,
      ItemListingsDetailsModal,
      ConfirmDeleteModal
    },
    data() {
      return {
        itemListings: [],
        currentPage: 1,
        perPage: 5,
        maxVisibleButtons: 3,

        sortMode: 'latest',

        deleteId: '',
        deleteName: '',
        deleteIndex: 0,

        itemListingsDetailsModalId: '',

        alertMessage: null,
        alertMessageMode: null
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
        return this.itemListings.length > 0 ? Math.ceil(this.itemListings.length / this.perPage) : 1
      },
      isInFirstPage() {
        return this.currentPage === 1;
      },
      isInLastPage() {
        return this.currentPage === this.totalPages;
      },
      paginatedItems() {
        let startIndex = 1;

        if (this.currentPage == 1) {
          startIndex = 0;
        } else {
          startIndex = this.currentPage * this.perPage - this.perPage;
        }

        let sortedItems = this.itemListings;

        // Apply sort order.
        if (this.sortMode === 'latest') {
          sortedItems.sort((a,b) => (a.createdOn < b.createdOn) ? 1 : ((b.createdOn < a.createdOn) ? -1 : 0));
        } else if (this.sortMode === 'earliest') {
          sortedItems.sort((a,b) => (a.createdOn > b.createdOn) ? 1 : ((b.createdOn > a.createdOn) ? -1 : 0));
        }

        return sortedItems.slice(startIndex, startIndex + this.perPage);
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
      showItemDetails(id) {
        this.itemListingsDetailsModalId = id;

        $vfm.show('ItemListingsDetailsModal');
      },
      createItemListing() {
        $vfm.show('CreateItemListingModal');
      },
      async getItemListings() {
        let response = await ItemDataService.getItemsBySeller(store.state.user.currentUser.id);
        this.itemListings = response.data;
      },
      async deleteItem(id, name, index) {

        this.deleteId = id;
        this.deleteIndex = index;
        this.deleteName = name;

        $vfm.show('ConfirmDeleteModal');
      },
      confirmDeleteItem(paginatedIndex) {
        // Refresh item search.
        store.dispatch('search/searchItems', '');

        let realIndex = this.currentPage * this.perPage - this.perPage + paginatedIndex;

        this.itemListings.splice(realIndex, 1);

        if (this.paginatedItems.length === 0 && this.currentPage !== 1) {
          this.currentPage--;
        }
      },
      addNewItem(item) {
        this.itemListings.push(item);
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
    mounted() {
      if (!store.state.user.authenticated) {
        this.$router.push({ name: 'login' });
      }

      if (store.state.user.currentUser.admin) {
        this.$router.push({ name: 'home' });
      }

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
  .pagination-container {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 16px;
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