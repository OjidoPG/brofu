<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="brocanteurs"
      :single-select="singleSelect"
      item-key="nom"
      show-select
      class="elevation-1"
      dense
    ></v-data-table>
   
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="success" class="md-3 offset-md-2 mt-5" @click="goAdmin">ADMINISTRATION</v-btn>
          <v-btn color="warning" class="md-3 offset-md-2 mt-5" v-on="on">ENVOI DE MAILS</v-btn>
          <v-btn color="error" class="md-3 offset-md-2 mt-5" @click="goAccueil">ACCUEIL</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Envoi de mails</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Legal first name*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal middle name"
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal last name*"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Email*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Password*" type="password" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
   
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    singleSelect: false,
    selected: [],
    headers: [
      { text: "Nom", align: "left", sortable: true, value: "nom" },
      { text: "Prénom", value: "prenom" },
      { text: "Téléphone", value: "telephone" },
      { text: "E-mail", value: "mail" },
      { text: "Adresse", value: "adresse" },
      { text: "Code Postal", value: "codepostal" },
      { text: "Ville", value: "ville" }
    ],
    brocanteurs: []
  }),
  created() {
    this.initialize();
    this.loadBrocanteurs();
  },
  methods: {
    initialize() {
      this.loadBrocanteurs();
    },
    loadBrocanteurs() {
      this.brocanteurs = [];
      this.$http.get("clients/getClients").then(response => {
        this.brocanteurs = response.data.liste;
      });
    },
    goAccueil() {
      this.$router.push("/");
    },
    goAdmin() {
      this.$router.push("/Administration");
    }
  }
};
</script>