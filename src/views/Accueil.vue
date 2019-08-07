<template>
    <div>
        <!-- Corps de l'Accueil -->
<v-container grid-list-md text-center>
    <v-layout wrap>
        <v-flex md-4 offset-4>
            <Carousel></Carousel>
        </v-flex>
    </v-layout>


</v-container>






    </div>
</template>

<script>
    // import AccueilLayout from '@/layouts/AccueilLayout'
    // import BrocanteHeaderLayout from '@/layouts/BrocanteHeaderLayout';
    // import BrocanteFooterLayout from '@/layouts/BrocanteFooterLayout';
    import Carousel from '@/components/Carousel';

    export default {
        name: "Accueil",
        components: {
            // AccueilLayout
            // BrocanteHeaderLayout,
            // BrocanteFooterLayout,
            Carousel
        }
    };
</script>

<style>
    .carousel {
        margin-top: 70px;
    }
</style>