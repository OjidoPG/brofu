import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Accueil',
      meta:{
        layout:'accueil-layout'
      },
      component: ()=>import(/* webpackChunkName: "about" */ './views/Accueil.vue')
    },
    {
      path: '/Inscription',
      name: 'Inscription',
      meta:{
        layout:'inscription-layout'
      },
      component: ()=>import(/* webpackChunkName: "about" */ './views/Inscription.vue')
    }
  ]
})
