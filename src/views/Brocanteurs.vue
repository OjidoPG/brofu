<template>
    <v-data-table
            :headers="headers"
            :items="brocanteurs"
            sort-by="brocanteurs.nom"
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="success" dark class="mb-2" v-on="on">Ajouter</v-btn>
                    </template>
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="editedItem.nom" label="Nom"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="editedItem.prenom" label="Prénom"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="editedItem.telephone" label="Téléphone"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="editedItem.mail" label="E-mail"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="editedItem.adresse" label="Adresse"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="editedItem.codepostal" label="Code Postal"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="editedItem.ville" label="Ville"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="editedItem.ville" label="Ville"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="close">Annulation</v-btn>
                            <v-btn color="success" @click="save">Sauvegarder</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
            >
                fas fa-edit
            </v-icon>
            <v-icon
                    small
                    @click="deleteItem(item)"
            >
                fas fa-trash-alt
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        data: () => ({
            dialog: false,
            headers: [
                {text: 'Nom', align: 'left', sortable: true, value: 'nom',},
                {text: 'Prénom', value: 'prenom'},
                {text: 'Téléphone', value: 'telephone'},
                {text: 'E-mail', value: 'mail'},
                {text: 'Adresse', value: 'adresse'},
                {text: 'Code Postal', value: 'codepostal'},
                {text: 'Ville', value: 'ville'},
                {text: 'Actions', value: 'action', sortable: false}
            ],
            brocanteurs: [],
            editedIndex: -1,
            editedItem: {
                nom: '',
                prenom: '',
                telephone: '',
                mail: '',
                adresse: '',
                codepostal:'',
                ville:'',
            },
            defaultItem: {
                nom: '',
                prenom: '',
                telephone: '',
                mail: '',
                adresse: '',
                codepostal:'',
                ville:'',
            },
        }),
        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            this.initialize()
        },

        methods: {
            initialize() {
                this.brocanteurs = []
                this.$http.get('api/getClients')
                    .then(response => {
                        this.brocanteurs=response.data.liste
                    })

            },

            editItem(item) {
                this.editedIndex = this.brocanteurs.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.brocanteurs.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.brocanteurs.splice(index, 1)
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.brocanteurs[this.editedIndex], this.editedItem)
                } else {
                    this.brocanteurs.push(this.editedItem)
                }
                this.close()
            },
        },
    }
</script>