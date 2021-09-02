<template>
   <div class="user-card-container">
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
             <tr class="spacer">
                 <th>Total: ${{total}}</th>
                 <th>Creación: {{date.substring(0,10)}}</th>
             </tr>
            <tr class="spacer" v-for="(detail, key) in detailProducts" :key="key">
                <th>{{detail.name}}</th>
                <th>{{detail.quantity}}</th>
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

.card-icons{
    display:flex;
    justify-content:center;
    align-items:center;
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
}

.spacer{
    display:flex;
    justify-content:space-between;
}

table{
    width:100%;
    }
</style>
