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
        Recettes
        <v-icon>mdi-hammer-wrench</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Depenses
        <v-icon>mdi-teach</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Mouvements
        <v-icon>mdi-account-box</v-icon>
      </v-tab>

      <v-tab id="tab4" href="#tab4">
        Bilan
        <v-icon>mdi-account-box</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :value="'tab-1'">
        <v-card flat>
          <recettes />
        </v-card>
      </v-tab-item>

      <v-tab-item :value="'tab-2'">
        <v-card flat>
          <depenses />
        </v-card>
      </v-tab-item>

      <v-tab-item :value="'tab-3'">
        <v-card flat>
          <mouvements />
        </v-card>
      </v-tab-item>

      <v-tab-item :value="'tab4'">
        <v-card flat>
          <bilan />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Recettes from "@/components/Finances/Recettes.vue";
import Depenses from "@/components/Finances/Depenses.vue";
import Mouvements from "@/components/Finances/Mouvements.vue";
import Bilan from "@/components/Finances/Bilan.vue";

export default {
  name: "Finances",
  components: {
    Depenses,
    Recettes,
    Mouvements,
    Bilan,
  },
  data() {
    return {
      tab: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  mounted() {
    let tab4 = this.$route.fullPath.substr(-5);
    console.log("router " + typeof this.$route.fullPath + "--tab4 " + tab4);
    if (tab4 === "#tab4") {
      console.log("beug à résoudre");
    }
  },
};
</script>
<style lang=""></style>
