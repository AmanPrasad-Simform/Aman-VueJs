<template>
  <div class="navbar">
    <h1>{{ carShowRoomName }}</h1>
    <p>{{ tagLine }}</p>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      carShowRoomName: "CarNation",
      tagLine: "Accelerate your journey with us.",
    };
  },
};
</script>

<style scoped>
.navbar {
  background-color: #394867;
  overflow: hidden;
  width: 100%;
  position: sticky;
  top: 0;
  text-align: center;
  z-index: 10;
}

.navbar h1 {
  line-height: 1;
  padding: 0.5rem;
  font-weight: 600;
  font-size: 40px;
  background: #f1f6f9;
  background-size: cover;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navbar p {
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

@media (max-width: 768px) {
  .navbar h1,
  .navbar p {
    display: block;
    text-align: center;
  }
}
</style>
