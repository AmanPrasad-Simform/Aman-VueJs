<template>
  <div>
  <input type="text" v-model="task">
    <button @click="add">Add</button>
    <br>
    <br>
  <button @click="toggle">Switch</button>
  <div v-show="flag">
  <p>All tasks</p>
    <h1 v-for="task in taskStore.tasks" :key="task.id">
      <task-details :task="task" />
    </h1>
  </div>

<div v-show="!flag">
  <p>Fav tasks</p>
    <h1 v-for="task in taskStore.favs" :key="task.id">
      <task-details :task="task" />
    </h1>
    </div>
  </div>
</template>

<script>
import useTaskStore  from "../stores/TaskStore.js";
import TaskDetails from "./TaskDetails.vue";

export default {
  components: { TaskDetails },
  data() {
    return {
      task:"",
      taskStore: useTaskStore(),
      flag: true
    };
  },
  methods: {
    add(){
        console.log(this.task)
        if(this.task!=""){
            this.taskStore.addTask({
                title: this.task,
                id: 4,
                isFav: false,
            })
            this.task = "";
        }
        else{
            alert("fill some value")
        }
    },
    toggle(){
        this.flag = !this.flag
    }
  },
};
</script>
