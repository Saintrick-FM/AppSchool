import axios from 'axios'
const state = {

    eleveClique: null,
    AllFraisPayedByEleve: null,
    resultat: null,
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
    eachStudentDetailsScolarite: {
        moisPaye: null,
        FraisPayesWithDetails: null,
        moisAvance: null,
        FraisAvancesWithDetails: null,
        MoisNonPaye: [],
        shawPayedMonths: null,

        montantFraisMensuel: null,
        showInscription: null,
        prixReinscription: null,
        prixInscription: null,
        autresFraisPayesSaufInscReinsc: null,
        allFraisPayes: [],
        allFraisImpayes: null,
        paiementFrais: null,
        moisToShowWithoutPayedMonths: null,

    }


}
const actions = {

    async actionGetfinanceEleveDetail({ commit }, eleveChoisi) {

        const token = "Token " + localStorage.getItem("token");

        /* let allElevesPayedInscReinsc = JSON.parse(
          localStorage.getItem("all_Eleves_Payed_InscReinsc")
        );*/
        console.log("⏰ ⏰ ⏰ eleveChoisi " + JSON.stringify(eleveChoisi));

        if (token) {
            await axios
                .get(
                    `api/finances/paiementEveryFrais/?annee_scolaire=${this.anneeActuelle}&id=${eleveChoisi.eleveNumber}`, {
                        headers: {
                            Authorization: token,
                        },
                    }
                )
                .then((response) => {

                    // localStorage.setItem("Frais", result);
                    let AllFraisPayedByEleve = response.data;

                    console.log(
                        "😃😃😃 tous les frais payés de l'élève => " +
                        AllFraisPayedByEleve +
                        " " +
                        JSON.stringify(response.data)
                    );
                    localStorage.setItem(
                        "AllFraisPayedByEleve",
                        JSON.stringify(response.data)
                    );
                    console.log("ici là");

                    //s'il y'a une avance dans au moins un des paiements de l'élève
                    console.log("Ah c'est compliqué ");
                    let allMonthsPayed = [];
                    let FraisPayesWithDetails = [];

                    let MoisNonPaye = null;
                    let moisAvance = [];
                    let FraisAvancesWithDetails = [];
                    let MoisPaye = null;

                    AllFraisPayedByEleve.forEach((frais) => {
                        if (
                            frais.typeFrais === "Frais mensuels" &&
                            frais.statut === "avancé"
                        ) {
                            allMonthsPayed.push(
                                frais.mois
                                .split(",")
                                .slice(0, -1)
                                .toString()
                            );
                            FraisAvancesWithDetails.push(frais);

                            // this.moisAvance.push(frais.mois.split(",").pop());
                            moisAvance.push(frais.mois);
                            console.log("attention");

                            //si c'est un mois et que cest réglé
                        } else if (
                            frais.typeFrais === "Frais mensuel" &&
                            frais.statut !== "avancé"
                        ) {
                            allMonthsPayed.push(frais.mois.split(",").toString());
                            FraisPayesWithDetails.push(frais);
                        } else {
                            console.log("else malheureusement");
                        }
                    });
                    if (allMonthsPayed.length > 0 && this.moisAvance) {
                        console.log("non non non");
                        MoisPaye = allMonthsPayed.filter(this.trieMoisVides);
                        MoisNonPaye = this.trieMoisImpaye("moisPayeETavance");
                        localStorage.setItem("MoisPaye", this.MoisPaye);
                        localStorage.setItem("MoisNonPaye", this.MoisNonPaye);
                    }
                    if (allMonthsPayed.length > 0 && !this.moisAvance) {
                        // ce que j'affecte aux moisPaye vient du resultat de trie opéré par la methode //filter qui enlève les tableaux vides de MoisPaye car c'est un tableau de tableaux
                        MoisPaye = allMonthsPayed.filter(this.trieMoisVides);
                        MoisNonPaye = this.trieMoisImpaye("moisPaye");
                        console.log("non non non 2 ");
                        localStorage.setItem("MoisPaye", JSON.stringify(this.MoisPaye));
                        localStorage.setItem(
                            "MoisNonPaye",
                            JSON.stringiify(this.MoisNonPaye)
                        );
                    }
                    console.log("Ah c'est compliqué 2");
                    localStorage.setItem(
                        "Frais_Avancés_With_Details",
                        JSON.stringify(FraisAvancesWithDetails)
                    );
                    localStorage.setItem(
                        "Frais_Payés_With_Details",
                        JSON.stringify(FraisPayesWithDetails)
                    );
                    localStorage.setItem("moisAvance", JSON.stringify(this.moisAvance));

                    commit('setMoisPayesAvancesImpayes', { mois: { moisPaye: MoisPaye, FraisPayesWithDetails: FraisPayesWithDetails, moisAvance: moisAvance, FraisAvancesWithDetails: FraisAvancesWithDetails, MoisNonPaye: MoisNonPaye }, AllFraisPayedByEleve: response.data })

                })
                .catch(function(error) {
                    console.log("😢😢😢" + error);
                });

            state.eachStudentDetailsScolarite.shawPayedMonths = true;
            state.eachStudentDetailsScolarite.paiementFrais = state.eachStudentDetailsScolarite.allFraisImpayes
        }

    },

}
const mutations = {
    mutateEleveClique(state, eleveClique) {
        state.eleveClique = eleveClique


        // EventBus.eleveClique(eleveClique);
        let eleveChoisi = JSON.parse(localStorage.getItem("eleveChoisi"));
        let allElevesPayedInscReinsc = JSON.parse(
            localStorage.getItem("all_Eleves_Payed_InscReinsc")
        );

        let classes = JSON.parse(localStorage.getItem("Classes").split(","));

        state.eachStudentDetailsScolarite.montantFraisMensuel = classes.find(
            (x) => x.identifiant == eleveChoisi.classe
        ).scolarite;

        let allFraisInscReinsc = JSON.parse(
            localStorage.getItem("Config inscReinsc")
        );

        let inscritOuReinscrit = allElevesPayedInscReinsc.find(
            (x) => x.eleve === eleveChoisi.eleveNumber
        );

        state.eachStudentDetailsScolarite.prixReinscription = allFraisInscReinsc.find(
            (x) => x.classe == eleveChoisi.classe
        ).fraisReinscription;

        state.eachStudentDetailsScolarite.prixInscription = allFraisInscReinsc.find(
            (x) => x.classe === eleveChoisi.classe
        ).fraisInscription;

        // si l'élève choisi est déja inscrit ou réinscrit

        if (inscritOuReinscrit) {


            // il est inscrit ou réinscrit ok, a t-il déjà payé un quelconque frais ?
            let AllFraisPayedByEleve = localStorage.getItem("AllFraisPayedByEleve")

            AllFraisPayedByEleve != 'undefined' ? AllFraisPayedByEleve = JSON.parse(
                localStorage.getItem("AllFraisPayedByEleve")) : AllFraisPayedByEleve;

            // assignation frais communs payés et non payés s'il y a au moins un frais payé si non allFraisImpayés= Tous les frais de la BD

            if (AllFraisPayedByEleve != 'undefined' && AllFraisPayedByEleve.find(x => x.typeFrais === "Frais Mensuels")) {
                console.log("test one")
                state.eachStudentDetailsScolarite.autresFraisPayesSaufInscReinsc = AllFraisPayedByEleve.filter(
                    (x) => x.typeFrais !== inscritOuReinscrit.typeFrais
                );
                console.log(" state.allFraisPayes " + state.eachStudentDetailsScolarite.allFraisPayes + '\nthis ====' + JSON.stringify(state.mois));

                state.eachStudentDetailsScolarite.allFraisPayes = state.eachStudentDetailsScolarite.allFraisPayes.concat(
                    state.eachStudentDetailsScolarite.autresFraisPayesSaufInscReinsc
                );


                state.eachStudentDetailsScolarite.autresFraisPayesSaufInscReinsc.forEach((frais) => {
                    if (!state.resultat) {
                        console.log("1er tour");
                        state.resultat = this.trieAutresFraisImpaye(frais.typeFrais);
                    } else {
                        state.resultat = this.trieAutresFraisImpaye(
                            frais.typeFrais,
                            state.resultat
                        );
                    }
                });

                state.eachStudentDetailsScolarite.allFraisImpayes = state.resultat;
                console.log(
                    "allFraisImpayes ***************" +
                    JSON.stringify(state.eachStudentDetailsScolarite.allFraisImpayes) +
                    "\nallFraisPayes => " +
                    JSON.stringify(state.eachStudentDetailsScolarite.allFraisPayes)
                );

                // si il y'a que l'inscription ou la réeinscription comme frais payé
            } else {

                // state.eachStudentDetailsScolarite.allFraisPayes.push(inscritOuReinscrit);
                state.eachStudentDetailsScolarite.allFraisPayes = JSON.parse(localStorage.getItem('AllFraisPayedByEleve'));

                state.eachStudentDetailsScolarite.paiementFrais = JSON.parse(localStorage.getItem("Frais"));

                console.log("ultra test " + JSON.stringify(state.eachStudentDetailsScolarite.allFraisPayes))
                if (state.eachStudentDetailsScolarite.allFraisPayes.length > 1) {
                    console.log("Yes yes yes")
                    let table = []
                    let table2 = []
                    state.eachStudentDetailsScolarite.allFraisPayes.forEach(element => {
                        table.push(element.typeFrais)
                    });
                    state.eachStudentDetailsScolarite.paiementFrais.forEach(element => {
                        table2.push(element.identifiant)
                    });

                    state.eachStudentDetailsScolarite.allFraisImpayes = state.eachStudentDetailsScolarite.paiementFrais.filter((x) => !table.includes(x.identifiant))
                } else if (state.eachStudentDetailsScolarite.allFraisPayes.length === 1) {

                    state.eachStudentDetailsScolarite.allFraisImpayes = state.eachStudentDetailsScolarite.paiementFrais.filter((x) => x.identifiant !== state.eachStudentDetailsScolarite.allFraisPayes[0].typeFrais)

                } else {
                    state.eachStudentDetailsScolarite.allFraisImpayes = state.eachStudentDetailsScolarite.paiementFrais
                }
                console.log("state.eachStudentDetailsScolarite.allFraisImpayes " + state.eachStudentDetailsScolarite.allFraisImpayes)

                // state.eachStudentDetailsScolarite.allFraisImpayes = state.eachStudentDetailsScolarite.paiementFrais;
                state.eachStudentDetailsScolarite.moisToShowWithoutPayedMonths = state.mois;
                state.eachStudentDetailsScolarite.MoisNonPaye = state.mois;
                state.eachStudentDetailsScolarite.MoisPaye = [];
                state.eachStudentDetailsScolarite.moisAvance = [];
                state.eachStudentDetailsScolarite.autresFraisPayesSaufInscReinsc = [];

                console.log(" dooomage on est dans le else, c'est à dire : il y'a que l'inscription ou la réeinscription comme frais payé");
            }
        } else {
            console.log("ooops cet élève doit s'inscrire ou se reinscrire . Fin de test");
            state.eachStudentDetailsScolarite.allFraisPayes = [];
            state.eachStudentDetailsScolarite.paiementFrais = JSON.parse(localStorage.getItem("Frais"));
            state.eachStudentDetailsScolarite.allFraisImpayes = JSON.parse(localStorage.getItem("Frais"))
            state.eachStudentDetailsScolarite.allFraisImpayes.unshift({
                identifiant: "Inscription",
                cree_le: "2021-09-12T08:14:05.693899Z",
                modifie_le: "2021-09-12T08:15:57.789366Z",
                periodePaiement: "Du 01/01/2021 au 01/05/2021",
                obligatoire: true,
                montant: allFraisInscReinsc.find(
                    (x) => x.classe == eleveChoisi.classe
                ).fraisInscription,

                AnneeScolaire: eleveChoisi.AnneeScolaire,
                classesSpeciales: [
                    eleveChoisi.classe
                ]
            }, {
                identifiant: "Reinscription",
                cree_le: "2021-09-12T08:14:05.693899Z",
                modifie_le: "2021-09-12T08:15:57.789366Z",
                periodePaiement: "Du 01/01/2021 au 01/05/2021",
                obligatoire: true,
                montant: allFraisInscReinsc.find(
                    (x) => x.classe == eleveChoisi.classe
                ).fraisReinscription,
                AnneeScolaire: eleveChoisi.AnneeScolaire,
                classesSpeciales: [
                    eleveChoisi.classe
                ]
            });
            state.eachStudentDetailsScolarite.moisToShowWithoutPayedMonths = state.mois;
            state.eachStudentDetailsScolarite.MoisNonPaye = state.mois;
            state.eachStudentDetailsScolarite.MoisPaye = [];
            state.eachStudentDetailsScolarite.moisAvance = [];
            state.eachStudentDetailsScolarite.autresFraisPayesSaufInscReinsc = [];

            console.log("1 2 3")

        }

        //actionInitialiseFraisPayeImpaye(eleveClique);
    },
    setMoisPayesAvancesImpayes(state, item) {
        state.eachStudentDetailsScolarite.moisPaye = item.mois.moisPaye
        console.log("Hello !!! " + JSON.stringify(this.item.moisPaye))
        state.eachStudentDetailsScolarite.FraisPayesWithDetails = item.mois.FraisPayesWithDetails
        state.eachStudentDetailsScolarite.moisAvance = item.mois.moisAvance
        state.eachStudentDetailsScolarite.FraisAvancesWithDetails = item.mois.FraisAvancesWithDetails
        state.eachStudentDetailsScolarite.MoisNonPaye = item.mois.MoisNonPaye

        state.AllFraisPayedByEleve = item.AllFraisPayedByEleve


    }

}
const getters = {
    eleveClique: state => {
        return state.eleveClique
    },
    eachStudentDetailsScolarite: state => {
        return state.eachStudentDetailsScolarite
    },

}

export default {
    state,
    actions,
    mutations,
    getters
}