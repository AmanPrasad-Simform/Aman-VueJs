import VeeValidation from "./plugin/validation.js";
import vuetify from "./plugin/vuetify.js";
import i18n from "./plugin/i18n.js";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router/routes";
import { createPinia } from "pinia";

import App from "./App.vue";
import Navbar from "./components/Navbar.vue";
import { createApp } from "vue";

import "./assets/style.css";

let vm = createApp(App);

vm.use(createPinia());
vm.use(router);
vm.use(VueAxios, axios);
vm.use(i18n);
vm.use(vuetify);
vm.use(VeeValidation);
vm.component("Navbar", Navbar);

vm.mount("#app");
