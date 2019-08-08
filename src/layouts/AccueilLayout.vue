<template>
    <section id="without-footer-layout">
        <navbar-component/>
        <slot/>
        <v-footer
            absolute
            color="transparent"
        >
            <v-flex
                text-center
                md12
            >
                <footer-component/>
            </v-flex>
        </v-footer>
    </section>
</template>

<script>
    import NavbarComponent from '@/components/Layouts/NavbarComponent'
    import FooterComponent from '@/components/Layouts/FooterComponent'

    // noinspection JSUnusedGlobalSymbols
    export default {
        components: {
            NavbarComponent,
            FooterComponent
        }
    }
</script>