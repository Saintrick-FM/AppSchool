<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
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

      <!-- Menu de gauche -->
      <v-list nav dense>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="child in item.items" :key="child.title">
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="appbar" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar>
        <v-toolbar-title>Ecole Saint Martin</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat route to="/about">Enseignants</v-btn>
          <v-btn flat route to="/">Elèves</v-btn>
          <v-btn flat route to="/login">Personnel</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-link :to="'/about'">About</router-link>|
        <router-link :to="'/login'">Login</router-link>|
        <router-link :to="'/'">MainHome</router-link>
        <router-view></router-view>

        <!-- If using vue-router 
      <router-view></router-view>-->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
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
};
</script>
<style lang="css">
.appbar {
  color: #1976d2;
}
</style>
