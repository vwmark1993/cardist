<template>
  <div class="flex flex-col items-center h-screen bg-primary">
    <div class="m-auto py-10 px-14 rounded bg-tertiary">
      <div>
        <span class="block text-sm text-left font-semibold text-primary mb-1">Username</span>
        <input type="text" class="outline-none focus:outline-none text-center bg-slate-300 font-semibold text-md hover:text-slate-900 focus:text-slate-900 md:text-basecursor-default text-gray-700 outline-none border rounded mb-3" name="username" />
        <span class="block text-sm text-left font-semibold text-primary mb-1">Password</span>
        <input type="password" class="outline-none focus:outline-none text-center bg-slate-300 font-semibold text-md hover:text-slate-900 focus:text-slate-900 md:text-basecursor-default text-gray-700 outline-none border rounded mb-3" name="password" />
      </div>
      <div class="flex justify-between mt-1">
        <button class="bg-tertiary text-primary hover:bg-secondary font-semibold py-1 px-3 rounded">Login</button>
        <button class="bg-tertiary text-primary hover:bg-secondary font-semibold py-1 px-3 rounded">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
// import UserDataService from '@/services/UserDataService.js'

export default {
  name: 'Login',
  data() {

  },
  methods: {

  }
}
</script>
<style scoped>
  input {
    height: 30px;
    width: 150px;
  }
</style>
