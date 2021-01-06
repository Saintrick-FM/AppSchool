<template>
  <v-container fluid>
    <Squelette />
    <h1>This is an about page</h1>
  </v-container>
</template>
<script>
// @ is an alias to /src
import Squelette from "@/components/Squelette.vue";

export default {
  name: "About",
  components: {
    Squelette,
  },
};
</script>
