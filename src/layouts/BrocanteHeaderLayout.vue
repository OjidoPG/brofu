<template>
    <v-app id="inspire">
        <div>
            <v-app-bar
                    color="light-blue darken-3"
                    dark
            >
                <div class="col-md-10 offset-md-1 text-center font-weight-bold">
                    <v-toolbar-title class="title">Brocante</v-toolbar-title>
                </div>
                <div class="col-md-1 text-md-right">
                    <v-menu>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                                    v-for="option in options"
                                    :key="option.message"
                                    @click="aiguillage(option.message)"
                            >
                                <v-list-item-title>{{ option.message }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-app-bar>
        </div>
    </v-app>
</template>

<script>
    export default {
        name: "BrocanteHeaderLayout",
        data (){
            return{
                options:[
                    {message:'Nous rejoindre'},
                    {message:'Administrateurs'}
                ]
            }
    },
        methods : {
            aiguillage(data){
                switch (data) {
                    case 'Nous rejoindre' :
                        alert('Nous rejoindre');
                        break;
                    case'Administrateurs':
                        alert('Administrateurs');
                        break;
                    default:
                        alert('Default');
                        break;
                }
            }
        }
    };
</script>

<style>

</style>