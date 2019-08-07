<template>
    <v-app id="inspire">
        <div>
            <v-app-bar
                    color="light-blue darken-3"
                    dark
                    height="100"
            >
                <div class="col-md-10 offset-md-1 text-center font-weight-bold">
                    <v-toolbar-title class="title">BROCANTE D'EULMONT</v-toolbar-title>
                </div>
                <div class="col-md-1 text-md-right">
                    <v-menu>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                                    v-for="option in options"
                                    :key="option.message"
                                    @click="aiguillage(option.message)"
                            >
                                <v-list-item-title>{{ option.message }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-app-bar>
        </div>

        <v-content>
            <slot></slot>
        </v-content>

        <div class="text-center">
            <v-bottom-sheet v-model="sheet">
                <template v-slot:activator="{ on }">
                    <v-btn
                            color="purple"
                            dark
                            v-on="on"
                    >
                        Inscription
                    </v-btn>
                </template>
                <v-sheet class="text-center" height="200px">
                    <v-btn
                            class="mt-6"
                            flat
                            color="green"
                            @click="routeInscription()"
                    >Je m'inscris
                    </v-btn>
                    <div>
                        <br>
                        La brocante aura lieu le samedi 8 mai dans la commune de Eulmont.<br>
                        Toute inscription devra être validée par les organisateurs.<br>
                        Vous en serez averti par e-mail
                    </div>
                </v-sheet>
            </v-bottom-sheet>
        </div>
    </v-app>
</template>

<script>
    export default {
        name: "AccueilLayout",
        data() {
            return {
                options: [
                    {message: 'Nous rejoindre'},
                    {message: 'Administrateurs'}
                ],
                sheet: false,
            }
        },
        methods: {
            aiguillage(data) {
                switch (data) {
                    case 'Nous rejoindre' :
                        alert('Nous rejoindre');
                        break;
                    case'Administrateurs':
                        alert('Administrateurs');
                        break;
                    default:
                        alert('Default');
                        break;
                }
            },
            routeInscription() {
                this.$router.push('/Inscription');
            }
        }
    };
</script>