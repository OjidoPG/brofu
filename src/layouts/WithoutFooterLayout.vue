<template>
    <section id="without-footer-layout">
        <navbar/>
        <v-container fluid
                     fill-height>
            <slot/>
        </v-container>
    </section>
</template>

<script>
    import Navbar from '@/components/Layouts/Navbar'

    // noinspection JSUnusedGlobalSymbols
    export default {
        components: {
            Navbar
        }
    }
</script>

<style>
    #without-footer-layout {
        height: calc(100% - 136px);
    }
</style>