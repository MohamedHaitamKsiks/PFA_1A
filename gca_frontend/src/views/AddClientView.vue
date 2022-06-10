<script setup>
    import axios from 'axios';
    import DossierSection from '../components/DossierSection.vue';
import router from '../router';
</script>

<template>
    <div class="client-container">
        <!--type client-->
        <DossierSection wait="0">
            <h2>
                Type du clientClient :
            </h2>

            <div class="dossier-edit-input-container">
                <select class="choice-input" v-model="clientType">
                    <option value="par">Particulier</option>
                    <option value="so">Societe</option>
                </select>
            </div>
        </DossierSection>

        <!--particulier-->
        <DossierSection v-if="clientType == 'par'" wait="1">
            <h2> Inforamtion sur le client : </h2>

            <div class="dossier-edit-input-container">
                <div class="dossier-edit-label">Nom : </div>
                <input v-model="particulier.nom" type="text" class="text-input"
                    placeholder="Inserez le nom du client" />
            </div>

            <div class="dossier-edit-input-container">
                <div class="dossier-edit-label">Prenom : </div>
                <input v-model="particulier.prenom" type="text" class="text-input"
                    placeholder="Inserez le prenom du client" />
            </div>

            <div class="dossier-edit-input-container">
                <div class="dossier-edit-label">CIN : </div>
                <input v-model="particulier.cin" type="text" class="text-input"
                    placeholder="Inserez le CIN du client" />
            </div>

            <button class="btn btn-login" @click="ajouterParticulier"> Ajouter</button>
        </DossierSection>

        <DossierSection v-else wait="1">
            <h2> Inforamtion sur le client : </h2>

            <div class="dossier-edit-input-container">
                <div class="dossier-edit-label">Nom de la societe : </div>
                <input v-model="societe.nom" type="text" class="text-input"
                    placeholder="Inserez le nom de la societe" />
            </div>

            <div class="dossier-edit-input-container">
                <div class="dossier-edit-label">Matricule : </div>
                <input v-model="societe.matricule" type="text" class="text-input"
                    placeholder="Inserez le nom de le matricule" />
            </div>

            <button class="btn btn-login" @click="ajouterSociete"> Ajouter</button>
        </DossierSection>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                clientType: 'par',
                particulier: {
                    nom: '',
                    prenom: '',
                    cin: ''
                },
                societe: {
                    nom: '',
                    matricule: ''
                }
            }
        },
        methods: {
            ajouterParticulier() {
                let requestBody = {
                    particulier: this.particulier
                };
                axios.post('/api/particulier/create', requestBody)
                .then((response) => {
                    router.push('/');
                });
            },
            ajouterSociete() {
                let requestBody = {
                    societe: this.societe
                };
                axios.post('/api/societe/create', requestBody)
                .then((response) => {
                    router.push('/');
                });
            }
        }
    }
</script>

<style>
    .client-container {
        padding: 0.5cm;
        padding-top: 3cm;
    }
</style>