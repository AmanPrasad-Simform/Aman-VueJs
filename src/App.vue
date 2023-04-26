<template>
<Navbar/>
<GalleryCard @car-price='showPrice' />
</template>

<script>
import GalleryCard from './components/GalleryCard.vue';
import './assets/GalleryCard.css';

export default {
  components: {GalleryCard },
  methods:{
    showPrice(car){
      swal(car.carName,car.carPrice)
        }
  }
}
</script>
