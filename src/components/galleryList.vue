<template>
  <div class="navbar">
    <h1>CarDekho.com</h1>
    <p>Car Dekho... Fir Kharido!!! </p>
  </div>
  <div class="card-container">
    <div class="card-wrap" v-for="car in carList" :key="car.carName">
      <div class="card-image">
        <img :src="car.carImage"/>
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
          @click="getPrice(car.carName)"
          :key="car.carName"
        >
          Price
        </button>
        </div>
    </div>
  </div>
</template>

<script>
import carList from "../assests/carList.json";
export default {
  name: "galleryList",
  data() {
    return {
      carList,
    };
  },
  methods: {
    getPrice(cName) {
      for (let i = 0; i < this.carList.length; i++) {
        if (cName == this.carList[i].carName) alert(this.carList[i].carPrice);
      }
    },
  },
};
</script>
<style scoped>

</style>
