import CartDataService from '@/services/CartDataService.js'
import CartItemDataService from '@/services/CartItemDataService.js'
import ItemDataService from '@/services/ItemDataService.js'
import store from '..'

const state = () => (
  localStorage.getItem('vuex') ? JSON.parse(localStorage.getItem('vuex')).cart
  : {
  cartId: null,
  cartItems: []
})

// getters
const getters = {

}

// actions
const actions = {
  async getCart({ commit }) {
    if (!store.state.user.authenticated || !store.state.user.currentUser.id || store.state.cart.cartItems.length != 0) {
      return
    } else {
      try {
        let cartResponse = await CartDataService.getUserCart(store.state.user.currentUser.id);
        let cart = cartResponse.data[0];
        let cartId = cart.id; 

        commit('setCart', cartId);

        let cartItemResponse = await CartItemDataService.getCartItems(cartId);

        cartItemResponse.data.forEach(async cartItem => {
          let id = cartItem.id
          let itemId = cartItem.item_id
          let quantity = cartItem.quantity;

          let itemResponse = await ItemDataService.get(cartItem.item_id);
          let itemDetails = itemResponse.data;

          commit('setCartItem', {
            id: id,
            itemId: itemId,
            name: itemDetails.name,
            thumbnail: itemDetails.images[0],
            quantity: quantity,
            price: itemDetails.price * quantity,
            basePrice: itemDetails.price
          })
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}

// mutations
const mutations = {
  setCart(state, cartId) {
    state.cartId = cartId
  },
  setCartItem(state, cartItem) {
    state.cartItems.push(cartItem)
  },
  emptyCart(state) {
    state.cartItems = []
  },
  deleteCartItem(state, index) {
    state.cartItems.splice(index, 1);
  },
  updateCartItem(state, id, quantity) {
    let index = state.cartItems.findIndex(item => item.id === id);
    let cartItem = state.cartItems[index];
      
    let newCartItem = {
      id: cartItem.id,
      itemId: cartItem.itemId,
      name: cartItem.name,
      thumbnail: cartItem.thumbnail,
      quantity: quantity,
      price: cartItem.quantity != 0 ? cartItem.price / cartItem.quantity * quantity : cartItem.basePrice,
      basePrice: cartItem.basePrice
    }

    state.cartItems[index] = newCartItem;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}