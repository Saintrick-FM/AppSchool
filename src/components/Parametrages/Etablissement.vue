<template>
  <v-row style="margin-left:50px">
    <!-- <h2
      class="purple--text text-uppercase text-center"
      style="margin-top:10px;flex:auto"
      v-if="showModifAlert"
    >
      Modification Année scolaire : {{ yearToModify }}
    </h2> -->
    <v-row class="text-center">
      <v-col md="5">
        <v-card elevation="11" class="pt-10">
          <h2 class="purple--text text-uppercase">Informations générales</h2>
          <v-divider color="purple" class="mt-2"></v-divider>
          <v-form
            @submit.prevent="onLoginLeft"
            ref="form"
            v-model="valid"
            lazy-validation
            class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
          >
            <v-row>
              <v-col md="4">
                <v-text-field
                  label="Nom de l'école"
                  v-model="editEcole.nom"
                  outlined
                  :rules="[(v) => !!v || 'Vous devez renseigner ce champs']"
                  required
                  shaped
                ></v-text-field>
              </v-col>
              <v-col md="3">
                <v-text-field
                  label="Devise"
                  v-model="editEcole.devise"
                  outlined
                  :rules="[(v) => !!v || 'Vous devez renseigner ce champs']"
                  required
                  shaped
                ></v-text-field>
              </v-col>
              <v-col md="5">
                <v-select
                  label="Programme"
                  v-model="editEcole.programme"
                  :items="['Congolais', 'Français', 'Franco-congolais']"
                  outlined
                  :rules="[(v) => !!v || 'Vous devez renseigner ce champs']"
                  required
                  shaped
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Ville"
                  v-model="editEcole.ville"
                  :rules="[(v) => !!v || 'Vous devez renseigner ce champs']"
                  required
                  filled
                  shaped
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  label="Adresse (site pricipale)"
                  v-model="editEcole.adresse"
                  :rules="[(v) => !!v || 'Vous devez renseigner ce champs']"
                  required
                  filled
                  shaped
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Téléphone"
                  v-model="editEcole.telephone"
                  :rules="[(v) => !!v || 'Vous devez renseigner ce champs']"
                  required
                  filled
                  shaped
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  label="Email"
                  v-model="editEcole.email"
                  :rules="emailRules"
                  required
                  type=""
                  filled
                  shaped
                ></v-text-field>
              </v-col>
            </v-row>

            <v-btn
              x-large
              type="submit"
              block
              :disabled="!valid"
              :loading="loading"
              color="purple darken-4"
              class="mr-4 text"
              @click="validate"
            >
              <span class="white--text">{{ contentBtn }}</span>
              <v-icon light>mdi-cached</v-icon>
            </v-btn>
          </v-form>
        </v-card>
      </v-col>

      <v-col md="7">
        <v-card elevation="11" class="pt-10">
          <h2 class="purple--text text-uppercase">Plus de détails</h2>
          <v-divider color="purple" class="mt-2"></v-divider>

          <v-form
            @submit.prevent="onLoginRight"
            ref="form"
            v-model="valid"
            lazy-validation
            class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
          >
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Nombre de sites"
                  v-model="editEcole.nbreSites"
                  type="number"
                  outlined
                  shaped
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Préfixe Matricue"
                  v-model="editEcole.prefixmatricule"
                  placeholder="préfixe des matricules pour examens"
                  outlined
                  shaped
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col md="2">
                <v-switch label="Matin" v-model="editedMatin"> </v-switch>
              </v-col>
              <v-col md="2" width="70px">
                <v-text-field
                  :disabled="editedMatin === false"
                  placeholder="Ex:7h-13h"
                  label="Heures"
                  v-model="editEcole.heuresMatin"
                  outlined
                  color
                >
                </v-text-field>
              </v-col>
              <v-col md="2">
                <v-text-field
                  :disabled="editedMatin === false"
                  placeholder="Ex:10h-10h30"
                  label="Recré"
                  v-model="editEcole.recreMatin"
                  outlined
                  color
                >
                </v-text-field>
              </v-col>

              <v-col md="2">
                <v-switch label="Midi" v-model="editedMidi"> </v-switch>
              </v-col>
              <v-col md="" width="70px">
                <v-text-field
                  :disabled="editedMidi === false"
                  placeholder="13h-17h30"
                  label="Heures"
                  append-icon=""
                  v-model="editEcole.heuresMidi"
                  outlined
                  color
                ></v-text-field>
              </v-col>
              <v-col md="2">
                <v-text-field
                  :disabled="editedMidi === false"
                  placeholder="15h-15h30"
                  label="Récré"
                  append-icon=""
                  v-model="editEcole.recreMidi"
                  outlined
                  color
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="8">
                <v-combobox
                  width="35px"
                  :items="nomsCycles"
                  required
                  deletable-chips
                  outlined
                  shaped
                  v-model="editedCycles"
                  label="Cycles d'enseignements*"
                  chips
                  multiple
                ></v-combobox>
              </v-col>
              <v-col md="2">
                <v-switch
                  label="Crèche"
                  v-model="editEcole.garderie"
                ></v-switch>
              </v-col>
              <v-col md="2">
                <v-text-field
                  :disabled="!editEcole.garderie"
                  type="number"
                  outlined
                  shaped
                  label="Total Salles"
                  v-model="editEcole.nbreSalleGarderie"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-btn
              x-large
              type="submit"
              hidden
              block
              :disabled="!valid"
              :loading="loading"
              color="purple darken-4"
              class="mr-4 text"
              @click="validate"
            >
              <span class="white--text">{{ contentBtn }}</span>
              <v-icon light>mdi-cached</v-icon>
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-btn
        v-if="contentBtn === 'Enregistrez'"
        x-large
        block
        :loading="loading"
        color="purple darken-4"
        class="mr-4 text"
        @click="confirmAll"
      >
        <span class="white--text">Tout enregistrer</span>
        <v-icon light>mdi-cached</v-icon>
      </v-btn>

      <v-card
        v-if="showAutresConfig"
        id="configClasses"
        class="mt-5"
        style="flex:auto"
      >
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>Autres configurations pour l'école</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
          <v-tab>
            <v-icon left>
              mdi-account
            </v-icon>
            Classes
          </v-tab>
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-tab>
            <v-icon left>
              mdi-lock
            </v-icon>
            Matières
          </v-tab>
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-tab>
            <v-icon left>
              mdi-access-point
            </v-icon>
            Emplois du temps
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <config-classes
                :Cycles="Cycles"
                :Garderie="{
                  garderie: editEcole.garderie,
                  nbreSalleGarderie: editEcole.nbreSalleGarderie,
                  nbreSites: editEcole.nbreSites,
                  midi: editedMidi,
                }"
                :nomsCycles="editedCycles"
              />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <configMatieres :Cycles="Cycles" :nomsCycles="editedCycles" />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <config-emplois-du-Temps />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-row>
    <v-divider></v-divider>
    <v-divider></v-divider>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import configClasses from "@/components/Parametrages/configClasses.vue";
