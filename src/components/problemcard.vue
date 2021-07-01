<template>
    <div class="card mr-4 mt-3 cardw">
  <div class="card-image">
    <figure class="image is-4by3">
      <img :src="data.photo" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img :src="data.user.photo" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{data.user.name}}</p>
        
        <p class="subtitle is-6">{{data.city}}</p>
      </div>
    </div>

    <div class="content">
       
      {{data.desc.slice(0,Math.min(data.desc.length,100))}}
      <br>
      <time datetime="2016-1-1">Posted : {{(new Date(data.createdAt)).toDateString()}} </time>
      <div class="has-text-weight-medium">{{data.interested.length}} Interested</div>
      <div class="card_tags"><b-tag v-for="tag in data.tags" :key="tag._id" type="is-info mr-2 mb-1">{{tag}}</b-tag></div>
       <b-button tag="router-link" :to="'/view_problem/'+data._id" type="is-primary mt-2" expanded>Explore</b-button>
        <b-button v-if="rem" @click="remove" type="is-danger mt-2" expanded>Remove</b-button>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'

export default {
  props:['rem',"data"],
  methods:{
    
    async remove(){
         await axios.post('/api/problem/delete',{id:this.data._id})
        this.$router.go()
    }
  },
  created(){
    axios.defaults.headers.common['Authorization'] = this.$store.state.user.token
  }
}
</script>