<template>
  <!-- <navbarComp /> -->
  <PiniaTask />
  <!-- <router-view /> -->
  <!-- <watcherComp />
  <child :aqge="age" @age-count="age++" />
  <button @click="tabComp">Change</button>
  <component :is="tab" /> -->
</template>

<script>
// import navbarComp from "./components/navbar.vue";
// import child from "./components/child-comp.vue";
// import watcherComp from "./components/watcher-comp.vue";
// import comp1Com from "./components/comp1.vue";
// import comp2Com from "./components/comp2.vue";
import PiniaTask from "./components/PiniaTask.vue"

export default {
  name: "App",
  components: {
    // navbarComp,
    PiniaTask,
    // child,
    // watcherComp,
    // comp1Com,
    // comp2Com,
  },
  data() {
    return {
      age: 20,
      tab: "comp1Com",
    };
  },
  methods: {
    agePlus() {
      return this.age++;
    },
    tabComp() {
      this.tab = "comp2Com";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
