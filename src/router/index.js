import {createRouter, createWebHistory} from 'vue-router'

import NotFound from '../views/NotFound'
import Home from '../views/Home'
import Restaurants from '../views/Restaurants'
import RestaurantPage from '../views/RestaurantPage'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'
import MojiObjekti from '../views/MojiObjekti'
import AdminPanel from '../components/AdminPanel'
import MyReviews from '../views/MyReviews'
import Forbidden from '../views/Forbidden'


const routes =[
    {
        path: '/ugostitelj/objekti',
        name: 'MojiObjekti',
        component: MojiObjekti,
        meta: { requiresAuth: true }
    },
    {
        path: '/gost/reviews',
        name: 'MyReviews',
        component: MyReviews,
        meta: { requiresAuth: true }
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: false }
    },
    {
        path: '/objects',
        name: 'Restaurants',
        component: Restaurants,
        meta: { requiresAuth: false }
    },
    {
        path: '/objects/:id',
        name: 'RestaurantPage',
        component: RestaurantPage,
        meta: { requiresAuth: false }
    },
    {
        path: '/register',
        name: 'SignupForm',
        component: SignupForm,
        meta: { requiresAuth: false }
    },
    {
        path: '/login',
        name: 'LoginForm',
        component: LoginForm,
        meta: { requiresAuth: false }
    },
    {
        path: '/admin',
        name: 'AdminPanel',
        component: AdminPanel,
        meta: { requiresAuth: true }
    },
    {
        path: '/forbidden',
        name: 'Forbidden',
        component: Forbidden,
        meta: { requiresAuth: false }
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound,
        meta: { requiresAuth: false }
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    
    if (to.meta.requiresAuth) { // Samo ako je route secret tj. zasticena
        // console.log("Probao si pristupi tajnim podacima.")
        
        // Ugostitelj.
        if(to.fullPath.startsWith('/ugostitelj')){
            if(localStorage.getItem('user')){
                if(JSON.parse(localStorage.getItem('user')).uloga == 'ugostitelj'){
                    next()
                }
                else{
                    next('/forbidden')
                }
            }
            else{
                next('/forbidden')
            }
        }

        // Gost.
        if(to.fullPath.startsWith('/gost')){
            if(localStorage.getItem('user')){
                if(JSON.parse(localStorage.getItem('user')).uloga == 'gost'){
                    next()
                }
                else{
                    next('/forbidden')
                }
            }
            else{
                next('/forbidden')
            }
        }

        // admin.
        if(to.fullPath.startsWith('/admin')){
            if(localStorage.getItem('user')){
                console.log(localStorage.getItem('user'))
                if(JSON.parse(localStorage.getItem('user')).uloga == 'admin'){
                    next()
                }
                else{
                    next('/forbidden')
                }
            }
            else{
                next('/forbidden')
            }
        }

    } 
    else {
      next();
    }
})

export default router