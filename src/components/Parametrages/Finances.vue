<template>
  <v-row style="margin-left:50px">
    <v-row class="text-center">
      <v-card id="configClasses" class="mt-5" style="flex:auto">
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title class="center"
            >Configurations Recettes et dépenses
          </v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
          <v-tab>
            <v-icon left>
              mdi-account
            </v-icon>
            Recettes
          </v-tab>
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-tab>
            <v-icon left>
              mdi-lock
            </v-icon>
            Dépenses
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <recettes />
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <depenses />
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
import Depenses from "@/components/Parametrages/Depenses.vue";
import Recettes from "@/components/Parametrages/Recettes.vue";
export default {
  components: {
    Depenses,
    Recettes,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
