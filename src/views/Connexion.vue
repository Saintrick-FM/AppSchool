<template>
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
    //..validate inputs
    validate() {
      this.refs.form.validate();
    },
    //Login method here
    async onLogin() {
      this.loading = true;
      this.$store.commit("setAnneeScolaire", this.annee_choisi);
      localStorage.setItem("année scolaire", this.annee_choisi);
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
          this.$store.commit("setToken", token);
          // axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);

          const toPath = this.$route.query.to || "/finances";
          (this.loading = false), (this.etape = 4);
          this.$router.push(toPath);
        })
        .catch((err) => console.log(err));
      this.loading = false;
      this.etape = 3;
    },
  },
};
</script>
