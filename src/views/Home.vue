<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Squelette/>
    <h1>Bienvenu sur la page d'accueil (home) du logiciel</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import Squelette from '@/components/Squelette.vue'

export default {
  name: 'Home',
  components: {
    Squelette
  }
}
</script>
