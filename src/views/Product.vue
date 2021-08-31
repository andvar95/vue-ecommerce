<template>
  <div id="CreateProd" class="create_prod">
    <div class="container_create_prod">
      <h3>Crear Producto</h3>

      <form v-on:submit.stop.prevent="processCreateProd">
        <input type="text" v-model="product_in" placeholder="Nombre" />
        <br />
        <input type="text" v-model="product_in" placeholder="Descripcion" />
        <br />
        <input type="number" v-model="product_in" placeholder="Cantidad" />
        <br />
        <select v-model="selected" placeholder="Cantidad">
          <option>Procesador AMD</option>
          <option>Procesador Intel</option>
          <option>Board AMD</option>
          <option>Board Intel</option>
          <option>Caja</option>
          <option>Ram DDR4</option>
          <option>Ram DDR3</option>
        </select>
        <span>Selected: {{ selected }}</span>
        <br />
        <input type="number" v-model="product_in" placeholder="Precio" />
        <br />
        <button type="submit">Registrar</button>
        <button type="submit">Eliminar</button>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  name: "CreateProduct",

  data: function () {
    return {
      product_in: {
        name: "",
        description: "",
        quantity: "",
        category: "",
        price: "",
      },
    };
  },
  methods: {
    processCreateProduct: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($createProductProduct: CreateProduct!) {
              createProduct(product: $createProductProduct) {
                name
                description
                quantity
                category
                price
              }
            }
          `,
          variables: {
            createProductProduct: this.product_in,
          },
        })
        .then((result) => {}).catch;
    },
  },
};
</script>

<style>
</style>