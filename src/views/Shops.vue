<template>
  <div class="pad-1">Shops</div>
  <div class="order-container">
    <div v-for="(order, key) in ordersByUserId" :key="key">
    <div class= "order-p-item"> {{order.orderId}}</div> 
    <div class= "order-p-item"> {{order.date.substring(0,10)}}</div> 
    <div class= "order-p-item"> {{order.total}}</div> 
    <div class= "order-p-item"> {{order.status}}</div>
    <div>{{order.detailProducts}}</div>
     <div v-for="(detail, key) in order.detailProducts" :key="key"> {{detail.name}}</div>
    </div>

  
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "Shops",

  data() {
    return {
      ordersByUserId: [],
    };
  },
  created() {
    console.log("creado");
    this.$apollo.queries.ordersByUserId.refresh();
  },
  apollo: {
    ordersByUserId: {
      query: gql`
        query ($ordersByUserIdId: String!) {
          ordersByUserId(id: $ordersByUserIdId) {
            orderId
            date
            total
            detailProducts {
              name
              quantity
            }
            status
          }
        }
      `,
    variables: {
    ordersByUserIdId: localStorage.getItem('userId'),
    },
    fetchPolicy:'cache-and-network'
  },
  },
};
</script>

<style>
.cart-title{
    border-bottom: 1px solid rgb(83, 83, 83);
    padding:1% 10%;
    display: flex;
}

.order-container{
  display:flex;
  flex-direction: column;
}

.order-p-item{
    padding:2%;
    width:20%;
  
}



</style>
