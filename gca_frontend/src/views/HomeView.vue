<script setup>
    import axios from 'axios'
    import router from '../router/index'
</script>

<template>
    <!--les filtres-->
    <div class="offcanvas offcanvas-start">
        
    </div>

    <!--table of the docuemts-->
    <div class="m-3">     
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Titre du dossier</th>
                    <th scope="col">Nom du client</th>
                    <th scope="col">Editer / Supprimer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="document in documents" scope="row">
                    <td>{{ document.id }}</td>
                    <td>{{ document.name }}</td>
                    <td>{{ document.client }}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
       
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" aria-controls="offcanvasScrolling">Filtre</button>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                documents: [],
            }
        },
        methods: {
           
        },
        mounted() {
            axios.get('/api/document/all').then( (response) => {
                let body =  response.data
                if (body.connected){
                    this.documents = body.documents
                    console.log(this.connected);
                    this.$forceUpdate()
                }
                else
                    router.push('/login');
            })
        }
    }
</script>

<style>

</style>