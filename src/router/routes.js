import { createRouter, createWebHistory } from "vue-router";
const carShowRoomName = "CarNation";
const routes = [
    {
        name: "home",
        path: "/home",
        alias: "/",
        meta: {
            title: `Home|${carShowRoomName}`,
            requiresAuth: true,
        },
        component: () => import("../views/Home.vue"),
    },
    {
        name: "login",
        path: "/login",
        meta: {
            title: `Login|${carShowRoomName}`,
            guest: true,
        },
        component: () => import("../views/LoginForm.vue"),
    },
    {
        name: "register",
        path: "/register",
        meta: {
            title: `Register|${carShowRoomName}`,
            guest: true,
        },
        component: () => import("../views/RegisterForm.vue"),
    },
    {
        name: "carDetail",
        path: "/details/:id",
        meta: {
            title: `Details|${carShowRoomName}`,
            requiresAuth: true,
        },
        component: () => import("../views/CarDetail.vue"),
    },
    {
        name: "userDetail",
        path: "/users",
        meta: {
            title: `Users|${carShowRoomName}`,
            requiresAuth: true,
        },
        component: () => import("../views/UserDetail.vue"),
    },
    {
        name: "error",
        path: "/:catchAll(.*)",
        component: () => import("../views/404.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    linkActiveClass: "link-active-class",
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
    const isToken = JSON.parse(sessionStorage.getItem("isToken"));
    if (to.meta.requiresAuth && !isLoggedIn && !isToken) {
        next("/login"); // Redirect to login page if not logged in
    } else if (to.meta.guest && isLoggedIn && isToken) {
        next("/");
    } else {
        next(); // Continue navigation
    }
});

router.afterEach((to) => {
    !to.meta.title
        ? (document.title = carShowRoomName)
        : (document.title = to.meta.title);
});

export default router;
