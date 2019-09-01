<template>
    <v-layout align-center justify-center row fill-height>
        <v-flex md6>
            <Carousel></Carousel>
        </v-flex>
    </v-layout>
</template>

<script>
    import Carousel from '../components/Carousel';

    // noinspection JSUnusedGlobalSymbols
    export default {
        name: "Accueil",
        components: {
            Carousel
        },
        beforeCreate : function () {
            sessionStorage.clear();
        }
    };
</script>