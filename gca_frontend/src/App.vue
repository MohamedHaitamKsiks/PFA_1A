<script setup>
    import { RouterLink, RouterView } from 'vue-router';
    import Navbar from './components/Navbar/Navbar.vue';
</script>

<template>
    <header class="main-header">
        <Navbar />
    </header>

    <section class="main-section">
        <RouterView />
    </section>
</template>

<style>
    @import '/node_modules/bootstrap/dist/css/bootstrap.css';

    /*main header class*/
    .main-header {
        z-index: 100;
    }

    /*main section to all routes render*/
    .main-section {
        padding: 32px;
        padding-top: 100px;
    }
</style>