<template>
  <div>
    <!-- <Loading v-if="isloading" />
    <GalleryCard
      v-else -->
    <GalleryCard
      @add-car="openAddForm"
      @car-price="showPrice"
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
    console.log(this.isloading);
    this.carList = {
      ...(await getCarDetails()),
    };
    this.isloading = false;
  },
  methods: {
    async getCar() {
      this.carList = [...(await getCarDetails())];
    },
    showPrice(car) {
      swal(car.name, "$" + car.price);
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
