<template>
  <div id="AuthUser" class="auth_user">
    <div class="container_auth_user">
      <h3>Inicio de sesión</h3>

      <div v-if="error" class="error">Error con usuario o contraseña</div>

      <form v-on:submit.prevent="processAuthUser">
        <input type="text" v-model="user_in.username" placeholder="Usuario" />
        <br />
        <input type="password" v-model="user_in.password" placeholder="Contraseña" />
        <br />
        <button type="submit">Ingresar</button>
        <h3>¿No tienes cuenta?</h3>
          <button @click="goToRegister()">Regístrate</button>
       
      </form>

     
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag"
import jwt_decode from "jwt-decode"

export default {
  name: "UserAuth",

  data: function() {
    return {
      user_in: {
        username: "",
        password: "",
      },
      error:false
    }
  },
  methods: {

    goToRegister:function(){
      
        this.$router.push({name:'CreateUser'})
     },
     
     processAuthUser: async function() {

      console.log(this.user_in);
      await this.$apollo.mutate({
          mutation: gql`
            mutation($authenticateCredentials: CredentialsInput!) {
              authenticate(credentials: $authenticateCredentials) {
                refresh
                access
              }
            }`,
          variables: {
            authenticateCredentials: this.user_in
          }

        }).then((result) => {
            console.log(result);
            let data = result.data.authenticate;
            data.user_id = jwt_decode(data.access).user_id.toString()
            this.setUserData(data)

        
        }).catch((error) => {
            this.error = true

            setTimeout(()=>{
                this.error = false
            },3000)
        });
    },
    setUserData:function(data){

      localStorage.setItem('access',data.access)
      localStorage.setItem('refresh',data.refresh)
      localStorage.setItem('userId',data.user_id)
      localStorage.setItem('username',this.user_in.username)
      
      
      this.$emit('log')
      this.$router.push({name:'Home'})


    }
  }
}
</script>

<style>
.error{
  color:red;
}
.auth_user {
 
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

}

.container_auth_user {
    background-color: white;
  border:1px solid rgb(212, 212, 212);
  border-radius: 10px;
  width: 30%;
 

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}

.auth_user h2 {
  color: #283747;
}

.auth_user h3 {
    color: #3838e4;;
}

.auth_user form {
  width: 100%;
   display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
}

.auth_user input {
  height: 40px;
  width: 150%;

  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;

  border: 1px solid #283747;
  border-radius: 30px;
  
}

input:focus {
    outline: none;
}

.auth_user button {
  width: 150%;
  height: 40px;

  color: #e5e7e9;
  background: #009999;
  border: 1px solid #e5e7e9;

  border-radius: 30px;
  padding: 10px 25px;
  margin: 5px 0;
  cursor: pointer;
}

.auth_user button:hover {
  color: #e5e7e9;
  background: #3838e4;;
  border: 1px solid #283747;
}

</style>
