import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

// Used to make sure API calls for order confirmations aren't called multiple times.
function resetOrderConfirmationFlag() {
  if (store.state.cart.orderConfirmationFlag) {
    store.dispatch('cart/emptyCart');
    store.dispatch('cart/setOrderConfirmationFlag', false);
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    beforeEnter: [resetOrderConfirmationFlag]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/item/:itemId',
    name: 'item-details',
    component: () => import('../views/ItemDetails.vue'),
    beforeEnter: [resetOrderConfirmationFlag]
  },
  {
    path: '/cart',
    name: 'shopping-cart',
    component: () => import('../views/ShoppingCart.vue'),
    beforeEnter: [resetOrderConfirmationFlag]
  },
  {
    path: '/profile',
    name: 'user-profile',
    component: () => import('../views/UserProfile.vue'),
    beforeEnter: [resetOrderConfirmationFlag]
  },
  {
    path: '/order/success',
    name: 'order-success',
    component: () => import('../views/OrderConfirmation.vue')
  },
  {
    path: '/sell',
    name: 'item-listings',
    component: () => import('../views/ItemListings.vue'),
    beforeEnter: [resetOrderConfirmationFlag]
  },
  {
    path: '/admin',
    name: 'admin-portal',
    component: () => import('../views/AdminPortal.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
