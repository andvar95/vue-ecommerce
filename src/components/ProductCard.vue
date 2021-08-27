<template>

<div class="product">
    
    <div><img src="https://image.made-in-china.com/202f0j10SmRaBwqoSbrO/5-2-Inch-CDMA-Smart-Phone-Cheap-Cell-Phone.jpg"> </div>
    <h3 @click="goToProduct(id)">{{name}}</h3>
    <div>Stock: {{quantity}}</div>
    <h3>${{price}}</h3>
    <div class="cart-button"> <input type="number">   <button>Add to Cart</button></div>
    
</div>
  
</template>

<script>
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

    methods:{
        goToProduct(id){
            this.$router.push({path:`/product/${id}`})
        }
    }

}
</script>

<style>

.product{
    width:20%;   
}

.cart-button{
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

   cart-button{
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