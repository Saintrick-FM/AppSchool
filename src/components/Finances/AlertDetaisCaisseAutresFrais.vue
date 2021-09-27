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
    };
  },

  beforeMount() {
    this.autreFraisWithDetails = this.AutresFraisWithContenanceMontant;

    this.Classes = this.Config_Autres_Frais.find(
      (frais) => frais.identifiant === this.caisseClique.caisse
    ).classesSpeciales;

    console.log(
      "autreFraisWithDetails ******====" +
        JSON.stringify(this.autreFraisWithDetails) +
        "\nAutresFraisWithContenanceMontant ===" +
        JSON.stringify(this.AutresFraisWithContenanceMontant)
    );
  },

  methods: {},
  computed: {
    ...mapGetters(["caisseClique"]),
    ...mapGetters(["allInscrits"]),
    ...mapGetters(["allReinscrits"]),
    ...mapGetters(["attenduReinscription"]),
    ...mapGetters(["attenduInscription"]),
    ...mapGetters(["AutresFraisWithContenanceMontant"]),

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
