<template>
  <div class="flex flex-col items-center h-screen bg-primary">
    <div class="m-auto rounded bg-tertiary">
      <div class="pt-2 pb-2 flex justify-end">
        <span @click="goToHomepage" class="material-symbols-outlined text-primary mr-2 p-1 rounded cursor-pointer hover:bg-secondary">exit_to_app</span>
      </div>
      <div class="px-14">
        <span class="block text-sm text-left font-semibold text-primary mb-1">New Username *</span>
        <input v-model="username" type="text" class="outline-none focus:outline-none text-center bg-slate-300 font-semibold text-md hover:text-slate-900 focus:text-slate-900 md:text-basecursor-default text-gray-700 outline-none border rounded mb-3" name="username" />
        <span class="block text-sm text-left font-semibold text-primary mb-1">New Password *</span>
        <input v-model="password" type="password" class="outline-none focus:outline-none text-center bg-slate-300 font-semibold text-md hover:text-slate-900 focus:text-slate-900 md:text-basecursor-default text-gray-700 outline-none border rounded mb-3" name="password" />
        <span class="block text-sm text-left font-semibold text-primary mb-1">Email Address</span>
        <input v-model="email" type="email" class="outline-none focus:outline-none text-center bg-slate-300 font-semibold text-md hover:text-slate-900 focus:text-slate-900 md:text-basecursor-default text-gray-700 outline-none border rounded mb-3" name="email" />
        <span class="block text-sm text-left font-semibold text-primary mb-1">Phone Number</span>
        <input v-model="phone" type="phone" class="outline-none focus:outline-none text-center bg-slate-300 font-semibold text-md hover:text-slate-900 focus:text-slate-900 md:text-basecursor-default text-gray-700 outline-none border rounded mb-1" name="phone" />
        <span class="block text-xs text-left font-semibold text-primary mb-3">* Mandatory Fields</span>
      </div>
      <div class="flex justify-between mt-1 pb-10 px-14">
        <button @click="createNewUser" class="bg-tertiary text-primary hover:bg-secondary font-semibold py-1 px-3 rounded">Create</button>
        <button @click="goToLogin" class="bg-tertiary text-primary hover:bg-secondary font-semibold py-1 px-3 rounded">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import UserDataService from '@/services/UserDataService.js'

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      email: '',
      phone: ''
    }
  },
  mounted() {
    if (store.state.user.authenticated) {
      this.$router.push({ name: 'home' });
    }
  },
  methods: {
    async createNewUser() {
      try {
        if (this.username.length > 0 && this.password.length > 0) {
          if (this.email == '') {
            this.email = null;
          }

          if (this.phone == '') {
            this.phone = null;
          }

          let response = await UserDataService.create(this.username, this.password, this.email, this.phone);
          let userResponse = response.data;
          console.log(userResponse);

          if (response.status == 200) {
            console.log('User registered.');

            this.$router.push({ name: 'login' })
          } else if (response.status == 201) {
            console.log(response.data.message)
          }
        } else {
          console.log('Please enter valid user credentials.')
        }
      } catch (e) {
        console.log(e)
      }
    },
    goToHomepage() {
      this.$router.push({ name: 'home' })
    },
    goToLogin() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style scoped>
  input {
    height: 30px;
    width: 180px;
  }
</style>
