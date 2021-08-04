import axios from 'axios'
const state = {
    classes: null,
    IdClasses: null,
    matieres: null,
    fraisInscREsc: null,
};
const actions = {
    async actionInitialiseClasse({ commit }) {
        //   this.$store.dispatch("actionInitialiseMatiere");
        const token = "Token " + localStorage.getItem("token");

        if (localStorage.getItem("token")) {
            var config = {
                method: "get",
                url: "api/ecole/classe/",
                headers: {
                    Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
                },
            };
            var config2 = {
                method: "get",
                url: "api/finances/ConfigFraisInscReinsc/",
                headers: {
                    Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
                },
            };


            await axios.all([axios(config),
                    axios(config2)
                ]).then(axios.spread((firstResponse, secondResponse) => {
                    console.log("console.log des requetes doubles " + firstResponse.data, secondResponse.data)

                    let matieres = [];
                    let IdClasses = []

                    for (const classe in firstResponse.data) {
                        matieres.push(firstResponse.data[classe]);
                        IdClasses.push(firstResponse.data[classe].identifiant);
                    }
                    let classes = JSON.stringify(matieres)
                    let fraisInscREsc = JSON.stringify(secondResponse.data)
                    console.log("identifiants classes => " + IdClasses);
                    console.log("😃😃😃 this.classes => " + this.classes);

                    commit("InitialiseClasse", [classes, IdClasses])
                    commit("InitialisefraisInscREsc", fraisInscREsc)

                }))
                .catch(function(error) {
                    console.log("😢😢😢" + error);
                });

        }
    },
    async actionInitialiseMatieres({ commit }) {
        const token = "Token " + localStorage.getItem("token");

        if (localStorage.getItem("token") != null) {
            var config = {
                method: "get",
                url: "api/ecole/matiere/",
                headers: {
                    Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
                },
            };
            await axios(config)
                .then((response) => {
                    const result = response.data;

                    let matieres = [];
                    for (const key in result) {
                        matieres.push(result[key]);
                    }

                    commit("InitialiseMatieres", JSON.stringify(matieres))
                    console.log(
                        "😃😃😃 JSON.stringify(matieres) => " +
                        JSON.stringify(matieres) +
                        "result result result ==> " +
                        matieres
                    );
                })
                .catch(function(error) {
                    console.log("😢😢😢" + error);
                });
        }
    },

}
const mutations = {
    InitialiseClasse(state, classes) {
        state.classes = classes[0]
        state.IdClasses = classes[1]

        localStorage.setItem("Classes", classes[0]);
        localStorage.setItem("Id_classes", classes[1]);
    },
    InitialisefraisInscREsc(state, fraisInscReinsc) {
        state.fraisInscREsc = fraisInscReinsc
        localStorage.setItem("frais_Inscript_Reinscript", fraisInscReinsc);
    },
    InitialiseMatieres(state, matieres) {
        state.matieres = matieres
        localStorage.setItem("Matieres", matieres);
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}