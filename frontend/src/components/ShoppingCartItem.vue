<template>
  <div class="border rounded border-slate-400 rounded p-3 m-3 flex">
    <img src="https://i.etsystatic.com/10718640/r/il/a0741d/1894691385/il_570xN.1894691385_otg8.jpg" class="shopping-cart-item-image" />
    <div class="shopping-cart-item-header flex justify-between items-center w-full border-b border-slate-400">
      <h6 class="text-xl pb-2">Playing Cards</h6>
      <button class="shopping-cart-item-button bg-slate-500 hover:bg-slate-700 text-white px-3 rounded">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCartItem',
  props: {
    
  },
  methods: {

  }
}
</script>
<style scoped>
  .shopping-cart-item-image {
    max-width: 150px;
  }

  .shopping-cart-item-header {
    height: 52px;
  }

  .shopping-cart-item-button {
    height: 36px;
  }
</style>
