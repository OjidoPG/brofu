<template>
    <section id="without-footer-layout">
        <navbar-component/>
        <v-container fluid
                     >
            <slot/>
        </v-container>
    </section>
</template>

<script>
    import NavbarComponent from '@/components/Layouts/NavbarComponent'

    // noinspection JSUnusedGlobalSymbols
    export default {
        components: {
            NavbarComponent
        }
    }
</script>

<style>
    #without-footer-layout {
        height: calc(100% - 136px);
    }
</style>