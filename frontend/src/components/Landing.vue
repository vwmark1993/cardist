<template>
  <div class="grid grid-flow-col">
    <div :class="{ 'col-span-1': hideFilters, 'col-span-2': !hideFilters }">
      <Filters @changeFilterMode="(hideFilters) => changeFilterMode(hideFilters)" />
    </div>
    <div :class="{ 'col-span-12': hideFilters, 'col-span-10': !hideFilters }">
      <Banner />
      <div class="p-3 m-3">
        <div class="flex items-center justify-end border-b pb-2">
          <label for="sort" class="text-sm font-medium text-slate-900 dark:text-slate-400">Sort:&nbsp;&nbsp;</label>
          <select v-model="sortMode" id="sort" class="p-1 bg-slate-100 border border-slate-300 text-slate-800 text-sm rounded focus:border-slate-500">
            <option selected value="dateAdded">Date Added</option>
            <option value="priceDesc">Price: Low to High</option>
            <option value="priceAsc">Price: High to Low</option>
            <option selected value="nameAsc">Name: A-Z</option>
            <option selected value="nameDesc">Name: Z-A</option>
          </select>
        </div>
        <div>
          <div v-if="items.length > 0" class="flex flex-wrap p-3">
            <Thumbnail v-for="item in items" :key="item.id" :id="item.id" :name="item.name" :price="item.price" :image="item.images[0]" />
          </div>
          <div v-else class="mt-4">
            <span class="text-slate-600 text-xl">No Items Found</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

import Filters from '@/components/Filters.vue'
import Banner from '@/components/Banner.vue'
import Thumbnail from '@/components/Thumbnail.vue'

export default {
  name: 'Landing',
  components: {
    Filters,
    Banner,
    Thumbnail
  }, 
  data() {
    return {
      sortMode: 'dateAdded',
      hideFilters: false
    }
  },
  computed: {
    items() {
      let items = store.state.search.queriedItems.slice();
      let generalFilters = store.state.search.generalFilters;
      let tagFilters = store.state.search.tagFilters;

      // Apply general filters, which are fixed.
      if (generalFilters.includes('new')) {
        let last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);

        items = items.filter(item => item.created_on >= last30Days)
      }
      if (generalFilters.includes('popular')) {
        items = items.filter(item => item.number_sold >= 20)
      }

      // Apply sort order.
      if (this.sortMode === 'dateAdded') {
        items.sort((a,b) => (a.created_on > b.created_on) ? 1 : ((b.created_on > a.created_on) ? -1 : 0));
      }
      if (this.sortMode === 'priceAsc') {
        items.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0));
      }
      if (this.sortMode === 'priceDesc') {
        items.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
      }
      if (this.sortMode === 'nameAsc') {
        items.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      }
      if (this.sortMode === 'nameDesc') {
        items.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
      }

      // Apply tag filters.
      return items.filter(item => tagFilters.every(tag => item.tags.includes(tag)));
    }
  },
  methods: {
    changeFilterMode(hideFilters) {
      this.hideFilters = hideFilters;
    }
  },
  async mounted() {
    if (this.items.length === 0 && store.state.search.searchString === '') {
      store.dispatch('search/searchItems', '');
    }
  }
}
</script>
<style scoped>
  
</style>
