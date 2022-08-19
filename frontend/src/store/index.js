import { createStore, createLogger } from 'vuex'
import user from './modules/user'
import cart from './modules/cart'

import createPersistedState from "vuex-persistedstate";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    user,
    cart
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
  plugins: debug ? [
    createLogger(),
    createPersistedState({
      paths: ['user', 'cart'],
      storage: window.localStorage
    })
  ] : [
    createPersistedState({
      paths: ['user', 'cart'],
      storage: window.localStorage
    })
  ]
})