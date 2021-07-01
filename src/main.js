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
firebase.auth().onAuthStateChanged((user) => {
  console.log("setting from main",user)
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log("logged in")
    store.dispatch("addid",user)
    // ...
  } else {
    // User is signed out
    // ...
    console.log("not")
    store.commit("removeuser")
  }
});
router.beforeEach((to, from, next) => {
  if(to.name === 'auth' && !store.state.auth) next({name:'login'})
  else {
    next()
  }
  
})
Vue.use(VueSocialSharing);
Vue.use(VueDisqus, {
  shortname: 'community-yf8u4fpeyk'
})
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
   
//     var uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//     console.log("logout")
//   }
// });
Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
