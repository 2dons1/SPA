import {createRouter, createWebHistory} from 'vue-router'

import About from '../views/About'
import Countries from '../views/Countries'
import NotFound from '../views/NotFound'
import Home from '../views/Home'
import Clock from '../views/Clock'
import Capital from '../views/Capital'


const routes =[
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/countries',
        name: 'Countries',
        component: Countries
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/clock',
        name: 'Clock',
        component: Clock
    },
    {
        path: '/capital',
        name: 'Capital',
        component: Capital
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    },

]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


export default router