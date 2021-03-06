import axios from 'axios'
const state = {
    autresFrais: null,
    fraisInscReinsc: null,
    caisseClique: null
};
const actions = {
    async actionGetAllFraisForCompta({ commit }, complement) {
        //   this.$store.dispatch("actionInitialiseMatiere");
        const token = "Token " + localStorage.getItem("token");
        const annee_scolaire = localStorage.getItem("annee_scolaire");
        const config = [];
        /* const configFraisInscReinsc= await axios.get(`api/finances/ConfigFraisInscReinsc/?annee_scolaire=${annee_scolaire}`)
         console.log(configFraisInscReinsc.data)

         const configEcolage= await axios.get(`api/finances/configEcolage/?annee_scolaire=${annee_scolaire}`)
         console.log(configFraisInscReinsc.data)
         localStorage.setItem()

         const configAutresFrais= await axios.get(`api/finances/configAutresFrais/?annee_scolaire=${annee_scolaire}`)
         console.log(configFraisInscReinsc.data)*/

        if (localStorage.getItem("token") != null) {
            complement.forEach(element => {
                config.push({
                    method: "get",
                    url: `api/finances/paiementFraisEleve/?annee_scolaire=${annee_scolaire}&type_frais=${element}`,
                    headers: {
                        Authorization: token,
                    }
                })
            });

            var config2 = {
                method: "get",
                url: `api/finances/PaiementInscriptionReinscription/?annee_scolaire=${annee_scolaire}`,
                headers: {
                    Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
                },
            };

            config.forEach(element => {
                axios(element)
                    .then((response) => {
                        const result = response.data;
                        console.log(JSON.stringify(result))
                        commit("InititialiseAutresFrais", result)
                    })
                    .catch(function(error) {
                        console.log("????????????" + error);
                    })

            });
            axios(config2)
                .then((response) => {
                    const result = response.data;
                    console.log(
                        "???????????? paiements Inscrip Reinscrip => " + JSON.stringify(result)

                    );
                    commit("InitialiseFraisInscReinsc", result)

                })
                .catch(function(error) {
                    console.log("????????????" + error);
                })

        }
    },


};
const mutations = {
    mutateCaisseClique(state, caisse) {
        state.caisseClique = caisse
    },
    InititialiseAutresFrais(state, result) {
        state.autresFrais = result
        localStorage.setItem("Les autres Frais", JSON.stringify(result));

    },
    InitialiseFraisInscReinsc(state, result) {
        state.fraisInscReinsc = result
        localStorage.setItem("Frais Inscrits/Reinscrits", JSON.stringify(result));
    },

};
const getters = {
    allAutresFrais: state => {
        return state.autresFrais
    },
    allFraisInscReinsc: state => {
        return state.fraisInscReinsc
    },
    caisseClique: state => {
        return state.caisseClique
    }

};


export default {
    state,
    actions,
    mutations,
    getters
}