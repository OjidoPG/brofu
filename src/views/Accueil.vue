<template>
    <div id="Accueil">

        <!-- Header Brocante -->
        <BrocanteHeaderLayout></BrocanteHeaderLayout>

        <!-- insertion de la card bootstrap -->
        <h1>Corps de l'accueil</h1>

        <!-- Footer Accueil -->
        <BrocanteFooterLayout></BrocanteFooterLayout>

    </div>
</template>

<script>
    import BrocanteHeaderLayout from '@/layouts/BrocanteHeaderLayout.vue';
    import BrocanteFooterLayout from '@/layouts/BrocanteFooterLayout.vue';
    export default {
        name: "Accueil",
        components : {
            BrocanteHeaderLayout,
            BrocanteFooterLayout
        }
    };
</script>