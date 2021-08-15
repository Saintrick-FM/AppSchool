import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/Login.vue'
import Students from '@/components/Students.vue'

import Teachers from '@/components/Enseignants/Teachers.vue'
import Matieres from '@/components/Enseignants/Matieres.vue'
import PresencesEnseignants from '@/components/Enseignants/PresencesEnseignants.vue'

import Bilan from '@/components/Finances/Bilan.vue'
import Recettes from '@/components/Finances/Recettes.vue'
import Depenses from '@/components/Finances/Depenses.vue'
import Mouvements from '@/components/Finances/Mouvements.vue'

import Enseignants from '@/views/Enseignants.vue'
import Eleves from '@/views/Eleves.vue'
import Finances from '@/views/Finances.vue'



Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Connexion',
        component: () =>
            import ('@/views/Connexion.vue')

    },
    {
        path: '/finances',
        name: 'Finances',
        component: Finances,
        children: [{
                name: 'Recettes',
                path: '/recettes',
                component: Recettes
            },
            {
                name: 'Depenses',
                path: '/depenses',
                component: Depenses
            },
            {
                name: 'Mouvements',
                path: '/mouvements',
                component: Mouvements
            },
            {
                name: 'Bilan',
                path: '/bilan',
                component: Bilan
            }
        ]
    },

    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/eleves',
        name: 'eleves',
        component: Eleves
    },
    {
        path: '/students',
        name: 'students',
        component: Students
    },
    {
        path: '/enseignants',
        name: 'Enseignants',
        component: Enseignants,
        children: [{
                name: 'matiere',
                path: '/matiere',
                component: Matieres
            },
            {
                name: 'presencesEnseignants',
                path: 'presences_enseignants',
                component: PresencesEnseignants
            },
            {
                name: 'teachers',
                path: 'teachers',
                component: Teachers
            }
        ]
    },

    /*ici on declare le children pour evoquer les components qui seront annexés dans le </v-router> contenu de cette view 
    children: [{
            name: 'matiere',
            path: '/matiere',
            component: Matieres
        },
        {
            name: 'presencesEnseignants',
            path: 'presences_enseignants',
            component: PresencesEnseignants
        },
        {
            name: 'teachers',
            path: 'teachers',
            component: Teachers
        }
    ]*/


    {
        path: '/deconnexion',
        name: 'LogoutAlert',
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/components/LogoutAlert.vue')
            // navbarTop: navbar

    }, {
        path: '*',
        redirect: '/',
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router