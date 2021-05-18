<template lang="">
  <v-tooltip app bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        small
        v-bind="attrs"
        :loading="loader"
        v-on="on"
        @click="Deconnexion"
      >
        <v-icon dark>mdi-logout</v-icon>
        Deconnexion
      </v-btn>
      <!-- <v-btn v-else small v-bind="attrs" v-on="on" @click="Connexion">
        <v-icon dar > </v-icon>
        Connexion
      </v-btn> -->
    </template>
    <span>Se déconnecter</span>
  </v-tooltip>
</template>

<script>
export default {
  /* computed: {
    isLoggedIn() {
      const retour = this.$store.state.token;
      console.log(retour);
      return retour;
    },
  },*/
  data() {
    return {
      loader: false,
    };
  },

  methods: {
    Deconnexion() {
      this.loader = true;
      if (this.$route.name == "deconnexion") {
        console.log("Atention vous etes deja déconnecté");
      }

      const toPath = this.$route.query.to || "/deconnexion";
      this.loader = false;
      this.$router.push(toPath);
    },
  },
};
</script>
