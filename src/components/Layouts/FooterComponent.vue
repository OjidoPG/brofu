<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
</template>

<script>
    // noinspection JSUnusedGlobalSymbols
    export default {
        data: () => ({
            sheet: false,
        }),
        methods:{
            routeInscription() {
                this.$router.push('/Inscription');
            }
        }
    }
</script>