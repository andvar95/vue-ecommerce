<template>

<div class="product">
    
    <div><img  class="img-product" v-if="url" v-bind:src="url">
    <img class="img-product" v-if="!url" v-bind:src="image"> </div>
    <h5 @click="goToProduct(id)">{{name}}</h5>
    <div v-if="quantity==0">No hay Stock </div>
    <div v-else>Stock: {{quantity}}</div>
    <h3>${{price}}</h3>
    <div class="cart-add"> 
        <input :disabled="quantity==0" v-model="cartQuantity" min="0" type="number">   
    <button :disabled="quantity==0" @click="addProduct()" class="cart-button">Add to Cart</button>
    </div>
    
</div>
  
    <message-card v-if="messageFlag" :message="messageContent"> </message-card>

</template>

<script>

import gql from 'graphql-tag';
import MessageCard from "../components/MessageCard.vue";
export default {
    components:{
        MessageCard
    },
    name:"ProductCard",
    props:{
        url:String,
        id:String,
        name:String,
        quantity:Number,
        img:String,
        description:String,
        price:Number

    },
    data(){
        return{
            cartQuantity:0,
            image:"https://image.made-in-china.com/202f0j10SmRaBwqoSbrO/5-2-Inch-CDMA-Smart-Phone-Cheap-Cell-Phone.jpg",
            messageFlag:false,
            messageContent:{}
        }

    },
    methods:{
        goToProduct(id){
            this.$router.push({path:`/product/${id}`})
        }
        ,setMessage(msg){
                this.messageFlag = true;
        this.messageContent= msg;
        setTimeout(() => {
          this.messageFlag = false;
          this.messageContent = {};
        }, 3000);

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
                    url
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
                            url:this.url,
                            idProduct: this.id,
                            name:this.name,
                            quantity: this.cartQuantity,
                            price: this.price,
                            subTotal: this.price*this.cartQuantity} }
           }).then((data)=>{
               console.log(data)
                    this.setMessage({name:this.name,quantity:this.cartQuantity})
                    this.$emit('addProductCart',{name:this.name,quantity:this.cartQuantity})
               
          
          
          }).catch((err)=>console.log(err))
           
        }
        else{
            console.log("No puedo");
            this.setMessage({name:this.name,quantity:this.cartQuantity})
             this.$emit('addProductCart',{name:this.name,quantity:this.cartQuantity})
                       
        }
        }
    }

}
</script>

<style>

.product{
    width:300px;   
    background-color: white;
    margin:20px;
    border-radius: 10px;
    border:1px solid gray;
  
}
.img-product{
    width:300px;
    height: 400px;

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

   .cart-button:disabled{
       background-color: rgba(128, 128, 128, 0.733);
   }

   button:hover{
       background-color:#5c5cdd ;
   }
</style>