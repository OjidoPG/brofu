<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="brocanteurs"
      sort-by="brocanteurs.nom"
      class="elevation-1"
      :hide-default-footer="true"
      dense
    >
      <template v-slot:item.emplacement.paye="{ item }">
        <v-chip x-small :color="getColor(item.emplacement.paye)" dark>{{ item.emplacement.paye }}</v-chip>
      </template>
      <template v-slot:footer>
        <v-container>
          <v-row>
            <v-col sm="3" md="3">
              <strong>Argent dû</strong>
            </v-col>
            <v-col sm="3" md="3" v-bind:style="{color:argentDuColor}">
              <strong>{{argentDu}} euros</strong>
            </v-col>
            <v-col sm="3" md="3">
              <strong>Argent encaissé</strong>
            </v-col>
            <v-col sm="3" md="3" v-bind:style="{color:argentEncaisseColor}">
              <strong>{{argentEncaisse}} euros</strong>
            </v-col>
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
                          <v-radio label="Oui" value="oui"></v-radio>
                          <v-radio label="Non" value="non"></v-radio>
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
    argentDuColor: "red",
    argentEncaisseColor: "green",
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
    argentDu: 0,
    argentEncaisse: 0,
    brocanteurs: [],
    messages: [],
    editedIndex: -1,
    emplacementsListe: [],
    editedItem: {
      nom: "",
      prenom: "",
      emplacement: {numero : "", taille : "", paye : ""}
    },
    defaultItem: {
      nom: "",
      prenom: "",
      emplacement: {numero : "", taille : "", paye : ""}
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
        let Du = 0;
        let Encaisse = 0;
        this.brocanteurs.forEach(brocanteur => {
          if (brocanteur.emplacement.paye === "0") {
            brocanteur.emplacement.paye = "non";
          } else {
            brocanteur.emplacement.paye = "oui";
          }
          if (brocanteur.emplacement.paye === "non") {
            Du += parseInt(brocanteur.emplacement.prix);
          } else {
            Encaisse += parseInt(brocanteur.emplacement.prix);
          }
          this.argentDu = Du;
          this.argentEncaisse = Encaisse;
        });
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
      let formDataPaye = new FormData();
      formDataPaye.append("idEmplacement", this.editedItem.emplacements_id);
      formDataPaye.append("paye", this.editedItem.emplacement.paye);

      this.$http
        .post("emplacements/postPayeEmplacements", formDataPaye)
        .then(response => {
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
    getColor(paye) {
      if (paye === "oui") return "green";
      else return "red";
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