<template>
<Navbar />
<galleryCard/>
</template>

<script>
import galleryCard from './components/gallery-card.vue';
import Navbar from './components/Navbar.vue'
import './assests/gallery-cars.css';

export default {
  components: { galleryCard, Navbar },
}
</script>
