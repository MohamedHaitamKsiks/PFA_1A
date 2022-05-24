<script setup>
    import {RouterLink, useRoute} from 'vue-router'
</script>

<template>
    <RouterLink :to="{path: href}" class="nav-link">{{ text }}</RouterLink>
</template>

<script>
    export default {
        props: {
            href: String,
            text: String
        },
        
    }
</script>
