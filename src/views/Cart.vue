<template>
  <div class="cart-container">

    <cart-card
  class="cart-container"
  v-for="(cart,key) in orderByUserAndStatus" :key="key"
  :userId="cart.userId"
  :orderId="cart.orderId"
  :name="cart.name"
  :date="cart.date"
  :total="cart.total"
  :detailProducts="cart.detailProducts"
  :status="cart.status"
  
  ></cart-card>


     
  </div>
</template>

<script>
import { gql } from "graphql-tag";
import CartCard from "../components/CartCard.vue";
export default {
  name: "Cart",
  components:{
    CartCard
  },
  data(){
    return{
      orderByUserAndStatus:[]
         
    }
  },
  created(){
  
  },
  apollo:{
    orderByUserAndStatus:{
      query: gql ` query  ($orderByUserAndStatusId: String, $orderByUserAndStatusStatus: String) {
      orderByUserAndStatus(id: $orderByUserAndStatusId, status: $orderByUserAndStatusStatus)
       {
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
        }
        
        }`,
        variables:{
        orderByUserAndStatusId:localStorage.getItem('userId'),
        orderByUserAndStatusStatus:"In Progress"
       }
    }
    

  },
  methods:{
    /*async init(){
       await this.$apollo.query({
      query: gql `
      query  ($orderByUserAndStatusId: String, $orderByUserAndStatusStatus: String) {
      orderByUserAndStatus(id: $orderByUserAndStatusId, status: $orderByUserAndStatusStatus)
       {
        userId
        orderId
        date
        total
        detailProducts {
          idProduct
          quantity
          price
          subTotal
        }
        status
        }
        
        }`,
        variables:{
        orderByUserAndStatusId:localStorage.getItem('userId'),
        orderByUserAndStatusStatus:"In Progress"
       }
    }).then((data)=>{})
    .catch(err => console.log("erro",err))
    
  }*/
  }

};
</script>

<style>

.cart-container{
  display:flex;
  flex-direction: column;


}

</style>
