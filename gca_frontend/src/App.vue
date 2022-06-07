<script setup>
    import { RouterLink, RouterView } from 'vue-router';
    import Navbar from './components/Navbar/Navbar.vue';
</script>

<template>
    <header class="main-header">
        <Navbar />
    </header>

    <section>
        <RouterView />
    </section>
</template>

<style>
    @import '/node_modules/bootstrap/dist/css/bootstrap.css';

    /*main header class*/
    .main-header {
        z-index: 100;
    }

</style>