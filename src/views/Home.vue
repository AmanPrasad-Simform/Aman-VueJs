<template>
  <section class="loading-container">
    <Loading class="loader" v-if="isloading" />
    <GalleryCard @add-car="openAddForm" @edit-car="openEditForm" />
    <CarForm :modalType="modalType" :carDataByID="carDataByID" />
  </section>
</template>

<script>
import GalleryCard from "../components/GalleryCard.vue";
import CarForm from "../components/CarForm.vue";
import Loading from "../components/Loading.vue";
import { mapActions, mapState } from "pinia";
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
      carDataByID: {},
    };
  },
  async mounted() {
    await this.getCarAPI();
  },
  computed: {
    ...mapState(useGlobalStore, {
      isloading: "getIsLoading",
    }),
  },
  methods: {
    ...mapActions(useGlobalStore, {
      getCarAPI: "getCarDetails",
    }),
    openEditForm(car) {
      this.modalType = "edit";
      this.carDataByID = car;
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
