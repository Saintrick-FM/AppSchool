<template>
  <v-app id="inspire">
    <router-view name="navbarTop"></router-view>
    <!-- <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="@/assets/logo.svg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title"> Ecole Saint Martin </v-list-item-title>
            <v-list-item-subtitle>Amour, Travail, Réussite </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <RubriqueNav />
    </v-navigation-drawer>

    <v-app-bar class="appbar" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar>
        <v-toolbar-title>Ecole Saint Martin</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn flat route to="/about" v-bind="attrs" v-on="on"> Enseignants </v-btn>
            </template>
            <span>Savoir tout à propos des enseignants</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn flat route to="/" v-bind="attrs" v-on="on"> Elèves </v-btn>
            </template>
            <span>Savoir tout à propos des Elèves</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn flat route to="/login" v-bind="attrs" v-on="on"> Personnel </v-btn>
            </template>
            <span>Savoir tout à propos du Personnel</span>
          </v-tooltip>
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar> -->

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import RubriqueNav from "@/components/RubriqueNav";
import axios from "axios";
export default {
  name: "App",

  data: () => ({
    //
    drawer: null,
    items: [
      {
        action: "mdi-ticket",
        items: [{ title: "List Item" }],
        title: "About",
        route: "/about",
      },
      {
        action: "mdi-login",
        active: true,
        items: [
          { title: "Administration" },
          { title: "Students" },
          { title: "Teachers" },
        ],
        title: "login",
      },
      {
        action: "mdi-home",
        items: [{ title: "List Item" }],
        title: "Main Home",
        route: "/",
      },
      {
        action: "mdi-run",
        items: [{ title: "List Item" }],
        title: "True Login",
        route: "/login",
      },
    ],
  }),

  beforeCreate() {
    this.$store.commit("initializeStore");
    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
};
</script>
<style lang="css">
.appbar {
  color: #1976d2;
}
</style>
