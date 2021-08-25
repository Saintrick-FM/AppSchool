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
              <v-btn elevation="2" @click="showAlert(item)">{{
                item
              }}</v-btn></v-toolbar-title
            >
            <v-divider vertical color="primary"></v-divider>
            <v-divider vertical color="primary"></v-divider>
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
          <v-data-table
            :headers="Entetes"
            :items="classes"
            item-key="identifiant"
            class="elevation-1"
          >
            <template v-slot:top>
              <!-- boite de dialog pour ajout et modif classe -->
              <v-dialog
                transition="fab-transition"
                persistent
                dark
                width="800px"
                v-model="dialog"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Ajouter une classe
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            :disabled="formTitle !== 'Nouvelle Classe'"
                            :readonly="formTitle !== 'Nouvelle Classe'"
                            v-model="editClasse.identifiant"
                            label="Classe"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editClasse.referenceSite"
                            type="number"
                            label="Site d'appartenance"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            type="number"
                            v-model="editClasse.nbreSalle"
                            label="Nbre de salles"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            type="number"
                            v-model="editClasse.contenance"
                            label="Contenance totale"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editClasse.vague"
                            label="Vague"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="cancelEditOrUpdateClasse"
                    >
                      Annulez et fermer
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="saveEditOrUpdateClasse"
                    >
                      Enregistrez
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- suppression classe -->
              <v-dialog
                dark
                v-model="dialogForDelete"
                transition="fab-transition"
                persistent
                max-width="500px"
              >
                <v-card>
                  <v-card-title class="headline"
                    >Voulez-vous vraiment supprimer la classe

                    <span style="color: red; margin: 3px 0px 0px 100px "
                      >{{ classeCliquee }} ?</span
                    >
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Annuler</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editerClasse(item)">
                🏚
                <!-- mdi-pencil -->
              </v-icon>
              <v-icon @click="deleteClasse(item)">
                ❎
                <!-- mdi-delete -->
              </v-icon>
            </template>
          </v-data-table>
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["nomsCycles", "Cycles", "Garderie"],
  data() {
    return {
      activeCycle: null,
      classeCliquee: null,
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
    formTitle() {
      return this.editedIndex === -1
        ? "Nouvelle Classe"
        : "Editez ou modifiez cette classe";
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
  },
  beforeMount() {
    console.log("Coucou !");
  },
  methods: {
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
      console.log(typeof item);
      this.activeCycle = item;
      if (this.alert1) {
        this.alert1 = false;
        setTimeout(() => {
          this.classes = this.Cycles.find(
            (cycle) => cycle.nom === item
          ).classes;

          this.alert1 = true;
        }, 200);
      } else {
        this.classes = this.Cycles.find((cycle) => cycle.nom === item).classes;
        console.log(item);
        this.alert1 = true;
      }
    },

    editerClasse(item) {
      console.log("classe cliquée " + JSON.stringify(item));

      this.editedIndex = this.classes.indexOf(item);
      this.editClasse = Object.assign({}, item);
      this.dialog = true;
    },

    deleteClasse(item) {
      console.log("delete " + item.identifiant);
      this.classeCliquee = item.identifiant;
      this.editedIndex = this.classes.indexOf(item);
      this.editClasse = Object.assign({}, item);
      this.dialogForDelete = true;
    },

    deleteItemConfirm() {
      this.classes.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    cancelEditOrUpdateClasse() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editClasse = Object.assign({}, this.defaultClasse);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogForDelete = false;
      this.$nextTick(() => {
        this.editClasse = Object.assign({}, this.defaultClasse);
        this.editedIndex = -1;
      });
    },

    saveEditOrUpdateClasse() {
      if (this.editedIndex > -1) {
        Object.assign(this.classes[this.editedIndex], this.editClasse);
      } else {
        this.classes.push(this.editClasse);
      }
      this.close();
    },
  },
};
</script>

<style>
.active {
  background-color: green;
}
</style>
