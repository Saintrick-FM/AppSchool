<template>
  <div>
    <v-app-bar class="appbar" app>
      <v-app-bar-nav-icon @click="emitDrawer"></v-app-bar-nav-icon>
      <v-toolbar v-if="checkedToken">
        <v-toolbar-title>Ecole Saint Martin</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-title>
          📅 Année scolaire: {{ annee_scolaire }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <tooltipA /> <tooltipB /><tooltipD /> <tooltipC @click="EmitAlert" />
        </v-toolbar-items>
      </v-toolbar>

      <v-toolbar v-else>
        <v-toolbar-title>Ecole Saint Martin</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-spacer></v-spacer>
        <v-toolbar-title style="color: red">
          Désolé vous n'etes pas connecté
        </v-toolbar-title>
      </v-toolbar>
    </v-app-bar>
    <LogoutAlert v-if="Alert == true" />
  </div>
</template>

<script>
import tooltipA from "@/components/NavbarHaut/TooltipA.vue";
import tooltipB from "@/components/NavbarHaut/TooltipB.vue";
import tooltipC from "@/components/NavbarHaut/TooltipC.vue";
import tooltipD from "@/components/NavbarHaut/TooltipD.vue";
import LogoutAlert from "@/components/LogoutAlert";
export default {
  name: "NavbarHaut",
  components: {
    tooltipA,
    tooltipB,
    tooltipC,
    tooltipD,
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
      this.Alert = true;
      //this.$store.commit("setAlertLogout", true);
      // const toPath = this.$route.query.to || "/deconnexion";
      // this.$router.push(toPath);
    },
  },
  beforeMount() {
    if (typeof localStorage.getItem("année_scolaire") === "string") {
      this.annee_scolaire = localStorage.getItem("année_scolaire");
    } else {
      this.annee_scolaire = JSON.parse(
        localStorage.getItem("année_scolaire")
      ).anneeScolaire;
    }
    //this.annee_scolaire = this.$store.state.annee_scolaire;
  },
  computed: {
    checkedToken: function() {
      let token = localStorage.getItem("token");
      if (token == "null") {
        console.log("false");
        return false;
      } else {
        console.log("true");
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
