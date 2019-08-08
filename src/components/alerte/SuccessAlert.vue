<template>
    <div>
        <v-alert type="success" v-model="success">
            Enregistrement effectué
        </v-alert>
    </div>
</template>

<script>
    export default {
        name: "SuccessAlert.vue",
        props:{
            success: {
                type: Boolean,
                default: false
            }
        }
    }
</script>