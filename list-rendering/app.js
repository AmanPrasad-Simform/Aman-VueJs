let vm = Vue.createApp({
    data() {
        return {
            myObject: {
                title: 'How to do lists in Vue',
                author: 'Jane Doe',
                publishedAt: '2023-04-19'
            },
            birds: ['Pigeons', 'Eagles', 'Doves', 'Parrots'],
            people: [
                { name: 'John', age: 20 },
                { name: 'Rick', age: 18 },
                { name: 'Amy', age: 33 }
            ]
        }
    }
}).mount('#app');