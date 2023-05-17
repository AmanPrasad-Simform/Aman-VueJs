import { defineStore } from "pinia";
 const useTaskStore = defineStore("taskStore", {
    state: () => ({
        tasks: [
            { id: 1, title: "Let's code", isFav: false },
            { id: 2, title: "Let's play", isFav: true },
            { id: 3, title: "Let's go home", isFav: false },
        ],
        name: "Aman",
    }),
    getters: {
        favs(){
          return this.tasks.filter((t)=>t.isFav)
        },
    }, 
    actions: {
        addTask(task){
            this.tasks.push(this.tasks.title = task)
        },
        deleteTask(id){
            this.tasks = this.tasks.filter((t)=>{
                return t.id !== id
            })
        },
        favToggle(id){
            const task = this.tasks.find((t) => t.id === id);
            if (task) {
              task.isFav = !task.isFav;
            }
        },
    }
});
export default useTaskStore 
