<template>
  <div>
    <div class="card-container">
      <div class="card-wrap" v-for="car in carList" :key="car.carName">
        <div class="card-image">
          <img :src="car.image" />
        </div>
        <div class="card-content">
          <h1 class="card-title">{{ car.name }}</h1>
          <p class="card-text">
            {{ car.details }}
          </p>
        </div>
        <div class="card-button">
          <button
            class="card-btn one"
            @click="getPrice(car)"
            :key="car.name"
            :disabled="car.price == undefined"
          >
            {{ car.price == undefined ? "Available Soon" : "Info" }}
          </button>
          <div>
            <img
              src="../assets/editIcon.png"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              @click="editCarData(car)"
            />
            <img src="../assets/deleteIcon.png" @click="deleteCar(car.id)" />
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
import * as Vue from "vue"; // in Vue 3
import axios from "axios";
import VueAxios from "vue-axios";
export default {
  name: "GalleryCard",
  components: {
    CarForm,
  },
  props: {},
  data() {
    return {
      carList: {},
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
    deleteCar(id) {
      console.log(id);
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
          this.axios
            .delete(`https://testapi.io/api/dartya/resource/cardata/${id}`)
            .then((response) => {
              this.getCarList();
            });
          Swal.fire("Deleted!", "Your car has been deleted.", "success");
        }
      });
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 20px 50px;
}

.card-wrap {
  width: 300px;
  height: 420px;
  border-radius: 20px;
  border: 1px solid #212a3e;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: rgba(155, 164, 181, 0.4);
}

.card-wrap:hover {
  transform: scale(1.08);
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  filter: none;
}

.card-header {
  height: 250px;
  width: 100%;
  border-radius: 100% 0% 100% 0% / 0% 50% 50% 100%;
  display: grid;
  place-items: center;
}

.card-content {
  display: flex;
  color: #212a3e;
  flex-direction: column;
  align-items: center;
  width: 85%;
  height: 175px;
  margin: 0 auto;
}

.card-title {
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.card-text {
  overflow-y: auto;
  text-align: center;
  font-size: 15px;
  margin-bottom: 20px;
}

.card-image {
  height: 145px;
  margin-top: 10px;
}

.card-image img {
  height: 140px;
  width: 290px;
  object-fit: contain;
}

.card-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin: 0 auto;
  padding-bottom: 10px;
}
.card-btn {
  --color: #39484a;
  padding: 0.8em 1.7em;
  background-color: transparent;
  border-radius: 0.3em;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: 0.5s;
  font-weight: 400;
  font-size: 17px;
  border: 1px solid;
  font-family: inherit;
  text-transform: uppercase;
  color: var(--color);
  z-index: 1;
  color: #212a3e;
  max-width: 150px;
}
.card-btn:disabled {
  cursor: not-allowed;
}

.card-btn::before,
.card-btn::after {
  content: "";
  display: block;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%);
  position: absolute;
  border-radius: 50%;
  z-index: -1;
  background-color: var(--color);
  transition: 1s ease;
}

.card-btn::before {
  top: -1em;
  left: -1em;
}

.card-btn::after {
  left: calc(100% + 1em);
  top: calc(100% + 1em);
}

.card-btn:enabled:hover::before,
.card-btn:enabled:hover::after {
  height: 410px;
  width: 410px;
}
.card-btn:enabled:hover {
  color: #f1f6f9;
}

@media (max-width: 500px) {
  .card-btn {
    padding: 0.5em 1em;
  }
}
</style>
