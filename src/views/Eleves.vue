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
        Liste Elèves
        <v-icon>mdi-hammer-wrench</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Scolarité
        <v-icon>mdi-teach</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Eleves par Classes
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
          <liste-eleves />
        </v-card>
      </v-tab-item>

      <v-tab-item :value="'tab-2'">
        <v-card flat>
          <scolarite />
        </v-card>
      </v-tab-item>

      <v-tab-item :value="'tab-3'">
        <v-card flat>
          <Classes />
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
import ListeEleves from "@/components/ListeEleves.vue";
import Scolarite from "@/components/Scolarite.vue";
import Classes from "@/components/Classes.vue";

//import TestCode from "@/components/TestCode.vue";

export default {
  name: "Enseignants",
  components: {
    Scolarite,
    ListeEleves,
    Classes,

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
