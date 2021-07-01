<template>
    <div v-if="!loading">
   
        <div class="container viewp ">
            <div class="viewp_image" :style="'background:url('+this.imgurl+')'">

            </div>
            <div class="viewp_cont">           
             <div class="viewp_title title has-text-weight-bold">{{data.title}}</div>
             
             <div class="subtitle has-text-primary ">{{data.address}}</div>
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
                <strong class="has-text-primary is-block mt-3">Desciption : </strong>
                <pre class="desc">
{{data.desc}}
                </pre>
                <strong class="has-text-primary mt-5 is-block">Happening on : {{(new Date(data.when)).toDateString()}} | {{(new Date(data.when)).getHours()}} : {{(new Date(data.when)).getMinutes()}}  </strong>
              <div class="card_tags mt-4"><b-tag v-for="tag in data.tags" :key="tag._id" type="is-info mr-2 mb-1">{{tag}}</b-tag> </div>
            <b-button type="is-primary mt-4" expanded @click="inter" :disabled="data.interested.includes('60cc30ac26cf493600baf3a1') || data.isCompleted"> <span v-if="data.isCompleted">Completed!</span> 
            <span v-else>I'm Interested</span>
            </b-button>
             <Disqus />
        </div>
           
        </div>
      
    </div>
    <div v-else>
     <b-loading :is-full-page="true" v-model="loading" :can-cancel="true"></b-loading>
    </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
    data(){
        return {
            imgurl:"https://picsum.photos/id/41/1230/500",
            data :{},
            loading:true
        }
    },
    async created(){
      axios.defaults.headers.common['Authorization'] = this.$store.state.user.token
      try {
        const {data} = await axios.get('/api/project',{params:{
          id:this.$route.params.id
        }})
        this.data = data.project
        this.loading = false
        this.imgurl = data.project.photo
      } catch (error) {
        alert(error.message)
        
      }
    },
    computed:{
      ...mapState(['user','auth']),
      url(){
        return window.location.href
      }
    },
    methods:{
      async inter(){
        if(!this.auth){
          this.$buefy.toast.open({
                    duration: 5000,
                    message: `You need to log in first!`,
                   
                    type: 'is-danger'
                })
                return ;
        }
        console.log("inter")
        try {
          const {data} = await axios.post('/api/project/interest',{id:this.$route.params.id,user_id:this.user._id})
          console.log(data)
          this.$buefy.toast.open({
                    duration: 5000,
                    message: `Addred to your interest!`,
                   
                    type: 'is-primary'
                })
                this.$router.go()
        } catch (error) {
          console.log(error)
        }
      }
    }
}
</script>