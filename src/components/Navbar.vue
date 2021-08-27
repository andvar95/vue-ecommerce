<template>
 <div id="nav" class="navbar">
    <div class="logo">Logo </div>
    
    <div v-if="Auth"  class="options"> 
    <a v-if="Admin">Administrador </a>
    <router-link to="/Home">Home</router-link> 
    <router-link to="/shops">Compras</router-link> 
    <router-link to="/cart">Carrito</router-link> 
    <router-link to="/profile">Perfil</router-link> 
    <router-link to="/about">About</router-link>
     <a @click="logout">Logout</a>
    </div>
  </div>
  
</template>

<script>
export default {
    name:'Navbar',
    props:{
        Auth:Boolean,
        Admin:Boolean
    },
    
  methods: {
    logout() {
      localStorage.clear()
      this.$emit('logout')
      this.$router.push({ name: 'UserAuth' })
    }
  }

}
</script>

<style>

a{
    text-decoration: none;
    color:white;
}

a:hover{
    text-decoration: underline;
}

.navbar{
  display: flex;
  justify-content: space-between;
  background-color:#009999 ;
  border:1px solid black;
  color:white;
}
.options{
    display:flex;

}

.options > * {
    display:block; 
    padding: 15px 20px;
}

.logo{
   display:block; 
    padding: 15px 20px; 
}

</style>