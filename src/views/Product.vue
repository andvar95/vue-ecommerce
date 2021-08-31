<template>
  <div class="product-container pad-1">
<div @click="addProdModal()">
          <i class="fas fa-plus fa-2x"></i>
</div>
    <product-admin-card
      v-for="(product, key) in allProducts"
      :key="key"
      :product_Id="product.product_Id"
      :name="product.name"
      :description="product.description"
      :quantity="product.quantity"
      :category="product.category"
      :price="product.price"
    >
    </product-admin-card>
  </div>
  <div class="modal" v-if="prodModal">
    <div class="modal__close" @click="addProdModal()">X</div>
    <product-form> </product-form>
  </div>
</template>

<script>
import ProductForm from "../components/ProductForm.vue";
import ProductAdminCard from "../components/ProductAdminCard.vue";
import gql from "graphql-tag";

export default {
  name: "Product",

  components: {
    ProductAdminCard,
    ProductForm,
  },
  data() {
    return { prodModal: false };
  },
  created() {
    this.$apollo.queries.allProducts.refresh();
  },
  methods: {
    addProdModal() {
      this.prodModal = !this.prodModal;
      this.$apollo.queries.allProducts.refresh()
    },
  },
  apollo: {
    allProducts: {
      query: gql`
        query {
          allProducts {
            product_Id
            name
            description
            quantity
            category
            price
          }
        }
      `,
    },
  },
};
</script>

<style>
</style>