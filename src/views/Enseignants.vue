<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        Matières enseignées
        <v-icon>mdi-hammer-wrench</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Enseignants
        <v-icon>mdi-teach</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Assiduité des profs
        <v-icon>mdi-account-box</v-icon>
      </v-tab>

      <!-- <v-tab href="#tab-4">
        Test code
        <v-icon>mdi-account-box</v-icon>
      </v-tab> -->
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :value="'tab-1'">
        <v-card flat>
          <matieres />
        </v-card>
      </v-tab-item>

      <v-tab-item :value="'tab-2'">
        <v-card flat>
          <teachers />
        </v-card>
      </v-tab-item>

      <v-tab-item :value="'tab-3'">
        <v-card flat>
          <PresencesEnseignants />
        </v-card>
      </v-tab-item>

      <!-- <v-tab-item :value="'tab-4'">
        <v-card flat>
          <TestCode />
        </v-card>
      </v-tab-item> -->
    </v-tabs-items>
  </v-card>
</template>

<script>
import Matieres from "@/components/Enseignants/Matieres.vue";
import Teachers from "@/components/Enseignants/Teachers.vue";
import PresencesEnseignants from "@/components/Enseignants/PresencesEnseignants.vue";

export default {
  name: "Enseignants",
  components: {
    Teachers,
    Matieres,
    PresencesEnseignants,
    //  TestCode,
  },
  data() {
    return {
      tab: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
};
</script>
<style lang=""></style>
