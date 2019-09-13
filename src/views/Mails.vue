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
    <v-dialog v-model="dialog" persistent max-width="400px">
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
              <v-col cols="12" sm="12">
          <v-textarea
              v-model="message"
              color="teal"
              max-width="600px"
            >
              <template v-slot:label>
                <div>Message</div>
              </template>
            </v-textarea>
        </v-col>
            </v-row>
          </v-container>          
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="close">Annulation</v-btn>
          <v-btn color="blue darken-1" text @click="envoiMail">Envoyer</v-btn>
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
    message:"",  
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
    },
    close() {
      this.dialog = false;
    },
    envoiMail() {
      if (this.selected.length === 0) {
        this.echecMail();
      } else if(this.message ===""){
          this.echecMessage();
      }else{
        let mailTab = [];
        this.selected.forEach(brocanteur => {
          mailTab.push(brocanteur.mail);
        });
        let formData = new FormData();
        formData.append("mails", JSON.stringify(mailTab));
        formData.append("message", this.message);
        this.$http.post("mails/envoiMails", formData).then(response => {
          if (response.data["Success"]) {
            this.reussite(response.data["Success"][0]["Message"]);
          } else {
            this.messages = [];
            this.echec();
          }
        });
      }
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
    echecMail() {
      this.$toast("Vous n'avez sélectionné aucune adresse e-mail !", {
        color: "error",
        icon: "fas fa-check-circle"
      });
    },
    echecMessage() {
      this.$toast("Votre message est vide, veuillez le remplir !", {
        color: "error",
        icon: "fas fa-check-circle"
      });
    }
  }
};
</script>