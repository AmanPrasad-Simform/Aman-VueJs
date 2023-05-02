<template>
  <div>
    <Navbar @add-car="openAddForm" />
    <GalleryCard
      @car-price="showPrice"
      @edit-car="openEditForm"
      :carList="carList"
      @car-deleted="getCar"
    />
    <CarForm :modalType="modalType" :carData="carData" @car-created="getCar" />
  </div>
</template>

<script>
import { getCarDetails } from "./api/api.js";
import GalleryCard from "./components/GalleryCard.vue";
import CarForm from "./components/CarForm.vue";
import "./assets/style.css";

export default {
  components: { GalleryCard, CarForm },
  async mounted() {
    this.carList = [...(await getCarDetails())];
  },
  data() {
    return {
      modalType: "add",
      carData: {},
      carList: [],
    };
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
