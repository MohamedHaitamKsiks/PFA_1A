<script setup>
    import axios from 'axios'
    import router from '../router/index.js'
</script>


<template>
    <form class="login-form">
        <!--login title-->
        <h2 class="login-title">Connectez-vous</h2>

        <!--login body-->
        <div class="login-body">
            <!-- Email input -->
            <div class="input-container">
                <label class="login-label" for="username">Nom de l'utilisateur</label>
                <input ref="username" type="text" id="username" class="text-input" v-model="username" placeholder="Saisir le nom de votre utilisateur .." />
            </div>
    
            <!-- Password input -->
            <div class="input-container">
                <label class="login-label" for="password">Mot de passe</label>
                <input ref="password" type="password" id="password" class="text-input" v-model="password" placeholder="Saisir votre mot de passe .." />
            </div>
    
            <!-- Submit button -->
            <button type="button" class="btn btn-login" @click="onSubmit">Se Connecter</button>
    
            <!-- Error Message -->
            <div v-if="error" :class="getErrorClass">
                Login Error: <br/>
                Password or username invalid
            </div>
        </div>

    </form>

</template>

<script>
    export default {
        mounted() {
            this.$refs.username.focus();
        },
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
                return this.error ? 'login-error login-error-visible' : 'login-error';
            }
        }
    }
</script>

<style>

    /* login form container */
    .login-form {
        /* position */
        position: fixed;
        left: 25%;
        top: 25%;
        z-index: 100;

        /* sizing */
        width: 50%;
    
        /* box */
        box-shadow: 0 0.2cm 0.5cm 0.2cm rgba(0, 0, 0, 0.286);
        border-radius: 0.3cm;
        overflow: hidden;

        /* add start animation */
        animation-name: login-showup;
        animation-duration: 0.6s;


    }

    /* starting animation */
    @keyframes login-showup {
        0% {
            opacity: 0%;
            transform: translateY(100%);
        }
        100% {
            opacity: 100%;
            transform: translateY(0);
        }
    }

    /* login error */
    .login-error {
        background-color: rgba(255, 69, 69, 0.481);
        opacity: 0%;
        margin: 0.2cm;
        padding: 0.2cm;
        border-style: solid;
        border-radius: 0.2cm;
        border-width: 1px;
        border-color: rgb(160, 1, 1);
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

    /* login title */
    .login-title {
        width: 100%;
        text-align: center;
        background-color: rgb(25, 29, 36);
        color: white;
        margin: 0;
        /* sizing */
        padding-top: 0.5cm;
        padding-bottom: 0.5cm;
    }

    /* login body */
    .login-body {
        padding: 0.5cm;
 
    }

    /* login label */
    .login-label {
        width: 50%;
        min-width: max-content;
        display: flex;
        opacity: 80%;
        font-size: larger;
    }

</style>