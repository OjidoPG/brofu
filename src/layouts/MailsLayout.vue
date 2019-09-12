<template>
    <section>
        <navbar-generale-component
                title="MAILS"
        ></navbar-generale-component>
        <slot/>
    </section>
</template>

<script>
    import NavbarGeneraleComponent from '@/components/Layouts/NavbarGeneraleComponent'

    export default {
        name: "MailsLayout.vue",
        components: {
            NavbarGeneraleComponent
        }
    }
</script>