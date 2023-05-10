import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        name: "home",
        path: "/",
        component: () => import("../views/Home.vue"),
    },
    {
        name: "login",
        path: "/login",
        component: () => import("../views/LoginForm.vue"),
    },
    {
        name: "register",
        path: "/register",
        component: () => import("../views/RegisterForm.vue"),
    },
    {
        name: "carDetail",
        path: "/details/:id",
        component: () => import("../views/CarDetail.vue"),
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
    linkActiveClass: "link-active-class"
});

export default router;