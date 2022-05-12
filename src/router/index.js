import {createRouter, createWebHistory} from 'vue-router'

import NotFound from '../views/NotFound'
import Home from '../views/Home'
import Restaurants from '../views/Restaurants'
import RestaurantPage from '../views/RestaurantPage'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'
import MojiObjekti from '../views/MojiObjekti'


const routes =[
    {
        path: '/ugostitelj/objekti',
        name: 'MojiObjekti',
        component: MojiObjekti
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/restaurants',
        name: 'Restaurants',
        component: Restaurants
    },
    {
        path: '/restaurants/:id',
        name: 'RestaurantPage',
        component: RestaurantPage
    },
    {
        path: '/register',
        name: 'SignupForm',
        component: SignupForm
    },
    {
        path: '/login',
        name: 'LoginForm',
        component: LoginForm
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