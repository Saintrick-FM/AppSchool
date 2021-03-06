import axios from 'axios'
const state = {
    eleves: [],
    errorCreateEleve: undefined,
    inscitsAnneeActuel: null,
    inscritsReinscritsAnneeActuel: null,
    nouveaux: [],
    redoublants: [],
};
const actions = {

    async actionInitialiseEleve({ commit }, annee_scolaire) {
        //   this.$store.dispatch("actionInitialiseMatiere");
        const token = "Token " + localStorage.getItem("token");

        // const annee = new Date()
        //const year = annee.getFullYear() + '-' + (annee.getFullYear() + 1)
        if (localStorage.getItem("token") != null) {
            var config = {
                method: "get",
                url: `api/inscriptions/?annee_scolaire=${annee_scolaire}`,
                headers: {
                    Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
                },
            };
            var config2 = {
                method: "get",
                url: `api/finances/paiementEveryFrais/?annee_scolaire=${annee_scolaire}`,
                headers: {
                    Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
                },
            };
            await axios.all([axios(config),
                    axios(config2)
                ]).then(axios.spread((firstResponse, secondResponse) => {
                    console.log("console.log de la 1ere requete doubles " + JSON.stringify(firstResponse.data))
                    console.log("console.log de la 2e requete double " + JSON.stringify(secondResponse.data))

                    const result1 = firstResponse.data;
                    const result2 = secondResponse.data;
                    console.log(result1);
                    let eleves = [];
                    for (const key in result1) {
                        eleves.push(result1[key]);
                    }
                    let inscrits = result2.filter(x => x.typeFrais === "Inscriptions")
                    let reinscrits = result2.filter(x => x.typeFrais === "Reinscriptions")

                    let inscritsReinscrits = []
                    inscritsReinscrits.push(inscrits, reinscrits)
                    console.log("inscritsrReinscrits ==== " + JSON.stringify(inscritsReinscrits))


                    console.log(
                        "???????????? Eleves in the 2nd request of Initialise Eleves => " +
                        JSON.stringify(eleves) + " \nInscritsAnneeActuel => " + result2

                    );

                    localStorage.setItem("all_Eleves_Payed_InscReinsc", JSON.stringify(inscritsReinscrits))
                    localStorage.setItem("Inscrits_Annee_Actuel", JSON.stringify(result1))

                    commit('InititialiseEleves', eleves)
                    commit("InitialiseInscitsAnneeActuel", { inscritsReinscrits: inscritsReinscrits })

                }))
                .catch(function(error) {
                    console.log("????????????" + error);
                });
        }
    },

    async actionCreateEleve({ commit }, eleveCreate) {
        const token = "Token " + localStorage.getItem('token');
        console.log('nom de l\' eleve cr????=>' + eleveCreate.nom)

        let body = eleveCreate; //attention ne jamais oubli?? d'assigner les valeurs recues dans body car axios l'exige
        await axios
            .post('api/inscriptions/', body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {

                console.log("????????????" + response);
                let initArrayOfNewEleves = [];
                //  response.data.cree_le = response.data.cree_le.slice(0, 16).replace("T", " ?? ");
                initArrayOfNewEleves.push(response.data)

                if (localStorage.getItem("Inscrits_Annee_Actuel")) {
                    let previousEleves = JSON.parse(localStorage.getItem("Inscrits_Annee_Actuel"));

                    console.log("previous ??l??ves " + JSON.stringify(previousEleves))
                    previousEleves.push(response.data);

                    console.log("new ??l??ve to send in localStorage " + JSON.stringify(previousEleves))
                    localStorage.setItem("Inscrits_Annee_Actuel", JSON.stringify(previousEleves));

                } else {
                    localStorage.setItem("Inscrits_Annee_Actuel", JSON.stringify(initArrayOfNewEleves));
                }

                commit("createEleve", response.data);
            })
            .catch(function(error) {
                console.log('eleveCreate in catch action =>' + JSON.stringify(body))
                console.log("????????????" + error);
                commit('setErreurCreate')
            });


    },

    actionUpdateEleve({ commit }, donnees) {
        const token = "Token " + localStorage.getItem('token');
        console.log(
            "id du cours ?? updater =>" +
            donnees[0] +
            "\n objet modifi?? du save =>" +
            JSON.stringify(donnees[1])
        );

        var body = donnees[1];
        console.log(typeof body)
        axios
            .put(`api/inscriptions/${donnees[0]}/`, body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then(() => {
                //let newEleve = [donnees[0], donnees[1]]
                console.log("???????????? new data sent =>" + JSON.stringify(donnees[1]));

                let allEleves = JSON.parse(localStorage.getItem('Inscrits_Annee_Actuel'));

                allEleves.splice(allEleves.indexOf(donnees[1]), 1, body)
                localStorage.setItem("Inscrits_Annee_Actuel", JSON.stringify(allEleves))


                commit("updateEleve");

            })
            .catch(function(error) {

                console.log("????????????" + JSON.stringify(donnees[1]) + '\nerrors' + error);
                if (error == "Error: Request failed with status code 403") {
                    console.log('forbiden')
                    commit('setErreurMessage')
                } else {
                    console.log('oups pas forbiden')
                }

            });
    },

    actionRemoveEleve({ commit }, index) {
        var token = 'Token ' + localStorage.getItem('token')
        var config = {
            method: 'delete',
            url: `api/inscriptions/${index}`,
            headers: {
                'Authorization': token
            }
        }
        axios(config)
            .then((resp) => {
                console.log('???????????? Eleve with id ' + index + ' deleted\n' + resp);
                commit('deleteTeacher', index)

            })
            .catch((err) => { console.log(err) })

    }
};
const mutations = {

    InititialiseEleves(state, eleves) {
        state.eleves = eleves
        state.nouveaux = eleves.filter(x => x.redoublant === "Nouveau")
        state.redoublants = eleves.filter(x => x.redoublant !== "Nouveau")
    },
    InitialiseInscitsAnneeActuel(state, inscritsReinscrits) {
        state.inscritsReinscritsAnneeActuel = inscritsReinscrits.inscritsReinscrits[0]

    },
    createEleve(state, eleve) {
        state.eleves.push(eleve)

    },

    updateEleve(state) {
        let allEleves = JSON.parse(localStorage.getItem('Inscrits_Annee_Actuel'));
        console.log('????  attention j\'essaie de g??rer le state.Eleves du updateEleve')

        state.eleves = allEleves
        console.log(' state eleves apr??s update eleve => ' + JSON.stringify(state.eleves))
    },

    deleteEleve(index) {
        const deleted = this.state.eleves.splice(index, 1);
        console.log('Eleve supprim?? =>' + deleted)
    },
    setErreurCreate(state) {
        state.errorCreateeleve = true
    }


};
const getters = {
    alleleves: state => {
        return state.eleves
    },
    allelevesFictifs: state => {
        return state.elevesFictifs
    },
    allInscritsReinscrits: state => {
        return state.inscritsReinscritsAnneeActuel
    },
    allNouveaux: state => {
        return state.nouveaux
    },
    allRedoublants: state => {
        return state.redoublants
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}