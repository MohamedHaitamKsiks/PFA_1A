<script setup>
    import axios from 'axios';
    import { RouterLink, RouterView, useRoute} from 'vue-router';
    import Navbar from './components/Navbar/Navbar.vue';
    import router from './router';
</script>

<template>
    <header class="main-header">
        <Navbar />
    </header>

    <section>
        <RouterView />
    </section>

</template>

<script>
    export default {
        mounted() {
            //add on router
            router.afterEach(this.onRouterView);
        },
        methods: {
            onRouterView() {
                //get user connection
                axios.get('/api/user/connected').then((response) => {
                    // if user not connected return to /login
                    if (!response.data.connected) {
                        router.push('/login');
                    }
                });
                //reset scroll
                window.scrollTo(0, 0);
            }
        }
    }
</script>

<style>
    /*main header class*/
    .main-header {
        z-index: 100;
    }



</style>