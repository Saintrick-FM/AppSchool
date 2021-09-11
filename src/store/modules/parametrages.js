import axios from 'axios'

const state = {
    newAnneeScolaire: null,
    annees_scolaire: null,
    classes: []

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
                localStorage.setItem("année_scolaire", JSON.stringify(anneeScolaire))
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

                result.forEach(annee => {
                    annee.cree_le = annee.cree_le
                        .toString()
                        .slice(0, 16)
                        .replace("T", " à ");
                });
                localStorage.setItem("annees_scolaires", JSON.stringify(result))

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
    },
    actionCreateClasse({ commit }, classe) {
        console.log("Classe à sauvegarder " + JSON.stringify(classe))
        const token = "Token " + localStorage.getItem("token");

        let body = classe; //attention ne jamais oublié d'assigner les valeurs recues dans body car axios l'exige
        axios
            .post('api/ecole/classe/', body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {


                let initArrayOfClasses = [];
                initArrayOfClasses.push(classe)

                if (localStorage.getItem("All Classes")) {
                    let previousClasses = JSON.parse(localStorage.getItem("All Classes"));
                    previousClasses.push(classe);

                    console.log("newClasses to send in loacalStorage " + JSON.stringify(previousClasses))
                    localStorage.setItem("All Classes", JSON.stringify(previousClasses));

                } else {
                    localStorage.setItem("All Classes", JSON.stringify(initArrayOfClasses));
                }

                commit("newClasse", response.data);
            })
            .catch(function(error) {
                console.log('newClasse in catch action =>' + JSON.stringify(body))
                console.log("😢😢😢" + error);

            });

    },
    actionUpdateClasse({ commit }, donnees) {
        const token = "Token " + localStorage.getItem('token');

        var body = donnees.classe;
        console.log(typeof body)
        axios
            .put(`api/ecole/classe/${donnees.identifiant}/`, body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {

                console.log("😍😍😍 update Année scolaire " + JSON.stringify(body) + '\n' + response.data);
                let actualClasses = JSON.parse(localStorage.getItem('All Classes'));

                actualClasses.splice(actualClasses.indexOf(body.identifiant), 1, body)

                localStorage.setItem("All Classes", JSON.stringify(actualClasses))

                commit("updateClasse");

            })
            .catch(function(error) {
                console.log("😢😢😢 errors" + error);
            })
    },
    actionNewConfigEcolage({ commit }, ecolage) {
        console.log("Classe à sauvegarder " + JSON.stringify(ecolage))
        const token = "Token " + localStorage.getItem("token");

        let body = ecolage; //attention ne jamais oublié d'assigner les valeurs recues dans body car axios l'exige
        axios
            .post('api/finances/ecolageAutresFrais/', body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {
                console.log("new Config Ecolage sent to Database " + JSON.stringify(response.data))

                let initArrayOfEcolages = [];
                response.data.cree_le = response.data.cree_le.slice(0, 16).replace("T", " à ");
                initArrayOfEcolages.push(response.data)

                if (localStorage.getItem("Config_Ecolage_et_Autres")) {
                    let previousEcolages = JSON.parse(localStorage.getItem("Config_Ecolage_et_Autres"));
                    previousEcolages.push(response.data);

                    console.log("newClasses to send in loacalStorage " + JSON.stringify(previousEcolages))
                    localStorage.setItem("Config_Ecolage_et_Autres", JSON.stringify(previousEcolages));

                } else {
                    localStorage.setItem("Config_Ecolage_et_Autres", JSON.stringify(initArrayOfEcolages));
                }

                commit("newConfigEcolage", response.data);
            })
            .catch(function(error) {
                console.log('new Config Ecolage in catch action =>' + JSON.stringify(body))
                console.log("😢😢😢" + error);

            });

    },
    actionNewConfigInscReinsc({ commit }, inscReinsc) {
        console.log("Classe à sauvegarder " + JSON.stringify(inscReinsc))
        const token = "Token " + localStorage.getItem("token");

        let body = inscReinsc; //attention ne jamais oublié d'assigner les valeurs recues dans body car axios l'exige
        axios
            .post('api/finances/ConfigFraisInscReinsc/', body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {
                console.log("new Config Insc Reinsc sent to Database " + JSON.stringify(response.data))

                let initArrayOfInscReinsc = [];
                response.data.cree_le = response.data.cree_le.slice(0, 16).replace("T", " à ");
                initArrayOfInscReinsc.push(response.data)

                if (localStorage.getItem("Config inscReinsc")) {
                    let previousInscReinsc = JSON.parse(localStorage.getItem("Config inscReinsc"));

                    previousInscReinsc.push(response.data);

                    console.log("newClasses to send in localStorage " + JSON.stringify(previousInscReinsc))
                    localStorage.setItem("Config inscReinsc", JSON.stringify(previousInscReinsc));

                } else {
                    localStorage.setItem("Config inscReinsc", JSON.stringify(initArrayOfInscReinsc));
                }
                commit("newConfigInscReinsc", response.data);
            })
            .catch(function(error) {
                console.log('newClasse in catch action =>' + JSON.stringify(body))
                console.log("😢😢😢" + error);

            });
    },
    actionNewConfigAutresFrais({ commit }, autreFrais) {
        console.log("Classe à sauvegarder " + JSON.stringify(autreFrais))
        const token = "Token " + localStorage.getItem("token");

        let body = autreFrais; //attention ne jamais oublié d'assigner les valeurs recues dans body car axios l'exige
        axios
            .post('api/finances/ecolageAutresFrais/', body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {
                console.log("new Config Autre frais sent to Database " + autreFrais)
                    /*    let initArrayOfEcolages = [];
                       initArrayOfEcolages.push(autreFrais)

                      if (localStorage.getItem("Config Ecolage")) {
                           let previousEcolages = JSON.parse(localStorage.getItem("Config Ecolage"));
                           previousEcolages.push(autreFrais);

                           console.log("newClasses to send in loacalStorage " + JSON.stringify(previousEcolages))
                          // localStorage.setItem("Config Ecolages", JSON.stringify(previousEcolages));

                       } else {
                           localStorage.setItem("Config Ecolage", JSON.stringify(initArrayOfEcolages));
                       }*/

                commit("newConfigAutresFrais", response.data);
            })
            .catch(function(error) {
                console.log('newClasse in catch action =>' + JSON.stringify(body))
                console.log("😢😢😢" + error);

            });

    }
}
const mutations = {

    newAnneeScolaire(state, anneeScolaire) {
        state.newAnneeScolaire = anneeScolaire
    },
    newConfigAutresFrais(response) {
        console.log("A gerer en tout cas" + response)
    },
    newConfigInscReinsc(response) {
        console.log("A gerer en tout cas" + response)
    },
    newConfigEcolage(response) {
        console.log("A gerer en tout cas " + response)
    },
    newClasse(state, classe) {
        console.log("😃😃😃 new Classe" + JSON.stringify(classe));
        state.classes.push(classe)

    },
    updateClasse() {
        //il faudra penser au state apres   
        let actualClasses = JSON.parse(localStorage.getItem('All Classes'));
        console.log("actualClasses " + JSON.stringify(actualClasses))
    },

    InitialiseAnneesScolaire(state, anneesScolaire) {

        state.annees_scolaire = anneesScolaire

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