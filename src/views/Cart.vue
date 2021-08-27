<template>
  <div>Cart</div>
</template>

<script>
import { bus } from "../main";
export default {
    name:'Cart',
   created(){
       this.emitter.on('action',(value)=>console.log(value))
   }

}
</script>

<style>

</style>