<template>
    <section>
        <navbar-generale-component
                title="ADMINISTRATION"
        ></navbar-generale-component>
        <slot/>
    </section>
</template>

<script>
    import NavbarGeneraleComponent from '@/components/Layouts/NavbarGeneraleComponent'

    export default {
        name: "AdminLayout.vue",
        components: {
            NavbarGeneraleComponent
        }
    }
</script>