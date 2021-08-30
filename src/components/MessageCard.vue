<template>

    <div class="message_container">
        {{finalMessage}}
    </div>
  
</template>

<script>
export default {
    name:'MessageCard',
    props:{
        message:{}
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

        if(this.message.quantity>0) 
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

.message_container{
    position: fixed;
    background-color: white;
    color: black;
    width:10vw;
    height: 10vh;
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