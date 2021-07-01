<template>
  <div id="app" >
   <navs></navs>
   <router-view/>
 
   
  </div>
</template>
<script>
import navbar from '@/components/navbar'
//import Navbar from './components/navbar.vue'

export default {
  components:{
    navs:navbar,
   // footers:footer
  }
}
</script>
