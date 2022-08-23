<template>
  <div v-if="hideFilters">
    <div @click="changeFilterMode" class="filter-container my-3 m-r-3 py-10 bg-slate-300 rounded-r hover:bg-slate-400 cursor-pointer">
      <div class="filter flex justify-center items-center">
        <span class="material-symbols-outlined">arrow_forward_ios</span>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="m-3 p-5 bg-slate-300 rounded">
      <div class="flex justify-between items-center pb-2">
        <h1 class="text-2xl text-left">Filters</h1>
        <span @click="changeFilterMode" class="material-symbols-outlined cursor-pointer">arrow_back_ios</span>
      </div>
      <div>
        <h6 class="text-left my-3">General</h6>
        <button @click="addFilterNewItem" class="block w-3/4 bg-primary hover:bg-tertiary hover:text-primary text-secondary font-bold py-2 px-4 my-2 mx-auto rounded truncate">New Items</button>
        <button @click="addFilterPopular" class="block w-3/4 bg-primary hover:bg-tertiary hover:text-primary text-secondary font-bold py-2 px-4 my-2 mx-auto rounded truncate">Popular</button>
      </div>
      <div>
        <h6 class="text-left my-3">Tags</h6>
        <Tag text="Limited Edition" />
        <Tag text="Collectible" />
        <Tag text="Card Game" />
        <Tag text="Equipment" />
        <Tag text="New" />
        <Tag text="Used" />
      </div>
    </div>
  </div>
</template>

<script>
// import store from '@/store';

import Tag from '@/components/Tag.vue'

export default {
  name: 'Filters',
  components: {
    Tag
  }, 
  props: {
    
  },
  data() {
      return {
          hideFilters: false
      }
  },
  methods: {
    changeFilterMode() {
      this.hideFilters = !this.hideFilters;
      this.$emit('changeFilterMode', this.hideFilters)
    },
    addFilterNewItem() {
      // store.dispatch('search/searchItems', '')
    },
    addFilterPopular() {

    }
  }
}
</script>
<style scoped>
  .filter-container {
    max-width: 64px;
  }
  .filter {
    display: block;
    width: 52px;
  }

  .filter span {
    display: block;
    height: 100%;
  }
</style>
