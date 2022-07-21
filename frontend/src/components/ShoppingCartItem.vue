<template>
  <div class="border rounded border-slate-400 p-3 m-3 flex">
    <img src="https://i.etsystatic.com/10718640/r/il/a0741d/1894691385/il_570xN.1894691385_otg8.jpg" class="shopping-cart-item-image" />
    <div class="w-full relative">
      <div class="shopping-cart-item-header flex justify-between items-center border-b border-slate-400 mb-3">
        <h6 class="text-xl pb-2">Playing Cards</h6>
        <button class="shopping-cart-item-remove-button bg-slate-500 hover:bg-slate-700 text-white px-3 rounded">Remove</button>
      </div>
      <span class="text-xl mb-2">$35.00</span>
      <div class="absolute bottom-0 mb-1">
        <div class="flex flex-row items-center">
          <span class="text-sm">Quantity:&nbsp;&nbsp;</span>
          <button @click="quantity--" data-action="decrement" class="shopping-cart-item-control-button bg-slate-300 text-slate-600 hover:text-slate-700 hover:bg-slate-400 rounded-l cursor-pointer outline-none">
            <span class="m-auto text-xl font-thin">−</span>
          </button>
          <input type="number" class="shopping-cart-item-input-field outline-none focus:outline-none text-center bg-slate-300 font-semibold text-md hover:text-slate-900 focus:text-slate-900 md:text-basecursor-default text-gray-700 outline-none" name="custom-input-number" v-model="quantity" />
          <button @click="quantity++"  data-action="increment" class="shopping-cart-item-control-button bg-slate-300 text-gray-600 hover:text-slate-700 hover:bg-slate-400 rounded-r cursor-pointer">
            <span class="m-auto text-xl font-thin">+</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCartItem',
  props: {
    
  },
  data() {
    return {
      quantity: 1
    }
  },
  watch: {
    quantity(newValue) {
      if (newValue < 0) {
        this.quantity = 0
      }
    }
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

  .shopping-cart-item-remove-button {
    height: 36px;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .custom-number-input input:focus {
    outline: none !important;
  }

  .custom-number-input button:focus {
    outline: none !important;
  }

  .shopping-cart-item-input-field {
    height: 30px;
    width: 40px;
  }

  .shopping-cart-item-control-button {
    height: 30px;
    width: 36px;
  }
</style>
