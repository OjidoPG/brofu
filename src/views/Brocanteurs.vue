<template>
    <div>
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
                                            <v-text-field v-model="editedItem.telephone"
                                                          label="Téléphone"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="editedItem.mail" label="E-mail"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="editedItem.adresse" label="Adresse"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="editedItem.codepostal"
                                                          label="Code Postal"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="editedItem.ville" label="Ville"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12" v-if="editedItem.emplacement">
                                            <v-text-field v-model="editedItem.emplacement" label="Emplacement actuel"
                                                          disabled></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-select
                                                    v-model="editedItem.emplacements_id"
                                                    :items="emplacementsListe"
                                                    item-text="texte"
                                                    item-value="id"
                                                    label="Emplacements disponibles"
                                                    required
                                            ></v-select>
                                        </v-col>
                                        <div hidden v-model="editedItem.id"></div>
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
        <v-btn
                color="error"
                class="md-3 offset-md-3 mt-5"
                @click="goAccueil"
        >
            ACCUEIL
        </v-btn>

        <v-btn
                color="success"
                class="md-3 offset-md-4 mt-5"
                @click="goAdmin"
        >
            ADMINISTRATION
        </v-btn>
    </div>
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
                {text: 'Emplacement', value: 'emplacement'},
                {text: 'Actions', value: 'action', sortable: false}
            ],
            brocanteurs: [],
            editedIndex: -1,
            emplacementsListe: [],
            editedItem: {
                nom: '',
                prenom: '',
                telephone: '',
                mail: '',
                adresse: '',
                codepostal: '',
                ville: '',
                emplacement: '',
                id:''
            },
            defaultItem: {
                nom: '',
                prenom: '',
                telephone: '',
                mail: '',
                adresse: '',
                codepostal: '',
                ville: '',
                emplacement: ''
            },
        }),
        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            this.initialize();
            this.appelEmplacements();
        },

        methods: {
            initialize() {
                this.brocanteurs = []
                this.$http.get('clients/getAllClients')
                    .then(response => {
                        this.brocanteurs = response.data.liste
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
                let formData = new FormData();
                formData.append("nom", this.editedItem.nom);
                formData.append("prenom", this.editedItem.prenom);
                formData.append("telephone", this.editedItem.telephone);
                formData.append("mail", this.editedItem.mail);
                formData.append("adresse", this.editedItem.adresse);
                formData.append("codepostal", this.editedItem.codepostal);
                formData.append("ville", this.editedItem.ville);
                formData.append("emplacements_id", this.editedItem.emplacements_id);
                formData.append("id", this.editedItem.id)

                this.$http.post('clients/postClients', formData)
                    .then(response => {
                        this.messages = []
                        if (response.data['Erreurs']) {
                            if (response.data['Erreurs'][0]['Type'] === "Uniqueness") {
                                this.uniqueness(response.data['Erreurs'][0]['Message'])
                                this.messages = ''
                            } else {
                                this.messages = response.data['Erreurs']
                                for (let i = 0; this.messages.length; i++) {
                                    switch (this.messages[i]['Field']) {
                                        case 'nom':
                                            this.formError.nomError = true
                                            break;
                                        case 'prenom':
                                            this.formError.prenomError = true
                                            break;
                                        case 'telephone':
                                            this.formError.telephoneError = true
                                            break;
                                        case 'mail':
                                            this.formError.mailError = true
                                            break;
                                        case 'adresse':
                                            this.formError.adresseError = true
                                            break;
                                        case 'ville':
                                            this.formError.villeError = true
                                            break;
                                        case 'emplacements_id':
                                            this.formError.emplacements_idError = true
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                        }
                        if (response.data['Success']) {
                            this.reussite(response.data['Success'][0]['Message']);
                        }
                    })

                if (this.editedIndex > -1) {
                    Object.assign(this.brocanteurs[this.editedIndex], this.editedItem)
                } else {
                    this.brocanteurs.push(this.editedItem)
                }
                this.close()
            },
            reussite(messageReussite) {
                this.appelEmplacements();
                this.$toast(messageReussite, {
                    color: 'success',
                    icon: 'fas fa-check-circle'

                })
                this.reset()
            },
            appelEmplacements() {
                this.emplacements = [];
                this.$http.get('emplacements/getEmplacementsNonOccupe')
                    .then(response => {
                        this.emplacementsListe = response.data.liste
                    })
            },
            goAccueil() {
                this.$router.push('/');
            },
            goAdmin() {
                this.$router.push('/Administration');
            }

        }
    }
</script>