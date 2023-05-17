<template>
  <section class="gallery-container">
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
    <transition-group name="fade" tag="div" class="card-container">
      <div
        class="card-wrap"
        v-for="(car, index) in carDetails"
        :key="car.name"
        :style="{ transitionDelay: `${0.1 * index}s` }"
      >
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
          <router-link
            :to="{
              name: 'carDetail',
              params: { id: `${car.id}` },
            }"
          >
            <button class="card-btn">Info</button>
          </router-link>
          <div>
            <img
              src="../assets/editIcon.png"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              @click="editCarData(car)"
              class="edit-icon"
            />
            <img
              src="../assets/deleteIcon.png"
              @click="deleteCar(car.id, car.name)"
              class="delete-icon"
            />
          </div>
        </div>
      </div>
    </transition-group>
  </section>
</template>

<script>
import { mapActions } from "pinia";
import useGlobalStore from "../stores/globalStore";

import Swal from "sweetalert2";

export default {
  name: "GalleryCard",
  data() {
    return {
      carDetails: {},
    };
  },
  props: {
    carList: Object,
  },
  watch: {
    carList: {
      handler(newValue) {
        this.carDetails = {
          ...newValue,
        };
      },
    },
  },
  methods: {
        ...mapActions(useGlobalStore, ["getCarDetails", "deleteCarDetails"]),
    addCarData(car) {
      this.$emit("add-car", car);
    },
    editCarData(car) {
      this.$emit("edit-car", {
        ...car,
      });
    },
    deleteCar(id, name) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.deleteCarDetails(id);
          this.carDetails = await this.getCarDetails();
          this.$emit("car-deleted");
          Swal.fire(`Deleted!${name}`, `Your Car has been deleted.`, "success");
        }
      });
    },
  },
};
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

.fade-move,
.fade-enter-active {
  transition: all 1s ease;
}

.fade-leave-active {
  transition: all 1s ease;
  position: absolute;
}

.gallery-container {
  display: flex;
  position: relative;
  flex-direction: column;
}

.add-button-container {
  display: flex;
  margin: 10px 50px;
  flex-direction: row-reverse;
}

.add-button {
  border: 1px solid white;
  padding: 0.8em 1.7em;
  border-radius: 0.3em;
  background: #39484a;
  color: white;
}

.edit-icon {
  height: 30px;
}

.delete-icon {
  height: 40px;
}

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
  border-radius: 10px;
  border: 1px solid #39484a;
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

.card-image img {
  height: 200px;
  width: 300px;
  object-fit: cover;
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

.card-btn:hover {
  color: #f1f6f9;
}

.card-btn:hover::before,
.card-btn:hover::after {
  height: 410px;
  width: 410px;
}

@media screen and (max-width: 729px) {
  .add-button-container {
    display: flex;
    margin: 10px 0px;
    justify-content: center;
  }
}
</style>
