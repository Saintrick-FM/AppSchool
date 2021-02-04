<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="year"
        label="Année scolaire"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="year"
      @click:year="saveYear(year)"
      reactive
      no-title
      type="year"
    ></v-date-picker>

    <!-- <v-date-picker
      ref="picker"
      v-model="date"
      :max="new Date().toISOString().substr(0, 10)"
      min="1950-01-01"
      @change="save"
    ></v-date-picker> -->
  </v-menu>
</template>

<script>
export default {
  name: "yearPicker",
  data: () => ({
    year: null,
    menu: false,
  }),
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  methods: {
    saveYear(year) {
      const yearformat = year.slice(0, 4);
      const ajout = parseInt(yearformat) + 1;
      this.$refs.menu.save(yearformat);
      this.year = yearformat.concat("-", ajout);

      // Reset activePicker to type YEAR
      this.$refs.picker.activePicker = "YEAR";

      // Close the menu/datepicker
      this.menu = false;
    },
  },
};
</script>
<style lang=""></style>
