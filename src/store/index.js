import Vue from 'vue'
import Vuex from 'vuex'
import teachers from './modules/teachers'
import students from './modules/students'
import paiementFrais from './modules/paiementFrais'
import classes from './modules/classes'
import comptabilite from './modules/comptabilite'
import parametrages from './modules/parametrages'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuthenticated: undefined,
        authStatut: '',

        annee_scolaire: null,
        token: '',
        AlertLogout: null,
        eleves: null,
        matieres: null,
        classes: null,
        identifiants_classes: [],
        elements: [],
        alertErreur: '',

    },

    actions: {

        async actionCreateMatiere({ commit }, dataSend) {
            const token = "Token " + localStorage.getItem('token');
            console.log('données reçues' + dataSend)

            let body = dataSend; //attention ne jamais oublié d'assigner les valeurs recues dans body car axios l'exige
            await axios
                .post('api/ecole/matiere/', body, {
                    headers: {
                        'Authorization': token,
                    }
                })
                .then((response) => {
                    let noError = 'ok'
                    console.log("😃😃😃" + response);
                    commit("createMatieres", dataSend, noError);
                })
                .catch(function(error) {
                    console.log('dataSend in catch action =>' + JSON.stringify(body))
                    console.log("😢😢😢" + error);
                    commit('setErreurUpdate')
                });

        },

        actionUpdateMatiere({ commit }, donnees) {
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
                .put(`api/ecole/matiere/${donnees[0]}/`, body, {
                    headers: {
                        'Authorization': token,
                    }
                })
                .then((response) => {
                    let newMatiere = [donnees[0], donnees[1]]
                    console.log("😍😍😍 new data sent =>" + JSON.stringify(donnees[1]) + '\n' + response);
                    //****************attention il faut gérer ce beug (pas de mutation updateMatieres)
                    commit("updateMatieres", newMatiere);

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

        actionRemoveMatiere({ commit }, index) {
            var token = 'Token ' + localStorage.getItem('token')
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

        },

    },
    mutations: {
        initializeStore(state) {
            if (localStorage.getItem('token')) {
                state.isAuthenticated = true;
                state.token = localStorage.getItem('token');
                state.authStatut = localStorage.getItem('authStatut')
            } else if (localStorage.getItem('token') === "null") {
                state.isAuthenticated = false;
                state.token = null;
                state.matieres = null;
                state.classes = null;
                state.authStatut = '';
                state.identifiants_classes = [],
                    localStorage.setItem("nameAuth", null);
                localStorage.setItem('Matieres', null)
                localStorage.setItem('Classes', null)
                    // localStorage.setItem('id_Classes', null)
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
        setErreurUpdate(state) {
            state.alertErreur = 'Forbiden'
        },
        setAuthStatut(state, name) {
            state.authStatut = name
        },

        updateMatieres(state, newMatiere) {
            console.log('😷😷😷 attention j\'essaie de gérer le state.matieres du updateMatiere')
            let id = []
            for (const iterator of this.state.matieres) {
                id.push(iterator.id)
            }
            console.log(' Le tableau des id =>' + id + '\n La matiere avec l\'id ' +
                newMatiere[0] + ' est à la ' + id.indexOf(newMatiere[0]) + ' eme place')
            state.matieres[id.indexOf(newMatiere[0])] = newMatiere[1]

        },
        deleteMatiere(index) {
            const deleted = this.state.matieres.splice(index, 1);
            console.log(deleted)
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

    getters: {
        allEleves: state => {
            return state.eleves
        },
        allMatieres: state => {
            return state.matieres
        },

    },
    modules: {
        teachers,
        students,
        paiementFrais,
        classes,
        comptabilite,
        parametrages
    }
})