<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="emplacements"
                sort-by="emplacements.numero"
                class="elevation-1"
        >
            <template v-slot:top>
                <v-form
                        ref="form"
                        lazy-validation
                >
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
                                                <v-text-field
                                                        v-model="editedItem.numero"
                                                        label="Numéro"
                                                        required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field
                                                        v-model="editedItem.taille"
                                                        label="Taille"
                                                        required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field
                                                        v-model="editedItem.prix"
                                                        label="Prix"
                                                        required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field
                                                        v-model="editedItem.paye"
                                                        label="Payé"
                                                        required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field
                                                        v-model="editedItem.occupe"
                                                        label="Occupé"
                                                        required
                                                ></v-text-field>
                                            </v-col>
                                            <input hidden v-model="editedItem.id"/>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="error"
                                            @click="close"
                                    >Annulation
                                    </v-btn>
                                    <v-btn
                                            color="success"
                                            @click="save"
                                    >Sauvegarder
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </v-form>
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
                {text: 'Numéro', align: 'left', sortable: true, value: 'numero',},
                {text: 'Taille', value: 'taille'},
                {text: 'Prix', value: 'prix'},
                {text: 'Payé', value: 'paye'},
                {text: 'Occupé', value: 'occupe'},
                {text: 'Actions', value: 'action', sortable: false}
            ],
            emplacements: [],
            messages: [],
            editedIndex: -1,
            editedItem: {
                numero: '',
                taille: '',
                prix: '',
                paye: '',
                occupe: '',
                id: ''
            },
            defaultItem: {
                numero: '',
                taille: '',
                prix: '',
                paye: '',
                occupe: '',
            }
        }),
        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            this.initialize();
        },

        methods: {
            initialize() {
                this.loadEmplacements();
            },
            loadEmplacements() {
                this.emplacements = [];
                this.$http.get('emplacements/getAllEmplacements')
                    .then(response => {
                        this.emplacements = response.data.liste
                    })
            },
            editItem(item) {
                this.editedIndex = this.emplacements.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.emplacements.indexOf(item)
                confirm('Etes-vous sur de vouloir supprimer cet emplacements ?') && this.emplacements.splice(index, 1)
                let formDataDelete = new FormData();
                formDataDelete.append('idEmplacement', item.emplacements_id);
                this.$http.post('emplacements/postDeleteEmplacements', formDataDelete)
                    .then(response => {
                        this.messages = [];
                        if (response.data['Success']) {
                            this.reussite(response.data['Success'][0]['Message']);
                        } else {
                            this.messages = [];
                            this.echec();
                        }
                    });
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
                formData.append("numero", this.editedItem.numero);
                formData.append("taille", this.editedItem.taille);
                formData.append("prix", this.editedItem.prix);
                formData.append("paye", this.editedItem.paye);
                formData.append("occupe", this.editedItem.occupe);
                formData.append("id", this.editedItem.id)

                this.$http.post('emplacements/postEmplacements', formData)
                    .then(response => {
                        this.messages = [];
                        if (response.data['Success']) {
                            this.reussite(response.data['Success'][0]['Message']);
                        } else {
                            this.messages = [];
                            this.echec();
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
                this.loadEmplacements();
                this.$toast(messageReussite, {
                    color: 'success',
                    icon: 'fas fa-check-circle'
                })
                this.reset()
            },
            echec() {
                this.$toast('Une erreur s\'est produit', {
                    color: 'error',
                    icon: 'fas fa-check-circle'
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