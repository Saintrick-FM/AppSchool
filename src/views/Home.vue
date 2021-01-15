<template>
  <v-stepper v-model="etape" vertical>
    <v-stepper-step :complete="etape > 1" step="1">
      Selectionnez une année scolaire'
      <small>cliquez pour selectionner</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <year-picker />
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
      Select an ad format and name ad unit
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card elevation="11" color="grey lighten-1" class="mb-12" height="200px">
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
              <v-btn color="primary" @click="etape = 4"> Continue </v-btn>
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
import yearPicker from "@/components/yearPicker.vue";

export default {
  name: "Home",
  components: {
    yearPicker,
  },
  data: () => ({
    etape: 1,
    valid: false,
    show1: false,
    show2: false,
    name: "",
    nameRules: [
      (v) => !!v || "Le nom est obligatoire",
      (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 8) || "Password must be less than 8 characters",
    ],
  }),

  methods: {
    //..validate inputs
    validate() {
      this.refs.form.validate();
    },
    //Login method here
    onLogin() {
      //api call here
    },
  },
};
</script>
