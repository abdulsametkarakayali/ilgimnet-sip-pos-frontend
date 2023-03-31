import { createStore } from 'vuex'
import product from './modules/product.js'
import category from './modules/category.js'
import moneycase from './modules/moneycase'
import cart from './modules/cart.js'
import history from './modules/history.js'
import user from './modules/user.js'
import auth from './modules/auth.js'
import globalStore from './globalStore.js'

export default createStore({
  ...globalStore,
  modules: {
    product,
    category,
    moneycase,
    cart,
    history,
    user,
    auth
  }
})