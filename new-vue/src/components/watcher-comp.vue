<template>
<label>Question:</label>
<input type="text" v-model="question"/>
<p>{{answer}}</p>

<div>
<button v-on:click="count=count+1"> + </button>
<h2>{{count}}</h2>
<button @click="count=count-1"> - </button>
</div>
</template>

<script>
export default{
    name:"watcher-comp",
    data(){
        return{
            question:'What is ',
            answer:'Question mark is missing...',
            count:0,
        }
    },
    watch:{
        question(){
            if(this.question.includes('?')){
                this.answer = "Thinking ..."
            }
        },
        count(newVal,oldVal){
            console.log("NewValue : ", newVal, "OldValue: ",oldVal)
        }
    }
}
</script>