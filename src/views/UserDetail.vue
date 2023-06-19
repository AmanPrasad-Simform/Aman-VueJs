<template>
    <v-table density="compact">
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
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import useGlobalStore from "../stores/globalStore.js";
const store = useGlobalStore();
const { getUserDetails } = store;
getUserDetails();
const { userDetails: users } = storeToRefs(store);
</script>

<style scoped></style>
