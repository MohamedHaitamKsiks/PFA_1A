<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <div v-if="visible" :class="className">
        <!--dossier header-->
        <div v-if="dossier.type=='so'" class="dossier-card-header">
            {{ dossier.nom }} ( {{ dossierType }} )

        </div>
        <div v-else class="dossier-card-header">
            {{ dossier.nom }} {{ dossier.prenom }} ( {{ dossierType }} )
        </div>

        <div class="dossier-card-body">
            <strong>Nature d'accident</strong> : {{ dossier.nature }} <br /><br />
            <strong>Description du sinistre</strong> : {{ dossier.info}}
        </div>

        <div class="dossier-card-footer">
            <button class="btn btn-delete" @click="onDeleted">Supprimer</button>
            <RouterLink class="btn btn-edit"
                :to="{ path: '/dossier/edit/' + this.dossier.type + '/' +this.dossier.id }">Modifier</RouterLink>
        </div>

    </div>
</template>

<script>
    import router from '../router';

    export default {
        props: {
            dossier: Object,
            wait: Number
        },
        data() {
            return {
                className: 'dossier-card',
                deleted: false,
                visible: true
            }
        },
        computed: {
            dossierType() {
                return (this.dossier.type == 'so') ? 'Societe' : 'Particulier';
            }
        },
        methods: {
            show() {
                this.className = 'dossier-card';
                setTimeout(() => {
                    this.className = 'dossier-card dossier-card-show ';
                }, this.wait * 200.0 + 100.0);
            },
            onDeleted() {
                if (!this.deleted) {
                    console.log(this.dossier);
                    this.className = 'dossier-card dossier-card-deleted';
                    this.deleted = true;
                    setTimeout(() => {
                        this.visible = false;
                    }, 600);
                    //delete request
                    let requestBody = {
                        dossier:{
                            id: this.dossier.id,
                            type: this.dossier.type
                        },
                    }
                    axios.post('/api/dossier/delete', requestBody);
                }
            },
        }, 
        mounted() {
            this.show();
        }
    }
</script>


<style>
    .dossier-card {
        width: 8cm;
        height: 7cm;
        display: inline-block;
        margin: 0.3cm;
        background-color: rgb(255, 255, 255);
        border-radius: 0.5cm;
        box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.336);
        overflow: hidden;
        transition: all 0.6s;
        opacity: 0%;
        transform: translateY(10cm);
    }

    .dossier-card-show {
        opacity: 100%;
        transform: translateY(0cm);
    }

    .dossier-card-deleted {
        transform: translateY(-1cm);
    }

    .dossier-card-header {
        background-color: rgb(25, 29, 36);
        color: rgba(255, 255, 255, 0.688);
        margin: 0px;
        padding: 0.3cm
    }

    .dossier-card-body {
        padding: 0.5cm;
    }

    .dossier-card-footer {
        position: sticky;
        top: 100%;
        left: 100%;
        padding: 0.2cm;
    }

    

</style>