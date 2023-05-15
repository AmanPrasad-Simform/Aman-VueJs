<template>
<div>
    <Navbar />
    <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath"></router-view>
    </transition>
</div>
</template>

<script></script>

<style scoped>

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(-10rem);
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease-in-out;
}

</style>
