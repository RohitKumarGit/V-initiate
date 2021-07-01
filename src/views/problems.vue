<template>
    <div class="container">
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
            if(this.tags.length === 0){
                this.getByCity()
                return
            }
        const {data} = await axios.get('/api/problem/bytags',{params:{tags:this.tags}})
        this.problems = data.problems
        console.log(data)
    },async getByCity(){
        const {data} = await axios.get('/api/problem/bycity',{params:{city:localStorage.getItem("city"),completed:this.completed}});
        this.problems = data.problems
        console.log(data)
    },
    },
    created() {
        axios.defaults.headers.common['Authorization'] = this.$store.state.user.token
        this.getByCity()
    },
    data(){
        return {
            tags:[],
            problems:[]
        }
        
    },
    
}
</script>