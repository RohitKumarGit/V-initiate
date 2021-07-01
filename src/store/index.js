import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[createPersistedState()],
  state: {
    auth:false,
    user:{},
    projects:[],
   problems:[],
    interests:[],
   
  },
  mutations: {
     adduser(state,user){
       console.log("here bitches")
       console.log("setting user",user)
      state.user = user
      state.auth = true
     
     
      
    },
    removeuser(state){
      state.user = {}
      state.auth = false
      state.problems = []
      state.projects = []
      state.interests= []
      if(window.location.pathname !== "/"){
        window.location = '/'
      }
     // 
    },
    addProject(state,projects){
      state.projects =projects
    },
    addProblem(state,data){
      state.problems =data
    },
    addInterest(state,data){
      state.interests =data
    }
  },
  actions: {
    async login(context){
      try {
        var provider = new firebase.auth.GoogleAuthProvider();
        
        const {user} = await firebase.auth().signInWithPopup(provider)
        context.dispatch("addid",user)
        if(window.location.pathname !== '/profile'){
          window.location = '/profile'
      }

     
      } catch (error) {
        alert(error)
      }
    },
    logout(context){
      
      firebase.auth().signOut().then(() => {
  // Sign-out successful.
        context.commit("removeuser")
  
}).catch((error) => {
  // An error happened.
  console.log(error)
});
      
    },
    async addid(context,user){
      const {data} = await axios.post('/api/user/verify',{uid:user.uid})
      const token = await user.getIdToken()
      axios.defaults.headers.common['Authorization'] = token
      user.token = token
      if(!data.isThere){
        const resp = await axios.post('/api/user',{
          name:user.displayName,
          uid:user.uid,
          photo:user.photoURL
        })
        console.log("id",resp.data.user._id)
        user._id = resp.data.user._id
      }
      else {
        const resp = await axios.get('/api/user',{params:{uid:user.uid}})
       
        console.log("id",resp.data.user._id)
        user._id = resp.data.user._id
      }
      console.log("here bitches1",user)
      context.commit("adduser",user)
      context.dispatch("filldata")
    },
    async filldata({commit,state}){
      console.log("doing")
      console.log("1,",state.user)
      try {
        const {data} = await axios.get('/api/project/interested',{params:{user_id:state.user._id}})
          commit("addInterest",data.projects)
          const resp = await axios.get('/api/project/byuser',{params:{user_id:state.user._id}})
          commit("addProject",resp.data.projects)
          const resp1 = await axios.get('/api/problem/byuser',{params:{user_id:state.user._id}})
          commit("addProblem",resp1.data.problems)
      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})
