<template>
    <nav class="navbar">
        <div class="d-flex justify-space-around align-center">
            <div class="navbar-logo">
                <router-link
                    :to="{ name: 'home' }"
                    class="navbar-title"
                    @click="showNavbar = false"
                >
                    <h1>{{ $t("navbar.carShowRoomName") }}</h1>
                    <img src="/favicon-car.png" />
                </router-link>
                <p>{{ $t("navbar.tagLine") }}</p>
            </div>
            <div class="d-flex">
                <div
                    class="d-flex align-center"
                    id="navbarNav"
                    v-if="!isMobile"
                >
                    <div class="user_detail" v-if="isLoggedIn">
                        <img
                            class="user_logo"
                            src="../assets/icon-user.png"
                            alt="userlogo"
                        />
                        <h4>{{ user }}</h4>
                    </div>
                    <ul class="d-flex navbar-nav flex-row">
                        <li v-if="isLoggedIn">
                            <router-link
                                :to="{ name: 'home' }"
                                class="nav-button"
                            >
                                {{ $t("navbar.home") }}
                            </router-link>
                        </li>
                        <li v-if="isLoggedIn && isAdmin == 'admin'">
                            <router-link
                                :to="{ name: 'users' }"
                                class="nav-button"
                            >
                                {{ $t("navbar.users") }}
                            </router-link>
                        </li>
                        <li v-if="isLoggedIn">
                            <router-link
                                :to="{ name: 'login' }"
                                class="nav-button"
                                @click="logout"
                            >
                                {{ $t("navbar.logout") }}
                            </router-link>
                        </li>
                        <li v-if="!isLoggedIn">
                            <router-link
                                :to="{ name: 'login' }"
                                class="nav-button"
                            >
                                {{ $t("navbar.login") }}
                            </router-link>
                        </li>
                        <li v-if="!isLoggedIn">
                            <router-link
                                :to="{ name: 'register' }"
                                class="nav-button"
                            >
                                {{ $t("navbar.register") }}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="i18n">
                    <div
                        color="#39484a"
                        class="i18n-btn d-flex align-center"
                        v-bind="props"
                    >
                        <img
                            class="i18n-logo"
                            src="../assets/i18n-icon.png"
                            alt="userlogo"
                        />
                        <select v-model="$i18n.locale" class="select-lang">
                            <option value="en">English</option>
                            <option value="hi">हिंदी</option>
                        </select>
                    </div>
                    <!-- Menu button -->
                    <div
                        id="hamburger_menu"
                        class="hamburger_container"
                        :class="{ open: drawer }"
                        @click.stop="drawer = !drawer"
                        v-if="isMobile"
                    >
                        <span class="hamburger_stick"></span>
                        <span class="hamburger_stick"></span>
                        <span class="hamburger_stick"></span>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <!-- For smaller screen size -->
    <v-card v-if="isMobile">
        <v-layout>
            <v-navigation-drawer v-model="drawer" class="navigation-drawer">
                <div class="cross-button">
                    <button @click="toggleMenu">
                        <img
                            class="cross-logo"
                            src="../assets/cross-icon.png"
                            alt="userlogo"
                        />
                    </button>
                </div>
                <div class="mobile-user-detail mt-8">
                    <img
                        class="user_logo"
                        src="../assets/icon-user.png"
                        alt="userlogo"
                    />
                    <h4 v-if="isLoggedIn">{{ user }}</h4>
                    <h4 v-if="!isLoggedIn">Please Login</h4>
                </div>

                <v-divider></v-divider>
                <div class="mobile-navbar">
                    <li v-if="isLoggedIn">
                        <router-link
                            :to="{ name: 'home' }"
                            @click="toggleMenu"
                            class="nav-button"
                        >
                            {{ $t("navbar.home") }}
                        </router-link>
                    </li>
                    <li v-if="isLoggedIn && isAdmin == 'admin'">
                        <router-link
                            :to="{ name: 'users' }"
                            @click="toggleMenu"
                            class="nav-button"
                        >
                            {{ $t("navbar.users") }}
                        </router-link>
                    </li>
                    <li v-if="isLoggedIn">
                        <router-link
                            :to="{ name: 'login' }"
                            class="nav-button"
                            @click="logout"
                        >
                            {{ $t("navbar.logout") }}
                        </router-link>
                    </li>
                    <li v-if="!isLoggedIn">
                        <router-link
                            :to="{ name: 'login' }"
                            class="nav-button"
                            @click="toggleMenu"
                        >
                            {{ $t("navbar.login") }}
                        </router-link>
                    </li>
                    <li v-if="!isLoggedIn">
                        <router-link
                            :to="{ name: 'register' }"
                            class="nav-button"
                            @click="toggleMenu"
                        >
                            {{ $t("navbar.register") }}
                        </router-link>
                    </li>
                </div>
            </v-navigation-drawer>
        </v-layout>
    </v-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import useGlobalStore from "../stores/globalStore";
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";

const { width } = useDisplay();
const isMobile = ref(width.value < 760 ? true : false);
const drawer = ref(false);
const mini = ref(true);

