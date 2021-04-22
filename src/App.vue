<template lang="">
  <v-app>
    <v-navigation-drawer v-model="drawerTop" app>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="@/assets/logo.svg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              Ecole Saint Martin
            </v-list-item-title>
            <v-list-item-subtitle>Amour, Travail, Réus </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <RubriqueNav />
    </v-navigation-drawer>

    <v-app-bar class="appbar" app>
    
      <v-app-bar-nav-icon v-if="drawerMethod()" @click="drawerTop= !drawerTop"></v-app-bar-nav-icon>
      <v-toolbar>
        <v-toolbar-title>Ecole Saint Martin</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <tooltipA />
          <tooltipB />
          <tooltipC />
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar>
  
  
    <v-main>
      <router-view></router-view>
    </v-main>
</v-app>
</template>
<script>
import axios from "axios";
import RubriqueNav from "@/components/RubriqueNav";
import tooltipA from "@/components/TooltipA.vue";
import tooltipB from "@/components/TooltipB.vue";
import tooltipC from "@/components/TooltipC.vue";
export default {
  name: "NavBarTop",
  components: {
    RubriqueNav,
    tooltipA,
    tooltipB,
    tooltipC,
  },
  data: () => ({
    //
    drawerTop: false,

    drawer: null,
    items: [
      {
        action: "mdi-ticket",
        items: [{ title: "List Item" }],
        title: "Finances",
        route: "/finances",
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
  
  methods:{
    
    drawerMethod(){
    this.$store.commit("initializeStore");
    const token = this.$store.state.token;
    if (token) {
      return true
    }else{
       return false
    }
  },

}
}
</script>
<style lang="css">
.appbar {
  color: #1976d2;
}
</style>
