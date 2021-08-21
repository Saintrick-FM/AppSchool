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
            @submit.prevent="onLoginRentree"
            ref="form"
            v-model="valid"
            lazy-validation
            class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
          >
            <v-row>
              <v-col md="6">
                <v-text-field
                  label="Nom de l'école"
                  v-model="editEcole.nom"
                  outlined
                  type="date"
                  :rules="[(v) => !!v || 'Vous devez renseigner ce champs']"
                  required
                  shaped
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  label="Devise"
                  v-model="editEcole.devise"
                  outlined
                  type="date"
                  :rules="[(v) => !!v || 'Vous devez renseigner ce champs']"
                  required
                  shaped
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Ville"
                  v-model="editEcole.ville"
                  :rules="[(v) => !!v || 'Vous devez renseigner ce champs']"
                  required
                  type="date"
                  filled
                  shaped
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  label="Adresse"
                  v-model="editEcole.adresse"
                  :rules="[(v) => !!v || 'Vous devez renseigner ce champs']"
                  required
                  type="date"
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
                  type="date"
                  filled
                  shaped
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  label="Email"
                  v-model="editEcole.email"
                  :rules="[(v) => !!v || 'Vous devez renseigner ce champs']"
                  required
                  type="date"
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
              color="purple darken-4"
              class="mr-4 text"
              @click="validate"
            >
              <span class="white--text">Enregistrer</span>
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
            @submit.prevent="onLogin"
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
                  v-model="editEcole.prefixematricule"
                  placeholder="préfixe des matricules pour examens"
                  outlined
                  shaped
                ></v-text-field>
              </v-col>

              <!-- <v-col cols="12" sm="6">
                <v-select
                  v-model="editEcole.typeProgramme"
                  :items="['Congolais', 'Français', 'Franco-Congolais']"
                  attach
                  chips
                  label="Programme suivi"
                  filled
                  shaped
                ></v-select>
              </v-col> -->
            </v-row>

            <v-row>
              <v-col md="2">
                <v-switch label="Matin" v-model="editEcole.matin"> </v-switch>
              </v-col>
              <v-col md="2" width="70px">
                <v-text-field
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
                  placeholder="Ex:7h-13h"
                  label="Recré"
                  v-model="editEcole.recreMatin"
                  outlined
                  color
                >
                </v-text-field>
              </v-col>

              <v-col md="2">
                <v-switch label="Midi" v-model="editEcole.midi"> </v-switch>
              </v-col>
              <v-col md="" width="70px">
                <v-text-field
                  type=""
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
              <v-col md="7">
                <v-combobox
                  width="35px"
                  :items="nomsCycles"
                  required
                  deletable-chips
                  outlined
                  shaped
                  v-model="editEcole.cycles"
                  label="Cycles d'enseignements*"
                  chips
                  multiple
                ></v-combobox>
              </v-col>
              <v-col md="3">
                <v-switch
                  label="Garderie"
                  v-model="editEcole.garderie"
                ></v-switch>
              </v-col>
              <v-col md="2">
                <v-text-field
                  placeholder="En Garderie"
                  type="number"
                  shaped
                  label="Nombre de classes"
                  v-model="editEcole.nbreSallesGarderie"
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
              color="purple darken-4"
              class="mr-4 text"
              @click="validate"
            >
              <span class="white--text">Enregistrez</span>
              <v-icon light>mdi-cached</v-icon>
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-btn
        x-large
        type="submit"
        block
        :disabled="!valid"
        color="purple darken-4"
        class="mr-4 text"
        @click="confirmAll"
      >
        <span class="white--text">Tout enregistrer</span>
        <v-icon light>mdi-cached</v-icon>
      </v-btn>

      <v-card class="mt-5" style="flex:auto">
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
              <config-classes :Cycles="Cycles" :nomsCycles="editEcole.cycles" />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <configMatieres />
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
    nomsCycles: ["Prescolaire", "Primaire", "College", "Lycée"],
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
      adresse: null,
      telephone: null,
      email: null,
      typeProgramme: null,
      cycles: null,
      garderie: false,
      nbreSallesGarderie: 0,
    },

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
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 8) || "Password must be less than 8 characters",
    ],
  }),
  computed: {},
  created() {},
  beforeMount() {},

  watch: {},

  methods: {
    //..validate inputs
    validate() {
      this.$refs.form.validate();
      console.log("this.editAnnee " + this.editAnnee);
    },

    //Login method here
    onLoginRentree() {
      //api call here

      console.log("On loginRentree " + JSON.stringify(this.editAnnee));
      console.log(this.$refs.form.validate());
      //this.$store.dispatch("actionNewAnneeScolaire", anneeScolaire);
    },
    onLoginConges() {
      //api call here
      console.log("On login Congés " + JSON.stringify(this.editAnnee));
    },
    confirmAll() {},
  },
};
</script>

<style></style>
