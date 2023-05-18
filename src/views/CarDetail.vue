<template>
  <div class="loading-container" v-if="isloading">
    <Loading class="loader" />
  </div>
  <div v-else class="car-details-container">
    <div class="car-image-container">
      <img :src="carDetail.image" />
    </div>
    <div class="car-details">
      <h1>Name: {{ carDetail.name }}</h1>
      <h3><b>Price: $</b>{{ carDetail.price }}</h3>
      <p><b>Description: </b> {{ carDetail.details }}</p>
      <router-link
        :to="{
          name: 'home',
        }"
        class="back-button"
      >
        Back
      </router-link>
    </div>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import { mapActions, mapState } from "pinia";
import useGlobalStore from "../stores/globalStore";
export default {
  name: "CarDetail",
  data() {
    return {
      id: this.$route.params.id,
      carDetail: {},
    };
  },
  components: {
    Loading,
  },
  async mounted() {
    const carDetailbyId = await this.getCarDetailById(this.id);
    this.carDetail = carDetailbyId;
  },
  computed:{
    ...mapState(useGlobalStore,{
      isloading:"getIsLoading"
    })
  },
  methods: {
    ...mapActions(useGlobalStore,["getCarDetailById"]),
  },
};
</script>

<style scoped>
.back-button {
  padding: 0.8em 1.7em;
  border-radius: 0.3rem;
  background: #39484a;
  color: white;
  text-decoration: none;
}

p {
  font-size: 20px;
}

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

.car-details-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  border-radius: 10px;
  padding: 1rem;
  background: #f1f6f9;
}

.car-image-container img {
  max-width: 100%;
  min-width: 625px;
  height: auto;
  margin-bottom: 1rem;
}

.car-details {
  font-size: 1rem;
  max-width: 50rem;
  padding: 1rem;
}

@media (min-width: 992px) {
  .car-details-container {
    flex-direction: row;
  }

  .car-image-container {
    flex-basis: 50%;
  }

  .car-details {
    flex-basis: 50%;
  }
}

@media (max-width: 992px) {
  .car-image-container {
    margin-top: 4rem;
  }

  .car-image-container img {
    min-width: 275px;
  }
}

@media (max-width: 767px) {
  .car-image-container img {
    margin-top: 0;
  }
}
</style>
