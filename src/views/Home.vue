<template>
  <div class="loading-container">
    <Loading class="loader" v-if="isloading" />
    <GalleryCard
      @add-car="openAddForm"
      @edit-car="openEditForm"
      :carList="carList"
      @car-deleted="getCar"
    />
    <CarForm :modalType="modalType" :carData="carData" @car-created="getCar" />
  </div>
</template>

<script>
import { getCarDetails } from "../api/api.js";
import GalleryCard from "../components/GalleryCard.vue";
import CarForm from "../components/CarForm.vue";
import Loading from "../components/Loading.vue";

export default {
  components: {
    Loading,
    GalleryCard,
    CarForm,
  },
  data() {
    return {
      modalType: "add",
      carData: {},
      carList: {},
      isloading: true,
    };
  },
  async mounted() {
    this.isloading = true;
    this.carList = { ...(await getCarDetails()) };
    this.isloading = false;
  },
  methods: {
    async getCar() {
      this.carList = { ...(await getCarDetails()) };
    },
    openEditForm(car) {
      this.modalType = "edit";
      this.carData = car;
    },
    openAddForm() {
      this.modalType = "add";
    },
  },
};
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
