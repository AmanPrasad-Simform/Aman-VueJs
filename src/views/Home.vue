<template>
  <section class="loading-container">
    <Loading class="loader" v-if="isloading" />
    <GalleryCard
      @add-car="openAddForm"
      @edit-car="openEditForm"
      :carList="carList"
    />
    <CarForm
      :modalType="modalType"
      :carData="carData"
      @car-created="getCar"
    />
  </section>
</template>

<script>
import GalleryCard from "../components/GalleryCard.vue";
import CarForm from "../components/CarForm.vue";
import Loading from "../components/Loading.vue";
import { mapActions } from "pinia";
import useGlobalStore from "../stores/globalStore";
export default {
  components: {
    Loading,
    GalleryCard,
    CarForm,
  },
  data() {
    return {
      modalType: "add",
      carData: {},
      carList: {},
      isloading: true,
    };
  },
  computed: {},
  mounted() {
    this.isloading = true;
    this.getCar();
    this.isloading = false;
  },

  methods: {
    ...mapActions(useGlobalStore, {
      getCarAPI: "getCarDetails",
    }),
    async getCar() {
      this.carList = await this.getCarAPI();
    },
    openEditForm(car) {
      this.modalType = "edit";
      this.carData = car;
    },
    openAddForm() {
      this.modalType = "add";
    },
  },
};
</script>

<style scoped>
.loading-container {
  position: relative;
  height: 30vh;
}

.loader {
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
