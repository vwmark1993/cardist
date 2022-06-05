<template>
  <div class="grid grid-rows-12 grid-flow-col">
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
        <div class="flex flex-wrap p-3">
          <Thumbnail name="Red Bicycle Playing Cards" />
          <Thumbnail name="Theory11 Sentinels Playing Cards" />
          <Thumbnail name="Virtuoso SS15 Playing Cards" />
          <Thumbnail name="Blue Bicycle Dragonbacks Playing Cards" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  props: {
    
  }
}
</script>
<style scoped>

</style>
