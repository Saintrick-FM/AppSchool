<template>
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

    <v-stepper-items>
      <v-stepper-content step="1">
        <!-- <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card> -->
        <etablissement></etablissement>
        <v-btn
          color="#4a148c"
          style="margin:50px 10px 30px 0px"
          @click="etape = 2"
        >
          <span style="color:white">Etape suivante</span>
        </v-btn>

        <v-btn text style="margin:50px 0px 30px 10px">
          Annuler
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <annee-scolaire></annee-scolaire>

        <v-btn
          color="primary"
          style="margin:50px 10px 30px 0px"
          @click="etape = 3"
        >
          Etape suivante
        </v-btn>

        <v-btn @click="etape = 1" style="margin:50px 10px 30px 0px" text>
          Etape précédente
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <finances></finances>

        <v-btn
          color="primary"
          style="margin:50px 10px 30px 0px"
          @click="etape = 4"
        >
          Etape suivante
        </v-btn>

        <v-btn style="margin:50px 10px 30px 0px" @click="etape = 2" text>
          Etape précédente
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <!-- <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card> -->
        <pedagogie></pedagogie>

        <v-btn to="/finances" style="margin:50px 10px 30px 0px" color="primary">
          Etape suivante
        </v-btn>

        <v-btn @click="etape = 3" style="margin:50px 10px 30px 0px" text>
          Etape précédente
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
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
      etape: 1,
    };
  },
};
</script>
<style lang=""></style>
