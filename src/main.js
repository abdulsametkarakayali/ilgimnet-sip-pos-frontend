import Vue from 'vue'
import VueToast from 'vue-toast-notification'
import VueLazyload from 'vue-lazyload'
import VueCurrencyFilter from 'vue-currency-filter'
import VueSweetalert2 from 'vue-sweetalert2'
import VueCryptojs from 'vue-cryptojs'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
import VueHtmlToPaper from 'vue-html-to-paper'
import '@/globalComponents.js'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-toast-notification/dist/theme-default.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-search-select/dist/VueSearchSelect.css'


const options = {
  styles: [
    'https://stackpath.bootstrapcdn.com/bootstrawp/4.5.2/css/bootstrap.min.css',
    '/ilgimnet-sip-pos/src/assets/css/style.css'
  ],
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title
}
Vue.use(require('vue-moment'))
Vue.use(BootstrapVue)
Vue.use(VueCurrencyFilter, {
  symbol: '₺',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})
Vue.use(VueCryptojs)
Vue.use(VueSweetalert2)
Vue.use(VueLazyload)
Vue.use(VueToast, {
  position: 'bottom-left'
})
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.directive('focus', {
  inserted: (el) => {
    el.focus()
  }
})
Vue.use(VueHtmlToPaper, options)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
