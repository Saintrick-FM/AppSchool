import Vue from 'vue'
import VueRouter from 'vue-router'
import Finances from '@/views/Finances.vue'
import Enseignants from '@/views/Enseignants.vue'
import Connexion from '@/views/Connexion.vue'
import Login from '@/components/Login.vue'

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
            // navbarTop: navbar
        
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/enseignants',
        name: 'Enseignants',
        components: Enseignants
    },
    {
        path: '/Connexion',
        name: 'Connexion',
        component: Connexion
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