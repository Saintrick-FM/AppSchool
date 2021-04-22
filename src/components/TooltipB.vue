<template lang="">
  <v-tooltip app bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn flat route to="/" v-bind="attrs" v-on="on"> Connexion </v-btn>
    </template>
    <span>Savoir tout à propos des Elèves</span>
  </v-tooltip>
</template>
