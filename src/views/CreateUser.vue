<template>
  <div id="CreateUser" class="auth_user pad-1">
    <div class="container_auth_user ">
      <h3>Registro</h3>

      <div v-if="error" class="error">{{ errorMessage }}</div>
      <form v-on:submit.prevent="processCreateUser">
        <input type="text" v-model="user_in.username" placeholder="username" />
        <br />
        <input type="text" v-model="user_in.first_name" placeholder="name" />
        <br />
        <input v-if="!user_in.id"
          type="password"
          v-model="user_in.password"
          placeholder="Contraseña"
        />
        <br />
        <input type="text" v-model="user_in.email" placeholder="E-mail" />
        <br />
        <input type="text" v-model="user_in.phone" placeholder="Teléfono" />
        <br />
        <input type="text" v-model="user_in.address" placeholder="direccion" />
        <br />
        <button type="submit">
          <div v-if="user_in.id">Editar</div>
          <div v-else>Crear</div>
        </button>
        <button v-if="!user_in.id" @click="goToLogin()">
          Inicio de Sesión
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  name: "CreateUser",
  props: {
    id: String,
    first_name: String,
    username: String,
    email: String,
    phone: String,
    address: String,
    password: String,
    is_active: Boolean,
    is_superuser: Boolean,
  },
  created() {
    console.log(this.id);
    this.user_in.id = this.id;
    this.user_in.first_name = this.first_name;
    this.user_in.username = this.username;
    this.user_in.email = this.email;
    this.user_in.phone = this.phone;
    this.user_in.password = this.password;
    this.user_in.is_active = this.is_active;
    this.user_in.is_superuser = this.is_superuser;
    this.user_in.address = this.address;
  },
  data: function() {
    return {
      user_in: {
        first_name: "",
        username: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        is_active: true,
        is_superuser: false,
      },
      error: false,
      errorMessage: "",
    };
  },
  methods: {
    goToLogin: function() {
      this.$router.push({ name: "UserAuth" });
    },
    editUser: async function() {
      delete this.user_in.password
      this.user_in.id = parseInt(this.user_in.id)
      console.log(this.user_in);
      await this.$apollo.mutate({mutation: gql`
              mutation Mutation($adminUpdateUser: UserAdminUpdt) {
              adminUpdate(user: $adminUpdateUser) {
              Response
                }
              }
            `,
            variables: {
              adminUpdateUser: this.user_in,
            },
          }).then(
            (res)=>{
             this.$emit('userModal')
            }
          )
          .catch(
            (err)=>console.log(err)
          )
    },
    processCreateUser: async function() {
      if (this.id) {
        this.editUser();
      } else {
        await this.$apollo
          .mutate({
            mutation: gql`
              mutation Mutation($registerUser: UserCreate) {
                register(user: $registerUser) {
                  first_name
                  username
                  email
                  phone
                  address
                  is_active
                  is_superuser
                }
              }
            `,
            variables: {
              registerUser: this.user_in,
            },
          })
          .then((result) => {
            this.goToLogin();
          })
          .catch((error) => {
            this.errorMessage = "Ha ocurrido un error registrandote";
            this.error = true;
            setTimeout(() => {
              this.error = false;
            }, 3000);
          });
      }
    },
  },
};
</script>

<style>
.auth_user h2 {
  color: #283747;
}

.auth_user h3 {
  color: #3838e4;
  text-align: center;
}

.auth_user form {
  width: 50%;
}

.auth_user input,
.auth_user select {
  height: 40px;
  width: 150%;

  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;

  border: 1px solid #283747;
  border-radius: 10px;
}

input:focus {
  outline: none;
}

.auth_user button {
  width: 150%;
  height: 40px;

  color: #e5e7e9;
  background: #3838e4;
  border: 1px solid #e5e7e9;

  border-radius: 30px;
  padding: 10px 25px;
  margin: 5px 0;
  cursor: pointer;
}

.auth_user button:hover {
  color: #e5e7e9;
  background: #3838e4;
  border: 1px solid #283747;
}
</style>
