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
                            :key="option.id"
                            @click="aiguillage(option.id)"
                    >
                        <v-list-item-title>{{ option.message }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>

        <administrateur-modale
                v-model="dialog"
        ></administrateur-modale>

        <rejoindre-modale
                v-model="dialogMap"
        ></rejoindre-modale>

    </v-app-bar>
</template>

<script>
    import AdministrateurModale from '@/components/AdministrateursModale'
    import RejoindreModale from '@/components/RejoindreModale'

    export default {
        components: {
            AdministrateurModale,
            RejoindreModale
        },
        data() {
            return {
                options: [
                    {id: 1, message: 'Nous rejoindre'},
                    {id: 2, message: 'Administrateurs'}
                ],
                sheet: false,
                dialog: false,
                dialogMap: false
            }
        },
        methods: {
            aiguillage(data) {
                switch (data) {
                    case 1 :
                        this.dialogMap = true;
                        break;
                    case 2 :
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