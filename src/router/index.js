import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import volunteer from '@/views/volunteer'
import problems from '@/views/problems'
import postproject from '@/views/postproject'
import postproblem from '@/views/postproblem'
import viewproject from '@/views/viewproject'
//import store from '../store'
//import firebase from 'firebase'
import viewproblem from '@/views/viewproblem'
import profile from '@/views/profile'
import login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/volunteer',
    name: 'Home',
    component: volunteer
  },{
    path: '/problems',
    name: 'Home',
    component: problems
  },{
    path: '/post_project',
    name: 'auth',
    component: postproject
  },{
    path: '/post_problem',
    name: 'auth',
    component: postproblem
  },{
    path: '/view_project/:id',
    name: 'view_project',
    component: viewproject
  },{
    path: '/view_problem/:id',
    name: 'Home',
    component: viewproblem
  },{
    path: '/profile',
    name: 'auth',
    component: profile
  },{
    path:'/login',
    name:"login",
    component:login,
   
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
