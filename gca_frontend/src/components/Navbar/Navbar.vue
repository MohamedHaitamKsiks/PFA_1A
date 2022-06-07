<script setup>
    import NavbarLink from './NavbarLink.vue';
    import router from '../../router';
    import axios from 'axios';
    import { useRoute } from 'vue-router';
</script>

<template>
    <nav :class="'shadow p-2 position-fixed-top  navbar bg-light navbar-animated ' + showNavbar">
        <a class="navbar-brand">
            <img src="../../assets/law.png" width="32" class="m-1 p-1"/>
            Gestionnaire de cabinet d'avocat
        </a>
        <div class ="nav justify-content-end">
            <NavbarLink href="/" text="Accueil"/>
            <button class="btn btn-outline-danger" @click="onLogout">Se Deconnecter</button>
        </div>

    </nav>
</template>

<script>
    export default {
        computed: {
            showNavbar() {
                let show = (useRoute().path == '/login');
                return show ? 'navbar-hidden': '';
            }
        },
        methods: {
            onLogout() {
                axios.post('/api/user/logout').then((response) => {
                    router.push('/login');
                });
            }
        }
    }
</script>

<style>
    .navbar-animated {
        z-index: 10000;
        transform: translateY(0%);
        transition: transform 0.5s;
    }

    .navbar-hidden {
        transform: translateY(-100%);
    }

</style>