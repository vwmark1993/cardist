<template>
  <div class="shopping-cart-item-container border rounded border-slate-400 p-3 m-3 flex">
    <div class="flex items-center mr-3">
      <img :src="thumbnail" class="shopping-cart-item-image border rounded m-auto" />
    </div>
    <div class="w-full truncate relative">
      <div class="shopping-cart-item-header flex justify-between items-center border-b border-slate-400 mb-3">
        <h6 @click="goToItemDetails" class="text-xl pb-2 truncate hover:text-slate-400 hover:cursor-pointer">{{ name }}</h6>
        <button @click="removeItem" class="shopping-cart-item-remove-button bg-slate-500 hover:bg-slate-700 text-white px-3 rounded">Remove</button>
      </div>
      <span class="inline-block mb-3 text-xl">{{ price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
      <div class="bottom-0 mb-1 absolute">
        <div class="flex flex-row items-center">
          <span class="text-sm">Quantity:&nbsp;&nbsp;</span>
          <button @click="decrement" data-action="decrement" class="shopping-cart-item-control-button bg-slate-300 text-slate-600 hover:text-slate-700 hover:bg-slate-400 rounded-l cursor-pointer outline-none">
            <span class="m-auto text-xl font-thin">−</span>
          </button>
          <input type="number" class="shopping-cart-item-input-field outline-none focus:outline-none text-center bg-slate-300 font-semibold text-md hover:text-slate-900 focus:text-slate-900 md:text-basecursor-default text-gray-700 outline-none" name="custom-input-number" v-model="quantity" />
          <button @click="increment"  data-action="increment" class="shopping-cart-item-control-button bg-slate-300 text-gray-600 hover:text-slate-700 hover:bg-slate-400 rounded-r cursor-pointer">
            <span class="m-auto text-xl font-thin">+</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'ShoppingCartItem',
  props: {
    id: String,
    itemId: String,
    name: String,
    thumbnail: String,
    quantityProp: Number,
    price: Number,
    index: Number
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
    goToItemDetails() {
      this.$router.push({ name: 'item-details', params: { itemId: this.itemId } })
    },
    removeItem() {
      store.dispatch('cart/deleteCartItem', {
        index: this.index,
        id: this.id
      })
      this.$emit('cartItemUpdated', 'Removed: ' + this.name)
    },
    increment() {
      this.quantity++

      if (this.quantity >= 0) {
        store.dispatch('cart/updateCartItem', {
          index: this.index, 
          quantity: this.quantity
        })
        this.$emit('cartItemUpdated', 'Increased quantity: ' + this.name)
      }
    },
    decrement() {
      this.quantity--

      if (this.quantity >= 0) {
        store.dispatch('cart/updateCartItem', {
          index: this.index, 
          quantity: this.quantity
        })
        this.$emit('cartItemUpdated', 'Decreased quantity: ' + this.name)
      }
    }
  },
  mounted() {
    this.quantity = this.quantityProp;
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

  .shopping-cart-item-container {
    min-width: 500px;
    min-height: 166px;
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
