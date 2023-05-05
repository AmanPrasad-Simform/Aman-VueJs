<template>
  <input type="text" ref="myInputa" :value="aqge" />
  <button @click="myInputaa" v-on:click="ageCount">asd</button>
</template>

<script>
export default {
  name: "childComp",
  data() {
    return {
      name: "aman",
    };
  },
  props: {
    aqge: {
      type: Number,
      validator: (value) => {
        if (value <= 25) {
          return true;
        }
      },
    },
  },
  emits: ["age-count"],
  methods: {
    myInputaa() {
      this.$refs.myInputa.focus();
    },
    ageCount() {
      this.$emit("age-count");
    },
  },
};
</script>
