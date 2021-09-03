<template>
  <div class="changepass_container">
    <h2>Cambio de Contraseña</h2>

    <div v-if="flagMsg">{{ Message }}</div>

    <form v-on:submit.prevent="changePassword">
      <input
        v-model="prevPass"
        placeholder="Contraseña antigua"
        type="password"
      />
      <input v-model="newPass" placeholder="Nueva Contraseña" type="password" />
      <button class="cart-button" type="submit">Guardar</button>
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "CambiarPassword",
  data() {
    return {
      prevPass: "",
      newPass: "",
      Message: "",
      flagMsg: false,
    };
  },
  methods: {
    handleMessage(msj) {
      this.Message = msj;
      this.flagMsg = true;
      setTimeout(() => {
        this.Message = "";
        this.flagMsg = false;
      }, 5000);
    },
    async changePassword() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($updatePasswordChangePassword: ChangePassword!) {
              updatePassword(changePassword: $updatePasswordChangePassword) {
                Response
              }
            }
          `,
          variables: {
            updatePasswordChangePassword: {
              username: localStorage.getItem("username"),
              password: this.newPass,
              lastPassword: this.prevPass,
            },
          },
        })
        .then((result) => {
          console.log(result.data.updatePassword.Response);

          this.handleMessage(result.data.updatePassword.Response);
        })
        .catch((error) => {
          console.log(error);

          this.handleMessage("Error al Actualizar Contraseña");
        });
    },
  },
};
</script>

<style>
.changepass_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 20vw;
  padding: 1%;
  background-color: white;
  overflow: auto;
  border-radius: 10px;
}

.changepass_container input {
  margin: 4% 0;
  height: 5vh;
  width: 80%;
}
</style>
