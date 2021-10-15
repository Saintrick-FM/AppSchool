<template>
  <div>
    <v-alert
      type="info"
      color="cyan"
      elevation="2"
      border="top"
      transition="scale-transition"
      icon="mdi-home"
      dismissible
    >
      <h2 class="black--text text-uppercase" style="margin-left:460px">
        Détails de la caisse {{ caisseClique.caisse }}
      </h2>
      <v-row class="text-center">
        <v-col md="4">
          <v-card elevation="11" class="pt-10">
            <h2 class="purple--text text-uppercase">Attendus</h2>
            <v-divider color="purple" class="mt-2"></v-divider>

            <v-form
              ref="form"
              lazy-validation
              class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
            >
              <v-row>
                <!-- 1ere ligne affichant les   -->
                <v-card>
                  <v-chip label color="primary" text-color="white">
                    <v-icon left>mdi-check</v-icon> Total
                    {{ caisseClique.caisse }} / frais
                    {{ caisseClique.caisse }} par classe
                  </v-chip>

                  <v-tabs
                    v-model="tab"
                    center-active
                    background-color="primary"
                    dark
                  >
                    <v-tab v-for="item in Classes" :key="item.identifiant">
                      {{ item.identifiant }}
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in Classes" :key="item.identifiant">
                      <v-card flat>
                        <v-card-text>
                          <span
                            style="color:black;font-weight: bold; text-decoration: underline;"
                            >{{ caisseClique.caisse }} :</span
                          >

                          {{ inscritsOrReinscrits }}
                          <span
                            style="color:black;font-weight: bold; text-decoration: underline; padding-left:10px"
                            >Frais {{ caisseClique.caisse }}:</span
                          >
                          {{ fraisInscOrReinsc }}
                        </v-card-text>

                        <v-btn x-large block color="primary">
                          <span
                            class="white--text"
                            style="text-transform: capitalize; width:380px"
                          >
                            {{ item.identifiant }} (
                            {{ inscritsOrReinscrits }}*{{ fraisInscOrReinsc }} )
                            =
                            {{
                              Number(
                                inscritsOrReinscrits * fraisInscOrReinsc
                              ).toLocaleString()
                            }}
                            FCFA
                          </span>
                        </v-btn>
                      </v-card>
                      <v-divider></v-divider>
                      <v-divider></v-divider>
                      <v-btn x-large block color="primary">
                        <span
                          class="white--text"
                          style="text-transform: capitalize; width:400px; "
                          >Somme totale =
                          <v-chip color="green">
                            {{ totalToShow }} FCFA / année</v-chip
                          >
                        </span>
                      </v-btn>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
        <!-- Partie affiche des détails des frais d'inscriptions et de réinscriptions perçus  -->
        <v-col md="4">
          <v-card elevation="11" class="pt-10">
            <h2 class="purple--text text-uppercase">Perçus</h2>

            <v-divider color="purple" class="mt-2"></v-divider>

            <v-form
              ref="form"
              lazy-validation
              class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
            >
              <v-row>
                <!-- 1ere ligne affichant les   -->
                <v-card>
                  <v-chip label color="primary" text-color="white">
                    <v-icon left>mdi-check</v-icon> Recapitulatif
                  </v-chip>

                  <v-tabs
                    v-model="tab"
                    center-active
                    background-color="primary"
                    dark
                  >
                    <v-tab v-for="item in Classes" :key="item.identifiant">
                      {{ item.identifiant }}
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in Classes" :key="item.identifiant">
                      <v-card flat>
                        <!-- <v-card-text>
                          <span
                            style="color:black;font-weight: bold; text-decoration: underline;"
                            >{{ caisseClique.caisse }} :</span
                          >

                          {{ inscritsOrReinscrits }}
                          <span
                            style="color:black;font-weight: bold; text-decoration: underline; padding-left:10px"
                            >Frais {{ caisseClique.caisse }}:</span
                          >
                          {{ fraisInscOrReinsc }}
                        </v-card-text> -->

                        <v-data-table
                          :headers="
                            caisseClique.caisse === 'Inscriptions'
                              ? inscHeader
                              : reinscHeader
                          "
                          :items="eachClasseDetailsInscReinsc"
                          :search="search"
                          role="button"
                          class="elevation-1"
                          disable-pagination
                          hide-default-footer
                          disable-filtering
                        >
                          <template v-slot:header.total="{ header }">
                            <v-chip color="primary">
                              {{ header.text }}
                            </v-chip>
                          </template>
                        </v-data-table>
                        <!-- <v-btn x-large block color="primary">
                          <span
                            class="white--text"
                            style="text-transform: capitalize; width:380px"
                          >
                            {{ item.identifiant }} (
                            {{ inscritsOrReinscrits }}*{{ fraisInscOrReinsc }} )
                            =
                            {{
                              Number(
                                inscritsOrReinscrits * fraisInscOrReinsc
                              ).toLocaleString()
                            }}
                            FCFA
                          </span>
                        </v-btn> -->
                      </v-card>
                      <v-divider></v-divider>
                      <v-divider></v-divider>
                      <v-btn x-large block color="primary">
                        <span
                          class="white--text"
                          style="text-transform: capitalize; width:400px; "
                          >Somme totale =
                          <v-chip color="green">
                            {{
                              caisseClique.caisse !== "Inscriptions"
                                ? allPercuReinscriptionToShow
                                : allPercuInscriptionToShow
                            }}
                            FCFA / année</v-chip
                          >
                        </span>
                      </v-btn>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
              </v-row>
            </v-form>
          </v-card>
        </v-col>

        <v-col md="4">
          <v-card elevation="11" class="pt-10">
            <h2 class="purple--text text-uppercase">Reste</h2>

            <v-divider color="purple" class="mt-2"></v-divider>

            <v-form
              ref="form"
              lazy-validation
              class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
            >
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Période congés 1er trimestre "
                    outlined
                    shaped
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Période congés 2e trimestre"
                    readonly
                    disabled
                    outlined
                    shaped
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Date début de vacances (élèves)"
                    readonly
                    disabled
                    type="date"
                    filled
                    shaped
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Date début de vacances (personnel)"
                    readonly
                    disabled
                    type="date"
                    filled
                    shaped
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { EventBus } from "@/event-bus.js";
export default {
  data() {
    return {
      search: null,
      Classes: JSON.parse(localStorage.getItem("Classes")),
      ClassesEtFraisInscriptions: null,
      tab: 0,
      Config_inscReinsc: null,
      AllElevesPayedInscription: [],
      AllElevesPayedReinscription: [],
      inscHeader: [
        {
          text: "Total Inscrits",
          align: "start",
          sortable: true,
          value: "total",
        },
        // { text: "Période", value: "periode" },
        { text: "Frais Unitaire", value: "fraisUnitaire" },
        { text: "Total Perçus", value: "totalPercus" },
      ],

      reinscHeader: [
        {
          text: "Total Réinscrits",
          align: "start",
          sortable: true,
          value: "total",
        },
        // { text: "Période", value: "periode" },
        { text: "Frais Unitaire", value: "fraisUnitaire" },
        { text: "Total Perçus", value: "totalPercus" },
      ],
      items: [],
    };
  },

  beforeMount() {
    console.log("Atention 🧑 ");
    this.Config_inscReinsc = JSON.parse(
      localStorage.getItem("Config inscReinsc")
    );
    let all_Eleves_Payed_InscReinsc = JSON.parse(
      localStorage.getItem("all_Eleves_Payed_InscReinsc")
    );
    this.AllElevesPayedInscription = all_Eleves_Payed_InscReinsc[0];
    this.AllElevesPayedReinscription = all_Eleves_Payed_InscReinsc[1];

    // console.log("allNouveaux ===" + JSON.stringify(this.allRedoublants));
  },
  updated() {
    console.log("this.tab ********** " + this.tab);
    if (this.tab === null) {
      console.log(this.Classes[0].identifiant);
      this.tab = this.Classes[0].identifiant;
    }
  },
  methods: {},
  computed: {
    ...mapGetters(["caisseClique"]),
    ...mapGetters(["allNouveaux"]),
    ...mapGetters(["allRedoublants"]),
    ...mapGetters(["attenduReinscription"]),
    ...mapGetters(["attenduInscription"]),
    ...mapGetters(["allPercuReinscriptionToShow"]),
    ...mapGetters(["allPercuInscriptionToShow"]),
    totalToShow() {
      if (this.caisseClique.caisse === "Réinscriptions") {
        return Number(this.attenduReinscription).toLocaleString();
      } else {
        return Number(this.attenduInscription).toLocaleString();
      }
    },
    totalAllPercuReinscriptionToShow() {
      if (this.caisseClique.caisse === "Réinscriptions") {
        return this.allPercuReinscriptionToShow.toLocaleString();
      } else {
        return this.allPercuInscriptionToShow.toLocaleString();
      }
    },
    inscritsOrReinscrits() {
      if (this.caisseClique.caisse === "Réinscriptions") {
        if (this.allRedoublants.length < 1) {
          return 0;
        } else {
          return this.allRedoublants.filter(
            (x) => x.classe === this.Classes[this.tab].identifiant
          ).length;
        }
      } else {
        if (this.allNouveaux.length < 1) {
          return 0;
        } else {
          // trie dans la liste de tous les inscrits de l'Ecole s'il y'a un inscrit de la classe cliqué et renvoie le total
          if (
            this.allNouveaux.find(
              (inscrit) => inscrit.classe === this.Classes[this.tab].identifiant
            )
          ) {
            return this.allNouveaux.filter(
              (x) => x.classe === this.Classes[this.tab].identifiant
            ).length;
          } else {
            return 0;
          }
        }
      }
    },

    fraisInscOrReinsc() {
      if (this.caisseClique.caisse === "Réinscriptions") {
        return this.Config_inscReinsc.find(
          (x) => x.classe === this.Classes[this.tab].identifiant
        ).fraisReinscription;
        // si la caisse cliquée est Inscriptions
      } else {
        return this.Config_inscReinsc.find(
          (x) => x.classe === this.Classes[this.tab].identifiant
        ).fraisInscription;
      }
    },
    eachClasseDetailsInscReinsc() {
      if (this.caisseClique.caisse === "Inscriptions") {
        let fraisInscription = this.Config_inscReinsc.find(
          (x) => x.classe === this.Classes[this.tab].identifiant
        ).fraisInscription;

        // ici je ne fais la recherche de l'inscrit de la salle cliquée que s'il y'a au moins 1 inscrit dans toute la grande liste
        let eachClasseInscrits = null;
        this.AllElevesPayedInscription.length > 0
          ? (eachClasseInscrits = this.AllElevesPayedInscription.filter(
              (x) => x.classe === this.Classes[this.tab].identifiant
            ))
          : eachClasseInscrits;

        // s'il y'a au moins 1 élève ayant payé l'inscription dans la classe cliquée
        if (eachClasseInscrits) {
          return [
            {
              total: eachClasseInscrits.length,
              fraisUnitaire: fraisInscription,
              totalPercus: eachClasseInscrits.length * fraisInscription,
            },
          ];
        } else {
          return [
            {
              total: 0,
              fraisUnitaire: fraisInscription,
              totalPercus: 0,
            },
          ];
        }
      } else {
        // si la caisse cliquée est Rénscriptions
        return [
          {
            total: 0,
            fraisUnitaire: 0,
            totalPercus: 0,
          },
        ];
      }
    },
  },
};
EventBus.$on("AlertDetailsCaisseInscReinsc", showAlert);
function showAlert(item) {
  console.log(
    `item cliqué dans AlertDetails...vue =  + ${JSON.stringify(item)}`
  );
}
</script>

<style></style>
