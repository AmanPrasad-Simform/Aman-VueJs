<template>
<child :age="age" @age-count="age++"/>
<navbarComp/>
</template>

<script>
import child from './components/child-comp.vue'
export default {
    name: 'App',
    components: {
        child
    },
    data() {
        return {
            age: 20
        }
    },
    methods:{
      agePlus(){ 
        return this.age++
      }
    }

}
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
