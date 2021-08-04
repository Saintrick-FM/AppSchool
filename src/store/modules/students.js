import axios from 'axios'
const state = {
    eleves: [],
    errorCreateEleve: undefined,
    inscitsAnneeActuel: null,
};
const actions = {

    async actionInitialiseEleve({ commit }) {
        //   this.$store.dispatch("actionInitialiseMatiere");
        const token = "Token " + localStorage.getItem("token");


        if (localStorage.getItem("token") != null) {
            var config = {
                method: "get",
                url: "api/inscriptions/",
                headers: {
                    Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
                },
            };
            const annee = new Date()
            const year = annee.getFullYear() + '-' + (annee.getFullYear() + 1)
            var config2 = {
                method: "get",
                url: `api/finances/PaiementInscriptionReinscription/?annee_scolaire=${year}`,
                headers: {
                    Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
                },
            };
            await axios.all([axios(config),
                    axios(config2)
                ]).then(axios.spread((firstResponse, secondResponse) => {
                    console.log("console.log des requetes doubles " + firstResponse.data, secondResponse.data)

                    const result1 = firstResponse.data;
                    const result2 = secondResponse.data;
                    console.log(result1);
                    let eleves = [];
                    for (const key in result1) {
                        eleves.push(result1[key]);
                    }

                    let elevesToStore = JSON.stringify(eleves)
                    console.log(
                        "😃😃😃 ElevesTostore => " +
                        elevesToStore + " \nInscitsAnneeActuel => " + result2

                    );
                    localStorage.setItem("ElèvesToStore", elevesToStore);
                    commit('InititialiseEleves', elevesToStore)
                    commit("InitialiseInscitsAnneeActuel", result2)

                }))
                .catch(function(error) {
                    console.log("😢😢😢" + error);
                });
        }
    },

    async actionCreateEleve({ commit }, eleveCreate) {
        const token = "Token " + localStorage.getItem('token');
        console.log('nom de l\' eleve créé=>' + eleveCreate.nom)

        let body = eleveCreate; //attention ne jamais oublié d'assigner les valeurs recues dans body car axios l'exige
        await axios
            .post('api/inscriptions/', body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {

                console.log("😃😃😃" + response);
                commit("createEleve", eleveCreate);
            })
            .catch(function(error) {
                console.log('eleveCreate in catch action =>' + JSON.stringify(body))
                console.log("😢😢😢" + error);
                commit('setErreurCreate')
            });


    },

    actionUpdateEleve({ commit }, donnees) {
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
            .put(`api/inscriptions/${donnees[0]}/`, body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {
                let newEleve = [donnees[0], donnees[1]]
                console.log("😍😍😍 new data sent =>" + JSON.stringify(donnees[1]) + '\n' + response);
                commit("updateEleve", newEleve);

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
                console.log('😍😍😍 Eleve with id ' + index + ' deleted\n' + resp);
                commit('deleteTeacher', index)

            })
            .catch((err) => { console.log(err) })

    }
};
const mutations = {

    InititialiseEleves(state, eleves) {
        state.eleves = eleves
    },
    InitialiseInscitsAnneeActuel(state, InscitsAnneeActuel) {
        state.inscitsAnneeActuel = InscitsAnneeActuel
        localStorage.setItem("Inscits_Annee_Actuel", JSON.stringify(InscitsAnneeActuel))
    },
    createEleve(state, eleve) {
        state.eleves = eleve

    },

    updateEleve(state, neweleve) {
        console.log('🐶  attention j\'essaie de gérer le state.Eleves du updateMatiere')
        let id = []
        for (const iterator of this.state.eleves) {
            id.push(iterator.id)
        }
        console.log(' Le tableau des id =>' + id + '\n Le eleve avec l\'id ' +
            neweleve[0] + ' est à la ' + id.indexOf(neweleve[0]) + ' eme place')
        state.eleves[id.indexOf(neweleve[0])] = neweleve[1]
    },

    deleteEleve(index) {
        const deleted = this.state.eleves.splice(index, 1);
        console.log('Eleve supprimé =>' + deleted)
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
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}