<template>

   <product
    :id="product.product_Id"
    :name="product.name"
    :quantity="product.quantity"
    :img="product.quantity"
    :description="product.description"
    :price="product.price"

   >
   </product>
   
</template>

<script>

import Product from '../components/Product.vue';

import {gql} from 'graphql-tag';
export default {
name:'SingleProduct',
components:{
    Product
},
data(){
    return{
        id:String,
        product:{}
    }
},
created(){
    this.id = this.$route.params.id
    console.log(this.$router);
    console.log(this.id);
    this.init()

},
methods:{
    modifyCart(){
        this.emitter.emit('cambio',true)
    },
    async init(){

        await this.$apollo.query({
             query: gql `
        query ($productByProdIdProductId: String!) {
        productByProdId(product_Id: $productByProdIdProductId) {
        product_Id
        name
        description
        quantity
        category
        price
    }
    }
            
        `,variables:{
            productByProdIdProductId:this.id
        }

        }).then(
            (data)=>this.product = data.data.productByProdId
        )

    }
},

apollo:{
   
}

}

</script>

<style>

</style>