<template>
    <section class="loading-container" v-if="isloading">
        <Loading class="loader" />
    </section>
    <section v-else class="car-details-container">
        <div class="car-image-container">
            <img :src="carDataById.image" />
        </div>
        <div class="car-details">
            <p><b>Name: </b>{{ carDataById.name }}</p>
            <p><b>Price: </b>${{ carDataById.price }}</p>
            <p><b>Description: </b> {{ carDataById.details }}</p>
            <router-link
                :to="{
                    name: 'home',
                }"
                class="back-button"
            >
                Back
            </router-link>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import Loading from "../components/Loading.vue";
import useGlobalStore from "../stores/globalStore";

const name = "CarDetail";
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
.back-button {
    padding: 0.8em 1.7em;
    border-radius: 0.3rem;
    background: #39484a;
    color: white;
    text-decoration: none;
}

p {
    font-size: 24px;
    margin-bottom: 10px;
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
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 80vh;
    border-radius: 10px;
    padding: 1rem;
    background: #f1f6f9;
}

.car-image-container img {
    max-width: 100%;
    min-width: 625px;
    height: auto;
    margin-bottom: 1rem;
}

.car-details {
    font-size: 16px;
    max-width: 800px;
    padding: 16px;
}

@media (min-width: 992px) {
    .car-details-container {
        flex-direction: row;
    }

    .car-image-container {
        flex-basis: 50%;
    }

    .car-details {
        flex-basis: 50%;
    }
}

@media (max-width: 992px) {
    .car-image-container {
        margin-top: 4rem;
    }

    .car-image-container img {
        min-width: 275px;
    }
}

@media (max-width: 767px) {
    .car-image-container img {
        margin-top: 0;
    }
}
</style>
