<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="brocanteurs"
      sort-by="brocanteurs.nom"
      class="elevation-1"
      dense
      :hide-default-footer="true"
    >
      <template v-slot:footer>
        <v-container>
          <v-row>
            <v-col sm="3" md="3">Argent dû</v-col>
            <v-col sm="3" md="3">0</v-col>
            <v-col sm="3" md="3">Argent encaissé</v-col>
            <v-col sm="3" md="3">0</v-col>
          </v-row>
        </v-container>
      </template>
      <template v-slot:top>
        <v-form ref="form" lazy-validation>
          <v-toolbar flat color="white">
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.nom" label="Nom" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.prenom" label="Prénom" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.emplacement.numero"
                          label="Numéro"
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.emplacement.taille"
                          label="Taille"
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.emplacement.prix" label="Prix" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-radio-group v-model="editedItem.emplacement.paye" label="Payé ?">
                          <v-radio name="editedItem.emplacement.paye" label="Non" :value="0" key="0"></v-radio>
                          <v-radio name="editedItem.emplacement.paye" label="Oui" :value="1" key="1"></v-radio>
                        </v-radio-group>
                      </v-col>
                      <input hidden v-model="editedItem.id" />
                      <input hidden v-model="editedItem.emplacements_id" />
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" @click="close">Annulation</v-btn>
                  <v-btn color="success" @click="save">Sauvegarder</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </v-form>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">fas fa-edit</v-icon>
      </template>
    </v-data-table>
    <v-btn color="error" class="md-3 offset-md-3 mt-5" @click="goAccueil">ACCUEIL</v-btn>
    <v-btn color="success" class="md-3 offset-md-4 mt-5" @click="goAdmin">ADMINISTRATION</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    itemStockage: "",
    dialog: false,
    headers: [
      { text: "Nom", align: "left", sortable: true, value: "nom" },
      { text: "Prénom", value: "prenom" },
      { text: "Numéro", value: "emplacement.numero" },
      { text: "Taille", value: "emplacement.taille" },
      { text: "Prix", value: "emplacement.prix" },
      { text: "Payé", value: "emplacement.paye" },
      { text: "Actions", value: "action", sortable: false }
    ],
    brocanteurs: [],
    messages: [],
    editedIndex: -1,
    emplacementsListe: [],
    editedItem: {
      nom: "",
      prenom: "",
      emplacement: [numero => "", taille => "", paye => ""]
    },
    defaultItem: {
      nom: "",
      prenom: "",
      emplacement: [numero => "", taille => "", paye => ""]
    }
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.loadBrocanteurs();
    },
    loadBrocanteurs() {
      this.brocanteurs = [];
      this.$http.get("clients/getClientsEmplacements").then(response => {
        this.brocanteurs = response.data.liste;
      });
    },
    editItem(item) {
      this.editedIndex = this.brocanteurs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      let formData = new FormData();
      formData.append("nom", this.editedItem.nom);
      formData.append("prenom", this.editedItem.prenom);
      formData.append("telephone", this.editedItem.telephone);
      formData.append("mail", this.editedItem.mail);
      formData.append("adresse", this.editedItem.adresse);
      formData.append("codepostal", this.editedItem.codepostal);
      formData.append("ville", this.editedItem.ville);
      formData.append("emplacements_id", this.editedItem.emplacements_id);
      formData.append("id", this.editedItem.id);

      this.$http.post("clients/postClients", formData).then(response => {
        this.messages = [];
        if (response.data["Success"]) {
          this.reussite(response.data["Success"][0]["Message"]);
        } else {
          this.messages = [];
          this.echec();
        }
      });
      if (this.editedIndex > -1) {
        Object.assign(this.brocanteurs[this.editedIndex], this.editedItem);
      } else {
        this.brocanteurs.push(this.editedItem);
      }
      this.close();
    },
    reussite(messageReussite) {
      this.loadBrocanteurs();
      this.$toast(messageReussite, {
        color: "success",
        icon: "fas fa-check-circle"
      });
      this.reset();
    },
    echec() {
      this.$toast("Une erreur s'est produit", {
        color: "error",
        icon: "fas fa-check-circle"
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