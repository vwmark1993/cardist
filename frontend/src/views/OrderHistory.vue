<template>
  <div>
    <OrderItemDetailsModal 
      :id="orderItemDetailsModalId"
      @orderItemDetailsError="(message) => showMessage(message, 'failure')"
    />
    <UserHeader />
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="alertMessage" :message="alertMessage" :mode="alertMessageMode" />
      </Transition>
    </div>
    <div>
      <div class="flex items-center mb-6">
        <h1 class="text-4xl font-bold text-slate-700 text-left m-3">Order History</h1>
      </div>
      <div v-if="orderItems.length === 0">
        <span class="block text-slate-400 text-xl italic mb-4">No Items Ordered</span>
      </div>
      <div v-else>
        <div v-for="order in paginatedItems" :key="order.id" class="item-listings-item-container border rounded border-slate-300 bg-slate-100 p-3 m-3 flex">
          <div class="flex items-center mr-3">
            <img v-if="order.images && order.images.length > 0 && order.images[0] !== ''" :src="order.images[0]" class="item-listings-item-image border rounded m-auto" />
            <img v-else src="../assets/images/image-placeholder.png" class="item-listings-item-image border rounded m-auto" />
          </div>
          <div class="w-full relative">
            <div class="item-listings-item-header flex justify-between items-center border-b border-slate-400 mb-1">
              <h6 class="text-lg truncate">{{ order.itemName }}</h6>
              <div>
                <button @click="showOrderItemDetails(order.id)" class="bg-slate-500 hover:bg-slate-700 text-white text-sm px-3 py-1 mr-1 rounded">Details</button>
              </div>
            </div>
            <span class="block text-left text-xs mb-1">Posted on: {{ new Date(order.createdOn).toLocaleDateString("en-US") }}</span>
            <span class="block text-left">Total Price: {{ (order.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
            <div class="bottom-0 mb-1 absolute">
              <div class="flex flex-row items-center">
                <span class="text-sm">Quantity Purchased: {{ order.quantity }}</span>
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
  import OrderItemDetailsModal from '@/components/OrderItemDetailsModal.vue'

  import OrderDataService from '@/services/OrderDataService.js'
  import OrderItemDataService from '@/services/OrderItemDataService.js'
  import ItemDataService from '@/services/ItemDataService.js'

  

  export default {
    name: 'OrderHistory',
    components: {
      UserHeader,
      AlertMessage,
      OrderItemDetailsModal
    },
    data() {
      return {
        orderItems: [],
        currentPage: 1,
        perPage: 5,
        maxVisibleButtons: 3,

        deleteId: '',
        deleteName: '',
        deleteIndex: 0,

        orderItemDetailsModalId: '',

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
        return this.orderItems.length > 0 ? Math.ceil(this.orderItems.length / this.perPage) : 1
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

        return this.orderItems.slice(startIndex, startIndex + this.perPage);
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
      showOrderItemDetails(id) {
        this.orderItemDetailsModalId = id;

        $vfm.show('OrderItemDetailsModal');
      },
      async getOrders() {
        let orderResponse = await OrderDataService.getOrdersByBuyer(store.state.user.currentUser.id);
        let orders = orderResponse.data;

        orders.forEach(async order => {
          let orderItemResponse = await OrderItemDataService.getOrderItems(order.id);
          let orderItems = orderItemResponse.data;

          orderItems.forEach(async orderItem => {
            let itemResponse = await ItemDataService.get(orderItem.item_id);
            let item = itemResponse.data;

            this.orderItems.push({
              id: orderItem.id,
              buyerId: order.buyer_id,
              sellerId: orderItem.seller_id,
              itemId: orderItem.item_id,
              itemName: item.name,
              images: item.images,
              quantity: orderItem.quantity,
              price: item.price * orderItem.quantity,
              createdOn: orderItem.created_on,
              updatedOn: orderItem.updated_on
            })
          })
        })
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

      this.getOrders();
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