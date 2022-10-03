<template>
  <div class="flex flex-col justify-center h-screen bg-primary">
    <div class="fixed bottom-3 w-full">
      <Transition name="slide-fade">
        <AlertMessage v-if="message !== ''" :message="message" mode="failure" />
      </Transition>
    </div>
    <div class="flex flex-col justify-center items-center">
      <div class="m-auto rounded bg-tertiary">
        <div class="mr-2 ml-6 mt-3 mb-3 pt-2 pb-2 flex justify-between">
          <span class="block text-xl text-left font-semibold text-primary">Register</span>
          <span @click="goToHomepage" class="material-symbols-outlined text-primary p-1 rounded cursor-pointer hover:bg-secondary relative bottom-3">exit_to_app</span>
        </div>
        <div class="px-14">
          <span class="block text-sm text-left font-semibold text-primary mb-1">New Username *</span>
          <input v-model="username" type="text" class="outline-none focus:outline-none text-center bg-slate-300 font-semibold text-md hover:text-slate-900 focus:text-slate-900 md:text-basecursor-default text-gray-700 outline-none border rounded mb-3" maxlength="20" name="username" required />
          <span class="block text-sm text-left font-semibold text-primary mb-1">New Password *</span>
          <input 
            v-model="password"
            type="password" 
            id="password" 
            name="password" 
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" 
            title="Must contain at least one uppercase letter, one lowercase letter, one number, and at least 8 or more characters."
            maxlength="20"
            required
            class="outline-none focus:outline-none text-center bg-slate-300 font-semibold text-md hover:text-slate-900 focus:text-slate-900 md:text-basecursor-default text-gray-700 outline-none border rounded mb-3"
            />
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
  </div>
</template>

<script>
import store from '@/store'

import AlertMessage from '@/components/AlertMessage.vue'

import UserDataService from '@/services/UserDataService.js'
import CartDataService from '@/services/CartDataService.js'

export default {
  name: 'Register',
  components: {
    AlertMessage
  },
  data() {
    return {
      username: '',
      password: '',
      email: '',
      phone: '',
      message: ''
    }
  },
  created() {
    document.addEventListener('keydown', this.registerByPressingEnter);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.registerByPressingEnter);
  },
  mounted() {
    if (store.state.user.authenticated) {
      this.$router.push({ name: 'home' });
    }
  },
  methods: {
    async createNewUser() {
      try {
        // Check if username and password are blank.
        if (this.username.trim().length > 0 && this.password.trim().length > 0) {
          
          // Password must contain at least one uppercase letter, one lowercase letter, one number, and at least 8 or more characters.
          if (this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {

            if (this.email === '' || this.email.trim() === '') {
              this.email = null;
            }

            if (this.phone === '' || this.phone.trim() === '') {
              this.phone = null;
            }

            let data = {
              username: this.username,
              password: this.password,
              email: this.email,
              phone: this.phone
            }

            let response = await UserDataService.create(data);
            let userResponse = response.data;

            // New user created.
            if (response.status == 200) {
              let data = {
                userId: userResponse.id
              }
              
              response = await CartDataService.create(data);

              // New cart created. New user account registration is completed.
              if (response.status == 200) {
                this.message = '';

                store.dispatch('user/setRegistrationMessage')
              
                this.$router.push({ name: 'login' })
              } else {
                this.message = response.data.message;
              }

            } else if (response.status == 201) {
              this.message = response.data.message;

              setTimeout(() => {
                this.message = '';
              }, 3000)
            }

          // Invalid password.
          } else {
            this.message = 'Password must contain at least one letter, one number, and at least 8 or more characters.';

              setTimeout(() => {
                this.message = '';
              }, 3000)
          }
        
        // Blank username or password.
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
    registerByPressingEnter(e) {
      if (e.key === 'Enter') {
        this.createNewUser();
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
