<template>
    <div class="container">
      <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>
        <div class="header">
            Projects to volunteer {{$router.query}}
        </div>
        <div class="subtitle has-text-primary">
        In your area
        </div>
        <keep-alive>
         <b-switch v-model="completed">Is Completed</b-switch>
        </keep-alive>
       
        <b-field label="Enter Categories">
        <keep-alive>
        
       
           <b-taginput 
                v-model="tags"
                ellipsis
                icon="label"
                placeholder="Add a tag"
                aria-close-label="Delete this tag">
            </b-taginput>
              </keep-alive>
        </b-field>
        
       
        <b-button class="mt-1 " type="is-primary" @click="update">Update</b-button>
        <div class="projects_home" v-if="projects.length > 0 ">
        <projectcard v-for="project in projects" :key="project._id" :data ="project"></projectcard>
       
        </div>
         <div v-else>
            <h2 class="nom h1 has-text-centered has-text-weight-bold is-primary">No matching results!</h2>
        </div>
    </div>
</template>
<script>
import projectcard from '@/components/projectcard'
import axios from 'axios'
export default {
    components:{
        projectcard
    },
    data(){
        return {
            projects:[],
            completed:false,
            tags:[],
            isLoading:true
        }
    },
     created() {
         axios.defaults.headers.common['Authorization'] = this.$store.state.user.token
         if(this.$route.query.tags){
            
             this.tags = this.$route.query.tags.split(",")
         }
         
        this.update()
    },
    methods:{
        async update(){
            this.isLoading = true
            if(this.tags.length === 0){
                this.getByCity()
                return
            }
        const {data} = await axios.get('/api/project/bytags',{params:{tags:this.tags,completed:this.completed}})
       
        this.projects = data.projects
        this.isLoading = false
        
    },async getByCity(){
        this.isLoading = true 
        const {data} = await axios.get('/api/project/bycity',{params:{city:localStorage.getItem("city"),completed:this.completed}});
        
        this.projects = data.problems
        this.isLoading = false
       
    },
    }
    
}
</script>