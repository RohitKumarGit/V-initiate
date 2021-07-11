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
    component: Home,
    meta:{
      auth:false
    }
  },{
    path: '/volunteer',
    name: 'voluneteer',
    component: volunteer,
    meta:{
      auth:false
    }
  },{
    path: '/problems',
    name: 'problems',
    component: problems,
    meta:{
      auth:false
    }
  },{
    path: '/post_project',
    name: 'post_project',
    component: postproject,
    meta:{
      auth:true
    }
  },{
    path: '/post_problem',
    name: 'post_problem',
    component: postproblem,
    meta:{
      auth:true
    }
  },{
    path: '/view_project/:id',
    name: 'view_project',
    component: viewproject,
    meta:{
      auth:true
    }
  },{
    path: '/view_problem/:id',
    name: 'view_problem',
    component: viewproblem,
    meta:{
      auth:true
    }
  },{
    path: '/profile',
    name: 'profile',
    component: profile,
    meta:{
      auth:true
    }
  },{
    path:'/login',
    name:"login",
    component:login,
    meta:{
      auth:false
    }
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
