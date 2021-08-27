<template>
  <div id="CreateUser" class="create_user">
    <div class="container_create_user">
      <h3>Registro</h3>

      <form v-on:submit.prevent="processCreateUser">
        <input type="text" v-model="user_in.username" placeholder="Usuario" />
        <br />
        <input type="text" v-model="user_in.name" placeholder="Nombre y apellido" />
        <br />
        <input type="text" v-model="user_in.password" placeholder="Contraseña" />
        <br />
        <input type="text" v-model="user_in.email" placeholder="E-mail" />
        <br />
        <input type="text" v-model="user_in.phone" placeholder="Teléfono" />
        <br />
        <input type="text" v-model="user_in.password" placeholder="Contraseña" />
        <br />
        <button type="submit">Crear</button>
      </form>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag"
import jwt_decode from "jwt-decode"

export default {
  name: "CreateUser",

  data: function() {
    return {
      user_in: {
        username: "",
        password: "",
      }
    }
  },
  methods: {
    processCreateUser: async function() {
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

            let data = result.data.authenticate;
            data.user_id = jwt_decode(data.access).user_id.toString().padStart(3, "0")
            
           
        
        }).catch((error) => {
             
            alert("El usuario y/o contraseña son incorrectos")
        });
    }
  }
}
</script>

<style>
.auth_user {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.container_auth_user {
  border: 1px solid black;
  border-radius: 10px;
  width: 25%;
  height: 60%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth_user h2 {
  color: #283747;
}

.auth_user h3 {
    color: #015757;
    text-align: center;
}

.auth_user form {
  width: 50%;
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
  background: #015757;
  border: 1px solid #283747;
}

</style>
