
<template>
    <div :class="className">
        <slot />
    </div>
</template>

<script>
    export default {
        props: {
            wait: Number
        },
        data() {
            return {
                className: 'dossier-edit-section dossier-edit-section-hide'
            }
        },
        mounted() {
            setTimeout(() => {
                this.className = 'dossier-edit-section';
            }, this.wait * 100 + 10);
        }
    }
</script>

<style>
    /* section of information  */
    .dossier-edit-section {
        /* border bottom */
        border-bottom-style:dashed;
        border-bottom-width: 1px;
        border-bottom-color: rgba(0, 0, 0, 0.632);
        /* padding */
        padding: 0.5cm;
        transition: all 0.5s;
        transform: translateX(0cm);
        opacity: 100%;
    }

    .dossier-edit-section-hide {
        transform: translateX(-5cm);
        opacity: 0%;
    }

</style>