import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFinalModal from 'vue-final-modal'
import './assets/styles/index.css'

createApp(App).use(router).use(store).use(VueFinalModal()).mount('#app')
