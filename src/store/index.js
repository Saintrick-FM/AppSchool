import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        annee_scolaire: '',
        token: '',
        AlertLogout: null,
        eleves: null,
        matieres: null,
        elements: [],
    },
    mutations: {
        initializeStore(state) {
            if (localStorage.getItem('token')) {
                state.isAuthenticated = true;
                state.token = localStorage.getItem('token');
            } else {
                state.isAuthenticated = false;
                state.token = '';
                state.matieres = null;
                localStorage.setItem('Matieres', null)
            }

            if (localStorage.getItem('année scolaire')) {
                state.annee_scolaire = localStorage.getItem('année scolaire')

            } else {
                const annee = new Date()
                const year = annee.getFullYear() + '-' + (annee.getFullYear() + 1)
                state.annee_scolaire = year
            }

            if (localStorage.getItem('Matieres')) {
                state.matieres = localStorage.getItem('Matieres')
            } else {
                state.matiere = null
            }

        },

        initializeEleve(state, eleves) {
            state.eleves = eleves
        },

        //cette methode est à corriger d'ici peu 
        createMatieres(state, matiere) {
            state.matieres = matiere
        },

        updateMatieres() {
            console.log('😿 attention il faut gerer le state.matieres du updateMatiere')
        },
        deleteMatiere(index) {
            const deleted = this.state.matieres.splice(index, 1);
            console.log(deleted)
        },
        setAnneeScolaire(state, annee) {
            state.annee_scolaire = annee
        },
        removeAnneeScolaire(state) {
            state.annee_scolaire = ''
        },
        setToken(state, token) {
            state.token = token,
                state.isAuthenticated = true
        },
        removeToken(state) {
            state.token = '',
                state.isAuthenticated = false
        },

        setAlertLogout(state, alert) {
            state.AlertLogout = alert
        },
        removeAlertLogout(state) {
            state.AlertLogout = false
        },

    },
    actions: {
        // async setEleves({ commit }) {
        //     const eleves = await axios.get('api/inscriptions/inscriptions/')
        //     console.log(eleves)
        //     commit('initialiseEleves', eleves)
        // },
        /* async actionCreateMatiere({ commit }, dataSend) {
            const token = "Token " + this.state.token;
            console.log('données reçues' + JSON.stringify(dataSend))

            let element = []
            for (const key in dataSend) {
                element.push(dataSend[key]);
            }
            this.elements = element
            console.log('element =>' + this.elements + ' element[0] =>' + this.elements[0])
            var config = {
                method: "post",
                url: `api/ecole/matiere/`,
                data: {
                    "nomMatiere": this.elements[0],


                    "pluriProf": this.elements[1],

                    "seanceParSemaine": Number(this.elements[2]),
                    "coefficient": Number(this.elements[3]),

                    "classAssocie": this.elements[4]
                },
                
                {"nomMatiere":"Anglais","pluriProf":"oui","seanceParSemaine":"5","coefficient":"5","classAssocie":"4e"}
                {
                    "nomMatiere": "Chimie",
                    //"codeMatiere": null,
                    "pluriProf": "Non",
                    // "matiereDeBase": null,
                    "seanceParSemaine": 8,
                    "coefficient": 2,
                    //"groupeMatiere": null,
                    "classAssocie": [
                        "4e"
                    ]
                },
                headers: {
                    Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
                },

            };

            await axios(config)
                .then((response) => {
                    console.log("" + response);
                    commit("createMatieres", dataSend);
                    // this.eleves = response.data;
                })
                .catch(function(error) {
                    console.log("" + error);
                });
        },*/

        async actionCreateMatiere({ commit }, dataSend) {
            const token = "Token " + this.state.token;
            console.log('données reçues' + dataSend)

            let body = dataSend; //attention ne jamais oublié d'assigner les valeurs recues dans body car axios l'exige
            await axios
                .post('api/ecole/matiere/', body, {
                    headers: {
                        'Authorization': token,
                    }
                })
                .then((response) => {
                    console.log("😃😃😃" + response);
                    commit("createMatieres", dataSend);
                })
                .catch(function(error) {
                    console.log('dataSend in catch action =>' + JSON.stringify(body))
                    console.log("😢😢😢" + error);
                });

        },

        async actionUpdateMatiere({ commit }, donnees) {
            const token = "Token " + this.state.token;
            console.log(
                "id du cours à updater =>" +
                donnees[0] +
                "\n objet modifié du save =>" +
                JSON.stringify(donnees[1])
            );

            var body = donnees[1];
            console.log(typeof body)
            await axios
                .put(`api/ecole/matiere/${donnees[0]}/`, body, {
                    headers: {
                        'Authorization': token,
                    }
                })
                .then((response) => {
                    console.log("😍😍😍 new data sent =>" + JSON.stringify(donnees[1]) + '\n' + response);
                    commit("updateMatieres" /*donnees[1]*/ );
                })
                .catch(function(error) {
                    console.log("😢😢😢" + JSON.stringify(donnees[1]) + '\nerrors' + error);
                });
        },

        actionRemoveMatiere({ commit }, index) {
            var token = 'Token ' + this.state.token
            var config = {
                method: 'delete',
                url: `api/ecole/matiere/${index}`,
                headers: {
                    'Authorization': token
                }
            }
            axios(config)
                .then((resp) => {
                    console.log('😍😍😍 element with id ' + index + ' deleted\n' + resp);
                    commit('deleteMatiere', index)
                })
                .catch((err) => { console.log(err) })

        }
    },

    getters: {
        allEleves: state => {
            return state.eleves
        },
        allMatieres: state => {
            return state.matieres
        },
    },
    modules: {},
})