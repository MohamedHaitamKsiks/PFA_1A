<script setup>
    import NavbarLink from './NavbarLink.vue';
    import router from '../../router';
    import axios from 'axios';
    import { useRoute } from 'vue-router';
</script>

<template>
    <nav :class="'p-2 fixed-top navbar bg-light navbar-animated ' + showNavbar">
        <a class="navbar-brand"><strong>Gestionnaire de cabinet d'avocat</strong></a>
        <div class ="nav justify-content-end">
            <NavbarLink href="/" text="Accueil"/>
            <NavbarLink href="/" text="Dossiers"/>
            <NavbarLink href="/" text="Comptes"/>
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
        transform: translateY(0%);
        transition: transform 0.5s;
    }

    .navbar-hidden {
        transform: translateY(-100%);
    }

</style>