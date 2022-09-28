import CartDataService from '@/services/CartDataService.js'
import CartItemDataService from '@/services/CartItemDataService.js'
import ItemDataService from '@/services/ItemDataService.js'
import store from '..'

const state = () => (
  localStorage.getItem('vuex') ? JSON.parse(localStorage.getItem('vuex')).cart
  : {
  cartId: null,
  cartItems: [],
  orderConfirmationFlag: false,
  cartMessage: null,
  cartMessageStatus: null,
  cartItemDeleted: false
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

          let newCartItem = {
            id: id,
            itemId: itemId,
            name: itemDetails.name,
            thumbnail: itemDetails.images[0],
            quantity: quantity,
            price: itemDetails.price * quantity,
            basePrice: itemDetails.price,
            sellerId: itemDetails.seller_id
          }

          commit('insertCartItem', newCartItem)
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  async addCartItem({ commit }, itemId) {
    try {
      let data = {
        itemId: itemId,
        cartId: store.state.cart.cartId
      }
  
      let cartItemResponse = await CartItemDataService.create(data);
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
        basePrice: itemDetails.price,
        sellerId: itemDetails.seller_id
      }
  
      if (cartItemResponse.status == 200) {
        commit('insertCartItem', newCartItem)
        commit('setCartMessage', 'Added to cart: ' + itemDetails.name);
        commit('setCartMessageStatus', 'success');

        setTimeout(() => {
          commit('removeCartMessage');
          commit('removeCartMessageStatus');
        }, 3000)
      } else if (cartItemResponse.status == 201) {
        console.log(cartItemResponse)
        commit('setCartMessage', 'Cart already contains: ' + itemDetails.name);
        commit('setCartMessageStatus', 'failure');

        setTimeout(() => {
          commit('removeCartMessage');
          commit('removeCartMessageStatus');
        }, 3000)
      }
    } catch (e) {
      commit('setCartMessage', e.message);
      commit('setCartMessageStatus', 'failure');

      setTimeout(() => {
        commit('removeCartMessage');
        commit('removeCartMessageStatus');
      }, 3000)
    }
  },
  async deleteCartItem({ commit }, { index, id }) {
    try {
      await CartItemDataService.delete(id);

      commit('removeCartItemByIndex', index);
      commit('setCartItemDeleted');

      setTimeout(() => {
        commit('unsetCartItemDeleted');
      }, 100);
    } catch (e) {
      console.log(e)
    }
  },
  async updateCartItem({ commit }, { index, quantity }) {
    try {
      let cartItem = store.state.cart.cartItems[index];

      let data = {
        quantity: quantity
      }

      await CartItemDataService.update(cartItem.id, data);

      let updatedCartItem = {
        id: cartItem.id,
        itemId: cartItem.itemId,
        name: cartItem.name,
        thumbnail: cartItem.thumbnail,
        quantity: quantity,
        price: cartItem.quantity != 0 ? cartItem.price / cartItem.quantity * quantity : cartItem.basePrice,
        basePrice: cartItem.basePrice,
        sellerId: cartItem.sellerId
      }

      commit('updateCartItemByIndex', {
        index: index, 
        cartItem: updatedCartItem
      })
    } catch (e) {
      console.log(e)
    }
  },
  emptyCart({ commit }) {
    commit('emptyCart');
  },
  setOrderConfirmationFlag({ commit }, flag) {
    commit('setOrderConfirmationFlag', flag);
  }
}

// mutations
const mutations = {
  setCart(state, cartId) {
    state.cartId = cartId
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
  setCartItemDeleted(state) {
    state.cartItemDeleted = true;
  },
  unsetCartItemDeleted(state) {
    state.cartItemDeleted = false;
  },
  updateCartItemByIndex(state, { index, cartItem }) {
    state.cartItems[index] = cartItem;
  },
  setOrderConfirmationFlag(state, flag) {
    state.orderConfirmationFlag = flag;
  },
  setCartMessage(state, message) {
    state.cartMessage = message;
  },
  removeCartMessage(state) {
    state.cartMessage = null;
  },
  setCartMessageStatus(state, status) {
    state.cartMessageStatus = status;
  },
  removeCartMessageStatus(state) {
    state.cartMessageStatus = null;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}