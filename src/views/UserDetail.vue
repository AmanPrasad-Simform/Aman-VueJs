<template>
    <section class="table-container">
        <v-table class="v-table">
            <thead>
                <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Role</th>
                    <th class="text-left">Gender</th>
                    <th class="text-left">DOB</th>
                    <th class="text-left">Age</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>{{ user.gender }}</td>
                    <td>{{ user.dob }}</td>
                    <td>{{ user.age }}</td>
                </tr>
            </tbody>
        </v-table>
    </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import useGlobalStore from "../stores/globalStore.js";

const store = useGlobalStore();
store.getUserDetails();
const { userDetails: users } = storeToRefs(store);
</script>

<style scoped>
th {
    font-size: 20px;
}
.table-container {
    overflow-x: scroll;
    padding: 10px;
}
.v-table {
    max-width: 1300px;
    min-width: 730px;
    margin: 30px auto;
    background: #f1f6f9;
}
@media screen and (max-width: 730px) {
    .v-table {
        margin: 0;
    }
}
</style>
