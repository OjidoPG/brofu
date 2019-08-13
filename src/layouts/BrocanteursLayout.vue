<template>
    <section>
        <navbar-generale-component
                title="BROCANTEURS"
        ></navbar-generale-component>
        <slot/>
    </section>
</template>

<script>
    import NavbarGeneraleComponent from '@/components/Layouts/NavbarGeneraleComponent'

    export default {
        name: "BrocanteursLayout.vue",
        components: {
            NavbarGeneraleComponent
        }
    }
</script>