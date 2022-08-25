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
        <button @click="toggleNewItemFilter" :class="{ 'bg-tertiary' : newItemFilter, 'text-primary' : newItemFilter, 'bg-primary' : !newItemFilter, 'text-secondary' : !newItemFilter }" class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate">New Items</button>
        <button @click="togglePopularItemFilter" :class="{ 'bg-tertiary' : popularItemFilter, 'text-primary' : popularItemFilter, 'bg-primary' : !popularItemFilter, 'text-secondary' : !popularItemFilter }" class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate">Popular</button>
      </div>
      <div>
        <h6 class="text-left my-3">Tags</h6>
        <div v-for="tag in tags" :key="tag.id">
          <button 
            @click="toggleTagFilter(tag.id)" 
            class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate"
            :class="{ 
              'bg-tertiary': selectedTags.includes(tag.id), 
              'text-primary' : selectedTags.includes(tag.id),
              'bg-primary': !selectedTags.includes(tag.id), 
              'text-secondary' : !selectedTags.includes(tag.id)
            }" 
          >
            {{ tag.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

import TagDataService from '@/services/TagDataService.js'


export default {
  name: 'Filters',
  props: {
    
  },
  data() {
      return {
          hideFilters: false,
          tags: [],
          selectedTags: []
      }
  },
  computed: {
    newItemFilter() {
      if (store.state.search.filters) {
        return store.state.search.filters.includes('new');
      } else {
        return false;
      }
    },
    popularItemFilter() {
      if (store.state.search.filters) {
        return store.state.search.filters.includes('popular');
      } else {
        return false;
      }
    }
  },
  methods: {
    changeFilterMode() {
      this.hideFilters = !this.hideFilters;
      this.$emit('changeFilterMode', this.hideFilters)
    },
    toggleNewItemFilter() {
      if (!store.state.search.filters.includes('new')) {
        store.dispatch('search/addFilter', 'new')
      } else {
        store.dispatch('search/removeFilter', 'new')
      }
    },
    togglePopularItemFilter() {
      if (!store.state.search.filters.includes('popular')) {
        store.dispatch('search/addFilter', 'popular')
      } else {
        store.dispatch('search/removeFilter', 'popular')
      }
    },
    toggleTagFilter(id) {
      if (!this.selectedTags.includes(id)) {
        this.selectedTags.push(id)
      } else {
        let index = this.selectedTags.findIndex(tagItem => tagItem === id);
        this.selectedTags.splice(index, 1);
      }
    }
  },
  async mounted() {
    let response = await TagDataService.getAll();
    let tagResponse = response.data;
    this.tags = tagResponse;
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
