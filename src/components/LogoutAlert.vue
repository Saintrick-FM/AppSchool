<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="350">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template> -->
      <v-card>
        <v-card-title class="headline">
          Message de confirmation
        </v-card-title>
        <v-card-text
          >Etes vous sûr de vouloir vous déconnecter ? Ceci vous obligera à vous
          reconnecter si vous confirmez</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="refuseLogout">
            J'annule
          </v-btn>
          <v-btn color="green darken-1" text @click="confirmLogout">
            Je confirme
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "LogoutAlert",
  data() {
    return {
      dialog: true,
    };
  },
  methods: {
    refuseLogout() {
      if (this.$route.name == "/deconnexion") {
        console.log("Atention vous etes deja déconnecté");
      }
      this.dialog = false;
    },
    confirmLogout() {
      //this.$store.commit("removeAlertLogout");
      localStorage.setItem("token", null);
      localStorage.setItem("Elèves", null);
      localStorage.setItem("Classes", null);
      localStorage.setItem("Profs", null);
      localStorage.setItem("Matieres", null);
      localStorage.removeItem("id Classes");
      localStorage.setItem("Id_classes", null);
      localStorage.removeItem("année scolaire");
      localStorage.setItem("authStatut", null);
      localStorage.setItem("année scolaire", null);
      localStorage.setItem("token", null);
      localStorage.setItem("token", null);
      localStorage.setItem("eleveChoisi", null);
      this.$store.state.token = "";

      this.dialog = false;
      const toPath = this.$route.query.to || "/connexion";

      this.$router.push(toPath);
      setTimeout(() => {
        this.$router.go(0);
      }, 500);

      // this.$emit("Deconnexion");
    },
  },
};
</script>

<style lang="scss" scoped></style>
