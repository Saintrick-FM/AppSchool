<template>
  <div>
    <v-app-bar class="appbar" app>
      <v-app-bar-nav-icon @click="emitDrawer"></v-app-bar-nav-icon>
      <v-toolbar>
        <v-toolbar-title>Ecole Saint Martin</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-subtitle>
          📅 Année scolaire: {{ annee_scolaire }}
        </v-toolbar-subtitle>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <tooltipA /> <tooltipB /> <tooltipC />
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar>
  </div>
</template>

<script>
import tooltipA from "@/components/TooltipA.vue";
import tooltipB from "@/components/TooltipB.vue";
import tooltipC from "@/components/TooltipC.vue";
export default {
  name: "App",
  components: {
    tooltipA,
    tooltipB,
    tooltipC,
  },
  data() {
    return {
      drawerTop: null,
      annee_scolaire: "",
    };
  },
  methods: {
    emitDrawer() {
      this.$emit("emitDrawer");
    },
  },
  beforeMount() {
    //this.annee_scolaire = localStorage.getItem("année scolaire");
    this.annee_scolaire = this.$store.state.annee_scolaire;
  },
};
</script>

<style lang="scss" scoped></style>
