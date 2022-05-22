<script setup>
    import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink to="/">Home</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<style>
    @import '/node_modules/bootstrap/dist/css/bootstrap.css';
</style>