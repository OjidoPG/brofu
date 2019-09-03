<template>
    <v-layout justify-center>
        <v-dialog :value="value" @input="$emit('input', $event.target.value)" persistent max-width="300px">
            <v-card>
                <v-card-title>
                    <span class="headline">Administrateurs</span>
                </v-card-title>
                <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                >
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex md12>
                                    <v-text-field
                                            v-model="form.login"
                                            label="Identifiant"
                                            required>

                                    </v-text-field>
                                </v-flex>
                                <v-flex md12>
                                    <v-text-field
                                            v-model="form.mdp"
                                            label="Mot de passe"
                                            type="password"
                                            required>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-flex>
                            <v-btn small color="error" @click="closeModale">Fermer</v-btn>
                        </v-flex>
                        <v-flex>
                            <v-btn small color="success" @click="saveAdmin">Valider</v-btn>
                        </v-flex>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "AdministrateursModale.vue",
        data() {
            return {
                valid: true,
                select: null,
                form: {
                    login: 'admin',
                    mdp: 'admin'
                }
            }
        },
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            closeModale() {
                this.$emit('input', false);
            },
            saveAdmin() {
                if (this.$refs.form.validate()) {
                    let formData = new FormData();
                    formData.append("login", this.form.login);
                    formData.append("mdp", this.form.mdp);

                    this.$http.post('administrateurs/postAdmins', formData)
                        .then(response => {
                            if (response.data['Erreurs']) {
                                this.erreurs(response.data['Erreurs']['Message']);
                            }

                            if (response.data['Incomplet']) {
                                this.incomplet(response.data['Incomplet']['Message']);
                            }

                            if (response.data['Success']) {
                                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data['Success']['JWT'];
                                sessionStorage.setItem('JWT', response.data['Success']['JWT']);
                                this.$router.push('/Administration');
                            }
                        })
                }
            },
            reset() {
                this.$refs.form.reset()
            },
            erreurs(messageErreur) {
                this.$toast.error(messageErreur)
                this.reset()
            },
            incomplet(messageIncomplet) {
                this.$toast.warning(messageIncomplet)
                this.reset()
            }
        }
    }
</script>