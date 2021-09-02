<template>
   <div class="user-card-container" v-bind:class="{'no-pad':details}">
    <div class="user-card-item">
      
      <div class="username-text">
         {{ orderId }}
      </div>
    </div>

    <div class="user-card-item">
      <div class="card-icons">
        <div v-if= "status=='finished'" class= "finished">
          {{status}}
        </div>
        <div v-if= "status=='In Progress'" class= "inprogress">
          {{status}}
        </div>
        <div @click="ShowDetails()">
        <div v-if="!details"><i  class="fas fa-arrow-down fa-2x"></i></div>
        <div v-if="details"><i  class="fas fa-arrow-up fa-2x"></i></div>
          
        </div>
      </div>
    </div>
  </div>
 <div v-if="details" class="detailproducts">
     
         <table>
           <tr>
             <th> <h2> Detalle de Compra</h2></th>
           </tr>

           <tr  class="spacer">
             <th> <h3>Producto</h3> </th>
             <th><h3>Cantidad</h3> </th>
           </tr>
             
            <tr class="spacer" v-for="(detail, key) in detailProducts" :key="key">
                <th>{{detail.name}}</th>
                <th>{{detail.quantity}}</th>
            </tr>
            <tr class="spacer total-shop">
                 <th >Total: ${{total}}</th>
                 <th >Creación: {{date.substring(0,10)}}</th>
             </tr>
         </table>
     </div>

</template>

<script>
export default {

name: "ShopCard",
data() {
    return{
      details:false
    }
},
methods: {
    ShowDetails(){
        this.details=!this.details;
    }
},

props: {
   orderId: String,
    date: Date,
    total: Number,
    detailProducts: [],
    status: String
}

}
</script>

<style>
.inprogress{
   background-color:rgb(255, 88, 28);
   color:aliceblue; 
   padding:5px 7px;
}
.finished{
    background-color:rgb(5, 172, 74);
    color:aliceblue; 
    padding:5px 7px; 
}
.no-pad{
  margin: 2% 5% 0 5% !important;
  border-radius:10px 10px 0 0 !important;
}
.card-icons{
    display:flex;
    justify-content:center;
    align-items:center;
}
.total-shop th{
  padding:5% 0;
  font-size: 1.6rem;
}

.card-icons div{
    margin:4px;

}
.detailproducts{
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:white;
    width:90%;
    margin:0 auto;
    border-radius: 0 0 10px 10px;    
}

.spacer{
    display:flex;
    justify-content:space-between;
}

table{
    width:100%;
    
    }
  th{
    width:40%;
    font-size: 1.2rem; 
  }
</style>
