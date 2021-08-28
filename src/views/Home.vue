<template>
  <div class="home">

    
    <div class="product-container" >
      

      <product-card
      v-for="(product,key) in allProducts" :key="key"
      :id="product.product_Id"
      :name="product.name"
      :quantity="product.quantity"
      :img="product.quantity"
      :description="product.description"
      :price="product.price"
      @addCart="addCart($event)"
      ></product-card>
      

    </div>
 
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from "../components/ProductCard.vue";
import gql from "graphql-tag"
export default {


  name: 'Home',
  components: {
    ProductCard
    
  },
  data(){
    return{
      products:[]
    }
  },
  created(){
    

  },
  methods:{
    addCart(event){
      console.log(event);
    }

  },
  apollo:{
    allProducts:{
      query: gql `
      query { allProducts {
        product_Id
        name
        description
        quantity
        category
        price
        }}
      `
    }

  }
  

}
</script>

<style  scoped>
  .product-container{
    display:flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    width:100vw;
    max-width: 100%;
   
  
  }

  .product-container > * {
    margin:15px;
    border-radius: 5px;
     border:1px solid rgb(129, 129, 129);
  }

</style>