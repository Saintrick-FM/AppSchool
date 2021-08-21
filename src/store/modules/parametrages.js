import axios from 'axios'

const state = {
    newAnneeScolaire: null,
    annees_scolaire: null,

};
const actions = {
    actionNewAnneeScolaire({ commit }, anneeScolaire) {
        const token = "Token " + localStorage.getItem("token");

        let body = anneeScolaire; //attention ne jamais oublié d'assigner les valeurs recues dans body car axios l'exige
        axios
            .post('api/ecole/anneeScolaire/', body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {

                console.log("😃😃😃 newAnneeScolaire" + response);
                commit("newAnneeScolaire", anneeScolaire);
            })
            .catch(function(error) {
                console.log('anneeScolaire in catch action =>' + JSON.stringify(body))
                console.log("😢😢😢" + error);

            });

    },
    actionGetSchoolYears({ commit }) {
        var config = {
            method: "get",
            url: "api/ecole/anneeScolaire/",

        };
        axios(config)
            .then((response) => {
                const result = response.data;
                console.log("Années recupérées " + JSON.stringify(result));

                commit('InitialiseAnneesScolaire', result)
            })
            .catch(function(error) {
                console.log("😢😢😢" + error);
            });
    },

    actionModifAnneeScolaire({ commit }, anneeScolaire) {
        const token = "Token " + localStorage.getItem('token');

        var body = anneeScolaire;
        console.log(typeof body)
        axios
            .put(`api/ecole/anneeScolaire/${anneeScolaire.anneeScolaire}/`, body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {

                console.log("😍😍😍 update Année scolaire " + anneeScolaire.anneeScolaire + '\n' + response);
                commit("mutateYearSchool", anneeScolaire);

            })
            .catch(function(error) {
                console.log("😢😢😢 errors" + error);
            })
    }
}
const mutations = {

    newAnneeScolaire(state, anneeScolaire) {
        state.newAnneeScolaire = anneeScolaire
    },

    InitialiseAnneesScolaire(state, anneesScolaire) {
        anneesScolaire.forEach(annee => {
            annee.cree_le = annee.cree_le
                .toString()
                .slice(0, 16)
                .replace("T", " à ");
        });
        state.annees_scolaire = anneesScolaire
        localStorage.setItem("annees_scolaires", JSON.stringify(anneesScolaire))
    },
    mutateYearSchool(state, anneeScolaire) {
        let annees_scolaire = []

        for (const iterator of state.annees_scolaire) {
            annees_scolaire.push(iterator.anneeScolaire)
        }
        state.annees_scolaire[annees_scolaire.indexOf(anneeScolaire.anneeScolaire)] = anneeScolaire
        localStorage.setItem("annees_scolaires", JSON.stringify(state.annees_scolaire))
    }

}

const getters = {
    anneesScolaire: state => {
        return state.annees_scolaire
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}