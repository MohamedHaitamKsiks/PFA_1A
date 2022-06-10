<script setup>
    import axios from 'axios';
    import { useRoute, RouterLink } from 'vue-router';
    import DocumentCard from '../components/DocumentCard.vue';
    import DossierSection from '../components/DossierSection.vue';
    import router from '../router';
    import DocumentPopup from '../components/DocumentPopup.vue';
</script>


<template>
    <div class="dossier-edit-container">
        <!--client-->
        <DossierSection wait="0">
            <h2>
                Client : {{ dossierClient }}
                <span style="opacity: 70%">( {{ dossierType }} ) </span>
            </h2>

            <div class="dossier-edit-input-container">
                <div class="dossier-edit-label">Type du client :</div>
                <select class="choice-input" v-model="dossier.client.type" :disabled="!create">
                    <option value="par">Particulier</option>
                    <option value="so">Societe</option>
                </select>
            </div>

            <div class="dossier-edit-input-container">
                <div class="dossier-edit-label">Nom du client :</div>
                <!--particuliers-->
                <select v-if="dossier.client.type == 'par'" class="choice-input" v-model="selectedParticulier"
                    :disabled="!create">
                    <option v-for="particulier in particuliers" :value="particulier.id">
                        {{ particulier.nom }}
                        {{ particulier.prenom }}
                    </option>
                </select>
                <!--societes-->
                <select v-else class=" choice-input" v-model="selectedSociete" :disabled="!create">
                    <option v-for="societe in societes" :value="societe.id">
                        {{ societe.nom }}
                    </option>
                </select>
            </div>
        </DossierSection>

        <!--accident-->
        <DossierSection wait="1">
            <h2> Details de l'accident : </h2>

            <div class="dossier-edit-input-container">
                <div class="dossier-edit-label">Nature de l'accident :</div>
                <select class="choice-input" v-model="dossier.nature">
                    <option value="voiture">Accident de voiture</option>
                    <option value="travail">Accident de travail</option>
                </select>
            </div>

            <div class="dossier-edit-input-container">
                <div class="dossier-edit-label">Description du sinistre : </div>
                <textarea v-model="dossier.info" class="dossier-edit-textarea" rows="10"
                    placeholder="Inserez la description du sinistre ..."></textarea>
            </div>
        </DossierSection>

        <!--documents-->
        <DossierSection v-if="!create" wait="2">
            <h2>
                Documents du dossier :
                <button class="btn btn-edit" @click="addDocument"> Ajouter un document </button>
            </h2>
            <DocumentCard v-for="document in documents" :type="document.nature" :chemin="document.chemin"
                @show-document="onShowDocument" />
        </DossierSection>

        <DossierSection v-else>
            <div class="dossier-warning">
                Le dossier n'a pas encore ete creer. <br />
                Sauvegarder Pour pouvoir ajouter des documents
            </div>
        </DossierSection>

        <!--save button-->
        <button v-if="create" class="btn btn-login" @click="onCreate">Ajouter</button>
        <button v-else class="btn btn-login" @click="onEdit">Sauvegarder</button>
    </div>

    <DocumentPopup ref="createPopup" :dossier=" {id: dossier.id, type: dossier.client.type} " :create="true"
        @update-documents="getDocuments" />
    <DocumentPopup ref="viewPopup" :dossier=" {id: dossier.id, type: dossier.client.type} " :create="false"
        @update-documents="getDocuments" />

</template>

