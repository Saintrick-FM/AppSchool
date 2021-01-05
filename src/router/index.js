import Vue from 'vue'
import VueRouter from 'vue-router'
import MainHome from '@/components/MainHome.vue'
import About from '@/views/About.vue'

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
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router