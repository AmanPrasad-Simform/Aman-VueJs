<template>
    <section>
        <Navbar />
        <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
                <component :is="Component" />
            </Transition>
        </RouterView>
    </section>
</template>

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
