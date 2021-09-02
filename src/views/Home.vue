<template>
  <div class="home pad-1">    
    <div class="product-container" >
      <product-card
      v-for="(product,key) in allProducts" :key="key"
      :url="product.url"
      :id="product.product_Id"
      :name="product.name"
      :quantity="product.quantity"
      :img="product.quantity"
      :description="product.description"
      :price="product.price"
      @addProductCart="addProductCart($event)"
      ></product-card>
      
  <message-card v-if="messageFlag" :message="messageContent"> </message-card>
    </div>

  </div>

 
</template>

<script>
// @ is an alias to /src
import ProductCard from "../components/ProductCard.vue";
import MessageCard from "../components/MessageCard.vue";
import gql from "graphql-tag"
export default {


  name: 'Home',
  components: {
    ProductCard,
    MessageCard
    
  },
  data(){
    return{
      products:[],
      messageFlag:false,
      messageContent:{}
    }
  },
  created(){
    console.log("creado");
    this.$apollo.queries.allProducts.refetch()

  },
  mounted(){
    this.$apollo.queries.allProducts.refetch()
  },
  methods:{
    addProductCart(event){

      this.messageFlag = true
      this.messageContent = event
      setTimeout(()=>{
        this.messageFlag = false
      },2000)

      console.log(event);
    }

  },
  apollo:{
    allProducts:{
      query: gql `
      query { allProducts {
        url
        product_Id
        name
        description
        quantity
        category
        price
        }}
      `,
      fetchPolicty:'no-cache'
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

  .product-container > product-card {
    margin:15px;
    border-radius: 5px;
     border:1px solid rgb(71, 70, 70);
  }

</style>