
<template>
    <div class="document-card" @click="onClick">
        <img :src="'/api/document/image/images/' + chemin" class="document-card-image" />
        <div class="document-card-footer">
            {{ typeDocument[type] }}
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            type: String,
            chemin: String
        },
        emits: ['show-document'],
        //type du documents
        data() {
            return {
                typeDocument: {
                    'pv': 'PV de police',
                    'photos': 'Photos',
                    'med': 'Visite medicale',
                    'contrmed': 'Contre Visite Medicale',
                    'autre': 'Autre'
                },
            }
        },
        methods: {
            onClick() {
                this.$emit('show-document', this.type, this.chemin);
            }
        }
    }
</script>

<style>
    .document-card {
        width: 6cm;
        height: 7cm;
        display: inline-block;
        margin: 0.3cm;
        background-color: rgb(32, 36, 50);
        border-radius: 0.5cm;
        box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.336);
        overflow: hidden;
        transition: all 0.3s;
    }

    .document-card:hover{
        cursor: pointer;
        transform: translateY(-0.4cm);
    }

    .document-card-image {
        width: 6cm;
        height: 5.5cm;
        object-fit: cover;
    }

    .document-card-footer {
        padding: 0.2cm;
        text-align: center;
        color: white;
        font-weight: bold;
    }

</style>