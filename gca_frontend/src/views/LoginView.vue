<script setup>
    import axios from 'axios'
    import router from '../router/index.js'
</script>


<template>  
    <form class="login-form">
        <h2>Connectez-vous</h2>
        <!-- Email input -->
        <div class="form-outline mb-4">
            <input ref="username" type="text" id="username" class="form-control" v-model="username"/>
            <label class="form-label" for="username">Nom d'utilisateur</label>
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
            <input ref="password" type="password" id="password" class="form-control" v-model="password"/>
            <label class="form-label" for="password">Mot de passe</label>
        </div>

        <!-- Submit button -->
        <button type="button" class="btn btn-primary btn-block mb-4" @click="onSubmit">Se Connecter</button>
    
        <!-- Error Message -->
        <div v-if="error" :class="'alert alert-danger login-error' + getErrorClass" role="alert">
            Password or username invalid
        </div>
    </form>

</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
                error: false,
            }
        },
        methods: {
            onSubmit() {
                let requestBody = {
                    username: this.username,
                    password: this.password
                }
                axios.post('/api/user/login', requestBody).then((response) => {
                    if (response.data.accepted){
                        router.push('/');
                    }else{
                        this.$refs.username.focus()
                        this.error = true;
                        setTimeout(() => {
                            this.error = false;
                        }, 10000);
                    }
                })
            }
        },
        computed: {
            getErrorClass() {
                return this.error ? ' login-error-visible': '';
            }
        }
    }
</script>

<style>

    .login-form {
        position: fixed;
        left: 0;
        right: 0;

        width: 100%;
        height: 100%;

        padding: 25%;
        padding-top: 10%;
        z-index: 100;
    }

    .login-error {
        opacity: 0%;
    }

    /* login error fade-in-out animation */
    .login-error-visible {
        animation-name: login-error-animation;
        animation-duration: 10s;
    }

    @keyframes login-error-animation {
        0% {
            opacity: 0%;
            transform: translateY(10px);
        }
        5% {
            opacity: 100%;
            transform: translateY(0px);
        }
        100%{
            opacity: 0%
        }
    } 

</style>