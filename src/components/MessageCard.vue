<template>

    <div class="message_container">

        <div>
            <i v-if="type ==='User'" class="fas fa-user fa-2x icon-cart">  </i>
            <i v-if="type !== 'User'" class="fas fa-shopping-bag fa-2x icon-cart">
                </i></div>
        <div>{{finalMessage}}</div>
    </div>
  
</template>

<script>
export default {
    name:'MessageCard',
    props:{
        message:{},
        type:String
    },
    data(){
        return{
        msg:String,
        quantity:0,
        product:'',
        msgProduct:`Has agregado ${this.quantity} ${this.product}`,
        finalMessage:String
        }
    },
    created(){
        console.log(this.message);
        console.log(this.type);
        if(this.type === 'User')
        {
            this.finalMessage = this.message.msg
        }
       else if(this.message.quantity>0) 
        {
            this.quantity = this.message.quantity
            this.product = this.message.name
            this.finalMessage =`Has agregado ${this.quantity} ${this.product}`
        }
        else if(this.message.quantity == 0){
            this.finalMessage = 'Debes indicar la cantidad'
        }

    }   


}
</script>

<style>

.icon-cart{
    padding:1px;
}
.message_container{
    position: fixed;
    background-color: white;
    color: black;
    padding:10px;
    width:20vw;
    top: 0;
    right: 0;
    margin:2%;
    font-size:1.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    
}
</style>