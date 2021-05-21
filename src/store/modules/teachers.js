import axios from 'axios'
const state = {
    teachers: [],
    teachersFictifs: [{
        "enseignant_numero": 1,
        "nom": "Malonga Francy Saintrick",
        "civilite": "Masculin",
        "date_naissance": "11-Mai-1995",
        "lieu_naissance": "Brazzaville",
        "situationSociale": "Celibataire",
        "nationalite": "congolaise",
        "adresse": "4, Rue Makanga Annie, Moussosso",
        "telephone": "066932549",
        "email": "francy@gmail.com",
        "dateEmbauche": "2021-05-20",
        "modePaiement": "Manuel",
        "intituleCompte": "0",
        "numeroCompteBancaire": "0",
        "numeroCnss": "0",
        "enseigneAu": "College",
        "creeLe": "2021-05-20T00:30:00.150985Z",
        "modifieLe": "2021-05-20T00:30:00.150985Z",
        "matiereEnseigne": [
            7
        ],
        "classesOccupees": [
            "3e",
            "5e"
        ]
    }, {
        "enseignant_numero": 2,
        "nom": "Malonga Leonce Evrard",
        "civilite": "Masculin",
        "date_naissance": "22-Mars-2002",
        "lieu_naissance": "Brazzaville",
        "situationSociale": "Celibataire",
        "nationalite": "congolaise",
        "adresse": "4, Rue Makanga Annie, Moussosso",
        "telephone": "064005018",
        "email": "evrard@gmail.com",
        "dateEmbauche": "2021-05-20",
        "modePaiement": "Manuel",
        "intituleCompte": "",
        "numeroCompteBancaire": "",
        "numeroCnss": "",
        "enseigneAu": "College",
        "creeLe": "2021-05-20T00:34:58.166065Z",
        "modifieLe": "2021-05-20T00:34:58.166065Z",
        "matiereEnseigne": [
            6
        ],
        "classesOccupees": [
            "3e",
            "5e",
            "6e"
        ]
    }, {
        "enseignant_numero": 3,
        "nom": "Malonga Reine Frédérique",
        "civilite": "Feminin",
        "date_naissance": "30-01-2005",
        "lieu_naissance": "Brazzaville",
        "situationSociale": "Celibataire",
        "nationalite": "congolaise",
        "adresse": "4, Rue Makanga Annie, Moussosso",
        "telephone": "0600000",
        "email": "reine@gmail.com",
        "dateEmbauche": "2021-05-20",
        "modePaiement": "Manuel",
        "intituleCompte": "",
        "numeroCompteBancaire": "",
        "numeroCnss": "",
        "enseigneAu": "College",
        "creeLe": "2021-05-20T00:30:00.150985Z",
        "modifieLe": "2021-05-20T00:30:00.150985Z",
        "matiereEnseigne": [
            7
        ],
        "classesOccupees": [
            "3e",
            "5e"
        ]
    }],
};
const actions = {
    actionInitialiseTeachers({ commit }) {
        let config = {
            url: 'api/ecole/enseignant',
            method: 'get',
            headers: {
                Authorization: `Token ${this.$store.state.token}`
            }
        }
        axios(config)
            .then(resp => {
                console.log(resp.data);
                commit('InitialiseTeachers')
            })
            .catch(err => {
                console.log(err)
            })
    }
};
const mutations = {

    InitialiseTeachers(state, teachers) {
        state.teachers = teachers
        localStorage.setItem("Matieres", teachers);
    },

    updateTeachers(state, newProf) {
        console.log('🐶  attention j\'essaie de gérer le state.matieres du updateMatiere')
        let id = []
        for (const iterator of this.state.matieres) {
            id.push(iterator.id)
        }
        console.log(' Le tableau des id =>' + id + '\n Le prof avec l\'id ' +
            newProf[0] + ' est à la ' + id.indexOf(newProf[0]) + ' eme place')
        state.teachers[id.indexOf(newProf[0])] = newProf[1]
    },

    deleteTeacher(index) {
        const deleted = this.state.teachers.splice(index, 1);
        console.log('enseignant supprimé =>' + deleted)
    },


};
const getters = {
    allTeachers: state => {
        return state.teachers
    },
    allTeachersFictifs: state => {
        return state.teachersFictifs
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}