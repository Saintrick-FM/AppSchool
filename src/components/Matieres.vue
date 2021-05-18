<template>
  <div>
    <v-data-table
      :headers="MyHeaders"
      :items="matieres"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Matières enseignées</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nouvelle matière
              </v-btn>
            </template>
            <v-card max-width="2000px">
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nomMatiere"
                        label="Intitulé"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="pluri_prof"
                        v-model="editedItem.pluriProf"
                        label="Pluri-prof"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        type="number"
                        v-model="editedItem.seanceParSemaine"
                        label="Nbre d'Heures/semaine"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        type="number"
                        v-model="editedItem.coefficient"
                        label="coefficient"
                      ></v-text-field>
                    </v-col>
                    <v-col cols>
                      <v-select
                        v-model="editedItem.classAssocie"
                        :items="identifiants_classes"
                        label="Enseignée en ?"
                        multiple
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="530px">
            <v-card>
              <v-card-title class="headline"
                >Etes-vous sûr de vouloir supprimer matière ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  :loading="loader"
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
        <!-- <span @click="editItem(item)">ed</span> ||
      <span style="color:red" @click="deleteItem(item)">dl</span> -->
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          dl mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialiseMatiere">
          Reset
        </v-btn>
      </template>
    </v-data-table>

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
      v-if="erreur"
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
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Matieres",
  data: () => ({
    erreur: false,
    message_erreur: "",
    pluri_prof: ["Oui", "Non"],
    classes: [],
    identifiants_classes: [],
    dialog: false,
    dialogDelete: false,
    loader: false,
    MyHeaders: [
      { text: "Intitulé", value: "nomMatiere", sortable: true },
      { text: "Pluri-profs", value: "pluriProf" },
      { text: "Heures/semaine", value: "seanceParSemaine", sortable: true },
      { text: "coefficient", value: "coefficient", sortable: true },
      { text: "Classes", value: "classAssocie", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],

    matieres: [],
    editedIndex: -1,
    editedItem: {
      nomMatiere: "",
      pluriProf: "",
      seanceParSemaine: undefined,
      coefficient: undefined,
      classAssocie: "",
    },
    defaultItem: {
      nomMatiere: "",
      pluriProf: "",
      seanceParSemaine: undefined,
      coefficient: undefined,
      classAssocie: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nouvelle Matière"
        : "Modification Matière";
    },
    ...mapGetters(["allMatieres"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialiseMatiere();
  },
  beforeMount() {
    this.initialiseClasse();
  },

  methods: {
    CloseAlert() {
      this.message_erreur = "";
      this.erreur = false;
    },
    async initialiseMatiere() {
      //   this.$store.dispatch("actionInitialiseMatiere");
      const token = "Token " + this.$store.state.token;

      if (this.$store.state.isAuthenticated) {
        var config = {
          method: "get",
          url: "api/ecole/matiere/",
          headers: {
            Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
          },
        };
        await axios(config)
          .then((response) => {
            const result = response.data;
            console.log(result);
            let element = [];
            for (const key in result) {
              element.push(result[key]);
            }

            localStorage.setItem("Matieres", element);
            this.$store.state.matieres = element;
            this.matieres = element;
            console.log("😃😃😃 this.matieres => " + this.matieres);
          })
          .catch(function(error) {
            console.log("😢😢😢" + error);
          });
      }
    },
    async initialiseClasse() {
      //   this.$store.dispatch("actionInitialiseMatiere");
      const token = "Token " + this.$store.state.token;

      if (this.$store.state.isAuthenticated) {
        var config = {
          method: "get",
          url: "api/ecole/classe/",
          headers: {
            Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
          },
        };
        await axios(config)
          .then((response) => {
            const result = response.data;
            console.log(result);
            let element = [];

            for (const classe of result) {
              element.push(classe);
            }

            element.forEach((element) => {
              this.identifiants_classes.push(element["identifiant"]);
            });

            console.log("identifiants classes =>" + this.identifiants_classes);
            localStorage.setItem("Classes", element);
            this.$store.state.matieres = element;
            this.classes = element;
            console.log("😃😃😃 this.classes => " + this.classes);
          })
          .catch(function(error) {
            console.log("😢😢😢" + error);
          });
      }
    },

    /* {"url":"http://127.0.0.1:8000/api/ecole/matiere/Python/",
              "code_matiere":"Py",
              "enseigne_en_groupe":false,
              "matiere_de_base":true,
              "seance_par_semaine":10,
              "coefficient":4,
              "groupe_matiere":"MATIERE_SCIENTIFIQUES",
              "classe_associe":["http://127.0.0.1:8000/api/ecole/classe/3e/"]}*/

    editItem(item) {
      this.editedIndex = this.matieres.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.matieres.indexOf(item);

      console.log("position de l'élément choisi => " + this.editedIndex);
      console.log(
        "id de l'élément choisi => " +
          this.matieres[this.editedIndex].id +
          "\n intitulé de l'élément choisi => " +
          this.matieres[this.editedIndex].nomMatiere
      );
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.loader = true;
      this.$store.dispatch(
        "actionRemoveMatiere",
        this.matieres[this.editedIndex].id
      );
      console.log(
        "index de l'élément confirmé pour la suppression =>" +
          this.matieres[this.editedIndex].id
      );
      this.matieres.splice(this.editedIndex, 1);
      this.loader = false;

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.loader = false;
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        let index = this.editedIndex;
        console.log("contenu de editedIndex => " + index);
        let courseToUpdate = this.editedItem.id;
        //let old = this.matieres[this.editedIndex];
        let donnees = [];
        donnees.push(courseToUpdate, this.editedItem);
        console.log(
          "type pk =>" +
            donnees[0] +
            "\n type objet modifié du save =>" +
            typeof donnees[1]
        );
        this.$store.dispatch("actionUpdateMatiere", donnees);
        if (this.$store.state.authStatut == "abel") {
          console.log(
            "if de matiere. state.alertErreur => " +
              this.$store.state.alertErreur
          );
          Object.assign(this.matieres[this.editedIndex], this.editedItem);
        } else if (this.$store.state.authStatut == "secretaire") {
          console.log("else if de matieres");
          this.message_erreur =
            "Désolé seuls les directeurs sont autorisés à modifier une matière";
          this.erreur = true;
        } else {
          console.log(
            "else de matiere. state.alertErreur => " +
              this.$store.state.alertErreur
          );
        }

        //creer une matière
      } else {
        console.log(
          "classe Associée de l'objet créé =>" + this.editedItem.classAssocie
        );
        // let objet = {
        //   nomMatiere: this.matieres[dernier]["nomMatiere"],
        //   pluriProf: this.matieres[dernier]["pluriProf"],
        //   seanceParSemaine: parseInt(
        //     this.matieres[dernier]["seanceParSemaine"]
        //   ),
        //   coefficient: parseInt(this.matieres[dernier]["coefficient"]),
        //   classAssocie: [this.matieres[dernier]["classAssocie"]],
        // };

        this.$store.dispatch("actionCreateMatiere", this.editedItem);
        if (this.$store.state.authStatut == "abel") {
          this.matieres.push(this.editedItem);
        } else if (this.$store.state.authStatut == "secretaire") {
          console.log("else if de matieres");
          this.message_erreur =
            "Désolé seuls les directeurs sont autorisés à créer une matière";
          this.erreur = true;
        } else {
          this.message_erreur =
            "Désolé une erreur s'est produite au niveau du serveur";
          console.log("else de matieres");
          this.erreur = true;
        }
      }
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped></style>
