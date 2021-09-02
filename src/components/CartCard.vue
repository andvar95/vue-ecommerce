<template>
  <div v-for="(detail, key) in detailProducts" :key="key" class="cart-products">
    <div class="cart-p-item">
      <div>{{ detail.name }}</div>
      <div>${{ detail.price }}</div>
    </div>
    <div class="cart-p-item horizontal">
      <div>
        <div>
          Cantidad:
          <input
            type="number"
            min="0"
            v-model="detail.quantity"
            v-on:input="updateProduct($event, detail.idProduct)"
          />
        </div>

        <div>Subtotal:{{ detail.subTotal }}</div>
      </div>
      <div>
        <div v-on:click="deleteProduct(detail.idProduct)">
          <i class="fas fa-trash-alt fa-2x delete-icon"></i>
        </div>
      </div>
    </div>
  </div>

  <div class="cart-products">
    <div class="total">
      <h3>Total:${{ total }}</h3>
    </div>
    <div class="update-container">
      <button @click="finishCart()">Finalizar Compra</button>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { cleanCart, cleanDetail } from "../helpers/addToCart";
export default {
  name: "CartCard",
  props: {
    userId: String,
    orderId: String,
    name: String,
    date: String,
    total: String,
    detailProducts: [],
    status: String,
  },
  methods: {
    async finishCart() {
      let detail = cleanDetail(this.detailProducts);

      await this.$apollo
        .mutate({
          mutation: gql`
            mutation($finishOrderId: String!, $finishOrderOrder: UpdateOrder) {
              finishOrder(id: $finishOrderId, order: $finishOrderOrder) {
                response
              }
            }
          `,
          variables: {
            finishOrderId: this.orderId,
            finishOrderOrder: {
              userId: this.userId,
              orderId: this.orderId,
              date: this.date,
              total: this.total.status,
              detailProducts: detail,
              status: this.status,
            },
          },
        })
        .then((res) => {
        
        if(res.data.finishOrder.response.includes('No hay')) this.$emit('errorStock')
        else this.$emit("finishCart");
          console.log(res);
        })
        .catch((err) => {
            
          
        });
    },
    updateProduct(event, id) {
      console.log(event.target.value);

      if (event.target.value)
        this.$emit("editCart", {
          quantity: parseInt(event.target.value),
          id: id,
        });
    },
    deleteProduct(id) {
      console.log(id);
      this.$emit("deleteCart", id);
    },
  },
};
</script>

<style>
.horizontal {
  display: flex;
}
.update-container,
.total {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5%;
}

.update-container button {
  background: #3838e4;
  padding: 2% 5%;
  border: none;
  font-size: 1.2rem;
  color: white;
  border-radius: 5px;
}

.delete-icon:hover {
  color: red;
}
.cart {
  border: 1px solid rgb(175, 175, 175);
  border-radius: 5px;
  max-width: 60%;
  width: 60%;
  margin: 5% auto;
  padding: 2%;
  background-color: white;
  min-height: 10vw;
}

.cart-title {
  border-bottom: 1px solid rgb(83, 83, 83);
  padding: 1% 10%;
  display: flex;
}

.cart-products {
  border-bottom: 1px solid rgb(87, 87, 87);

  display: flex;
  justify-content: space-between;
}

.cart-p-item {
  padding: 2%;
  width: 20%;
}
</style>
