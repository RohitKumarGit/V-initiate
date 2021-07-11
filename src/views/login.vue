<template>
    <div class="is-flex is-justify-content-center is-align-content-center " >
            <div class="login_cont card  p-5 has-background-white mt-5">
            <div class="title has-text-primary">Login or create your account.</div>
            <b-button @click="login" type="is-primary" expanded class="is-uppercase">proceed</b-button>
            </div>
        
    </div>
</template>
<script>
import firebase from 'firebase'

export default {
    methods:{
        async login(){
                var provider = new firebase.auth.GoogleAuthProvider();
        
                const {user} = await firebase.auth().signInWithPopup(provider)
                this.$store.dispatch("adduser",user)
                console.log("moving to profile")
                
        }
    },
    computed:{
        user(){
            return this.$store.state.user
        }
    },
    watch:{
        user(){
            if(this.user.token){
                if(this.user.token){
                if(this.$route.query.redir_url){
                    this.$router.push(this.$route.query.redir_url)
                }
                else {
                    this.$router.push('/profile')
                }
        }
               
            }
        }
    },
    created(){
         console.log(this.$route.query.redir_url)
        if(this.user.token){
                if(this.$route.query.redir_url){
                    this.$router.push(this.$route.query.redir_url)
                }
                else {
                    this.$router.push('/profile')
                }
        }
    }
}
</script>