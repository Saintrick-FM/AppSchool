<template>
  <v-row>
    <v-col md="2" scrollable>
      <mini-liste-eleves @eleveChoisi="AfficheEleveVrai" />
    </v-col>
    <v-col elevation="5" md="10">
      <v-row>
        <v-card>
          <v-row>
            <v-card-title class="headline">
              <v-chip
                label
                color="primary"
                style="margin:20px 0px 0px 15px"
                text-color="white"
              >
                <v-icon left>mdi-account</v-icon>
                <h2>{{ eleve.nom }}</h2>
              </v-chip>

              <v-chip
                label
                color="primary"
                :style="
                  this.MoisNonPaye.length === 12
                    ? 'margin:-42px 0px 0px 1100px'
                    : 'margin-left: 900px'
                "
                text-color="white"
              >
                <v-icon left>mdi-book-variant</v-icon>
                <h3>{{ eleve.classe }}</h3>
              </v-chip>
            </v-card-title>
          </v-row>

          <v-row>
            <!-- rubriaue infos civiles de l'élève qui paie -->
            <v-col v-if="tailleMoisImpaye !== 12" :md="tailleMoisPaye">
              <v-card-text>
                <v-container grid-list-md>
                  <!-- raw affichant les mois payés ou impayés -->
                  <v-row>
                    <v-col>
                      <v-row justify="space-around">
                        <!-- <v-col> -->

                        <v-sheet elevation="10" class="py-4 px-1">
                          <template>
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
                                    id="chipId"
                                    v-for="(moisPaye, index) in MoisPaye"
                                    :key="moisPaye"
                                    @click="
                                      ShowDetailsMonthPayed(moisPaye, index)
                                    "
                                  >
                                    <v-icon id color="green">mdi-check</v-icon>

                                    {{ moisPaye }}
                                  </v-chip>
                                </v-chip-group>
                              </v-col>
                            </v-row>

                            <!-- Alert affichage details des mois payés -->
                            <div>
                              <v-alert
                                :value="alert2"
                                color="green"
                                dark
                                border="top"
                                icon="mdi-home"
                                transition="scale-transition"
                              >
                                <span style="font-size:15px; ">
                                  {{ detailsMonthPayed.statut }} le :</span
                                >
                                {{ detailsMonthPayed.datePaiement }}

                                <span icon="mdi-cash" style="margin-left:70px"
                                  >Montant :</span
                                >
                                {{ detailsMonthPayed.montantPayeJourJ }}/
                                {{ detailsMonthPayed.montantFrais }} FCFA
                              </v-alert>
                            </div>
                          </template>
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
            <v-col v-if="tailleMoisImpaye !== 12" :md="tailleMoisAvance">
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
                            <!-- Debut Mois Avancés -->
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
                                  @click="ShowDetailsMonthAvanced(mois)"
                                >
                                  <v-icon id color="green">mdi-check</v-icon>

                                  {{ mois }}
                                </v-chip>
                              </v-chip-group>
                            </v-col>

                            <!-- Alert affichage details des mois avancés -->
                            <div>
                              <v-alert
                                :value="alert3"
                                color="orange"
                                dark
                                border="top"
                                icon="mdi-home"
                                transition="scale-transition"
                              >
                                <span style="font-size:15px; ">
                                  {{ detailsMonthAvanced.statut }} le :</span
                                >
                                {{ detailsMonthAvanced.datePaiement }}

                                <span icon="mdi-cash">Montant :</span>
                                {{ detailsMonthAvanced.montantPayeJourJ }}/
                                {{ detailsMonthAvanced.montantFrais }} FCFA
                              </v-alert>
                            </div>
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

          <v-row style="margin: 15px 0px 0x 10px">
            <v-col md="6">
              <v-card>
                <v-chip label color="primary" text-color="white">
                  <v-icon left>mdi-check</v-icon> Frais Payés
                </v-chip>

                <v-tabs v-model="tab" background-color="primary" dark>
                  <v-tab v-for="item in allFraisPayes" :key="item.typeFrais">
                    {{ item.typeFrais }}
                  </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <v-tab-item
                    v-for="item in allFraisPayes"
                    :key="item.typeFrais"
                  >
                    <v-card flat>
                      <v-card-text>
                        <span
                          style="color:black;font-weight: bold; text-decoration: underline;"
                          >Montant Payé :</span
                        >
                        {{ item.montantFrais }} FCFA
                        <span
                          style="color:black;font-weight: bold; text-decoration: underline; margin-left:50px"
                          >Date de paiement:</span
                        >
                        {{ item.cree_le }} <br />
                        <span
                          style="color:black; font-weight: bold; text-decoration: underline;"
                          >Année académique:</span
                        >
                        {{ item.AnneeScolaire }}
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-card>
            </v-col>

            <v-col md="6">
              <v-card>
                <v-chip label color="primary" text-color="white">
                  <v-icon left>mdi-cancel</v-icon> Frais Impayés
                </v-chip>

                <v-tabs v-model="tab2" background-color="primary" dark>
                  <v-tab v-for="item2 in allFraisImpayes" :key="item2.frais">
                    {{ item2.identifiant }}
                  </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab2">
                  <v-tab-item
                    v-for="item2 in allFraisImpayes"
                    :key="item2.frais"
                  >
                    <v-card flat>
                      <v-card-text>
                        <span
                          style="color:black;font-weight: bold; text-decoration: underline;"
                          >Montant Payé :</span
                        >
                        {{ item2.montant }} FCFA
                        <span
                          style="color:black;font-weight: bold; text-decoration: underline; margin-left:50px"
                          >Date de paiement:</span
                        >
                        {{ item2.cree_le }} <br />
                        <span
                          style="color:black; font-weight: bold; text-decoration: underline;"
                          >Année académique:</span
                        >
                        2020-2021
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-card>
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
                    item-key="identifiant"
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
                      </v-toolbar>
                    </template>
                  </v-data-table>
                  <v-divider></v-divider>
                  <v-divider></v-divider>
                  <v-checkbox
                    v-model="fraisMensuels"
                    hide-details
                    class="shrink mr-2"
                  ></v-checkbox>
                  <v-autocomplete
                    :items="moisToShowWithoutPayedMonths"
                    :disabled="!fraisMensuels"
                    label="Frais mensuels"
                    clearable
                    v-model="moisToPay"
                    chips
                    multiple
                    no-data-text="Désolé pas de mois disponible"
                    >Frais mensuels</v-autocomplete
                  >

                  <v-layout align-center v-if="showInscription === 'true'">
                    <v-checkbox
                      v-model="inscription"
                      hide-details
                      class="shrink mr-2"
                    ></v-checkbox>

                    <v-text-field
                      label="Inscription"
                      :disabled="!inscription"
                      :value="eleve.classe"
                      append-icon=" mdi-playlist-check"
                      readonly
                      filled
                      outlined
                    ></v-text-field>
                  </v-layout>

                  <v-layout align-center v-if="showInscription === 'false'">
                    <v-checkbox
                      v-model="reinscription"
                      hide-details
                      class="shrink mr-2"
                    ></v-checkbox>
                    <v-text-field
                      label="Réinscription"
                      :disabled="!reinscription"
                      :value="eleve.classe"
                      append-icon=" mdi-playlist-check"
                      readonly
                      filled
                      outlined
                    ></v-text-field>
                  </v-layout>

                  <div class="text-center pt-2">
                    <v-btn @click.prevent="proceedToPaiement">Suivant</v-btn>
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
                        <v-col>
                          <v-card-title v-if="AffichePaiementMois">
                            <h3>Mois à payer :</h3>
                            <v-chip
                              style="margin:0px 180px 0px 10px "
                              color="primary"
                              text-color="white"
                              width="100px"
                            >
                              {{ moisToPay }}
                            </v-chip>
                            <h3 style="margin-left:170px">Mois avancés :</h3>
                            <v-chip
                              color="red"
                              style="margin:0px 0px 0px 10px "
                              text-color="white"
                            >
                              {{ monthsAlreadySolve.toString() }}
                              <span style="margin-left:15px"
                                >||
                                {{ priceMonthsAlreadySolve.toString() }}
                                FCFA</span
                              >
                            </v-chip>
                          </v-card-title>
                          <!-- Ici affichage en cas de paiement frais autres que les frais mensuels -->

                          <v-row>
                            <v-col md="4">
                              <v-text-field
                                align-content-center
                                :value="eleve.nom"
                                outlined
                                filled
                                readonly
                                append-icon="mdi-book-variant"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col md="3">
                              <v-card-title
                                v-if="alertInscriptionReinscription"
                              >
                                <v-chip
                                  color="primary"
                                  style="margin-left:15px"
                                  text-color="white"
                                >
                                  Paiement insc : {{ fraisApayer }}
                                </v-chip>
                              </v-card-title>

                              <v-card-title v-if="AffichePaiementAutresFrais">
                                <v-chip
                                  color="primary"
                                  style="margin-left:15px"
                                  text-color="white"
                                >
                                  Paiement {{ fraisApayer }}
                                </v-chip>
                              </v-card-title>
                            </v-col>
                            <v-col md="5">
                              <h3 style="margin-left:100px">
                                Net à payer :
                                <v-chip
                                  color="green"
                                  text-color="white"
                                  width="300px"
                                  style="margin-left:10px"
                                  >{{ scolariteTotal }} FCFA</v-chip
                                >
                              </h3>
                              <v-chip
                                color="green"
                                style="margin:0px 10px 0px 100px"
                                text-color="white"
                                v-if="AffichePaiementMois"
                              >
                                Non payés - Reste mois Avancés
                              </v-chip>
                            </v-col>
                          </v-row>
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
                          type="number"
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
                          Annuler xxx
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
                      {{ messageErreurDuplicateTypeFrais_A }}
                      <span style="margin:75px 10px 0px 350px">
                        {{ messageErreurDuplicateTypeFrais_B }}</span
                      >
                    </h2>

                    <v-btn
                      color="pink darken-1"
                      outlined
                      width="30px"
                      style=" margin-left:1020px"
                      small
                      persistent
                      persistent-hint
                      @click="annulation"
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      tab: null,
      tab2: null,
      singleSelect: true,
      alert: false,
      alert2: false,
      alert3: false,
      alertErreurDuplicateTypeFrais: false,
      messageErreurDuplicateTypeFrais_A: "",
      messageErreurDuplicateTypeFrais_B: "",
      AffichePaiementAutresFrais: false,
      alertInscriptionReinscription: false,
      AffichePaiementMois: false,
      fraisMensuels: null,
      fraisChoisi: [],
      anneeActuelle: null,
      scolariteTotal: null,
      allFraisInscReinsc: null,
      paiement_Inscription_Reinscription: ["Inscription", "Réinscription"],
      inscription: null,
      reinscription: null,
      shawInscription: true,
      showInscription: "",
      choiceBetweenInscReinsc: null,
      prixInscription: null,
      prixReinscription: null,
      montantFraisMensuel: undefined,
      fraisApayer: null,
      prixFraisApayer: undefined,
      montantApayer: undefined,
      IdClasses: null,
      classeInscription: "",
      fraisReinscription: "",

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
        { text: "Frais communs à tous", value: "identifiant", sortable: true },
        { text: "Montant Frais", value: "montant", sortable: true },
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
      allFraisPayes: [],
      detailsMonthPayed: {
        datePaiement: "",
        montantPayeJourJ: null,
        montantPayeAuparavant: null,
        montantFrais: null,
        statut: "",
      },
      detailsMonthAvanced: {
        datePaiement: "",
        montantPayeJourJ: null,
        montantPayeAuparavant: null,
        montantFrais: null,
        statut: "",
      },
      allFraisImpayes: [],
      autresFraisPayesSaufInscReinsc: null,

      resultat: null,
      icon: "",
      optionDeTrie: "",
      shawAllMonths: undefined,
      shawPayedMonths: false,
      shawNonPayedMonths: undefined,
      shawAvancedMonths: undefined,
      MoisPayedToShow: undefined,
      monthsAlreadySolve: [],
      priceMonthsAlreadySolve: [],
      moisToShowWithoutPayedMonths: [],
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
    ...mapGetters(["alleleves"]),
    formTitle() {
      return this.editedIndex === -1 ? "Nouveau frais" : "Modification frais";
    },

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
    advancedMonthStyle() {
      let taille = this.moisAvance.length;
      return 4 <= taille <= 7 ? "margin:0px 5px 0px 175px" : "margin-left:15px";
    },
    monthToPayStyle() {
      let taille = this.moisToPay.length;
      return 5 <= taille <= 9
        ? "margin:0px 150px 0px 10px"
        : "margin:0px 150px 0px 5px";
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
        //   if (this.fraisChoisi[0].montantRestant) {
        return this.fraisChoisi[0].montantRestant;
        /*  } else {
          return 0;
        }*/
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
    allFraisPayes(newValue, oldValue) {
      newValue || oldValue;
    },
    allFraisImpayes(newValue, oldValue) {
      newValue || oldValue;
    },
    showInscription(newValue, oldValue) {
      newValue || oldValue;
    },
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.getFrais();
    this.getClasses();

    if (typeof localStorage.getItem("année_scolaire") === "string") {
      this.anneeActuelle = localStorage.getItem("année_scolaire");
      console.log("this.annee_scolaire " + this.anneeActuelle);
    } else {
      this.anneeActuelle = JSON.parse(
        localStorage.getItem("année_scolaire")
      ).anneeScolaire;
    }

    // this.getInscritsReinscritAnneeActuelle();
  },

  methods: {
    ShowDetailsMonthPayed(moisPaye, index) {
      console.log(index);
      if (!this.alert2) {
        let FraisPayesWithDetails = JSON.parse(
          localStorage.getItem("Frais_Payés_With_Details")
        );
        let fraisDetails = FraisPayesWithDetails.find(
          (frais) => frais.mois === moisPaye
        );

        console.log("**********" + moisPaye);
        this.alert2 = true;
        this.detailsMonthPayed.datePaiement = fraisDetails.cree_le
          .toString()
          .slice(0, 16)
          .replace("T", " à ");
        this.detailsMonthPayed.montantPayeJourJ = fraisDetails.montantApayer;
        this.detailsMonthPayed.montantPayeAuparavant =
          fraisDetails.montantDejaPaye;
        this.detailsMonthPayed.statut = fraisDetails.statut;
        this.detailsMonthPayed.montantFrais =
          Number(fraisDetails.montantFrais) * moisPaye.split(",").length;
      } else {
        console.log("bouton clické au lieu du close");
        this.alert2 = false;
        this.detailsMonthPayed.montantFrais = "";
        this.detailsMonthPayed.montantPayeJourJ = null;
        this.detailsMonthPayed.montantPayeAuparavant = null;
        this.detailsMonthPayed.datePaiement = "";
        this.detailsMonthPayed.statut = "";
      }
    },
    ShowDetailsMonthAvanced(mois) {
      if (!this.alert3) {
        let FraisAvancesWithDetails = JSON.parse(
          localStorage.getItem("Frais_Avancés_With_Details")
        );
        let fraisDetails = FraisAvancesWithDetails.find(
          (frais) => frais.mois === mois
        );

        console.log("**********" + mois);
        this.alert3 = true;
        this.detailsMonthAvanced.datePaiement = fraisDetails.cree_le
          .toString()
          .slice(0, 16)
          .replace("T", " à ");
        this.detailsMonthAvanced.montantPayeJourJ =
          fraisDetails.montantDejaPaye;

        this.detailsMonthAvanced.statut = fraisDetails.statut;
        this.detailsMonthAvanced.montantFrais =
          Number(fraisDetails.montantFrais) * mois.split(",").length;
      } else {
        this.alert3 = false;
        this.detailsMonthAvanced.datePaiement = "";
        this.detailsMonthAvanced.montantPayeJourJ = null;
        this.detailsMonthAvanced.montantPayeAuparavant = null;
        this.detailsMonthAvanced.montantFrais = "";
        this.detailsMonthAvanced.statut = "";
      }
    },

    getClasses() {
      this.classes = localStorage.getItem("Classes").split(",");
      this.IdClasses = localStorage.getItem("Id_classes").split(",");
    },

    async getFrais() {
      const token = "Token " + localStorage.getItem("token");

      if (localStorage.getItem("token") != null) {
        var config = {
          method: "get",
          url: "api/finances/configAutresFrais/",
          headers: {
            Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
          },
        };
        await axios(config)
          .then((response) => {
            const result = response.data;

            localStorage.setItem("Frais", JSON.stringify(result));

            let element = [];

            for (const key in result) {
              element.push(result[key]);
            }
            element.forEach((obj) => {
              obj.montantDejaPaye = 0;
              obj.montantRestant = 0;
              // obj.cree_le.toString().slice(0, 16);
            });
            this.paiementFrais = element;
            console.log(
              "😃😃😃 this.paiementFrais => " +
                JSON.stringify(element) +
                "this.response.data = " +
                JSON.stringify(element)
            );
          })
          .catch(function(error) {
            console.log("😢😢😢" + error);
          });
      }
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

    trieInscrits(value) {
      return value.typeFrais === "Frais Inscriptions";
    },
    trieReinscrits(value) {
      return value.typeFrais === "Frais Reinscriptions";
    },
    trieAutresFraisPayes(x) {
      return x.typeFrais !== "Frais mensuel";
    },
    trieAutresFraisImpaye(x, thisResult) {
      let copiePaiementFrais = this.paiementFrais.map((item) => item);
      let typesFrais = this.paiementFrais.map((item) => item.frais);

      if (thisResult) {
        thisResult.splice(typesFrais.indexOf(x), 1);
        console.log(typesFrais + "\n" + JSON.stringify(copiePaiementFrais));
        return thisResult;
      } else {
        copiePaiementFrais.splice(typesFrais.indexOf(x), 1);
        console.log(typesFrais + "\n" + JSON.stringify(copiePaiementFrais));

        return copiePaiementFrais;
      }
    },
    AfficheEleveVrai() {
      this.allFraisPayes = [];
      this.allFraisImpayes = [];
      this.resultat = null;

      this.autresFraisPayesSaufInscReinsc = null;
      // this.autresFraisPayesSaufInscReinsc = [];
      this.MoisPaye = [];
      this.MoisNonPaye = [];
      this.moisAvance = [];
      this.moisToShowWithoutPayedMonths = [];

      let eleveChoisi = JSON.parse(localStorage.getItem("eleveChoisi"));
      let allElevesPayedInscReinsc = JSON.parse(
        localStorage.getItem("all_Eleves_Payed_InscReinsc")
      );
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
      this.showInscription = "true";
      this.allFraisInscReinsc = JSON.parse(
        localStorage.getItem("Config inscReinsc")
      );

      let inscritOuReinscrit = allElevesPayedInscReinsc.find(
        (x) => x.eleve === eleveChoisi.eleveNumber
      );
      //  console.log("test important " + inscritOuReinscrit.typeFrais);
      // si l'élève choisi est déja inscrit
      if (inscritOuReinscrit) {
        if (inscritOuReinscrit.typeFrais === "Inscriptions") {
          this.showInscription = "false";
          console.log("Considéré comme inscrit preuve => ");
        }
      }
      // si l'élève cliqué a déja payé sa reinscription
      if (inscritOuReinscrit) {
        if (inscritOuReinscrit.typeFrais === "Reinscriptions") {
          console.log("Considéré comme reinscrit preuve");
          this.showInscription = "true";
        }
      }
      if (inscritOuReinscrit) {
        this.prixReinscription = this.allFraisInscReinsc.find(
          (x) => x.classe == eleveChoisi.classe
        ).fraisReinscription;

        this.prixInscription = this.allFraisInscReinsc.find(
          (x) => x.classe === eleveChoisi.classe
        ).fraisInscription;

        console.log("test allFraisPayes " + JSON.stringify(this.allFraisPayes));

        let AllFraisPayedByEleve = JSON.parse(
          localStorage.getItem("AllFraisPayedByEleve")
        );
        // assignation frais communs payés et non payés s'il y a au moins un frais payé si non allFraisImpayés= Tous les frais de la BD
        if (AllFraisPayedByEleve) {
          this.autresFraisPayesSaufInscReinsc = AllFraisPayedByEleve.filter(
            this.trieAutresFraisPayes
          );
          this.allFraisPayes = this.allFraisPayes.concat(
            this.autresFraisPayesSaufInscReinsc
          );
          console.log("test 33 " + this.allFraisPayes);
          this.autresFraisPayesSaufInscReinsc.forEach((frais) => {
            if (!this.resultat) {
              console.log("1er tour");
              this.resultat = this.trieAutresFraisImpaye(frais.typeFrais);
            } else {
              this.resultat = this.trieAutresFraisImpaye(
                frais.typeFrais,
                this.resultat
              );
            }
          });

          this.allFraisImpayes = this.resultat;
          console.log(
            "allFraisImpayes ***************" +
              JSON.stringify(this.allFraisImpayes) +
              "\nallFraisPayes => " +
              JSON.stringify(this.allFraisPayes)
          );
        } else {
          this.allFraisPayes.push(inscritOuReinscrit);

          this.paiementFrais = JSON.parse(localStorage.getItem("Frais"));
          this.allFraisImpayes = this.paiementFrais;
          this.moisToShowWithoutPayedMonths = this.mois;
          this.MoisNonPaye = this.mois;
          this.MoisPaye = [];
          this.moisAvance = [];
          this.autresFraisPayesSaufInscReinsc = [];

          this.allFraisImpayes = this.paiementFrais;
          console.log(" dooomage on est dans le else");
        }
      } else {
        console.log("fin de test");
      }
      this.InitialiseFraisPayeImpaye(eleveChoisi);
    },

    proceedToPaiement: function() {
      console.log("naza");
      console.log(" this.fraisChoisi.length " + this.fraisChoisi.length);
      console.log("this.moisToPay.length " + this.moisToPay.length);
      console.log(
        "this.choiceBetweenInscReinsc.length " + this.choiceBetweenInscReinsc
      );
      console.log("this.fraisReinscription.length  " + this.fraisReinscription);
      console.log(
        "this.prixInscription " +
          this.prixInscription +
          "\n this.prixReinscription " +
          this.prixReinscription
      );
      console.log(
        "this.scolariteTotal " +
          this.scolariteTotal +
          " this.inscription " +
          this.inscription +
          " this.reinscription " +
          this.reinscription
      );

      this.$vuetify.goTo(document.body.scrollHeight); // ici c'est pour scroller directement vers le bas

      if (
        this.moisToPay.length === 0 &&
        this.fraisChoisi.length === 0 &&
        this.fraisReinscription.length === 0 &&
        (this.inscription === "null" || this.reinscription === "null")
      ) {
        this.AssignMessageErreur("No Choice");
      }

      if (this.fraisChoisi.length > 0 && this.moisToPay.length > 0) {
        this.AssignMessageErreur();
      }

      if (
        this.moisToPay.length > 0 &&
        (this.inscription || this.reinscription)
      ) {
        this.AssignMessageErreur();
      }

      if (
        this.fraisChoisi.length > 0 &&
        (this.inscription || this.reinscription)
      ) {
        this.AssignMessageErreur();
      }

      // gestion de la paie des frais mensuels en dehors des autres types de frais ,inscriptions et reinscriptions
      if (
        this.alertErreurDuplicateTypeFrais === false &&
        this.moisToPay.length > 0 &&
        this.fraisChoisi.length == 0
      ) {
        // let MoisPaye = localStorage.getItem("MoisPaye");
        let moisAvance = localStorage.getItem("moisAvance");
        let AllFraisPayedByEleve = JSON.parse(
          localStorage.getItem("AllFraisPayedByEleve")
        );

        this.alert = true;
        this.AffichePaiementMois = true;
        console.log(
          "Frais mensuels sélectionnés" + JSON.stringify(this.moisToPay)
        );
        this.moisToPay.slice(0);
        let fraisAvance = [];
        //let fraisPayed= []
        if (moisAvance) {
          moisAvance.split(",").forEach((frais) => {
            if (this.moisToPay.indexOf(frais) != -1) {
              this.monthsAlreadySolve.push(frais);
              fraisAvance.push(
                AllFraisPayedByEleve.find((value) => value.statut === "avancé")
                  .montantRestant
              );
            }
          });
        }
        this.priceMonthsAlreadySolve = fraisAvance;

        if (fraisAvance.length > 1) {
          this.scolariteTotal =
            this.moisToPay.length *
              Number(this.montantFraisMensuel.slice(0, -1)) -
            this.priceMonthsAlreadySolve.reduce(
              (total, value) => Number(total) + Number(value)
            );
        } else if (fraisAvance.length == 1) {
          this.scolariteTotal =
            this.moisToPay.length *
              Number(this.montantFraisMensuel.slice(0, -1)) -
            Number(this.priceMonthsAlreadySolve[0]);
        } else {
          this.scolariteTotal =
            Number(this.montantFraisMensuel.slice(0, -1)) *
            this.moisToPay.length;
        }

        this.montantDejaPaye = this.montantApayer;
        this.montantRestant = this.scolariteTotal - this.montantDejaPaye;

        // Autres Frais à payer
      }
      // gestion de la paie des autres types de frais en dehors des frais mensuels, inscriptions et reinscriptions

      if (
        this.alertErreurDuplicateTypeFrais === false &&
        this.fraisChoisi.length > 0 &&
        this.moisToPay.length == 0
      ) {
        this.alert = true;
        console.log(
          "Autre Frais sélectionné" + JSON.stringify(this.fraisChoisi)
        );
        this.AffichePaiementAutresFrais = true;
        let frais = this.fraisChoisi[0].identifiant;
        // let montantDejaPaye = this.fraisChoisi[0].montantDejaPaye;
        // let montantRestant = this.fraisChoisi[0].montantRestant;
        // let statut = this.fraisChoisi[0].statut;
        console.log("frais sélectionné => " + frais);
        this.fraisApayer = frais;
        this.scolariteTotal = this.fraisChoisi[0].montant;
        this.prixFraisApayer = this.fraisChoisi[0].montant;

        this.montantDejaPaye = this.montantApayer;
        this.montantRestant = this.scolariteTotal - this.montantDejaPaye;

        //this.statut = statut;
      }
      // gestion des frais d'inscriptions
      if (this.alertErreurDuplicateTypeFrais === false && this.inscription) {
        console.log("alloooo ! " + this.allFraisInscReinsc);
        this.alert = true;

        console.log("alloooo ! prixInscription " + this.prixInscription);
        this.fraisApayer = "Inscriptions";
        this.scolariteTotal = this.prixInscription;
        this.alertInscriptionReinscription = true;
      }

      // gestion des frais de reinscriptions
      if (this.alertErreurDuplicateTypeFrais === false && this.reinscription) {
        console.log("alloooo ! " + this.allFraisInscReinsc);
        this.alert = true;

        console.log("alloooo ! prixReinscription " + this.prixReinscription);
        this.fraisApayer = "Réinscriptions";
        this.scolariteTotal = this.prixReinscription;
        this.alertInscriptionReinscription = true;
      }
    },

    AssignMessageErreur(message) {
      if (message === "No Choice") {
        this.alertErreurDuplicateTypeFrais = true;
        this.messageErreurDuplicateTypeFrais_A =
          "Désolé vous devez d'abord choisir un frais parmi les frais au dessus et ensuite";
        this.messageErreurDuplicateTypeFrais_B =
          "Cliquer sur le bouton (Suivant)";
      } else if (message === "noAvanceAllowed") {
        this.alertErreurDuplicateTypeFrais = true;
        this.messageErreurDuplicateTypeFrais_A =
          "Désolé le paiement ne peut se faire car vous devez exactament payé la somme du frais";
        this.messageErreurDuplicateTypeFrais_B =
          "Avances autorisées qu'avec les Frais mensuels ";
      } else {
        this.messageErreurDuplicateTypeFrais_A =
          " Désolé vous ne pouvez pas procéder en même temps au paiement de plusieurs types de frais";
        this.messageErreurDuplicateTypeFrais_B =
          "Choisissez-en un et cliquez sur le bouton suivant";
        this.alertErreurDuplicateTypeFrais = true;
      }
    },
    afficheAlert() {
      console.log(this.fraisChoisi.length);
    },
    InitialiseFraisPayeImpaye(eleveChoisi) {
      const token = "Token " + localStorage.getItem("token");
      let allMonthsPayed = [];
      let FraisAvancesWithDetails = [];
      let FraisPayesWithDetails = [];

      /* let allElevesPayedInscReinsc = JSON.parse(
        localStorage.getItem("all_Eleves_Payed_InscReinsc")
      );*/
      console.log("⏰ ⏰ ⏰ eleveChoisi " + JSON.stringify(eleveChoisi));

      if (token) {
        axios
          .get(
            `api/finances/paiementEveryFrais/?annee_scolaire=${this.anneeActuelle}&id=${eleveChoisi.eleveNumber}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            // Ajouter du commit passé
            const result = response.data;
            // localStorage.setItem("Frais", result);
            let AllFraisPayedByEleve = [];
            for (const key in result) {
              AllFraisPayedByEleve.push(result[key]);
            }

            let AllFraisPayedbyEleve = JSON.stringify(result);

            // Ajouter du commit passé
            console.log(
              "😃😃😃 tous les frais payés de l'élève => " +
                AllFraisPayedbyEleve +
                " " +
                JSON.stringify(response.data)
            );
            localStorage.setItem(
              "AllFraisPayedByEleve",
              JSON.stringify(response.data)
            );
            console.log("ici là");
            //commit('InititialiseElevesPayed', AllFraisPayedByEleve)
            let fraisPayés = response.data;
            //s'il y'a une avance dans au moins un des paiements de l'élève
            console.log("Ah c'est compliqué ");
            fraisPayés.forEach((frais) => {
              if (
                frais.typeFrais === "Frais mensuels" &&
                frais.statut === "avancé"
              ) {
                allMonthsPayed.push(
                  frais.mois
                    .split(",")
                    .slice(0, -1)
                    .toString()
                );
                FraisAvancesWithDetails.push(frais);

                // this.moisAvance.push(frais.mois.split(",").pop());
                this.moisAvance.push(frais.mois);
                console.log("attention");

                //si c'est un mois et que cest réglé
              } else if (
                frais.typeFrais === "Frais mensuel" &&
                frais.statut !== "avancé"
              ) {
                allMonthsPayed.push(frais.mois.split(",").toString());
                FraisPayesWithDetails.push(frais);
              } else {
                console.log("else malheureusement");
              }
            });
            if (allMonthsPayed.length > 0 && this.moisAvance) {
              console.log("non non non");
              this.MoisPaye = allMonthsPayed.filter(this.trieMoisVides);
              this.MoisNonPaye = this.trieMoisImpaye("moisPayeETavance");
              localStorage.setItem("MoisPaye", this.MoisPaye);
              localStorage.setItem("MoisNonPaye", this.MoisNonPaye);
            }
            if (allMonthsPayed.length > 0 && !this.moisAvance) {
              // ce que j'affecte aux moisPaye vient du resultat de trie opéré par la methode //filter qui enlève les tableaux vides de MoisPaye car c'est un tableau de tableaux
              this.MoisPaye = allMonthsPayed.filter(this.trieMoisVides);
              this.MoisNonPaye = this.trieMoisImpaye("moisPaye");
              console.log("non non non 2 ");
              localStorage.setItem("MoisPaye", JSON.stringify(this.MoisPaye));
              localStorage.setItem(
                "MoisNonPaye",
                JSON.stringiify(this.MoisNonPaye)
              );
            }
            console.log("Ah c'est compliqué 2");
            localStorage.setItem(
              "Frais_Avancés_With_Details",
              JSON.stringify(FraisAvancesWithDetails)
            );
            localStorage.setItem(
              "Frais_Payés_With_Details",
              JSON.stringify(FraisPayesWithDetails)
            );
            localStorage.setItem("moisAvance", JSON.stringify(this.moisAvance));
          })
          .catch(function(error) {
            console.log("😢😢😢" + error);
          });

        this.shawPayedMonths = true;
        this.paiementFrais = this.allFraisImpayes.map((item) => item);
      }

      //this.shawPayedMonths = true;
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

      this.MoisNonPayed = [];

      //this.moisAvance=[];
      if (statut === "moisPayeETavance") {
        console.log("statut trieMoisImpayes === moisPayeETavance !");
        this.moisAvance.forEach((mois) => {
          monthsNonPayed.splice(monthsNonPayed.indexOf(mois), 1);
        });
      }
      this.MoisPaye.toString()
        .split(",")
        .forEach((mois) => {
          monthsNonPayed.splice(monthsNonPayed.indexOf(mois), 1);
        });
      this.moisToShowWithoutPayedMonths = monthsNonPayed.concat(
        this.moisAvance
      );
      console.log(
        "moisAvance =>> " +
          this.moisAvance +
          "MOIS NON PAYES == " +
          monthsNonPayed
      );
      return monthsNonPayed.toString().split(",");
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    annulation() {
      this.alertErreurDuplicateTypeFrais = false;
      this.alert = false;
      this.alertInscriptionReinscription = false;
      //  this.prixInscription = null;
      this.inscription = null;
      this.prixReinscription = null;
      this.reinscription = null;
      // this.classeInscription = "";
      this.choiceBetweenInscReinsc = null;
      this.fraisReinscription = "";
      this.fraisApayer = null;
      this.fraisChoisi = [];
      this.moisToPay = [];
      this.monthsAlreadySolve = [];
      this.priceMonthsAlreadySolve = [];
      this.montantDejaPaye = undefined;
      this.montantRestant = undefined;
      this.AffichePaiementAutresFrais = false;
      this.AffichePaiementMois = false;
      // this.autresFraisPayesSaufInscReinsc=[];
      console.log("annulation fini");
    },

    SavePayedFrais() {
      console.log(
        "fraisChoisi.length = " +
          this.fraisChoisi.length +
          "\nmoisToPay.lenght = " +
          this.moisToPay +
          "\nthis.montantApayer = " +
          this.montantApayer +
          " this.scolariteTotal = "
      );
      let eleveChoisi = JSON.parse(localStorage.getItem("eleveChoisi"));
      let inscReinscPaiement = {
        eleve: eleveChoisi.eleveNumber,
        classe: eleveChoisi.classe,
        typeFrais: this.fraisApayer,
        montantFrais: Number(this.scolariteTotal),
        AnneeScolaire: this.anneeActuelle,
      };
      let payedFrais = {
        eleve: eleveChoisi.eleveNumber,
        classe: eleveChoisi.classe,
        montantApayer: this.montantApayer,
        montantDejaPaye: this.montantDejaPaye,
        montantRestant: this.montantRestant,
        AnneeScolaire: this.anneeActuelle,
      };
      //Cas où c'est une inscription ou réinscription à payer
      if (this.alertErreurDuplicateTypeFrais === false && this.inscription) {
        if (this.montantApayer == this.scolariteTotal) {
          let allInscReinscPaiement = [inscReinscPaiement];
          this.$store.dispatch("actionPaiementInscReinsc", inscReinscPaiement);
          localStorage.setItem(
            "Définitivement Inscrits",
            JSON.stringify(allInscReinscPaiement)
          );
          setTimeout(() => {
            this.InitialiseFraisPayeImpaye(eleveChoisi.eleveNumber);
            this.annulation();
          }, 2000);
        }
      } else if (
        this.alertErreurDuplicateTypeFrais === false &&
        this.reinscription
      ) {
        console.log("pas encore géré");
      } else {
        if (this.priceMonthsAlreadySolve.length > 0) {
          var totalMonthsToSolve = this.priceMonthsAlreadySolve.reduce(
            (total, value) => Number(total) + Number(value)
          );
        }

        //Cas où c'est un autre frais à payer
        console.log(
          "ultra test " +
            this.autresFraisPayesSaufInscReinsc.indexOf(
              this.fraisChoisi[0].identifiant
            ) +
            " " +
            typeof this.autresFraisPayesSaufInscReinsc.indexOf(
              this.fraisChoisi[0].identifiant
            )
        );
        // Si c'est un paiement frais communs à tous et que le montant à payer est  égale au montant du frais

        if (
          this.fraisChoisi.length > 0 &&
          Number(this.montantApayer) === Number(this.fraisChoisi[0].montant)
        ) {
          payedFrais["typeFrais"] = this.fraisChoisi[0].identifiant;
          console.log(
            "Frais communs à tous => " +
              this.fraisChoisi[0].identifiant +
              " payé"
          );
          payedFrais["statut"] = "payé";
          payedFrais["montantFrais"] = this.fraisChoisi[0].montant;
          payedFrais["montantRestant"] = 0;
          console.log(
            "test final pour savoir si cest ici qu'il gère le " +
              JSON.stringify(payedFrais)
          );

          this.$store.dispatch("actionPayedFrais", payedFrais);
        }
        //Cas où c'est un frais mensuel à payer
        if (this.AffichePaiementMois) {
          if (this.moisToPay.length > 0) {
            payedFrais["typeFrais"] = "Frais mensuel";
            // Si dans la liste des mois a payer il y'a un mois avancé

            if (this.monthsAlreadySolve.length > 0) {
              if (
                this.montantApayer ==
                Number(this.montantFraisMensuel.slice(0, -1)) *
                  Number(this.moisToPay.length) -
                  totalMonthsToSolve
              ) {
                payedFrais["mois"] = this.moisToPay.toString();
                payedFrais["montantApayer"] = this.montantApayer;
                payedFrais["montantRestant"] = this.montantRestant;
                payedFrais["statut"] = "Avance solvée";
                payedFrais["moisAsolver"] = this.monthsAlreadySolve.toString();
                payedFrais["montantFrais"] = this.montantFraisMensuel.slice(
                  0,
                  -1
                );
              }
              // S'il n'y a pas de mois avancés dans la liste et règlement total
            } else if (this.monthsAlreadySolve.length == 0) {
              console.log("désolé!!!" + this.montantApayer);
              if (
                this.montantApayer ==
                Number(this.montantFraisMensuel.slice(0, -1)) *
                  Number(this.moisToPay.length)
              ) {
                console.log(
                  "Frais mensuels " + this.moisToPay.toString() + " payé"
                );
                payedFrais["statut"] = "payé";
                payedFrais["mois"] = this.moisToPay.toString();
                payedFrais["moisAsolver"] = "null";
                payedFrais["montantFrais"] =
                  Number(this.montantFraisMensuel.slice(0, -1)) *
                  this.moisToPay.length;
              }
            } else {
              console.log("En tout cas tu es têtu");
            }

            // S'il n'y a pas de mois avancés dans la liste et paiement avance
            if (
              this.monthsAlreadySolve.length == 0 &&
              Number(this.montantFraisMensuel.slice(0, -1)) <
                this.montantApayer <
                Number(this.montantFraisMensuel.slice(0, -1)) *
                  this.moisToPay.length
            ) {
              if (this.moisToPay.length > 1) {
                localStorage.setItem(
                  "MoisAvanceToStoreInDB",
                  this.moisToPay.splice(-1, 1)
                );
              }
              if (this.moisToPay.length === 1) {
                localStorage.setItem(
                  "MoisAvanceToStoreInDB",
                  this.moisToPay.toString()
                );
              }
              payedFrais["statut"] = "payé";
              payedFrais["mois"] = this.moisToPay.toString();
              payedFrais["montantFrais"] = this.montantFraisMensuel.slice(
                0,
                -1
              );
              payedFrais["montantApayer"] =
                Number(this.montantFraisMensuel.slice(0, -1)) *
                this.moisToPay.length;
              payedFrais["montantDejaPaye"] =
                Number(this.montantFraisMensuel.slice(0, -1)) *
                this.moisToPay.length;
              payedFrais["montantRestant"] = 0;

              console.log(
                "Frais mensuels " + this.moisToPay.toString() + " payé"
              );
            }
          }
          console.log("test 9");
          if (this.monthsAlreadySolve.length > 0) {
            let AllFraisPayedByEleve = JSON.parse(
              localStorage.getItem("AllFraisPayedByEleve")
            );
            console.log("test 9 second");
            // Je recherche l'id du frais qui possède parmi ses frais le/les mois avancés sélectionnés
            let payedFraisToUpdate = AllFraisPayedByEleve.find((x) =>
              x.mois.indexOf(this.monthsAlreadySolve != -1)
            );
            console.log("test 9 prime");
            console.log(
              "le frais à solver ===> " +
                JSON.stringify(payedFraisToUpdate) +
                "le frais solvé ===> " +
                JSON.stringify(payedFrais)
            );
            this.$store.dispatch("actionUpdatePayedFrais", [
              payedFraisToUpdate.id,
              payedFrais,
            ]);
          } else {
            console.log("test attent attend");
            let payeAvanceMois = {
              eleve: payedFrais.eleve,
              classe: payedFrais.classe,
              montantApayer: 0.0,
              montantRestant: this.montantRestant,
              montantDejaPaye:
                Number(this.montantFraisMensuel.slice(0, -1)) -
                this.montantRestant,
              typeFrais: payedFrais.typeFrais,
              statut: "avancé",
              mois: localStorage.getItem("MoisAvanceToStoreInDB"),
              montantFrais: Number(this.montantFraisMensuel.slice(0, -1)),
            };

            console.log("test 10 test");
            if (
              localStorage.getItem("MoisAvanceToStoreInDB") != null &&
              this.moisToPay.length > 1
            ) {
              console.log(
                "payeAvanceMois === " +
                  JSON.stringify(payeAvanceMois) +
                  "\npayedFrais=== " +
                  JSON.stringify(payedFrais)
              );
              this.$store.dispatch("actionPayedFrais", [
                payedFrais,
                payeAvanceMois,
              ]);
            } else if (
              localStorage.getItem("MoisAvanceToStoreInDB") != null &&
              this.moisToPay.length === 1
            ) {
              console.log("payeAvanceMois seul");
              this.$store.dispatch("actionPayedFrais", payeAvanceMois);
            } else {
              this.$store.dispatch("actionPayedFrais", payedFrais);
            }
          }
        }

        // Si c'est un paiement frais communs à tous et que le montant à payer n'est pas égale au montant du frais
        if (
          this.fraisChoisi.length > 0 &&
          Number(this.montantApayer) !== Number(this.scolariteTotal)
        ) {
          this.AssignMessageErreur("noAvanceAllowed");
        }
        // Si c'est un paiement frais communs à tous et que le frais est déjà payé
        console.log("test 10");
        this.alert = false;
        this.fraisApayer = null;
        this.fraisChoisi = [];
        this.moisToPay = [];
        this.priceMonthsAlreadySolve = [];
        this.monthsAlreadySolve = [];
        this.montantDejaPaye = undefined;
        this.montantRestant = undefined;
        this.scolariteTotal = null;
        this.AffichePaiementAutresFrais = false;
        this.AffichePaiementMois = false;
        this.InitialiseFraisPayeImpaye(eleveChoisi);
      }
    },
  },
};
</script>

<style>
#nomEleve {
  margin: 0px 360px 0px 360px;
}
</style>
