<template lang="">
  <v-app>
    <v-navigation-drawer v-model="drawerTop" app>
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-avatar class="px-2">
              <v-img src="@/assets/logo.svg"></v-img>
            </v-list-item-avatar>
            <v-list-item-title class="title">
              Ecole Saint Martin
            </v-list-item-title>
            <v-list-item-subtitle
              >Amour, Travail, Réussite
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider /> <RubriqueNav v-if="checkedToken" />
    </v-navigation-drawer>
    <NavbarHaut v-on:emitDrawer="initialise" v-if="checkedToken" />
    <Parametrages v-if="jamaisVisible" />

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      <v-alert
        transition="dialog-top-transition"
        text
        prominent
        type="error"
        icon="mdi-cloud-alert"
        max-width="1200"
        border="bottom"
        color="pink darken-1"
        colored-border
        v-if="show || messageParamNotDone"
      >
        <h2
          style="color:#d81b60; margin-left:30px; position:absolute; margin-top:-2px"
        >
          {{ message }}
          {{ messageParamNotDone }}
        </h2>
      </v-alert>
    </v-main>
  </v-app>
</template>
<script>
import axios from "axios";
import RubriqueNav from "@/components/RubriqueNav";
import NavbarHaut from "@/components/NavbarHaut";
import Parametrages from "@/views/Parametrages";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    RubriqueNav,
    NavbarHaut,
    Parametrages,
  },
  watch: {
    show(newValue, oldValue) {
      newValue || oldValue;
    },
  },
  data: () => ({
    //
    jamaisVisible: false,
    drawerTop: null,
    annee_scolaire: "",
    show: null,
    message: null,
  }),
  beforeCreate() {
    const checkToken = this.checkToken;
    this.checkAnneeScolaire;
    if (checkToken == false) {
      axios.defaults.headers.common["Authorization"] = "";
    } else {
      this.drawerTop = false;
      axios.defaults.headers.common["Authorization"] = "Token " + checkToken;
    }
  },
  beforeMount() {
    let allParamsDone = localStorage.getItem("allParamsDone");
    if (!allParamsDone) {
      localStorage.setItem("allParamsDone", "Non");
    }
    if (allParamsDone !== "Vrai") {
      console.log("if " + allParamsDone);
      this.show = true;
      this.message =
        "Veuillez finaliser tous les parametrages du logiciel afin que vous en ayez un accès complet";
    }
  },
  computed: {
    checkedToken: function() {
      return localStorage.getItem("token");
    },
    ...mapGetters(["messageParamNotDone"]),
  },

  methods: {
    paramsDone() {
      console.log("Message éffacé");
      this.show = false;
    },
    checkToken() {
      //this.$store.commit("initializeStore");
      const token = localStorage.getItem("token");
      if (token) {
        //this.drawerTop = "token";
        //this.checkedToken = true;

        return token;
      } else if (token == null) {
        console.log("token==null");
        // this.drawer = false;
        return false;
      } else {
        // this.drawer = false;
        return false;
      }
    },
    initialise() {
      this.drawerTop = !this.drawerTop;
    },

    checkAnneeScolaire() {
      const annee = this.$store.state.annee_scolaire;
      if (annee) {
        this.annee_scolaire = annee;
        console.log(
          "anneé checkée pour this.annee_scolaire =" + this.annee_scolaire
        );
        return annee;
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="css">
.appbar {
  color: #1976d2;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
