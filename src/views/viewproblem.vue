<template>
  <div v-if="!loading">

    <div>
        <div class="container viewp">
            <div class="viewp_image" :style="'background:url('+this.imgurl+')'">

            </div>
            <div class="viewp_cont">           
             <div class="viewp_title title has-text-weight-bold">{{data.title}}</div>
             
           
                 <div class="is-flex">
                <ShareNetwork
    network="facebook"
    :url="url"
    :title="data.title"
    :description="data.desc"
   
  >
    <div class="social fb"> <b-icon size="medium" icon="facebook"></b-icon></div>
  
   
</ShareNetwork>
 <ShareNetwork
    network="twitter"
   :url="url"
   :title="data.title"
    :description="data.desc"
   
  >
    <div class="social fb"> <b-icon size="medium" icon="twitter"></b-icon></div>
  
   
</ShareNetwork>
 <ShareNetwork
    network="whatsapp"
    :url="url"
   :title="data.title"
    :description="data.desc"
  >
    <div class="social fb"> <b-icon size="medium" icon="whatsapp"></b-icon></div>
  
   
</ShareNetwork>
</div>
                <strong class="has-text-primary is-block mt-3">Desciption Of problem: </strong>
                <div class="desc">{{data.desc}}</div>
                 <strong class="has-text-primary mt-5 is-block">The proposed solution : </strong>
                <div class="desc">{{data.solution}}</div>
                
              <div class="card_tags mt-4"><b-tag v-for="tag in data.tags" :key="tag._id" type="is-info mr-2 mb-1">{{tag}}</b-tag> </div>
            <b-button type="is-primary mt-4" expanded tag="router-link" to="/post_project">Start a project to solve this!</b-button>
         <Disqus />
        </div>
            
        </div>

    </div>
    </div>
    <div v-else>
    hi
     <b-loading :is-full-page="true" v-model="loading" :can-cancel="true"></b-loading>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            imgurl:"https://picsum.photos/id/41/1230/500",
            loading :true
        }
    },
    async created(){
      axios.defaults.headers.common['Authorization'] = this.$store.state.user.token
      try {
        const {data} = await axios.get('/api/problem',{params:{
          id:this.$route.params.id
        }})
        console.log(data)
        this.data = data.problem
        this.imgurl = data.problem.photo
        console.log(data.problem.photo)
        this.loading = false
      } catch (error) {
        alert(error.message)
        
      }
    },
    computed:{
      url(){
        return window.location.href
      }
    }
}
</script>