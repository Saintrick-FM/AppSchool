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
import axios from "axios";
export default {
  created: function() {
    this.getData();
  },
  data() {
    return {
      search: "",
      items: [],
      headers: [
        {
          text: "url Matière",
          align: "left",
          sortable: false,
          value: "name",
        },
        { text: "Album ID", value: "albumId" },
        { text: "ID", value: "id" },
        { text: "Title", value: "title" },
        { text: "URL", value: "url" },
      ],
    };
  },
  methods: {
    getData: function() {
      axios
        .get("https://jsonplaceholder.typicode.com/photos")
        .then((res) => {
          this.items = res.data;
        })
        .catch((err) => console.log(err));
      console.log("les 5000 données sont =>" + this.items);
    },
  },
};
</script>

<style lang="scss" scoped></style>
