import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: [
            {
                path: '/',
                name: 'Accueil',
                meta: {
                    layout: 'accueil-layout'
                },
                component: () => import(/* webpackChunkName: "about" */ './views/Accueil.vue')
            },
            {
                path: '/Inscription',
                name: 'Inscription',
                meta: {
                    layout: 'inscription-layout'
                },
                component: () => import(/* webpackChunkName: "about" */ './views/Inscription.vue')
            },
            {
                path: '/Administration',
                name: 'Administration',
                meta: {
                    layout: 'admin-layout',
                    requiresAuth: true
                },
                component: () => import(/* webpackChunkName: "about" */ './views/Administration.vue')
            },
            {
                path: '/Brocanteurs',
                name: 'Brocanteurs',
                meta: {
                    layout: 'brocanteurs-layout',
                    requiresAuth: true
                },
                component: () => import(/* webpackChunkName: "about" */ './views/Brocanteurs.vue')
            },
            {
                path: '/Emplacements',
                name: 'Emplacements',
                meta: {
                    layout: 'emplacements-layout',
                    requiresAuth: true
                },
                component: () => import(/* webpackChunkName: "about" */ './views/Emplacements.vue')
            },
            {
                path: '/Finances',
                name: 'Finances',
                meta: {
                    layout: 'finances-layout',
                    requiresAuth: true
                },
                component: () => import(/* webpackChunkName: "about" */ './views/Finances.vue')
            },
            {
                path: '/Administrateurs',
                name: 'Administrateurs',
                meta: {
                    layout: 'administrateurs-layout',
                    requiresAuth: true
                },
                component: () => import(/* webpackChunkName: "about" */ './views/Administrateurs.vue')
            }
        ]
    }
);

router.beforeEach((to, from, next) => {
    if (!to.meta.requiresAuth) {
        next()
        return
    }

    if (sessionStorage.hasOwnProperty('token')) {
        next()
        return
    }
    router.push({name: '/'});
});

export default router
