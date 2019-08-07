<template>
    <div>
        <v-container grid-list-md text-center class="formulaire">
            <v-layout wrap>
                <v-flex md6 offset-md-3>
                    <Formulaire></Formulaire>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import Formulaire from '@/components/Formulaire'

    export default {
        name: "Inscription",
        components: {
            Formulaire
        }
    };
</script>