<template>
  <v-data-iterator
    content-class="class"
    content-props="props"
    content-tag="div"
    custom-filter="filter"
    custom-sort="sort"
    dark
    light
    disable-initial-sort
    expand="Function"
    hide-actions
    item-key="id"
    :items="enseignants"
    loading
    must-sort
    next-icon="chevron_right"
    prev-icon="chevron_left"
    no-data-text="No data available"
    no-results-text="No matching records found"
    pagination.sync="Object"
    rows-per-page-items="[5,10,25]"
    rows-per-page-text="Items per page:"
    search="search"
    select-all="select-all"
    total-items="0"
    value="value"
    input="event"
    update:pagination="event"
  >
  </v-data-iterator>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Eleves",
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
    matieres: [],
    classes: undefined,
    nameRules: [
      (v) => !!v || "Le nom est obligatoire",
      (v) => v.length > 6 || "Le nom doit avoir plus de 6 caractères",
    ],
    emailRules: [
      //(v) => !!v || "L'e-mail est obligatoire",
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],

    telephoneRules: [
      (v) => !!v || "Le numéro de téléphone est obligatoire",
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
        if (this.$refs.form.validate()) {
          console.log("prof selectionné " + this.editedItem.nom);
          // console.log("allTeachers " + JSON.stringify(this.allTeachers));
          // let matieres_ids = [];
          // // ici je renvois une liste des ids des matieres choisies pour le prof dans le formulaire
          /* if (this.editedItem.matiereEnseigne.length > 1) {
             this.editedItem.matiereEnseigne.forEach((matiere) => {
               matieres_ids.push(
                 this.allMatieres.find((x) => x.nomMatiere == matiere).id
               );
             });
             console.log(
               "liste des ids des matières sélectionnées " + matieres_ids
             );
             this.editedItem.matiereEnseigne = matieres_ids;*/
          this.$store.dispatch("actionCreateEnseignant", this.editedItem);
          this.enseignants.push(this.editedItem);
          this.close();
        } else {
          /* let matiere_position = this.allMatieres.findIndex(
              (x) => x.nomMatiere == this.editedItem.matiereEnseigne
            );
            console.log(matiere_position);
            let id_matiere = this.allMatieres[matiere_position].id;

            console.log("l'id de la matière selectionnée est " + id_matiere);

            this.editedItem.matiereEnseigne = [id_matiere];*/
          this.dialog = true;
        }
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
