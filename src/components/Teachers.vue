<template>
  <v-data-table
    :headers="MyHeaders"
    :items="enseignants"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Liste Enseignants</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Nouvel enseignant
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }} </span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.nom"
                      label="Noms"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.civilite"
                      label="civilite"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.civilite"
                      label="civilite"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.date_naissance"
                      label="date_naissance"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.lieu_naissance"
                      label="lieu_naissance"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.situationSociale"
                      label="situationSociale"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.nationalite"
                      label="nationalite"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.adresse"
                      label="Adresse"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.telephone"
                      label="telephone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.email"
                      label="email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.modePaiement"
                      label="Mode de Paiement"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.telephone"
                      label="Téléphone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.numeroCompteBancaire"
                      label="Compte Bancaire"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.numeroCnss"
                      label="Numere CNSS"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.enseigneAu"
                      label="Enseigne au ?"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Cours dispensé"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Classes occupées"
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
              >Are you sure you want to delete this item?</v-card-title
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
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Teachers",
  data: () => ({
    erreur: false,
    message_erreur: "",
    dialog: false,
    dialogDelete: false,
    loader: false,
    MyHeaders: [
      { text: "Nom", value: "nom", sortable: true },
      { text: "Téléphone", value: "telephone" },
      { text: "Adresse", value: "adresse", sortable: true },
      { text: "Cours", value: "matiereEnseigne", sortable: true },
      { text: "Classes", value: "classesOccupees", sortable: true },
      { text: "Admis le", value: "dateEmbauche", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],

    enseignants: [],
    editedIndex: -1,
    editedItem: {
      nom: undefined,
      civilite: undefined,
      date_naissance: undefined,
      lieu_naissance: undefined,
      situationSociale: undefined,
      nationalite: undefined,
      adresse: undefined,
      telephone: undefined,
      email: undefined,
      dateEmbauche: undefined,
      modePaiement: undefined,
      intituleCompte: undefined,
      numeroCompteBancaire: undefined,
      numeroCnss: undefined,
      enseigneAu: undefined,
      classesOccupees: [],
    },
    defaultItem: {
      nom: undefined,
      adresse: undefined,
      telephone: undefined,
      email: undefined,
      dateEmbauche: undefined,
      classesOccupees: [],
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nouvel(le) Enseignant(e)"
        : "Modification d'un(e) enseignant(e)";
    },
    ...mapGetters(["allTeachers"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  // created() {
  //   this.initialiseProf();
  // },
  beforeMount() {
    this.initialiseProf();
  },

  methods: {
    CloseAlert() {
      this.message_erreur = "";
      this.erreur = false;
    },
    async initialiseProf() {
      //   this.$store.dispatch("actionInitialiseMatiere");
      const token = "Token " + localStorage.getItem("token");

      if (localStorage.getItem("token") != null) {
        var config = {
          method: "get",
          url: "api/ecole/enseignants/",
          headers: {
            Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
          },
        };
        await axios(config)
          .then((response) => {
            const result = response.data;

            console.log(result);
            localStorage.setItem("Profs", result);

            let element = [];
            for (const key in result) {
              element.push(result[key]);
            }

            this.$store.state.enseignants = element;
            this.enseignants = element;
            console.log(
              "😃😃😃 this.profs => " +
                element +
                "this.response.data = " +
                response.data
            );
          })
          .catch(function(error) {
            console.log("😢😢😢" + error);
          });
      }
    },

    editItem(item) {
      this.editedIndex = this.enseignants.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.enseignants.indexOf(item);

      console.log("position de l'élément choisi => " + this.editedIndex);
      console.log(
        "id de l'élément choisi => " +
          this.enseignants[this.editedIndex].id +
          "\n intitulé de l'élément choisi => " +
          this.enseignants[this.editedIndex].nomMatiere
      );
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.loader = true;
      this.$store.dispatch(
        "actionRemoveMatiere",
        this.enseignants[this.editedIndex].id
      );
      console.log(
        "index de l'élément confirmé pour la suppression =>" +
          this.enseignants[this.editedIndex].id
      );
      this.enseignants.splice(this.editedIndex, 1);
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
        //let old = this.enseignants[this.editedIndex];
        let donnees = [];
        donnees.push(courseToUpdate, this.editedItem);
        console.log(
          "type pk =>" +
            donnees[0] +
            "\n type objet modifié du save =>" +
            typeof donnees[1]
        );
        this.$store.dispatch("actionUpdateEnseignant", donnees);
        if (this.$store.state.authStatut == "abel") {
          console.log(
            "if de matiere. state.alertErreur => " +
              this.$store.state.alertErreur
          );
          Object.assign(this.enseignants[this.editedIndex], this.editedItem);
        } else if (this.$store.state.authStatut == "secretaire") {
          console.log("else if de enseignants");
          this.message_erreur =
            "Désolé seuls les directeurs sont autorisés à modifier une matière";
          this.erreur = true;
        } else {
          console.log(
            "else de teachers state.alertErreur => " +
              this.$store.state.alertErreur
          );
        }

        //creer une matière
      } else {
        console.log(
          "classe Associée de l'objet créé =>" + this.editedItem.classAssocie
        );

        this.$store.dispatch("actionCreateEnseignant", this.editedItem);
        if (this.$store.state.authStatut == "abel") {
          this.enseignants.push(this.editedItem);
        } else if (this.$store.state.authStatut == "secretaire") {
          console.log("else if de enseignants");
          this.message_erreur =
            "Désolé seuls les directeurs sont autorisés à créer un enseignant";
          this.erreur = true;
        } else {
          this.message_erreur =
            "Désolé une erreur s'est produite au niveau du serveur";
          console.log("else de enseignants");
          this.erreur = true;
        }
      }
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped></style>
