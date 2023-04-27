import { createApp } from 'vue'
import App from './App.vue'
import '../src/assets/scss/style.scss'
import Navbar from './components/Navbar.vue'
// Import our custom CSS
import './assets/scss/style.scss'
import VeeValidation from "./plugin/validation.js"
// Import all of Bootstrap's JS
import {Modal} from 'bootstrap'

let vm = createApp(App)

vm.use(VeeValidation)
vm.component("Navbar",Navbar)

vm.mount('#app')
