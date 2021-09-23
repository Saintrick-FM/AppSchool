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
    </v-data-table>
    <!-- <v-card-title
                class="subheading font-weight-bold"
                style="flex-direction: column;"
              >
                {{ item.name }}
              </v-card-title> -->

    <!-- <v-divider></v-divider> -->

    <!-- <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ key }}:
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ item[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list> -->

    <v-row class="mt-3" align="center" justify="center">
      <v-toolbar color="primary" dark flat>
        <v-col>
          <v-icon>mdi-silverware</v-icon>
          <v-toolbar-title class="title-h6 font-weight-light pa-4 title-center"
            >Local hotspots</v-toolbar-title
          >
        </v-col>

        <v-divider vertical></v-divider>
        <v-col>
          <v-icon>mdi-silverware</v-icon>
          <v-toolbar-title class="title-h6 font-weight-light pa-4 title-center"
            >Local hotspots</v-toolbar-title
          >
        </v-col>

        <v-divider vertical></v-divider>
        <v-col>
          <v-icon>mdi-silverware</v-icon>

          <v-toolbar-title class="title-h6 font-weight-light pa-4 title-center"
            >Local hotspots</v-toolbar-title
          >
        </v-col>
      </v-toolbar>
    </v-row>
  </v-container>
</template>

<script>
//import axios from 'axios';
//import { mapGetters,} from 'vuex';

export default {
  name: "Recettes",
  data() {
    return {
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
    /* ...mapGetters([
      '',
    ]),*/

    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
  },
  beforeMount() {
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

    if (Classes) {
      Classes.forEach((classe) => {
        tableContenanceParClasse.push(classe.contenance);
      });
    }
    this.getAttendusEcolage(tableContenanceParClasse, tableEcolages);

    // préparation filtage inscrits récupération de tous leur montants et envoie pour le calcul
    let all_Eleves_Payed_InscReinsc = JSON.parse(
      localStorage.getItem("all_Eleves_Payed_InscReinsc")
    );
    console.log("test final");
    let AllMontantsInsc = [];
    let Inscrits = all_Eleves_Payed_InscReinsc.filter(
      (x) => x.typeFrais === "Inscriptions"
    );
    console.log("test final 2");
    if (Inscrits) {
      console.log("test final 3");
      Inscrits.forEach((eleve) => {
        AllMontantsInsc.push([eleve.montantFrais]);
      });
    }
    console.log("test final 4");
    this.items[
      this.items.findIndex((x) => x.caisse === "Inscriptions")
    ].totalAttendu = AllMontantsInsc.reduce((x, y) => x + y);
    console.log("test final 5");
    // préparation filtage réinscrits récupération de tous leur montants et envoie pour le calcul
    let AllMontantsReinsc = [];
    let Reinscrits = all_Eleves_Payed_InscReinsc.filter(
      (x) => x.typeFrais === "Réinscriptions"
    );

    if (Reinscrits.length > 0) {
      console.log("Réinscrit " + typeof Reinscrits);
      Reinscrits.forEach((eleve) => {
        AllMontantsReinsc.push([eleve.montantFrais]);
      });

      this.items[
        this.items.findIndex((x) => x.caisse === "Réinscriptions")
      ].totalAttendu = AllMontantsReinsc.reduce((x, y) => x + y);
    } else {
      this.items[
        this.items.findIndex((x) => x.caisse === "Réinscriptions")
      ].totalAttendu = "Pas de réinscrits";
    }

    let listeAutresFrais = JSON.parse(
      localStorage.getItem("Config_Autres_Frais")
    );
    this.getAttendusAutresFrais(listeAutresFrais, Classes);

    this.Config_InscReinsc = JSON.parse(
      localStorage.getItem("Config inscReinsc")
    );
    // this.getAllFraisForComptabilite();
  },
  methods: {
    //...mapActions(['',]),
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

      this.items[
        this.items.findIndex((x) => x.caisse === "Ecolage")
      ].totalAttendu = total.reduce((x, y) => x + y);
      // ecolage.totalAttendu =
      console.log("Yes");
    },

    getAttendusAutresFrais(listeAutresFrais, Classes) {
      // recup AutresFrais, affectation montantsFrais avec les effectifs des élèves qui doivent les payer
      console.log("AutresFrais " + JSON.stringify(listeAutresFrais));

      let contenancesPropresAuxIdsClasses = [];

      console.log("test final");

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
            "\ncontenancesPropresAuxIdsClasses" +
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
        console.log(
          "resultats for " +
            element.identifiant +
            " = " +
            JSON.stringify(resultats)
        );
        this.items[
          this.items.findIndex((x) => x.caisse === element.identifiant)
        ].totalAttendu = resultats.reduce((x, y) => x + y);
      });

      /* console.log(
        "montantAvecSesContenances ========== " +
          JSON.stringify(montantAvecSesContenances)
      );
      let resultats = [];
      montantAvecSesContenances.forEach((element) => {
        if (element[2].length > 1) {
          element[2].forEach((el2) => {
            resultats.push({
              identifiant: element[0],
              totalAttendu: el2 * element[1],
            });
          });
        } else {
          resultats.push({
            identifiant: element[0],
            totalAttendu: element[1] * element[2],
          });
        }
      });

      console.log(
        "Tableau contenant le calcul qui se rapporte à chaque Autre frais " +
          JSON.stringify(resultats) +
          "\t Resultat total " //+
        // JSON.stringify(resultats.reduce((x, y) => x + y))
      );

      const sumallAssurance = resultats
        .map((item) => item.totalAttendu)
        .reduce((prev, curr) => prev + curr, 0);
      console.log(sumallAssurance);

      // console.log(JSON.stringify(result));
      // resultats.forEach(element => {

      // });
      this.items[
        this.items.findIndex((x) => x.caisse === "Assurance")
      ].totalAttendu = sumallAssurance;*/
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
