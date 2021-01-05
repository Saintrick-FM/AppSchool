<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!-- <Squelette /> -->
      <Main-Home msg="Bienvenu dans le mainHome" />
      <router-link :to="{ path: '/about' }">About</router-link>
    </v-main>
  </v-app>
</template>

<script>
import MainHome from "@/components/MainHome.vue";

export default {
  name: "App",

  components: {
    MainHome,
  },

  data: () => ({
    //
    drawer: null,
  }),
};
</script>
