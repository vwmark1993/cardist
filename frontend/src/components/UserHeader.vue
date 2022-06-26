<template>
  <div class="p-3 flex justify-between">
    <img
      src="../assets/images/cardist-logo.png"
      width="50"
      height="50"
      class="inline"
    />
    <div class="w-full mx-8 my-auto">
      <div class="relative">
        <input type="search" name="search" class="w-full min-w-300px py-3 text-sm text-white bg-slate-300 rounded-md pl-3 focus:outline-none focus:bg-slate-200 focus:text-slate-900" placeholder="Search..." maxlength=50  autocomplete="off">
        <span class="absolute inset-y-0 right-0 flex items-stretch">
          <button class="p-1 mr-2 focus:outline-none focus:shadow-outline text-secondary hover:text-slate-700">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </span>
      </div>
    </div>
    <div class="flex flex-row">
      <span class="material-symbols-outlined text-4xl my-auto mr-3">settings</span>
      <span class="material-symbols-outlined text-4xl my-auto mr-6">account_circle</span>
      <button class="bg-primary hover:bg-secondary text-slate-800 font-bold py-2 px-4 mr-3 rounded inline-flex items-center">
        <span class="material-symbols-outlined text-3xl mr-1">paid</span>
        <span>SELL</span>
      </button>
      <button class="bg-primary hover:bg-secondary text-slate-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <span class="material-symbols-outlined text-3xl mr-1">shopping_cart</span>
        <span>CART</span>
      </button>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'UserHeader',
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
