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
          <i class="fas fa-trash-alt fa-2x"></i>
        </div>
        <div @click="editProdModal()">
          <i class="fas fa-pencil-alt fa-2x"></i>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" v-if="prodModal">
    <div class="modal__close" @click="editProdModal()">X</div>
    <product-form
      :url="url"
      :product_Id="product_Id"
      :name="name"
      :description="description"
      :quantity="quantity"
      :category="category"
      :price="price"
      @closeModal="editProdModal"
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
    url: String,
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
  created() {},
  methods: {
    editProdModal() {
      this.prodModal = !this.prodModal;
      this.$emit("refreshProducts");
    },

    closeModal() {
      this.prodModal = false;
    },
    deleteProd: async function() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($deleteProductProductId: String!) {
              deleteProduct(product_Id: $deleteProductProductId) {
                url
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
        .then((result) => {
          this.$emit("refreshProducts");
        }).catch;
    },
  },
};
</script>

<style></style>
