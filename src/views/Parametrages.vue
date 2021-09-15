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
            @click="nextStep"
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
            @click="nextStep"
          >
            Etape suivante
          </v-btn>

          <v-btn @click="previousStep" style="margin:50px 10px 30px 0px" text>
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
            @click="nextStep"
          >
            Etape suivante
          </v-btn>

          <v-btn style="margin:50px 10px 30px 0px" @click="previousStep" text>
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
            @click="nextStep2()"
            route
            :to="nextStep2() ? 'eleves' : ''"
          >
            Etape suivante
          </v-btn>

          <v-btn @click="previousStep" style="margin:50px 10px 30px 0px" text>
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
    nextStep2() {
      if (this.messages === 100) {
        localStorage.setItem("allParamsDone", "Vrai");
        return true;
      } else {
        return false;
      }
    },
    nextStep() {
      this.messages += 25;
      this.etape++;
      console.log("this.etape " + this.etape);
      if (this.etape === 2) {
        this.messages += 25;
      }
    },

    previousStep() {
      this.messages -= 25;
      this.etape--;
    },
  },
  watch: {
    messages(newValue, oldValue) {
      newValue || oldValue;
    },
  },
};
</script>
<style lang=""></style>
