<template>
    <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
    >
        <v-carousel-item
                v-for="(slide, i) in slides"
                :key="i"
                :src="slide.src"
        >
            <v-sheet
                    :color="colors[i]"
                    height="100%"
            >
                <v-layout
                        align-center
                        fill-height
                        justify-center
                >
                    <div class="display-3">{{ slide.src }}</div>
                </v-layout>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
    export default {
        data() {
            return {
                colors: [
                    'indigo',
                    'warning',
                    'pink darken-2',
                    'red lighten-1',
                    'deep-purple accent-4',
                ],
                slides: [
                    {src: require("@/assets/Eulmont1.jpg")},
                    {src: require("@/assets/Eulmont2.jpg")},
                    {src: require("@/assets/Eulmont3.jpg")},
                    {src: require("@/assets/Eulmont4.jpg")},
                    {src: require("@/assets/Eulmont5.jpg")}
                ],
            }
        },
    }
</script>