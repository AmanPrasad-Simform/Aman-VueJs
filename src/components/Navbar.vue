<template>
  <div>
    <div class="navbar-container">
      <div class="navbar-logo">
        <div class="navbar-title">
          <h1>CarNation</h1>
          <img src="/favicon-car.png" />
        </div>
        <p>- Accelerate your journey with us.</p>
      </div>
      <div class="add-button-container">
        <!-- Button trigger modal -->

        <button
          type="button"
          class="add-button"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          @click="addCarData"
        >
          ADD
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CarForm from "./CarForm.vue";
export default {
  name: "Navbar",
  components: {
    CarForm,
  },
  methods: {
    reset() {},
    addCarData(car) {
      this.$emit("add-car", car);
    },
  },
  data() {
    return {
      addBtn: true,
    };
  },
};
</script>

<style scoped>
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
</style>
