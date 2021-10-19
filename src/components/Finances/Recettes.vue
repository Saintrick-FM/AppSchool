<template>
  <v-container fluid>
    <v-toolbar dark color="blue darken-3" class="mb-1">
      <v-text-field
        v-model="search"
        clearable
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
      ></v-text-field>
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-spacer></v-spacer>
        <v-select
          v-model="sortBy"
          flat
          solo-inverted
          hide-details
          :items="periode"
          prepend-inner-icon="mdi-magnify"
          label="Trie par période"
        ></v-select>
        <v-spacer></v-spacer>
        <v-select
          v-model="sortBy"
          flat
          solo-inverted
          hide-details
          :items="categorie"
          prepend-inner-icon="mdi-magnify"
          label="Trie par catégorie"
        ></v-select>
        <!-- <v-btn-toggle v-model="sortDesc" mandatory>
          <v-btn large depressed color="blue" :value="false">
            <v-icon>mdi-arrow-up</v-icon>

          </v-btn>
          <v-btn large depressed color="blue" :value="true">
            <v-icon>mdi-arrow-down</v-icon>
          </v-btn>
        </v-btn-toggle> -->
      </template>
    </v-toolbar>

    <v-data-table
      :headers="dessertHeaders"
      :items="items"
      :search="search"
      hide-default-header
      item-key="name"
      role="button"
      @click:row="afficheAlertDetails"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Expandable Table</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-switch
            v-model="singleExpand"
            label="Single expand"
            class="mt-2"
          ></v-switch>
        </v-toolbar>
      </template>
      <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <th v-for="headerName in headers" :key="headerName.text">
              <v-chip color="primary">{{ headerName.text }}</v-chip>
            </th>
            <v-divider vertical></v-divider>
          </tr>
        </thead>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">More info about {{ item.name }}</td>
      </template>

      <template v-slot:item.totalAttendu="{ item }">
        <v-chip dark v-if="item.caisse === 'Ecolage'">
          {{ item.totalAttendu.toLocaleString("fr") }} /mois</v-chip
        >
        <v-chip
          dark
          v-else-if="
            item.caisse === 'Réinscriptions' &&
              item.totalAttendu === 'Pas de réinscrits'
          "
        >
          {{ item.totalAttendu }}</v-chip
        >
        <v-chip dark v-else>
          {{ item.totalAttendu.toLocaleString("fr") }} /année</v-chip
        >
      </template>

      <template v-slot:item.totalPercu="{ item }">
        <v-chip dark>
          {{
            item.totalPercu ? item.totalPercu.toLocaleString("fr") + " FCFA" : 0
          }}
        </v-chip>
      </template>
    </v-data-table>
    <!-- Alert pour détails recette Ecolage -->

    <v-alert
      type="info"
      :value="alert"
      color="cyan"
      elevation="2"
      border="top"
      transition="scale-transition"
      icon="mdi-home"
      dismissible
    >
      <h2 class="black--text text-uppercase" style="margin-left:460px">
        Détails de la caisse {{ nomCaisseClique }}
      </h2>
      <v-row class="text-center">
        <v-col md="4">
          <v-card elevation="11" class="pt-10">
            <h2 class="purple--text text-uppercase">Attendus</h2>
            <v-divider color="purple" class="mt-2"></v-divider>
            <v-form
              ref="form"
              lazy-validation
              class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
            >
              <v-row>
                <!-- 1ere ligne affichant les   -->
                <v-card>
                  <v-chip label color="primary" text-color="white">
                    <v-icon left>mdi-check</v-icon> Contenance par classe /
                    Ecolage
                  </v-chip>

                  <v-tabs
                    v-model="tab"
                    center-active
                    background-color="primary"
                    dark
                  >
                    <v-tab v-for="item1 in Classes" :key="item1.identifiant">
                      {{ item1.identifiant }}
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in Classes" :key="item.identifiant">
                      <v-card flat>
                        <v-card-text>
                          <span
                            style="color:black;font-weight: bold; text-decoration: underline;"
                            >Contenance :</span
                          >

                          {{ item.contenance }} élèves
                          <span
                            style="color:black;font-weight: bold; text-decoration: underline; padding-left:10px"
                            >Frais mensuels:</span
                          >
                          {{ item.scolarite }} FCFA
                        </v-card-text>

                        <v-btn x-large block color="primary">
                          <span
                            class="white--text"
                            style="text-transform: capitalize; width:380px"
                          >
                            {{ item.identifiant }} ({{ item.contenance }} *
                            {{ item.scolarite }}) =
                            {{
                              (item.contenance * item.scolarite).toLocaleString(
                                "fr"
                              )
                            }}
                            FCFA
                          </span>
                        </v-btn>
                      </v-card>
                      <v-divider></v-divider>
                      <v-divider></v-divider>
                      <v-btn x-large block color="primary">
                        <span
                          class="white--text"
                          style="text-transform: capitalize; width:400px; "
                          >Somme totale =
                          <v-chip color="green"
                            >{{ totalAttenduForCliquedCaisse }} / mois</v-chip
                          >
                          FCFA
                        </span>
                      </v-btn>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
              </v-row>
            </v-form>
          </v-card>
        </v-col>

        <v-col md="4">
          <v-card elevation="11" class="pt-10">
            <h2 class="purple--text text-uppercase">Perçus</h2>

            <v-divider color="purple" class="mt-2"></v-divider>

            <v-form
              ref="form"
              lazy-validation
              class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
            >
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Période congés 1er trimestre "
                    outlined
                    shaped
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Période congés 2e trimestre"
                    readonly
                    disabled
                    outlined
                    shaped
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Date début de vacances (élèves)"
                    readonly
                    disabled
                    type="date"
                    filled
                    shaped
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Date début de vacances (personnel)"
                    readonly
                    disabled
                    type="date"
                    filled
                    shaped
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
        <v-col md="4">
          <v-card elevation="11" class="pt-10">
            <h2 class="purple--text text-uppercase">Reste</h2>

            <v-divider color="purple" class="mt-2"></v-divider>

            <v-form
              ref="form"
              lazy-validation
              class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
            >
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Période congés 1er trimestre "
                    outlined
                    shaped
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Période congés 2e trimestre"
                    readonly
                    disabled
                    outlined
                    shaped
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Date début de vacances (élèves)"
                    readonly
                    disabled
                    type="date"
                    filled
                    shaped
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Date début de vacances (personnel)"
                    readonly
                    disabled
                    type="date"
                    filled
                    shaped
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-alert>
    <AlertDetailsCaisseInscReinsc v-if="alertDetailsCaisseInscReinsc" />
    <AlertDetailsCaisseAutresFrais v-if="alertDetailsCaisseAutresFrais" />

    <v-row
      class="mt-3"
      align="center"
      justify="center"
      style="padding:30px 2px 10px 2px"
    >
      <v-toolbar color="primary" dark flat>
        <v-col>
          <!-- <v-icon>mdi-silverware</v-icon> -->
          <v-list color="primary" dark flat style="margin-bottom:30px">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle color="green" style="margin-left:75px"
                  >Pour toutes les caisses</v-list-item-subtitle
                >
                <v-list-item-title class="text-h6">
                  Total Attendu :
                  {{ totalAttenduForAllCaisses.toLocaleString("fr") }} FCFA
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>

        <v-divider vertical></v-divider>
        <v-col>
          <!-- <v-icon>mdi-silverware</v-icon> -->
          <v-list color="primary" dark flat style="margin-bottom:30px">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle style="margin-left:75px"
                  >Pour toutes les caisses</v-list-item-subtitle
                >
                <v-list-item-title class="text-h6">
                  Total Perçus :
                  {{ totalPercusForAllCaisses.toLocaleString("fr") }} FCFA
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>

        <v-divider vertical></v-divider>
        <v-col>
          <!-- <v-icon>mdi-silverware</v-icon> -->
          <v-list color="primary" dark flat style="margin-bottom:30px">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle color="green" style="margin-left:75px"
                  >Pour toutes les caisses</v-list-item-subtitle
                >
                <v-list-item-title class="text-h6">
                  Total Non perçus : 130.000 FCFA
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col>
          <!-- <v-icon>mdi-silverware</v-icon> -->
          <v-list color="primary" dark flat style="margin-bottom:30px">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle color="green" style="margin-left:75px"
                  >Pour toutes les caisses</v-list-item-subtitle
                >
                <v-list-item-title class="text-h6">
                  Total en caisse actuel : 100.000 FCFA
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-toolbar>
    </v-row>
  </v-container>
