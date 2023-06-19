<template>
    <section>
        <img class="error-img" src="../assets/error-img.png" />
        <router-link
            :to="{
                path: '/',
            }"
            class="go-back-button"
        >
            Go Back
        </router-link>
    </section>
</template>
<style scoped>
.go-back-button {
    padding: 0.8em 1.7em;
    border-radius: 0.3rem;
    background: #39484a;
    color: white;
    text-decoration: none;
    width: max-content;
    display: flex;
    margin: auto;
}

.error-img {
    width: 650px;
    display: flex;
    margin: auto;
}

@media (max-width: 767px) {
    .error-img {
        width: 400px;
    }
}

@media (max-width: 450px) {
    .error-img {
        width: 300px;
    }
}
</style>
