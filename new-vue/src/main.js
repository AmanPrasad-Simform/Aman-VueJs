import { createApp } from 'vue'
import App from './App.vue'
import navbarComp from './components/navbar.vue'


let vm = createApp(App)

vm.component('navbarComp',navbarComp)

vm.mount('#app')
