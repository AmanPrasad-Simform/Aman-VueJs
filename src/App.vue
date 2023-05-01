<template>
  <div>
    <Navbar @add-car="openAddForm" />
    <CarForm :modalType="modalType" :carData="carData" />
    <GalleryCard @car-price="showPrice" @edit-car="openEditForm" />
  </div>
</template>

<script>
import GalleryCard from "./components/GalleryCard.vue";
import CarForm from "./components/CarForm.vue";
import "./assets/style.css";

export default {
  components: { GalleryCard, CarForm },
  data() {
    return {
      modalType: "add",
      carData: {},
    };
  },
  methods: {
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
