<template>
  <div>
    {{ task.title }}
    <button class="material-symbols-outlined" @click="deleteTask(task.id)">
      delete
    </button>
    <button class="material-symbols-outlined" @click="favToggle(task.id)">
      favorite
    </button>
  </div>
</template>

<script>
import useTaskStore from "../stores/TaskStore.js";
export default {
  props: ["task"],
  data() {
    return {
      taskStore: useTaskStore(),
    };
  },
  methods: {
    deleteTask(id) {
      this.taskStore.deleteTask(id);
    },
    favToggle(id) {
      this.taskStore.favToggle(id);
    },
  },
};
</script>
