import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
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
    component: () => import('../views/ItemDetails.vue')
  },
  {
    path: '/cart',
    name: 'shopping-cart',
    component: () => import('../views/ShoppingCart.vue')
  },
  {
    path: '/profile',
    name: 'user-profile',
    component: () => import('../views/UserProfile.vue')
  },
  {
    path: '/order/success',
    name: 'order-success',
    component: () => import('../views/OrderConfirmation.vue')
  },
  {
    path: '/sell',
    name: 'item-listings',
    component: () => import('../views/ItemListings.vue')
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
