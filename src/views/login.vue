<template>
    <div class="login">
    <div class="login-cnt">  <b-button @click="login" class="login-with-google-btn">Login with Google</b-button></div>
       
    </div>
</template>
<script>

import {mapActions} from 'vuex'
export default {
    methods:{
        ...mapActions(['login']),
        
    }

}
</script>