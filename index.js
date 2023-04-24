let vm = Vue.createApp({
    data() {
        return {
            val:1,
            ok:true,
            count: 0,
            message: "",
            inputValue:"", 
            firstName: "Aman",
            lastName: "Prasad",
            role: "",
            age:21,
            url:"https://www.google.com/" ,
            isRed: true,
            content: '<span>V-html displaying that posses security risk bcoz link can be changed</span><a href="https://www.google.com/" target="_blank">Link</a>',
        }
    },
    methods: {
        increment(){
            this.age++;
        },
        name() {
            return `${this.firstName} ${this.lastName}`
        },
        lastname(msg,event){
            this.lastName = event.target.value
        }
    },
    computed: {
        calc(){
            return 2
        }
    },
    watch: {
        inputValue(newValue, oldValue) {
          this.message = 'Input value changed to: ' + newValue
        }
      }
})

vm.mount('#app')