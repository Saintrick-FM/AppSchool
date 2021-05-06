<template>
  <v-card>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" :search="search">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.albumId }}</td>
        <td class="text-xs-right">{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.url }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
import mapGetters from "vuex";
//import axios from "axios";
export default {
  name: "TestCode",
  created: function() {
    this.getData();
  },
  data() {
    return {
      search: "",
      items: [],
      matieres: [],
      headers: [
        {
          text: "url Matière",
          align: "left",
          sortable: false,
          value: "url",
        },
        { text: "Album ID", value: "url" },
        { text: "ID", value: "id" },
        { text: "Title", value: "title" },
        { text: "URL", value: "url" },
      ],
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["allMatieres"]),
  },

  methods: {
    getData: function() {
      this.matieres = this.allMatieres;
    },
  },
};
</script>

<style lang="scss" scoped></style>
