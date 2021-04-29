import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        annee_scolaire: '',
        token: '',
        AlertLogout: null
    },
    mutations: {
        initializeStore(state) {
            if (localStorage.getItem('token')) {
                state.isAuthenticated = true,
                    state.token = localStorage.getItem('token')
            } else {
                state.isAuthenticated = false,
                    state.token = ''
            }

            if (localStorage.getItem('année scolaire')) {
                state.annee_scolaire = localStorage.getItem('année scolaire')

            } else {
                const year = '1995-1996'
                state.annee_scolaire = year
            }
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
    actions: {},
    modules: {}
})