<script>
    export default {
        props: {
            create: { 
                Type: Boolean, 
                default: false
            },
        },
        data () {
            return {
                dossier: {
                    id: -1,
                    client: {
                        type: 'par',
                        id: -1
                    },
                    nature: 'voiture',
                    info: ''
                },
                particuliers: [],
                selectedParticulier: -1,
                societes: [],
                selectedSociete: -1,
                documents: []
                
            }
        },
        methods: {
            //create dossier
            onCreate() {
                this.dossier.client.id = (this.dossier.client.type == 'so') ? this.selectedSociete : this.selectedParticulier;
                //send request
                let requestBody = {
                    dossier: this.dossier,
                }
                axios.post('/api/dossier/create', requestBody)
                .then((response) => {
                    if (response.data.connected) 
                        router.push('/');
                    else
                        router.push('/login');
                    
                });
            },
            //edit dossier
            onEdit() {
                let requestBody = {
                    dossier: this.dossier,
                }
                axios.post('/api/dossier/edit', requestBody)
                .then((response) => {
                    router.push('/');
                });
            },
            //add document
            addDocument() {
                this.$refs.createPopup.show();
            },
            // get all documents
            getDocuments() {
                console.log('/api/document/' + this.dossier.client.type + '/' + this.dossier.id);
                axios.get('/api/document/' + this.dossier.client.type + '/' + this.dossier.id)
                .then((response) => {
                    this.documents = response.data.documents;
                    console.log(this.documents);
                });
            },
            //show document
            onShowDocument(type, chemin) {
                this.$refs.viewPopup.show(type, chemin);
            }
        },
        mounted() {
            console.log(this.create);
            //get all particuliers
            axios.get('/api/particulier/all')
            .then( (response) => {
                this.particuliers = response.data;
                console.log(this.particuliers);
            });
            //get all societes
            axios.get('/api/societe/all')
            .then((response) => {
                this.societes = response.data;
                console.log(this.societes);
            });
            
            //if on edit load data
            if (this.create) 
                return;
            let type = useRoute().params.type;
            let id = useRoute().params.id;
            axios.get('/api/dossier/' + type + '/' + id)
            .then((response) => {
                //load dossier
                let responseDossier = response.data.dossier;
                this.dossier = {
                    id: responseDossier.id,
                    client: {
                        type: type,
                        id: (type == 'so') ? responseDossier.ids : responseDossier.idp,
                    },
                    nature: responseDossier.nature,
                    info: responseDossier.info
                };
                //load selectedClient
                if (type == 'so')
                    this.selectedSociete = this.dossier.client.id;
               else
                    this.selectedParticulier = this.dossier.client.id;
                console.log(this.dossier);
                //get documents
                this.getDocuments();
            });
        
        },
        computed: {
            //get dossier type
            dossierType() {
                return (this.dossier.client.type == 'so') ? 'Societe' : 'Particulier';
            },
            //get dossier client's name
            dossierClient() {
                //get client id
                let clientId = (this.dossier.client.type == 'so') ? this.selectedSociete : this.selectedParticulier;
                //client list
                let clients = (this.dossier.client.type == 'so') ? this.societes : this.particuliers;
                console.log(clientId);

                //find client
                let index = clients.findIndex( (client) => {
                    return client.id == clientId;
                });
                //client name
                if (index < 0) return '';

                let clientName = clients[index].nom;
                clientName += (this.dossier.client.type == 'so') ? '' : ' ' + clients[index].prenom

                return clientName;
            }
        }
    }
</script>

<style>
    /* contains every things in the form */
    .dossier-edit-container {
        padding: 1cm;
        padding-top: 3cm;
    }

    /* contains input + label */

    .dossier-edit-input-container {
        margin: 0.5cm;
    }

    /*label */
    .dossier-edit-label {
       margin-bottom: 0.3cm;
       font-size: large;
    }

    /* text area for dossier.info */
    .dossier-edit-textarea {
        width: 100%;
        padding: 0.3cm;
        border-radius: 0.3cm;
        font-family: sans-serif;
        font-size: large;
    }

    /* dossier  */
    .dossier-warning {
        background-color: rgba(255, 153, 0, 0.413);
        margin: 0.2cm;
        padding: 0.2cm;
        border-style: solid;
        border-radius: 0.2cm;
        border-width: 1px;
        border-color: rgb(160, 65, 1);
        color: rgb(160, 65, 1);
    }

</style>