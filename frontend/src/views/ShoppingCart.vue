<template>
  <div>
    <UserHeader />
    <div class="grid grid-cols-12 grid-flow-col justify-between m-3">
      <div class="col-span-9 text-left">
        <h1 class="text-4xl font-bold text-slate-700 mb-6">Shopping Cart</h1>
        <ShoppingCartItem 
          v-for="(cartItem, index) in cartItems" 
          :key="cartItem.id" 
          :index="index" 
          :id="cartItem.id" 
          :name="cartItem.name" 
          :thumbnail="cartItem.thumbnail" 
          :quantityProp="cartItem.quantity" 
          :price="cartItem.price"
          @delete="(index) => deleteCartItem(index)"
          @update="(index, quantity) => updateCartItem(index, quantity)"
          />
      </div>
      <div class="col-span-3 text-right">
        <button class="cart-button bg-slate-500 hover:bg-slate-700 text-white font-bold text-lg py-3 px-7 rounded">Checkout</button>
        <div class="border rounded bg-slate-100 border-slate-500 p-3 mt-3 ml-6 flex">
          <div class="w-full px-4">
            <div v-for="cartItem in cartItems" :key="cartItem.id">
              <div v-if="cartItem.quantity > 0" class="flex justify-between text-sm mb-1">
                <span class="truncate">{{ cartItem.name }} x {{ cartItem.quantity }}</span>
                <span>{{ cartItem.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
              </div>
            </div>
            <div class="flex flex-wrap justify-between items-center border-t border-slate-400 mt-4 pt-1">
              <span class="text-lg font-bold truncate">SUBTOTAL</span>
              <span>{{ subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartDataService from '@/services/CartDataService.js'
import CartItemDataService from '@/services/CartItemDataService.js'
import ItemDataService from '@/services/ItemDataService.js'

import UserHeader from '@/components/UserHeader.vue'
import ShoppingCartItem from '@/components/ShoppingCartItem.vue'

export default {
  name: 'ShoppingCart',
  components: {
    UserHeader,
    ShoppingCartItem
  },
  data() {
      return {
          userId: '0afa8ff9-61b0-4792-9b75-1edb752875a4',
          cartId: null,
          cartItems: []
      }
  },
  computed: {
    subtotal() {
      let subtotal = 0;

      this.cartItems.forEach(item => {
        subtotal += item.price
      })

      return subtotal;
    }
  },
  methods: {
    async getCart() {
      let response = await CartDataService.getUserCart(this.userId);
      this.cart = response.data[0];
      this.cartId = this.cart.id;  
    },
    async getCartItems() {
      let response = await CartItemDataService.getCartItems(this.cartId);

      response.data.forEach(async cartItem => {
        let id = cartItem.id
        let quantity = cartItem.quantity;
        let itemResponse = await ItemDataService.get(cartItem.item_id);
        let itemDetails = itemResponse.data;

        this.cartItems.push({
          id: id,
          name: itemDetails.name,
          thumbnail: itemDetails.images[0],
          quantity: quantity,
          price: itemDetails.price * quantity,
          basePrice: itemDetails.price
        })
      })
    },
    deleteCartItem(index) {
      this.cartItems.splice(index, 1);
    },
    updateCartItem(index, quantity) {
      let cartItem = this.cartItems[index]
      
      let newCartItem = {
        id: cartItem.id,
        name: cartItem.name,
        thumbnail: cartItem.thumbnail,
        quantity: quantity,
        price: cartItem.quantity != 0 ? cartItem.price / cartItem.quantity * quantity : cartItem.basePrice,
        basePrice: cartItem.basePrice
      }

      this.cartItems[index] = newCartItem;
    }
  },
  async mounted() {
    await this.getCart();
    await this.getCartItems();
  }
}
</script>
<style scoped>
  .checkout-button {
    height: 46px;
  }
</style>
