<template>
  <!-- partie paiement -->

  <v-row style="margin-top:10px;">
    <v-card-text>
      <v-container grid-list-md>
        <v-sheet elevation="10" class="py-4 px-1">
          <v-data-table
            light
            v-model="fraisChoisi"
            :headers="HeadersFrais"
            :items="
              eachStudentDetailsScolarite.paiementFrais === null
                ? []
                : eachStudentDetailsScolarite.paiementFrais
            "
            :single-select="singleSelect"
            hide-default-footer
            item-key="identifiant"
            show-select
            no-data-text="Tous les frais ont déjà été payés"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Liste des frais à payer</v-toolbar-title>
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
            :items="
              eachStudentDetailsScolarite.moisToShowWithoutPayedMonths === null
                ? []
                : eachStudentDetailsScolarite.moisToShowWithoutPayedMonths
            "
            :disabled="!fraisMensuels"
            label="Frais mensuels"
            clearable
            v-model="moisToPay"
            chips
            multiple
            no-data-text="Désolé pas de mois disponible"
            >Frais mensuels</v-autocomplete
          >

          <v-layout align-center>
            <v-checkbox
              v-model="inscription"
              hide-details
              class="shrink mr-2"
            ></v-checkbox>

            <v-text-field
              label="Inscription"
              :disabled="!inscription"
              :value="eleveClique.classe"
              append-icon=" mdi-playlist-check"
              readonly
              filled
              outlined
            ></v-text-field>
          </v-layout>

          <v-layout align-center>
            <v-checkbox
              v-model="reinscription"
              hide-details
              class="shrink mr-2"
            ></v-checkbox>
            <v-text-field
              label="Réinscription"
              :disabled="!reinscription"
              :value="eleveClique.classe"
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
                      {{
                        monthsAlreadySolve.length > 0
                          ? monthsAlreadySolve[0].mois
                          : []
                      }}
                      <span style="margin-left:15px"
                        >||
                        {{ priceMonthsAlreadySolve.toLocaleString("fr") }}
                        FCFA</span
                      >
                    </v-chip>
                  </v-card-title>
                  <!-- Ici affichage en cas de paiement frais autres que les frais mensuels -->

                  <v-row>
                    <v-col md="4">
                      <v-text-field
                        align-content-center
                        :value="eleveClique.nom"
                        outlined
                        filled
                        readonly
                        append-icon="mdi-book-variant"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col md="3">
                      <v-card-title v-if="alertInscriptionReinscription">
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
                          >{{
                            scolariteTotal
                              ? scolariteTotal.toLocaleString("fr")
                              : 0
                          }}
                          FCFA</v-chip
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
                <v-chip label color="red" type="button" @click="annulation">
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
                  Payer
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
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      singleSelect: true,
      alert: false,

      anneeActuelle: null,

      alertErreurDuplicateTypeFrais: false,
      messageErreurDuplicateTypeFrais_A: "",
      messageErreurDuplicateTypeFrais_B: "",
      AffichePaiementAutresFrais: false,
      alertInscriptionReinscription: false,
      AffichePaiementMois: false,
      fraisMensuels: false,
      fraisChoisi: [],

      scolariteTotal: null,
      allFraisInscReinsc: null,
      paiement_Inscription_Reinscription: ["Inscription", "Réinscription"],
      inscription: false,
      reinscription: false,
      shawInscription: true,
      showInscription: "",
      choiceBetweenInscReinsc: null,
      prixInscription: null,
      prixReinscription: null,

      fraisApayer: null,
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
        { text: "Frais communs à tous", value: "identifiant", sortable: true },
        { text: "Montant Frais", value: "montant", sortable: true },
      ],
      paiementFrais: [],
      moisToPay: [],
      icon: "",
      priceMonthsAlreadySolve: [],
      moisToShowWithoutPayedMonths: [],
      monthsAlreadySolve: [],
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
    this.moisToShowWithoutPayedMonths = this.mois;
    this.anneeActuelle = localStorage.getItem("année_scolaire");
  },
  computed: {
    ...mapGetters(["eleveClique"]),
    ...mapGetters(["eachStudentDetailsScolarite"]),

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
  },
  methods: {
    ...mapMutations(["mutateStateFraisPayesImpaye"]),
    ...mapActions(["actionGetfinanceEleveDetail"]),
    proceedToPaiement() {
      console.log(" test 3 if " + typeof this.reinscription);

      this.$vuetify.goTo(document.body.scrollHeight); // ici c'est pour scroller directement vers le bas

      if (
        this.fraisChoisi.length === 0 &&
        !this.fraisMensuels &&
        //  this.fraisReinscription.length === 0 &&
        this.inscription === false &&
        this.reinscription === false
      ) {
        console.log(" test 3 if ");
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
      let AllFraisPayedByEleve = JSON.parse(
        localStorage.getItem("AllFraisPayedByEleve")
      );
      if (
        this.alertErreurDuplicateTypeFrais === false &&
        this.moisToPay.length > 0 &&
        this.fraisChoisi.length == 0
      ) {
        // let MoisPaye = localStorage.getItem("MoisPaye");
        let moisAvance = this.eachStudentDetailsScolarite.moisAvance;

        this.alert = true;
        this.AffichePaiementMois = true;
        console.log(
          "Frais mensuels sélectionnés" + JSON.stringify(this.moisToPay)
        );
        // this.moisToPay.slice(0);
        let fraisAvance = [];
        //let fraisPayed= []
        if (moisAvance) {
          moisAvance.forEach((frais) => {
            if (this.moisToPay.indexOf(frais.mois) != -1) {
              this.monthsAlreadySolve.push(frais);
              fraisAvance.push(
                AllFraisPayedByEleve.find((value) => value.statut === "avancé")
                  .montantDejaPaye
              );
            }
          });
        }
        this.priceMonthsAlreadySolve = fraisAvance;

        if (fraisAvance.length > 1) {
          this.scolariteTotal =
            this.moisToPay.length *
              Number(this.eachStudentDetailsScolarite.montantFraisMensuel) -
            this.priceMonthsAlreadySolve.reduce(
              (total, value) => Number(total) + Number(value)
            );
        } else if (fraisAvance.length == 1) {
          this.scolariteTotal =
            this.moisToPay.length *
              Number(this.eachStudentDetailsScolarite.montantFraisMensuel) -
            Number(this.priceMonthsAlreadySolve[0]);
        } else {
          this.scolariteTotal =
            Number(this.eachStudentDetailsScolarite.montantFraisMensuel) *
            this.moisToPay.length;
          console.log(
            "Scolarité totale " +
              this.scolariteTotal +
              " this.eachStudentDetailsScolarite.montantFraisMensuel " +
              this.eachStudentDetailsScolarite.montantFraisMensuel +
              "\n this.moisToPay.length " +
              this.moisToPay.length
          );
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

        console.log(
          "alloooo ! eachStudentDetailsScolarite prixInscription " +
            this.eachStudentDetailsScolarite.prixInscription
        );
        this.fraisApayer = "Inscriptions";
        this.scolariteTotal = this.eachStudentDetailsScolarite.prixInscription;
        this.alertInscriptionReinscription = true;
      }

      // gestion des frais de reinscriptions
      if (this.alertErreurDuplicateTypeFrais === false && this.reinscription) {
        console.log("alloooo ! " + this.allFraisInscReinsc);
        this.alert = true;

        console.log(
          "alloooo ! prixReinscription " +
            this.eachStudentDetailsScolarite.prixReinscription
        );
        this.fraisApayer = "Réinscriptions";
        this.scolariteTotal = this.eachStudentDetailsScolarite.prixReinscription;
        this.alertInscriptionReinscription = true;
      }
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
            //this.InitialiseFraisPayeImpaye(eleveChoisi.eleveNumber);
            this.actionGetfinanceEleveDetail(eleveChoisi);

            setTimeout(() => {
              this.mutateEleveClique(eleveChoisi);
            }, 1000);
            this.annulation();
          }, 2000);
        }
      }
      if (this.alertErreurDuplicateTypeFrais === false && this.reinscription) {
        console.log("pas encore géré");
      }

      if (this.priceMonthsAlreadySolve.length > 0) {
        var totalMonthsToSolve = this.priceMonthsAlreadySolve.reduce(
          (total, value) => Number(total) + Number(value)
        );
        console.log("totalMonthsToSolve" + totalMonthsToSolve);
      }

      // Si c'est un paiement frais communs à tous et que le montant à payer est  égale au montant du frais

      if (
        this.fraisChoisi.length > 0 &&
        Number(this.montantApayer) === Number(this.fraisChoisi[0].montant)
      ) {
        payedFrais["typeFrais"] = this.fraisChoisi[0].identifiant;
        console.log(
          "Frais communs à tous => " + this.fraisChoisi[0].identifiant + " payé"
        );
        payedFrais["statut"] = "payé";
        payedFrais["montantFrais"] = this.fraisChoisi[0].montant;
        payedFrais["montantRestant"] = 0;
        console.log(
          "test final pour savoir si cest ici qu'il gère le " +
            JSON.stringify(payedFrais)
        );
        console.log("francy Malonga1");
        this.$store.dispatch("actionPayedFrais", payedFrais);
      }

      //Cas où c'est un frais mensuel à payer
      if (this.AffichePaiementMois && this.moisToPay.length > 0) {
        payedFrais["typeFrais"] = "Frais mensuels";
        //pas de mois Avancé à solver et règlement total des mois choisis
        if (
          this.monthsAlreadySolve.length === 0 &&
          this.montantApayer ==
            Number(this.eachStudentDetailsScolarite.montantFraisMensuel) *
              Number(this.moisToPay.length)
        ) {
          console.log("Eh voila !");
          payedFrais["mois"] = this.moisToPay.toString();
          payedFrais["statut"] = "payé";
          payedFrais["moisAsolver"] = null;
          payedFrais["montantFrais"] =
            this.eachStudentDetailsScolarite.montantFraisMensuel *
            this.moisToPay.length;
        }
        //pas de mois Avancé à solver et règlement avance du dernier mois choisi
        let totalMin =
          this.eachStudentDetailsScolarite.montantFraisMensuel *
            this.moisToPay.length -
          this.eachStudentDetailsScolarite.montantFraisMensuel;
        let totalMaxi =
          this.eachStudentDetailsScolarite.montantFraisMensuel *
          this.moisToPay.length;
        // paiement avance frais mensuel
        if (
          this.monthsAlreadySolve.length === 0 &&
          Number(this.montantApayer) < totalMaxi &&
          Number(this.montantApayer) > totalMin
        ) {
          console.log("totalMin " + totalMin);
          console.log(
            "eh oui " +
              this.eachStudentDetailsScolarite.montantFraisMensuel +
              "\t" +
              this.montantApayer +
              "\t" +
              totalMaxi
          );
          let allAvanceWithDetails = [
            {
              eleve: eleveChoisi.eleveNumber,
              mois: this.moisToPay.slice(-1, 1),
            },
          ];
          let moisAvance = [];
          moisAvance.push(this.moisToPay.slice(-1, 1).toString());
          localStorage.setItem("moisAvance", JSON.stringify(moisAvance));
          localStorage.setItem(
            "MoisAvancesAsolver",
            JSON.stringify(allAvanceWithDetails)
          );

          payedFrais["mois"] = this.moisToPay.toString();
          payedFrais["montantApayer"] = this.montantApayer;
          payedFrais["montantRestant"] = this.montantRestant;
          payedFrais["statut"] = "avancé";
          payedFrais["moisAsolver"] = this.moisToPay.slice(-1, 1).toString();
          payedFrais[
            "montantFrais"
          ] = this.eachStudentDetailsScolarite.montantFraisMensuel;
        }
        console.log("francy Malonga2");
        this.$store.dispatch("actionPayedFrais", payedFrais);
        setTimeout(() => {
          this.actionGetfinanceEleveDetail(eleveChoisi);
        }, 1000);

        //gestion des avances à solver
        if (this.monthsAlreadySolve.length > 0) {
          console.log("test 2");

          // Je recherche l'id du frais qui possède parmi ses frais le/les mois avancés sélectionnés
          let payedFraisToUpdate = this.eachStudentDetailsScolarite.moisAvance;
          console.log("test 9 prime");
          console.log(
            "id du frais à solver ===> " +
              JSON.stringify(this.eachStudentDetailsScolarite.moisAvance) +
              "le frais solvé ===> " +
              JSON.stringify(payedFrais)
          );

          if (payedFraisToUpdate) {
            payedFrais[
              "montantFrais"
            ] = this.eachStudentDetailsScolarite.montantFraisMensuel;
            payedFrais["mois"] = payedFraisToUpdate.mois;
            payedFrais["statut"] = "payé";

            this.$store.dispatch("actionUpdatePayedFrais", [
              payedFraisToUpdate[0].id,
              payedFrais,
            ]);
            setTimeout(() => {
              this.actionGetfinanceEleveDetail(eleveChoisi);
            }, 1000);
          }
          /*{"eleve":3,"classe":"P1","montantApayer":"1000","montantDejaPaye":"1000","montantRestant":0,"AnneeScolaire":"2021-2022","typeFrais":"Frais mensuels"}

{"montantFrais":"6000","mois":"Novembre","moisAsolver":"Novembre","montantApayer":5000,"montantDejaPaye":5000,"montantRestant":1000,"statut":"avancé","eleve":3,"classe":"P1","typeFrais":"Frais mensuels","AnneeScolaire":"2021-2022"}*/

          // si en dehors du frais mensuel à solver il y'a un autre mois à payer

          if (this.moisToPay.length > 1) {
            console.log("c'est ici que tu entre ?");
            payedFrais["mois"] = this.moisToPay
              .splice(this.moisToPay.indexOf(payedFraisToUpdate.mois), 1)
              .toString();
            console.log(
              "Mois payé en dehors du dernier mois choisi à solver = " +
                payedFrais["mois"]
            );
            payedFrais["statut"] = "payé";
            payedFrais["moisAsolver"] = null;
            payedFrais["montantFrais"] =
              this.eachStudentDetailsScolarite.montantFraisMensuel *
              (this.moisToPay.length - 1);
            console.log("francy Malonga3");

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

      setTimeout(() => {
        this.mutateEleveClique(eleveChoisi);
        this.$vuetify.goTo(document.body.scrollTop);
      }, 1000);

      // this.InitialiseFraisPayeImpaye(eleveChoisi);
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
  },
};
</script>

<style></style>
