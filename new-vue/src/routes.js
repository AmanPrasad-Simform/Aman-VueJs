import { createRouter, createWebHistory } from "vue-router";
import homePage from "./components/home.vue";
import loginPage from "./components/login.vue";
// import errorPage from "./components/error-page.vue";

const routes = [
    {
        name: "login",
        path: "/login",
        component: loginPage,
    },
    {
        name: "home",
        path: "/home",
        component: homePage,
    },
    {
        path: "/registration",
        component: () => import("./components/registration.vue")
    },
    {
        path: "/pinia",
        component: () => import("./components/PiniaTask.vue")
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
