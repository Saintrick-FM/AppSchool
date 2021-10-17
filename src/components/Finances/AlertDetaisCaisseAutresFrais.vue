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
                    <v-icon left>mdi-check</v-icon> Contenance/ montant Frais
                    (par classe)
                  </v-chip>

                  <v-tabs
                    v-model="tab"
                    center-active
                    background-color="primary"
                    dark
                  >
                    <v-tab
                      v-for="item in AutresFraisWithContenanceMontant.classesSpeciales"
                      :key="item"
                    >
                      {{ item }}
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item
                      v-for="item in AutresFraisWithContenanceMontant.classesSpeciales"
                      :key="item"
                    >
                      <v-card flat>
                        <v-card-text>
                          <span
                            style="color:black;font-weight: bold; text-decoration: underline;"
                            >Contenance :</span
                          >

                          {{ EachContenance }} élèves
                          <span
                            style="color:black;font-weight: bold; text-decoration: underline; padding-left:10px"
                            >Frais {{ caisseClique.caisse }}:</span
                          >
                          {{ fraisAutreFrais }} FCFA
                        </v-card-text>

                        <v-btn x-large block color="primary">
                          <span
                            class="white--text"
                            style="text-transform: capitalize; width:380px"
                          >
                            {{ item }} ( {{ EachContenance }}*{{
                              fraisAutreFrais
                            }}
                            ) =
                            {{
                              Number(
                                EachContenance * fraisAutreFrais
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

        <!-- Partie qffichage des percus -->
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
                      {{ item }}
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in Classes" :key="item">
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
                          :headers="tableHeader"
                          :items="
                            caisseClique.caisse === 'Ecolage'
                              ? eachClasseDetailsEcolage
                              : eachClasseDetailsAutresFrais
                          "
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
                            {{ totalPercuEachCaisse }}
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
      search: "",
      Config_Autres_Frais: JSON.parse(
        localStorage.getItem("Config_Autres_Frais")
      ),
      allPayedInscReinsc: JSON.parse(
        localStorage.getItem("all_Eleves_Payed_InscReinsc")
      ),
      Classes: null,
      ClassesEtFraisInscriptions: null,
      tab: 0,
      Config_inscReinsc: null,
      autreFraisWithDetails: null,
      tableHeader: [
        {
          text: "Elèves ayant payé",
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
    this.autreFraisWithDetails = this.AutresFraisWithContenanceMontant;

    this.Classes = this.Config_Autres_Frais.find(
      (frais) => frais.identifiant === this.caisseClique.caisse
    ).classesSpeciales;

    console.log("this.Classes ******====" + JSON.stringify(this.Classes));
  },

  methods: {},
  computed: {
    ...mapGetters([
      "caisseClique",
      "allInscrits",
      "allReinscrits",
      "attenduReinscription",
      "attenduInscription",
      "AutresFraisWithContenanceMontant",
      "totalPercuAutresFrais",
    ]),
    totalPercuEachCaisse() {
      if (this.caisseClique.caisse !== "Ecolage") {
        return this.totalPercuAutresFrais.find(
          (x) => x.typeFrais === this.caisseClique.caisse
        ).totalPercu;
      } else {
        return 0;
      }
    },

    eachClasseDetailsAutresFrais() {
      let Config_Autres_Frais = JSON.parse(
        localStorage.getItem("Config_Autres_Frais")
      );
      let montantAutreFrais = Config_Autres_Frais.find(
        (x) => x.identifiant === this.caisseClique.caisse
      ).montant;
      console.log("✈ ✈ montantAutreFrais " + montantAutreFrais);

      // ici je ne fais la recherche de l'inscrit de la salle cliquée que s'il y'a au moins 1 inscrit dans toute la grande liste

      let AllElevesPayedAutreFrais = JSON.parse(
        localStorage.getItem(`All_Percus_${this.caisseClique.caisse}`)
      );
      console.log(
        "AllElevesPayedAutreFrais " + JSON.stringify(AllElevesPayedAutreFrais)
      );
      let elevesPayedAutresInClasse = null;

      AllElevesPayedAutreFrais.length > 0
        ? (elevesPayedAutresInClasse = AllElevesPayedAutreFrais.filter(
            (x) => x.classe === this.Classes[this.tab]
          ))
        : elevesPayedAutresInClasse;

      // s'il y'a au moins 1 élève ayant payé l'inscription dans la classe cliquée

      if (elevesPayedAutresInClasse) {
        return [
          {
            total: elevesPayedAutresInClasse.length,
            fraisUnitaire: montantAutreFrais,
            totalPercus: elevesPayedAutresInClasse.length * montantAutreFrais,
          },
        ];
      } else {
        return [
          {
            total: 0,
            fraisUnitaire: montantAutreFrais,
            totalPercus: 0,
          },
        ];
      }
    },
    eachClasseDetailsEcolage() {
      return [
        {
          total: 0,
          fraisUnitaire: 5000,
          totalPercus: 0,
        },
      ];
    },

    totalToShow() {
      return Number(
        this.AutresFraisWithContenanceMontant.totalAttendu
      ).toLocaleString();
    },
    EachContenance() {
      return this.AutresFraisWithContenanceMontant.contenanceClassesSpeciales[
        this.tab
      ];
    },

    fraisAutreFrais() {
      return this.AutresFraisWithContenanceMontant.montant;

      /*  if (this.caisseClique.caisse === "Réinscriptions") {
        return this.Config_inscReinsc.find(
          (x) => x.classe === this.Classes[this.tab].identifiant
        ).fraisReinscription;
        // si la caisse cliquée est Inscriptions
      } else {
        return this.Config_inscReinsc.find(
          (x) => x.classe === this.Classes[this.tab].identifiant
        ).fraisInscription;
      }*/
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
