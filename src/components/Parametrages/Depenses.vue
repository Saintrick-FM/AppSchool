<template>
  <div style="width:1305px">
    <v-data-table
      :headers="depensesHeaders"
      :items="depenses"
      item-key="identifiant"
      no-data-text="pas de dépenses enregistrées pour l'instant"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Toutes les dépenses de l'école</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>
          <!-- {{ selected }} -->
          <v-spacer></v-spacer>

          <!-- boite de dialog pour ajout et modif classe -->
          <v-dialog
            transition="fab-transition"
            persistent
            dark
            width="800px"
            v-model="dialog"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nouvelle Dépense
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-row>
                      <v-col md="4">
                        <v-combobox
                          v-model="editDepense.identifiant"
                          :items="intituleDepense"
                          required
                          filled
                          label="Intitulé de la dépense"
                          shaped
                          outlined
                          hint="Choisissez un type de recette ou créez en un"
                          persistent-hint
                        >
                        </v-combobox>
                      </v-col>
                      <v-col md="3">
                        <v-switch
                          input-value="true"
                          v-model="editDepense.obligatoire"
                          filled
                          label="Obligatoire ?"
                          shaped
                          outlined
                        >
                        </v-switch>
                      </v-col>

                      <v-col md="5">
                        <v-text-field
                          v-model="editDepense.periodePaiement"
                          label="Période de paiement"
                          hint="Du 01/01/2021 au 01/05/2021"
                          persistent-hint
                          shaped
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="6">
                        <v-text-field
                          type="number"
                          v-model="editDepense.montant"
                          label="Montant de la recette"
                          shaped
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col md="6">
                        <v-select
                          chips
                          :items="recettes"
                          v-model="editDepense.caisseDeRetrait"
                          label="Caisse de retrait"
                          shaped
                          outlined
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="cancelEditOrUpdateDepense"
                >
                  Annulez et fermer
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="saveEditOrUpdateRecette"
                >
                  Enregistrez
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- suppression recette -->
          <v-dialog
            dark
            v-model="dialogForDelete"
            transition="fab-transition"
            persistent
            max-width="500px"
          >
            <v-card>
              <v-card-title class="headline"
                >Voulez-vous vraiment supprimer la dépense

                <span style="color: red; margin: 3px 0px 0px 100px "
                  >{{ depenseCliquee }} ?</span
                >
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Annuler</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editerDepense(item)">
          🏚
        </v-icon>
        <!-- <v-icon @click="deleteDepense(item)">
                
              </v-icon> -->
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      valid: false,
      loading: false,
      alert: false,
      model: 0,
      intituleDepense: ["Salaires des Enseignants", "Salaire du Personnel"],
      allEcolageAutresFrais: null,
      contentBtn: "Enregistrez",
      anneeScolaireActuelle: null,
      depenseCliquee: null,
      recettes: null,
      dialog: false,
      dialogForDelete: false,
      editedIndex: -1,

      depensesHeaders: [
        { text: "Identifiant", value: "identifiant", sortable: true },

        { text: "Montant", value: "montant" },
        {
          text: "Période de recouvrement",
          value: "periodePaiement",
          sortable: true,
        },
        { text: "Caisse de Retrait", value: "caisseDeRetrait", sortable: true },
        { text: "Crée le", value: "cree_le" },
        { text: "Editer", value: "actions", sortable: false },
      ],
      depenses: [],

      defaultDepense: {
        identifiant: null,
        obligatoire: true,
        periodePaiement: null,
        AnneeScolaire: null,
        montant: null,
        caisseDeRetrait: null,
        cree_le: null,
      },

      editDepense: {
        identifiant: null,
        obligatoire: true,
        periodePaiement: null,
        AnneeScolaire: null,
        montant: null,
        caisseDeRetrait: null,
        cree_le: null,
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nouvelle Dépense"
        : "Modification Dépense";
    },
  },
  beforeMount() {
    if (!localStorage.getItem("Config_Dépenses")) {
      this.getConfigDepenses();
    } else {
      this.depenses = JSON.parse(localStorage.getItem("Config_Dépenses"));
    }

    if (typeof localStorage.getItem("année_scolaire") === "string") {
      this.anneeScolaireActuelle = localStorage.getItem("année_scolaire");
      console.log("this.annee_scolaire " + this.anneeScolaireActuelle);
    } else {
      this.anneeScolaireActuelle = JSON.parse(
        localStorage.getItem("année_scolaire")
      ).anneeScolaire;
    }

    let recettes1 = JSON.parse(localStorage.getItem("Frais_de_base"));
    let recettes2 = [];
    recettes1.forEach((element) => {
      recettes2.push(element.frais);
    });
    this.recettes = recettes2;
    if (localStorage.getItem("All_Config_Depenses")) {
      let depenses = JSON.parse(localStorage.getItem("All_Config_Depenses"));
      depenses.forEach((depense) => {
        this.depenses.push(depense);
      });
    } else {
      console.log("Pas encore de dépenses dans le localStorage");
    }
  },
  methods: {
    async getConfigDepenses() {
      const token = "Token " + localStorage.getItem("token");

      if (localStorage.getItem("token") != null) {
        var config = {
          method: "get",
          url: "api/finances/configDepense/",
          headers: {
            Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
          },
        };
        await axios(config)
          .then((response) => {
            const result = response.data;

            console.log(result);

            let element = [];

            for (const key in result) {
              element.push(result[key]);
            }

            this.depenses = element;
            console.log(
              "😃😃😃 this.depenses => " +
                this.depenses +
                "this.response.data = " +
                JSON.stringify(element)
            );
          })
          .catch(function(error) {
            console.log("😢😢😢" + error);
          });
      }
    },
    async getRecettes() {
      const token = "Token " + localStorage.getItem("token");

      if (localStorage.getItem("token") != null) {
        var config = {
          method: "get",
          url: "api/finances/configFraisEleve/",
          headers: {
            Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
          },
        };
        await axios(config)
          .then((response) => {
            const result = response.data;

            console.log(result);

            let element = [];

            for (const key in result) {
              element.push(result[key].frais);
            }

            this.recettes = element;
            console.log(
              "😃😃😃 this.recettes => " +
                this.recettes +
                "this.response.data = " +
                JSON.stringify(element)
            );
          })
          .catch(function(error) {
            console.log("😢😢😢" + error);
          });
      }
    },
    editerDepense(item) {
      console.log("dépense cliquée " + JSON.stringify(item));

      this.editedIndex = this.depenses.indexOf(item);
      //this.intituleDepense.unshift(item.identifiant);
      this.editDepense = Object.assign({}, item);

      console.log("FRANCY EEEH " + JSON.stringify(this.editDepense));

      this.dialog = true;
    },

    deleteDepense(item) {
      console.log("delete " + item.identifiant);
      this.depenseCliquee = item.identifiant;
      this.editedIndex = this.depenses.indexOf(item);
      this.editDepense = Object.assign({}, item);
      this.dialogForDelete = true;
    },

    deleteItemConfirm() {
      this.depenses.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    cancelEditOrUpdateDepense() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editDepense = Object.assign({}, this.defaultDepense);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogForDelete = false;
      this.$nextTick(() => {
        this.editDepense = Object.assign({}, this.defaultDepense);
        this.editedIndex = -1;
      });
    },
    saveEditOrUpdateRecette() {
      if (this.editedIndex > -1) {
        this.$store.dispatch("actionUpdateConfigDepense", this.editDepense);

        Object.assign(this.depenses[this.editedIndex], this.editDepense);
      } else {
        this.editDepense.AnneeScolaire = this.anneeScolaireActuelle;

        this.$store.dispatch("actionNewConfigDepense", this.editDepense);
        var d = new Date();
        this.editDepense.cree_le = d.toString().slice(0, 16);
        this.depenses.push(this.editDepense);
      }
      this.cancelEditOrUpdateDepense();
      console.log("Coucou");
    },
  },
};
</script>

<style></style>
