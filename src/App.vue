<template>
  <Navbar />
  <GalleryCard @car-price="showPrice" />
</template>

<script>
import GalleryCard from "./components/GalleryCard.vue";
import "./assets/style.css";

export default {
  components: { GalleryCard },
  methods: {
    showPrice(car) {
      swal(car.carName, car.carPrice);
    },
  },
};
</script>
