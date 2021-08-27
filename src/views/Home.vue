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
      products_:[],
      products:[]
    }
  },
  created(){
    this.products_ = [
      {
        name:"Product 1",
        quantity:12,
        img:"https://icdn.dtcn.com/image/digitaltrends_es/mejores-celulares-camara-huawei-p40-pro-416x416.jpg",
        description:"Producto 1 ",
        price:12000
      },
      {
        name:"Product 2",
        quantity:5,
        img:"https://icdn.dtcn.com/image/digitaltrends_es/mejores-celulares-camara-huawei-p40-pro-416x416.jpg",
        description:"Producto 1 ",
         price:12000
      },
      {
        name:"Product 3",
        quantity:1,
        img:"https://icdn.dtcn.com/image/digitaltrends_es/mejores-celulares-camara-huawei-p40-pro-416x416.jpg",
        description:"Producto 1 ",
         price:12000
      },
      {
        name:"Product 6",
        quantity:12,
        img:"https://icdn.dtcn.com/image/digitaltrends_es/mejores-celulares-camara-huawei-p40-pro-416x416.jpg",
        description:"Producto 1 ",
         price:12000
      },
      {
        name:"Product 6",
        quantity:12,
        img:"https://icdn.dtcn.com/image/digitaltrends_es/mejores-celulares-camara-huawei-p40-pro-416x416.jpg",
        description:"Producto 1 ",
         price:12000

      },
      {
        name:"Product 6",
        quantity:12,
        img:"https://icdn.dtcn.com/image/digitaltrends_es/mejores-celulares-camara-huawei-p40-pro-416x416.jpg",
        description:"Producto 1 ",
         price:12000
      }
    ]

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