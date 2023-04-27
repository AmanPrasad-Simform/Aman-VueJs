<template>
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
        @click="toggle"
        class="add-button"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        ADD
      </button>
    </div>
  </div>

  <!-- Modal -->
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            {{ addBtn ? "Add the Car Details" : "Edit the Car Details" }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="toggleFalse"
          ></button>
        </div>
        <div class="modal-body">
          <CarForm :addBtn="addBtn" />
        </div>
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
    toggleFalse() {
      return (this.addBtn = false);
    },
    toggle() {
      return (this.addBtn = true);
    },
  },
  data() {
    return {
      addBtn: false,
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
