<template>
  <div id="CreateProd" class="auth_user pad-1">
    <div class="container_auth_user container_reg_user">
      <h3>Producto</h3>

      <form v-on:submit.stop.prevent="processCreateProduct">
        <input type="text" v-model="product_in.name" placeholder="Nombre" />
        <br />
        <input
          type="text"
          v-model="product_in.description"
          placeholder="Descripcion"
        />
        <br />
        <input
          type="number"
          v-model="product_in.quantity"
          placeholder="Cantidad"
        />
        <br />
        <select v-model="product_in.category"  value="product_in.category" placeholder="Cantidad">
          <option selected disabled hidden>Choose here</option>
          <option>Procesador AMD</option>
          <option>Procesador Intel</option>
          <option>Board AMD</option>
          <option>Board Intel</option>
          <option>Caja</option>
          <option>Ram DDR4</option>
          <option>Ram DDR3</option>
        </select>
        <span>Selected: {{ product_in.category }}</span>
        <br />
        <input type="number" v-model="product_in.price" placeholder="Precio" />
        <br />
        <button v-if="product_Id" type="submit">Actualizar</button>
        <button v-else type="submit">Registrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  name: "CreateProduct",
  props: {
    url:String,
    product_Id: String,
    name: String,
    description: String,
    quantity: Number,
    category: String,
    price: Number,
  },
  data: function () {
    return {
      product_in: {
        url:"",
        name: "",
        description: "",
        quantity: "",
        category: "",
        price: "",
      },
    };
  },
  created() {
    this.product_in.url = this.url;
    this.product_in.name = this.name;
    this.product_in.description = this.description;
    this.product_in.quantity = this.quantity;
    this.product_in.category = this.category;
    this.product_in.price = this.price;
  },
  methods: {
    processCreateProduct: async function () {
      if(!this.product_Id){
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($createProductProduct: CreateProduct!) {
              createProduct(product: $createProductProduct) {
                url
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
        .then((result) => {
            this.$emit('closeModal')

        }).catch;
    }else{this.processUpdProduct()}},
    processUpdProduct: async function () {
      this.product_in.product_Id = this.product_Id
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation(
              $updProductbyIdProductId: String!
              $updProductbyIdProduct: UpdateProduct
            ) {
              updProductbyId(
                product_Id: $updProductbyIdProductId
                product: $updProductbyIdProduct
              ) {
                url
                product_Id
                name
                description
                quantity
                category
                price
              }
            }
          `,
          variables: {
            updProductbyIdProductId: this.product_Id,
            updProductbyIdProduct: this.product_in,
          },
        })
        .then((result) => {
          
          this.$emit('closeModal')
        }).catch;
    },
  },
};
</script>
 
<style>
</style>