<template>
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
          <v-card>
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
                    <v-text-field
                      v-model="editedItem.pluriProf"
                      label="Pluri-prof"
                      placeholder="Taper oui ou non"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.seanceParSemaine"
                      label="Nbre d'Heures/semaine"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.coefficient"
                      label="coefficient"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.classAssocie"
                      label="Enseignée en :"
                    ></v-text-field>
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
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Etes-vous sûr de bien vouloir supprimer cette matière
              ?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialiseMatiere">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Matieres",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    MyHeaders: [
      { text: "Intitulé", value: "nomMatiere", sortable: false },
      { text: "Pluri-profs", value: "pluriProf" },
      { text: "Heures/semaine", value: "seanceParSemaine" },
      { text: "coefficient", value: "coefficient" },
      { text: "Classes", value: "classAssocie" },
      { text: "Actions", value: "actions", sortable: false },
    ],

    matieres: [],
    editedIndex: -1,
    editedItem: {
      nomMatiere: "",
      pluriProf: "",
      seanceParSemaine: null,
      coefficient: null,
      classAssocie: "",
    },
    defaultItem: {
      nomMatiere: "",
      pluriProf: "",
      seanceParSemaine: null,
      coefficient: null,
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

  methods: {
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
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.matieres.splice(this.editedIndex, 1);
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
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.matieres[this.editedIndex], this.editedItem);
      } else {
        this.matieres.push(this.editedItem);
        let dernier = this.matieres.length - 1;
        console.log([this.matieres[dernier]["classAssocie"]]);
        let objet = {
          nomMatiere: this.matieres[dernier]["nomMatiere"],
          pluriProf: this.matieres[dernier]["pluriProf"],
          seanceParSemaine: parseInt(
            this.matieres[dernier]["seanceParSemaine"]
          ),
          coefficient: parseInt(this.matieres[dernier]["coefficient"]),
          classAssocie: [this.matieres[dernier]["classAssocie"]],
        };

        this.$store.dispatch("actionCreateMatiere", objet);
      }
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped></style>
