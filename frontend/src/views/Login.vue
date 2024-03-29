<template>
  <div class="flex flex-col justify-center h-screen bg-primary">
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="$store.state.user.successfulRegistrationMessage" :message="$store.state.user.successfulRegistrationMessage" mode="success" />
        <AlertMessage v-else-if="message !== ''" :message="message" mode="failure" />
      </Transition>
    </div>
    <div class="flex flex-col justify-center items-center">
      <div class="m-auto bg-tertiary rounded">
        <div class="pt-2 pb-2 flex justify-end">
          <span @click="goToHomepage" class="material-symbols-outlined text-primary mr-2 p-1 rounded cursor-pointer hover:bg-secondary">exit_to_app</span>
        </div>
        <div class="px-14">
          <span class="block text-sm text-left font-semibold text-primary mb-1">Username</span>
          <input v-model="username" type="text" class="outline-none focus:outline-none text-center bg-slate-300 font-semibold text-md hover:text-slate-900 focus:text-slate-900 md:text-basecursor-default text-gray-700 outline-none border rounded mb-3" maxlength="20" name="username" />
          <span class="block text-sm text-left font-semibold text-primary mb-1">Password</span>
          <input v-model="password" type="password" class="outline-none focus:outline-none text-center bg-slate-300 font-semibold text-md hover:text-slate-900 focus:text-slate-900 md:text-basecursor-default text-gray-700 outline-none border rounded mb-3" maxlength="20" name="password" />
        </div>
        <div class="flex justify-between mt-1 pb-10 px-14">
          <button @click="login" class="bg-tertiary text-primary hover:bg-secondary font-semibold py-1 px-3 rounded">Login</button>
          <button @click="goToRegistration" class="bg-tertiary text-primary hover:bg-secondary font-semibold py-1 px-3 rounded">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

import AlertMessage from '@/components/AlertMessage.vue'

import UserDataService from '@/services/UserDataService.js'

export default {
  name: 'Login',
  components: {
    AlertMessage
  },
  data() {
    return {
      username: '',
      password: '',
      message: ''
    }
  },
  created() {
    document.addEventListener('keydown', this.loginByPressingEnter);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.loginByPressingEnter);
  },
  mounted() {
    if (store.state.user.authenticated) {
      this.$router.push({ name: 'home' });
    }
  },
  methods: {
    async login() {
      store.dispatch('search/resetFilters');

      try {
        if (this.username.length > 0 && this.password.length > 0) {
          let data = {
            username: this.username,
            password: this.password
          }

          let response = await UserDataService.authenticate(data)
      
          if (response.status == 200) {
            store.dispatch('user/authentication', {
              authenticated: true,
              user: response.data.user
            });

            store.dispatch('user/removeLogoutMessage');
            store.dispatch('user/setLoginMessage', this.username)

            this.$router.push({ name: 'home' });
          } else if (response.status == 201 || response.status == 202) {
            this.message = response.data.message;
          }
        } else {
          this.message = "Invalid User Credentials";

          setTimeout(() => {
            this.message = '';
          }, 3000)
        }
      } catch (e) {
        this.message = e; 

        setTimeout(() => {
          this.message = '';
        }, 3000)
      }
    },
    loginByPressingEnter(e) {
      if (e.key === 'Enter') {
        this.login();
      }
    },
    goToHomepage() {
      this.$router.push({ name: 'home' })
    },
    goToRegistration() {
      this.$router.push({ name: 'register' })
    }
  }
}
</script>
<style scoped>
  input {
    height: 30px;
    width: 150px;
  }
</style>
