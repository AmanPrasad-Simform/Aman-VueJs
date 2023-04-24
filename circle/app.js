let vm = Vue.createApp({
    data(){
        return{
            isPurple: false,
            selectedColor: "",
            size:250,
        }
    },
    computed:{
        circle_class(){
            return{
                purple:this.isPurple,
                size: this.size,
            }
        },
        getH(){
            return{
                height : this.size + 'px',
                width : this.size + 'px',
                lineHeight : this.size + 'px'
            }
        }
    }
}).mount('#app')