import configMatieres from "@/components/Parametrages/configMatieres.vue";
import configEmploisDuTemps from "@/components/Parametrages/configEmploisDuTemps.vue";
import axios from "axios";
mapGetters;
export default {
  name: "AnneeScolaire",
  components: {
    configClasses,
    configMatieres,
    configEmploisDuTemps,
  },
  data: () => ({
    search: "",
    ecoleId: null,
    showBtnModify: false,
    contentBtn: "",
    loading: false,
    showAutresConfig: false,
    nomsCycles: ["Prescolaire", "Primaire", "College", "Lycée"],
    firstSaveCycles: [],
    Cycles: [
      {
        nom: "Prescolaire",
        classes: [
          {
            identifiant: "P1",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
          {
            identifiant: "P2",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
          {
            identifiant: "P3",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
        ],
      },

      {
        nom: "Primaire",
        classes: [
          {
            identifiant: "CP1",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
          {
            identifiant: "CP2",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
          {
            identifiant: "CE1",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
          {
            identifiant: "CE2",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
          {
            identifiant: "CM1",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
          {
            identifiant: "CM2",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
        ],
      },
      //----college
      {
        nom: "College",
        classes: [
          {
            identifiant: "6e",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
          {
            identifiant: "5e",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
          {
            identifiant: "4e",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
          {
            identifiant: "3e",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
        ],
      },
      {
        nom: "Lycée",
        classes: [
          {
            identifiant: "Seconde",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
          {
            identifiant: "Première",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
          {
            identifiant: "Terminale",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
          {
            identifiant: "CE2",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
          {
            identifiant: "CM1",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
          {
            identifiant: "CM2",
            referenceSite: null,
            vague: null,
            nbreSalle: null,
            contenance: null,
          },
        ],
      },
    ],

    editEcole: {
      nom: null,
      devise: null,
      programme: null,
      ville: null,
      adresse: null,
      telephone: null,
      email: null,
      prefixmatricule: null,
      nbreSites: 0,

      vagues: null,
      recreMidi: null,
      recreMatin: null,
      heuresMidi: null,
      heuresMatin: null,

      garderie: false,
      nbreSalleGarderie: null,
    },

    nbreSalleGarderie: null,
    editedMatin: true,
    editedMidi: false,
    editedCycles: null,

    nbreSites: 0,

    headers: [
      {
        text: "Année Scolaire",
        align: "center",
        sortable: true,
        value: "anneeScolaire",
      },
      { text: "Créé le", value: "cree_le", sortable: true },
      { text: "Rentrée Scolaire", value: "rentreeScolaire", sortable: true },
      { text: "Congés du 1er trimestre", value: "conges1erTrimestre" },
      { text: "Congés du 2e trimestre", value: "conges2eTrimestre" },
      {
        text: "Grandes Vacances",
        value: "debutVacancesScolaire",
        sortable: true,
      },
      { text: "Statut", value: "statut" },
    ],

    valid: true,
    show1: false,
    show2: false,
    email: "",
    emailRules: [
      (v) => !!v || "Vous devez renseigner ce champs",
      (v) => /.+@.+\..+/.test(v) || "L'e-mail doit être valide",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 8) || "Password must be less than 8 characters",
    ],
  }),
  computed: {},
  created() {
    if (localStorage.getItem("Ecole")) {
      axios
        .get("api/ecole/ecole/")
        .then((response) => {
          console.log("response.data " + JSON.stringify(response.data));
          this.ecoleId = response.data[0].id;
          console.log("Id ecole = " + this.ecoleId);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  beforeMount() {
    if (localStorage.getItem("Ecole")) {
      let ecole = JSON.parse(localStorage.getItem("Ecole"));
      let vraiCycles = JSON.parse(localStorage.getItem("Cycles"));
      let Cycles = null;

      Cycles = vraiCycles.filter((cycle) => cycle.nomCycle !== "Garderie");

      console.log("cycles filtrés " + JSON.stringify(Cycles));
      // this.editEcole = ecole;
      Object.assign(this.editEcole, ecole);
      this.editedMidi = true;

      this.nbreSalleGarderie = 2;
      Cycles.forEach((cycle) => {
        this.firstSaveCycles.push(cycle.nomCycle);
      });

      this.editedCycles = this.firstSaveCycles;
      console.log(
        "this.FirsSaveCycles in before mount " + this.firstSaveCycles
      );
      console.log("Ecole " + JSON.stringify(this.editEcole));
      this.contentBtn = "Validez les Modifications";
      this.showAutresConfig = true;
    } else {
      console.log("Ecole else" + this.editEcole);
      this.showBtnModify = true;
      this.contentBtn = "Enregistrez";
    }
  },

  watch: {},

  methods: {
    //..validate inputs
    validate() {
      this.$refs.form.validate();
      // console.log("this.editAnnee " + this.editAnnee);
    },

    //Login method here
    onLoginLeft() {
      //api call here
      this.loading = true;
      if (this.contentBtn !== "Enregistrez") {
        console.log("modification partie gauche Ecole ");

        this.$store.dispatch("actionUpdateEcole", [
          this.ecoleId,
          this.editEcole,
        ]);
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      } else {
        console.log("création impossible Partie gauche Ecole");
      }
    },
    affectLastSaveCycles() {
      this.firstSaveCycles = [];

      let Cycles = JSON.parse(localStorage.getItem("Cycles"));
      Cycles.forEach((cycle) => {
        this.firstSaveCycles.push(cycle.nomCycle);
      });
    },

    onLoginRight() {
      //api call here
      //let ecole = JSON.parse(localStorage.getItem("Ecole"));
      this.loading = true;
      this.affectLastSaveCycles();
      if (this.contentBtn !== "Enregistrez") {
        console.log("modification Ecole et cycles");

        if (this.editedCycles.toString() === this.firstSaveCycles.toString()) {
          this.$store.dispatch("actionUpdateEcole", [
            this.ecoleId,
            this.editEcole,
          ]);

          setTimeout(() => {
            this.loading = false;
          }, 2000);
        } else {
          /* this.$store.dispatch("actionUpdateEcole", [
            this.ecoleId,
            this.editEcole,
          ]);*/

          // this.firstSaveCycles = ["Primaire", "College"];

          console.log("First Save Cycles " + this.firstSaveCycles);
          console.log("Actual Cycles " + this.editedCycles);
          let newCyclesToAdd = null;
          let cyclesToDelete = null;

          if (this.editedCycles.length >= this.firstSaveCycles.length) {
            //  si tout est dans la grande liste ignorer, si 1 ou plusieurs cycles sont dans la 1ere liste, suprimer ce qui etait dans le firstSaveCycle qui n'est plus dans la new liste et créer ceux qui n'y sont pas
            if (
              this.firstSaveCycles.every((x) => this.editedCycles.includes(x))
            ) {
              newCyclesToAdd = this.editedCycles.filter(
                (cycle) => !this.firstSaveCycles.includes(cycle)
              );
              console.log("Cycles to add 1er if " + newCyclesToAdd);

              newCyclesToAdd.forEach((cycle) => {
                this.$store.dispatch("actionCreateCycle", { nomCycle: cycle });
              });
            } else {
              cyclesToDelete = this.firstSaveCycles.filter(
                (cycle) => !this.editedCycles.includes(cycle)
              );

              console.log("Cycles to delete 1er if " + cyclesToDelete);
              cyclesToDelete.forEach((cycle) => {
                this.$store.dispatch("actionDeleteCycle", { nomCycle: cycle });
              });

              newCyclesToAdd = this.editedCycles.filter(
                (cycle) => !this.firstSaveCycles.includes(cycle)
              );
              console.log("New Cycles to create 1er if " + newCyclesToAdd);
              newCyclesToAdd.forEach((cycle) => {
                this.$store.dispatch("actionCreateCycle", { nomCycle: cycle });
              });
            }
          } else {
            // si les 2 new cycles sont exactement dans la 1ere liste alors je supprime le ou les cycles de trop et si non je dois créer le ou les cycles qui manquent et laisse le reste
            if (
              this.editedCycles.every((x) => this.firstSaveCycles.includes(x))
            ) {
              cyclesToDelete = this.firstSaveCycles.filter(
                (cycle) => !this.editedCycles.includes(cycle)
              );

              console.log("Cycles to delete dans le else " + cyclesToDelete);
              cyclesToDelete.forEach((cycle) => {
                this.$store.dispatch("actionDeleteCycle", { nomCycle: cycle });
              });
            } else {
              newCyclesToAdd = this.firstSaveCycles.filter(
                (cycle) => !this.editedCycles.includes(cycle)
              );
              console.log("Cycles to add dans le else  " + newCyclesToAdd);
              newCyclesToAdd.forEach((cycle) => {
                this.$store.dispatch("actionCreateCycle", { nomCycle: cycle });
              });
            }
          }

          /* newCycles.forEach((cycle) => {
            this.$store.dispatch("actionCreateCycle", { nomCycle: cycle });
          });*/
        }

        setTimeout(() => {
          this.loading = false;
        }, 2000);
      } else {
        console.log("création impossible Partie droite Ecole");
      }
      //création cycle Garderie
      if (this.editEcole.garderie && this.editEcole.nbreSalleGarderie > 0) {
        console.log("pret à ajouter le cycle garderie");
        this.$store.dispatch("actionCreateCycle", { nomCycle: "Garderie" });
      }
    },

    confirmAll() {
      //   editedCycles: null,
      // editedGarderie: false,
      // nbreSites: 0,
      // editedNbreSallesGarderie: 0,
      this.loading = true;
      // const annee = new Date();
      //const year = annee.getFullYear() + "-" + (annee.getFullYear() + 1);

      this.editedCycles.forEach((cycle) => {
        this.$store.dispatch("actionCreateCycle", { nomCycle: cycle });
      });

      if (this.editEcole.heuresMidi) {
        this.editEcole.vagues = "matin et midi";
      } else {
        this.editEcole.vagues = "matin uniquement";
      }
      this.editEcole.nbreSalleGarderie = parseInt(
        this.editEcole.nbreSalleGarderie
      );
      this.$store.dispatch("actionCreateEcole", this.editEcole);
      // création autant de sites que le nombre de sites entré
      if (this.editEcole.nbreSites >= 1) {
        let index = 0;
        while (index < this.editEcole.nbreSites) {
          this.$store.dispatch("actionCreateSite", {
            numeroSite: index + 1,
          });
          index++;
        }
      }
      //création cycle Garderie
      if (this.editEcole.garderie && this.editEcole.nbreSalleGarderie > 0) {
        console.log("pret à ajouter le cycle garderie");
        this.$store.dispatch("actionCreateCycle", { nomCycle: "Garderie" });
      }
      this.loading = false;
      this.showAutresConfig = true;
      this.$vuetify.goTo(document.body.scrollHeight);
      this.showBtnModify = true;
      this.contentBtn = "Modifier";
    },
  },
};
</script>

<style></style>
