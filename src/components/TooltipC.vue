<template lang="">
  <v-tooltip app bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="isLoggedIn"
        small
        v-bind="attrs"
        v-on="on"
        @click="Deconnexion"
      >
        <v-icon dark>mdi-logout</v-icon>
        Deconnexion
      </v-btn>
      <v-btn v-else small v-bind="attrs" v-on="on" @click="Connexion">
        <v-icon dark>mdi-logout</v-icon>
        Connexion
      </v-btn>
    </template>
    <span v-if="isLoggedIn">Se déconnecter</span>
    <span v-else>Se connecter</span>
  </v-tooltip>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      const retour = this.$store.state.token;
      console.log(retour);
      return retour;
    },
  },

  methods: {
    Deconnexion() {
      if (this.$route.name == "deconnexion") {
        console.log("Atention vous etes deja déconnecté");
      }

      const toPath = this.$route.query.to || "/deconnexion";
      this.$router.push(toPath);
    },
    Connexion() {
      console.log("A clické sur connexion");
    },
  },
};
</script>
