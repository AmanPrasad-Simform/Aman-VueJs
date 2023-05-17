import { createApp } from 'vue'
import App from './App.vue'
import navbarComp from './components/navbar.vue'
import { createPinia } from 'pinia'
// import router from "./routes.js"
let vm = createApp(App)
const pinia = createPinia()
vm.use(pinia)
// vm.use(router)
vm.component('navbarComp', navbarComp)

vm.mount('#app')
