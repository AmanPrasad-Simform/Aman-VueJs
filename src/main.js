import { createApp } from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import "./assets/style.css";
import Navbar from './components/Navbar.vue'
import VeeValidation from "./plugin/validation.js"
import { Modal } from 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from "./router/routes"

let vm = createApp(App)
vm.use(router)
vm.use(VueAxios, axios)
vm.use(VeeValidation)
vm.component("Navbar", Navbar)

vm.mount('#app')
