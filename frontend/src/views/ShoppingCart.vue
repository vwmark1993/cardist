<template>
  <div>
    <UserHeader />
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="alertMessage" :message="alertMessage" :mode="alertMessageMode" />
      </Transition>
    </div>
    <div class="grid grid-cols-12 grid-flow-col justify-between m-3">
      <div class="col-span-9 text-left">
        <h1 class="text-4xl font-bold text-slate-700 mb-6">Shopping Cart</h1>
        <div v-if="cartItems.length > 0">
          <ShoppingCartItem 
            v-for="cartItem, index in paginatedItems" 
            :key="cartItem.id" 
            :index="currentPage * perPage - perPage + index" 
            :id="cartItem.id" 
            :itemId="cartItem.itemId"
            :name="cartItem.name" 
            :thumbnail="cartItem.thumbnail" 
            :quantityProp="cartItem.quantity" 
            :price="cartItem.price"
            @cartItemMessage="(message) => showMessage(message, 'success')"
            />
        </div>
        <div v-else>
          <span class="text-slate-400 text-xl italic mb-4">Empty Cart</span>
        </div>
      </div>
      <div class="col-span-3 text-right">
        <button v-if="cartItems.length > 0" @click="checkout" class="bg-slate-500 hover:bg-slate-700 text-white font-bold text-lg py-3 px-7 rounded select-none">Checkout</button>
        <div v-if="cartItems.length > 0" class="border rounded bg-slate-100 border-slate-500 p-3 mt-3 ml-6 flex">
          <div class="w-full px-4">
            <div v-for="cartItem in cartItems" :key="cartItem.id">
              <div v-if="cartItem.quantity > 0" class="flex justify-between text-sm mb-1">
                <span class="truncate"><span class="font-semibold">{{ cartItem.name }}</span> x {{ cartItem.quantity }}</span>
                <span>{{ cartItem.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
              </div>
            </div>
            <div class="flex flex-wrap justify-between items-center border-t border-slate-400 mt-4 pt-1">
              <span class="text-lg font-bold truncate">SUBTOTAL</span>
              <span class="text-lg font-bold">{{ subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="cartItems.length > 0" class="pagination-container mb-5">
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
</template>

<script>
import store from '@/store';

import CartDataService from '@/services/CartDataService.js'

import UserHeader from '@/components/UserHeader.vue'
import ShoppingCartItem from '@/components/ShoppingCartItem.vue'
import AlertMessage from '@/components/AlertMessage.vue'

export default {
  name: 'ShoppingCart',
  components: {
    UserHeader,
    ShoppingCartItem,
    AlertMessage
  },
  watch: {
    '$store.state.cart.cartItemDeleted': function() {
      if (this.$store.state.cart.cartItemDeleted) {
        if (this.paginatedItems.length === 0 && this.currentPage !== 1) {
          this.currentPage--;
        }
      }
    }
  },
  data() {
    return {
      userId: store.state.user.currentUser.id,
      cartId: store.state.cart.cartId,
      cartItems: store.state.cart.cartItems,

      currentPage: 1,
      perPage: 5,
      maxVisibleButtons: 3,

      alertMessage: null,
      alertMessageMode: null
    }
  },
  computed: {
    subtotal() {
      let subtotal = 0;

      this.cartItems.forEach(item => {
        subtotal += item.price
      })

      return subtotal;
    },
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
      return this.cartItems.length > 0 ? Math.ceil(this.cartItems.length / this.perPage) : 1
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

      return this.cartItems.slice(startIndex, startIndex + this.perPage);
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
    async checkout() {
      try {
        if (this.subtotal === 0) {
          this.showMessage('Subtotal is zero.', 'failure');
          
          return;
        }

        let data = {
          items: this.cartItems.map(item => {
            return {
              id: item.itemId,
              quantity: item.quantity
            }
          })
        }

        let response = await CartDataService.checkout(data)
        if (response.status == 200) {
          let url = response.data.url
          window.location = url
        }

      } catch (e) {
        this.showMessage(e, 'failure');
      }
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
  async mounted() {
    if (!store.state.user.authenticated) {
      this.$router.push({ name: 'login' });
    }

    if (store.state.user.currentUser.admin) {
      this.$router.push({ name: 'home' });
    }
  }
}
</script>
<style scoped>
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
