<template>
  <nav class="navbar navbar-container navbar-expand-md">
    <div class="container">
      <div class="navbar-logo">
        <div class="navbar-title">
          <h1>{{ carShowRoomName }}</h1>
          <img src="/favicon-car.png" />
        </div>
        <p>{{ tagLine }}</p>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        @click="showNavbar = !showNavbar"
        :aria-expanded="showNavbar ? 'true' : 'false'"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        :class="{ show: showNavbar }"
        id="navbarNav"
      >
        <ul class="navbar-nav">
          <router-link
            :to="{ name: 'home' }"
            class="nav-item add-button"
            @click="showNavbar = false"
          >
            Home
          </router-link>
          <router-link
            :to="{ name: 'login' }"
            class="nav-item add-button"
            @click="showNavbar = false"
          >
            Login
          </router-link>
          <router-link
            :to="{ name: 'register' }"
            class="nav-item add-button"
            @click="showNavbar = false"
          >
            Register
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      carShowRoomName: "CarNation",
      tagLine: "- Accelerate your journey with us.",
      showNavbar: false,
    };
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
  min-width: 250px;
}

#navbarNav {
  flex-direction: row-reverse;
}

.add-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-button {
  background: transparent;
  color: white;
  font-size: 25px;
  margin: 0 10px;
  text-decoration: none;
}

@media (max-width: 767px) {
  .navbar-logo p {
    display: none;
  }
}

@media screen and (max-width: 991px) {
  .add-button {
    font-size: 22px;
  }
}
</style>
