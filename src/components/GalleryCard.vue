<template>
  <div>
    <div class="card-container">
      <div class="card-wrap" v-for="car in carList" :key="car.carName">
        <div class="card-image">
          <img :src="car.carURL" />
        </div>
        <div class="card-content">
          <h1 class="card-title">{{ car.carName }}</h1>
          <p class="card-text">
            {{ car.carDetails }}
          </p>
        </div>
        <div class="card-button">
          <button
            class="card-btn one"
            @click="getPrice(car)"
            :key="car.carName"
            :disabled="car.carPrice == undefined"
          >
            {{ car.carPrice == undefined ? "Coming Soon" : "Info" }}
          </button>
          <div>
            <img
              src="../assets/editIcon.png"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              @click="editCarData(car)"
              style="height: 30px"
            />
            <img
              src="../assets/deleteIcon.png"
              @click="deleteCar"
              style="height: 40px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarForm from "./CarForm.vue";
import carList from "../assets/CarList.json";
import Swal from "sweetalert2";

export default {
  name: "GalleryCard",
  components: {
    CarForm,
  },
  props: {},
  data() {
    return {
      carList,
    };
  },
  methods: {
    typeDefine() {
      this.type = "edit";
    },
    getPrice(car) {
      this.$emit("car-price", car);
    },
    editCarData(car) {
      this.$emit("edit-car", {
        ...car,
      }); //This creates a new object with the same properties as the car object that is being passed in.
    },
    deleteCar() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your car has been deleted.", "success");
        }
      });
    },
  },
};
</script>
