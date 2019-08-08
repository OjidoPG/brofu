<template>
    <v-form
            ref="form"
            v-model="valid"
            lazy-validation
    >
        <error-alert
        :error=false
        ></error-alert>
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
                :rules="[v => !!v || 'Veuillez choisir un emplacement']"
                label="Emplacements disponibles"
                required
        ></v-select>

        <v-btn
                color="error"
                class="md-3 mt-5"
                @click="annulation"
        >
            Annulation
        </v-btn>

        <v-btn
                color="warning"
                class="md-3 offset-md-1 mt-5"
                @click="reset"
        >
            Reinitialise
        </v-btn>

        <v-btn
                color="success"
                class="md-3 offset-md-1 mt-5"
                @click="validation"
        >
            Validation
        </v-btn>
        <success-alert
        :success=false
        ></success-alert>
    </v-form>
</template>

<script>
    import SuccessAlert from '@/components/alerte/SuccessAlert'
    import ErrorAlert from '@/components/alerte/ErrorAlert'

    export default {
        components: {
            SuccessAlert,
            ErrorAlert
        },
        data: () => ({
                valid: true,
                nameRules: [
                    v => !!v || 'Le nom est requis',
                    v => (v && v.length >= 3) || 'Doit faire plus de 3 caractères',
                    v => (v && v.length <= 15) || 'Ne doit pas faire plus de 15 caractères',
                    v => /^[A-Zazéèê-]+$/.test(v) || 'Le nom doit être valide',
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
                items: [
                    'Item 1',
                    'Item 2',
                    'Item 3',
                    'Item 4',
                ],
                form: {
                    nom: '',
                    prenom: '',
                    telephone: '',
                    mail: '',
                    adresse: '',
                    codepostal: '',
                    ville: '',
                    emplacements_id: ''
                },
                emplacements: [],
                messages: [],
                success:false,
                error:false
            }
        ),
        methods: {
            validation() {
                this.success=false;
                this.success=true;

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
                        this.messages = response.data;
                    })
            },
            reset() {
                this.$refs.form.reset()
            },
            annulation() {
                this.$router.push('/');
            },
            appelEmplacements() {
                this.emplacements = [];
                this.$http.get('api/getEmplacements')
                    .then(response => {
                        for (let i = 0; i < response.data.length; i++) {
                            this.emplacements.push(
                                "Emplacement numéro : " + response.data[i]['numero'] +
                                " - taille : " + response.data[i]['taille'] +
                                " - prix : " + response.data[i]['prix'] + " euros");
                        }
                    })
            }
        },
        created() {
            this.appelEmplacements();
        }
    }

</script>