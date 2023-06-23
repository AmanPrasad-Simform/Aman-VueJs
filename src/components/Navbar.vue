<template>
    <nav class="navbar">
        <div class="navbar-container">
            <div class="navbar-logo">
                <router-link :to="{ name: 'home' }" class="navbar-title">
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
                    <div class="user-detail" v-if="isLoggedIn">
                        <img
                            class="user-logo"
                            src="../assets/icon-user.png"
                            alt="user"
                        />
                        <h4>{{ user }}</h4>
                    </div>
                    <ul class="d-flex navbar-nav flex-row">
                        <li v-if="isLoggedIn">
                            <router-link :to="{ name: 'home' }">
                                {{ $t("navbar.home") }}
                            </router-link>
                        </li>
                        <li v-if="isLoggedIn && isAdmin == 'admin'">
                            <router-link :to="{ name: 'users' }">
                                {{ $t("navbar.users") }}
                            </router-link>
                        </li>
                        <li v-if="isLoggedIn">
                            <router-link
                                :to="{ name: 'login' }"
                                @click="logout"
                            >
                                {{ $t("navbar.logout") }}
                            </router-link>
                        </li>
                        <li v-if="!isLoggedIn">
                            <router-link :to="{ name: 'login' }">
                                {{ $t("navbar.login") }}
                            </router-link>
                        </li>
                        <li v-if="!isLoggedIn">
                            <router-link :to="{ name: 'register' }">
                                {{ $t("navbar.register") }}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="i18n">
                    <div color="#39484a" class="i18n-btn" v-bind="props">
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
                    <div
                        class="hamburger-container"
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
    <!-- Mobile view navbar -->
    <v-overlay
        v-model="drawer"
        location-startegy="connected"
        scroll-startegy="block"
        v-if="isMobile"
    >
        <div class="navigation-bar">
            <div class="mobile-user-detail mt-8">
                <img
                    class="user-logo"
                    src="../assets/icon-user.png"
                    alt="userlogo"
                />
                <h4 v-if="isLoggedIn">{{ user }}</h4>
                <h4 v-if="!isLoggedIn">Please Login</h4>
            </div>
            <v-divider></v-divider>
            <div class="mobile-navbar">
                <li v-if="isLoggedIn">
                    <router-link :to="{ name: 'home' }" @click="toggleMenu">
                        {{ $t("navbar.home") }}
                    </router-link>
                </li>
                <li v-if="isLoggedIn && isAdmin == 'admin'">
                    <router-link :to="{ name: 'users' }" @click="toggleMenu">
                        {{ $t("navbar.users") }}
                    </router-link>
                </li>
                <li v-if="isLoggedIn">
                    <router-link :to="{ name: 'login' }" @click="logout">
                        {{ $t("navbar.logout") }}
                    </router-link>
                </li>
                <li v-if="!isLoggedIn">
                    <router-link :to="{ name: 'login' }" @click="toggleMenu">
                        {{ $t("navbar.login") }}
                    </router-link>
                </li>
                <li v-if="!isLoggedIn">
                    <router-link :to="{ name: 'register' }" @click="toggleMenu">
                        {{ $t("navbar.register") }}
                    </router-link>
                </li>
            </div>
        </div>
    </v-overlay>
</template>

<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import useGlobalStore from "../stores/globalStore";
import { useDisplay } from "vuetify";

const store = useGlobalStore();
const { isLoggedIn, user, isAdmin } = storeToRefs(store);
const { width } = useDisplay();
const drawer = ref(false);
const isMobile = ref(width.value < 760 ? true : false);
watch(width, () => {
    isMobile.value = width.value < 760 ? true : false;
});
function toggleMenu() {
    drawer.value = !drawer.value;
}
function logout() {
    isLoggedIn.value = false;
    sessionStorage.setItem("isLoggedIn", false);
    sessionStorage.removeItem("isToken");
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("isAdmin");
}
</script>

<style scoped>
.navbar {
    width: 100%;
    background-color: #39484a;
}
.navbar-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.navbar-logo {
    display: "flex";
    justify-content: "space-evenly";
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
    opacity: 0.8;
    padding: 5px;
    font-weight: 600;
    background: #f1f6f9;
    font-size: 20px;
    background-size: cover;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.navbar-title {
    display: flex;
    align-items: center;
    text-decoration: none;
}

.navbar-title img {
    width: 50px;
}
.navbar-nav .link-active-class {
    color: white;
    font-weight: 700;
    opacity: 1;
}
.user-detail {
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

.user-detail h4 {
    color: #fff;
    padding: 0;
    margin-block: 8px;
    text-align: center;
}
.user-logo {
    width: 35px;
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
    display: flex;
    align-items: center;
}

.select-lang {
    color: white;
    outline: none;
}

option {
    background: #39484a;
}

.hamburger-container {
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
    height: 4px;
    width: 100%;
    border-radius: 9px;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
}

.hamburger-container span:nth-child(1) {
    top: 5px;
    transform-origin: left center;
}

.hamburger-container span:nth-child(2) {
    top: 17px;
    transform-origin: left center;
}

.hamburger-container span:nth-child(3) {
    top: 25px;
    transform-origin: left center;
}

.hamburger-container.open span:nth-child(1) {
    transform: rotate(45deg) translate(8px, -9.5px);
}

.hamburger-container.open span:nth-child(2) {
    width: 0%;
    opacity: 0;
}

.hamburger-container.open span:nth-child(3) {
    transform: rotate(-45deg) translate(8px, 10px);
}
.navigation-bar {
    position: absolute;
    background: #f1f6f9;
    height: 100vh;
    width: 40vw;
    min-width: 220px;
}

.mobile-user-detail {
    display: flex;
    align-items: center;
    margin: 5px 20px;
    padding: 2px 10px;
    gap: 8px;
    max-width: fit-content;
}
.mobile-user-detail h4 {
    color: #39484a;
    font-size: 20px;
}
.mobile-navbar a {
    background: transparent;
    font-size: 25px;
    margin: 0 10px;
    color: #39484a;
    opacity: 1;
    text-decoration: none;
}
.mobile-navbar .link-active-class {
    color: #39484a;
    font-weight: 700;
}
.mobile-navbar {
    margin: 5px 25px;
    padding: 5px 20px;
    max-width: fit-content;
}

a {
    background: transparent;
    color: white;
    font-size: 23px;
    margin: 0 10px;
    opacity: 0.8;
    text-decoration: none;
}

li {
    list-style: none;
}

@media screen and (max-width: 760px) {
    #navbarNav {
        display: none;
    }
    .hamburger-container {
        display: block;
    }
}
@media screen and (max-width: 991px) {
    a {
        font-size: 20px;
        margin: 0 5px;
    }
    .navbar-logo h1 {
        font-size: 30px;
    }
    .navbar-logo p {
        font-size: 18px;
    }
    .user-detail {
        margin: 0 10px;
    }
}
@media (max-width: 759px) {
    .user-detail {
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
