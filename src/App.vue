<template>
  <Navbar />
  <GalleryCard />
</template>

<script>
import GalleryCard from "./components/GalleryCard.vue";
import Navbar from "./components/Navbar.vue";
import "./assets/style.css";

export default {
  components: { GalleryCard, Navbar },

};
</script>
