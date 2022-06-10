<script setup>
    import axios from 'axios';


</script>


<template>
    <div class="document-popup-container" v-if="!hidden">
        <div class="document-popup">
            <div class="document-popup-header">
                Ajouter un document
            </div>

            <div class="document-popup-body">
                <div class="input-container">
                    <label style="width: 40%">Type du document : </label>
                    <select class="choice-input" v-model="document.nature" :disabled="!create">
                        <option v-for="(type, key) in typeDocument" :value="key">{{ type }}</option>
                    </select>
                </div>

                <div class="input-container" v-if="create">
                    <label style="width: 21%">Importer un ficher : </label>
                    <input type="file" @change="uploadFile" ref="imageFile" />
                </div>

                <img :src="imagePath" class="document-popup-image" />

            </div>

            <div class="document-popup-footer">
                <button class="btn btn-edit" v-if="create" @click="addDocument"> Ajouter </button>
                <button class="btn btn-delete" @click="hide"> Fermer </button>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            dossier: Object,
            create: Boolean,
        },
        expose: ['show', 'hide'],
        emits: ['update-documents'],
        data() {
            return {
                //document
                document: {
                    dossier: {
                        type: 'par',
                        id: -1
                    },
                    nature: '',
                    chemin: ''
                },
                //type du documents
                typeDocument: {
                    'pv': 'PV de police',
                    'photos': 'Photos',
                    'med': 'Visite medicale',
                    'contrmed': 'Contre Visite Medicale',
                    'autre': 'Autre'
                },
                imagePath: '/api/document/image/images/image-placeholder.png',
                hidden: true
            }
        },
        mounted() {
            this.document.dossier = this.dossier;
        },
        methods: {
            uploadFile(event) {
                //create form data
                let formData = new FormData();
                var imageFile = this.$refs.imageFile;
                formData.append("image", imageFile.files[0]);
                //upload data
                axios.post('/api/document/upload', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }).then((response) => {
                    this.imagePath = '/api/document/image/tmp/' + response.data.imageName;
                    this.document.chemin = response.data.imageName;
                });
            },
            //show and hide 
            show() {
                //
                this.document.dossier = this.dossier;
                //reset data
                this.document.chemin = '';
                this.document.nature = '';
                console.log('show')
                //show
                this.hidden = false;
            },
            hide() {
                this.hidden = true;
            },
            //add document
            addDocument() {
                let requestBody = {
                    document: this.document,
                }
                axios.post('/api/document/create', requestBody)
                .then((response) => {
                    this.hide();
                    this.$emit('update-documents');
                });
            }
        }
        
    }
</script>


<style>

    .document-popup-container {
        /* position */
        position: fixed;
        top:0;
        left: 0;
        z-index: 50000;
        /* background */
        width: 100%;
        height: 100%;
        /*  */
        background-color: rgba(0, 0, 0, 0.574);
    }

    .document-popup {
        /* position */
        position: fixed;
        top: 10%;
        left: 25%;
        /* background */
        width: 50%;
        height: 80%;
        background: white;
        /* border */
        border-radius: 0.5cm;
        overflow: hidden;
        /* transition */
        transition: all 0.5s;
        opacity: 100%;
        transform: scale(1);
    }

    .document-popup-hide {
        opacity: 0%;
        transform: scale(0);
    }

    .document-popup-header {
        padding: 0.4cm;
        color: white;
        background-color: rgb(25, 29, 36);
        font-weight: bolder;
        font-size: larger;
        text-align: center;
    }

    .document-popup-body{
        padding: 0.4cm;
        height: 75%;
    }

    .document-popup-footer {
        padding: 0.5cm;
    }

    .document-popup-image {
        width: 100%;
        height: 80%;
        object-fit: contain;
        
    }

</style>