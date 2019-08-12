<template>
    <section>
        <navbar-admin-component/>
        <slot/>
    </section>
</template>

<script>
    import NavbarAdminComponent from '@/components/Layouts/NavbarAdminComponent'

    export default {
        name: "AdminLayout.vue",
        components: {
            NavbarAdminComponent
        }
    }
</script>