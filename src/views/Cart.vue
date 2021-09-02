<template>
  <div class="cart-container pad-1">
      <div class="cart">

      <h2 class="cart-title">
        
        <div>Carrito</div>   <div v-if="errorStockMsg" class="errorStockMsg"> Error en el Stock </div>  </h2>

    <cart-card
 
  v-for="(cart,key) in orderByUserAndStatus" :key="key"
  :userId="cart.userId"
  :orderId="cart.orderId"
  :name="cart.name"
  :date="cart.date"
  :total="cart.total"
  :detailProducts="cart.detailProducts"
  :status="cart.status"
  @editCart="editCart"
  @deleteCart="deleteCart"
  @finishCart="finishCart"
  @errorStock="errorStock"
  
  ></cart-card>
      <div class="empty-cart" v-if="orderByUserAndStatus.length == 0">
            <h2>Aun no has agregado ningun producto a tu carrito</h2>
         </div>
      </div>
     
  </div>
</template>

<script>
import { gql } from "graphql-tag";
import CartCard from "../components/CartCard.vue";
import {addToCart,deleteProduct,cleanCart} from "../helpers/addToCart";
export default {
  name: "Cart",
  components:{
    CartCard
  },
  data(){
    return{
      errorStockMsg:false
      
    }
  },
  created(){
    console.log("creado");
    this.init();
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
       },
       fetchPolicy:'cache-and-network'
    }
    

  },
  methods:{
    errorStock(){
      this.errorStockMsg = true
      setTimeout(()=>{
        this.errorStockMsg=false
      },5000)
    },
    finishCart(){
      this.$apollo.queries.orderByUserAndStatus.refresh()

    },
    editCart(data){
      const edited =  addToCart(data,JSON.parse(JSON.stringify(this.orderByUserAndStatus[0])))
    this.updateCart(edited);
   },
   deleteCart(id){
     const deleteProd = deleteProduct(id,JSON.parse(JSON.stringify(this.orderByUserAndStatus[0])))
    this.updateCart(deleteProd);
   },
    async init(){
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
       },
       fetchPolicy:'network-only'
    }).then((data)=>{
      console.log("d",data);
      this.orderByUserAndStatusId =data.data.orderByUserAndStatus[0]
      console.log(this.orderByUserAndStatusId);
      })
    .catch(err => console.log("erro",err))
    
  },
  async updateCart(Cart){
    console.log("Upd");
    console.log(Cart);
    await this.$apollo.mutate({
      mutation: gql`
      mutation ($updateOrderId: String, $updateOrderOrder: UpdateOrder) {
      updateOrder(id: $updateOrderId, order: $updateOrderOrder) {
      userId
      orderId
      date
      total
      detailProducts {
        subTotal
        idProduct
        name
        quantity
        price
        }
      status
      }
    }
     `,
        variables:{
          updateOrderId:Cart.orderId,
          updateOrderOrder:Cart     
      }
    }).then(
      (data)=> {
            console.log(data);
           this.$apollo.queries.orderByUserAndStatus.refresh()
      }
    ).catch(
      (err)=> console.log(err)
    )
  }

  }

};
</script>

<style>

.cart-title{
  display: flex;
  justify-content: space-between;
}

.errorStockMsg{
  color:red;
}
.empty-cart{
  padding:10%;
 
}
.cart-container{
  display:flex;
  flex-direction: column;
 

}

</style>
