<template>
    <section class="loading-container">
        <Loading class="loader" v-if="isloading" />
        <GalleryCard />
        <CarForm />
    </section>
</template>

<script setup>
import { onMounted, defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import useGlobalStore from "../stores/globalStore";
import Loading from "../components/Loading.vue";

const store = useGlobalStore();
const { getIsLoading: isloading } = storeToRefs(store);
const { getCarDetails: getCarAPI } = store;

onMounted(async () => {
    await getCarAPI();
});

// Create an async component using defineAsyncComponent
const CarForm = defineAsyncComponent(() => import("../components/CarForm.vue"));
const GalleryCard = defineAsyncComponent(() =>
    import("../components/GalleryCard.vue")
);
</script>

<style scoped>
.loading-container {
    position: relative;
    height: 30vh;
}

.loader {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
