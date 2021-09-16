import axios from 'axios'

const state = {
    newAnneeScolaire: null,
    annees_scolaire: null,
    classes: [],
    configEcolage: [],
    configAutresFrais: [],
    configInscReinsc: [],
    depenses: [],
    messageParamNotDone: ""

};
const actions = {
    actionNewConfigDepense({ commit }, newDepense) {
        console.log("newDepense recu dans le store " + JSON.stringify(newDepense))
        const token = "Token " + localStorage.getItem("token");

        let body = newDepense; //attention ne jamais oublié d'assigner les valeurs recues dans body car axios l'exige
        axios
            .post('api/finances/configDepense/', body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {
                console.log("new Config_Dépenses sent to Database " + JSON.stringify(response.data))

                let initArrayOfNewDepenses = [];
                response.data.cree_le = response.data.cree_le.slice(0, 16).replace("T", " à ");
                initArrayOfNewDepenses.push(response.data)

                if (localStorage.getItem("Config_Dépenses")) {
                    let previousDepenses = JSON.parse(localStorage.getItem("Config_Dépenses"));

                    console.log("previous dépenses " + JSON.stringify(previousDepenses))
                    previousDepenses.push(response.data);

                    console.log("new dépenses to send in localStorage " + JSON.stringify(previousDepenses))
                    localStorage.setItem("Config_Dépenses", JSON.stringify(previousDepenses));

                } else {
                    localStorage.setItem("Config_Dépenses", JSON.stringify(initArrayOfNewDepenses));
                }

                commit("newDepense", response.data);
            })
            .catch(function(error) {
                console.log('new Config Autre Frais in catch action =>' + JSON.stringify(body))
                console.log("😢😢😢" + error);

            });

    },
    actionUpdateConfigDepense({ commit }, depenseUpdated) {
        const token = "Token " + localStorage.getItem('token');

        var body = depenseUpdated;
        console.log(typeof body)

        axios
            .put(`api/finances/configDepense/${body.identifiant}/`, body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {

                console.log("😍😍😍 update Dépense " + JSON.stringify(body) + '\n' + response.data);
                let allDepenses = JSON.parse(localStorage.getItem('Config_Dépenses'));

                allDepenses.splice(allDepenses.indexOf(body.identifiant), 1, body)

                localStorage.setItem("Config_Dépenses", JSON.stringify(allDepenses))

                commit("updateDepense", response.data);

            })
            .catch(function(error) {
                console.log("😢😢😢 errors" + error);
            })
    },
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
            .post('api/finances/configEcolage/', body, {
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

    async actionInitialiseFraisDeBase({ commit }, frais) {
        const token = "Token " + localStorage.getItem("token");
        let body = frais; //attention ne jamais oublié d'assigner les valeurs recues dans body car axios l'exige
        await axios
            .post('api/finances/configFraisEleve/', body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {

                console.log("😃😃😃" + JSON.stringify(response.data));

                let initArrayFraisDeBase = [];
                initArrayFraisDeBase.push(response.data)

                if (localStorage.getItem("Frais_de_base")) {
                    let previousFraisDebase = JSON.parse(localStorage.getItem("Frais_de_base"));
                    console.log("previousFraisdebase => " + JSON.parse(localStorage.getItem("Frais_de_base")));

                    previousFraisDebase.push(response.data);

                    console.log("new frais de base to send in localStorage " + JSON.stringify(previousFraisDebase))
                    localStorage.setItem("Frais_de_base", JSON.stringify(previousFraisDebase));

                } else {
                    localStorage.setItem("Frais_de_base", JSON.stringify(initArrayFraisDeBase));
                }
                commit("InititialiseFraisDeBase", response.data);
            })
            .catch(function(error) {
                console.log('frais de base in catch action =>' + JSON.stringify(body))
                console.log("😢😢😢" + error);

            });

    },
    actionNewConfigAutresFrais({ commit }, autreFrais) {
        console.log("autreFrais recu dans le store " + JSON.stringify(autreFrais))
        const token = "Token " + localStorage.getItem("token");

        let body = autreFrais; //attention ne jamais oublié d'assigner les valeurs recues dans body car axios l'exige
        axios
            .post('api/finances/configAutresFrais/', body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {
                console.log("new Config Autres Frais sent to Database " + JSON.stringify(response.data))

                let initArrayOfAutresFrais = [];
                response.data.cree_le = response.data.cree_le.slice(0, 16).replace("T", " à ");
                initArrayOfAutresFrais.push(response.data)

                if (localStorage.getItem("Config_Autres_Frais")) {
                    let previousAutresFrais = JSON.parse(localStorage.getItem("Config_Autres_Frais"));

                    console.log("previous AutreFrais " + JSON.stringify(previousAutresFrais))
                    previousAutresFrais.push(response.data);

                    console.log("new Autres Frais to send in localStorage " + JSON.stringify(previousAutresFrais))
                    localStorage.setItem("Config_Autres_Frais", JSON.stringify(previousAutresFrais));

                } else {
                    localStorage.setItem("Config_Autres_Frais", JSON.stringify(initArrayOfAutresFrais));
                }

                commit("newConfigAutresFrais", response.data);
            })
            .catch(function(error) {
                console.log('new Config Autre Frais in catch action =>' + JSON.stringify(body))
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
    actionUpdateConfigAutresFrais({ commit }, autrefrais) {
        const token = "Token " + localStorage.getItem('token');

        var body = autrefrais;
        console.log(typeof body)

        axios
            .put(`api/finances/configAutresFrais/${autrefrais.identifiant}/`, body, {
                headers: {
                    'Authorization': token,
                }
            })
            .then((response) => {

                console.log("😍😍😍 update Autre frais " + JSON.stringify(body) + '\n' + response.data);
                let Config_Autres_Frais = JSON.parse(localStorage.getItem('Config_Autres_Frais'));

                Config_Autres_Frais.splice(Config_Autres_Frais.indexOf(body.identifiant), 1, body)

                localStorage.setItem("Config_Autres_Frais", JSON.stringify(Config_Autres_Frais))

                commit("updateAutreFrais", response.data);

            })
            .catch(function(error) {
                console.log("😢😢😢 errors" + error);
            })
    },
    setParamsNotDone({ commit }, details) {

        commit('configNotDone', details)
    }

}
const mutations = {
    configNotDone(state, details) {
        console.log(details.message)
        state.messageParamNotDone = details.message
    },
    newAnneeScolaire(state, anneeScolaire) {
        state.newAnneeScolaire = anneeScolaire
    },
    InititialiseFraisDeBase(fraisDebase) {
        console.log("Attention il faudra bien gérer le state de " + JSON.stringify(fraisDebase))

    },
    newDepense(state, fraisDebase) {
        console.log("Attention il faudra bien gérer le state " + JSON.stringify(fraisDebase))
        state.depenses = JSON.parse(localStorage.getItem("Config_Dépenses"));

    },
    updateDepense(response) {
        console.log("A gerer en tout cas" + response)
        state.depenses = JSON.parse(localStorage.getItem("Config_Dépenses"));
    },
    newConfigAutresFrais(response) {
        console.log("A gerer en tout cas" + response)
        state.configAutresFrais = JSON.parse(localStorage.getItem("Config_Autres_Frais"));

    },
    updateAutreFrais(response) {
        console.log("A gerer en tout cas" + response)
        state.configAutresFrais = JSON.parse(localStorage.getItem("Config_Autres_Frais"));

    },
    newConfigInscReinsc(response) {
        console.log("A gerer en tout cas" + response)
        state.configAutresFrais = JSON.parse(localStorage.getItem("Config inscReinsc"));

    },
    newConfigEcolage(state, response) {
        console.log("A gerer en tout cas " + response)
        state.configEcolage = JSON.parse(localStorage.getItem("Config_Ecolage_et_Autres"));

    },
    newClasse(state, classe) {
        console.log("😃😃😃 new Classe" + JSON.stringify(classe));
        state.classes.push(classe)

    },
    updateClasse(state) {
        //il faudra penser au state apres   

        let actualClasses = JSON.parse(localStorage.getItem('All Classes'));
        state.classes = actualClasses
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
    },
    Classes: state => {
        return state.classes
    },
    AllConfigEcolage: state => {
        return state.configEcolage
    },
    AllConfigAutresFrais: state => {
        return state.configAutresFrais
    },
    AllConfigInscReinsc: state => {
        return state.configInscReinsc
    },

    Depenses: state => {
        return state.depenses
    },
    messageParamNotDone: state => {
        return state.messageParamNotDone
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}