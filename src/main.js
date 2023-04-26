import { createApp } from 'vue'
import App from './App.vue'
import '../src/assets/scss/style.scss'
import Navbar from './components/Navbar.vue'

let vm = createApp(App)

vm.component("Navbar",Navbar)

vm.mount('#app')
