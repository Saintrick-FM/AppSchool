<template>
  <v-card style="width:215px">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Recherche"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :search="search"
      :headers="MyHeaders"
      type="button"
      @click:row="rowClick"
      :items="JSON.parse(alleleves)"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Tous les élèves</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import { EventBus } from "@/event-bus.js";

export default {
  name: "ListeEleves",
  data: () => ({
    valid: true,
    search: "",
    erreur: false,
    message_erreur: "",
    dialog: false,
    dialogDelete: false,
    loader: false,
    eleveActuel: "",
    MyHeaders: [
      { text: "Nom", value: "nom", sortable: true },

      { text: "Classe", value: "classe", sortable: true },
    ],

    eleves: [],
    matieres: [],
    classes: undefined,
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  computed: {
    ...mapGetters(["alleleves"]),
  },

  beforeMount() {
    console.log("Essaie");
    let id_classes = [localStorage.getItem("Id_classes")];
    let classe = null;
    id_classes.forEach((eleves) => {
      classe = eleves.split(",");
      console.log("tableau des classes " + JSON.stringify(classe));
    });

    this.classes = classe;
    console.log("tableau des elèves " + this.alleleves);
    if (!this.alleleves) {
      this.actionInitialiseEleve(localStorage.getItem("année_scolaire"));
      this.eleves = JSON.parse(this.alleleves);
    } else {
      this.eleves = JSON.parse(this.alleleves);
    }
  },

  methods: {
    ...mapActions(["actionInitialiseEleve"]),
    initializeEleve() {
      //   this.$store.dispatch("actionInitialiseMatiere");
      const token = "Token " + localStorage.getItem("token");
      if (localStorage.getItem("token") != null) {
        var config = {
          method: "get",
          url: "api/inscriptions/",
          headers: {
            Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
          },
        };

        axios(config)
          .then((response) => {
            const result = response.data;

            console.log(result);
            localStorage.setItem("Elèves", result);

            let eleves = [];
            for (const key in result) {
              eleves.push(result[key]);
            }
            // let eleves_cours_id=[]
            // this.allMatieres.matiereEnseigne.forEach(eleves => {
            // this.allMatieres.find((x) => x.nomMatiere == matiere).id
            // });

            eleves.forEach((eleve) => {
              eleve.dateEmbauche = String(eleve.dateEmbauche).slice(0, 10);
            });

            this.eleves = eleves;

            //this.eleves = eleves;
            console.log(
              "😃😃😃 this.eleves => " +
                JSON.stringify(this.alleleves) +
                "this.response.data = " +
                response.data
            );
          })
          .catch(function(error) {
            console.log("😢😢😢" + error);
          });
      }
    },

    rowClick: function(item, row) {
      row.select(true);
      console.log("Type item " + JSON.stringify(item));
      //  let eleve = [];
      var map = Object.assign(item);

      /* for (const key in item) {
        const element = item[key];
        eleve.push(element);
      }*/
      localStorage.setItem("eleveChoisi", JSON.stringify(map));
      EventBus.eleveClique(item);
      //this.$emit("eleveChoisi");

      //item  - selected item
    },
  },
};
</script>

<style lang="scss" scoped></style>
