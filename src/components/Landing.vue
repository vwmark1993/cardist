<template>
  <div class="grid grid-rows-12 grid-flow-col">
    <div class="col-span-3">
      <div class="m-3 p-3 bg-slate-300 rounded">
        <h1 class="pb-2 text-2xl text-left">Filters</h1>
        <h6 class="text-left">General</h6>
        <button class="block w-1/2 bg-primary hover:bg-secondary text-slate-800 font-bold py-2 px-4 my-2 mx-auto rounded">New Items</button>
        <button class="block w-1/2 bg-primary hover:bg-secondary text-slate-800 font-bold py-2 px-4 my-2 mx-auto rounded">Popular</button>
      </div>
    </div>
    <div class="col-span-9">
      <Banner />
      <div class="p-3 m-3">
        <h1 class="font-bold text-5xl text-left">Home (#8bc7b2, #6ca893)</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'

export default {
  name: 'UserHeader',
  components: {
    Banner
  }, 
  props: {
    
  }
}
</script>
<style scoped>
  /* clears the 'X' from Internet Explorer */
  input[type=search]::-ms-clear {  display: none; width : 0; height: 0; }
  input[type=search]::-ms-reveal {  display: none; width : 0; height: 0; }

  /* clears the 'X' from Chrome */
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration { display: none; }

  input[type="search"] {
    font-size:18px;
}

</style>
