<template>
  <v-row>
    <v-col md="2" scrollable>
      <mini-liste-eleves @eleveChoisi="AfficheEleve" />
    </v-col>
    <v-col elevation="5" md="10">
      <v-row>
        <v-card>
          <v-card-title>
            <span class="headline" color="primary" id="nomEleve">{{
              eleve.nom
            }}</span>
          </v-card-title>
          <v-row>
            <!-- rubriaue infos civiles de l'élève qui paie -->
            <v-col md="5">
              <v-card-text>
                <v-container grid-list-md>
                  <v-row>
                    <v-col md="6">
                      <v-text-field
                        prepend-icon="mdi-calendar-range"
                        :value="eleve.dateLieuNaissance"
                        label="Date et lieu de naissance"
                        outlined
                        filled
                        readonly
                      ></v-text-field>
                    </v-col>

                    <v-col md="6">
                      <v-text-field
                        prepend-icon="mdi-book-variant"
                        :value="eleve.classe"
                        label="Classe"
                        outlined
                        filled
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col md="6">
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
            </v-col>

            <!-- rubriaue gestion des mois payés -->
            <v-col md="7">
              <v-card-text>
                <v-container grid-list-md>
                  <!-- raw affichant les mois payés ou impayés -->
                  <v-row>
                    <v-col>
                      <v-row justify="space-around">
                        <v-col>
                          <v-sheet elevation="10" class="py-4 px-1">
                            <v-row>
                              <v-col md="5" style="margin-left: 25px">
                                <v-chip
                                  label
                                  color="primary"
                                  text-color="white"
                                >
                                  <v-icon left
                                    >mdi-calendar-month-outline</v-icon
                                  >
                                  Mois payés / non payés
                                </v-chip>
                              </v-col>
                              <v-col md="2"> </v-col>
                              <!--
                              <v-col md="4" style="padding-right: 9px">
                                <v-chip label>
                                  <v-select
                                    v-model="optionDeTrie"
                                    chips
                                    :items="[
                                      'Tous les mois',
                                      'Mois payés',
                                      'Mois non-payés',
                                      'Mois avancés',
                                    ]"
                                    label="Trier par :"
                                  ></v-select>
                                </v-chip>
                              </v-col>
                              Tous les mois -->
                              <v-chip-group
                                v-if="shawAllMonths"
                                mandatory
                                active-class="primary--text"
                                center-active
                              >
                                <v-chip
                                  readonly
                                  outlined
                                  v-for="mois in mois"
                                  :key="mois"
                                >
                                  <v-icon :color="colorToShow">{{
                                    iconToShow
                                  }}</v-icon>
                                  {{ mois }}
                                </v-chip>
                              </v-chip-group>
                              <!-- Fin Tous les mois/ Debut Mois payés -->

                              <v-chip-group
                                v-if="shawPayedMonths == 'PayedMonths'"
                                mandatory
                                active-class="primary--text"
                                center-active
                              >
                                <v-chip
                                  readonly
                                  outlined
                                  v-for="moisPaye in MoisPaye"
                                  :key="moisPaye"
                                >
                                  <v-icon color="green">mdi-check</v-icon>
                                  {{ moisPaye }}
                                </v-chip>
                              </v-chip-group>
                              <!-- Fin payedMonths/ Debut Mois non-payés -->

                              <v-chip-group
                                v-if="shawNonPayedMonths === 'NonPayedMonths'"
                                mandatory
                                active-class="primary--text"
                                center-active
                              >
                                <v-chip
                                  readonly
                                  outlined
                                  v-for="moisNonPaye in MoisNonPaye"
                                  :key="moisNonPaye"
                                >
                                  <v-icon color="red">mdi-cancel</v-icon>
                                  {{ moisNonPaye }}
                                </v-chip>
                              </v-chip-group>
                              <!-- Fin nonPayedMonths/ Debut mois-Avancés -->
                              <v-chip-group
                                v-if="shawAvancedMonths === 'AdvancedMonths'"
                                mandatory
                                active-class="primary--text"
                                center-active
                              >
                                <v-chip
                                  readonly
                                  outlined
                                  v-for="moisAvance in moisAvance"
                                  :key="moisAvance"
                                >
                                  <v-icon color="orange"
                                    >mdi-currency-usd-off</v-icon
                                  >
                                  {{ moisAvance }}
                                </v-chip>
                              </v-chip-group>
                            </v-row>
                          </v-sheet>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-row style="margin-top: 15px">
                      <v-col md="6">
                        <v-text-field
                          prepend-icon="mdi-book-variant"
                          :value="eleve.classe"
                          label="Classe"
                          outlined
                          filled
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col md="6">
                        <v-text-field
                          :value="eleve.telTuteur"
                          prepend-icon=" mdi-phone"
                          label="Téléphone du tuteur"
                          readonly
                          filled
                          outlined
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-row>
                  <!-- fin raw affichant les mois payés ou impayés -->
                  <v-divider style="margin-bottom: 15px"> </v-divider>

                  <!-- raw autres details après le divider -->
                  <v-row justify-space-around>
                    <v-col md="6">
                      <v-text-field
                        :value="eleve.tuteur"
                        append-icon="mdi-human-male-boy"
                        prepend-icon="mdi-human-male-boy"
                        label="Tuteur"
                        readonly
                        filled
                        outlined
                      >
                      </v-text-field>
                    </v-col>

                    <v-col md="6">
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
            </v-col>
            <!-- fin rubriaue gestion des mois payés -->
          </v-row>
          <v-divider style="border-style:solid;"> </v-divider>
          <v-divider style="margin-top:1px; border-style:solid"> </v-divider>
          <v-row style="margin-top:10px;">
            <!-- partie paiement -->
            <v-card-text>
              <v-container grid-list-md>
                <v-sheet elevation="10" class="py-4 px-1">
                  <v-data-table
                    light
                    v-model="selected"
                    :headers="HeadersFrais"
                    :items="paiementFrais"
                    :single-select="singleSelect"
                    hide-default-footer
                    item-key="typeFrais"
                    show-select
                    loading="true"
                  >
                    <!-- <template v-slot:top>
                    <v-switch
                      v-model="singleSelect"
                      label="Choix unique"
                      class="pa-3"
                    ></v-switch>
                  </template> -->
                  </v-data-table>

                  <div class="text-center pt-2">
                    <v-btn @click.prevent="handleClick">Suivant</v-btn>
                  </div>
                  <v-alert
                    :value="alert"
                    color="deep-purple accent-4"
                    dark
                    border="top"
                    icon="mdi-cash-100"
                    transition="scale-transition"
                  >
                    <v-row>
                      <v-card-title color="" v-if="typeFraisApayer">
                        Paiement {{ typeFraisApayer }} par l'élève
                        <span style="margin-left:5px; color:black">
                          {{ eleve.nom }}</span
                        >
                      </v-card-title>
                    </v-row>
                    <v-row>
                      <v-col md="4">
                        <v-text-field
                          label="Montant à payer"
                          append-icon=""
                          v-model="montantApayer"
                          outlined
                          color
                        ></v-text-field>
                      </v-col>
                      <v-col md="4">
                        <v-text-field
                          label="Montant déjà payé"
                          append-icon=""
                          v-model="montantDejaPaye"
                          filled
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col md="4">
                        <v-text-field
                          label="Montant à Restant"
                          append-icon=""
                          v-model="montantRestant"
                          filled
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-divider class=""></v-divider>
                    <v-row>
                      <v-col>
                        <v-chip
                          label
                          color="primary"
                          type="button"
                          @click="alert = false"
                        >
                          <v-icon left>mdi-close-box-outline</v-icon>
                          Annuler
                        </v-chip></v-col
                      >
                      <v-col>
                        <v-chip
                          label
                          color="primary"
                          type="button"
                          @click="SaveFrais"
                        >
                          <v-icon left>mdi-content-save-move-outline</v-icon>
                          Enregistrer
                        </v-chip></v-col
                      >
                    </v-row>
                  </v-alert>
                </v-sheet>
              </v-container>
            </v-card-text>
          </v-row>
        </v-card>
      </v-row>
    </v-col>
    itti
  </v-row>
