<template>
  <v-row style="margin-left:50px">
    <h2 class="purple--text text-uppercase" v-if="showModifAlert">
      Modification{{}}
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
                  v-model="editAnnee.yearSet"
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
                  v-model="editAnnee.dateOuvertureAdministrative"
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
                  v-model="editAnnee.dateRentreeScolaire"
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
                  v-model="editAnnee.congesPremierTrimestre"
                  outlined
                  shaped
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Période congés 2e trimestre"
                  v-model="editAnnee.congesDeuxiemeTrimestre"
                  outlined
                  shaped
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Date début de vacances (élèves)"
                  v-model="editAnnee.debutVacanceScolaire"
                  type="date"
                  filled
                  shaped
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  label="Date début de vacances (personnel)"
                  v-model="editAnnee.debutVacancesPersonnel"
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
              <span class="white--text">Enregistrer</span>
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

      <v-card>
        <v-card-title>
          Nutrition
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="allYears"
          :search="search"
          @click:row="anneeClicked"
        ></v-data-table>
      </v-card>
    </v-row>
    <v-divider></v-divider>
    <v-divider></v-divider>
  </v-row>
</template>

<script>
export default {
  name: "AnneeScolaire",
  data: () => ({
    search: "",
    allYears: [],
    showModifAlert: false,
    threeLastYears: [],

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
      { text: "Congés du 2e trimestre", value: "congees2eTrimestre" },
      {
        text: "Grandes Vacances",
        value: "debutVacancesScolaire",
        sortable: true,
      },
      { text: "Statut", value: "Statut" },
      { text: "Moidifier", value: "actions" },
    ],
    editAnnee: {
      yearSet: null,
      debutInscriptions: null,
      dateOuvertureAdministrative: null,
      dateRentreeScolaire: null,

      congesPremierTrimestre: null,
      congesDeuxiemeTrimestre: null,
      debutVacancesScolaire: null,
      debutVacancesPersonnel: null,
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
  beforeMount() {
    let actualYear = localStorage.getItem("année_scolaire");
    let allYears = JSON.parse(localStorage.getItem("annees_scolaires"));
    allYears.forEach((year) => {
      this.allYears.push(year);
    });
    console.log(
      String(parseInt(actualYear.slice(-4))).concat(
        "-" + parseInt(actualYear.slice(0, 4))
      )
    );

    this.threeLastYears[0] = actualYear;
    this.threeLastYears[1] = String(
      parseInt(actualYear.slice(0, 4) - 1)
    ).concat("-" + parseInt(actualYear.slice(0, 4)));
  },

  methods: {
    //..validate inputs
    validate() {
      this.$refs.form.validate();
      console.log("this.editAnnee " + this.editAnnee);
    },

    anneeClicked: function(item, row) {
      row.select(true);
      console.log("Type item " + JSON.stringify(item));
      this.$vuetify.goTo(document.body.scrollTop);
      this.editAnnee.yearSet = item.anneeScolaire;
      this.editAnnee.debutInscriptions = item.debutInscriptions;
      this.editAnnee.rentreeScolaire = item.rentreeScolaire;
      this.editAnnee.ouvertureAdministratif = item.ouvertureAdministratif;

      this.editAnnee.congesPremierTrimestre = item.conges1erTrimestre;
      this.editAnnee.congesDeuxiemeTrimestre = item.conges2eTrimestre;
      this.editAnnee.debutVacanceScolaire = item.debutVacancesScolaire;
      this.editAnnee.debutVacancesPersonnel = item.debutVacancesAdministratives;
      this.editAnnee.statut = item.statut;
      // = Object.assign(item);
    },
    //Login method here
    onLoginRentree() {
      //api call here
      /* let anneeScolaire = {
        anneeScolaire: this.editAnnee.yearSet,
        ouvertureAdministratif: this.editAnnee.dateOuvertureAdministrative,
        debutInscriptions: this.editAnnee.debutInscriptions,
        rentreeScolaire: this.editAnnee.dateRentreeScolaire,
        conges1erTrimestre: this.editAnnee.congesPremierTrimestre,
        conges2eTrimestre: this.editAnnee.congesDeuxiemeTrimestre,
        debutVacancesScolaire: this.editAnnee.debutVacancesScolaire,
        debutVacancesAdministratives: this.editAnnee
          .debutVacancesAdministratives,
        statut: "année ouverte",
      };*/
      console.log("On loginRentree " + JSON.stringify(this.editAnnee));
      console.log(this.$refs.form.validate());
      //this.$store.dispatch("actionNewAnneeScolaire", anneeScolaire);
    },
    onLoginConges() {
      //api call here
      console.log("On login Congés " + JSON.stringify(this.editAnnee));
    },
    confirmAll() {
      console.log(this.$refs.form.validate());
      console.log(
        "this.editAnnee dans confirmAll " + JSON.stringify(this.editAnnee)
      );
    },
  },
};
</script>

<style></style>
