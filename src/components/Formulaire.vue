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
        ></v-text-field>

        <v-text-field
                v-model="form.prenom"
                :counter="15"
                :rules="nameRules"
                label="Prenom"
                required
        ></v-text-field>

        <v-text-field
                v-model="form.telephone"
                :counter="10"
                :rules="telephoneRules"
                label="Telephone"
                required
        ></v-text-field>

        <v-text-field
                v-model="form.mail"
                :rules="emailRules"
                label="E-mail"
                required
        ></v-text-field>

        <v-text-field
                v-model="form.adresse"
                :counter="30"
                :rules="adresseRules"
                label="Adresse"
                required
        ></v-text-field>

        <v-text-field
                v-model="form.codepostal"
                :counter="5"
                :rules="cpRules"
                label="Code Postal"
                required
        ></v-text-field>

        <v-text-field
                v-model="form.ville"
                :counter="15"
                :rules="nameRules"
                label="Ville"
                required
        ></v-text-field>

        <v-select
                v-model="form.emplacements_id"
                :items="emplacements"
                item-text="texte"
                item-value="valeur"
                :rules="[v => !!v || 'Veuillez choisir un emplacement']"
                label="Emplacements disponibles"
                required
        ></v-select>

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
        <snack-bar
                v-model="snackbarTest"
                :icon="icon"
                :textsnackbar='textsnackbar'
                :color="color"
        ></snack-bar>
    </v-form>
</template>

<script>
    import SnackBar from '@/components/SnackBar.vue'

    export default {
        components: {
            SnackBar
        },
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
                emplacements: [],
                messages: [],
                success: false,
                error: false,
                snackbarTest: false,
                icon: '',
                textsnackbar: '',
                color: ''
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
                            if (response.data['erreurs']) {
                                if (response.data['erreurs'][0]['Type'] === "Uniqueness") {
                                    this.uniqueness()
                                } else {
                                    this.jserror()
                                }
                            } else {
                                this.reussite();
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
                this.$http.get('api/getEmplacements')
                    .then(response => {
                        response.data.liste.forEach(item => {
                            this.emplacements.push({
                                valeur: item.id,
                                texte: "Emplacement numéro : " + item.numero +
                                    " - taille : " + item.taille +
                                    " - prix : " + item.prix + " euros"
                            })
                        })
                    })
            },
            uniqueness() {
                this.textsnackbar = "Vous êtes déjà enregistré";
                this.icon = "fas fa-ban"
                this.color = "error";
                this.snackbarTest = true;
                this.reset()
            },
            reussite() {
                this.appelEmplacements();
                this.textsnackbar = "Vous êtes enregistré";
                this.icon = "fas fa-check-circle"
                this.color = "success";
                this.snackbarTest = true;
                this.reset()
            },
            jserror() {
                this.textsnackbar = "Erreur JavaScript, contactez les administrateurs";
                this.icon = "fas fa-user-ninja"
                this.color = "warning";
                this.snackbarTest = true;
                this.reset()
            }
        },
        created() {
            this.appelEmplacements();
        }
    }

</script>