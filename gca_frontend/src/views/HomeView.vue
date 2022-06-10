<script setup>
    import axios from 'axios'
    import router from '../router/index'
    import FilterContainer from '../components/FilterContainer.vue';
    import DossierCard from '../components/DossierCard.vue';
import DocumentPopup from '../components/DocumentPopup.vue';
</script>

<template>

    <div class="dossiers-container">
        <FilterContainer style="height: 100%;">
            <h2>Filtre</h2>

            <!--order by-->
            <h4>Trier par:</h4>
            <select class="choice-input" v-model="filter.orderBy">
                <option value="recent">Les plus recents</option>
                <option value="oldest">Les plus ancients</option>
                <option value="client">Par client</option>
            </select>

            <!--selection-->
            <!--type-->
            <h4>Type du client :</h4>
            <ul>
                <li>
                    <label>Tout </label>
                    <input type="radio" ref="type" name="type" value="all" checked="true" v-model="filter.type" />
                </li>
                <li>
                    <label>Particulier </label>
                    <input type="radio" ref="type" name="type" value="par" v-model="filter.type" />
                </li>
                <li>
                    <label>Societe </label>
                    <input type="radio" ref="type" name="type" value="so" v-model="filter.type" />
                </li>
            </ul>

            <!--nature d'accicent-->

            <h4>Nature d'accident :</h4>

            <ul>
                <li>
                    <label>Tout </label>
                    <input type="radio" name="nature" value="all" checked="true" v-model="filter.nature" />
                </li>
                <li>
                    <label>Voiture </label>
                    <input type="radio" name="nature" value="voiture" v-model="filter.nature" />
                </li>
                <li>
                    <label>Travail </label>
                    <input type="radio" name="nature" value="travail" v-model="filter.nature" />
                </li>
            </ul>

            <button class="btn btn-login" style="top: 60%" @click="onFilterButton" >Filtrer</button>
        </FilterContainer>

        <div class="dossiers">
            <h1> Liste des dossiers : </h1>
            <DossierCard v-for="(dossier, index) in filteredDossier" :dossier="dossier" :wait="index"  />
        </div>
    </div>



</template>

<script>
    export default {
        data() {
            return {
                //list of dossiers we get from api
                dossiers: [],
                //filtered list
                filteredDossier: [],
                //filter 
                filter: {
                    type: 'all',
                    nature: 'all',
                    orderBy: 'recent'
                }
            }
        },
        methods: {
            //filer when click on filtrer button
            onFilterButton() {
                this.filteredDossier = [];
                setTimeout(() => {
                    this.onFilter()
                }, 5);
            },
            //filter data
            onFilter() {
                console.log(this.filter);
                this.filteredDossier = [...this.dossiers];
                //les plus recent
                if (this.filter.orderBy == 'recent')
                    this.filteredDossier = this.filteredDossier.sort((a, b) => {
                        if (a.id > b.id)
                            return -1;
                        else if (a.id == b.id)
                            return 0;
                        else
                            return 1;
                    });
                //les plus ancients
                else if (this.filter.orderBy == 'oldest')
                    this.filteredDossier = this.filteredDossier.sort((a, b) => {
                        if (a.id < b.id)
                            return -1;
                        else if (a.id == b.id)
                            return 0;
                        else
                            return 1;
                    });
                // par client est par defaut

                //filter le type
                if (this.filter.type != 'all')
                    this.filteredDossier = this.filteredDossier.filter((dossier) => {
                        return dossier.type == this.filter.type;
                    });

                //filter la nature d'accident
                if (this.filter.nature != 'all')
                    this.filteredDossier = this.filteredDossier.filter((dossier) => {
                        return dossier.nature == this.filter.nature;
                    });
            }
        },
        mounted() {
            //get all dossiers from api
            //all dossier par
            axios.get('/api/dossier/joinpar')
            .then((response) => {
                response.data.dossiers.forEach((dossier) => {
                    dossier.type = 'par';
                    this.dossiers.push(dossier);
                });
            
                //all dossier so
                axios.get('/api/dossier/joinso')
                .then((response) => {
                    response.data.dossiers.forEach((dossier) => {
                        dossier.type = 'so';
                        this.dossiers.push(dossier);
                    });
                    //filter
                    this.onFilter();
                    console.log(this.dossiers);
                });
            });
        }
    }
</script>

<style>

    .dossiers-container {
        display: flex;
        height:100vh;
    }

    .dossiers{
        flex: auto;
        margin: 0;
        padding: 0.7cm;
        padding-top: 2cm;
    }

</style>