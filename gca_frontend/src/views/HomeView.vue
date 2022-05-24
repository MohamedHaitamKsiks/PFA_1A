<script setup>
    import axios from 'axios'
    import router from '../router/index'
</script>

<template>
    <h1> Hello world </h1>
    <p>Bienvenue dans le gestionnaire de cabinet d'avocat {{secret}}</p>
</template>

<script>
    export default {
        data() {
            return {
                secret: '',
            }
        },
        methods: {
           
        },
        mounted() {
            axios.get('/api/user/secret').then( (response) => {
                let body =  response.data
                if (body.connected) {
                    this.secret = body.secret
                }else {
                    router.push('/login');
                }
            })
        }
    }
</script>