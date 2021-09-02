<template>
 
 <navbar :Admin="admin" :Auth="isAuth" @logout="isAuth = false"  ></navbar>

  <router-view @log="isAuth = true" />

  
</template>

<script>

import Navbar from "./components/Navbar.vue";
import gql from "graphql-tag";
import jwt_decode from 'jwt-decode';

export default {

  components:{
    Navbar
  },
  data(){
    return{
      isAuth:false,
      admin:false
    }
  },
    created() {
    if (localStorage.getItem('access')) {
      this.isAuth = true
      this.refreshToken()
     
     

    } else {
      this.$router.push({ name: 'UserAuth' })
    }
  },

    methods: {
    async refreshToken() {
      await this.$apollo.mutate({
        mutation: gql `
          mutation ($refreshToken: String!) {
            refreshToken(refresh: $refreshToken) {
              access
            }
          }
        `,
        variables: {
          refreshToken: localStorage.getItem('refresh')
        }
      }).then(result => {
        console.log(result.data.refreshToken)
        this.isAuth = true
        localStorage.setItem('access', result.data.refreshToken.access)
        this.admin = jwt_decode(localStorage.getItem('access')).admin

        
        
       
      }).catch(() => {
        alert('ERROR: Invalid token!')
        this.isAuth = false
        this.$router.push({ name: 'UserAuth' })
      })
    }
  }
  

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100vw;
  max-width:100%;
  height: 100vh;
  background-color: #ebebeb;
 

}


.pad-1{
  padding: 10% 0;
}

.pad-10{
    padding: 30% 0;
}

</style>
