<template>
  <div @keydown="handleEscape" class="p-3 flex justify-between">
    <img
      @click="goToHomepage"
      src="../assets/images/cardist-logo.png"
      width="50"
      height="50"
      class="inline object-contain cursor-pointer"
    />
    <div class="w-full mx-8 my-auto">
      <div class="relative">
        <input v-on:keyup.enter="searchItemsByName" v-model="searchString" type="search" name="search" class="w-full min-w-300px py-3 text-sm text-slate-900 bg-slate-300 rounded-md pl-3 focus:outline-none focus:bg-slate-200" placeholder="Search..." maxlength=50  autocomplete="off">
        <span class="absolute inset-y-0 right-0 flex items-stretch">
          <button @click="searchItemsByName" class="p-1 mr-2 focus:outline-none focus:shadow-outline text-secondary hover:text-tertiary">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </span>
      </div>
    </div>
    <div v-if="$store.state.user.authenticated" class="flex flex-row">
      <div class="relative my-auto mx-3">
        <div @click="isOpen = !isOpen" class="relative z-50 p-2 rounded flex bg-white items-center cursor-pointer">
          <button v-if="isOpen" class="block h-8 w-8 rounded-full overflow-hidden border-2 border-primary">
            <img v-if="$store.state.user.currentUser.picture" class="h-full w-full object-cover" :src="$store.state.user.currentUser.picture" alt="user profile image" />
            <img v-else class="h-full w-full object-cover" src="../assets/images/profile-picture-placeholder.png" alt="user profile image" />
          </button>
          <button v-else class="block h-8 w-8 rounded-full overflow-hidden border-2 border-slate-600">
            <img v-if="$store.state.user.currentUser.picture" class="h-full w-full object-cover" :src="$store.state.user.currentUser.picture" alt="user profile image" />
            <img v-else class="h-full w-full object-cover" src="../assets/images/profile-picture-placeholder.png" alt="user profile image" />
          </button>
          <span class="ml-1 text-lg font-semibold select-none text-truncate">{{ $store.state.user.currentUser.username }}</span>
        </div>
        <div v-if="isOpen" @click="isOpen = false" class="fixed z-40 inset-0 h-full w-full bg-black opacity-30"></div>
        <div v-if="isOpen" class="absolute z-50 left-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
          <a @click="goToProfile" class="block px-4 py-2 text-slate-800 hover:bg-primary hover-text-white cursor-pointer">Go to Profile</a>
          <a @click="logout" class="block px-4 py-2 text-slate-800 hover:bg-primary hover-text-white cursor-pointer">Sign Out</a>
        </div>
      </div>
      <button class="bg-primary hover:bg-tertiary hover:text-primary text-secondary font-bold py-2 px-4 mr-3 rounded inline-flex items-center select-none">
        <span class="material-symbols-outlined text-3xl mr-1">paid</span>
        <span>SELL</span>
      </button>
      <button @click="goToCart" class="bg-primary hover:bg-tertiary hover:text-primary text-secondary font-bold py-2 px-4 rounded inline-flex items-center select-none">
        <span class="material-symbols-outlined text-3xl mr-1">shopping_cart</span>
        <span v-if="$store.state.cart.cartItems.length > 0" class="whitespace-nowrap">CART ({{ $store.state.cart.cartItems.length }})</span>
        <span v-else class="whitespace-nowrap">CART</span>
      </button>
    </div>
    <div v-else class="flex flex-row">
      <button @click="goToLogin" class="bg-primary hover:bg-tertiary hover:text-primary text-secondary font-bold ml-20 py-2 px-8 rounded inline-flex items-center">
        <span class="material-symbols-outlined text-3xl mr-1">account_circle</span>
        <span class="whitespace-nowrap">SIGN IN</span>
      </button>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'UserHeader',
  props: {
    
  },
  data() {
    return {
      isOpen: false,
      searchString: store.state.search.searchString
    }
  },
  created() {
    document.addEventListener('keydown', this.handleEscape);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEscape);
  },
  mounted() {
    store.dispatch('cart/getCart');
  },
  methods: {
    logout() {
      store.dispatch('user/authentication', {
        authenticated: false,
        user: {
          id: null,
          username: null,
          email: null,
          phone: null,
          picture: null,
          settings: null,
          totalEarnings: null,
          totalSpending: null,
          admin: null
        }
      })

      store.dispatch('search/searchItems', '')
      store.dispatch('search/resetFilters');
      store.dispatch('cart/emptyCart');
      store.dispatch('user/removeLoginMessage');
      store.dispatch('user/setLogoutMessage');

      setTimeout(() => {
        store.dispatch('user/removeLogoutMessage');
      }, 3000)

      this.searchString = '';
      this.$router.push({ name: 'home' });
    },
    handleEscape(e) {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false;
      }
    },
    goToHomepage() {
      this.$router.push({ name: 'home' })
    },
    goToLogin() {
      this.$router.push({ name: 'login' }) 
    },
    goToProfile() {
      this.$router.push({ name: 'user-profile' }) 
    },
    goToCart() {
      this.$router.push({ name: 'shopping-cart' })
    },
    searchItemsByName() {
      this.$router.push({ name: 'home' }) 
      store.dispatch('search/searchItems', this.searchString)
    }
  }
}
</script>
<style scoped>
  /* clears the 'X' from Internet Explorer */
  input[type=search]::-ms-clear {  display: none; width : 0; height: 0; }
  input[type=search]::-ms-reveal {  display: none; width : 0; height: 0; }

  /* clears the 'X' from Chrome */
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration { display: none; }

  input[type="search"] {
    font-size:18px;
}

</style>
