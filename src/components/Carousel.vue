<template>
    <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
    >
        <v-carousel-item
            v-for="(image, i) in images"
            :key="i"
            :src="'/static/' + image.src"
        />
    </v-carousel>
</template>

<script>
    export default {
        name:"Carousel.vue",
        data() {
            return {
                images: [
                    {src: 'Eulmont1.jpg'},
                    {src: 'Eulmont2.jpg'},
                    {src: 'Eulmont3.jpg'},
                    {src: 'Eulmont4.jpg'},
                    {src: 'Eulmont5.jpg'}
                ],
            }
        },
    }
</script>