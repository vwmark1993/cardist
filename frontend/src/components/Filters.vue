<template>
  <div v-if="filterMode" class="m-3 p-5 bg-slate-300 rounded">
    <div class="flex justify-between items-center pb-2">
      <h1 class="text-2xl text-left">Filters</h1>
      <span class="material-symbols-outlined">arrow_back_ios</span>
    </div>
    <div>
      <h6 class="text-left my-3">General</h6>
      <button class="block w-3/4 bg-primary hover:bg-secondary text-slate-800 font-bold py-2 px-4 my-2 mx-auto rounded truncate">New Items</button>
      <button class="block w-3/4 bg-primary hover:bg-secondary text-slate-800 font-bold py-2 px-4 my-2 mx-auto rounded truncate">Popular</button>
    </div>
    <div>
      <h6 class="text-left my-3">Categories</h6>
      <Category text="Limited Edition" />
      <Category text="Collectible" />
      <Category text="Card Game" />
      <Category text="Equipment" />
      <Category text="New" />
      <Category text="Used" />
    </div>
  </div>
</template>

<script>
import Category from '@/components/Category.vue'

export default {
  name: 'Filters',
  components: {
    Category
  }, 
  props: {
    
  },
  data() {
      return {
          filterMode: true
      }
  }
}
</script>
<style scoped>

</style>
