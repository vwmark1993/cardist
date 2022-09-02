<template>
  <div class="bg-slate-300 rounded p-3 m-3">
    <div class="flex border-slate-400 border-b pb-2 mb-2 justify-between">
      <div class="flex">
        <span class="material-symbols-outlined">account_circle</span>
        <span class="font-bold ml-1">{{ username }}</span>
      </div>
      <span @click="flagComment" class="material-symbols-outlined cursor-pointer flag-icon">flag</span>
    </div>
    <p class="text-sm text-slate-500 mb-1">{{ new Date(date).toLocaleDateString("en-US") }}</p>
    <p class="text-slate-800 mb-2">{{ message }}</p>
  </div>
</template>

<script>
import UserDataService from '@/services/UserDataService.js'

export default {
  name: 'ItemDetailsComment',
  components: {

  },
  props: {
    user_id: String,
    message: String,
    date: String
  },
  data() {
      return {
          username: null
      }
  },
  methods: {
    getUser() {
      try {
        UserDataService.get(this.user_id)
        .then(response => {
          this.username = response.data.username;
        }).catch(e => {
          console.log(e)
        })
      } catch (e) {
        console.log(e)
      }
    },
    flagComment() {
      this.$emit('commentFlagged');
    }
  },
  mounted() {
    this.getUser();
  }
}
</script>
<style scoped>
  .flag-icon:hover {
    font-variation-settings:
    'FILL' 1;
    color: #ef4444;
  }
</style>
