import axios from 'axios'
//import { EventBus } from '@/event-bus.js'
const state = {
    typeFrais: [],
    fraisPayed: undefined,
    AllFraisPayedByEleve: undefined,
    reinscrits: null,
    inscrits: null,
    attenduReinscription: null,
    attenduInscription: null,
    AutresFraisWithContenanceMontant: null,
    eleveClique: null,

};
const actions = {
    /*  actionGetfinanceEleveDetail({ commit }, item) {
          const token = "Token " + localStorage.getItem('token');
          var config = {
              method: "get",
              url: `api/finances/paiementEveryFrais/?id=${item.eleveNumber}`,
              headers: {
                  Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
              },
          };
          const response = axios(config)
          console.log("😍😍😍 actionGetfinanceEleveDetail " + JSON.stringify(response.data))
          commit("setAllFraisPayedByEleve", response.data)
      },*/

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
    async actionPaiementInscReinsc({ commit }, donnees) {
        const token = "Token " + localStorage.getItem('token');

        let body = donnees
        await axios
            .post('api/finances/PaiementInscriptionReinscription/', body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((responsePaieInscReins) => {
                console.log("😃😃😃" + JSON.stringify(responsePaieInscReins));

                let initArrayOfNewPaiementInscReinsc = [];
                responsePaieInscReins.data.cree_le = responsePaieInscReins.data.cree_le.slice(0, 16).replace("T", " à ");
                initArrayOfNewPaiementInscReinsc.push(responsePaieInscReins.data)

                // Gestion envoie dans le localStorage de all_Eleves_Payed_InscReinsc
                if (localStorage.getItem("all_Eleves_Payed_InscReinsc")) {
                    let previousElevesPayedInscReinsc = JSON.parse(localStorage.getItem("all_Eleves_Payed_InscReinsc"));

                    console.log("previous eleves payed InscReinsc " + JSON.stringify(previousElevesPayedInscReinsc))
                    previousElevesPayedInscReinsc.push(responsePaieInscReins.data);

                    console.log("new eleve payed InscReinsc to send in localStorage " + JSON.stringify(previousElevesPayedInscReinsc))
                    localStorage.setItem("all_Eleves_Payed_InscReinsc", JSON.stringify(previousElevesPayedInscReinsc));

                } else {
                    localStorage.setItem("all_Eleves_Payed_InscReinsc", JSON.stringify(initArrayOfNewPaiementInscReinsc));
                }
                // localStorage.setItem("AllFraisPayedByEleve", JSON.stringify([responsePaieInscReins.data]))

                commit("PaiementInscReinsc", donnees);
            })
            .catch(function(error) {
                console.log('Erreur Inscription_Reinscription=>' + JSON.stringify(donnees))
                console.log("😢😢😢" + error);

            })

        // Gestion de AllFraisPayedByEleve afin de palier au pb de BD survenu
        let everyFrais = {
            montantFrais: donnees.montantFrais,
            mois: null,
            montantApayer: donnees.montantFrais,
            montantDejaPaye: donnees.montantFrais,
            montantRestant: 0,
            statut: "payé",
            eleve: donnees.eleve,
            classe: donnees.classe,
            typeFrais: donnees.typeFrais,
            AnneeScolaire: donnees.AnneeScolaire
        }

        body = everyFrais
        await axios
            .post('api/finances/paiementEveryFrais/', body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((responsePaieEveryFrais) => {
                console.log("😃😃😃" + JSON.stringify(body));
                // Gestion envoie dans le localStorage de AllFraisPayedByEleve
                /* let initArrayOfNewFraisPayedByEeleve = [];
                 if (localStorage.getItem("AllFraisPayedByEleve")) {
                     let previousAllFraisPayedByEeleve = JSON.parse(localStorage.getItem("AllFraisPayedByEleve"));

                     console.log("previous AllFraisPayedByEeleve " + JSON.stringify(previousAllFraisPayedByEeleve))
                     previousAllFraisPayedByEeleve.push(responsePaieEveryFrais.data);

                     console.log("new AllFraisPayedByEeleve to send in localStorage " + JSON.stringify(previousAllFraisPayedByEeleve))
                     localStorage.setItem("AllFraisPayedByEleve", JSON.stringify(previousAllFraisPayedByEeleve));

                 } else {
                     localStorage.setItem("AllFraisPayedByEleve", JSON.stringify(initArrayOfNewFraisPayedByEeleve));
                 }
                 localStorage.setItem("AllFraisPayedByEleve", JSON.stringify([responsePaieEveryFrais.data]))*/

                commit("PaiementEveryFrais", responsePaieEveryFrais.data);
            })
            .catch(function(error) {
                console.log('Erreur Inscription_Reinscription=>' + JSON.stringify(body))
                console.log("😢😢😢" + error);

            })

    },

    async actionPayedFrais({ commit }, fraisPayed) {
        const token = "Token " + localStorage.getItem('token');
        if (fraisPayed.length === 2) {
            let body = fraisPayed[0];

            //attention ne jamais oublié d'assigner les valeurs recues dans body car axios l'exige
            console.log("fraiPayed[0] === " + JSON.stringify(fraisPayed[0]) +
                "\nfraisPayed[1]=== " + JSON.stringify(fraisPayed[1]))
            await axios
                .post('api/finances/paiementEveryFrais/', body, {
                    headers: {
                        'Authorization': token,
                    }
                })
                .then((response) => {

                    console.log("😃😃😃" + JSON.stringify(response.data));
                    /* let initArrayFraisPayed = [];
                     response.data.cree_le = response.data.cree_le.slice(0, 16).replace("T", " à ");
                     initArrayFraisPayed.push(response.data)

                     if (localStorage.getItem("AllFraisPayedByEleve")) {
                         let previousFraisPayed = JSON.parse(localStorage.getItem("AllFraisPayedByEleve"));

                         previousFraisPayed.push(response.data);

                         console.log("new list of FraisPayed to send in localStorage " + JSON.stringify(previousFraisPayed))
                         localStorage.setItem("AllFraisPayedByEleve", JSON.stringify(previousFraisPayed));

                     } else {
                         localStorage.setItem("AllFraisPayedByEleve", JSON.stringify(initArrayFraisPayed));
                     }*/
                    commit("fraisPayed");

                })
                .catch(function(error) {
                    console.log('fraisPayed in catch action =>' + JSON.stringify(body))
                    console.log("😢😢😢" + error);

                })

            body = fraisPayed[1]
            await axios
                .post('api/finances/paiementEveryFrais/', body, {
                    headers: {
                        'Authorization': token,
                    }
                })
                .then((response) => {
                    console.log("😃😃😃" + JSON.stringify(response));
                    /*   let initArrayFraisPayed = [];
                       response.data.cree_le = response.data.cree_le.slice(0, 16).replace("T", " à ");
                       initArrayFraisPayed.push(response.data)

                       if (localStorage.getItem("AllFraisPayedByEleve")) {
                           let previousFraisPayed = JSON.parse(localStorage.getItem("AllFraisPayedByEleve"));

                           previousFraisPayed.push(response.data);

                           console.log("new list of FraisPayed to send in localStorage " + JSON.stringify(previousFraisPayed))
                           localStorage.setItem("AllFraisPayedByEleve", JSON.stringify(previousFraisPayed));

                       } else {
                           localStorage.setItem("AllFraisPayedByEleve", JSON.stringify(initArrayFraisPayed));
                       }*/
                    commit("fraisPayed");
                    localStorage.setItem("MoisAvanceToStoreInDB", null)

                })
                .catch(function(error) {
                    console.log('fraisPayed in catch action =>' + JSON.stringify(body))
                    console.log("😢😢😢" + error);

                })

        } else {
            let body = fraisPayed
            await axios
                .post('api/finances/paiementEveryFrais/', body, {
                    headers: {
                        'Authorization': token,
                    }
                })
                .then((response) => {

                    console.log("😃😃😃" + JSON.stringify(response.data));
                    /* let initArrayFraisPayed = [];
                     response.data.cree_le = response.data.cree_le.slice(0, 16).replace("T", " à ");
                     initArrayFraisPayed.push(response.data)

                     if (localStorage.getItem("AllFraisPayedByEleve")) {
                         let previousFraisPayed = JSON.parse(localStorage.getItem("AllFraisPayedByEleve"));

                         previousFraisPayed.push(response.data);

                         console.log("new list of FraisPayed to send in localStorage " + JSON.stringify(previousFraisPayed))
                         localStorage.setItem("AllFraisPayedByEleve", JSON.stringify(previousFraisPayed));

                     } else {
                         localStorage.setItem("AllFraisPayedByEleve", JSON.stringify(initArrayFraisPayed));
                     }*/
                    commit("fraisPayed");


                })
                .catch(function(error) {
                    console.log('fraisPayed in catch action =>' + JSON.stringify(body))
                    console.log("😢😢😢" + error);

                })
        }
    },

    async actionUpdatePayedFrais({ commit }, donnees) {
        const token = "Token " + localStorage.getItem('token');
        var body = donnees[1];
        console.log("id à upadater " + donnees[0])
        await axios
            .put(`api/finances/paiementEveryFrais/${donnees[0]}/`, body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {
                let newPayedFrais = [donnees[0], donnees[1]]
                console.log("😍😍😍 new data sent =>" + JSON.stringify(donnees[1]) + '\n' + response);
                commit("updatePayedFrais", newPayedFrais);

            })
            .catch(function(error) {

                console.log("😢😢😢" + JSON.stringify(donnees[1]) + '\nerrors' + error);


            });
    }

};
const mutations = {
    /* setAllFraisPayedByEleve(state, item) {
         state.AllFraisPayedByEleve = item
         localStorage.setItem("AllFraisPayedByEleve", JSON.stringify(item))
     },*/
    InitialisetypeFrais(state, typeFrais) {
        state.typeFrais = typeFrais
        localStorage.setItem("Matieres", typeFrais);
    },
    createFrais(state, Frais) {
        state.typeFrais = Frais

    },
    PaiementInscReinsc(state, frais) {
        state.fraisInscReinsc = frais
    },
    mutateInscrits(state, inscrits) {
        state.inscrits = inscrits
    },

    mutateAttenduInscription(state, attenduInscription) {
        state.attenduInscription = attenduInscription
    },
    mutateAttenduReinscription(state, attenduReinscription) {
        state.attenduReinscription = attenduReinscription
    },
    mutateReinscrits(state, reinscrits) {
        state.reinscrits = reinscrits
    },
    mutateEachAutreFraisWithContenanceMontant(state, objet) {
        console.log("****///****** " + JSON.stringify(objet) + "*******//****")
        state.AutresFraisWithContenanceMontant = objet
    },
    PaiementEveryFrais(everyFrais) {
        console.log("Agérer plus tard " + JSON.stringify(everyFrais))
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

    fraisPayed(state) {
        let AllFraisPayedByEleve = JSON.parse(localStorage.getItem("AllFraisPayedByEleve"))
        state.fraisPayed = AllFraisPayedByEleve
    },
    updatePayedFrais(state, updatedPayedFrais) {
        state.fraisPayed = updatedPayedFrais
    }

};
const getters = {
    alltypeFrais: state => {
        return state.typeFrais
    },
    allFraisPayed: state => {
        return state.typeFrais
    },
    allInscrits: state => {
        return state.inscrits
    },
    allReinscrits: state => {
        return state.reinscrits
    },
    attenduReinscription: state => {
        return state.attenduReinscription
    },
    attenduInscription: state => {
        return state.attenduInscription
    },
    AutresFraisWithContenanceMontant: state => {
        return state.AutresFraisWithContenanceMontant
    },


};

export default {
    state,
    actions,
    mutations,
    getters
}