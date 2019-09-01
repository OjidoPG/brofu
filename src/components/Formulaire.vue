<template>
    <v-form
            ref="form"
            v-model="valid"
            lazy-validation
    >
        <v-text-field
                v-model="form.nom"
                :counter="15"
                :rules="nameRules"
                label="Nom"
                required
        ><p v-if="formError.nomError" class="validateForm">Corrigez le nom</p></v-text-field>

        <v-text-field
                v-model="form.prenom"
                :counter="15"
                :rules="nameRules"
                label="Prenom"
                required
        ><p v-if="formError.prenomError" class="validateForm">Corrigez le prénom</p></v-text-field>

        <v-text-field
                v-model="form.telephone"
                :counter="10"
                :rules="telephoneRules"
                label="Telephone"
                required
        ></v-text-field>
        <p v-if="formError.telephoneError" class="validateForm">Corrigez le numéro de téléphone</p>

        <v-text-field
                v-model="form.mail"
                :rules="emailRules"
                label="E-mail"
                required
        ></v-text-field>
        <p v-if="formError.mailError" class="validateForm">Corrigez l'e-mail</p>

        <v-text-field
                v-model="form.adresse"
                :counter="30"
                :rules="adresseRules"
                label="Adresse"
                required
        ></v-text-field>
        <p v-if="formError.adresseError" class="validateForm">Corrigez l'adresse</p>

        <v-text-field
                v-model="form.codepostal"
                :counter="5"
                :rules="cpRules"
                label="Code Postal"
                required
        ></v-text-field>
        <p v-if="formError.codepostalError" class="validateForm">Corrigez le code postal</p>

        <v-text-field
                v-model="form.ville"
                :counter="15"
                :rules="nameRules"
                label="Ville"
                required
        ></v-text-field>
        <p v-if="formError.villeError" class="validateForm">Corrigez la ville</p>
        <v-select
                v-model="form.emplacements_id"
                :items="emplacements"
                item-text="texte"
                item-value="id"
                label="Emplacements disponibles"
                required
        ></v-select>
        <p v-if="formError.emplacements_idError" class="validateForm">Corrigez l'emplacement</p>

        <v-btn
                color="error"
                class="md-3 mt-5"
                @click="annulation"
        >
            ACCUEIL
        </v-btn>

        <v-btn
                color="warning"
                class="md-3 offset-md-1 mt-5"
                @click="reset"
        >
            RECOMMENCER
        </v-btn>

        <v-btn
                :disabled="!valid"
                color="success"
                class="md-3 offset-md-1 mt-5"
                @click="validation"
        >
            VALIDATION
        </v-btn>
    </v-form>
</template>

<script>
    export default {
        data: () => ({
                valid: true,
                nameRules: [
                    v => !!v || 'Le nom est requis',
                    v => (v && v.length >= 3) || 'Doit faire plus de 3 caractères',
                    v => (v && v.length <= 15) || 'Ne doit pas faire plus de 15 caractères',
                    v => /^[a-zA-Zéèâùï -]+$/.test(v) || 'Le nom doit être valide',
                ],
                telephoneRules: [
                    v => !!v || 'Le téléphone est requis',
                    v => (v && v.length == 10) || 'Le numéro doit faire 10 chiffres',
                    v => /^0[1-9][0-9]{8}$/.test(v) || 'Le téléphone doit être valide',
                ],
                emailRules: [
                    v => !!v || 'Un e-mail est requis',
                    v => /.+@.+\..+/.test(v) || 'L\'e-mail doit être valide',
                ],
                adresseRules: [
                    v => !!v || 'Une adresse est requise',
                    v => (v && v.length >= 10) || 'Doit faire plus de 10 caractères',
                    v => (v && v.length <= 30) || 'Ne doit pas faire plus de 30 caractères '
                ],
                cpRules: [
                    v => !!v || 'Le Code Postal est requis',
                    v => (v && v.length == 5) || 'Le Code Postal doit faire 5 chiffres',
                    v => /^[0-9][1-9][0-9]{3}$/.test(v) || 'Le Code Postal doit être valide',
                ],
                select: null,
                form: {
                    nom: 'toto',
                    prenom: 'toto',
                    telephone: '0123456789',
                    mail: 'kk@kk.kk',
                    adresse: 'kkkkkkkkkk',
                    codepostal: '54000',
                    ville: 'nancy',
                    emplacements_id: ''
                },
                formError: {
                    nomError: false,
                    prenomError: false,
                    telephoneError: false,
                    mailError: false,
                    adresseError: false,
                    codepostalError: false,
                    villeError: false,
                    emplacements_idError: false
                },
                emplacements: [],
                messages: [],
                success: false,
                error: false
            }
        ),
        methods: {
            validation() {
                if (this.$refs.form.validate()) {
                    let formData = new FormData();
                    formData.append("nom", this.form.nom);
                    formData.append("prenom", this.form.prenom);
                    formData.append("telephone", this.form.telephone);
                    formData.append("mail", this.form.mail);
                    formData.append("adresse", this.form.adresse);
                    formData.append("codepostal", this.form.codepostal);
                    formData.append("ville", this.form.ville);
                    formData.append("emplacements_id", this.form.emplacements_id);

                    this.$http.post('api/postClients', formData)
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
                }
            }
            ,
            reset() {
                this.$refs.form.reset()
            }
            ,
            annulation() {
                this.$router.push('/');
            }
            ,
            appelEmplacements() {
                this.emplacements = [];
                this.$http.get('api/getEmplacementsNonOccupe')
                    .then(responseEmpl => {
                        this.emplacements = responseEmpl.data.liste
                    })
            },
            uniqueness(messageErreur) {
                this.$toast(messageErreur, {
                    color: 'error',
                    icon: 'fas fa-exclamation-circle'

                })
                this.reset()
            },
            reussite(messageReussite) {
                this.appelEmplacements();
                this.$toast(messageReussite, {
                    color: 'success',
                    icon: 'fas fa-check-circle'

                })
                this.reset()
            }
        },
        created() {
            this.appelEmplacements();
        }
    }
</script>
<style>
    .validateForm {
        color: red;
        font-size: small;
    }
</style>