watch(width, () => {
    isMobile.value = width.value < 760 ? true : false;
});
function toggleMenu() {
    drawer.value = !drawer.value;
}

const showNavbar = ref(false);
const store = useGlobalStore();
const { isLoggedIn, user, isAdmin } = storeToRefs(store);
function logout() {
    isLoggedIn.value = false;
    sessionStorage.setItem("isLoggedIn", false);
    sessionStorage.removeItem("isToken");
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("isAdmin");
}
</script>

<style scoped>
.navbar-nav .link-active-class {
    color: white;
    font-weight: 700;
    opacity: 1;
}

.navbar-title {
    display: flex;
    align-items: center;
    text-decoration: none;
}

.navbar-title img {
    width: 50px;
}

.navbar-logo h1 {
    line-height: 1;
    padding: 0px 5px;
    font-weight: 600;
    font-size: 35px;
    background: #f1f6f9;
    background-size: cover;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.navbar-logo p {
    line-height: 1;
    margin: 0;
    padding: 5px;
    font-weight: 600;
    background: #f1f6f9;
    font-size: 20px;
    background-size: cover;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.navbar-logo {
    display: "flex";
    justify-content: "space-evenly";
}
.navbar {
    width: 100%;
    background-color: #39484a;
}

.v-card {
    position: relative;
    z-index: 2001;
}
.nav-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav-button {
    background: transparent;
    color: white;
    font-size: 23px;
    margin: 0 10px;
    opacity: 0.8;
    text-decoration: none;
}

h4 {
    color: #fff;
    padding: 0;
    margin-block: 8px;
    text-align: center;
}

.container-fluid {
    display: flex;
    justify-content: space-around;
}

.user_logo {
    width: 35px;
}
.mobile-user-detail {
    display: flex;
    align-items: center;
    margin: -5px 20px;
    padding: 2px 10px;
    gap: 8px;
    max-width: fit-content;
}
.mobile-user-detail h4 {
    color: #39484a;
    font-size: 25px;
}
.mobile-navbar .nav-button {
    background: transparent;
    font-size: 25px;
    margin: 0 10px;
    color: #39484a;
    opacity: 1;
    text-decoration: none;
}
.user_detail {
    display: flex;
    align-items: center;
    margin: -5px 20px;
    color: white;
    box-shadow: 0 0px 2px 1px white;
    border-radius: 48px;
    padding: 2px 10px;
    gap: 8px;
    background: #6b7a83;
    max-width: fit-content;
}
.i18n {
    display: flex;
    align-items: center;
    margin: 0 10px;
}
.i18n > span {
    color: white;
    font-size: 18px;
    font-weight: 400;
    text-decoration: underline;
}
.i18n-logo {
    width: 30px;
}
.i18n-btn {
    color: white;
    margin: 10px;
}
.select-lang {
    color: white;
    outline: none;
}
option {
    background: #39484a;
}
.hamburger_container {
    display: none;
    width: 36px;
    height: 36px;
    right: 25px;
}

.hamburger_stick {
    margin-block: 6px;
    width: 20px;
    background-color: #ffffff;
    border-radius: 2px;

    display: block;
    /* position: absolute; */
    height: 4px;
    width: 100%;
    border-radius: 9px;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
}

.hamburger_container span:nth-child(1) {
    top: 5px;
    transform-origin: left center;
}

.hamburger_container span:nth-child(2) {
    top: 17px;
    transform-origin: left center;
}

.hamburger_container span:nth-child(3) {
    top: 25px;
    transform-origin: left center;
}

.hamburger_container.open span:nth-child(1) {
    transform: rotate(45deg) translate(8px, -9.5px);
}

.hamburger_container.open span:nth-child(2) {
    width: 0%;
    opacity: 0;
}

.hamburger_container.open span:nth-child(3) {
    transform: rotate(-45deg) translate(8px, 10px);
}

li {
    list-style: none;
}
a {
    text-decoration: none;
}
.navigation-drawer {
    background: #f1f6f9;
    color: #39484a;
}

.mobile-navbar .link-active-class {
    color: #39484a;
    font-weight: 700;
}
.mobile-navbar {
    width: 185px;
    margin: 20px auto;
}
.cross-button {
    display: flex;
    flex-direction: row-reverse;
    margin: 10px;
}
@media screen and (max-width: 760px) {
    header {
        padding-block: 10px;
    }

    .button {
        padding: 8px 20px;
    }

    #navbarNav {
        display: none;
    }
    .hamburger_container {
        display: block;
    }
}
@media screen and (max-width: 991px) {
    .nav-button {
        font-size: 20px;
        margin: 0 5px;
    }
    .navbar-logo h1 {
        font-size: 30px;
    }
    .navbar-logo p {
        font-size: 18px;
    }
    .user_detail {
        margin: 0 10px;
    }
}
@media (max-width: 759px) {
    .user_detail {
        margin: 0px 20px;
        padding: 0 25px;
    }
    .navbar-logo p {
        display: none;
    }
    .navbar {
        padding: 10px;
    }
}
</style>
