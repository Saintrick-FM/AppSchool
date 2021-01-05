<template>
  <!-- Contenu a afficher comme main-->
  <h1>{{ msg }}</h1>
</template>

<script>
export default {
  name: "MainHome",
  props: {
    msg: String,
  },
};
</script>
