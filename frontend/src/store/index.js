import { createStore, createLogger } from 'vuex'
import user from './modules/user'
import createPersistedState from "vuex-persistedstate";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    user
    // products
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
  plugins: debug ? [
    createLogger(),
    createPersistedState({
      paths: ['user'],
      storage: window.localStorage
    })
  ] : [
    createPersistedState({
      paths: ['user'],
      storage: window.localStorage
    })
  ]
})