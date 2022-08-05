<template>
  <div class="grid grid-flow-col">
    <div class="col-span-2">
      <Filters />
    </div>
    <div class="col-span-10">
      <Banner />
      <div class="p-3 m-3">
        <div class="flex items-center justify-end border-b pb-2">
          <label for="sort" class="text-sm font-medium text-slate-900 dark:text-slate-400">Sort:&nbsp;&nbsp;</label>
          <select id="sort" class="p-1 bg-slate-100 border border-slate-300 text-slate-800 text-sm rounded focus:ring-slate-500 focus:border-slate-500">
            <option Selected value="date">Date Added</option>
            <option value="priceDesc">Price: Low to High</option>
            <option value="priceAsc">Price: High to Low</option>
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
import Filters from '@/components/Filters.vue'
import Banner from '@/components/Banner.vue'
import Thumbnail from '@/components/Thumbnail.vue'

import ItemDataService from '@/services/ItemDataService.js'

export default {
  name: 'Landing',
  components: {
    Filters,
    Banner,
    Thumbnail
  }, 
  props: {
    
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
    searchItems() {
      ItemDataService.getAll()
      .then(response => {
        this.items = response.data;
        console.log(response.data)
      }).catch(e => {
        console.log(e)
      })
    }
  },
  mounted() {
    this.searchItems();
  }
}
</script>
<style scoped>

</style>
