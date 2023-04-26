<template>
  <div class="card-container">
    <div class="card-wrap" v-for="car in carList" :key="car.carName">
      <div class="card-image">
        <img :src="car.carImage" />
      </div>
      <div class="card-content">
        <h1 class="card-title">{{ car.carName }}</h1>
        <p class="card-text">
          {{ car.carDescription }}
        </p>
      </div>
      <div class="card-button">
        <button
          class="card-btn one"
          @click="getPrice(car)"
          :key="car.carName"
          :disabled="car.carPrice == undefined "
        >
          {{car.carPrice == undefined ? 'Available Soon' : 'Info' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import carList from "../assets/CarList.json";
export default {
  name: "GalleryCard",
  data() {
    return {
      carList,
    };
  },
  methods: {
    getPrice(car) {
          this.$emit('car-price',car);
        }
  },
};
</script>
<style scoped>
</style>