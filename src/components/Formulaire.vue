<template>
    <v-form
            ref="form"
            v-model="valid"
            lazy-validation
    >

        <v-text-field
                v-model="nom"
                :counter="15"
                :rules="nameRules"
                label="Nom"
                required
        ></v-text-field>

        <v-text-field
                v-model="prenom"
                :counter="15"
                :rules="nameRules"
                label="Prenom"
                required
        ></v-text-field>

        <v-text-field
                v-model="telephone"
                :counter="10"
                :rules="telephoneRules"
                label="Telephone"
                required
        ></v-text-field>

        <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
        ></v-text-field>

        <v-text-field
                v-model="adresse"
                :counter="30"
                :rules="adresseRules"
                label="Adresse"
                required
        ></v-text-field>

        <v-text-field
                v-model="codepostal"
                :counter="5"
                :rules="cpRules"
                label="Code Postal"
                required
        ></v-text-field>

        <v-text-field
                v-model="ville"
                :counter="15"
                :rules="nameRules"
                label="Ville"
                required
        ></v-text-field>

        <v-select
                v-model="select"
                :items="items"
                :rules="[v => !!v || 'Vous devez choisir un emplacement']"
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
    </v-form>
</template>

<script>
    export default {
        name: "Formulaire.vue",
        data: () => ({
            valid: true,
            nom: '',
            prenom: '',
            nameRules: [
                v => !!v || 'Le nom est requis',
                v => (v && v.length >= 3) || 'Doit faire plus de 3 caractères',
                v => (v && v.length <= 15) || 'Ne doit pas faire plus de 15 caractères',
                v => /^[A-Zazéèê-]+$/.test(v) || 'Le nom doit être valide',
            ],
            email: '',
            telephone: '',
            telephoneRules: [
                v => !!v || 'Le téléphone est requis',
                v => (v && v.length == 10) || 'Le numéro doit faire 10 chiffres',
                v => /^0[1-9][0-9]{8}$/.test(v) || 'Le téléphone doit être valide',
            ],
            emailRules: [
                v => !!v || 'Un e-mail est requis',
                v => /.+@.+\..+/.test(v) || 'L\'e-mail doit être valide',
            ],
            adresse:'',
            adresseRules:[
                v => !!v || 'Une adresse est requise',
                v => (v && v.length >= 10) || 'Doit faire plus de 10 caractères',
                v => (v && v.length <= 30) || 'Ne doit pas faire plus de 30 caractères '
            ],
            codepostal: '',
            cpRules: [
                v => !!v || 'Le Code Postal est requis',
                v => (v && v.length == 5) || 'Le Code Postal doit faire 5 chiffres',
                v => /^[0-9][1-9][0-9]{3}$/.test(v) || 'Le Code Postal doit être valide',
            ],
            ville: '',
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
            ]
        }),
        methods: {
            validation() {
                alert('faire appel api')

            },
            reset() {
                this.$refs.form.reset()
            },
            annulation() {
                this.$router.push('/');
            },
        },
    }
</script>

<style scoped>

</style>