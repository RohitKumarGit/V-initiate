<template>
    <div class="container">
   <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>
        <div class="header">
            Problems posted 
            <b-button tag="router-link" to="/post_problem" class="mt-3" type="is-primary" > Post Problem</b-button>
        </div>
        <div class="subtitle has-text-primary">
        In your area
        </div>
        <b-field label="Enter Categories">
            <b-taginput
                v-model="tags"
                ellipsis
                icon="label"
                placeholder="Start typing"
                aria-close-label="Delete this tag">
            </b-taginput>
        </b-field>
        <b-button @click="update" type="is-primary">Update </b-button>
        
        <div class="projects_home" v-if="problems.length > 0 ">

        <problemcard v-for="problem in problems" :key="problem._id" :data="problem"></problemcard>
       
        </div>
        <div v-else>
            <h2 class="nom h1 has-text-centered has-text-weight-bold is-primary">No matching results!</h2>
        </div>
    </div>
</template>
<script>
import problemcard from '@/components/problemcard'
import axios from 'axios'
export default {
    components:{
        problemcard
    },methods:{
        async update(){
            this.isLoading = true
            if(this.tags.length === 0){
                this.getByCity()
                return
            }
        const {data} = await axios.get('/api/problem/bytags',{params:{tags:this.tags}})
        this.problems = data.problems
        this.isLoading = false
    },async getByCity(){
        this.isLoading = true
        const {data} = await axios.get('/api/problem/bycity',{params:{city:localStorage.getItem("city"),completed:this.completed}});
        this.problems = data.problems
        console.log(data)
        this.isLoading = false
    },
    },
    created() {
      
        this.getByCity()
    },
    data(){
        return {
            tags:[],
            problems:[],
            isLoading:true,
        }
        
    },
    
}
</script>