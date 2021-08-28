<template>

<div class="product">
    
    <div><img src="https://image.made-in-china.com/202f0j10SmRaBwqoSbrO/5-2-Inch-CDMA-Smart-Phone-Cheap-Cell-Phone.jpg"> </div>
    <h5 @click="goToProduct(id)">{{name}}</h5>
    <div>Stock: {{quantity}}</div>
    <h3>${{price}}</h3>
    <div class="cart-add"> <input v-model="cartQuantity" min="0" type="number">   <button @click="addProduct()" class="cart-button">Add to Cart</button></div>
    
</div>
  
</template>

<script>

import gql from 'graphql-tag';
export default {
    name:"ProductCard",
    props:{
        id:String,
        name:String,
        quantity:Number,
        img:String,
        description:String,
        price:Number

    },
    data(){
        return{
            cartQuantity:0
        }

    },
    methods:{
        goToProduct(id){
            this.$router.push({path:`/product/${id}`})
        },
        async addProduct(){
       if(this.cartQuantity>0)  {
           await  this.$apollo.mutate({
               mutation: gql `
               mutation($addCartId: String!, $addCartInputDetailProducts: InputDetailProducts!) {
                addCart(id: $addCartId, inputDetailProducts: $addCartInputDetailProducts) {
                
                    userId
                    orderId
                    date
                    total
                    detailProducts {
                    idProduct
                    name
                    quantity
                    price
                    subTotal
                    }
                    status
                }}`,
               variables:{
                   addCartId:localStorage.getItem('userId'),
                   addCartInputDetailProducts: {
                            idProduct: this.id,
                            name:this.name,
                            quantity: this.cartQuantity,
                            price: this.price,
                            subTotal: this.price*this.cartQuantity} }
           }).then((data)=>{
               console.log(data)
           }).catch((err)=>console.log(err))
           
        }
        else{
            console.log("No puedo");
        }
        }
    }

}
</script>

<style>

.product{
    width:20%;   
}

.cart-add{
    display:flex;
    justify-content: space-around;
    margin-bottom:5%;
    max-width:100%;
    width:100%;
}

input[type=number]{
    width:20%;
   
    outline: none;
}

   img{
     border-radius: 5px 5px 0 0 ;
       width:100%;
   }

   .cart-button{
      width: 60%;
       padding:4%;
       border-radius:10px;
       border:none;
       background-color: #3838e4;
       color:white;
   }

   button:hover{
       background-color:#5c5cdd ;
   }
</style>