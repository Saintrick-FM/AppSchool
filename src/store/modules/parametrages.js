import axios from 'axios'

const state = {
    newAnneeScolaire: null
};
const actions = {
    async actionNewAnneeScolaire({ commit }, anneeScolaire) {
        const token = "Token " + localStorage.getItem("token");

        let body = anneeScolaire; //attention ne jamais oublié d'assigner les valeurs recues dans body car axios l'exige
        await axios
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
}
const mutations = {

    newAnneeScolaire(state, anneeScolaire) {
        state.newAnneeScolaire = anneeScolaire
    },

}

const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}