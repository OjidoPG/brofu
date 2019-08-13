<template>
    <section>
        <navbar-generale-component
                title="FINANCES"
        ></navbar-generale-component>
        <slot/>
    </section>
</template>

<script>
    import NavbarGeneraleComponent from '@/components/Layouts/NavbarGeneraleComponent'

    export default {
        name: "FinancesLayout.vue",
        components: {
            NavbarGeneraleComponent
        }
    }
</script>