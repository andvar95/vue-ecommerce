<template>
  <div class="pad-1">
    <h1>Usuarios</h1>

    <h3>Resultados encontrados {{ getUsers.length }}</h3>

    <user-card
      v-for="(user, key) in getUsers"
      :key="key"
      :id="user.id"
      :first_name="user.first_name"
      :username="user.username"
      :email="user.email"
      :phone="user.phone"
      :address="user.address"
      :is_active="user.is_active"
      :is_superuser="user.is_superuser"
      @updateUsers ="updateUsers"
    ></user-card>
  </div>
</template>

<script>
import gql from "graphql-tag";
import UserCard from "../components/UserCard.vue";
import CreateUser from "../views/CreateUser.vue";
export default {
  name: "AdminUser",
  data() {
    return {
      getUsers: [],
    };
  },
  methods:{
      updateUsers(){
           this.$apollo.queries.getUsers.refresh();
      }
  },
  components: {
    UserCard,
    CreateUser,
  },
  created() {
    console.log("entre");
    this.$apollo.queries.getUsers.refresh();
  },
  apollo: {
    getUsers: {
      query: gql`
        query Query {
          getUsers {
            id
            first_name
            username
            email
            password
            phone
            address
            is_active
            is_superuser
          }
        }
      `,
      fetchPolicy: "network-only",
    },
  },
};
</script>

<style></style>
