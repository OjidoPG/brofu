<template>
    <v-container>
        <v-layout align-center wrap>
            <v-flex md-5>
                <repartition-bouton
                        lien="brocanteurs"
                        texte="Gestion des brocanteurs"
                >
                </repartition-bouton>
            </v-flex>
            <v-flex md-5 offset-md-2>
                <repartition-bouton
                        lien="emplacements"
                        texte="Gestion des emplacements"
                >
                </repartition-bouton>
            </v-flex>
        </v-layout>
        <v-layout align-center wrap>
            <v-flex md-6>
                <repartition-bouton
                        lien="finances"
                        texte="Gestion des finances"
                >
                </repartition-bouton>
            </v-flex>
            <v-flex md-5 offset-md-2>
                <repartition-bouton
                        lien="administrateurs"
                        texte="Gestion des administrateurs"
                >
                </repartition-bouton>
            </v-flex>
        </v-layout>
        <v-layout align-center wrap>
            <v-flex md-2>
                <v-btn class="bntAdmin">ACCUEIL</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import RepartitionBouton from '@/components/RepartitionBouton'

    export default {
        name: "Administration.vue",
        components: {
            RepartitionBouton
        }
    }
</script>

<style>
    .bntAdmin {
        margin-top: 60px;
    }
</style>