<template>

<form>
<slot></slot>
<slot name="Name" :value="nameq"></slot>
<slot name="Age"  :value="Ageq"></slot>
<label>Role:</label>
<select v-model="Role">
<option value="Frontend">FrontEnd</option>
<option value="backend">backend</option>
<option value="fullstack">fullstack</option>
<option value="Designer">Designer</option>
</select>
<br>

<label>Tech:</label>
<input type="radio" id="VueJs" value="VueJs" v-model="toggle" />
<label for="VueJs">VueJs</label>

<input type="radio" id="ReactJs" value="ReactJs" v-model="toggle"/>
<label for="ReactJs">ReactJs</label>
<br>

<label>Interest:</label>

<input type="checkbox" id="Chess" value="Chess" v-model="Interest" />
<label for="Chess">Chess</label>

<input type="checkbox" id="Badminton" value="Badminton" v-model="Interest"/>
<label for="Badminton">Badminton</label>

<input type="checkbox" id="Cricket" value="Cricket" v-model="Interest"/>
<label for="Cricket">Cricket</label>
</form>
<br>
<br>
<br>
<br>
<table>
<tr>
<slot name="render"></slot>
<td>
Role
</td>
<td>
Tech
</td>
<td>
Interest
</td>
</tr>
<tr>
<td>
{{nameq}}
</td>
<td>
{{Ageq}}
</td>
<td>
{{Role}}
</td>
<td>
{{toggle}}
</td>
<td>
{{Interest}}
</td>
</tr>
</table>
</template>

<script>
export default({
    name: "form-app",
    props:{
        nameq:String,
        Ageq:Number,
    },
    data(){
        return{
            Role:"Frontend",
            toggle:"",
            Interest:[],
            Name:this.nameq,
            Age:this.Ageq
        }
    }
})
</script>

<style scoped>

</style>