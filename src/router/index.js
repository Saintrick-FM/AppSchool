import Vue from 'vue'
import VueRouter from 'vue-router'
import MainHome from '@/components/MainHome.vue'
import About from '@/views/About.vue'
import Enseignants from '@/views/Enseignants.vue'
import login from '@/components/Login.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'MainHome',
        component: MainHome
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/login',
        name: 'Login',
        component: login
    },
    {
        path: '/enseignants',
        name: 'Enseignants',
        component: Enseignants
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