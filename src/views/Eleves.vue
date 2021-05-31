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
      :search="search"
      :headers="MyHeaders"
      :items="eleves"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Tous les élèves de l'établissement</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nouvel Eleve
              </v-btn>
            </template>
            <!-- ----------------------------------------------------------------------------- -->
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-card align-content-space-around>
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Fermer</v-toolbar-title>

                  <v-spacer></v-spacer>
                  <v-card-title>
                    <span class="headline">{{ formTitle }} </span>
                  </v-card-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="SaveEleve"
                      :disabled="!valid"
                    >
                      <v-chip
                        label
                        color="primary"
                        type="button"
                        @click="SaveEleve"
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
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="3">
                            <v-select
                              v-model="editedItem.sexe"
                              label="Sexe"
                              :items="['Masculin', 'Feminin']"
                              :rules="[
                                (v) => !!v || 'Vous devez renseigner ce champs',
                              ]"
                              required
                            ></v-select>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.dateLieuNaissance"
                              label="Date et lieu de naissance"
                              hint="Exemple: 11-Mai-1995 à Brazzaville"
                              persistent-hint
                              :rules="[
                                (v) => !!v || 'Vous devez renseigner ce champs',
                              ]"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.adresse"
                              label="Adresse domicile actuel"
                              :rules="[
                                (v) => !!v || 'Vous devez renseigner ce champs',
                              ]"
                              required
                            ></v-text-field>
                          </v-col>
                          <!-- <v-col cols="12" sm="6" md="4">
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
                          </v-col> -->
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.ecoleDorigine"
                              label="Ecole d'origine"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              :items="['Apte', 'Inapte']"
                              v-model="editedItem.etatSanitaire"
                              label="Etat Sanitaire"
                              :rules="[
                                (v) => !!v || 'Vous devez renseigner ce champs',
                              ]"
                              required
                            ></v-select>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              v-model="editedItem.redoublant"
                              :items="['Nouveau', 'Redoublant']"
                              label="Nouveau ou redoublant *"
                              :rules="[
                                (v) => !!v || 'Vous devez renseigner ce champs',
                              ]"
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-autocomplete
                              :items="classes"
                              :rules="[
                                (v) => !!v || 'Vous devez renseigner ce champs',
                              ]"
                              required
                              v-model="editedItem.classe"
                              label="Classe*"
                            ></v-autocomplete>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small
                        ><v-chip label color="primary" text-color="white">
                          <v-icon left>mdi-information-variant</v-icon> *
                          indique que le champ est obligatoire
                        </v-chip></small
                      >
                    </v-card-text>
                  </v-card>

                  <v-spacer></v-spacer>
                  <v-card width="40%" style=" margin-top: 30px">
                    <v-card-title>
                      <span class="headline" style="margin-left: 100px"
                        >Informations relatives aux parents</span
                      >
                    </v-card-title>
                    <v-list three-line subheader>
                      <!-- <v-subheader>User Controls</v-subheader> -->
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            <v-chip label color="info" text-color="white">
                              <v-icon left>mdi-home-heart</v-icon> A propos du
                              père et de la mère
                            </v-chip>
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >Dans la rubrique liée au père et à la mère
                            renseignez les informations des parents
                            biologogiques.
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            <v-chip label color="info" text-color="white">
                              <v-icon left>mdi-family-tree</v-icon> A propos du
                              tuteur
                            </v-chip></v-list-item-title
                          >
                          <v-list-item-subtitle>
                            Dans la rubrique tuteur veuillez y mettre les
                            informations du Parent le plus disponible en cas de
                            besoin.
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                    <v-container class="">
                      <v-row>
                        <v-col cols="12" sm="6" md="7">
                          <v-text-field
                            v-model="editedItem.nomPapa"
                            label="Noms et prénoms du père"
                            :rules="nameRules"
                            :counter="10"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="5">
                          <v-text-field
                            v-model="editedItem.telPapa"
                            label="Téléphone du père"
                            :rules="telephoneRules"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container class="">
                      <v-row>
                        <v-col cols="12" sm="6" md="7">
                          <v-text-field
                            v-model="editedItem.nomMaman"
                            label="Noms et prénoms de la mère"
                            :rules="[
                              (v) => !!v || 'You must agree to continue!',
                            ]"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="5">
                          <v-text-field
                            v-model="editedItem.telMaman"
                            label="Téléphone de la mère"
                            :rules="telephoneRules"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container class="">
                      <v-row>
                        <v-col cols="12" sm="6" md="5" contai>
                          <v-text-field
                            v-model="editedItem.tuteur"
                            label="Noms et prénoms du tuteur"
                            :rules="nameRules"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            v-model="editedItem.telTuteur"
                            label="Téléphone du tuteur"
                            :rules="telephoneRules"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.emailTuteur"
                            label="Email du tuteur"
                            email
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>

                  <v-divider></v-divider>

                  <v-card-actions
                    align-content-space-between
                    style="margin-left:360px"
                  >
                    <v-spacer></v-spacer>

                    <v-btn icon style="margin: 0 130px 0 50px">
                      <v-chip
                        label
                        color="primary"
                        type="button"
                        @click="dialog = false"
                      >
                        <v-icon left>mdi-close-outline</v-icon>
                        Annuler
                      </v-chip>
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      style="margin-left:250px"
                      text
                      @click="SaveEleve"
                      :disabled="!valid"
                    >
                      <v-chip
                        label
                        color="primary"
                        type="button"
                        @click="SaveEleve"
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
          <v-dialog v-model="dialogDelete" max-width="490px">
            <v-card>
              <v-card-title class="headline"
                >Voulez-vous vraiment supprimer l'élève

                <span style="color: red; margin: 3px 0px 0px 100px "
                  >{{ eleveActuel }} ?</span
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

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initializeEleve">
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
  name: "Eleves",
  data: () => ({
    valid: true,
    search: "",
    erreur: false,
    message_erreur: "",
    dialog: false,
    dialogDelete: false,
    loader: false,
    eleveActuel: "",
    MyHeaders: [
      { text: "Nom", value: "nom", sortable: true },
      { text: "Sexe", value: "sexe" },
      { text: "Adresse", value: "adresse", sortable: true },
      { text: "Ecole d' origine", value: "ecoleDorigine", sortable: true },
      { text: "Classe", value: "classe", sortable: true },
      { text: "Tel du Tuteur", value: "telTuteur", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],

    eleves: [],
    matieres: [],
    classes: undefined,
    nameRules: [
      (v) => !!v || "Name is required",
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
      nom: "",
      sexe: null,
      dateLieuNaissance: "",
      adresse: "",
      nationalite: "",
      etatSanitaire: null,
      ecoleDorigine: "",
      nomMaman: "",
      telMaman: "",
      nomPapa: "",
      telPapa: "",
      tuteur: "",
      telTuteur: "",
      emailTuteur: "",
      redoublant: null,
      classe: null,
    },
    defaultItem: {
      nom: "",
      sexe: null,
      dateLieuNaissance: "",
      adresse: "",
      nationalite: "",
      etatSanitaire: null,
      ecoleDorigine: "",
      nomMaman: "",
      telMaman: "",
      nomPapa: "",
      telPapa: "",
      tuteur: "",
      telTuteur: "",
      emailTuteur: "",
      redoublant: null,
      classe: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nouvel(le) élève"
        : "Modification d'un(e) élève";
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
    // let mat = this.allMatieres;

    // mat.forEach((eleves) => {
    //   this.matieres.push(eleves.nomMatiere);
    // });
    let id_classes = [localStorage.getItem("Id_classes")];
    let classe = undefined;
    console.log(
      "id_classes du localstorage " +
        typeof id_classes +
        "\nid_classes de vuex " +
        this.$store.state.identifiants_classes
    );
    id_classes.forEach((eleves) => {
      classe = eleves.split(",");
      console.log(classe);
    });

    this.classes = classe;
    this.initializeEleve();
  },

  methods: {
    CloseAlert() {
      this.message_erreur = "";
      this.erreur = false;
    },
    async initializeEleve() {
      //   this.$store.dispatch("actionInitialiseMatiere");
      const token = "Token " + localStorage.getItem("token");
      if (localStorage.getItem("token") != null) {
        var config = {
          method: "get",
          url: "api/inscriptions/",
          headers: {
            Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
          },
        };
        await axios(config)
          .then((response) => {
            const result = response.data;

            console.log(result);
            localStorage.setItem("Elèves", result);

            let eleves = [];
            for (const key in result) {
              eleves.push(result[key]);
            }
            // let eleves_cours_id=[]
            // this.allMatieres.matiereEnseigne.forEach(eleves => {
            // this.allMatieres.find((x) => x.nomMatiere == matiere).id
            // });

            eleves.forEach((eleve) => {
              eleve.dateEmbauche = String(eleve.dateEmbauche).slice(0, 10);
            });

            this.$store.state.eleves = eleves;

            this.eleves = eleves;
            console.log(
              "😃😃😃 this.eleves => " +
                JSON.stringify(eleves) +
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
      this.editedIndex = this.eleves.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.eleves.indexOf(item);

      console.log("position de l'élément choisi => " + this.editedIndex);
      console.log(
        "id de l'élément choisi => " +
          this.eleves[this.editedIndex].id +
          "\n intitulé de l'élément choisi => " +
          this.eleves[this.editedIndex].nomMatiere
      );
      this.editedItem = Object.assign({}, item);
      this.eleveActuel = item.nom;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.loader = true;
      this.$store.dispatch(
        "actionRemoveEleve",
        this.eleves[this.editedIndex].eleveNumber
      );
      console.log(
        "index du eleve à supprimé confirmé pour la suppression =>" +
          this.eleves[this.editedIndex].eleveNumber
      );
      this.eleves.splice(this.editedIndex, 1);
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
    SaveEleve() {
      if (this.$refs.form.validate()) {
        console.log("Is form valid ? " + this.$refs.form.validate());
        if (this.editedIndex > -1) {
          //update du eleve
          let index = this.editedIndex;
          console.log("contenu de editedIndex => " + index);
          let eleveToUpdate = this.editedItem.eleveNumber;
          let donnees = [];

          donnees.push(eleveToUpdate, this.editedItem);
          console.log(
            "type pk =>" +
              donnees[0] +
              "\n type objet modifié du save =>" +
              typeof donnees[1]
          );
          this.$store.dispatch("actionUpdateEleve", donnees);
          Object.assign(this.eleves[this.editedIndex], this.editedItem);
          this.close();

          //creer un eleve
        } else {
          console.log("eleve selectionné " + this.editedItem.nom);
          this.$store.dispatch("actionCreateEleve", this.editedItem);
          this.eleves.push(this.editedItem);
          this.close();
        }
      } else {
        console.log("Is form valid ? " + this.$refs.form.validate());
      }
    },
    clear() {
      this.$refs.form.reset();
    },

    save() {
      if (this.editedIndex > -1) {
        let index = this.editedIndex;
        console.log("contenu de editedIndex => " + index);
        let eleveToUpdate = this.editedItem.id;
        //let old = this.eleves
        [this.editedIndex];
        let donnees = [];
        donnees.push(eleveToUpdate, this.editedItem);
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
          Object.assign(this.eleves[this.editedIndex], this.editedItem);
        } else if (this.$store.state.authStatut == "secretaire") {
          console.log("else if de eleves");
          this.message_erreur =
            "Désolé seuls les directeurs sont autorisés à modifier une matière";
          this.erreur = true;
        } else {
          console.log(
            "else de teachers state.alertErreur => " +
              this.$store.state.alertErreur
          );
        }

        //creer un élève
      } else {
        console.log(
          "classe Associée de l'élève créé =>" + this.editedItem.classe
        );

        this.$store.dispatch("actionCreateEleve", this.editedItem);
        this.eleves.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped></style>
