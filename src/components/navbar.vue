<template>
<div>
<b-modal 
            v-model="cityChanger"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-label="Example Modal"
            aria-modal>
            <template #default="props">
                <citychanger v-bind="formProps" @close="props.close"></citychanger> 
            </template>
        </b-modal>
    <b-navbar>
    
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template #start>
           
            <b-navbar-item  >
            <router-link to="/volunteer" tag="span">Volunteer</router-link>
                
            </b-navbar-item>
          <b-navbar-item  >
            <router-link to="/problems" tag="span">probem Identifier</router-link>
                
            </b-navbar-item>
            <b-navbar-item href="#">
                Resources
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <div class="button " @click="changeCity">
                   
           <b-icon class="mr-2"
                icon="compass"
                size="is-small"
                >
            </b-icon>
            
       
                   {{cty}}
                    </div>
                    <router-link class="button is-primary" to="/post_project">
                        <strong>Start project</strong>
                    </router-link >
                     <b-button tag="router-link" to="/profile" type="is-success" outlined>
                     <b-icon
                icon="account"
                size="is-small">
            </b-icon>
                    Account </b-button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
    </div>
</template>
<script>
import citychanger from '@/components/citychanger'
//import firebase from 'firebase'
export default {
    methods:{
        changeCity(){
            console.log("cj")
                this.cityChanger =true

        }
    },
    data(){
        return {
            cityChanger:false
        }
        
    },
    components:{
        citychanger
    },
    computed:{
        cty(){
            return localStorage.getItem("city")
        }
    },
    created() {
    
     
    }
}
</script>