/**
 * Statement of Authorship:
 * 
 * I, Vincent Mark, student number 000803494, certify that this material is my original work.
 * No other person's work has been used without due acknowledgement and I have not made my work available to anyone else.
 */

/**
 * This is the entry point for front-end app.
 * The front-end app uses Vue 3, Vue Router and Vuex.
 * Built using Vue 3 CLI template structure.
 * 
 * Structure:
 * Views - main webpages.
 * Components - smaller webpage components used/re-used by views (e.g. navigation bar, modals, error message notifications, etc.).
 * Store - stores data to be used across multiple views/components.
 * Services - handles backend API calls.
 * Router - handles navigation between webpages.
 * Assets - global styles and placeholder images.
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFinalModal from 'vue-final-modal'
import './assets/styles/index.css'

createApp(App).use(router).use(store).use(VueFinalModal()).mount('#app')
