<template>
  <v-card elevation="5">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Recherche"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      @click:row="handleClick"
      type="button"
      :headers="MyHeaders"
      :items="enseignants"
      :search="search"
      no-results-text="Désolé aucun résultat ne correspond à votre recherche !"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Liste Enseignants</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-top-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nouvel enseignant
              </v-btn>
            </template>
            <!-- ----------------------------------------------------------------------------- -->
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-card align-content-space-around>
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Settings</v-toolbar-title>

                  <v-spacer></v-spacer>
                  <v-card-title>
                    <span class="headline">{{ formTitle }} </span>
                  </v-card-title>
                  <v-spacer></v-spacer>

                  <v-toolbar-items>
                    <!-- <v-btn dark text @click="SaveProf">
                      Save
                    </v-btn> -->
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="SaveProf"
                      :disabled="!valid"
                    >
                      <v-chip
                        label
                        color="primary"
                        type="button"
                        @click="SaveProf"
                      >
                        <v-icon left>mdi-content-save-move-outline</v-icon>
                        Enregistrer
                      </v-chip>
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>

                <v-row>
                  <v-card style="margin-top: 30px" width="58%">
                    <v-card-title>
                      <span class="headline" style="margin-left: 100px"
                        >Informations générales</span
                      >
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="5">
                            <v-text-field
                              v-model="editedItem.nom"
                              :rules="nameRules"
                              label="Noms"
                              hint="example of persistent helper text"
                              persistent-hint
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <v-select
                              v-model="editedItem.civilite"
                              label="Sexe"
                              :items="['Masculin', 'Feminin']"
                              :rules="[(v) => !!v || 'Ce champ est requis']"
                              required
                            ></v-select>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.date_naissance"
                              label="Date de naissance"
                              hint="Exemple: 11-Mai-1995"
                              persistent-hint
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.lieu_naissance"
                              label="Lieu de naissance"
                              :rules="[(v) => !!v || 'Ce champ est requis']"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-autocomplete
                              :items="[
                                'Célibataire',
                                'Marié(e)',
                                'Fiancé(e)',
                                'Veuf(ve)',
                                'Divorcé(e)',
                              ]"
                              label="Statut sociale"
                              v-model="editedItem.situationSociale"
                              :rules="[(v) => !!v || 'Ce champ est requis']"
                              required
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.nationalite"
                              label="nationalite"
                              :rules="[(v) => !!v || 'Ce champ est requis']"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.adresse"
                              label="Adresse"
                              :rules="[(v) => !!v || 'Ce champ est requis']"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.telephone"
                              label="Téléphone"
                              :rules="telephoneRules"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.email"
                              label="Email"
                              type="email"
                              :rules="emailRules"
                            ></v-text-field>
                          </v-col>

                          <v-col md="4">
                            <v-autocomplete
                              :items="['Maternelle', 'Primaire', 'College']"
                              v-model="editedItem.enseigneAu"
                              label="Enseigne"
                              :rules="[(v) => !!v || 'Ce champ est requis']"
                              required
                            ></v-autocomplete>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-autocomplete
                              v-model="editedItem.matiereEnseigne"
                              :items="matieres"
                              :rules="[(v) => !!v || 'Ce champ est requis']"
                              required
                              label="Cours dispensé*"
                              multiple
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-autocomplete
                              :items="classes"
                              :rules="[(v) => !!v || 'Ce champ est requis']"
                              required
                              multiple
                              v-model="editedItem.classesOccupees"
                              label="Classes occupées*"
                            ></v-autocomplete>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                  </v-card>

                  <v-spacer></v-spacer>
                  <v-card width="40%" style=" margin-top: 30px">
                    <v-card-title>
                      <span class="headline" style="margin-left: 100px"
                        >Informations professionnelles</span
                      >
                    </v-card-title>
                    <v-list three-line subheader>
                      <!-- <v-subheader>User Controls</v-subheader> -->
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title
                            >Content filtering</v-list-item-title
                          >
                          <v-list-item-subtitle
                            >Set the content filtering level to restrict apps
                            that can be downloaded</v-list-item-subtitle
                          >
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>Password</v-list-item-title>
                          <v-list-item-subtitle
                            >Require password for purchase or use password to
                            restrict purchase</v-list-item-subtitle
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                    <v-col cols="12" sm="6" md="4">
                      <v-autocomplete
                        v-model="editedItem.modePaiement"
                        label="Mode de Paiement"
                        :items="['Manuel', 'Virement bancaire']"
                        :rules="[(v) => !!v || 'Ce champ est requis']"
                        required
                      ></v-autocomplete>
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
                  </v-card>

                  <v-divider></v-divider>

                  <v-card-actions
                    align-content-space-between
                    style="margin-left:360px"
                  >
                    <v-spacer></v-spacer>

                    <v-btn icon style="margin: 0 130px 0 50px">
                      <v-chip label color="primary" @click="dialog = false">
                        <v-icon left>mdi-close-outline</v-icon>
                        Annuler
                      </v-chip>
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      style="margin-left:250px"
                      text
                      @click="SaveProf"
                      :disabled="!valid"
                    >
                      <v-chip
                        label
                        color="primary"
                        type="button"
                        @click="SaveProf"
                      >
                        <v-icon left>mdi-content-save-move-outline</v-icon>
                        Enregistrer
                      </v-chip>
                    </v-btn>
                  </v-card-actions>
                </v-row>
              </v-card>
            </v-form>

            <!-- ---------------------------------------- -->
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="550px">
            <v-card>
              <v-card-title class="headline"
                >Voulez-vous vraiment supprimer l'enseignant

                <span style="color: red; margin: 3px 0px 0px 100px "
                  >{{ profActuel }} ?</span
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
        </v-toolbar>
      </template>

      <!--<template v-slot:item.actions="{ item }">
         <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon> 
        <v-icon @dblclick="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>-->

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialiseProf">
          Reactualiser
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Teachers",
  data: () => ({
    valid: true,

    search: "",
    erreur: false,
    message_erreur: "",
    dialog: false,
    dialogDelete: false,
    loader: false,
    profActuel: "",
    MyHeaders: [
      { text: "Nom", value: "nom", sortable: true },
      { text: "Téléphone", value: "telephone" },
      { text: "Adresse", value: "adresse", sortable: true },
      { text: "Cours", value: "matiereEnseigne", sortable: true },
      { text: "Classes", value: "classesOccupees", sortable: true },
      { text: "Admis le", value: "dateEmbauche", sortable: true },
      // à gerer pour la suppression { text: "Actions", value: "actions", sortable: false },
    ],

    enseignants: [],
    matieres: [],
    classes: undefined,

    nameRules: [
      (v) => !!v || "Le nom est obligatoire",
      (v) => (v && v.length > 6) || "Le nom doit avoir plus de 6 caractères",
    ],

    emailRules: [
      //(v) => !!v || "L'e-mail est obligatoire",
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],

    telephoneRules: [
      // (v) =>
      //   parseInt(v) == true || "Le numéro ne doit contenir que des chiffres",
      (v) =>
        v.length == 9 || "Le numéro doit contenir strictement 9 caractères",
    ],

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
    ...mapGetters(["allTeachers", "allMatieres"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  beforeMount() {
    let mat = this.allMatieres;

    mat.forEach((element) => {
      this.matieres.push(element.nomMatiere);
    });
    let id_classes = [localStorage.getItem("Id_classes")];
    let classe = undefined;
    console.log(
      "id_classes du localstorage " +
        typeof id_classes +
        "\nid_classes de vuex " +
        this.$store.state.identifiants_classes
    );
    id_classes.forEach((element) => {
      classe = element.split(",");
      console.log(classe);
    });

    this.classes = classe;
    this.initialiseProf();
  },

  methods: {
    handleClick: function(item, row) {
      row.select(true);
      console.log("Détails de " + item.email);
      this.editItem(item);
      //item  - selected item
    },

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
            // let profs_cours_id=[]
            // this.allMatieres.matiereEnseigne.forEach(element => {
            // this.allMatieres.find((x) => x.nomMatiere == matiere).id
            // });

            element.forEach((prof) => {
              prof.dateEmbauche = String(prof.dateEmbauche).slice(0, 10);
            });

            this.$store.state.enseignants = element;

            this.enseignants = element;
            console.log(
              "😃😃😃 this.profs => " +
                JSON.stringify(element) +
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
      this.profActuel = item.nom;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.loader = true;
      this.$store.dispatch(
        "actionRemoveEnseignant",
        this.enseignants[this.editedIndex].enseignant_numero
      );

      console.log(
        "index du prof à supprimé confirmé pour la suppression =>" +
          this.enseignants[this.editedIndex].enseignant_numero
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
    SaveProf() {
      console.log("is form valid ? " + this.$refs.form.validate());
      if (this.$refs.form.validate()) {
        console.log("is form valid ? " + this.$refs.form.validate());
        if (this.editedIndex > -1) {
          //update du prof
          let index = this.editedIndex;
          console.log("contenu de editedIndex => " + index);
          let profToUpdate = this.editedItem.enseignant_numero;
          let donnees = [];

          donnees.push(profToUpdate, this.editedItem);
          console.log(
            "type pk =>" +
              donnees[0] +
              "\n type objet modifié du save =>" +
              typeof donnees[1]
          );
          this.$store.dispatch("actionUpdateEnseignant", donnees);
          Object.assign(this.enseignants[this.editedIndex], this.editedItem);
          this.close();

          //creer un prof
        } else {
          console.log("prof selectionné " + this.editedItem.nom);
          // console.log("allTeachers " + JSON.stringify(this.allTeachers));
          // let matieres_ids = [];
          this.$store.dispatch("actionCreateEnseignant", this.editedItem);
          this.enseignants.push(this.editedItem);
          this.close();

          /* let matiere_position = this.allMatieres.findIndex(
              (x) => x.nomMatiere == this.editedItem.matiereEnseigne
            );
            console.log(matiere_position);
            let id_matiere = this.allMatieres[matiere_position].id;

            console.log("l'id de la matière selectionnée est " + id_matiere);

            this.editedItem.matiereEnseigne = [id_matiere];*/
        }
      } else {
        console.log("is form valid ? " + this.$refs.form.validate());
      }
    },

    save() {
      if (this.editedIndex > -1) {
        let index = this.editedIndex;
        console.log("contenu de editedIndex => " + index);
        let profToUpdate = this.editedItem.id;
        //let old = this.enseignants[this.editedIndex];
        let donnees = [];
        donnees.push(profToUpdate, this.editedItem);
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

<style lang="scss" scoped>
v-data-table[no-results-text] {
  color: red;
}
</style>
