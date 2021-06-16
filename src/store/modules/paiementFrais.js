import axios from 'axios'
const state = {
    typeFrais: [],

};
const actions = {

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


};
const mutations = {

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



};
const getters = {
    alltypeFrais: state => {
        return state.typeFrais
    },

};

export default {
    state,
    actions,
    mutations,
    getters
}