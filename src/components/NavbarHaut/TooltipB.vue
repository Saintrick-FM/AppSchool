<template lang="">
  <v-tooltip app bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn route to="/eleves" :disabled="disabled" v-bind="attrs" v-on="on">
        Eleves</v-btn
      >
    </template>
    <span>Savoir tout à propos des Elèves</span>
  </v-tooltip>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      disabled: false,
    };
  },
  beforeMount() {
    if (localStorage.getItem("allParamsDone") === "Vrai") {
      console.log("Paramètres finalisés");
      // document.getElementById("btn-right").addEventListener("mouseover");
    } else {
      console.log("Paramètres à définir");
      this.disabled = true;
    }
  },
};
</script>

<style></style>
