<template>
  <h1 class="pad-1">Shops</h1>
  <div class="order-container">
    <shop-card v-for="(order, key) in ordersByUserId.slice().reverse()" :key="key"
    :orderId="order.orderId"
    :date="order.date"
    :total="order.total"
    :detailProducts="order.detailProducts"
    :status="order.status"
    >
    <!--div class= "order-p-item"> {{order.orderId}}</div> 
    <div class= "order-p-item"> {{order.date.substring(0,10)}}</div> 
    <div class= "order-p-item"> {{order.total}}</div> 
    <div class= "order-p-item"> {{order.status}}</div>
    <div>{{order.detailProducts}}</div> 
     <div v-for="(detail, key) in order.detailProducts" :key="key"> {{detail.name}}</div> -->
    </shop-card>

  
  </div>
</template>

<script>

import ShopCard from "../components/ShopCard.vue"
import gql from "graphql-tag";
export default {
  name: "Shops",

  components: {
    ShopCard
  },

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
