import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/etudiant',
    name: 'Etudiant',
    // route level code-splitting
    // this generates a separate chunk (etudiant.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "etudiant" */ '../views/Etudiant.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (admin.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue')
  },
  {
    path: '/mapadmin',
    name: 'MapAdmin',
    // route level code-splitting
    // this generates a separate chunk (admin.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admin" */ '../views/MapAdmin.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
