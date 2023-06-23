<template>
    <div v-if="isloading" class="loading-container">
        <Loading class="loader" />
    </div>
    <div v-else class="container">
        <div class="car-details-container">
            <div class="car-image-container">
                <img :src="carDataById.image" />
            </div>
            <div class="car-details">
                <h1>Name: {{ carDataById.name }}</h1>
                <h3><b>Price: $</b>{{ carDataById.price }}</h3>
                <p><b>Description: </b> {{ carDataById.details }}</p>
                <router-link
                    :to="{
                        name: 'home',
                    }"
                >
                    <button class="back-button">Back</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import Loading from "../components/Loading.vue";
import useGlobalStore from "../stores/globalStore";

const store = useGlobalStore();
const { getIsLoading: isloading, getCarDataById: carDataById } =
    storeToRefs(store);

const route = useRoute();
const carID = route.params.id;
onMounted(async () => {
    await store.getCarDetailById(carID);
});
</script>

<style scoped>
.container {
    height: fit-content;
    display: flex;
    justify-content: center;
    width: min(80vw, 1200px);
    margin: 5rem auto;
    color: #39484a;
}
.back-button {
    padding: 0.8em 1.7em;
    border-radius: 0.3rem;
    background: #39484a;
    color: white;
    text-decoration: none;
}
a {
    width: fit-content;
    text-decoration: none;
    color: white;
}
p {
    font-size: 20px;
    word-wrap: break-word;
}

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

.car-details-container {
    display: flex;
    height: 35rem;
    border-radius: 10px;
    padding: 1rem;
    background: #cfd8dc;
    width: 100%;
}

.car-image-container img {
    height: 100%;
    object-fit: cover;
    margin-bottom: 1rem;
    width: 100%;
}

.car-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1rem;
    max-width: 50rem;
    padding: 1rem;
    width: 50%;
    margin: 10px;
}

@media (max-width: 1020px) {
    .car-details-container {
        flex-direction: column;
    }
    .car-image-container {
        height: 50%;
    }
    .car-details-container {
        height: 75vh;
    }
    .car-details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 1rem;
        max-width: 50rem;
        padding: 1rem;
        width: 100%;
        margin: 0;
    }
}
@media (max-width: 600px) {
    .container {
        margin: 3rem auto;
        width: 90%;
    }
    p {
        font-size: 18px;
    }
}
</style>
