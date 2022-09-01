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
        <h1 class="text-2xl text-left font-semibold">Filters</h1>
        <span @click="changeFilterMode" class="material-symbols-outlined cursor-pointer">arrow_back_ios</span>
      </div>
      <div>
        <h6 class="text-left my-3 ml-3 font-semibold">General</h6>
        <button @click="toggleNewItemFilter" :class="{ 'bg-tertiary' : newItemFilter, 'text-primary' : newItemFilter, 'bg-primary' : !newItemFilter, 'text-secondary' : !newItemFilter }" class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate">New Items</button>
        <button @click="togglePopularItemFilter" :class="{ 'bg-tertiary' : popularItemFilter, 'text-primary' : popularItemFilter, 'bg-primary' : !popularItemFilter, 'text-secondary' : !popularItemFilter }" class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate">Popular</button>
      </div>
      <div>
        <h6 class="text-left my-3 ml-3 font-semibold">Tags</h6>
        <div v-for="tag in tags" :key="tag.id">
          <button 
            @click="toggleTagFilter(tag.name)" 
            class="block w-3/4 hover:bg-tertiary hover:text-primary font-bold py-2 px-4 my-2 mx-auto rounded truncate"
            :class="{ 
              'bg-tertiary': selectedTags.includes(tag.name), 
              'text-primary' : selectedTags.includes(tag.name),
              'bg-primary': !selectedTags.includes(tag.name), 
              'text-secondary' : !selectedTags.includes(tag.name)
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
  watch: {
    tagFilters() {
      if (this.tagFilters.length === 0) {
        this.selectedTags = [];
      }
    }
  }, 
  computed: {
    newItemFilter() {
      if (store.state.search.generalFilters) {
        return store.state.search.generalFilters.includes('new');
      } else {
        return false;
      }
    },
    popularItemFilter() {
      if (store.state.search.generalFilters) {
        return store.state.search.generalFilters.includes('popular');
      } else {
        return false;
      }
    },
    tagFilters() {
      return store.state.search.tagFilters;
    }
  },
  methods: {
    changeFilterMode() {
      this.hideFilters = !this.hideFilters;
      this.$emit('changeFilterMode', this.hideFilters)
    },
    toggleNewItemFilter() {
      if (!store.state.search.generalFilters.includes('new')) {
        store.dispatch('search/addGeneralFilter', 'new')
      } else {
        store.dispatch('search/removeGeneralFilter', 'new')
      }
    },
    togglePopularItemFilter() {
      if (!store.state.search.generalFilters.includes('popular')) {
        store.dispatch('search/addGeneralFilter', 'popular')
      } else {
        store.dispatch('search/removeGeneralFilter', 'popular')
      }
    },
    toggleTagFilter(name) {
      if (!this.selectedTags.includes(name)) {
        this.selectedTags.push(name)

        store.dispatch('search/addTagFilter', name)
      } else {
        let index = this.selectedTags.findIndex(tagItem => tagItem === name);
        this.selectedTags.splice(index, 1);

        store.dispatch('search/removeTagFilter', name)
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
