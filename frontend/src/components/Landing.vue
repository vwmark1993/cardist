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
          <Thumbnail id=0001 name="Red Bicycle Playing Cards" price=7.49 image="https://m.media-amazon.com/images/I/519GHhMVNrL.jpg" />
          <Thumbnail id=0002 name="Theory11 Sentinels Playing Cards" price=12.99 image="https://i.ytimg.com/vi/fcP8rqxvx0E/maxresdefault.jpg" />
          <Thumbnail id=0003 name="Virtuoso SS15 Playing Cards" price=22.05 image="https://media.karousell.com/media/photos/products/2021/7/2/virtuoso_ss15_playing_cards_1625228402_cfec7268_progressive.jpg" />
          <Thumbnail id=0004 name="Blue Bicycle Dragon Back Playing Cards" price=9.03 image="https://i5.walmartimages.com/asr/72840ef4-2a97-4490-8dd6-2a107ea318df_1.07271be9048c4f363618fd47ca3ebae1.jpeg" />
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
