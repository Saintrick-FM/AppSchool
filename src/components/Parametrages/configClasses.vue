<template>
  <div>
    <v-toolbar-title
      v-if="showGarderie"
      class="title-h6 font-weight-light pa-4 title-center"
    >
      <v-btn elevation="2" @click="showAlertGarderie">Garderie</v-btn>
    </v-toolbar-title>
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
            <v-toolbar-title
              class="title-h6 font-weight-light pa-4 title-center"
              style="margin-top:25px"
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
          <!-- Zone pour orienter l'utilisateur de cocher les salles à affecter  -->
          <v-card-title primary-title elevation-4>
            Sélectionnez les
            {{ activeCycle === "Garderie" ? "salles" : "classes" }} à affecter
            {{ activeCycle === "Garderie" ? "en" : "au" }} {{ activeCycle }}.
            Vous pouvez en créer si besoin.
          </v-card-title>

          <v-data-table
            :headers="showGarderieForm ? EntetesGarderie : Entetes"
            :items="classes"
            :single-select="singleSelect"
            v-model="selected"
            show-select
            item-key="identifiant"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title v-if="activeCycle !== 'Garderie'"
                  >Toutes les classes du {{ activeCycle }}</v-toolbar-title
                >
                <v-toolbar-title v-else
                  >Toutes les salles en {{ activeCycle }}</v-toolbar-title
                >

                <v-divider class="mx-4" inset vertical></v-divider>
                <!-- {{ selected }} -->
                <v-spacer></v-spacer>

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
                      {{
                        showGarderieForm
                          ? "Nouvelle Salle en Garderie"
                          : "Nouvelle Salle du " + activeCycle
                      }}
                    </v-btn>
                  </template>
                  <v-card>
                    <!-- class="text-h5" -->
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            v-if="!showGarderieForm"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              :disabled="formTitle !== 'Nouvelle Classe'"
                              :readonly="formTitle !== 'Nouvelle Classe'"
                              v-model="editClasse.identifiant"
                              label="Classe"
                              shaped
                              outlined
                            ></v-text-field>
                          </v-col>
                          <!-- Affichage pour l'alert garderie  -->
                          <v-col cols="12" sm="6" v-else md="4">
                            <v-text-field
                              :disabled="
                                formTitle !== 'Nouvelle Salle en Garderie'
                              "
                              :readonly="
                                formTitle !== 'Nouvelle Salle en Garderie'
                              "
                              v-model="editClasse.identifiant"
                              label="Classe"
                              shaped
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-if="sites === 'Site unique'"
                              v-model="specialReferenceSite"
                              readonly
                              label="Site d'appartenance"
                              shaped
                              outlined
                            ></v-text-field>

                            <v-select
                              multiple
                              v-else
                              v-model="editClasse.referenceSite"
                              :items="sites"
                              shaped
                              outlined
                              label="Site d'appartenance"
                            ></v-select>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            v-if="!showGarderieForm"
                          >
                            <v-text-field
                              type="number"
                              v-model="editClasse.nbreSalle"
                              label="Nbre de salles"
                              shaped
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              type="number"
                              v-model="editClasse.contenance"
                              label="Contenance totale"
                              shaped
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              v-model="editClasse.vague"
                              :items="vagues"
                              filled
                              label="Vague"
                              shaped
                              outlined
                            >
                            </v-select>
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
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editerClasse(item)">
                🏚
              </v-icon>
              <v-icon @click="deleteClasse(item)">
                ❎
              </v-icon>
            </template>

            <!-- <template v-slot:item.actions="{ item }">
              <span @click="editItem(item)"></span> ||
              <span style="color:red" @click="deleteItem(item)"></span>
              <v-icon small class="mr-2" @click="editerClasse(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteClasse(item)">
                mdi-delete
              </v-icon>
            </template> -->

            <template v-slot:footer>
              <v-btn
                x-large
                type="submit"
                :loading="loading"
                :disabled="disabled"
                block
                color="purple darken-4"
                class="mr-4 text"
                @click="confirmAllClasses"
              >
                <span
                  class="white--text"
                  v-if="formTitle !== 'Nouvelle Salle en Garderie'"
                  >Confirmer l'affectation des classes sélectionnées au
                  <v-chip
                    v-if="!disabled"
                    color="primary"
                    style="text-transform:uppercase"
                  >
                    {{ activeCycle }}
                  </v-chip></span
                >
                <span class="white--text" v-else
                  >Confirmer l'affectation des salles sélectionnées en
                  <v-chip color="primary" style="text-transform:uppercase">
                    Garderie
                  </v-chip></span
                >
                <v-icon light>mdi-cached</v-icon>
              </v-btn>
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
      loading: false,
      selected: [],
      singleSelect: false,
      activeCycle: null,
      classeCliquee: null,
      dialogForDelete: false,
      dialog: false,
      defaultCycles: true,
      tailleCycles: 3,
      alert1: false,

      ecole: null,
      classes: [],
      actualAllClasses: null,

      editedIndex: -1,
      showGarderieForm: null,
      EntetesGarderie: [
        { text: "Classe", value: "identifiant" },
        { text: "Site ", value: "referenceSite" },
        { text: "Vague", value: "vague" },
        { text: "Capacité totale", value: "contenance" },
        { text: "Actions", align: "center", value: "actions" },
      ],
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
        referenceSite: [],
        vague: null,
        nbreSalle: null,
        contenance: null,
      },
      specialReferenceSite: null,
    };
  },

  computed: {
    formTitle() {
      if (this.showGarderieForm) {
        return this.editedIndex === -1
          ? "Nouvelle Salle en Garderie"
          : "Editez ou modifiez cette salle";
      } else {
        return this.editedIndex === -1
          ? "Nouvelle Classe"
          : "Editez ou modifiez cette classe";
      }
    },
    vagues() {
      if (this.Garderie.midi) {
        return ["Matin", "Midi"];
      } else {
        return ["Matin"];
      }
    },
    sites() {
      if (this.Garderie.nbreSites > 1) {
        let sites = [];
        for (
          let index = 1;
          index < parseInt(this.Garderie.nbreSites) + 1;
          index++
        ) {
          sites.push(`Site ${index}`);
        }
        return sites;
      } else {
        return "Site unique";
      }
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
    showGarderie() {
      if (this.nullCycleChoice === "non" && this.Garderie.garderie) {
        return true;
      } else {
        return false;
      }
    },
    disabled() {
      if (this.selected.length > 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    dialog(val) {
      val || this.cancelEditOrUpdateClasse;
    },
    dialogForDelete(val) {
      val || this.closeDelete;
    },
  },
  beforeMount() {
    console.log("Coucou !");
    if (localStorage.getItem("Ecole")) {
      this.ecole = JSON.parse(localStorage.getItem("Ecole"));
    }

    //getting all actual Classes and set it to classes
    if (localStorage.getItem("All Classes")) {
      let actualAllClasses = JSON.parse(localStorage.getItem("All Classes"));
      this.actualAllClasses = actualAllClasses;
    }
  },
  methods: {
    showAlertGarderie() {
      this.classes = [];
      this.activeCycle = "Garderie";
      this.showGarderieForm = true;
      // si une fenêtre d'alerte pour cycle est déja ouverte
      if (this.alert1) {
        this.alert1 = false;
        // Un quart de seconde de pause avant de déclencher l'alert car une alerte est ouverte
        setTimeout(() => {
          // si le cycle a déjà des classes enregistrées initialiser le formulaire avec celles ci
          if (
            this.actualAllClasses.find(
              (classe) => classe.cycle === this.activeCycle
            )
          ) {
            this.classes = this.actualAllClasses.filter(
              (classe) => classe.cycle === this.activeCycle
            );
            this.classes.forEach((salle) => {
              salle.heuresCours === this.ecole.heuresMatin
                ? (salle.vague = "Matin")
                : (salle.vague = "Midi");
            });

            console.log("attention  " + JSON.stringify(this.classes));
          } else {
            for (
              let index = 1;
              index < this.Garderie.nbreSalleGarderie + 1;
              index++
            ) {
              this.classes.push({
                identifiant: "Salle n° " + index,
                referenceSite: null,
                vague: "Matin",
                nbreSalle: null,
                contenance: null,
              });
              console.log("okkkkkk " + JSON.stringify(this.classes));
            }
          }
          this.alert1 = true;
        }, 200);

        // 1ere alerte à déclencher
        /*
        anneeScolaire: null
contenance: 60
cree_le: "2021-08-28T09:20:36.539415Z"
cycle: "Garderie"
elevesVenuDailleurs: 0
heuresCours: "7h30-13h"         heuresMatin: "7h-13h"
identifiant: "Salle n° 1"
inscrits: null
modifie_le: "2021-08-28T09:20:36.539415Z"
nbreSalles: 2
nouveaux: 0
redoublants: 0
referenceSite: ["Site 1", "Site 2"]
scolarite: null
totalFilles: null
totalGarcons: null*/
      } else {
        if (
          this.actualAllClasses.find(
            (classe) => classe.cycle === this.activeCycle
          )
        ) {
          this.classes = this.actualAllClasses.filter(
            (classe) => classe.cycle === this.activeCycle
          );

          this.classes.forEach((salle) => {
            salle.heuresCours === this.ecole.heuresMatin
              ? (salle.vague = "Matin")
              : (salle.vague = "Midi");
          });

          console.log("attention  " + JSON.stringify(this.classes));
        } else {
          for (
            let index = 1;
            index < this.Garderie.nbreSalleGarderie + 1;
            index++
          ) {
            this.classes.push({
              identifiant: "Salle n° " + index,
              referenceSite: null,
              vague: "Matin",
              nbreSalle: null,
              contenance: null,
            });
          }
        }

        this.alert1 = true;
      }
    },

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
      this.showGarderieForm = false;
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
        // si le cycle a déjà des classes enregistrées initialiser le formulaire avec celles ci
        if (
          this.actualAllClasses.find(
            (classe) => classe.cycle === this.activeCycle
          )
        ) {
          this.classes = this.actualAllClasses.filter(
            (classe) => classe.cycle === this.activeCycle
          );
          this.classes.forEach((salle) => {
            salle.heuresCours === this.ecole.heuresMatin
              ? (salle.vague = "Matin")
              : (salle.vague = "Midi");
          });
        } else {
          this.classes = this.Cycles.find(
            (cycle) => cycle.nom === item
          ).classes;
          console.log(item);
        }
        this.alert1 = true;
      }
    },

    editerClasse(item) {
      console.log("classe cliquée " + JSON.stringify(item));

      this.editedIndex = this.classes.indexOf(item);
      this.editClasse = Object.assign({}, item);
      this.Garderie.midi ? this.vagues.push("Midi") : this.editClasse;

      // this.Garderie.nbreSites > 1 ? this.sites : "Site unique";

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
      this.cancelEditOrUpdateClasse();
    },

    confirmAllClasses() {
      this.loading = true;
      console.log(
        "Classes " +
          JSON.stringify(this.selected) +
          " pour le cycle " +
          this.activeCycle
      );
      let ecole = this.ecole;

      let classeToSend = {
        identifiant: null,
        referenceSite: [],
        heuresCours: "",
        nbreSalles: null,
        contenance: null,

        scolarite: null,
        anneeScolaire: null,

        cycle: this.activeCycle,
      };
      //{"identifiant":"6e","referenceSite":null,"vague":null,"nbreSalle":null,"contenance":null},
      //{"identifiant":"Salle n° 2","referenceSite":["Site 1","Site 2"],"nbreSalles":null,"contenance":"50","scolarite":null,"anneeScolaire":null,"cycle":null}

      let classesSelectedForCreate = null;
      let classesSelectedForUpdate = null;
      let identifiantsClassesBD = [];
      let identifiantsClassesSelectione = [];

      this.actualAllClasses.forEach((classe) => {
        identifiantsClassesBD.push(classe.identifiant);
      });
      this.selected.forEach((classe) => {
        identifiantsClassesSelectione.push(classe.identifiant);
      });

      console.log(
        identifiantsClassesSelectione + "///" + identifiantsClassesBD
      );

      classesSelectedForUpdate = identifiantsClassesBD.filter((classe) =>
        identifiantsClassesSelectione.includes(classe)
      );
      // filtrer dans la liste des classes selectionnes les classes differentes des classes à updater
      classesSelectedForCreate = identifiantsClassesSelectione.filter(
        (classe) => !classesSelectedForUpdate.includes(classe)
      );

      console.log(
        "Classes selected for create " +
          JSON.stringify(classesSelectedForCreate) +
          "\n\n Classes selected for Update " +
          JSON.stringify(classesSelectedForUpdate)
      );
      let finalObjectsClassesForCreate = [];
      let finalObjectsClassesForUpdate = [];
      console.log("Test 1");

      // affectation Classes finales à créer
      if (classesSelectedForCreate.length > 0) {
        if (classesSelectedForCreate.length > 1) {
          console.log("Test 2");
          classesSelectedForCreate.forEach((element) => {
            finalObjectsClassesForCreate.push(
              this.selected.find((classe) => classe.identifiant === element)
            );
          });
        } else {
          console.log("Test 3");
          finalObjectsClassesForCreate.push(
            this.selected.find(
              (classe) => classe.identifiant === classesSelectedForCreate[0]
            )
          );
        }
        console.log(JSON.stringify(finalObjectsClassesForCreate));
        //
      }
      // affectation Classes finales à updater
      if (classesSelectedForUpdate.length > 0) {
        if (classesSelectedForUpdate.length > 1) {
          classesSelectedForUpdate.forEach((element) => {
            finalObjectsClassesForUpdate.push(
              this.selected.find((classe) => classe.identifiant === element)
            );
          });
        } else {
          finalObjectsClassesForUpdate.push(
            this.selected.find(
              (classe) => classe.identifiant === classesSelectedForUpdate[0]
            )
          );
        }
        console.log(finalObjectsClassesForUpdate);
        //
      }

      // envoie pour la création des classes
      if (finalObjectsClassesForCreate.length > 0) {
        console.log("test 4");

        if (finalObjectsClassesForCreate.length > 1) {
          finalObjectsClassesForCreate.forEach((classe) => {
            console.log("test 4");
            if (classe.vague === "Matin") {
              classeToSend.heuresCours = ecole.HeuresMatin;
            } else {
              classeToSend.heuresCours = ecole.HeuresMidi;
            }
            classeToSend.identifiant = classe.identifiant;
            classeToSend.referenceSite = classe.referenceSite;
            classeToSend.nbreSalles = classe.nbreSalle;
            classeToSend.contenance = classe.contenance;
            if (this.activeCycle === "Garderie") {
              console.log("yes " + classe.referenceSite);
              classeToSend.nbreSalles = classe.referenceSite.length;
            }
            console.log("nombre salles " + classeToSend.nbreSalles);
            this.$store.dispatch("actionCreateClasse", classeToSend);
            console.log("patience debut 2s");
          });
        }
      } else {
        if (finalObjectsClassesForCreate[0].vague === "Matin") {
          classeToSend.heuresCours = ecole.HeuresMatin;
        } else {
          classeToSend.heuresCours = ecole.HeuresMidi;
        }
        classeToSend.identifiant = finalObjectsClassesForCreate[0].identifiant;
        classeToSend.referenceSite =
          finalObjectsClassesForCreate[0].referenceSite;
        classeToSend.nbreSalles = finalObjectsClassesForCreate[0].nbreSalle;
        classeToSend.contenance = finalObjectsClassesForCreate[0].contenance;
        if (this.activeCycle === "Garderie") {
          console.log("yes " + finalObjectsClassesForCreate[0].referenceSite);
          classeToSend.nbreSalles =
            finalObjectsClassesForCreate[0].referenceSite.length;
        }
        console.log(
          "classeToSend for Create = " + JSON.stringify(classeToSend)
        );
        this.$store.dispatch("actionCreateClasse", classeToSend);
      }

      // envoie pour la modification des classes
      if (finalObjectsClassesForUpdate) {
        if (finalObjectsClassesForUpdate.length > 1) {
          finalObjectsClassesForUpdate.forEach((classe) => {
            console.log("test 6");
            if (classe.vague === "Matin") {
              classeToSend.heuresCours = ecole.HeuresMatin;
            } else {
              classeToSend.heuresCours = ecole.HeuresMidi;
            }
            classeToSend.identifiant = classe.identifiant;
            classeToSend.referenceSite = classe.referenceSite;
            classeToSend.nbreSalles = classe.nbreSalle;
            classeToSend.contenance = classe.contenance;
            if (this.activeCycle === "Garderie") {
              console.log("yes " + classe.referenceSite);
              classeToSend.nbreSalles = classe.referenceSite.length;
            }
            console.log("nombre salles " + classeToSend.nbreSalles);
            this.$store.dispatch("actionUpdateClasse", {
              classe: classeToSend,
              identifiant: classeToSend.identifiant,
            });
            console.log("patience debut 2s");
          });
        } else {
          console.log(
            "finalObjectsClassesForUpdate =" + finalObjectsClassesForUpdate
          );
          this.loading = false;
          if (finalObjectsClassesForUpdate[0].vague === "Matin") {
            classeToSend.heuresCours = ecole.HeuresMatin;
          } else {
            classeToSend.heuresCours = ecole.HeuresMidi;
          }
          classeToSend.identifiant =
            finalObjectsClassesForUpdate[0].identifiant;
          classeToSend.referenceSite =
            finalObjectsClassesForUpdate[0].referenceSite;
          classeToSend.nbreSalles = finalObjectsClassesForUpdate[0].nbreSalle;
          classeToSend.contenance = finalObjectsClassesForUpdate[0].contenance;
          if (this.activeCycle === "Garderie") {
            console.log(
              "yes Garderie" + finalObjectsClassesForUpdate[0].referenceSite
            );
            classeToSend.nbreSalles =
              finalObjectsClassesForUpdate[0].referenceSite.length;
          }
          console.log(
            "Classe to Send for Update = " + JSON.stringify(classeToSend)
          );
          this.$store.dispatch("actionUpdateClasse", {
            classe: classeToSend,
            identifiant: classeToSend.identifiant,
          });
          console.log("patience debut 2s");
        }
      }
      setTimeout(() => {
        console.log("patience 1s");
        this.loading = false;
        this.alert1 = false;
      }, 1000);
    },
  },
};
</script>

<style>
.active {
  background-color: green;
}
</style>
