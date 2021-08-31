<template>
  <div class="user-card-container">
    <div class="user-card-item">
      <div class="username-text">
        {{ name }}
      </div>
    </div>

    <div class="user-card-item">
      <div class="user-card-icons">
        <div @click="deleteProd()">
          <i class="fas fa-trash-alt fa-2x"></i></div>
        <div @click="editProdModal()">
          <i class="fas fa-pencil-alt fa-2x"></i>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" v-if="prodModal">
    <div class="modal__close" @click="editProdModal()">X</div>
    <product-form
      :product_Id="product_Id"
      :name="name"
      :description="description"
      :quantity="quantity"
      :category="category"
      :price="price"
    >
    </product-form>
  </div>
</template>

<script>
import ProductForm from "../components/ProductForm.vue";
import gql from "graphql-tag";
export default {
  name: "Product",
  props: {
    product_Id: String,
    name: String,
    description: String,
    quantity: Number,
    category: String,
    price: Number,
  },
  components: {
    ProductForm,
  },
  data() {
    return { prodModal: false };
  },
  created() {
  },
  methods: {
    editProdModal() {
      this.prodModal = !this.prodModal;
    },
    closeModal() {
      this.prodModal = false;
    },
    deleteProd: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($deleteProductProductId: String!) {
                deleteProduct(product_Id: $deleteProductProductId) {
                    product_Id
                    name
                    description
                    quantity
                    price
                    category
                }
            }
          `,
          variables: {
            deleteProductProductId: this.product_Id,
          },
        })
        .then((result) => {}).catch;
    },
  },
};
</script>

<style>
</style>