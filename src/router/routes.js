import { createRouter, createWebHistory } from "vue-router";
const carShowRoomName = "CarNation"
const routes = [
    {
        name: "home",
        path: "/",
        meta: { title: `Home|${carShowRoomName}` },
        component: () => import("../views/Home.vue"),
    },
    {
        name: "login",
        path: "/login",
        meta: { title: `Login|${carShowRoomName}` },
        component: () => import("../views/LoginForm.vue"),
    },
    {
        name: "register",
        path: "/register",
        meta: { title: `Register|${carShowRoomName}` },
        component: () => import("../views/RegisterForm.vue"),
    },
    {
        name: "carDetail",
        path: "/details/:id",
        meta: { title: `Details|${carShowRoomName}` },
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

router.beforeEach((to, from, next) => {
    (!to.meta.title) ? (document.title = carShowRoomName) : (document.title = to.meta.title)
    next()
})
export default router;