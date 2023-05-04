<template>
  <div>
    <div class="navbar-container">
      <div class="navbar-logo">
        <div class="navbar-title">
          <h1>{{ carShowRoomName }}</h1>
          <img src="/favicon-car.png" />
        </div>
        <p>{{ tagLine }}</p>
      </div>
      <div class="add-button-container">
        <button
          type="button"
          class="add-button"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          @click="addCarData"
        >
          Add Car
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      carShowRoomName: "CarNation",
      tagLine: "- Accelerate your journey with us.",
    };
  },
  components: {
    CarForm,
  },
  methods: {
    addCarData(car) {
      this.$emit("add-car", car);
    },
  },
};
</script>

<style scoped>
.navbar-container {
  display: flex;
  justify-content: space-around;
  background-color: #39484a;
  overflow: hidden;
  width: 100%;
  position: sticky;
  top: 0;
  text-align: center;
  z-index: 10;
}
.navbar-title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.navbar-title img {
  width: 65px;
}
.navbar-container h1 {
  line-height: 1;
  padding: 0.5rem;
  font-weight: 600;
  font-size: 35px;
  background: #f1f6f9;
  background-size: cover;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navbar-container p {
  line-height: 1;
  margin: 0;
  padding: 0.5rem;
  font-weight: 600;
  background: #f1f6f9;
  font-size: 20px;
  background-size: cover;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navbar-logo {
  display: "flex";
  justify-content: "space-evenly";
}

.add-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-button {
  border: 1px solid white;
  padding: 0.8em 1.7em;
  border-radius: 0.3em;
  background: transparent;
  color: white;
}
@media (max-width: 500px) {
  .navbar-container p {
    display: none;
  }
  .add-button {
    padding: 0.6em 1.3em;
  }
}
@media (max-width: 768px) {
  .navbar-container h1,
  .navbar-container p {
    display: block;
    text-align: center;
  }
}
</style>
