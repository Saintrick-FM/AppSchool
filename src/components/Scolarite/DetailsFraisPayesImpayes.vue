<template>
  <div>
    <v-row>
      <v-card-title class="headline">
        <v-chip
          label
          color="primary"
          style="margin:20px 0px 0px 15px"
          text-color="white"
        >
          <v-icon left>mdi-account</v-icon>
          <h2>
            {{ eleveClique ? eleveClique.nom : "Veuillez choisir un élève" }}
          </h2>
        </v-chip>

        <v-chip
          label
          color="primary"
          :style="
            this.eachStudentDetailsScolarite.MoisNonPaye.length === 12
              ? 'margin:-42px 0px 0px 1100px'
              : 'margin-left: 900px'
          "
          text-color="white"
        >
          <v-icon left>mdi-book-variant</v-icon>
          <h3>{{ eleveClique ? eleveClique.classe : "" }}</h3>
        </v-chip>
      </v-card-title>
    </v-row>

    <!-- <v-row>
     rubrique infos civiles de l'élève qui paie 
      <v-col v-if="tailleMoisImpaye !== 12" :md="tailleMoisPaye">
        <v-card-text v-if="tailleMoisPaye !== 0">
          <v-container grid-list-md>
            raw affichant les mois payés ou impayés 
            <v-row>
              <v-col>
                <v-row justify="space-around">
                  <v-col> 

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
                        Debut Mois payés 
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
                              v-for="(moisPaye,
                              index) in eachStudentDetailsScolarite.moisPaye"
                              :key="moisPaye"
                              @click="ShowDetailsMonthPayed(moisPaye, index)"
                            >
                              <v-icon id color="green">mdi-check</v-icon>

                              {{ moisPaye }}
                            </v-chip>
                          </v-chip-group>
                        </v-col>
                      </v-row>

                       Alert affichage details des mois payés 
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
                  </v-col> 
                </v-row>
              </v-col>
            </v-row>
            fin raw affichant les mois payés ou impayés 
          </v-container>
        </v-card-text>
      </v-col>

      rubrique gestion des mois payés 
      <v-col
        v-if="tailleMoisImpaye !== 12 && tailleMoisAvance !== 0"
        :md="tailleMoisAvance"
      >
        <v-card-text>
          <v-container grid-list-md>
            raw affichant les mois payés ou impayés 
            <v-row>
              <v-col>
                <v-row justify="space-around">
                   <v-col> 
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
                       Debut Mois Avancés 
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
                            v-for="mois in eachStudentDetailsScolarite.moisAvance"
                            :key="mois"
                            @click="ShowDetailsMonthAvanced(mois)"
                          >
                            <v-icon id color="green">mdi-check</v-icon>

                            {{ mois }}
                          </v-chip>
                        </v-chip-group>
                      </v-col>

                      Alert affichage details des mois avancés 
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
                   </v-col> 
                </v-row>
              </v-col>
            </v-row>
             fin raw affichant les mois payés ou impayés 
          </v-container>
        </v-card-text>
      </v-col>

      <v-col :md="tailleMoisImpaye">
        <v-card-text>
          <v-container grid-list-md>
             raw affichant les mois payés ou impayés 
            <v-row>
              <v-col>
                <v-row justify="space-around">
                  <v-col> 
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
                      Debut Mois payés 
                      <v-col>
                        <v-chip-group
                          mandatory
                          active-class="primary--text"
                          center-active
                        >
                          <v-chip
                            readonly
                            outlined
                            v-for="moisNonPaye in eachStudentDetailsScolarite.MoisNonPaye"
                            :key="moisNonPaye"
                          >
                            <v-icon color="green">mdi-check</v-icon>
                            {{ moisNonPaye }}
                          </v-chip>
                        </v-chip-group></v-col
                      >
                    </v-row>
                  </v-sheet>
                  </v-col> 
                </v-row>
              </v-col>
            </v-row>
            fin raw affichant les mois payés ou impayés 
          </v-container>
        </v-card-text>
      </v-col>
    </v-row> -->

    <v-row style="margin: 15px 0px 0x 10px">
      <v-col md="6">
        <v-card>
          <v-chip label color="primary" text-color="white">
            <v-icon left>mdi-check</v-icon> Frais Payés
          </v-chip>

          <v-tabs abs v-model="tab" background-color="primary" dark>
            <v-tab
              v-for="fraisPaye in eachStudentDetailsScolarite.allFraisPayes
                .autresFrais"
              :key="fraisPaye.id"
            >
              {{ fraisPaye.typeFrais }}
            </v-tab>
            <v-divider color="white" inset vertical></v-divider>
            <v-divider color="white" inset vertical></v-divider>
            <v-tab
              v-for="fraisPaye in eachStudentDetailsScolarite.FraisPayesWithDetails"
              :key="fraisPaye.id"
            >
              ECOLAGE {{ fraisPaye.mois }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item
              v-for="paye in eachStudentDetailsScolarite.allFraisPayes
                .autresFrais"
              :key="paye.id"
            >
              <v-card flat>
                <v-card-text>
                  <span
                    style="color:black;font-weight: bold; text-decoration: underline;"
                    >Montant Payé :</span
                  >
                  {{ paye.montantFrais }} FCFA
                  <span
                    style="color:black;font-weight: bold; text-decoration: underline; margin-left:50px"
                    >Date de paiement:</span
                  >
                  {{ paye.cree_le }} <br />
                  <span
                    style="color:black; font-weight: bold; text-decoration: underline;"
                    >Année académique:</span
                  >
                  {{ paye.AnneeScolaire }}
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item
              v-for="paye in eachStudentDetailsScolarite.FraisPayesWithDetails"
              :key="paye.id"
            >
              <v-card flat>
                <v-card-text>
                  <span
                    style="color:black;font-weight: bold; text-decoration: underline;"
                    >Montant Payé :</span
                  >
                  {{ paye.montantFrais }} FCFA
                  <span
                    style="color:black;font-weight: bold; text-decoration: underline; margin-left:50px"
                    >Montant Restant:
                  </span>
                  {{ paye.montantRestant }}
                  <br />
                  <span
                    style="color:black; font-weight: bold; text-decoration: underline;"
                    >Date de paiement:</span
                  >
                  {{ paye.cree_le.slice(0, 16).replace("T", " à ") }}
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
            <v-tab
              v-for="item2 in eachStudentDetailsScolarite.allFraisImpayes"
              :key="item2.identifiant"
            >
              {{ item2.identifiant }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab2">
            <v-tab-item
              v-for="item2 in eachStudentDetailsScolarite.allFraisImpayes"
              :key="item2.identifiant"
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
  </div>
</template>

<script>
//import { EventBus } from "@/event-bus.js";
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

      choiceBetweenInscReinsc: null,
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

      classes: undefined,
      moisToPay: [],

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

      resultat: null,
      icon: "",
      optionDeTrie: "",
      shawAllMonths: undefined,
      shawNonPayedMonths: undefined,
      shawAvancedMonths: undefined,
      MoisPayedToShow: undefined,
      monthsAlreadySolve: [],
      priceMonthsAlreadySolve: [],
      //moisToShowWithoutPayedMonths: [],

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
    };
  },
  beforeMount() {
    if (this.eleveClique) {
      console.log(this.eleveClique.nom);
      console.log(this.eachStudentDetailsScolarite.MoisPaye);
    }

    // EventBus.$on("AfficheEleve", this.AfficheEleve());
  },

  computed: {
    ...mapGetters(["eleveClique"]),
    ...mapGetters(["eachStudentDetailsScolarite"]),

    tailleMoisPaye() {
      /* if (this.eachStudentDetailsScolarite.moisPaye) {
        return this.eachStudentDetailsScolarite.moisPaye.length;
      } else {
        return 4;
      }*/
      let taille = this.eachStudentDetailsScolarite.moisPaye.length;
      if (
        taille === 0 &&
        this.eachStudentDetailsScolarite.moisPaye.length > 0
      ) {
        return 0;
      } else {
        return this.eachStudentDetailsScolarite.moisPaye.length > 0
          ? taille
          : 4;
      }
    },
    tailleMoisImpaye() {
      /* console.log(
        "Coucou " +
          JSON.stringify(this.eachStudentDetailsScolarite.allFraisPayes)
      );
      console.log(
        "Coucou " +
          JSON.stringify(this.eachStudentDetailsScolarite.allFraisImpayes)
      );
      if (this.eachStudentDetailsScolarite.MoisNonPaye) {
        let taille = this.eachStudentDetailsScolarite.MoisNonPaye.length;
        return taille > 0 ? taille - 2 : 4;
      } else {
        return 4;
      }*/
      let taille = this.eachStudentDetailsScolarite.MoisNonPaye.length;
      return this.eachStudentDetailsScolarite.MoisNonPaye.length > 0
        ? taille
        : 4;
    },
    tailleMoisAvance() {
      /* let taille = this.eachStudentDetailsScolarite.moisAvance.length;
      let tailleMoisNonPaye = this.eachStudentDetailsScolarite.MoisNonPaye
        .length;

      if (taille === 0 && tailleMoisNonPaye === 0) {
        return 4;
      } else if (taille === 0 && tailleMoisNonPaye > 0) {
        console.log("✈ ");
        return taille + 2;
      } else {
        return taille;
      }*/
      let taille = this.eachStudentDetailsScolarite.moisAvance.length;
      if (
        taille === 0 &&
        this.eachStudentDetailsScolarite.MoisNonPaye.length > 0
      ) {
        return 0;
      } else {
        return this.eachStudentDetailsScolarite.moisAvance.length > 0
          ? taille
          : 4;
      }
    },
    advancedMonthStyle() {
      let taille = this.eachStudentDetailsScolarite.moisAvance.length;
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
    AfficheEleve(eleveClique) {
      console.log("Coucou " + eleveClique); // console.log(`Coucou =  + ${JSON.stringify(item)}`);
      /* this.eachStudentDetailsScolarite.allFraisPayes = [];
      this.eachStudentDetailsScolarite.allFraisImpayes = [];
      this.resultat = null;

      this.eachStudentDetailsScolarite.autresFraisPayesSaufInscReinsc = null;
      // this.eachStudentDetailsScolarite.autresFraisPayesSaufInscReinsc = [];
      this.eachStudentDetailsScolarite.MoisPaye = [];
      this.eachStudentDetailsScolarite.MoisNonPaye = [];
      this.eachStudentDetailsScolarite.moisAvance = [];
      this.eachStudentDetailsScolarite.moisToShowWithoutPayedMonths = [];

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
        this.eachStudentDetailsScolarite.prixReinscription = this.allFraisInscReinsc.find(
          (x) => x.classe == eleveChoisi.classe
        ).fraisReinscription;

        this.eachStudentDetailsScolarite.prixInscription = this.allFraisInscReinsc.find(
          (x) => x.classe === eleveChoisi.classe
        ).fraisInscription;

        console.log("test eachStudentDetailsScolarite.allFraisPayes " + JSON.stringify(this.eachStudentDetailsScolarite.allFraisPayes));

        let AllFraisPayedByEleve = JSON.parse(
          localStorage.getItem("AllFraisPayedByEleve")
        );
        // assignation frais communs payés et non payés s'il y a au moins un frais payé si non allFraisImpayés= Tous les frais de la BD
        if (AllFraisPayedByEleve) {
          this.eachStudentDetailsScolarite.autresFraisPayesSaufInscReinsc = AllFraisPayedByEleve.filter(
            this.trieAutresFraisPayes
          );
          this.eachStudentDetailsScolarite.allFraisPayes = this.eachStudentDetailsScolarite.allFraisPayes.concat(
            this.eachStudentDetailsScolarite.autresFraisPayesSaufInscReinsc
          );
          console.log("test 33 " + this.eachStudentDetailsScolarite.allFraisPayes);
          this.eachStudentDetailsScolarite.autresFraisPayesSaufInscReinsc.forEach((frais) => {
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

          this.eachStudentDetailsScolarite.allFraisImpayes = this.resultat;
          console.log(
            "eachStudentDetailsScolarite.allFraisImpayes ***************" +
              JSON.stringify(this.eachStudentDetailsScolarite.allFraisImpayes) +
              "\nallFraisPayes => " +
              JSON.stringify(this.eachStudentDetailsScolarite.allFraisPayes)
          );
        } else {
          this.eachStudentDetailsScolarite.allFraisPayes.push(inscritOuReinscrit);

          this.eachStudentDetailsScolarite.paiementFrais = JSON.parse(localStorage.getItem("Frais"));
          this.eachStudentDetailsScolarite.allFraisImpayes = this.eachStudentDetailsScolarite.paiementFrais;
          this.eachStudentDetailsScolarite.moisToShowWithoutPayedMonths = this.mois;
          this.eachStudentDetailsScolarite.MoisNonPaye = this.mois;
          this.eachStudentDetailsScolarite.MoisPaye = [];
          this.eachStudentDetailsScolarite.moisAvance = [];
          this.eachStudentDetailsScolarite.autresFraisPayesSaufInscReinsc = [];

          this.eachStudentDetailsScolarite.allFraisImpayes = this.eachStudentDetailsScolarite.paiementFrais;
          console.log(" dooomage on est dans le else");
        }
      } else {
        console.log("fin de test");
      }
      this.InitialiseFraisPayeImpaye(eleveChoisi);*/
    },
  },
};
</script>

<style></style>
