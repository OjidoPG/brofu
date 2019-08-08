<template>
    <v-app-bar
            color="light-blue darken-3"
            dark
            height="100"
    >
        <div class="col-md-10 offset-md-1 text-center font-weight-bold">
            <v-toolbar-title class="title">BROCANTE D'EULMONT</v-toolbar-title>
        </div>
        <div class="col-md-1 text-md-right">
            <v-menu>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list dense rounded>
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

        <AdministrateurModale
                :dialog=dialog
        ></AdministrateurModale>

    </v-app-bar>
</template>

<script>
    import AdministrateurModale from '@/components/AdministrateursModale'

    export default {
        components: {
            AdministrateurModale
        },
        data() {
            return {
                options: [
                    {message: 'Nous rejoindre'},
                    {message: 'Administrateurs'}
                ],
                sheet: false,
                dialog: false
            }
        },
        methods: {
            aiguillage(data) {
                switch (data) {
                    case 'Nous rejoindre' :
                        alert('Nous rejoindre');
                        break;
                    case'Administrateurs':
                        this.dialog = false;
                        this.dialog = true;
                        break;
                    default:
                        alert('Default');
                        break;
                }
            }
        }
    }
</script>