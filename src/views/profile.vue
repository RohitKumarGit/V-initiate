<template>
<div >
    <div class="profile container mt-3 p-3">
        <div class="profile_top">
            <div class="profile_img">
            </div>
            <div class="profile_name title has-text-weight-bold ">Rohit Kumar
            <b-button type="is-info" @click="logout">Log Out</b-button>
            </div>
        </div>
        
    </div>
    <div class="container p-3 mt-2 profile">
    <b-tabs v-model="active_tab" type="is-primary">
        <b-tab-item label="My Listings">
             <div class="container p-3 mt-2 profile">
              <div v-if="problems.length === 0 " class=" has-text-centered nom mt-4">Projects posted by you will appear here !</div>
        <div class="header" v-else>Posted Projects</div>
        <div class="projects_home">
            
            <projectcard v-for="project in projects" :data="project" :key="project._id" :rem="true"></projectcard>
        </div>
    </div>
    <div class="container p-3 mt-2 profile">
        <div class="header">Posted Problems</div>
        <div v-if="problems.length === 0 " class=" has-text-centered nom mt-4">Problems posted by you will appear here !</div>
        <div class="projects_home" v-else>
            
            <problemcard v-for="problem in problems" :data="problem" :key="problem._id" :rem="true"></problemcard>
        </div>
    </div>
        </b-tab-item>
        <b-tab-item label="My interests">
             <div class="container p-3 mt-2 profile">
        <div class="header">Projects</div>
        <div v-if="interests.length === 0 " class=" has-text-centered nom mt-4">Your interests will appear here !</div>
        <div class="projects_home">
            
            <projectcard v-for="project in interests" :data="project" :key="project._id" :rem="false"></projectcard>
        </div>
    </div>
    
        </b-tab-item>
    </b-tabs>
    
    </div>
    
   
    </div>
</template>
<script>
import projectcard from '@/components/projectcard'
import problemcard from '@/components/problemcard'
import {mapState} from 'vuex'
import {mapActions} from 'vuex'
//import firebase from 'firebase'
//import axios from 'axios'

export default {
    components:{
        projectcard,
        problemcard
//        Problemcard
   
    },
    computed:{
        ...mapState(['auth','user',"problems","projects","interests"])
    },
    data(){
        return {
            active_tab:0
          
           
        }
    },
  
    methods:{
        ...mapActions(['logout','addid'])
    }
}
</script>