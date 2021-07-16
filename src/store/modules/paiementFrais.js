import axios from 'axios'
const state = {
    typeFrais: [],
    fraisPayed: undefined,
    AllFraisPayedByEleve: undefined,

};
const actions = {

    actionGetfinanceEleveDetail({ commit }, id) {
        const token = "Token " + localStorage.getItem("token");

        if (localStorage.getItem("token") != null) {
            axios
                .get(`api/finances/paiementFraisEleve/?id=${id}`, {
                    headers: {
                        'Authorization': token,
                    }
                })
                .then((response) => {
                    const result = response.data;
                    console.log('result =' + result);
                    localStorage.setItem("Frais", result);
                    let AllFraisPayedByEleve = [];
                    for (const key in result) {
                        AllFraisPayedByEleve.push(result[key]);
                    }

                    let AllFraisPayedbyEleve = JSON.stringify(result)
                    console.log("😃😃😃 tous les frais payés de l'élève => " + AllFraisPayedbyEleve);
                    localStorage.setItem("AllFraisPayedByEleve", AllFraisPayedbyEleve);
                    //commit('InititialiseElevesPayed', AllFraisPayedByEleve)
                    commit('InitialiseMoisPayeImpaye', AllFraisPayedbyEleve)
                })
                .catch(function(error) {
                    console.log("😢😢😢" + error);
                });
        }
    },


    async actionCreateFrais({ commit }, fraisCreate) {
        const token = "Token " + localStorage.getItem('token');
        console.log("Type de montant frais => " + typeof fraisCreate.montantFrais)
        let newFrais = {
            frais: fraisCreate.frais,
            montant: fraisCreate.montant
        }

        let body = newFrais; //attention ne jamais oublié d'assigner les valeurs recues dans body car axios l'exige
        await axios
            .post('api/finances/configFraisEleve/', body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {

                console.log("😃😃😃" + response);
                commit("createFrais", fraisCreate);
            })
            .catch(function(error) {
                console.log('fraisCreate in catch action =>' + JSON.stringify(body))
                console.log("😢😢😢" + error);

            });


    },

    actionUpdateFrais({ commit }, donnees) {
        const token = "Token " + localStorage.getItem('token');
        console.log(
            "id du cours à updater =>" +
            donnees[0] +
            "\n objet modifié du save =>" +
            JSON.stringify(donnees[1])
        );

        var body = donnees[1];
        console.log(typeof body)
        axios
            .put(`api/finances/configFraisEleve/${donnees[0]}/`, body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {
                let newFrais = [donnees[0], donnees[1]]
                console.log("😍😍😍 new data sent =>" + JSON.stringify(donnees[1]) + '\n' + response);
                commit("updateMatieres", newFrais);

            })
            .catch(function(error) {

                console.log("😢😢😢" + JSON.stringify(donnees[1]) + '\nerrors' + error);
                if (error == "Error: Request failed with status code 403") {
                    console.log('forbiden')
                    commit('setErreurMessage')
                } else {
                    console.log('oups pas forbiden')
                }

            });
    },

    async actionPayedFrais({ commit }, fraisPayed) {
        const token = "Token " + localStorage.getItem('token');

        let body = fraisPayed; //attention ne jamais oublié d'assigner les valeurs recues dans body car axios l'exige
        await axios
            .post('api/finances/paiementFraisEleve/', body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {

                console.log("😃😃😃" + JSON.stringify(response));
                commit("fraisPayed", fraisPayed);
            })
            .catch(function(error) {
                console.log('fraisPayed in catch action =>' + JSON.stringify(body))
                console.log("😢😢😢" + error);

            });

    }


};
const mutations = {

    InitialiseMoisPayeImpaye(state, AllFraisPayedbyEleve) {
        state.AllFraisPayedByEleve = AllFraisPayedbyEleve

        let allMonthsPayed = [];
        let Mois = [
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
        ];
        let moisAvance = [];
        let MoisPaye = [];
        let MoisNonPaye = [];
        console.log("Jusquici ca donne" + typeof AllFraisPayedbyEleve)

        //s'il y'a une avance dans au moins un des paiements de l'élève
        JSON.parse(AllFraisPayedbyEleve).forEach((frais) => {
            if (frais.typeFrais === "Frais mensuel" && frais.statut === "avancé") {
                allMonthsPayed.push(
                    frais.mois
                    .split(",")
                    .slice(0, -1)
                    .toString()
                );
                moisAvance.push(frais.mois.split(",").pop());
            } else if (frais.typeFrais === "impôts élèves") {
                console.log("attention ici c'est typeFrais=== fr ");

                //si c'est un mois et que cest réglé
            } else if (
                frais.typeFrais === "Frais mensuel" &&
                frais.statut !== "avancé"
            ) {
                allMonthsPayed.push(frais.mois.split(",").toString());
            } else {
                console.log("ELSE ELSE ELSE");
            }
        });
        if (allMonthsPayed) {
            // ce que j'affecte aux moisPaye vient du resultat de trie opéré par la methode //filter qui enlève les tableaux vides de MoisPaye car c'est un tableau de tableaux
            MoisPaye = allMonthsPayed.filter(function(value) {
                return value != ""
            });
        }
        if (moisAvance) {
            MoisNonPaye.push("MustBeSet");
        } else {
            MoisNonPaye = Mois;
        }

        console.log("Mois Payés " + MoisPaye);
        console.log(
            "mois avancé = " +
            moisAvance +
            "\nMois Impayés =" +
            MoisNonPaye
        );
        localStorage.setItem("MoisPaye", JSON.stringify(MoisPaye))
        localStorage.setItem("MoisNonPaye", JSON.stringify(MoisNonPaye))
        localStorage.setItem("moisAvance", JSON.stringify(moisAvance))
            //this.shawPayedMonths = true;
    },
    InitialisetypeFrais(state, typeFrais) {
        state.typeFrais = typeFrais
        localStorage.setItem("Matieres", typeFrais);
    },
    createFrais(state, Frais) {
        state.typeFrais = Frais

    },

    updatetypeFrais(state, newFrais) {
        console.log('🐶  attention j\'essaie de gérer le state.matieres du updateMatiere')
        let id = []
        for (const iterator of this.state.typeFrais) {
            id.push(iterator.id)
        }
        console.log(' Le tableau des id =>' + id + '\n Le Frais avec l\'id ' +
            newFrais[0] + ' est à la ' + id.indexOf(newFrais[0]) + ' eme place')
        state.typeFrais[id.indexOf(newFrais[0])] = newFrais[1]
    },

    fraisPayed(state, fraisPayed) {
        state.fraisPayed = fraisPayed
    },



    trieMoisImpaye(MoisPaye, moisAvance, Mois) {
        // ici je met les mois payés en toString que je split pour avoir un nouveau tableau propre et j'enlève à chaque tour de boucle le mois deja payé par rapport à son index

        MoisPaye.toString()
            .split(",")
            .forEach((mois) => {
                Mois.splice(Mois.indexOf(mois), 1);
            });
        console.log("months non payed = " + this.mois);
        moisAvance.forEach((mois) => {
            Mois.splice(Mois.indexOf(mois), 1);
        });
        return Mois.toString();
    }


};
const getters = {
    alltypeFrais: state => {
        return state.typeFrais
    },

};

// function trieMoisVides(value) {
//     return value != "";
// }
export default {
    state,
    actions,
    mutations,
    getters
}