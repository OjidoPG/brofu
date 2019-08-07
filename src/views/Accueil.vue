<template>
    <v-app id="inspire">
        <!-- Header Brocante -->
        <BrocanteHeaderLayout></BrocanteHeaderLayout>

        <!-- Corps de l'Accueil -->
        <v-content class="carousel">
            <Carousel></Carousel>
        </v-content>

        <!-- Footer  -->
        <v-footer>
            <BrocanteFooterLayout></BrocanteFooterLayout>
        </v-footer>
    </v-app>
</template>

<script>
    import BrocanteHeaderLayout from '@/layouts/BrocanteHeaderLayout';
    import BrocanteFooterLayout from '@/layouts/BrocanteFooterLayout';
    import Carousel from '@/components/Carousel';

    export default {
        name: "Accueil",
        components: {
            BrocanteHeaderLayout,
            BrocanteFooterLayout,
            Carousel
        }
    };
</script>

<style>
    .carousel{
        margin-top: 70px;
    }
</style>