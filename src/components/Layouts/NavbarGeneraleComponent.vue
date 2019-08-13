<template>
    <v-app-bar
            color="light-blue darken-3"
            dark
            height="100"
    >
        <div class="col-md-10 offset-md-1 text-center font-weight-bold">
            <v-toolbar-title class="title">{{title}}</v-toolbar-title>
        </div>
    </v-app-bar>
</template>

<script>
    export default {
        name: "NavBarAdminComponent.vue",
        props: {
            title: {
                type: String,
                required: true
            }
        }
    }
</script>