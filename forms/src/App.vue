<template>
  <Forms :nameq="Name" :Ageq="Age">
<h1>FORMS::</h1>
<template v-slot:Name>
<label>Name:</label>
<input placeholder="Enter name..." v-model="Name" >
<br>
</template>
<template v-slot:Age>
<label>Age:</label>
<input type="number" placeholder="Enter age..." v-model="Age" >
<br>
</template>
<template v-slot:render>
<td>
name
</td>
<td>
age
</td>
</template>
  </Forms>
</template>

<script>
import Forms from './components/form-application.vue'

export default ({
  name: 'App',
  components: {
    Forms
  },
  data(){
        return{
            Name:"qwe",
            Age:21,
        }
  },
})
</script>

<style>

</style>
