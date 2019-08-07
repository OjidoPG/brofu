<template>
    <div>
        <v-container grid-list-md text-center class="carousel">
            <v-layout wrap>
                <v-flex md6 offset-md3>
                    <Carousel></Carousel>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import Carousel from '@/components/Carousel';

    export default {
        name: "Accueil",
        components: {
            Carousel
        }
    };
</script>

<style>
    .carousel {
        margin-top: 80px;
    }
</style>