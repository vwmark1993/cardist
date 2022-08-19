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
  },
  async addCartItem({ commit }, itemId) {
    let cartItemResponse = await CartItemDataService.create(itemId, store.state.cart.cartId);
    let cartItem = cartItemResponse.data;

    let itemResponse = await ItemDataService.get(itemId)
    let itemDetails = itemResponse.data;
    this.itemDetails = itemDetails;

    let newCartItem = {
      id: cartItem.id,
      itemId: cartItem.item_id,
      name: itemDetails.name,
      thumbnail: itemDetails.images.length > 0 ? itemDetails.images[0] : null,
      quantity: 1,
      price: itemDetails.price,
      basePrice: itemDetails.basePrice
    }

    if (cartItemResponse.status == 200) {
      commit('insertCartItem', newCartItem)
      alert("added to cart")
    } else if (cartItemResponse.status == 201) {
      alert("item already exists in cart")
    } else {
      alert("error")
    }
  },
  deleteCartItem({ commit }, index) {
    commit('removeCartItemByIndex', index)
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
  insertCartItem(state, cartItem) {
    state.cartItems.push(cartItem);
  },
  removeCartItemByIndex(state, index) {
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