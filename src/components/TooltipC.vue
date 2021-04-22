<template lang="">
  <v-tooltip app bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn flat v-bind="attrs" v-on="on" @click='onLogOut()' app>
        Login
      </v-btn>
    </template>
    <span>Se déconnecter</span>
  </v-tooltip>
</template>

<script>
export default {
  methods: {
    onLogOut(){
    this.$store.commit("initializeStore");
    const token = this.$store.state.token;
    const logout= "";
    if (token) {
       localStorage.setItem("token", logout);
        const toPath = this.$route.query.to || "/connexion";
        this.$router.push(toPath);
    }else{
      const toPath = this.$route.query.to || "/connexion";
      this.$router.push(toPath);
    }
    }
  },
}
</script>
