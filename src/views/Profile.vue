<template>
  <div class="pad-1">
    <div class="profile-container">
      <div class="profile-information">
        <form v-on:submit.prevent="updateUser">
          <div class="profile-item">
            <label for="username"> Usuario </label>
            <input v-model="profile_user.username" type="text" id="username" />
          </div>

          <div class="profile-item">
            <label for="name"> Nombre </label>
            <input v-model="profile_user.first_name" type="text" id="name" />
          </div>

          <div class="profile-item password">
            <label for="Contraseña"> Contraseña </label>
            <input
              v-model="myPass"
              type="password"
              id="Contraseña"
              placeholder="Requerida para cambiar datos"
            />
          </div>

          <div class="profile-item">
            <label for="E-mail"> Correo </label>
            <input v-model="profile_user.email" type="text" id="E-mail" />
          </div>

          <div class="profile-item">
            <label for="Teléfono"> Teléfono </label>
            <input v-model="profile_user.phone" type="text" id="Teléfono" />
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

  <message-card v-if="messageFlag" :type="'User'" :message="messageContent">
  </message-card>
</template>

<script>
import gql from "graphql-tag";
import CambiarPassword from "../components/CambiarPassword.vue";
import MessageCard from "../components/MessageCard.vue";
export default {
  components: {
    CambiarPassword,
    MessageCard,
  },
  data() {
    return {
      profile_user: {},
      myPass: "",
      passModal: false,
      messageFlag: false,
      messageContent: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    modalPass() {
      this.passModal = !this.passModal;
    },
    async updateUser() {
      this.profile_user.password = this.myPass;
      delete this.profile_user.__typename;

      console.log(this.myPass);

      if (!this.myPass) {
        this.sendMessage("Ingresa tu contraseña para actualizar");
      } else {
        await this.$apollo
          .mutate({
            mutation: gql`
              mutation($updateUserId: String!, $updateUserUser: UserCreate!) {
                updateUser(id: $updateUserId, user: $updateUserUser) {
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
              updateUserUser: this.profile_user,
              updateUserId: localStorage.getItem("userId"),
            },
          })
          .then((data) => {
            this.sendMessage("Datos actualizados");
          })
          .catch((err) => {
            this.sendMessage("Contraseña errónea");
          });
      }
    },
    sendMessage(msg) {
      this.messageFlag = true;
      this.messageContent.msg = msg;
      setTimeout(() => {
        this.messageFlag = false;
        this.messageContent.msg = "";
      }, 3000);
    },
    async init() {
      await this.$apollo
        .query({
          query: gql`
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
          `,
          variables: {
            getUserByIdId: localStorage.getItem("userId"),
          },
          fetchPolicty: "network-only",
        })
        .then((data) => {

          this.profile_user = JSON.parse(JSON.stringify(data.data.getUserById));
        })
        .catch((err) =>err);
    },
  },
};
</script>

<style>
.profile-buttons {
  padding: 5% 0;
  display: flex;
  justify-content: space-around;
}

.profile-buttons button {
  border: none;
  padding: 15px 20px;
  background-color: #3838e4;
  color: white;
  border-radius: 5px;
  font-size: 1.4rem;
}

.profile-container {
  background-color: white;
  border-radius: 30px;
  width: 50vw;

  margin: 2% auto;
  display: flex;
}

.profile-photo {
  width: 20%;
  padding: 2%;
}
.profile-photo img {
  width: 200px;
  height: 200px;
}

.profile-information {
  width: 100%;
  padding: 5%;
}

.password label {
  color: red !important;
}

.profile-item {
  padding: 3% 0 3% 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
}

.profile-item input {
  width: 65%;
  height: 5vh;
  font-size: 1.4rem;
  border: none;

  outline: none;
}

.profile-item label {
  font-size: 1.4rem;
  color: blue;
}
</style>
