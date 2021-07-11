import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[vuexLocal.plugin],
  state: {
    isAuth:false,
    user:{},
    projects:[],
   problems:[],
    interests:[],
   
  },
  mutations: {
    SET_USER(state,user){
      
      if(user == null || user == undefined){
        state.user = {}
        state.isAuth = false;
      }
      else {
        state.user = {...user,...state.user}
        state.isAuth = true
      }
      
    },
    addProject(state,projects){
      state.projects =[...state.projects,...projects]
    },
    addProblem(state,data){
      state.problems =[...state.problems,...data]
    },
    addInterest(state,data){
      state.projects =[...state.projects,...data]
    }
  },
  actions: {
   
    async adduser(context,fuser){
      try {
        // f user has actual user
        const {data} = await axios.post('/api/user/verify',{uid:fuser.uid})
        const token = await fuser.getIdToken()
        fuser.token = token
        axios.defaults.headers.common['Authorization'] = token
        if(data.isThere){
          console.log("firing from here")
          const resp = await axios.get('/api/user',{params:{uid:fuser.uid}})
          resp.data.user.token = token
         
          context.commit("SET_USER",resp.data.user)
        
          
        }
        else {
          const resp = await axios.post('/api/user',{
            name:fuser.displayName,
            uid:fuser.uid,
            photo:fuser.photoURL
          })
          resp.data.user.token = token
         
          context.commit("SET_USER",resp.data.user)
          
         
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})
