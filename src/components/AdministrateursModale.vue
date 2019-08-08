<template>
    <v-layout justify-center>
        <v-dialog v-model="dialog" persistent max-width="300px">
            <v-card>
                <v-card-title>
                    <span class="headline">Administrateurs</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex md12>
                                <v-text-field label="Identifiant" required></v-text-field>
                            </v-flex>
                            <v-flex md12>
                                <v-text-field label="Mot de passe" type="password" required></v-text-field>
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
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        name: "AdministrateursModale.vue",
        props:{
            dialog: {
                type:Boolean,
                default:false
            }
        },
        methods : {
            closeModale(){
                this.dialog = false;
            },
            saveAdmin(){
                alert('save')
            }
        }
    }
</script>

<style scoped>

</style>