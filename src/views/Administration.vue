<template>
    <v-container>
        <v-row class="md-12">
            <v-col cols="3 offset-2">
                <repartition-bouton
                        lien="brocanteurs"
                        texte="Gestion des brocanteurs"
                >
                </repartition-bouton>
            </v-col>
            <v-col cols="3 offset-2">
                <repartition-bouton
                        lien="emplacements"
                        texte="Gestion des emplacements"
                >
                </repartition-bouton>
            </v-col>
        </v-row>
        <v-row class="md-12">
            <v-col cols="3 offset-2">
                <repartition-bouton
                        lien="finances"
                        texte="Gestion des finances"
                >
                </repartition-bouton>
            </v-col>
            <v-col cols="3 offset-2">
                <repartition-bouton
                        lien="administrateurs"
                        texte="Gestion des administrateurs"
                >
                </repartition-bouton>
            </v-col>
        </v-row>
        <v-row class="md-12 text-center">
            <v-col>
                <v-btn
                        class="bntAdmin"
                        color="error"
                        @click="retourAccueil"
                >ACCUEIL
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import RepartitionBouton from '@/components/RepartitionBouton'

    export default {
        name: "Administration.vue",
        components: {
            RepartitionBouton
        },
        methods:{
            retourAccueil(){
                this.$router.push('/');
            }
        },
        beforeCreate : function () {
           if (!sessionStorage.getItem('admin')){
               this.$router.push('/');
           }
        }
    }
</script>

<style>
    .bntAdmin {
        margin-top: 60px;
    }
</style>