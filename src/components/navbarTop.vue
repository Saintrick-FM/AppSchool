<template lang="">
<v-app>    
    <v-navigation-drawer v-model="drawer" app>
        <v-list>
            <v-list-item class="px-2">
            <v-list-item-avatar>
                <v-img src="@/assets/logo.svg"></v-img>
            </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
            <v-list-item-content>
                <v-list-item-title class="title"> Ecole Saint Martin </v-list-item-title>
                <v-list-item-subtitle>Amour, Travail, Réus </v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>

        <RubriqueNav />
        </v-navigation-drawer>

        <v-app-bar class="appbar" app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar>
            <v-toolbar-title>Ecole Saint Martin</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn flat route to="/about" v-bind="attrs" v-on="on"> Enseignants </v-btn>
                    </template>
                    <span>Savoir tout à propos des enseignants</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn flat route to="/" v-bind="attrs" v-on="on"> Elèves </v-btn>
                    </template>
                    <span>Savoir tout à propos des Elèves</span>
                </v-tooltip>
                
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn flat route to="/login" v-bind="attrs" v-on="on"> Personnel </v-btn>
                    </template>
                    <span>Savoir tout à propos du Personnel</span>
                </v-tooltip>
            </v-toolbar-items>
        </v-toolbar>
        </v-app-bar>
    </v-app>
</template>
<script>
import RubriqueNav from "@/components/RubriqueNav";
export default {
  name: "App",
  components: {
    RubriqueNav,
  },
  data: () => ({
    //
    drawer: null,
    
})
}
</script>
<style lang="">
    
</style>