import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import RegistrationForm from "./views/RegistrationForm.vue";
import LoginForm from "./views/LoginForm.vue";

const routes = [
    {
        name: "home",
        path: "/",
        component: Home,
        // alias: ["/home"]
    },
    {
        name: "login",
        path: "/login",
        component: LoginForm,
    },
    {
        name: "registration",
        path: "/registration",
        component: RegistrationForm,
    },
    {
        name: "error",
        path: "/:catchAll(.*)",
        redirect: { name: "home" },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;