</template>

<script>
import MiniListeEleves from "@/components/MiniListeEleves.vue";
export default {
  data() {
    return {
      singleSelect: true,
      alert: false,
      selected: [],
      fraisChoisi: [],
      typeFraisApayer: undefined,
      montantApayer: undefined,
      montantDejaPaye: undefined,
      montantRestant: undefined,
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

      HeadersFrais: [
        { text: "Frais à payer", value: "typeFrais", sortable: true },
        { text: "Montant Frais", value: "montantFrais", sortable: true },
        { text: "Montant à payé", value: "montantApayer", sortable: true },
        { text: "Montant déjà payé", value: "montantDejaPaye", sortable: true },
        { text: "Montant restant", value: "montantRestant", sortable: true },
        { text: "Statut", value: "statut", sortable: true },
      ],
      paiementFrais: [
        {
          typeFrais: "Frais Annuel",
          montantFrais: "150000",
          montantApayer: "15000",
          montantDejaPaye: "14000",
          montantRestant: "1000",
          statut: "avancé",
        },
        {
          typeFrais: "Frais Trimesrtiel",
          montantFrais: "75000",
          montantApayer: "15000",
          montantDejaPaye: "14000",
          montantRestant: "1000",
          statut: "avancé",
        },
        {
          typeFrais: "Assurance",
          montantFrais: "2000",
          montantApayer: "2000",
          montantDejaPaye: "0",
          montantRestant: "1000",
          statut: "avancé",
        },
        {
          typeFrais: "Dossier d'examen",
          montantFrais: "15000",
          montantApayer: "15000",
          montantDejaPaye: "14000",
          montantRestant: "1000",
          statut: "avancé",
        },
        {
          typeFrais: "Macaron",
          montantFrais: "300",
          montantApayer: "300",
          montantDejaPaye: "14000",
          montantRestant: "1000",
          statut: "avancé",
        },
        {
          typeFrais: "Tenu d'eps",
          montantFrais: "15000",
          montantApayer: "15000",
          montantDejaPaye: "14000",
          montantRestant: "1000",
          statut: "avancé",
        },
      ],

      icon: "",
      optionDeTrie: "",
      shawAllMonths: undefined,
      shawPayedMonths: undefined,
      shawNonPayedMonths: undefined,
      shawAvancedMonths: undefined,
      mois: [
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre",
        "Janvier",
        "Fevrier",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
      ],
      MoisNonPaye: ["Juin", "Juillet", "Aout"],
      MoisPaye: [
        "Octobre",
        "Novembre",
        "Decembre",
        "Janvier",
        "Fevrier",
        "Mars",
      ],
      moisAvance: ["Avril", "Mai"],
    };
  },
  components: {
    MiniListeEleves,
  },
  computed: {
    iconToShow() {
      let ok = "mdi-check";
      let no = "mdi-cancel";
      return this.eleve.redoublant == "Nouveau" ? ok : no;
    },
    colorToShow() {
      return this.eleve.redoublant == "Nouveau" ? "green" : "red";
    },
  },
  watch: {
    // à chaque fois que la question change, cette fonction s'exécutera
    optionDeTrie: function(value) {
      this.InitialiseTrie(value);
    },
  },

  methods: {
    handleClick: function() {
      console.log("Elements sélectionnés" + JSON.stringify(this.selected));
      this.alert = true;
      if (this.selected.length > 0) {
        let typeFRAIS = this.selected[0].typeFrais;
        let montantDejaPaye = this.selected[0].montantDejaPaye;
        let montantRestant = this.selected[0].montantRestant;
        let statut = this.selected[0].statut;
        console.log(typeFRAIS);
        this.typeFraisApayer = typeFRAIS;
        this.montantDejaPaye = montantDejaPaye;
        this.montantRestant = montantRestant;
        this.statut = statut;
      }

      //item  - selected item
    },
    SaveFrais() {
      console.log("Frais enregistré");
      this.alert = false;
    },
    InitialiseTrie(value) {
      if (value === undefined) {
        // this.shawPayedMonth = false;
        // this.shawNonPayedMonth = false;
        // this.shawAvancedMonths = false;
        this.shawAllMonths = "AllMonths";
        console.log(
          "AllMonths par defaut. PayedMonths= " +
            this.shawPayedMonths +
            " NonPayedMonths= " +
            this.shawNonPayedMonths +
            " AvancedMonths= " +
            this.shawAvancedMonths
        );
      } else if (value === "Tous les mois") {
        this.shawAllMonths = "shawAllMonths";
        this.shawNonPayedMonths = false;
        this.shawAvancedMonths = false;
        this.shawPayedMonths = false;
        console.log(
          "PayedMonths choisi. AllMonths= " +
            this.shawAllMonths +
            " NonPayed= " +
            this.shawNonPayedMonths +
            " avancedPaye= " +
            this.shawAvancedMonths
        );
      } else if (value == "Mois payés") {
        this.shawAllMonths = false;
        this.shawNonPayedMonths = false;
        this.shawAvancedMonths = false;
        this.shawPayedMonths = "PayedMonths";
        console.log(
          "PayedMonths choisi. AllMonths= " +
            this.shawAllMonths +
            " NonPayed= " +
            this.shawNonPayedMonths +
            " avancedPaye= " +
            this.shawAvancedMonths
        );
      } else if (value == "Mois non-payés") {
        this.shawPayedMonth = false;
        this.shawAvancedMonths = false;
        this.shawAllMonths = false;
        this.shawNonPayedMonths = "NonPayedMonths";
        console.log(
          "NonPayedMonths choisi. AllMonths= " +
            this.shawAllMonths +
            " payed= " +
            this.shawPayedMonths +
            " avancedPaye= " +
            this.shawAvancedMonths
        );
      } else if (value == "Mois avancés") {
        console.log("Mois avancés");
        this.shawPayedMonth = false;
        this.shawAllMonths = false;
        this.shawNonPayedMonths = false;
        this.shawAvancedMonths = "AdvancedMonths";
        console.log(
          "AdvancedMonths choisi. AllMonths= " +
            this.shawAllMonths +
            " NonPayed= " +
            this.shawNonPayedMonths +
            " payedMonths= " +
            this.shawPayedMonths
        );
      } else {
        console.log("AllMonths par defaut mais non attendu. Value= " + value);

        this.shawPayedMonth = undefined;
        this.shawNonPayedMonth = undefined;
        this.shawAvancedMonths = undefined;
        this.shawAllMonths = undefined;
      }
    },
    AfficheEleve() {
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
      this.InitialiseTrie();
    },
  },
};
</script>

<style>
#nomEleve {
  margin: 0px 360px 0px 360px;
}
</style>
