<template>
    <section>
        <navbar-generale-component
                title="EMPLACEMENTS"
        ></navbar-generale-component>
        <slot/>
    </section>
</template>

<script>
    import NavbarGeneraleComponent from '@/components/Layouts/NavbarGeneraleComponent'

    export default {
        name: "EmplacementsLayout.vue",
        components: {
            NavbarGeneraleComponent
        }
    }
</script>