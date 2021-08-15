<template lang="">
  <v-tooltip app bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn route to="/finances" v-bind="attrs" v-on="on"> Finances</v-btn>
    </template>
    <span>Savoir tout à propos des finances</span>
  </v-tooltip>
</template>
