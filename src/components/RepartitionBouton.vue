<template>
    <v-btn
            id="repartitionBouton"
            :to="aiguillage"
            block
            color="indigo lighten-3"

    >{{texte}}</v-btn>
</template>

<script>
    export default {
        name: "RepartitionBouton.vue",
        props: {
            lien: {
                type: String,
                required: true
            },
            texte: {
                type: String,
                required: true
            }
        },
        computed: {
            aiguillage() {
                return '/' + this.lien
            }
        }
    }
</script>

<style scoped>
    #repartitionBouton {
        height: 200px;
        width: 200px;
        vertical-align: middle;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 60px;
    }
</style>