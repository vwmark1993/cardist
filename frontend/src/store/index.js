import { createStore, createLogger } from 'vuex'
import user from './modules/user'
// import products from './modules/products'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    user
    // products
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})