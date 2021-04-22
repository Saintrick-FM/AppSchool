<template lang="">
  <v-tooltip app bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn flat route to="/finances" v-bind="attrs" v-on="on">
        Enseignants
      </v-btn>
    </template>
    <span>Savoir tout à propos des enseignants</span>
  </v-tooltip>
</template>
