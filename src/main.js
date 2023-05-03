import { createApp } from 'vue'
import App from './App.vue'
import Navbar from './components/Navbar.vue'
import './assets/scss/style.scss'
import VeeValidation from "./plugin/validation.js"
import { Modal } from 'bootstrap'

let vm = createApp(App)

vm.use(VeeValidation)
vm.component("Navbar", Navbar)

vm.mount('#app')
