<template>
    <div  class="single-product-container">
   
    <div class="product-img">
        <img  src="https://image.made-in-china.com/202f0j10SmRaBwqoSbrO/5-2-Inch-CDMA-Smart-Phone-Cheap-Cell-Phone.jpg" alt="s">
    </div>
    
    <div v-if="name" class="product-description">
        <div> <h1> {{name}} </h1> </div>
            <div class="product-price">${{price}} </div>
            <div class="product-cart"><input v-model="cartQuantity" class="number-poducts" type="number"> <button v-on:click="addProduct()" class="cart-button">Adicionar al Carrito </button></div>
             
            <div class="pro-desc">{{description}}</div>
            
    </div>

 <div class="single-product-container" v-if="!name">Espere Por favor </div>
      
    </div>

          
  <message-card v-if="messageFlag" :message="messageContent"> </message-card>

       
      
</template>

<script>
import gql from 'graphql-tag';
import MessageCard from '../components/MessageCard.vue';
export default {
    components:{
        MessageCard
    },
    name:'Product',
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
            cartQuantity:0,
            messageFlag:false,
            messageContent:{}
        }
    },
    methods:{
         setMessage(msg){
                this.messageFlag = true;
        this.messageContent= msg;
        setTimeout(() => {
          this.messageFlag = false;
          this.messageContent = {};
        }, 3000);

        },
        async addProduct(){
            console.log(this.cartQuantity);
       if(this.cartQuantity>0)  {
           await  this.$apollo.mutate({
               mutation: gql `
               mutation Mutation($addCartId: String!, $addCartInputDetailProducts: InputDetailProducts!) {
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
               this.setMessage({name:this.name,quantity:this.cartQuantity})
           }).catch((err)=>console.log(err))
           
        }
        else{
                         this.setMessage({name:this.name,quantity:this.cartQuantity})
        }
        }
    
    }


}
</script>

<style>

.single-product-container{
    margin:5% auto;
    background-color: white;
    width:50vw;
    height:70vh;
    display: flex;
    padding: 1%;
}

.product-img img {
    height: 70vh;
}

.product-img{
    width:40%;
    height: 100%;
}

.product-description{
    width:60%;
    display: flex;
    flex-direction: column;
    justify-self: self;
}

.pro-desc{
    border-top: 1px solid gainsboro;
    width: 90%;
    margin:2%;
    align-self: flex-start;
    padding: 3% 0;
}

.product-price{
    font-size: 1.8rem;
    align-self:flex-start;
    padding:5%

}
.cart-button{
     font-size: 1.2rem;
}
.product-cart{
    padding: 5%;
    display: flex;
    justify-content: space-between;
   
}

.number-poducts{
    height: 5vh;
    width:3vw;
}

</style>