</template>

<script>
//import axios from 'axios';
import { mapActions, mapMutations, mapGetters } from "vuex";
import { EventBus } from "@/event-bus.js";
import AlertDetailsCaisseInscReinsc from "@/components/Finances/AlertDetailsCaisseInscReinsc.vue";
import AlertDetailsCaisseAutresFrais from "@/components/Finances/AlertDetaisCaisseAutresFrais.vue";

export default {
  name: "Recettes",
  components: {
    AlertDetailsCaisseInscReinsc,
    AlertDetailsCaisseAutresFrais,
  },
  data() {
    return {
      alertDetailsCaisseInscReinsc: false,
      alertDetailsCaisseAutresFrais: false,
      totalAttenduForAllCaisses: 0,
      totalPercusForAllCaisses: 0,
      ClassesEtEcollages: null,
      totalAttenduForCliquedCaisse: null,
      disabled: true,
      tab: null,
      alert: false,
      nomCaisseClique: "",
      expanded: [],
      singleExpand: false,
      search: null,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      keys: [
        "Name",
        "Calories",
        "Fat",
        "Carbs",
        "Protein",
        "Sodium",
        "Calcium",
        "Iron",
      ],
      dessertHeaders: [
        {
          text: "Caisse",
          align: "start",
          sortable: true,
          value: "caisse",
        },
        { text: "Attendus", value: "totalAttendu" },
        { text: "Perçus", value: "totalPercu" },
        { text: "Reste", value: "resteApercevoir" },
        { text: "Total actuel", value: "totalActuel" },
        { text: "Report", value: "iron" },
        //{ text: "", value: "data-table-expand" },
      ],
      messages: [
        {
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          name: "Total attendus",
          title: "Tota",
          excerpt: "Thank you for joining our community...",
        },
        {
          color: "red",
          icon: "mdi-account-multiple",
          name: "Total recueilli",
          new: 1,
          total: 3,
          title: "Twitter",
        },
        {
          color: "teal",
          icon: "mdi-tag",
          name: "Reste",
          new: 2,
          total: 4,
          title: "Shop",
          exceprt: "New excerprt",
        },
      ],
      Config_Ecolage_et_Autres: null,
      Config_Autres_Frais: null,
      Config_InscReinsc: null,
      lorem:
        "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam.",

      periode: ["Cette semaine", "Ce mois", "Ce trimestre"],
      categorie: [
        "Caisse ayant le plus de perçus",
        "Caisse ayant le plus de non-perçus",
        "Caisse ayant le plus d'avances",
      ],
      items: [
        {
          caisse: "Ecolage",
          totalAttendu: null,
          totalPercu: null,
          resteApercevoir: null,
          totalActuel: null,
          Report: null,
        },
        {
          caisse: "Inscriptions",
          totalAttendu: null,
          totalPercu: null,
          resteApercevoir: null,
          totalActuel: null,
          Report: null,
        },
        {
          caisse: "Réinscriptions",
          totalAttendu: null,
          totalPercu: null,
          resteApercevoir: null,
          totalActuel: null,
          Report: null,
        },
      ],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    ...mapGetters([
      "AllPercusEcolage",
      "AllPercusAutresFrais",
      "allPercuReinscriptionToShow",
      "allPercuInscriptionToShow",
      "montantTotalPercuAutresFrais",
      "montantTotalPercuEcolage",
    ]),
  },
  beforeCreate() {},

  beforeMount() {
    //this.$store.dispatch(" actiongetPercusTypeFrais", "Frais mensuels");
    this.Config_Ecolage_et_Autres = JSON.parse(
      localStorage.getItem("Config_Ecolage_et_Autres")
    );
    this.Config_Autres_Frais = JSON.parse(
      localStorage.getItem("Config_Autres_Frais")
    );
    this.Config_Autres_Frais.forEach((el) => {
      this.items.push({
        caisse: el.identifiant,
        totalAttendu: null,
        totalPercu: null,
        resteApercevoir: null,
        totalActuel: null,
        Report: null,
      });
    });

    let tableEcolages = [];
    let tableContenanceParClasse = [];

    this.Config_Ecolage_et_Autres.forEach((ecolage) => {
      tableEcolages.push(ecolage.montant);
    });
    let Classes = JSON.parse(localStorage.getItem("Classes"));
    this.Classes = Classes;

    this.Classes.forEach((element, index) => {
      element.scolarite = tableEcolages[index];
    });

    console.log(
      "ClassesEtEcollages ====" + JSON.stringify(this.ClassesEtEcollages)
    );
    if (Classes) {
      Classes.forEach((classe) => {
        tableContenanceParClasse.push(classe.contenance);
      });
    }
    this.getAttendusEcolage(tableContenanceParClasse, tableEcolages);

    // préparation filtage inscrits récupération de tous leur montants et envoie pour le calcul
    let Inscrits_Annee_Actuel = JSON.parse(
      localStorage.getItem("Inscrits_Annee_Actuel")
    );

    let AllMontantsInsc = [];
    // ici je récupère ceux qui se sont inscrits et ont payé l'inscription
    let PayedInscription = JSON.parse(
      localStorage.getItem("all_Eleves_Payed_InscReinsc")
    )[0];
    let PayedReinscription = JSON.parse(
      localStorage.getItem("all_Eleves_Payed_InscReinsc")
    )[1];

    this.mutateInscrits(PayedInscription);
    console.log("test final 2");
    let montant = JSON.parse(localStorage.getItem("Config inscReinsc"));

    if (Inscrits_Annee_Actuel) {
      console.log("Oui oui");

      Inscrits_Annee_Actuel.forEach((element) => {
        console.log(element.classe + "\t" + element.nom);

        AllMontantsInsc.push(
          montant.find((x) => x.classe === element.classe).fraisInscription
        );
      });
    }
    console.log("test final " + JSON.stringify(AllMontantsInsc));
    let attenduInscriptionToShow = AllMontantsInsc.reduce((x, y) => x + y);
    console.log("attenduInscriptionToShow " + attenduInscriptionToShow);
    this.items[
      this.items.findIndex((x) => x.caisse === "Inscriptions")
    ].totalAttendu = Number(attenduInscriptionToShow);

    // enrefistrement dans le sotre du total des Attendus de la Reinscription
    this.mutateAttenduInscription(attenduInscriptionToShow);
    this.totalAttenduForAllCaisses += Number(attenduInscriptionToShow);

    // préparation filtage réinscrits récupération de tous leur montants et envoie pour le calcul
    let AllMontantsReinsc = [];

    let Reinscrits = Inscrits_Annee_Actuel.filter(
      (x) => x.typeFrais === "Réinscriptions"
    );
    this.mutateReinscrits(Reinscrits);

    if (Reinscrits.length > 0) {
      console.log("Réinscrit " + typeof Reinscrits);
      Reinscrits.forEach((eleve) => {
        AllMontantsReinsc.push([eleve.montantFrais]);
      });
      let attenduReinscriptionToShow = AllMontantsReinsc.reduce(
        (x, y) => x + y
      ).toString();
      this.items[
        this.items.findIndex((x) => x.caisse === "Réinscriptions")
      ].totalAttendu = Number(attenduReinscriptionToShow);

      // enrefistrement dans le sotre du total des Attendus de la Reinscription
      this.mutateAttenduReinscription(attenduReinscriptionToShow);
      this.totalAttenduForAllCaisses += Number(attenduReinscriptionToShow);
    } else {
      this.items[
        this.items.findIndex((x) => x.caisse === "Réinscriptions")
      ].totalAttendu = "Pas de réinscrits";
      this.items[
        this.items.findIndex((x) => x.caisse === "Réinscriptions")
      ].totalPercu = 0;
    }

    let listeAutresFrais = JSON.parse(
      localStorage.getItem("Config_Autres_Frais")
    );
    this.getAttendusAutresFrais(listeAutresFrais, Classes);

    // affectations totalPercu réinscriptions
    let totalPercuReinscriptionToShow = null;
    let totalPercuInscriptionToShow = null;
    if (PayedReinscription && PayedReinscription.length > 1) {
      let tableMontantReinscriptionsPayed = [];
      PayedReinscription.forEach((element) => {
        tableMontantReinscriptionsPayed.push(element.montantDejaPaye);
      });
      totalPercuReinscriptionToShow = tableMontantReinscriptionsPayed.reduce(
        (x, y) => x + y
      );
      this.items[
        this.items.findIndex((x) => x.caisse === "Réinscriptions")
      ].totalPercu = totalPercuReinscriptionToShow;
    } else if (PayedReinscription && PayedReinscription.length === 1) {
      totalPercuReinscriptionToShow = PayedReinscription[0].montantDejaPaye;
      this.items[
        this.items.findIndex((x) => x.caisse === "Réinscriptions")
      ].totalPercu = totalPercuReinscriptionToShow;
    } else {
      totalPercuReinscriptionToShow = 0;
      this.items[
        this.items.findIndex((x) => x.caisse === "Réinscriptions")
      ].totalPercu = totalPercuReinscriptionToShow;
    }

    // affectation totalPercus inscriptions
    if (PayedInscription && PayedInscription.length > 1) {
      let tableMontantInscriptionsPayed = [];
      PayedInscription.forEach((element) => {
        tableMontantInscriptionsPayed.push(element.montantDejaPaye);
      });

      totalPercuInscriptionToShow = tableMontantInscriptionsPayed.reduce(
        (x, y) => x + y
      );
      this.items[
        this.items.findIndex((x) => x.caisse === "Inscriptions")
      ].totalPercu = totalPercuInscriptionToShow;
    } else if (PayedInscription && PayedInscription.length === 1) {
      totalPercuInscriptionToShow = PayedInscription[0].montantDejaPaye;
      this.items[
        this.items.findIndex((x) => x.caisse === "Inscriptions")
      ].totalPercu = totalPercuInscriptionToShow;
    } else {
      totalPercuInscriptionToShow = 0;
      this.items[
        this.items.findIndex((x) => x.caisse === "Inscriptions")
      ].totalPercu = totalPercuInscriptionToShow;
    }
    console.log("totalPercuInscriptionToShow " + totalPercuInscriptionToShow);
    //this.totalPercusForAllCaisses += totalPercuReinscriptionToShow;
    //this.totalPercusForAllCaisses += totalPercuInscriptionToShow;

    this.mutateTotalPercuInscriptionToShow(0);
    this.mutateTotalPercuInscriptionToShow(totalPercuInscriptionToShow);

    this.mutateTotalPercuReinscriptionToShow(0);
    this.mutateTotalPercuReinscriptionToShow(totalPercuReinscriptionToShow);

    this.Config_InscReinsc = JSON.parse(
      localStorage.getItem("Config inscReinsc")
    );

    // affectation TotalPercu Ecolages

    setTimeout(() => {
      console.log("⏰ ⏰ ⏰  this.AllPercusEcolage " + this.AllPercusEcolage);
      if (this.AllPercusEcolage && this.AllPercusEcolage.length > 1) {
        let tableAllEcolagesPayed = [];
        this.AllPercusEcolage.forEach((element) => {
          tableAllEcolagesPayed.push(element.montantDejaPaye);
        });

        console.log(
          "tableAllEcolagesPayed.reduce((x, y) => x + y) " +
            JSON.stringify(tableAllEcolagesPayed)
        );

        this.items[
          this.items.findIndex((x) => x.caisse === "Ecolage")
        ].totalPercu = tableAllEcolagesPayed.reduce((x, y) => x + y);
        this.mutateTotalPercuEcolage(
          tableAllEcolagesPayed.reduce((x, y) => x + y)
        );
        // this.totalPercusForAllCaisses += tableAllEcolagesPayed.reduce(
        //   (x, y) => x + y
        // );
      } else if (this.AllPercusEcolage && this.AllPercusEcolage.length === 1) {
        this.items[
          this.items.findIndex((x) => x.caisse === "Ecolage")
        ].totalPercu = this.AllPercusEcolage.montantDejaPaye;
        this.mutateTotalPercuEcolage(this.AllPercusEcolage.montantDejaPaye);
        // this.totalPercusForAllCaisses += this.AllPercusEcolage.montantDejaPaye;
      } else {
        this.items[
          this.items.findIndex((x) => x.caisse === "Ecolage")
        ].totalPercu = 0;
      }

      // affectation des percus de chaque type d'autres frais
      console.log(
        "this.AllPercusEcolage. " + JSON.stringify(this.AllPercusAutresFrais)
      );
      console.log(
        "⏰ ⏰ ⏰ this.AllPercusAutresFrais.length " +
          this.AllPercusAutresFrais.length
      );
      if (this.AllPercusAutresFrais && this.AllPercusAutresFrais.length > 1) {
        let tableEachAutreFraisPayed = [];
        this.AllPercusAutresFrais.forEach((element) => {
          // si cet autre frais a 2 ou plus d'eleves ayant payés ledit frais
          if (element.donnees && element.donnees.length > 1) {
            element.donnees.forEach((element2) => {
              tableEachAutreFraisPayed.push(element2.montantApayer);
            });

            this.items[
              this.items.findIndex((x) => x.caisse === element.typeFrais)
            ].totalPercu = tableEachAutreFraisPayed.reduce((x, y) => x + y);

            this.mutateTotalPercuAutresFrais({
              typeFrais: element.typeFrais,
              totalPercu: tableEachAutreFraisPayed.reduce((x, y) => x + y),
            });
            // this.totalPercusForAllCaisses += tableEachAutreFraisPayed.reduce(
            //   (x, y) => x + y
            // );

            // si cet autre frais n'a qu'un eleve ayant payé ledit frais
          } else if (element.donnees && element.donnees.length === 1) {
            this.items[
              this.items.findIndex((x) => x.caisse === element.typeFrais)
            ].totalPercu = element.donnees[0].montantApayer;
            this.mutateTotalPercuAutresFrais({
              typeFrais: element.typeFrais,
              totalPercu: element.donnees[0].montantApayer,
            });
            console.log(
              " this.totalPercusForAllCaisses avant" +
                this.totalPercusForAllCaisses +
                "\n this.totalPercusForAllCaisses après"
            );
            // this.totalPercusForAllCaisses += element.donnees[0].montantApayer;

            // si cet autre frais n'a pas d'élèves l'ayant payé
          } else {
            this.items[
              this.items.findIndex((x) => x.caisse === element.typeFrais)
            ].totalPercu = 0;
          }
        });
        console.log(
          "this.allPercuReinscriptionToShow " +
            this.allPercuReinscriptionToShow +
            "\nthis.allPercuInscriptionToShow " +
            this.allPercuInscriptionToShow +
            "\nmontantTotalPercuAutresFrais " +
            this.montantTotalPercuAutresFrais +
            "\nmontantTotalPercuEcolage " +
            this.montantTotalPercuEcolage
        );
        console.log("this.items " + JSON.stringify(this.items));
        let eachTotalPercu = [];
        this.items.forEach((element) => {
          eachTotalPercu.push(element.totalPercu);
        });

        this.totalPercusForAllCaisses = eachTotalPercu.reduce((x, y) => x + y);

        console.log(
          "⏰ ⏰ ⏰ totalPercusForAllCaisses " + this.totalPercusForAllCaisses
        );

        // Il n'y a pas de percusAutresFrais
      } else {
        console.log("Désolé erreur");
      }
    }, 2000);
  },

  methods: {
    ...mapMutations(["mutateCaisseClique"]),
    ...mapMutations(["mutateReinscrits"]),
    ...mapMutations(["mutateInscrits"]),
    ...mapMutations(["mutateAttenduInscription"]),
    ...mapMutations(["mutateAttenduReinscription"]),
    ...mapMutations([
      "mutateTotalPercuReinscriptionToShow",
      "mutateTotalPercuInscriptionToShow",
      "mutateTotalPercuEcolage",
    ]),
    ...mapMutations(["mutateEachAutreFraisWithContenanceMontant"]),
    ...mapMutations(["mutateTotalPercuAutresFrais"]),
    ...mapActions(["actiongetPercusTypeFrais"]),

    afficheAlertDetails: function(item, row) {
      console.log(
        "this.alert = " +
          this.alert +
          " ****this.alertDetailsCaisseInscReinsc = " +
          this.alertDetailsCaisseInscReinsc
      );
      if (
        this.alert ||
        this.alertDetailsCaisseInscReinsc ||
        this.alertDetailsCaisseAutresFrais
      ) {
        this.alert = false;
        this.alertDetailsCaisseInscReinsc = false;
        this.alertDetailsCaisseAutresFrais = false;
        row.select(true);

        if (item.caisse === "Ecolage") {
          setTimeout(() => {
            console.log("item cliqué" + JSON.stringify(item));
            this.alert = true;
          }, 200);
        } else if (
          item.caisse === "Inscriptions" ||
          item.caisse === "Réinscriptions"
        ) {
          setTimeout(() => {
            this.mutateCaisseClique(item);
            console.log(
              "l'alert details_Insc_Reinsc devait s'aficher en principe "
            );
            this.alertDetailsCaisseInscReinsc = true;
          }, 200);
        } else {
          console.log(
            "l'alert details_Autres_Frais devait s'aficher en principe "
          );
          this.sendDetailsAutresFraisToStore(item);
          this.mutateCaisseClique(item);
          this.alertDetailsCaisseAutresFrais = true;
        }
      } else {
        row.select(true);
        console.log("item cliqué dans Recettes.vue" + JSON.stringify(item));
        if (item.caisse === "Ecolage") {
          console.log("item cliqué" + JSON.stringify(item));
          this.alert = true;
        } else if (
          item.caisse === "Inscriptions" ||
          item.caisse === "Réinscriptions"
        ) {
          this.mutateCaisseClique(item);
          this.alertDetailsCaisseInscReinsc = true;
          EventBus.$emit("AlertDetailsCaisseInscReinsc", item);
        } else {
          console.log(
            "l'alert details_Autres_Frais devait s'aficher en principe "
          );
          this.sendDetailsAutresFraisToStore(item);
          this.mutateCaisseClique(item);
          this.alertDetailsCaisseAutresFrais = true;
        }
      }
      this.nomCaisseClique = item.caisse;
      this.totalAttenduForCliquedCaisse = item.totalAttendu.toLocaleString(
        "fr"
      );
      this.$vuetify.goTo(document.body.scrollHeight);
    },
    getAttendusEcolage(totalInscritsParClasses, allEcolages) {
      console.log(
        "totalInscritsParClasses = " +
          JSON.stringify(totalInscritsParClasses) +
          "\n allEcolages = " +
          JSON.stringify(allEcolages)
      );
      let total = totalInscritsParClasses.map(
        (x, index) => allEcolages[index] * x
      );
      console.log("total " + total);
      let attenduEcolageToShow = total.reduce((x, y) => x + y).toString();

      this.items[
        this.items.findIndex((x) => x.caisse === "Ecolage")
      ].totalAttendu = Number(attenduEcolageToShow);

      this.totalAttenduForAllCaisses += Number(attenduEcolageToShow);
      console.log(
        "this.totalAttenduForAllCaisses =" +
          this.totalAttenduForAllCaisses.toLocaleString("fr")
      );

      // ecolage.totalAttendu =
      console.log("Yes");
    },
    sendDetailsAutresFraisToStore(item) {
      // Envoie Autre frais avec les details Contenances de ses classesSpeciales, montant, et total Attendu dans le store
      let contenancesPropresAuxIdsClasses = [];
      let listeAutresFrais = JSON.parse(
        localStorage.getItem("Config_Autres_Frais")
      );

      let element = listeAutresFrais.find((x) => x.identifiant === item.caisse);

      if (element.classesSpeciales.length > 1) {
        element.classesSpeciales.forEach((element) => {
          contenancesPropresAuxIdsClasses.push(
            this.Classes.find((classe) => classe.identifiant === element)
              .contenance
          );
        });
      } else {
        contenancesPropresAuxIdsClasses.push(
          this.Classes.find(
            (classe) => classe.identifiant === element.classesSpeciales[0]
          ).contenance
        );
      }

      this.mutateEachAutreFraisWithContenanceMontant({
        caisse: item.caisse,
        montant: element.montant,
        contenanceClassesSpeciales: contenancesPropresAuxIdsClasses,
        totalAttendu: item.totalAttendu,
        classesSpeciales: element.classesSpeciales,
      });
    },

    getAttendusAutresFrais(listeAutresFrais, Classes) {
      // recup AutresFrais, affectation montantsFrais avec les effectifs des élèves qui doivent les payer
      console.log("AutresFrais " + JSON.stringify(listeAutresFrais));

      let contenancesPropresAuxIdsClasses = [];

      listeAutresFrais.forEach((element) => {
        if (element.classesSpeciales.length > 1) {
          element.classesSpeciales.forEach((element) => {
            contenancesPropresAuxIdsClasses.push(
              Classes.find((classe) => classe.identifiant === element)
                .contenance
            );
          });
        } else {
          contenancesPropresAuxIdsClasses.push(
            Classes.find(
              (classe) => classe.identifiant === element.classesSpeciales[0]
            ).contenance
          );
        }

        console.log(
          "identifiant = " +
            element.identifiant +
            "\nmontant =" +
            element.montant +
            "\ncontenancesPropresAuxIdsClasses " +
            JSON.stringify(contenancesPropresAuxIdsClasses)
        );

        let resultats = [];
        if (contenancesPropresAuxIdsClasses.length > 1) {
          contenancesPropresAuxIdsClasses.forEach((el2) => {
            resultats.push(el2 * element.montant);
          });
        } else {
          resultats.push(contenancesPropresAuxIdsClasses[0] * element.montant);
        }
        let attenduAutreFraisToShow = resultats
          .reduce((x, y) => x + y)
          .toString();

        console.log(
          "resultats for " +
            element.identifiant +
            " = " +
            JSON.stringify(resultats)
        );

        this.items[
          this.items.findIndex((x) => x.caisse === element.identifiant)
        ].totalAttendu = Number(attenduAutreFraisToShow);

        this.totalAttenduForAllCaisses += Number(attenduAutreFraisToShow);
      });
    },
    getPercus() {
      //Ecolage
    },

    getAllFraisForComptabilite() {
      let configFrais = JSON.parse(localStorage.getItem("Frais"));
      let typesFrais = [];
      configFrais.forEach((frais) => {
        typesFrais.push(frais.frais);
      });
      console.log(typesFrais);
      configFrais.push();
      // this.$store.dispatch("actionGetAllFraisForCompta", typesFrais);
    },
  },
};
</script>
