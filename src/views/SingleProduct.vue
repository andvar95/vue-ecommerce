<template>
  
  <div>{{id}} 

  </div>
  <button @click="modifyCart()" >sd </button>

</template>

<script>

import {inject} from 'vue';
export default {
name:'SingleProduct',
data(){
    return{
        id:String
    }
},
created(){
    this.id = this.$route.params.id
    console.log(this.$router);
    console.log(this.id);
},
methods:{
    modifyCart(){
        this.emitter.emit('cambio',true)
    }
}

}

</script>

<style>

</style>