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
export default {
  name: "Recettes",
  data() {
    return {
      expanded: [],
      singleExpand: false,
      search: null,
      dessertHeaders: [
        {
          text: "Caisse",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Attendus", value: "calories" },
        { text: "Perçus", value: "fat" },
        { text: "Reste", value: "carbs" },
        { text: "Report", value: "protein" },
        { text: "Total actuel", value: "iron" },
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
      lorem:
        "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam.",
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
      periode: ["Cette semaine", "Ce mois", "Ce trimestre"],
      categorie: [
        "Caisse ayant le plus de perçus",
        "Caisse ayant le plus de non-perçus",
        "Caisse ayant le plus d'avances",
      ],
      items: [
        {
          name: "Inscriptions/Réinscriptions",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%",
        },
        {
          name: "Frais Scolaires",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%",
        },
        {
          name: "Assurances",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%",
        },
        {
          name: "Tenu EPS",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%",
        },
        {
          name: "Macarons",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%",
        },
        {
          name: "Dossiers Examens",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%",
        },
      ],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
  },
  beforeMount() {
    this.getAllFraisForComptabilite();
  },
  methods: {
    getAllFraisForComptabilite() {
      let configFrais = JSON.parse(localStorage.getItem("Frais"));
      let typesFrais = [];
      configFrais.forEach((frais) => {
        typesFrais.push(frais.frais);
      });
      console.log(typesFrais);
      configFrais.push();
      this.$store.dispatch("actionGetAllFraisForCompta", typesFrais);
    },
  },
};
</script>
