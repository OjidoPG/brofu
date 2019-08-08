<template>
    <div>
        <v-alert type="error" v-model="error">
            Enregistrement non effectué
        </v-alert>
    </div>
</template>

<script>
    export default {
        name: "ErrorAlert.vue",
        props:{
            error: {
                type: Boolean,
                default: false
            }
        }
    }
</script>