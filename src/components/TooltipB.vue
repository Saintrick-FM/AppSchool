<template lang="">
  <v-tooltip app bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn route to="/" v-bind="attrs" v-on="on"> Eleves</v-btn>
    </template>
    <span>Savoir tout à propos des Elèves</span>
  </v-tooltip>
</template>
