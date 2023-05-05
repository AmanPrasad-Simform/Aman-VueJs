import { validate } from 'vee-validate'
import { createApp } from 'vue'
import App from './App.vue'
import navbarComp from './components/navbar.vue'
import router from "./routes.js"
import { validate } from 'vee-validate'
let vm = createApp(App)

vm.use(router)
vm.use(validate)
vm.component('navbarComp', navbarComp)

vm.mount('#app')
