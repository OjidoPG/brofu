<template>
    <v-snackbar
            :value="value"
            :timeout="timeout"
            :color="color"
    >
        {{ textsnackbar }}
        <i :class="icon"></i>
    </v-snackbar>
</template>

<script>
    export default {
        name: "SnackBar.vue",
        props:{
            value: {
                type:Boolean,
                default:false
            },
            textsnackbar: {
                type : String
            },
            icon:{
                type : String
            },
            color: {
                type : String
            },
        },
        data(){
            return{
                timeout: 4000
            }
        }
    }
</script>

<style scoped>

</style>