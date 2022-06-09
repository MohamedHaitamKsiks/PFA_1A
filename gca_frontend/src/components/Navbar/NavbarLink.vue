<script setup>
    import {RouterLink, useRoute} from 'vue-router'
</script>

<!--template body-->
<template>
    <RouterLink :to="{path: href}" :class="'nav-link ' + activeClass ">{{ text }}</RouterLink>
</template>

<!--script-->
<script>
    export default {
        props: {
            href: String,
            text: String
        },
        data() {
            return {
                
            }
        },
        computed: {
            activeClass() {
                return (this.href == useRoute().path) ? 'nav-link-active' : '';
            }
        }
        
    }
</script>

<!--style-->
<style>
    .nav-link {
        color: white;
        margin-right: 0.6cm;
        text-decoration: none;
        opacity: 70%;
        transition: all 0.3s;
    }

    .nav-link:hover {
        opacity: 100%;
    }

    .nav-link-active {
        opacity: 100%;
        font-weight: bold;
    }
</style>