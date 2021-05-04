import Vue from 'vue'
import VueRouter from 'vue-router'
import Finances from '@/views/Finances.vue'
import Matieres from '@/components/Matieres.vue'
import PresencesEnseignants from '@/components/PresencesEnseignants.vue'
import Teachers from '@/components/Teachers.vue'
import Enseignants from '@/views/Enseignants.vue'
import Login from '@/components/Login.vue'
import Students from '@/components/Students.vue'

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
        component: Finances

    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/eleves',
        name: 'eleves',
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