<script setup>
    import NavbarLink from './NavbarLink.vue';
    import router from '../../router';
    import axios from 'axios';
    import { useRoute } from 'vue-router';
</script>

<template>
    <nav :class="'navbar navbar-animated ' + showNavbar">
        <a class="navbar-title">
            Gestionnaire de cabinet d'avocat
        </a>
        <div class="nav-links">
            <NavbarLink href="/" text="Accueil" />
            <NavbarLink href="/dossier/add" text="AjouterDossier" />
            <button class="btn btn-logout" @click="onLogout">Se Deconnecter</button>
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


    /* nav bar */
    .navbar {
        /*position top fixed*/
        position: fixed;
        top: 0; 
        left: 0; 
        /*size */
        width: 100%;
        /* box style */
        padding: 0.5cm;
        background-color: rgb(25, 29, 36);
        color: white;
        display: flex;
        /* add shadow */
        box-shadow: 0cm 0.3cm 0.5cm rgba(0, 0, 0, 0.425);
    }

    .navbar-animated {
        z-index: 10000;
        transform: translateY(0%);
        transition: transform 0.5s;
    }

    .navbar-hidden {
        transform: translateY(-100%);
    }

    /* nav bar title */
    .navbar-title {
        font-size: x-large;
        font-weight: bolder;
        flex: auto;
    }

    /* nav links container */
    .nav-links {
        flex: initial;
        margin-right: 1cm;
    }

    

</style>