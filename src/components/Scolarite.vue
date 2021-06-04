<template>
  <v-row>
    <v-col md="2" scrollable>
      <mini-liste-eleves @eleveChoisi="AfficheEleve" />
    </v-col>
    <v-col elevation="5" md="10">
      <v-row>
        <v-card>
          <v-card-title>
            <span class="headline">{{ eleve.nom }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-row>
                <v-col md="4">
                  <v-text-field
                    prepend-icon="mdi-calendar-range"
                    :value="eleve.dateLieuNaissance"
                    label="Date et lieu de naissance"
                    outlined
                    filled
                    readonly
                  ></v-text-field>
                </v-col>

                <v-col md="4">
                  <v-text-field
                    prepend-icon="mdi-book-variant"
                    :value="eleve.classe"
                    label="Classe"
                    outlined
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col md="4">
                  <v-text-field
                    filled
                    outlined
                    :value="eleve.redoublant"
                    label="Nouveau ou Redoublant ?"
                    prepend-icon="mdi-reply-all-outline"
                    readonly
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <!-- this.eleve.nom = eleveChoisi[1];
      this.eleve.sexe= eleveChoisi[2]
      this.eleve.dateLieuNaissance= eleveChoisi[2]
      this.eleve.adresse= eleveChoisi[3]
      this.eleve.tuteur= eleveChoisi[11]
      this.eleve.telTuteur= eleveChoisi[12]
      this.eleve.redoublant= eleveChoisi[14]
      this.eleve.classe= eleveChoisi[15]       -->
              <v-divider> </v-divider>
              <v-row justify-space-around>
                <v-col md="4">
                  <v-text-field
                    :value="eleve.tuteur"
                    append-icon="mdi-human-male-boy"
                    prepend-icon="mdi-human-male-boy"
                    label="Tuteur"
                    readonly
                  >
                  </v-text-field>
                </v-col>
                <v-col md="3">
                  <v-text-field
                    :value="eleve.telTuteur"
                    prepend-icon=" mdi-phone"
                    label="Téléphone du tuteur"
                    readonly
                  >
                  </v-text-field>
                </v-col>
                <v-col md="5">
                  <v-text-field
                    :value="eleve.adresse"
                    prepend-icon="mdi-map-marker"
                    label="Adresse"
                    readonly
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import MiniListeEleves from "@/components/MiniListeEleves.vue";
export default {
  data() {
    return {
      eleve: {
        nom: "",
        sexe: null,
        dateLieuNaissance: "",
        adresse: "",
        nationalite: "",
        etatSanitaire: null,
        ecoleDorigine: "",
        nomMaman: "",
        telMaman: "",
        nomPapa: "",
        telPapa: "",
        tuteur: "",
        telTuteur: "",
        emailTuteur: "",
        redoublant: null,
        classe: null,
      },
    };
  },
  components: {
    MiniListeEleves,
  },
  methods: {
    AfficheEleve() {
      // console.log("Francy " + eleveChoisi.nom + " " + eleveChoisi.classe);

      /* let eleveChoisi = String(
        localStorage.getItem("eleveChoisi")
      ); .split(",");*/
      // console.log(localStorage.getItem("eleveChoisi")[1]);
      // this.eleve.nom = eleveChoisi[1];
      // this.eleve.sexe = eleveChoisi[2];
      // this.eleve.dateLieuNaissance = eleveChoisi[3];
      // this.eleve.adresse = eleveChoisi[4];
      // this.eleve.tuteur = eleveChoisi[12];
      // this.eleve.telTuteur = eleveChoisi[13];
      // this.eleve.redoublant = eleveChoisi[15];
      // this.eleve.classe = eleveChoisi[16];

      let eleveChoisi = JSON.parse(localStorage.getItem("eleveChoisi"));
      console.log("console.log = " + eleveChoisi);
      this.eleve.nom = eleveChoisi.nom;
      this.eleve.sexe = eleveChoisi.sexe;
      this.eleve.dateLieuNaissance = eleveChoisi.dateLieuNaissance;
      this.eleve.adresse = eleveChoisi.adresse;
      this.eleve.tuteur = eleveChoisi.tuteur;
      this.eleve.telTuteur = eleveChoisi.telTuteur;
      this.eleve.redoublant = eleveChoisi.redoublant;
      this.eleve.classe = eleveChoisi.classe;
    },
  },
};
</script>

<style></style>
