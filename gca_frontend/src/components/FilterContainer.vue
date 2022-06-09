<template>
    <!--les filtres-->
    <div :class="'filter-container' + filterClass">
        <div style="width: 10cm; height: 100%;">
            <slot />
        </div>
        <!--open / close button-->
    </div>
    <img src="/right-arrow.png" :class="'filter-btn' + filterBtnClass" @click="hidden = !hidden;"/>
</template>


<script>
    export default {
        data() {
            return {
                hidden: false
            }
        },
        computed: {
            filterClass() {
                return this.hidden ? ' filter-container-hide' : '';
            },
            filterBtnClass() {
                return this.hidden ? '' : ' filter-btn-close';
            },
        }
    }

</script>


<style>

    /* filter container */
    .filter-container {
        /* positioning */
        position: relative;
        left: 0;
        top: 0;
        margin: 0px;
        padding: 0.3cm;
        padding-top: 2cm;
        z-index: 100;

        /* sizing */
        width: 10cm;
        min-width: 10cm;

        height: 100%;
        
        background-color: rgb(255, 255, 255);
        box-shadow: 0.2cm 0cm 0.7cm 0.08cm rgba(0, 0, 0, 0.217);
        
        transition: all 0.5s;
        overflow: hidden;
        opacity: 100%;
       
    }

    .filter-container-hide {
        width: 0%;
        min-width: 0cm;
        padding: 0;
    }

    /* filter open*/
    .filter-btn {
        /* positiobs */
        position: fixed;
        left: -0.5cm;
        top: 50%;
        z-index: 1000;
        /* sizing and box */
        background-color: rgb(6, 68, 149);
        width: 1.5cm;
        height: 1.5cm;
        padding: 0.2cm;
        border-radius: 0.5cm;
        object-fit:scale-down;
        /* add transltate */
        transition: all 0.5s;

    }

    /* filter button hover */
    .filter-btn:hover {
        background-color: rgb(27, 126, 255);
        cursor: pointer;
    }

    /* filter button close */

    .filter-btn-close {
        transform: rotate(180deg);
        left: 9.5cm;
    }

</style>