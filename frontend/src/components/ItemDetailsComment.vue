<template>
  <div class="bg-slate-300 rounded p-3 m-3">
    <div class="flex border-slate-400 border-b pb-2 mb-2 justify-between">
      <div class="flex">
        <span class="material-symbols-outlined select-none">account_circle</span>
        <span class="font-bold ml-1">{{ username }}</span>
        <span v-if="$store.state.user.currentUser.id === userId" class="italic">(you)</span>
      </div>
      <div v-if="$store.state.user.currentUser.admin || $store.state.user.currentUser.id === userId">
        <button v-if="$store.state.user.currentUser.id === userId" @click="editComment" class="bg-slate-500 hover:bg-slate-700 text-white text-sm mr-1 py-1 px-2 rounded select-none">Edit</button>
        <button @click="deleteComment" class="bg-slate-500 hover:bg-red-700 text-white text-sm py-1 px-2 rounded select-none">Delete</button>
      </div>
      <span v-else-if="!$store.state.user.currentUser.admin" @click="flagComment" class="material-symbols-outlined cursor-pointer transition duration-300 flag-icon select-none">flag</span>
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
    id: String,
    userId: String,
    message: String,
    date: String
  },
  data() {
      return {
          username: null
      }
  },
  methods: {
    async getUser() {
      try {
        let response = await UserDataService.get(this.userId)
        this.username = response.data.username;
      } catch (e) {
        this.$emit('userError', e);
      }
    },
    async flagComment() {
      this.$emit('commentFlagged', this.username);
    },
    async editComment() {
      this.$emit('editComment');
    },
    async deleteComment() {
      this.$emit('deleteComment', this.id);
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
