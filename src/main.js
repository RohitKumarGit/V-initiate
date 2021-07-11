import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './style.scss'
import VueDisqus from 'vue-disqus'
import VueSocialSharing from 'vue-social-sharing'
import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCvILHG7Co-4XI3ZYX8RTbevSZ8xRTGC4E",
  authDomain: "twitter-clone-40897.firebaseapp.com",
  databaseURL: "https://twitter-clone-40897.firebaseio.com",
  projectId: "twitter-clone-40897",
  storageBucket: "twitter-clone-40897.appspot.com",
  messagingSenderId: "821803565237",
  appId: "1:821803565237:web:32b4794f42c2f164413efc"
};
firebase.initializeApp(firebaseConfig);
//const requiresAuth = ["post_project","view_project","post_problem","view_problem"]

router.beforeEach((to, from, next) => {
 
  if( to.meta.auth === false){
    
    next()
    
  }
  else {
    
    if(store.state.isAuth){
      next()
    }
    else {
      next({name:"login",query:{redir_url:to.fullPath}})
    }
  }
 
})
Vue.use(VueSocialSharing);
Vue.use(VueDisqus, {
  shortname: 'community-yf8u4fpeyk'
})

Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
