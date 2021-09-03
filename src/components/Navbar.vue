<template>
  <div id="nav" class="navbar">


    <div class="logo"><i class="fas fa-store fa-3x"></i></div>

    <div v-if="Auth" class="options">
      <div v-if="Admin">
        <router-link to="adminuser"
          ><i class="fas fa-users-cog fa-2x icon"></i
        ></router-link>
      </div>

         <div v-if="Admin">
        <router-link to="adminshops"
          ><i class="fas fa-shopping-basket fa-2x icon"></i
        ></router-link>
      </div>
        <div v-if="Admin">
        <router-link to="/product"
          ><i class="fas fa-box-open fa-2x icon"></i
        ></router-link>
      </div>

      <router-link to="/Home"
        ><i class="fas fa-home fa-2x icon"></i
      ></router-link>
      <router-link to="/shops"
        ><i class="fas fa-shopping-bag fa-2x icon"></i
      ></router-link>
      <router-link to="/cart"
        ><i class="fas fa-cart-plus fa-2x icon"></i
      ></router-link>
      <router-link to="/profile"
        ><i class="fas fa-user fa-2x icon"></i
      ></router-link>
    
      <a @click="logout"><i class="fas fa-sign-out-alt fa-2x icon"></i></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    Auth: Boolean,
    Admin: Boolean,
  },
  created() {},
  methods: {
    logout() {
      localStorage.clear();
      this.$emit("logout");
      this.$router.push({ name: "UserAuth" });
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
  color: white;
}

a:hover {
  text-decoration: underline;
}

.navbar {
  display: flex;
  justify-content: space-between;
  background-color: #000202;
  color: white;
  position: fixed;
  width: 100%;
  max-width: 100%;
}
.options {
  display: flex;
}

.options > * {
  display: block;
  padding: 20px 25px;
}

.icon:hover {
  transform: scale(1.2);
}
.logo {
  display: block;
  padding: 15px 20px;
}
</style>
