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
        <input type="search" name="search" class="w-full min-w-300px py-3 text-sm text-white bg-slate-300 rounded-md pl-3 focus:outline-none focus:bg-slate-200 focus:text-slate-900" placeholder="Search..." maxlength=50  autocomplete="off">
        <span class="absolute inset-y-0 right-0 flex items-stretch">
          <button class="p-1 mr-2 focus:outline-none focus:shadow-outline text-secondary hover:text-tertiary">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </span>
      </div>
    </div>
    <div v-if="$store.state.user.authenticated" class="flex flex-row">
      <!-- <span class="material-symbols-outlined text-4xl my-auto mr-3">settings</span>
      <span @click="goToProfile" class="material-symbols-outlined text-4xl my-auto mr-6 cursor-pointer">account_circle</span> -->
      <!-- <div @click="goToProfile" class="relative w-12 h-12">
        <img class="rounded-full border border-gray-100 shadow-sm" src="https://randomuser.me/api/portraits/women/81.jpg" alt="user image" />
        <div class="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
      </div> -->
      <div class="relative my-auto mx-3">
        <div @click="isOpen = !isOpen" class="relative z-50 p-2 rounded flex bg-white items-center cursor-pointer">
          <button class="block h-8 w-8 rounded-full overflow-hidden border-2 border-slate-600">
            <img class="h-full w-full object-cover" :src="$store.state.user.currentUser.picture" alt="user profile image" />
          </button>
          <span class="ml-1 text-lg font-semibold text-truncate">{{ $store.state.user.currentUser.username }}</span>
        </div>
        <div v-if="isOpen" @click="isOpen = false" class="fixed z-40 inset-0 h-full w-full bg-black opacity-50"></div>
        <div v-if="isOpen" class="absolute z-50 left-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
          <a @click="goToProfile" class="block px-4 py-2 text-slate-800 hover:bg-primary hover-text-white cursor-pointer">Go to Profile</a>
          <a @click="logout" class="block px-4 py-2 text-slate-800 hover:bg-primary hover-text-white cursor-pointer">Sign Out</a>
        </div>
      </div>
      <button class="bg-primary hover:bg-tertiary hover:text-primary text-secondary font-bold py-2 px-4 mr-3 rounded inline-flex items-center">
        <span class="material-symbols-outlined text-3xl mr-1">paid</span>
        <span>SELL</span>
      </button>
      <button @click="goToCart" class="bg-primary hover:bg-tertiary hover:text-primary text-secondary font-bold py-2 px-4 rounded inline-flex items-center">
        <span class="material-symbols-outlined text-3xl mr-1">shopping_cart</span>
        <span>CART</span>
      </button>
    </div>
    <div v-else class="flex flex-row">
      <button @click="goToLogin" class="bg-primary hover:bg-tertiary hover:text-primary text-secondary font-bold ml-20 py-2 px-8 rounded inline-flex items-center">
        <span class="material-symbols-outlined text-3xl mr-1">login</span>
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

    }
  },
  created() {
    document.addEventListener('keydown', this.handleEscape);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEscape);
  },
  mounted() {
    
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

      this.$router.push({ name: 'home' })
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
