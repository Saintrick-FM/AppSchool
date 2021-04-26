<template lang="">
  <v-tooltip app bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn small v-bind="attrs" v-on="on" @click="LogOut">
        <v-icon dark>mdi-logout</v-icon>
        {{ isLogin ? "Logout" : "Login" }}
      </v-btn>
    </template>
    <span>Se déconnecter</span>
  </v-tooltip>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
    LogOut() {
      this.$store.commit("initializeStore");
      const token = this.$store.state.token;

      if (token) {
        this.isLogin = true;
        this.$state.commit("removeToken");
        const toPath = this.$route.query.to || "/connexion";
        this.$router.push(toPath);
      } else {
        const toPath = this.$route.query.to || "/connexion";
        this.$router.push(toPath);
      }
    },
  },
};
</script>
