import Vue from 'vue'
import VueRouter from 'vue-router'
import Finances from '@/views/Finances.vue'
import Enseignants from '@/views/Enseignants.vue'
import Connexion from '@/views/Connexion.vue'
import Login from '@/components/Login.vue'
import LogoutAlert from '@/components/LogoutAlert.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Connexion',
        component: Connexion
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
        path: '/enseignants',
        name: 'Enseignants',
        component: Enseignants
    },
    {
        path: '/deconnexion',
        name: 'LogoutAlert',
        component: LogoutAlert
            // navbarTop: navbar

    },
    {
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