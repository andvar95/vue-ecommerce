<template>
  <div class="cart">

      <div class="cart-title">Carrito  </div>
      <div v-for="(detail,key) in detailProducts" :key="key"  class="cart-products">
        
        <div class="cart-p-item">
           <div> {{detail.name}} </div> 
            <div>${{detail.price}} </div>
        </div>
        <div class="cart-p-item">
            <div>Cantidad: <input type="number" min="0" v-model=detail.quantity></div>
            <div>Subtotal:{{detail.subTotal}} </div>
        </div>
        
          
      </div>

    <div class="cart-products">
     <div class="total"><h3>Total:${{total}}</h3></div>
            <div class="update-container"> <button>Guardar </button> </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'CartCard',
    props:{
         userId:String,
         orderId:String,
         name:String,
         date:String,
         total:String,
         detailProducts:[],
         status:String
    }

}
</script>

<style>


.update-container, .total{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5%;
}

.update-container button{
    background: #3838e4;
    padding:25%;
    border:none;
    font-size: 1.2rem;
    color:white;
    border-radius: 5px;
}


.cart{
    border:1px solid rgb(80, 80, 80);
    border-radius: 5px;
    max-width: 60%;
    width:60%;
    margin: 5% auto;
    padding:2%;
    

}

.cart-title{
 
    border-bottom: 1px solid rgb(83, 83, 83);
    padding:1% 10%;
    display: flex;
    font-size: 1.3rem;
}


.cart-products{
    border-bottom:1px solid rgb(87, 87, 87);
    
    display: flex;
    justify-content: space-between;
   
}

.cart-p-item{
    padding:2%;
    width:20%;
  
}
</style>