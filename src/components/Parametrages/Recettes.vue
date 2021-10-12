<template>
  <div style="width:1300px">
    <v-row>
      <v-col cols="12">
        <v-toolbar color="cyan" flat>
          <v-col md="4" v-for="item in Finances" :key="item">
            <v-toolbar-title
              class="title-h6 font-weight-light pa-4 title-center"
              style="margin-top:25px"
            >
              <v-btn elevation="2" width="125px" @click="showAlert(item)">{{
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
      <v-col>
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
            <v-carousel v-model="model" height="100">
              <v-carousel-item
                v-for="classe in classes"
                :key="classe.identifiant"
              >
                <v-sheet height="100%" tile>
                  <v-row class="fill-height" align="center" justify="center">
                    <div class="text-h3 pb-2">
                      {{
                        classe.cycle === "Garderie"
                          ? classe.identifiant + " (Garderie)"
                          : classe.identifiant
                      }}
                    </div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </div>
          <!-- Formulaire configs inscriptions, réinscriptions et écolage -->
          <v-card elevation="11" class="pt-5">
            <h2 class="purple--text text-uppercase">{{ activeTypeRecette }}</h2>
            <v-divider color="purple" class="mt-2"></v-divider>

            <v-form
              v-if="activeTypeRecette === 'Ecolage'"
              @submit.prevent="onLogin()"
              ref="form"
              v-model="valid"
              lazy-validation
              class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
            >
              <v-row>
                <v-col md="5">
                  <v-text-field
                    v-if="activeTypeRecette === 'Ecolage'"
                    type="number"
                    v-model="editRecette.montant"
                    label="Montant Frais mensuel"
                    shaped
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="2" width="70px">
                  <v-switch
                    disabled
                    input-value="true"
                    v-model="obligatoire"
                    filled
                    label="Obligatoire ?"
                    shaped
                    outlined
                  >
                  </v-switch>
                </v-col>

                <v-col md="5">
                  <v-text-field
                    readonly
                    v-model="anneeScolaireActuelle"
                    label="Année scolaire"
                    shaped
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col md="6">
                  <v-text-field
                    v-if="activeTypeRecette === 'Insc-Réinsc'"
                    type="number"
                    v-model="editRecette.fraisInscription"
                    label="frais Inscription"
                    shaped
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="6">
                  <v-text-field
                    v-if="activeTypeRecette === 'Insc-Réinsc'"
                    type="number"
                    v-model="editRecette.fraisReinscription"
                    label="Frais Reinscription"
                    shaped
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="12" style="margin-top:-20px">
                  <v-text-field
                    v-model="editRecette.periodePaiement"
                    :label="
                      activeTypeRecette === 'Ecolage'
                        ? 'Date limite de recouvrement'
                        : 'Periode de recouvrement'
                    "
                    :placeholder="
                      activeTypeRecette === 'Ecolage'
                        ? 'Ex: 07 jours après la fin du mois en cours '
                        : 'Du 01/01/2021 au 01/05/2021'
                    "
                    :hint="
                      activeTypeRecette === 'Ecolage'
                        ? 'Ex: 07 jours après la fin du mois en cours '
                        : 'Du 01/01/2021 au 01/05/2021'
                    "
                    persistent-hint
                    shaped
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-btn
                x-large
                type="submit"
                hidden
                block
                :disabled="
                  recettesToShow.length > 0 && contentBtn === 'Enregistrez'
                "
                :loading="loading"
                color="purple darken-4"
                class="mr-4 text"
                @click="validate"
              >
                <span class="white--text">{{ contentBtn }}</span>
                <v-icon light>mdi-cached</v-icon>
              </v-btn>

              <v-card>
                <v-card-title>
                  {{ activeTypeRecette }} {{ classeRecette }}
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    readonly
                    disabled
                    append-icon="mdi-magnify"
                    label="Cliquez sur la recette pour modifier celle-ci"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>

                <!-- Table pour Ecolage -->
                <v-data-table
                  hide-default-footer
                  :headers="
                    activeTypeRecette === 'Insc-Réinsc'
                      ? headersInscReinc
                      : headersEcolage
                  "
                  :items="recettesToShow"
                  no-data-text="Aucune recette enregistrée pour cette classe."
                  :search="search"
                  type="button"
                  @click:row="recetteClicked"
                ></v-data-table>
              </v-card>
            </v-form>
            <!-- Formulaire pour Inscriptions Réinscriptions  -->
            <v-form
              v-else
              @submit.prevent="onLogin()"
              ref="form"
              v-model="valid"
              lazy-validation
              class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
            >
              <v-row>
                <v-col md="5">
                  <v-text-field
                    v-model="editRecette.periodePaiement"
                    :label="
                      activeTypeRecette === 'Ecolage'
                        ? 'Date limite de recouvrement'
                        : 'Periode de recouvrement'
                    "
                    :placeholder="
                      activeTypeRecette === 'Ecolage'
                        ? 'Ex: 07 jours après la fin du mois en cours '
                        : 'Du 01/01/2021 au 01/05/2021'
                    "
                    :hint="
                      activeTypeRecette === 'Ecolage'
                        ? 'Ex: 07 jours après la fin du mois en cours '
                        : 'Du 01/01/2021 au 01/05/2021'
                    "
                    append-icon=""
                    persistent-hint
                    shaped
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="2" width="70px">
                  <v-switch
                    v-model="obligatoire"
                    disabled
                    input-value="true"
                    filled
                    label="Obligatoire ?"
                    shaped
                    outlined
                  >
                  </v-switch>
                </v-col>

                <v-col md="5">
                  <v-text-field
                    readonly
                    v-model="anneeScolaireActuelle"
                    label="Année scolaire"
                    shaped
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col md="6">
                  <v-text-field
                    v-if="activeTypeRecette === 'Insc-Réinsc'"
                    type="number"
                    v-model="editRecette.fraisInscription"
                    label="frais Inscription"
                    shaped
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="6">
                  <v-text-field
                    v-if="activeTypeRecette === 'Insc-Réinsc'"
                    type="number"
                    v-model="editRecette.fraisReinscription"
                    label="Frais Reinscription"
                    shaped
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-btn
                x-large
                type="submit"
                hidden
                block
                :disabled="
                  recettesToShow.length > 0 && contentBtn === 'Enregistrez'
                "
                :loading="loading"
                color="purple darken-4"
                class="mr-4 text"
                @click="validate"
              >
                <span class="white--text">{{ contentBtn }}</span>
                <v-icon light>mdi-cached</v-icon>
              </v-btn>

              <v-card>
                <v-card-title>
                  {{ activeTypeRecette }} {{ classeRecette }}
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    readonly
                    disabled
                    append-icon="mdi-magnify"
                    label="Cliquez sur la recette pour modifier celle-ci"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  hide-default-footer
                  :headers="
                    activeTypeRecette === 'Insc-Réinsc'
                      ? headersInscReinc
                      : headersEcolage
                  "
                  :items="recettesToShow"
                  no-data-text="Aucune recette enregistrée pour cette classe."
                  :search="search"
                  type="button"
                  @click:row="recetteClicked"
                ></v-data-table>
              </v-card>
            </v-form>
          </v-card>
        </v-alert>

        <v-alert
          :value="alertAutres"
          color="cyan"
          elevation="2"
          border="top"
          transition="scale-transition"
        >
          <v-data-table
            :headers="autresRecettesHeaders"
            :items="autresRecettes"
            item-key="identifiant"
            no-data-text="Pas de recettes enregistrées pour l'instant"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title
                  >Toutes les autres recettes de l'éole</v-toolbar-title
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
                      Nouvelle Recette
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-row>
                            <v-col md="4">
                              <v-combobox
                                v-model="editAutreRecette.identifiant"
                                :items="[
                                  'Assurance',
                                  'Dossier d\'examen',
                                  'Macaron',
                                ]"
                                required
                                filled
                                label="Nom de la Recette"
                                shaped
                                outlined
                                hint="Choisissez un type de recette ou créez en un"
                                persistent-hint
                              >
                              </v-combobox>
                            </v-col>
                            <v-col md="3">
                              <v-switch
                                input-value="true"
                                v-model="editAutreRecette.obligatoire"
                                filled
                                label="Obligatoire ?"
                                shaped
                                outlined
                              >
                              </v-switch>
                            </v-col>

                            <v-col md="5">
                              <v-text-field
                                v-model="editAutreRecette.periodePaiement"
                                label="Période de recouvrement"
                                hint="Du 01/01/2021 au 01/05/2021"
                                persistent-hint
                                shaped
                                outlined
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col md="3">
                              <v-text-field
                                type="number"
                                v-model="editAutreRecette.montant"
                                label="Montant de la recette"
                                shaped
                                outlined
                              ></v-text-field>
                            </v-col>
                            <v-col md="3">
                              <v-text-field
                                disabled
                                readonly
                                v-model="editAutreRecette.AnneeScolaire"
                                label="Année scolaire"
                                shaped
                                outlined
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <v-autocomplete
                                label="Réservé aux classes"
                                :items="classesReservedForAutresFrais"
                                v-model="editAutreRecette.classesSpeciales"
                                multiple
                                auto-select-first
                                chips
                                deletable-chips
                              ></v-autocomplete>
                            </v-col>
                          </v-row>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cancelEditOrUpdateRecette"
                      >
                        Annulez et fermer
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="saveEditOrUpdateRecette"
                      >
                        Enregistrez
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <!-- suppression recette -->
                <v-dialog
                  dark
                  v-model="dialogForDelete"
                  transition="fab-transition"
                  persistent
                  max-width="500px"
                >
                  <v-card>
                    <v-card-title class="headline"
                      >Voulez-vous vraiment supprimer la recette

                      <span style="color: red; margin: 3px 0px 0px 100px "
                        >{{ recetteCliquee }} ?</span
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
              <v-icon small class="mr-2" @click="editerRecette(item)">
                🏚
              </v-icon>
              <!-- <v-icon @click="deleteRecette(item)">
                
              </v-icon> -->
            </template>
          </v-data-table>
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      valid: false,
      loading: false,
      alert1: false,
      model: 0,
      Finances: ["Ecolage", "Insc-Réinsc", "Autres"],
      classeRecette: null,
      allEcolageAutresFrais: null,
      ConfigInscReinsc: null,
      contentBtn: "Enregistrez",
      anneeScolaireActuelle: null,
      recettesToShow: [],
      obligatoire: true,

      headersInscReinc: [
        { text: "Classe", value: "classe", sortable: true },

        { text: "Inscription", value: "fraisInscription" },
        {
          text: "Reinscription",
          value: "fraisReinscription",
          sortable: true,
        },
        { text: "Année scolaire", value: "AnneeScolaire", sortable: true },
        { text: "Crée le", value: "cree_le" },
      ],
      headersEcolage: [
        { text: "Identifiant", value: "identifiant", sortable: true },

        { text: "Montant", value: "montant" },
        {
          text: "Période de recouvrement",
          value: "periodePaiement",
          sortable: true,
        },
        { text: "Année scolaire", value: "AnneeScolaire", sortable: true },
        { text: "Crée le", value: "cree_le" },
      ],

      dialog: false,
      dialogForDelete: false,
      recetteCliquee: null,
      autresRecettesHeaders: [
        { text: "Identifiant", value: "identifiant", sortable: true },
        { text: "Obligatoire", value: "obligatoire" },
        {
          text: "Période de recouvrement",
          value: "periodePaiement",
          sortable: true,
        },

        { text: "Montant", value: "montant", sortable: true },
        {
          text: "Reservé pour les classes:",
          value: "classesSpeciales",
          sortable: false,
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      autresRecettes: [],

      editedIndex: -1,
      defaultItem: {
        type: null,
        obligatoire: true,
        periodePaiement: null,
        annee_scolaire: null,
        montant: null,
        classesSpeciales: [],
        onlyFor: false,
      },
      classesReservedForAutresFrais: ["Toutes les classes"],
      editAutreRecette: {
        identifiant: null,
        obligatoire: true,
        periodePaiement: null,
        AnneeScolaire: null,
        montant: null,
        classesSpeciales: [],
      },
      editRecette: {
        type: null,
        obligatoire: true,
        periodePaiement: null,
        annee_scolaire: null,
        montant: null,
        classesSpeciales: [],
        onlyFor: false,
        fraisReinscription: null,
        fraisInscription: null,
      },
      activeTypeRecette: null,
      Cycles: null,
      classes: [],
      alertAutres: false,
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nouvelle Recette"
        : "Modification Recette";
    },
  },
  beforeMount() {
    this.contentBtn = "Enregistrez";
    this.getEcolage();
    this.getConfigInscReinsc();
    if (localStorage.getItem("Config_Autres_Frais")) {
      this.autresRecettes = JSON.parse(
        localStorage.getItem("Config_Autres_Frais")
      );
    }

    let allClasses1 = JSON.parse(localStorage.getItem("Classes"));
    let allClasses2 = [];

    allClasses1.forEach((element) => {
      allClasses2.push(element.identifiant);
    });

    this.classesReservedForAutresFrais = this.classesReservedForAutresFrais.concat(
      allClasses2
    );

    console.log(
      "xxxxxxxxx " + JSON.stringify(this.classesReservedForAutresFrais)
    );
    if (typeof localStorage.getItem("année_scolaire") === "string") {
      this.anneeScolaireActuelle = localStorage.getItem("année_scolaire");
      console.log("this.annee_scolaire " + this.anneeScolaireActuelle);
    } else {
      this.anneeScolaireActuelle = JSON.parse(
        localStorage.getItem("année_scolaire")
      ).anneeScolaire;
    }

    let classes = JSON.parse(localStorage.getItem("Classes"));
    classes.forEach((classe) => {
      this.classes.push(classe);
    });
  },
  updated() {
    console.log("vrai bug 2");
    this.classeRecette = this.classes[this.model].identifiant;
    console.log("classeRecette dans updated = " + this.classeRecette);
    //this.recettesToShow = [];

    /**/
  },
  watch: {
    classeRecette(newValue, oldValue) {
      this.recettesToShow = [];
      this.editRecette = {};

      if (this.activeTypeRecette && this.activeTypeRecette !== "Autres") {
        console.log(this.activeTypeRecette + " teeeeest hééé");

        // affecte this.recetteToShow par rapport au type recette cliqué(Ecolage ou Insc-Réinsc)
        this.activeTypeRecette === "Ecolage"
          ? (this.recettesToShow = this.allEcolageAutresFrais.filter(
              (frais) => frais.classe === this.classeRecette
            ))
          : (this.recettesToShow = this.ConfigInscReinsc.filter(
              (frais) => frais.classe === this.classeRecette
            ));
        this.recettesToShow
          ? (this.contentBtn = "Enregistrez")
          : (this.contentBtn = "Enregistrez");
        console.log(
          JSON.stringify(this.recettesToShow) +
            " classeRecette " +
            this.classeRecette
        );
      }

      if (this.recettesToShow === "Autres") {
        this.recettesToShow = this.allEcolageAutresFrais.filter(
          (frais) => frais.frais !== "Frais mensuels"
        );
        console.log(
          JSON.stringify(this.recettesToShow) +
            " classeRecette " +
            this.classeRecette
        );
      }
      newValue || oldValue;
    },
    recettesToShow(newValue, oldValue) {
      newValue || oldValue;
    },
  },

  methods: {
    validate() {
      this.$refs.form.validate();
      // console.log("this.editRecette " + this.editRecette);
    },
    async getEcolage() {
      const token = "Token " + localStorage.getItem("token");

      if (localStorage.getItem("token") != null) {
        var config = {
          method: "get",
          url: "api/finances/configEcolage/",
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

            this.allEcolageAutresFrais = element;
            console.log(
              "😃😃😃 this.paiementFrais => " +
                this.allEcolageAutresFrais +
                "this.response.data = " +
                JSON.stringify(element)
            );
          })
          .catch(function(error) {
            console.log("😢😢😢" + error);
          });
      }
    },
    async getConfigInscReinsc() {
      const token = "Token " + localStorage.getItem("token");

      if (localStorage.getItem("token") != null) {
        var config = {
          method: "get",
          url: "api/finances/ConfigFraisInscReinsc/",
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

            this.ConfigInscReinsc = element;
            console.log(
              "😃😃😃 this.ConfigInscReinsc => " +
                this.ConfigInscReinsc +
                "this.response.data = " +
                JSON.stringify(element)
            );
          })
          .catch(function(error) {
            console.log("😢😢😢" + error);
          });
      }
    },

    onLogin() {
      let configFraisToSend = {
        identifiant: null,
        periodePaiement: this.editRecette.periodePaiement,
        montant: this.editRecette.montant,
        classe: null,
        obligatoire: this.obligatoire,
        AnneeScolaire: this.anneeScolaireActuelle,
      };
      let inscReinsToSend = {
        fraisInscription: null,
        fraisReinscription: null,
        periodePaiement: null,
        classe: null,
        AnneeScolaire: this.anneeScolaireActuelle,
      };

      if (
        this.activeTypeRecette === "Ecolage" ||
        this.activeTypeRecette === "Autres"
      ) {
        if (this.activeTypeRecette === "Ecolage") {
          configFraisToSend.identifiant = "Frais mensuels";
          configFraisToSend.classe = this.classeRecette;
        } else {
          configFraisToSend.identifiant = "";
        }

        console.log(
          "Recette " +
            JSON.stringify(this.editRecette) +
            "\nthis.classeRecette " +
            this.classeRecette
        );

        this.$store.dispatch("actionNewConfigEcolage", configFraisToSend);
        setTimeout(() => {
          this.allEcolageAutresFrais = JSON.parse(
            localStorage.getItem("Config_Ecolage_et_Autres")
          );
          this.recettesToShow = this.allEcolageAutresFrais.filter(
            (frais) => frais.classe === this.classeRecette
          );
        }, 2000);
      } else {
        console.log("Config Inscriptions ou reinscriptions");

        inscReinsToSend.fraisInscription = this.editRecette.fraisInscription;
        inscReinsToSend.fraisReinscription = this.editRecette.fraisReinscription;
        inscReinsToSend.classe = this.classeRecette;
        inscReinsToSend.periodePaiement = this.editRecette.periodePaiement;

        this.$store.dispatch("actionNewConfigInscReinsc", inscReinsToSend);
        setTimeout(() => {
          this.ConfigInscReinsc = JSON.parse(
            localStorage.getItem("Config inscReinsc")
          );
          this.recettesToShow = this.ConfigInscReinsc.filter(
            (frais) => frais.classe === this.classeRecette
          );
        }, 2000);
      }
    },

    recetteClicked: function(item, row) {
      row.select(true);
      console.log("item cliqué" + JSON.stringify(item));
      console.log(
        "anneesScolaire de mapGetters " +
          JSON.stringify(this.anneesScolaire) +
          "\nallYears => " +
          this.allYears
      );
      this.contentBtn = "Confirmez les modifications";
      this.$vuetify.goTo(document.body.scrollTop);
      if (this.activeTypeRecette === "Ecolage") {
        this.editRecette.cree_le = item.cree_le;
        this.obligatoire = item.obligatoire;
        this.editRecette.periodePaiement = item.periodePaiement;
        this.editRecette.annee_scolaire = item.annee_scolaire;
        this.editRecette.montant = item.montant;
      } else if (this.activeTypeRecette === "Insc-Réinsc") {
        this.editRecette.annee_scolaire = item.annee_scolaire;
        this.editRecette.periodePaiement = item.periodePaiement;
        this.editRecette.fraisInscription = item.fraisInscription;
        this.editRecette.fraisReinscription = item.fraisReinscription;
      } else {
        console.log("Autres frais à gérer");
      }

      /*editRecette: {
        type: null,
        obligatoire: false,
        periodePaiement: null,
        annee_scolaire: null,
        montant: null,
        classesSpeciales: [],
        onlyFor: false,
      },
*/
    },

    showAlert(item) {
      console.log(item);

      this.activeTypeRecette = item;
      this.recettesToShow = [];
      this.contentBtn = "Enregistrez";
      this.editRecette = {};

      if (item !== "Autres") {
        // affecte this.recetteToShow par rapport au type recette cliqué(Ecolage ou Insc-Réinsc)
        item === "Ecolage"
          ? (this.recettesToShow = this.allEcolageAutresFrais.filter(
              (frais) => frais.classe === this.classeRecette
            ))
          : (this.recettesToShow = this.ConfigInscReinsc.filter(
              (frais) => frais.classe === this.classeRecette
            ));
        console.log(
          JSON.stringify(this.recettesToShow) +
            " classeRecette " +
            this.classeRecette
        );
      }
      // permet de fermer rapidement d'abord l'alertAutres avant de la reouvrir pour simuler l'animation
      if (this.alertAutres && item === "Autres") {
        this.alertAutres = false;
      }
      if (item === "Autres") {
        this.editAutreRecette.AnneeScolaire = this.anneeScolaireActuelle;
        this.recettesToShow = this.allEcolageAutresFrais.filter(
          (frais) => frais.frais !== "Frais mensuels"
        );
        this.alert1 = false;

        setTimeout(() => {
          this.alertAutres = true;
        }, 200);
      } else {
        if (this.alert1) {
          this.alertAutres = false;
          this.alert1 = false;
          setTimeout(() => {
            this.alert1 = true;
          }, 200);
        } else {
          this.alertAutres = false;
          this.alert1 = true;
        }
      }
    },
    showDetailsRecette(type) {
      console.log("Type recette cliquée " + type);
    },
    editerRecette(item) {
      console.log("classe cliquée " + JSON.stringify(item));

      this.editedIndex = this.autresRecettes.indexOf(item);
      this.editAutreRecette = Object.assign({}, item);

      // this.Garderie.nbreSites > 1 ? this.sites : "Site unique";

      this.dialog = true;
    },

    deleteRecette(item) {
      console.log("delete " + item.identifiant);
      this.classeCliquee = item.identifiant;
      this.editedIndex = this.autresRecettes.indexOf(item);
      this.editRecette = Object.assign({}, item);
      this.dialogForDelete = true;
    },

    deleteItemConfirm() {
      this.autresRecettes.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    cancelEditOrUpdateRecette() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editRecette = Object.assign({}, this.defaultClasse);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogForDelete = false;
      this.$nextTick(() => {
        this.editRecette = Object.assign({}, this.defaultClasse);
        this.editedIndex = -1;
      });
    },
    saveEditOrUpdateRecette() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.autresRecettes[this.editedIndex],
          this.editAutreRecette
        );
        console.log("Teeessst exact");
        this.$store.dispatch(
          "actionUpdateConfigAutresFrais",
          this.editAutreRecette
        );
      } else {
        this.autresRecettes.push(this.editAutreRecette);
        console;
        /*   {
    "identifiant": "",
    "periodePaiement": "",
    "obligatoire": false,
    "montant": null,
    "AnneeScolaire": null,
    "classe": []
}*/
        let allClasses1 = JSON.parse(localStorage.getItem("Classes"));
        let allClasses2 = [];

        allClasses1.forEach((element) => {
          allClasses2.push(element.identifiant);
        });
        if (
          this.editAutreRecette.classesSpeciales[0] === "Toutes les classes"
        ) {
          this.editAutreRecette.classesSpeciales = allClasses2;
        }
        console.log(JSON.stringify(this.editAutreRecette));
        this.$store.dispatch(
          "actionNewConfigAutresFrais",
          this.editAutreRecette
        );
        setTimeout(() => {
          this.$store.dispatch("actionInitialiseFraisDeBase", {
            frais: this.editAutreRecette.identifiant,
          });
        }, 2000);
      }
      this.cancelEditOrUpdateRecette();
      console.log("Coucou");
    },
  },
};
</script>

<style></style>
