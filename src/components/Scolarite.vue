<template>
  <v-row>
    <v-col md="2" scrollable>
      <mini-liste-eleves @eleveChoisi="AfficheEleve" />
    </v-col>
    <v-col elevation="5" md="10">
      <v-row>
        <v-card>
          <v-card-title class="headline">
            <v-chip label color="primary" text-color="white">
              <v-icon left>mdi-account</v-icon>
              <h2>{{ eleve.nom }}</h2>
            </v-chip>

            <v-chip
              label
              color="primary"
              style="margin-left:900px"
              text-color="white"
            >
              <v-icon left>mdi-book-variant</v-icon>
              <h3>{{ eleve.classe }}</h3>
            </v-chip>
          </v-card-title>

          <v-row>
            <!-- rubriaue infos civiles de l'élève qui paie -->
            <v-col :md="tailleMoisPaye">
              <v-card-text>
                <v-container grid-list-md>
                  <!-- raw affichant les mois payés ou impayés -->
                  <v-row>
                    <v-col>
                      <v-row justify="space-around">
                        <!-- <v-col> -->
                        <v-sheet elevation="10" class="py-4 px-1">
                          <v-row>
                            <v-chip
                              label
                              color="light-green"
                              text-color="white"
                              style="margin-left:100px"
                            >
                              <v-icon left>mdi-calendar-month-outline</v-icon>
                              Mois payés
                            </v-chip>
                          </v-row>
                          <v-row>
                            <!-- Debut Mois payés -->
                            <v-col>
                              <v-chip-group
                                mandatory
                                active-class="primary--text"
                                center-active
                              >
                                <v-chip
                                  readonly
                                  outlined
                                  v-for="moisPaye in MoisPaye"
                                  :key="moisPaye"
                                >
                                  <v-icon color="green">mdi-check</v-icon>
                                  {{ moisPaye }}
                                </v-chip>
                              </v-chip-group></v-col
                            >
                          </v-row>
                        </v-sheet>
                        <!-- </v-col> -->
                      </v-row>
                    </v-col>
                  </v-row>
                  <!-- fin raw affichant les mois payés ou impayés -->
                </v-container>
              </v-card-text>
            </v-col>

            <!-- rubriaue gestion des mois payés -->
            <v-col :md="tailleMoisAvance">
              <v-card-text>
                <v-container grid-list-md>
                  <!-- raw affichant les mois payés ou impayés -->
                  <v-row>
                    <v-col>
                      <v-row justify="space-around">
                        <!-- <v-col> -->
                        <v-sheet elevation="10" class="py-4 px-1">
                          <v-row>
                            <v-chip
                              label
                              color="light-green"
                              text-color="white"
                              style="margin-left:70px"
                            >
                              <v-icon left>mdi-calendar-month-outline</v-icon>
                              Mois Avancés
                            </v-chip>
                          </v-row>
                          <v-row>
                            <!-- Debut Mois payés -->
                            <v-col>
                              <v-chip-group
                                v-if="!shawNonPayedMonths"
                                mandatory
                                active-class="primary--text"
                                center-active
                              >
                                <v-chip
                                  readonly
                                  outlined
                                  v-for="mois in moisAvance"
                                  :key="mois"
                                >
                                  <v-icon color="green">mdi-check</v-icon>
                                  {{ mois }}
                                </v-chip>
                              </v-chip-group></v-col
                            >
                          </v-row>
                        </v-sheet>
                        <!-- </v-col> -->
                      </v-row>
                    </v-col>
                  </v-row>
                  <!-- fin raw affichant les mois payés ou impayés -->
                </v-container>
              </v-card-text>
            </v-col>

            <v-col :md="tailleMoisImpaye">
              <v-card-text>
                <v-container grid-list-md>
                  <!-- raw affichant les mois payés ou impayés -->
                  <v-row>
                    <v-col>
                      <v-row justify="space-around">
                        <!-- <v-col> -->
                        <v-sheet elevation="10" class="py-4 px-1">
                          <v-row>
                            <v-chip
                              label
                              color="light-green"
                              text-color="white"
                              style="margin-left:100px"
                            >
                              <v-icon left>mdi-calendar-month-outline</v-icon>
                              Mois Impayés
                            </v-chip>
                          </v-row>
                          <v-row>
                            <!-- Debut Mois payés -->
                            <v-col>
                              <v-chip-group
                                mandatory
                                active-class="primary--text"
                                center-active
                              >
                                <v-chip
                                  readonly
                                  outlined
                                  v-for="moisNonPaye in MoisNonPaye"
                                  :key="moisNonPaye"
                                >
                                  <v-icon color="green">mdi-check</v-icon>
                                  {{ moisNonPaye }}
                                </v-chip>
                              </v-chip-group></v-col
                            >
                          </v-row>
                        </v-sheet>
                        <!-- </v-col> -->
                      </v-row>
                    </v-col>
                  </v-row>
                  <!-- fin raw affichant les mois payés ou impayés -->
                </v-container>
              </v-card-text>
            </v-col>
          </v-row>

          <v-row style="margin-top: 15px">
            <v-col md="6">
              <v-text-field
                :value="eleve.telTuteur"
                prepend-icon=" mdi-phone"
                label="Frais Payés"
                readonly
                filled
                outlined
              >
              </v-text-field>
            </v-col>

            <v-col md="6">
              <v-text-field
                :value="eleve.telTuteur"
                prepend-icon=" mdi-phone"
                label="Frais Impayés"
                readonly
                filled
                outlined
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-divider style="border-style:solid;"> </v-divider>
          <v-divider style="margin-top:1px; border-style:solid"> </v-divider>

          <v-row style="margin-top:10px;">
            <!-- partie paiement -->
            <v-card-text>
              <v-container grid-list-md>
                <v-sheet elevation="10" class="py-4 px-1">
                  <v-data-table
                    light
                    v-model="fraisChoisi"
                    :headers="HeadersFrais"
                    :items="paiementFrais"
                    :single-select="singleSelect"
                    hide-default-footer
                    item-key="frais"
                    show-select
                    loading="true"
                  >
                    <!-- New frais and Edit frais -->
                    <template v-slot:top>
                      <v-toolbar flat>
                        <v-toolbar-title
                          >Liste des frais à payer</v-toolbar-title
                        >
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>

                        <v-dialog v-model="dialog" max-width="500px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              color="primary"
                              dark
                              class="mb-2"
                              v-bind="attrs"
                              v-on="on"
                            >
                              Ajouter un frais
                            </v-btn>
                          </template>
                          <v-card max-width="2000px">
                            <v-card-title>
                              <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col md="6">
                                    <v-text-field
                                      v-model="editedItem.frais"
                                      label="Intitulé"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                      type="number"
                                      v-model="editedItem.montant"
                                      label="Montant du frais"
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
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="saveNewOrUpdateFrais"
                              >
                                Enregistrer
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                    </template>

                    <template v-slot:item.actions="{ item }">
                      <v-icon small class="mr-2" @click="editItem(item)">
                        mdi-pencil
                      </v-icon>
                    </template>

                    <!-- <template v-slot:top>
                    <v-switch
                      v-model="singleSelect"
                      label="Choix unique"
                      class="pa-3"
                    ></v-switch>
                  </template> -->
                  </v-data-table>
                  <v-divider></v-divider>
                  <v-divider></v-divider>

                  <v-autocomplete
                    :items="mois"
                    label="Frais mensuels"
                    clearable
                    v-model="moisToPay"
                    chips
                    multiple
                    >Frais mensuels</v-autocomplete
                  >

                  <div class="text-center pt-2">
                    <v-btn @click.prevent="handleClick">Suivant</v-btn>
                  </div>
                  <v-alert
                    :value="alert"
                    color="deep-purple accent-4"
                    dark
                    border="top"
                    icon="mdi-cash-100"
                    transition="scale-transition"
                    persistent
                  >
                    <v-row v-if="moisToPay">
                      <v-row>
                        <v-col md="8">
                          <v-card-title v-if="AffichePaiementMois">
                            Paiement frais mensuel :
                            <v-chip
                              color="primary"
                              style="margin-left:15px"
                              text-color="white"
                            >
                              {{ moisToPay.toString() }}
                              <span style="margin-left:50px"
                                >{{ scolariteTotal }} FCFA</span
                              ></v-chip
                            >
                          </v-card-title>
                          <!-- Ici affichage en cas de paiement frais autres que les frais mensuels -->
                          <v-card-title v-if="AffichePaiementAutresFrais">
                            Paiement
                            <v-chip
                              color="primary"
                              style="margin-left:15px"
                              text-color="white"
                            >
                              {{ fraisApayer }}
                              <span style="margin-left:50px"
                                >{{ prixFraisApayer }} FCFA</span
                              ></v-chip
                            >
                          </v-card-title>
                        </v-col>
                        <v-col md="3">
                          <v-text-field
                            prepend-icon="mdi-account"
                            :value="eleve.nom"
                            outlined
                            filled
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col md="1">
                          <v-chip label color="primary" text-color="white">
                            <v-icon left>mdi-book-variant</v-icon>
                            {{ eleve.classe }}
                          </v-chip>
                        </v-col>
                      </v-row>
                    </v-row>

                    <v-row>
                      <v-col md="4">
                        <v-text-field
                          label="Montant à payer"
                          append-icon=""
                          v-model="montantApayer"
                          outlined
                          color
                        ></v-text-field>
                      </v-col>
                      <v-col md="4">
                        <v-text-field
                          label="Montant déjà payé"
                          append-icon=""
                          v-model="montantDejaPaye"
                          filled
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col md="4">
                        <v-text-field
                          label="Montant Restant"
                          append-icon=""
                          v-model="montantRestant"
                          filled
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-divider></v-divider>

                    <v-row>
                      <v-col>
                        <v-chip
                          label
                          color="red"
                          type="button"
                          @click="annulation"
                        >
                          <v-icon left>mdi-close-box-outline</v-icon>
                          Annuler
                        </v-chip></v-col
                      >
                      <v-col>
                        <v-chip
                          label
                          color="primary"
                          type="button"
                          @click="SavePayedFrais"
                        >
                          <v-icon left>mdi-content-save-move-outline</v-icon>
                          Enregistrer
                        </v-chip></v-col
                      >
                    </v-row>
                  </v-alert>
                  <!-- Alert en cas de double choix mois et autres frais  -->
                  <v-alert
                    v-if="alertErreurDuplicateTypeFrais"
                    transition="dialog-top-transition"
                    text
                    prominent
                    type="error"
                    icon="mdi-cloud-alert"
                    max-width="1200"
                    border="bottom"
                    color="pink darken-1"
                    colored-border
                  >
                    <h2
                      style="color:#d81b60; margin:0px, 10px,0px, 10px; position:absolute; margin-top:-4px"
                    >
                      Désolé vous ne pouvez pas procéder en même temps au
                      paiement de frais mensuels et des
                      <span style="margin-left: 350px">
                        autres types de frais</span
                      >
                    </h2>

                    <v-btn
                      color="pink darken-1"
                      outlined
                      width="30px"
                      style=" margin-left:1020px"
                      small
                      @click="alertErreurDuplicateTypeFrais = false"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-alert>
                </v-sheet>
              </v-container>
            </v-card-text>
          </v-row>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import MiniListeEleves from "@/components/MiniListeEleves.vue";
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      singleSelect: true,
      alert: false,
      alertErreurDuplicateTypeFrais: false,
      AffichePaiementAutresFrais: false,
      AffichePaiementMois: false,
      fraisChoisi: [],
      scolariteTotal: undefined,
      montantFraisMensuel: undefined,
      fraisApayer: undefined,
      prixFraisApayer: undefined,
      montantApayer: undefined,

      eleve: {
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

      HeadersFrais: [
        { text: "Frais à payer", value: "frais", sortable: true },
        { text: "Montant Frais", value: "montant", sortable: true },
        // { text: "Montant à payé", value: "montantApayer", sortable: true },
        // { text: "Montant déjà payé", value: "montantDejaPaye", sortable: true },
        // { text: "Montant restant", value: "montantRestant", sortable: true },
        //{ text: "Statut", value: "statut", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        frais: undefined,
        montant: undefined,
      },
      defaultItem: {
        frais: undefined,
        montant: undefined,
      },
      paiementFrais: [],
      classes: undefined,
      moisToPay: [],

      icon: "",
      optionDeTrie: "",
      shawAllMonths: undefined,
      shawPayedMonths: false,
      shawNonPayedMonths: undefined,
      shawAvancedMonths: undefined,
      MoisPayedToShow: undefined,
      mois: [
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre",
        "Janvier",
        "Fevrier",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
      ],
      moisAvance: [],
      MoisPaye: [],
      MoisNonPaye: [],
    };
  },
  components: {
    MiniListeEleves,
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nouveau frais" : "Modification frais";
    },

    // MoisPayed: function(item) {
    //   if (!localStorage.getItem("MoisPaye")) {
    //     return this.MoisPaye;
    //   } else if (!this.eleve.nom) {
    //     return this.MoisPaye;
    //   } else {
    //     return item;
    //   }
    // },
    // moisAvanced() {
    //   if (!localStorage.getItem("moisAvance")) {
    //     return [];
    //   } else if (!this.eleve.nom) {
    //     return [];
    //   } else {
    //     return JSON.parse(localStorage.getItem("moisAvance"));
    //   }
    // },
    // MoisNonPayed() {
    //   if (!localStorage.getItem("MoisNonPaye")) {
    //     return this.MoisNonPaye;
    //   } else if (!this.eleve.nom) {
    //     return [];
    //   } else {
    //     // je retire les mois payés dans la liste des mois de l'année
    //     this.MoisPaye.toString()
    //       .split(",")
    //       .forEach((mois) => {
    //         this.mois.splice(this.mois.indexOf(mois), 1);
    //       });
    //     //je retire les mois avancés dans la liste des mois de l'année
    //     this.moisAvance.forEach((mois) => {
    //       this.mois.splice(this.mois.indexOf(mois), 1);
    //     });
    //     return this.mois;
    //   }
    // },

    tailleMoisPaye() {
      let taille = this.MoisPaye.toString().split(",").length;
      return this.MoisPaye.length > 0 ? taille : 4;
    },
    tailleMoisImpaye() {
      let taille = this.MoisNonPaye.length;
      return taille > 0 ? taille : 4;
    },
    tailleMoisAvance() {
      let taille = this.moisAvance.length;
      return taille > 0 ? taille : 4;
    },
    montantDejaPaye() {
      if (this.moisToPay.length > 0) {
        return this.montantApayer;
      } else if (this.fraisChoisi.length > 0) {
        return this.fraisChoisi[0].montantDejaPaye;
      } else {
        return 0;
      }
    },
    montantRestant() {
      if (this.moisToPay.length > 0) {
        return Number(this.scolariteTotal) - Number(this.montantDejaPaye);
      } else if (this.fraisChoisi.length > 0) {
        return this.fraisChoisi[0].montantRestant;
      } else {
        return 0;
      }
    },

    iconToShow() {
      let ok = "mdi-check";
      let no = "mdi-cancel";
      return this.eleve.redoublant == "Nouveau" ? ok : no;
    },
    colorToShow() {
      return this.eleve.redoublant == "Nouveau" ? "green" : "red";
    },
  },
  watch: {
    // à chaque fois que la question change, cette fonction s'exécutera
    optionDeTrie: function(value) {
      this.InitialiseTrie(value);
    },
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.getFrais();
    this.getClasses();
  },

  methods: {
    annulation() {
      this.alert = false;
      this.fraisApayer = undefined;
      this.fraisChoisi = [];
      this.moisToPay = [];
      this.montantDejaPaye = undefined;
      this.montantRestant = undefined;
      this.AffichePaiementAutresFrais = false;
      this.AffichePaiementMois = false;
    },
    afficheAlert() {
      console.log(this.fraisChoisi.length);
    },
    handleClick: function() {
      this.$vuetify.goTo(document.body.scrollHeight); // ici c'est pour scroller directement vers le bas

      if (this.moisToPay.length > 0 && this.fraisChoisi.length == 0) {
        this.alert = true;
        this.AffichePaiementMois = true;
        console.log(
          "Frais mensuels sélectionnés" + JSON.stringify(this.moisToPay)
        );
        this.moisToPay.slice(0);
        this.scolariteTotal =
          Number(this.montantFraisMensuel.slice(0, -1)) * this.moisToPay.length;
        this.montantDejaPaye = this.montantApayer;
        this.montantRestant = this.scolariteTotal - this.montantDejaPaye;
      } else if (this.fraisChoisi.length > 0 && this.moisToPay.length == 0) {
        this.alert = true;
        console.log(
          "Autre Frais sélectionné" + JSON.stringify(this.fraisChoisi)
        );
        this.AffichePaiementAutresFrais = true;
        let frais = this.fraisChoisi[0].frais;
        let montantDejaPaye = this.fraisChoisi[0].montantDejaPaye;
        let montantRestant = this.fraisChoisi[0].montantRestant;
        let statut = this.fraisChoisi[0].statut;
        console.log("frais sélectionné => " + frais);
        this.fraisApayer = frais;
        this.prixFraisApayer = this.fraisChoisi[0].montant;
        this.montantDejaPaye = montantDejaPaye;
        this.montantRestant = montantRestant;
        this.statut = statut;
      } else {
        this.alertErreurDuplicateTypeFrais = true;
      }

      //item  - fraisChoisi item
    },
    getClasses() {
      this.classes = localStorage.getItem("Classes").split(",");
    },

    async getFrais() {
      const token = "Token " + localStorage.getItem("token");

      if (localStorage.getItem("token") != null) {
        var config = {
          method: "get",
          url: "api/finances/configFraisEleve/",
          headers: {
            Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
          },
        };
        await axios(config)
          .then((response) => {
            const result = response.data;

            console.log(result);
            localStorage.setItem("Frais", result);

            let element = [];

            for (const key in result) {
              element.push(result[key]);
            }
            element.forEach((obj) => {
              obj.montantDejaPaye = 0;
              obj.montantRestant = 0;
            });
            this.paiementFrais = element;
            console.log(
              "😃😃😃 this.paiementFrais => " +
                this.paiementFrais +
                "this.response.data = " +
                JSON.stringify(element)
            );
          })
          .catch(function(error) {
            console.log("😢😢😢" + error);
          });
      }
    },
    AfficheEleve() {
      console.log(this.MoisNonPaye.toString());
      this.MoisPaye = [];
      this.MoisNonPaye = [];
      this.moisAvance = [];
      console.log("Mois Non Paye vides en temps normal = " + this.MoisNonPaye);
      let eleveChoisi = JSON.parse(localStorage.getItem("eleveChoisi"));
      //attention ne jamais oublier de parses une variable JSON stringifié car elle ne ressemble à du JSON par la forme dans le fond c'est un Array oui mais pas d'objets mais de String
      this.montantFraisMensuel = JSON.parse(this.classes).find(
        (x) => x.identifiant == eleveChoisi.classe
      ).scolarite;

      this.eleve.nom = eleveChoisi.nom;
      this.eleve.sexe = eleveChoisi.sexe;
      this.eleve.dateLieuNaissance = eleveChoisi.dateLieuNaissance;
      this.eleve.adresse = eleveChoisi.adresse;
      this.eleve.tuteur = eleveChoisi.tuteur;
      this.eleve.telTuteur = eleveChoisi.telTuteur;
      this.eleve.redoublant = eleveChoisi.redoublant;
      this.eleve.classe = eleveChoisi.classe;

      // this.getfinanceEleveDetail(eleveChoisi);
      //this.MoisPayedToShow = this.MoisPaye.toString().split(",");
      // console.log("Mois Payés dans AfficheEleve " + this.MoisPayedToShow);
      this.InitialiseMoisPayeImpaye(eleveChoisi);
    },
    InitialiseMoisPayeImpaye(eleveChoisi) {
      const token = "Token " + localStorage.getItem("token");
      let allMonthsPayed = [];
      console.log(eleveChoisi.eleveNumber);

      if (localStorage.getItem("token") != null) {
        axios
          .get(
            `api/finances/paiementFraisEleve/?id=${eleveChoisi.eleveNumber}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            const result = response.data;
            console.log("result =" + result);
            localStorage.setItem("Frais", result);
            let AllFraisPayedByEleve = [];
            for (const key in result) {
              AllFraisPayedByEleve.push(result[key]);
            }

            let AllFraisPayedbyEleve = JSON.stringify(result);
            console.log(
              "😃😃😃 tous les frais payés de l'élève => " +
                AllFraisPayedbyEleve
            );
            localStorage.setItem("AllFraisPayedByEleve", AllFraisPayedbyEleve);
            //commit('InititialiseElevesPayed', AllFraisPayedByEleve)
            let fraisPayés = result;
            //s'il y'a une avance dans au moins un des paiements de l'élève
            fraisPayés.forEach((frais) => {
              if (
                frais.typeFrais === "Frais mensuel" &&
                frais.statut === "avancé"
              ) {
                allMonthsPayed.push(
                  frais.mois
                    .split(",")
                    .slice(0, -1)
                    .toString()
                );
                this.moisAvance.push(frais.mois.split(",").pop());
                console.log("attention");

                //si c'est un mois et que cest réglé
              } else if (
                frais.typeFrais === "Frais mensuel" &&
                frais.statut !== "avancé"
              ) {
                allMonthsPayed.push(frais.mois.split(",").toString());
              } else if (frais.typeFrais === "impôts élèves") {
                console.log("attention ici c'est typeFrais=== fr ");
              } else {
                console.log("fhf");
              }
            });
            if (allMonthsPayed.length > 0 && this.moisAvance) {
              console.log("non non non");
              this.MoisPaye = allMonthsPayed.filter(this.trieMoisVides);
              this.MoisNonPaye = this.trieMoisImpaye("moisPayeETavance");
            }
            if (allMonthsPayed.length > 0 && !this.moisAvance) {
              // ce que j'affecte aux moisPaye vient du resultat de trie opéré par la methode //filter qui enlève les tableaux vides de MoisPaye car c'est un tableau de tableaux
              this.MoisPaye = allMonthsPayed.filter(this.trieMoisVides);
              this.MoisNonPaye = this.trieMoisImpaye("moisPaye");
            }
            //this.MoisNonPaye = this.mois;
          })
          .catch(function(error) {
            console.log("😢😢😢" + error);
          });
      }

      console.log("Mois Payés = " + this.MoisPaye);
      console.log(
        "mois avancé = " +
          this.moisAvance +
          "\nMois Impayés =" +
          this.MoisNonPaye
      );
      this.shawPayedMonths = true;
    },
    trieMoisVides(value) {
      return value != "";
    },

    trieMoisImpaye(statut) {
      let monthsNonPayed = [
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre",
        "Janvier",
        "Fevrier",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
      ];
      console.log(monthsNonPayed + "MoisNonPaye => " + this.MoisNonPayed);
      this.MoisNonPayed = [];
      //this.moisAvance=[];
      if (statut === "moisPayeETavance") {
        console.log("coucou !");
        this.moisAvance.forEach((mois) => {
          monthsNonPayed.splice(monthsNonPayed.indexOf(mois), 1);
        });
      }
      this.MoisPaye.toString()
        .split(",")
        .forEach((mois) => {
          monthsNonPayed.splice(monthsNonPayed.indexOf(mois), 1);
        });
      console.log("months non payed = " + monthsNonPayed);
      return monthsNonPayed.toString().split(",");
    },

    getfinanceEleveDetail(eleveChoisi) {
      let id = eleveChoisi.eleveNumber;
      this.$store.dispatch("actionGetfinanceEleveDetail", id);
    },

    editItem(item) {
      this.editedIndex = this.paiementFrais.indexOf(item);

      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    saveNewOrUpdateFrais() {
      if (this.editedIndex > -1) {
        let index = this.editedIndex;
        console.log("contenu de editedIndex => " + index);
        let fraisToUpdate = this.editedItem.frais;

        let donnees = [];
        donnees.push(fraisToUpdate, this.editedItem);

        this.$store.dispatch("actionUpdateFrais", donnees);

        //creer un frais
      } else {
        console.log("type frais à ajouter =>" + this.editedItem.frais);
        this.editedItem.montant = Number(this.editedItem.montant);

        this.$store.dispatch("actionCreateFrais", this.editedItem);
      }
      this.close();
    },

    SavePayedFrais() {
      let eleveChoisi = JSON.parse(localStorage.getItem("eleveChoisi"));
      console.log(
        "fraisChoisi.length = " +
          this.fraisChoisi.length +
          "\nmoisToPay.lenght = " +
          this.moisToPay
      );
      let payedFrais = {
        eleve: eleveChoisi.eleveNumber,
        classe: eleveChoisi.classe,
        montantApayer: this.montantApayer,
        montantDejaPaye: this.montantDejaPaye,
        montantRestant: this.montantRestant,
      };
      //Cas où c'est un autre frais à payer

      if (this.fraisChoisi.length > 0) {
        payedFrais["typeFrais"] = this.fraisChoisi[0].frais;
        if (this.montantApayer == this.fraisChoisi[0].montant) {
          payedFrais["statut"] = "payé";
          payedFrais["montantFrais"] = this.fraisChoisi[0].montant;
        } else {
          console.log("Autre frais avancé");
          payedFrais["statut"] = "avancé";
          payedFrais["montantFrais"] = this.fraisChoisi[0].montant;
        }
        //Cas où c'est un frais mensuel à payer
      } else if (this.moisToPay.length > 0) {
        payedFrais["typeFrais"] = "Frais mensuel";
        if (
          this.montantApayer ==
          Number(this.montantFraisMensuel.slice(0, -1)) *
            Number(this.moisToPay.length)
        ) {
          console.log("Frais mensuels " + this.moisToPay.toString() + " payé");
          payedFrais["statut"] = "payé";
          payedFrais["mois"] = this.moisToPay.toString();
          payedFrais["montantFrais"] =
            Number(this.montantFraisMensuel.slice(0, -1)) *
            this.moisToPay.length;
        } else if (
          this.montantApayer <
          Number(this.montantFraisMensuel.slice(0, -1)) *
            Number(this.moisToPay.length)
        ) {
          console.log(
            "Frais mensuels " + this.moisToPay.toString() + " avancé"
          );
          payedFrais["statut"] = "avancé";
          payedFrais["mois"] = this.moisToPay.toString();
          payedFrais["montantFrais"] =
            Number(this.montantFraisMensuel.slice(0, -1)) *
            this.moisToPay.length;
        } else {
          console.log(
            "😿 comment pouvez-vous payer plus que ce qui est demandé ???"
          );
        }
      } else {
        console.log("😿 oops....");
      }

      this.$store.dispatch("actionPayedFrais", payedFrais);
      this.alert = false;
      this.fraisApayer = undefined;
      this.fraisChoisi = [];
      this.moisToPay = [];
      this.montantDejaPaye = undefined;
      this.montantRestant = undefined;
      this.AffichePaiementAutresFrais = false;
      this.AffichePaiementMois = false;
    },
  },
};
</script>

<style>
#nomEleve {
  margin: 0px 360px 0px 360px;
}
</style>
