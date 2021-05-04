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
        initializeMatieres(state, matiere) {
            state.matieres = matiere
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
        async actionInitialiseMatiere({ commit }) {
            const token = "Token " + this.state.token;

            var config = {
                method: "get",
                url: "api/ecole/matiere/",
                headers: {
                    Authorization: token, // attention ici il faut pas utiliser les backticks ``pour inclure la variable token
                },
            };

            await axios(config)
                .then((response) => {
                    const result = JSON.stringify(response.data); // ceci vient de postman
                    console.log("😃😃😃" + result);
                    localStorage.setItem('Matieres', result)
                    commit("initializeMatieres", result);
                    // this.eleves = response.data;
                })
                .catch(function(error) {
                    console.log("😢😢😢" + error);
                });
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
    modules: {},
})