<template>
    <section>
        <navbar-generale-component
                title="ADMINISTRATEURS"
        ></navbar-generale-component>
        <slot/>
    </section>
</template>

<script>
    import NavbarGeneraleComponent from '@/components/Layouts/NavbarGeneraleComponent'

    export default {
        name: "AdministrateursLayout.vue",
        components: {
            NavbarGeneraleComponent
        }
    }
</script>