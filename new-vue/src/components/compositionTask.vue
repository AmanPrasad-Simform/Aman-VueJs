<template>
  <div>
    <input type="text" v-model="task" />
    <button @click="add">Add</button>
    <br />
    <br />
    <button @click="toggle">Switch</button>
    <div v-show="flag">
      <p>All tasks</p>
      <h1 v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </h1>
    </div>

    <div v-show="!flag">
      <p>Fav tasks</p>
      <h1 v-for="task in taskStore.favs" :key="task.id">
        <TaskDetails :task="task" />
      </h1>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useTaskStore from "../stores/TaskStore.js";
import TaskDetails from "./TaskDetails.vue";

const taskStore = useTaskStore();
const flag = ref(true);
const task = ref("");

function toggle() {
  flag.value = !flag.value;
}

function add() {
  console.log(task);
  if (task.value != "") {
    taskStore.addTask({
      title: task.value,
      id: 4,
      isFav: false,
    });
    task.value = "";
  } else {
    alert("fill some value");
  }
}
</script>
