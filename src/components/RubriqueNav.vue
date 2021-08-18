<template lang="">
  <div v-if="checkedToken">
    <v-container class="grey lighten-5">
      <v-row no gutters style="padding-bottom: 110px;">
        <v-col>
          <router-link to="/">
            <button class="learn-more" :disabled="disabled">
              <v-avatar color="#b18597" outlined class="mb-4 mr-11 mt-n6 ml-n9">
                <v-icon dark class="mb-4">
                  mdi-account-circle
                </v-icon>
              </v-avatar>
              <span style="margin-left:-29px">Inscriptions</span>
            </button>
          </router-link>
        </v-col>
        <v-col order="12" id="col-right">
          <button id="btn-right" class="learn-more" :disabled="disabled">
            <v-avatar color="#b18597" outlined class="mb-4 mr-11 mt-n6 ml-n9">
              <v-icon dark class="mb-4">
                mdi-account-circle
              </v-icon>
            </v-avatar>
            <span style="margin-left:-7px">Classes</span>
          </button>
        </v-col>
      </v-row>
      <v-row no gutters>
        <v-col>
          <router-link to="/pedagogie">
            <button class="learn-more" :disabled="disabled">
              <v-avatar color="#b18597" outlined class="mb-4 mr-11 mt-n6 ml-n9">
                <v-icon dark class="mb-4">
                  mdi-account-circle
                </v-icon>
              </v-avatar>
              <span style="margin-left:-20px">Pédagogie</span>
            </button>
          </router-link>
        </v-col>
        <v-col order="12" id="col-right">
          <router-link to="/finances">
            <button id="btn-right" class="learn-more" :disabled="disabled">
              <v-avatar color="#b18597" outlined class="mb-4 mr-11 mt-n6 ml-n9">
                <v-icon dark class="mb-4">
                  mdi-account-circle
                </v-icon>
              </v-avatar>
              Comptabilité
            </button>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "RubriqueNav",
  data() {
    return {
      show: false,
      disabled: false,
    };
  },
  computed: {
    checkedToken: function() {
      let token = localStorage.getItem("token");
      if (token == "null") {
        console.log("false");
        return false;
      } else {
        console.log("true");
        return true;
      }
    },
  },
  beforeMount() {
    if (localStorage.getItem("allParamsDone") === "false") {
      this.disabled = true;
      // document.getElementById("btn-right").addEventListener("mouseover");
    }
  },
};
</script>
<style lang="css">
/* line 8, ../../Vue_Js/Projet_initial_Vue2_Electron_Vuetify/app-school3/saas/button.scss */
* {
  box-sizing: border-box;
}
#btn-right {
  width: 47%;
}
#col-right {
  margin-right: 12px;
}
/* line 10, ../../Vue_Js/Projet_initial_Vue2_Electron_Vuetify/app-school3/saas/button.scss */
*::before,
*::after {
  box-sizing: border-box;
}

/* line 16, ../../Vue_Js/Projet_initial_Vue2_Electron_Vuetify/app-school3/saas/button.scss */
/* body {
  font-family: 'Rubik', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  min-height: 100vh;
  background: FFFFFFF;
} */

/* line 28, ../../Vue_Js/Projet_initial_Vue2_Electron_Vuetify/app-school3/saas/button.scss */
button {
  position: absolute;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  width: 46%;
  vertical-align: middle;
  text-decoration: none;
  font-size: 92%;
  font-family: inherit;
}

/* line 38, ../../Vue_Js/Projet_initial_Vue2_Electron_Vuetify/app-school3/saas/button.scss */
button.learn-more {
  font-weight: 600;
  color: #382b22;
  text-transform: uppercase;
  padding: 1.25em 2em;
  background: #9c27b0;
  /*  couleur d'origine #fff0f0; 2e couleur #9c27b0*/
  border: 2px solid #b18597;
  border-radius: 0.75em;
  transform-style: preserve-3d;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
    background 150ms cubic-bezier(0, 0, 0.58, 1);
}

/* line 48, ../../Vue_Js/Projet_initial_Vue2_Electron_Vuetify/app-school3/saas/button.scss */
button.learn-more::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f9c4d2;
  border-radius: inherit;
  box-shadow: 0 0 0 2px #b18597, 0 0.625em 0 0 #ffe3e2;
  transform: translate3d(0, 0.75em, -1em);
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
    box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
}

/* line 63, ../../Vue_Js/Projet_initial_Vue2_Electron_Vuetify/app-school3/saas/button.scss */
button.learn-more:hover {
  background: #ffe9e9;
  transform: translate(0, 0.25em);
}

/* line 66, ../../Vue_Js/Projet_initial_Vue2_Electron_Vuetify/app-school3/saas/button.scss */
button.learn-more:hover::before {
  box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
  transform: translate3d(0, 0.5em, -1em);
}

/* line 71, ../../Vue_Js/Projet_initial_Vue2_Electron_Vuetify/app-school3/saas/button.scss */
button.learn-more:active {
  background: #ffe9e9;
  transform: translate(0em, 0.75em);
}

/* line 74, ../../Vue_Js/Projet_initial_Vue2_Electron_Vuetify/app-school3/saas/button.scss */
button.learn-more:active::before {
  box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
  transform: translate3d(0, 0, -1em);
}

/*# sourceMappingURL=button.css.map */
</style>
