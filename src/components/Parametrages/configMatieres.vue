<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-toolbar color="cyan" flat>
          <!-- qffiche le messsage pour signaler qu'il faut définir les nomsCycles -->
          <v-toolbar-title
            v-if="nullCycleChoice === 'oui'"
            class="title-h6 font-weight-light pa-4 title-center"
          >
            Veuillez définir les cycles de votre établissement
          </v-toolbar-title>

          <v-col v-else :md="tailleCycles" v-for="item in Cycles2" :key="item">
            <v-icon>mdi-silverware</v-icon>
            <v-toolbar-title
              class="title-h6 font-weight-light pa-4 title-center"
            >
              <v-btn elevation="2" :id="item" @click="showAlert(item)">{{
                item
              }}</v-btn>
            </v-toolbar-title>
            <v-divider vertical color="black"></v-divider>
            <v-divider vertical color="black"></v-divider>
          </v-col>
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-alert
          :value="alert1"
          color="cyan"
          elevation="2"
          border="top"
          transition="scale-transition"
          icon="mdi-home"
        >
          <!-- Ici alignement des classes du cycle  -->

          <div>
            <v-row justify="space-around">
              <div class="text-h4 pb-2">
                <v-chip color="primary">Cycle {{ cycleClique }}</v-chip>
              </div>

              <!-- <v-icon @click="BackSlideClasse">
                mdi-minus
              </v-icon>
              {{ model }}
              <v-icon @click="NextSlideClasse">
                mdi-plus
              </v-icon> -->
            </v-row>
            <v-carousel v-model="model" height="100">
              <v-carousel-item
                v-for="classe in classes"
                :key="classe.identifiant"
              >
                <v-sheet :color="classeColor" height="100%" tile>
                  <v-row class="fill-height" align="center" justify="center">
                    <div class="text-h3 pb-2">
                      Classe {{ classe.identifiant }}
                    </div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </div>

          <v-card-title primary-title>
            Sélectionnez les matières à affecter en {{ classeMatiere }}. Vous
            pouvez en créer si besoin.
          </v-card-title>

          <matieres :cycleClique="cycleClique" :classeMatiere="classeMatiere" />
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Matieres from "@/components/Enseignants/Matieres.vue";
export default {
  props: ["nomsCycles", "Cycles", "Garderie"],
  components: {
    Matieres,
  },
  data() {
    return {
      classeMatiere: null,
      model: 0,
      classeCliquee: null,
      cycleClique: null,
      dialogForDelete: false,
      dialog: false,
      defaultCycles: true,
      tailleCycles: 3,
      alert1: false,

      classes: [],

      editedIndex: -1,

      Entetes: [
        { text: "Classe", value: "identifiant" },
        { text: "Site ", value: "referenceSite" },
        { text: "Vague", value: "vague" },
        { text: "Nmbre de Salles", value: "nbreSalle" },
        { text: "Capacité totale", value: "contenance" },
        { text: "Actions", align: "center", value: "actions" },
      ],

      classeColors: [
        "primary",
        "secondary",
        "yellow darken-2",
        "red",
        "orange",
      ],
      defaultClasse: {
        identifiant: null,
        referenceSite: null,
        vague: null,
        nbreSalle: null,
        contenance: null,
      },

      editClasse: {
        identifiant: null,
        referenceSite: null,
        vague: null,
        nbreSalle: null,
        contenance: null,
      },
    };
  },

  computed: {
    classeColor() {
      return "";
    },

    Cycles1() {
      console.log("Dans cycles1 " + this.nomsCycles);
      return this.nomsCycles.toString().split(",");
    },
    Cycles2() {
      if (!this.nomsCycles || !this.nomsCycles.length === 0) {
        return console.log("Attention pas de nomsCycles " + this.nomsCycles);
      } else {
        return this.allCycles();
      }
    },
    nullCycleChoice() {
      if (!this.nomsCycles || this.nomsCycles.length === 0) {
        return "oui";
      } else {
        return "non";
      }
    },
  },
  watch: {
    dialog(val) {
      val || this.close;
    },
    dialogForDelete(val) {
      val || this.closeDelete;
    },
    classeMatiere(newValue, oldValue) {
      newValue || oldValue;
    },
    cycleClique(newValue, oldValue) {
      newValue || oldValue;
    },
  },
  beforeMount() {
    console.log("Coucou !");
  },
  updated() {
    this.classeMatiere = this.classes[this.model].identifiant;
    console.log("classeMatiere dans updated = " + this.classeMatiere);
  },
  methods: {
    // NextSlideClasse() {
    //   this.classeColor = this.classeColors[this.model + 1];
    //   return this.model + 1;
    // },
    // BackSlideClasse() {
    //   return this.model - 1;
    // },

    allCycles() {
      if (this.nomsCycles) {
        if (this.nomsCycles.length === 2) {
          this.tailleCycles = 6;
        }
        if (this.nomsCycles.length === 3) {
          this.tailleCycles = 4;
        }
        if (this.nomsCycles.length === 4) {
          this.tailleCycles = 3;
        }
        return this.Cycles1;
      }
      return [];
    },
    showAlert(item) {
      // ceci pour appliquer le focus avec background vert au bouton cliqué
      // if (localStorage.getItem("Boutton_cliqued_in_matieres")) {
      //   let lastCliqued = localStorage.getItem(
      //     "Boutton_cliqued_in_matieres",
      //     item
      //   );
      //   document.getElementById(lastCliqued).style.background = "#f5f5f5";
      // }

      // document.getElementById(item).style.background = "green";
      // localStorage.setItem("Boutton_cliqued_in_matieres", item);

      if (this.alert1) {
        this.alert1 = false;
        setTimeout(() => {
          this.classes = this.Cycles.find(
            (cycle) => cycle.nom === item
          ).classes;
          this.cycleClique = item;
          this.alert1 = true;
        }, 200);
      } else {
        this.cycleClique = item;
        console.log(item);

        this.classes = this.Cycles.find((cycle) => cycle.nom === item).classes;
        this.alert1 = true;
      }
    },
  },
};
</script>

<style></style>
