<template>
  <div>
    <v-app-bar class="appbar" app>
      <v-app-bar-nav-icon @click="emitDrawer"></v-app-bar-nav-icon>
      <v-toolbar>
        <v-toolbar-title>Ecole Saint Martin</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-title>
          📅 Année scolaire: {{ annee_scolaire }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <tooltipA /> <tooltipB /> <tooltipC @AlertLogout="EmitAlert" />
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar>
    <LogoutAlert v-if="Alert == true" />
  </div>
</template>

<script>
import tooltipA from "@/components/TooltipA.vue";
import tooltipB from "@/components/TooltipB.vue";
import tooltipC from "@/components/TooltipC.vue";
import LogoutAlert from "@/components/LogoutAlert";
export default {
  name: "NavbarHaut",
  components: {
    tooltipA,
    tooltipB,
    tooltipC,
    LogoutAlert,
  },
  data() {
    return {
      drawerTop: null,
      annee_scolaire: "",
      Alert: false,
    };
  },
  methods: {
    emitDrawer() {
      this.$emit("emitDrawer");
    },
    EmitAlert() {
      this.$store.commit("setAlertLogout", true);
      this.Alert = this.$store.state.AlertLogout;
      // this.$store.commit("removeToken");
      // localStorage.setItem("token", "");
      // const toPath = this.$route.query.to || "/connexion";
      // this.$router.push(toPath);
    },
  },
  beforeMount() {
    //this.annee_scolaire = localStorage.getItem("année scolaire");
    this.annee_scolaire = this.$store.state.annee_scolaire;
  },
};
</script>

<style lang="scss" scoped></style>
