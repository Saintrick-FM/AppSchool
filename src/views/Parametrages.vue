<template>
  <div>
    <v-stepper v-model="etape">
      <v-stepper-header>
        <v-stepper-step :complete="etape > 1" step="1">
          Etablissement
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="etape > 2" step="2">
          Année Scolaire
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="etape > 3" step="3">
          Finances
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">
          Pédagogie
        </v-stepper-step>
      </v-stepper-header>
      <!-- ******************************************* -->

      <!-- ******************************************* -->

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-badge
            :content="`messages %`"
            style="position:fixed"
            :value="messages"
            elevation-1
            color="red"
            bottom
            left
            overlap
          >
            <v-btn
              class="white--text"
              style=" margin:0px 30px -6px -2px"
              elevation="3"
              depressed
            >
              <v-icon large color="red" style=" margin-right:20px">
                mdi-vuetify
              </v-icon>
            </v-btn>
          </v-badge>

          <!-- <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card> -->
          <etablissement></etablissement>
          <v-btn
            color="#4a148c"
            style="margin:50px 10px 30px 0px"
            @click="nextStep1"
          >
            <span style="color:white">Etape suivante</span>
          </v-btn>

          <v-btn text style="margin:50px 0px 30px 10px">
            Annuler
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-badge
            :content="`${messages} %`"
            style="position:fixed"
            :value="messages"
            elevation-1
            color="red"
            bottom
            left
            overlap
          >
            <v-btn
              class="white--text"
              style=" margin:0px 30px -6px -2px"
              elevation="3"
              depressed
            >
              <v-icon large color="red" style=" margin-right:20px">
                mdi-vuetify
              </v-icon>
            </v-btn>
          </v-badge>

          <annee-scolaire></annee-scolaire>

          <v-btn
            color="primary"
            style="margin:50px 10px 30px 0px"
            @click="nextStep2"
          >
            Etape suivante
          </v-btn>

          <v-btn @click="previousStep1" style="margin:50px 10px 30px 0px" text>
            Etape précédente
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-badge
            :content="`${messages} %`"
            style="position:fixed"
            :value="messages"
            elevation-1
            color="red"
            bottom
            left
            overlap
          >
            <v-btn
              class="white--text"
              style=" margin:0px 30px -6px -2px"
              elevation="3"
              depressed
            >
              <v-icon large color="red" style=" margin-right:20px">
                mdi-vuetify
              </v-icon>
            </v-btn>
          </v-badge>

          <finances></finances>

          <v-btn
            color="primary"
            style="margin:50px 10px 30px 0px"
            @click="nextStep3"
          >
            Etape suivante
          </v-btn>

          <v-btn style="margin:50px 10px 30px 0px" @click="previousStep2" text>
            Etape précédente
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-badge
            :content="`${messages} %`"
            style="position:fixed"
            :value="messages"
            elevation-1
            color="red"
            bottom
            left
            overlap
          >
            <v-btn
              class="white--text"
              style=" margin:0px 30px -6px -2px"
              elevation="3"
              depressed
            >
              <v-icon large color="red" style=" margin-right:20px">
                mdi-vuetify
              </v-icon>
            </v-btn>
          </v-badge>

          <!-- <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card> -->
          <pedagogie></pedagogie>

          <v-btn
            style="margin:50px 10px 30px 0px"
            color="primary"
            @click="nextStepFinal()"
            route
            :to="nextStepFinal() ? 'eleves' : ''"
          >
            Etape suivante
          </v-btn>

          <v-btn @click="previousStep3" style="margin:50px 10px 30px 0px" text>
            Etape précédente
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import AnneeScolaire from "@/components/Parametrages/AnneeScolaire.vue";
import Etablissement from "@/components/Parametrages/Etablissement.vue";
import Finances from "@/components/Parametrages/Finances.vue";
import Pedagogie from "@/components/Parametrages/Pedagogie.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Parametrages",
  components: {
    Etablissement,
    AnneeScolaire,
    Finances,
    Pedagogie,
  },
  data() {
    return {
      messages: 0,
      show: false,
      etape: 1,
    };
  },
  methods: {
    ...mapActions(["setParamsNotDone"]),
    nextStepFinal() {
      if (this.messages === 75) {
        localStorage.setItem("allParamsDone", "Vrai");
        return true;
      } else {
        return false;
      }
    },
    nextStep1() {
      let Ecole = localStorage.getItem("Ecole");
      let Classes = JSON.parse(localStorage.getItem("Classes"));
      let Matieres = JSON.parse(localStorage.getItem("Matieres"));

      Classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

      if (Ecole && Classes && Matieres) {
        if (Classes.length > 14) {
          this.messages += 40;
          console.log("this.etape " + this.etape);
          this.etape++;
        } else {
          let details = {
            source: "configEtablissement",
            message: "Il reste encore des classes à ajouter",
          };
          this.setParamsNotDone(details);
        }
      } else {
        let details = {
          source: "configEtablissement",
          message:
            "Veuillez d'abord finaliser tous les réglages (Ecole, Classes, Matieres) ",
        };

        this.setParamsNotDone(details);
        console.log("Oups il faut d'abord enregistrer l'école ");
      }
    },
    nextStep2() {
      let anneeScolaire = localStorage.getItem("année_scolaire");

      if (anneeScolaire) {
        this.messages += 10;
        console.log("this.etape " + this.etape);
        this.etape++;
      } else {
        let details = {
          source: "configAnneeScolaire",
          message:
            "Veuillez enregistrer l'année scolaire à partir duquel vous débuter ",
        };

        this.setParamsNotDone(details);
        console.log("Oups il faut d'abord enregistrer l'école ");
      }
    },
    nextStep3() {
      let ConfigEcolage = localStorage.getItem("Config_Ecolage_et_Autres");
      let Config_Autres_Frais = JSON.parse(
        localStorage.getItem("Config_Autres_Frais")
      );
      let ConfigDepenses = JSON.parse(localStorage.getItem("Config_Dépenses"));
      let ConfigInscReinsc = JSON.parse(
        localStorage.getItem("Config inscReinsc")
      );

      ConfigEcolage = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      ConfigInscReinsc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

      if (
        ConfigEcolage &&
        ConfigInscReinsc &&
        Config_Autres_Frais &&
        ConfigDepenses
      ) {
        if (ConfigEcolage.length > 14 && ConfigInscReinsc.length > 14) {
          this.messages += 25;
          console.log("this.etape " + this.etape);
          this.etape++;
        } else {
          let details = {
            source: "configFinances",
            message:
              "Il reste des frais mensuels et/ou des frais Insc-Réinsc à ajouter",
          };
          this.setParamsNotDone(details);
        }
      } else {
        let details = {
          source: "configEtablissement",
          message:
            "Veuillez d'abord finaliser tous les réglages (Ecolages, Insc-Réinsc et Autres) ",
        };
        ConfigEcolage &&
        ConfigInscReinsc &&
        Config_Autres_Frais &&
        !ConfigDepenses
          ? (details.message =
              "Il vous reste encore les dépenses de l'école à ajouter")
          : details.message;

        this.setParamsNotDone(details);
        console.log("Oups il faut d'abord enregistrer l'école ");
      }
    },

    previousStep1() {
      this.messages -= 40;
      this.etape--;
    },
    previousStep2() {
      this.messages -= 10;
      this.etape--;
    },
    previousStep3() {
      this.messages -= 25;
      this.etape--;
    },
  },
  watch: {
    messages(newValue, oldValue) {
      newValue || oldValue;
    },
  },
  computed: {
    ...mapGetters([
      "Ecole",
      "Classes",
      "AllMatieres",
      "anneesScolaire",
      "AllConfigInscReinsc",
      "AllConfigAutresFrais",
      "AllConfigEcolage",
    ]),
  },
};
</script>
<style lang=""></style>
