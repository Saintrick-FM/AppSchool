<template>
  <div>
    <v-stepper v-model="etape" vertical>
      <v-stepper-step :complete="etape > 1" step="1">
        Selectionnez une année scolaire'
        <small>cliquez pour selectionner</small>
      </v-stepper-step>

      <v-stepper-content step="1" editable edit-icon="edit">
        <!-- <year-picker /> -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="annee_choisi"
              label="Année scolaire"
              prepend-icon="mdi-date_range"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>

          <v-list>
            <v-list-item v-for="(item, id) in annee_scolaire" :key="id">
              <v-checkbox
                :label="item.annee"
                v-model="annee_choisi"
                :value="item.annee"
              ></v-checkbox>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- <v-card color="grey lighten-1" class="mb-12" height="200px"> </v-card> -->
        <v-btn color="primary" @click="etape = 2"> Continue </v-btn>
        <v-btn text> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="etape > 2" step="2">
        Entrer en tant que :
        <small>cliquez sur une case pour choisir</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-12" height="200px">
          <v-row>
            <v-col md-4>Super user</v-col>
            <v-col md-4>Comptable</v-col>
            <v-col md-4>Sécrétaire</v-col>
          </v-row>
        </v-card>
        <v-btn color="primary" @click="etape = 3"> Continue </v-btn>
        <v-btn text @click="etape = 1"> Etape précédente </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="etape > 3" step="3">
        Entrez vos Identifiants d'utilisateur
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card
          elevation="11"
          color="grey lighten-1"
          class="mb-12"
          height="200px"
        >
          <v-form v-model="valid">
            <v-container>
              <h2 class="purple--text text-uppercase">Identifiants</h2>
              <v-divider color="purple" class="mt-2"></v-divider>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Nom(s) d'utilisateur"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                    :type="show1 ? 'text' : 'password'"
                    label="Mot de passe"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-divider color="#F3E5F5" class="mt-4"></v-divider>
              <v-row style="margin-top: 20px; margin-left: 60px" justify-start>
                <v-btn color="primary" :loading="loading" @click="onLogin">
                  Continue
                </v-btn>
                <v-btn text @click="etape = 2"> Etape précédente </v-btn>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-stepper-content>
    </v-stepper>

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
      v-if="erreur == true"
    >
      <h2
        style="color:#d81b60; margin-left:30px; position:absolute; margin-top:-2px"
      >
        {{ message_erreur }}
      </h2>

      <v-btn
        color="pink darken-1"
        outlined
        width="30px"
        style="margin-left:1000px"
        small
      >
        <v-icon @click="CloseAlert">mdi-close</v-icon>
      </v-btn>
    </v-alert>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Home",
  components: {
    // yearPicker,
  },
  data: () => ({
    erreur: undefined,
    message_erreur: undefined,
    User1: null,
    etape: 1,
    valid: false,
    show1: false,
    show2: false,
    loading: false,
    annee_choisi: "",
    annee_scolaire: [
      { id: "1", annee: "2019-2020" },
      { id: "2", annee: "2020-2021" },
      { id: "3", annee: "2021-2022" },
    ],
    name: "",
    nameRules: [
      (v) => !!v || "Le nom est obligatoire",
      (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be less than 6 characters",
    ],
  }),

  mounted() {
    document.title = "login | Saint Martin";
  },

  methods: {
    CloseAlert() {
      this.erreur = false;
    },
    //..validate inputs
    validate() {
      this.refs.form.validate();
    },
    //Login method here
    async onLogin() {
      this.loading = true;
      this.$store.commit("setAnneeScolaire", this.annee_choisi);
      console.log(
        "l'année choisie du component connexion est :" + this.annee_choisi
      );

      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      const formLogin = {
        username: this.name,
        password: this.password,
      };
      //api call here
      await axios
        .post("api-auth-token/", formLogin)
        .then((res) => {
          const token = res.data.token;
          console.log(token);
          this.$store.commit("setAuthStatut", this.name);

          // axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);
          this.$store.commit("initializeStore");

          this.etape = 4;
          this.loading = false;
          const toPath = this.$route.query.to || "/finances";

          this.$router.push(toPath);
        })
        .catch((err) => {
          console.log("erreur => " + err);
          if (
            this.$store.state.token == "" &&
            err == "Error: Request failed with status code 400"
          ) {
            this.message_erreur = "Désolé vos identifants sont incorrects";
          } else if (err == "Error: Network Error") {
            this.message_erreur =
              "Désolé le serveur de la base de donnée n'est pas en marche";
          } else if (this.$store.state.token != "") {
            this.message_erreur =
              "Vous êtes déjà connecté pas besoin de le refaire ";
          } else {
            this.message_erreur =
              "Oups il y'a eu un problème au niveau du serveur";
          }
          this.erreur = true;
        });
      this.loading = false;
      this.etape = 3;
    },
  },
};
</script>
