<template>
  <v-row style="margin-left:50px">
    <h2
      class="purple--text text-uppercase text-center"
      style="margin-top:10px;flex:auto"
      v-if="showModifAlert"
    >
      Modification Année scolaire : {{ yearToModify }}
    </h2>
    <v-row class="text-center">
      <v-col md="6">
        <v-card elevation="11" class="pt-10">
          <h2 class="purple--text text-uppercase">Rentrée</h2>
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
                <v-autocomplete
                  :items="threeLastYears"
                  :rules="[(v) => !!v || 'Vous devez renseigner ce champs']"
                  required
                  outlined
                  shaped
                  v-model="editAnnee.anneeScolaire"
                  label="Année scolaire*"
                  auto-select-first
                  placeholder="1er choix recommandé"
                  small-chips
                ></v-autocomplete>
              </v-col>
              <v-col md="6">
                <v-text-field
                  label="Date de début d'inscriptions"
                  v-model="editAnnee.debutInscriptions"
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
                  label="Date Ouverture administrative"
                  v-model="editAnnee.ouvertureAdministratif"
                  :rules="[(v) => !!v || 'Vous devez renseigner ce champs']"
                  required
                  type="date"
                  filled
                  shaped
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  label="Date rentrée scolaire"
                  v-model="editAnnee.rentreeScolaire"
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

      <v-col md="6">
        <v-card elevation="11" class="pt-10">
          <h2 class="purple--text text-uppercase">Congés</h2>
          <v-divider color="purple" class="mt-2"></v-divider>

          <v-form
            @submit.prevent="onLoginConges"
            ref="form"
            v-model="valid"
            lazy-validation
            class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
          >
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Période congés 1er trimestre "
                  v-model="editAnnee.conges1erTrimestre"
                  outlined
                  shaped
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Période congés 2e trimestre"
                  v-model="editAnnee.conges2eTrimestre"
                  outlined
                  shaped
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Date début de vacances (élèves)"
                  v-model="editAnnee.debutVacancesScolaire"
                  type="date"
                  filled
                  shaped
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  label="Date début de vacances (personnel)"
                  v-model="editAnnee.debutVacancesAdministratives"
                  type="date"
                  filled
                  shaped
                ></v-text-field>
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
        <span class="white--text">{{ contentbuttonSaveOrUpdate }}</span>
        <v-icon light>mdi-cached</v-icon>
      </v-btn>

      <v-card>
        <v-card-title>
          Liste des années scolaires
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Recherche"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          style="width: 1450px"
          hide-default-footer
          :headers="headers"
          :items="allYears"
          :search="search"
          type="button"
          @click:row="anneeClicked"
        ></v-data-table>
      </v-card>
    </v-row>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

