<template>
  <div class="pad-1">

    <div class="profile-container">

      <div class="profile-photo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png" >
      </div>

      <div class="profile-information">
        <form v-on:submit.prevent="updateUser">
        <div class="profile-item"   >
        <label for="username"> Usuario </label>
        <input v-model="profile_user.username" type="text"  id="username" />
        </div>
        
        <div class="profile-item">
         <label for="name"> Nombre </label>
        <input v-model="profile_user.first_name" type="text"  id="name" />
        </div>
        
        <div class="profile-item">
        <label for="Contraseña"> Contraseña </label>
        <input v-model="myPass" type="password" id="Contraseña" />
        </div>
      
        <div class="profile-item">
         <label for="E-mail"> Correo </label>
        <input  v-model="profile_user.email" type="text"  id="E-mail" />
        </div>
        
        <div class="profile-item">
        <label for="Teléfono"> Teléfono </label>
        <input v-model="profile_user.phone" type="text"  id="Teléfono" />
        </div>
      
        <div class="profile-item">
        <label for="direccion"> Dirección </label>
        <input v-model="profile_user.address" type="text" id="direccion" />
        </div>
        <div class="profile-buttons">
          <button @click="modalPass()">Cambiar Contraseña</button>
          <button class="profile-button" type="submit">Guardar Datos</button>

        </div>
          
        </form>
      
      </div>

    </div>


  </div>


  <div class="modal" v-if="passModal">
    <div class="modal__close" @click="modalPass()">X</div>  
  
      <cambiar-password> </cambiar-password>
    </div>

</template>

<script>
import gql from 'graphql-tag'
import CambiarPassword from '../components/CambiarPassword.vue';
export default {
  components:{
    CambiarPassword
  },
  data(){
  return{
      profile_user:{},
      myPass:'',
      passModal:false
    }
  },
  created(){
    this.init()
  },
  methods:{
    modalPass(){
      this.passModal = !this.passModal
    },
    async updateUser(){
      console.log(this.profile_user);
      this.profile_user.password = this.myPass
      delete this.profile_user.__typename
      await this.$apollo.mutate({
      mutation: gql ` 
    mutation ($updateUserId: String!, $updateUserUser: UserCreate!) {
  updateUser(id: $updateUserId, user: $updateUserUser) {
    first_name
    username
    email
    phone
    address
    is_active
    is_superuser
  }}`,variables:{
      updateUserUser:this.profile_user,
      updateUserId:localStorage.getItem('userId')
    }
    }).then((data)=>{
      console.log("d",data);

      this.$apollo.queries.getUserById.refresh()
     
      })
    .catch(err => console.log("erro",err))
    

    },
   async init(){
      await this.$apollo.query({
      query: gql ` 
    query Query($getUserByIdId: String!) {
  getUserById(id: $getUserByIdId) {
    first_name
    username
    email
    phone
    address
    is_active
    is_superuser
    }
    }
    `,variables:{
      getUserByIdId:localStorage.getItem('userId')
    }
    }).then((data)=>{
      console.log("d",data);
      this.profile_user = JSON.parse(JSON.stringify(data.data.getUserById))
      })
    .catch(err => console.log("erro",err))
    
  }
    
  },

}
</script>

<style>


.profile-buttons{
  padding:5% 0;
  display: flex;
  justify-content: space-around;
}

.profile-buttons button{
  border:none;
  padding:15px 20px;
  background-color:#3838e4; 
  color:white;
  border-radius: 5px;
  font-size: 1.4rem;
}

.profile-container{
  background-color: white;
  border-radius: 30px;
  width:50vw;
  height: 90vh;
  margin:2% auto;
  display:flex;
}


.profile-photo{
  width:20%;
  padding: 2%;
}
.profile-photo img {
  width:200px;
  height: 200px;
}

.profile-information{
  width: 70%;
  padding: 5%;

}






.profile-item {
  padding:3% 0 3% 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
 
}

.profile-item input{
  width:75%;
  height:5vh;
  font-size: 1.4rem;
  border:none;
  outline: none;
 
}

.profile-item label{
  font-size: 1.4rem;
  color:blue;
}

</style>