<template lang="">
  <v-tooltip app bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn route to="/finances" :disabled="disabled" v-bind="attrs" v-on="on">
        Finances</v-btn
      >
    </template>
    <span>Savoir tout à propos des finances</span>
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
    if (localStorage.getItem("allParamsDone") === "true") {
      console.log("Paramètres finalisés");
      // document.getElementById("btn-right").addEventListener("mouseover");
    } else {
      console.log("Paramètres à définir");
      // this.disabled = true;
    }
  },
};
</script>