mapGetters;
export default {
  name: "AnneeScolaire",
  data: () => ({
    search: "",
    showModifAlert: false,
    yearToModify: null,
    threeLastYears: [],
    allYears: [],

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
    editAnnee: {
      cree_le: null,
      anneeScolaire: null,
      debutInscriptions: null,
      ouvertureAdministratif: null,
      rentreeScolaire: null,

      conges1erTrimestre: null,
      conges2eTrimestre: null,
      debutVacancesScolaire: null,
      debutVacancesAdministratives: null,
      statut: null,
    },
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
  computed: {
    ...mapGetters(["anneesScolaire"]),
    contentbuttonSaveOrUpdate() {
      if (this.showModifAlert) {
        return "Confirmer les modifications";
      } else {
        return "Tout enregistrer";
      }
    },
  },
  created() {
    this.$store.dispatch("actionGetSchoolYears");
  },
  beforeMount() {
    // je reinitialise le state de configNot Done à rien du tout
    let details = {
      message: null,
    };
    this.configNotDone(details);
    let annees_scolaires = JSON.parse(localStorage.getItem("annees_scolaires"));
    if (annees_scolaires) {
      setTimeout(() => {
        annees_scolaires.forEach((year) => {
          this.allYears.push(year);
        });
      }, 1000);
    }

    let actualYear = localStorage.getItem("annee_scolaire");

    console.log(
      "anneesScolaire de mapGetters " +
        JSON.stringify(this.anneesScolaire) +
        "\n\n\nallYears => " +
        JSON.stringify(this.allYears)
    );
    if (actualYear !== "null") {
      this.threeLastYears[0] = actualYear;
      this.threeLastYears[1] = String(
        parseInt(actualYear.slice(0, 4) - 1)
      ).concat("-" + parseInt(actualYear.slice(0, 4)));
      console.log("threeLastYears[0] " + this.threeLastYears[0]);
    } else {
      const annee = new Date();
      this.threeLastYears[0] =
        annee.getFullYear() + "-" + (annee.getFullYear() + 1);
      console.log("threeLastYears[1] " + this.threeLastYears[0]);
      this.threeLastYears[1] = String(
        parseInt(this.threeLastYears[0].slice(0, 4) - 1)
      ).concat("-" + parseInt(this.threeLastYears[0].slice(0, 4)));
    }
  },

  watch: {
    allYears(newValue, oldValue) {
      newValue || oldValue;
    },
  },

  methods: {
    ...mapMutations(["configNotDone"]),
    //..validate inputs
    validate() {
      this.$refs.form.validate();
      console.log("this.editAnnee " + this.editAnnee);
    },

    anneeClicked: function(item, row) {
      row.select(true);
      console.log("item cliqué" + JSON.stringify(item));
      console.log(
        "anneesScolaire de mapGetters " +
          JSON.stringify(this.anneesScolaire) +
          "\nallYears => " +
          this.allYears
      );
      this.showModifAlert = true;
      this.yearToModify = item.anneeScolaire;
      this.$vuetify.goTo(document.body.scrollTop);
      this.editAnnee.cree_le = item.cree_le;

      this.editAnnee.anneeScolaire = item.anneeScolaire;
      this.editAnnee.debutInscriptions = item.debutInscriptions;
      this.editAnnee.rentreeScolaire = item.rentreeScolaire;
      this.editAnnee.ouvertureAdministratif = item.ouvertureAdministratif;

      this.editAnnee.conges1erTrimestre = item.conges1erTrimestre;
      this.editAnnee.conges2eTrimestre = item.conges2eTrimestre;
      this.editAnnee.debutVacancesScolaire = item.debutVacancesScolaire;
      this.editAnnee.debutVacancesAdministratives =
        item.debutVacancesAdministratives;
      this.editAnnee.statut = item.statut;
      // = Object.assign(item);
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
    confirmAll() {
      this.allYears = [];
      console.log(this.$refs.form.validate());
      console.log(
        "this.editAnnee dans confirmAll " + JSON.stringify(this.editAnnee)
      );

      if (this.showModifAlert) {
        console.log("editAnnee showModif" + JSON.stringify(this.editAnnee));
        this.editAnnee.statut = "année ouverte";
        this.$store.dispatch("actionModifAnneeScolaire", this.editAnnee);
        this.$store.dispatch("actionGetSchoolYears");

        setTimeout(() => {
          this.showModifAlert = false;
          this.$vuetify.goTo(document.body.scrollHeight);
          this.allYears = this.anneesScolaire.map((item) => item);
          console.log("new allYears " + JSON.stringify(this.allYears));
        }, 1500);
      } else {
        this.editAnnee.statut = "année ouverte";
        console.log("editAnnee " + JSON.stringify(this.editAnnee));
        this.$store.dispatch("actionNewAnneeScolaire", this.editAnnee);
        this.$store.dispatch("actionGetSchoolYears");
        setTimeout(() => {
          this.$vuetify.goTo(document.body.scrollHeight);
          this.allYears = this.anneesScolaire.map((item) => item);
          console.log("new allYears " + JSON.stringify(this.allYears));
        }, 1500);
      }
    },
  },
};
</script>

<style></style>
