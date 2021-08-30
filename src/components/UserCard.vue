<template>

        <div class="user-card-container">

            

            <div class="user-card-item">
                <div class="username-text">
                {{username}}
                </div>
                </div>

            <div class="user-card-item">

                <div class="user-card-icons">

                <div><i class="fas fa-trash-alt fa-2x"></i></div>
                <div @click="editUserModal()"><i class="fas fa-user-edit fa-2x"></i></div>
                </div>
            </div>

        </div>
   <div class="modal" v-if="editUser">
    <div class="modal__close" @click="closeModal()">X</div>  
  
       <create-user
        :id="id"
        :first_name="first_name"
        :username="username"
        :email="email"
        :phone="phone"
        :address="address"
        :password="password"
        :is_active="is_active"
        :is_superuser="is_superuser"
       > </create-user>
    </div>
</template>

<script>
import CreateUser from '../views/CreateUser.vue';
export default {
    name:'UserCard',
    components:{
        CreateUser
    },
    data(){
        return {
             editUser:false
        }
    },
    props:{
        id:String,
        first_name:String,
        username:String,
        email:String,
        phone:String,
        address:String,
        is_active:Boolean,
        is_superuser:Boolean,
    },
    methods:{
        editUserModal(){
            this.editUser = true
        },
        closeModal(){
            this.editUser = false
        }
    }

}
</script>

<style>

.user-card-container{
    display: flex;
    justify-content: space-between;
 border-radius: 10px;
    margin:2% 5%;
    background-color: white;
}

.user-card-item{
    padding: 30px 20px ;
    
}


.username-text{
    padding:5px 10px;
    color: white;
    border-radius: 5px;
    background-color: rgb(144, 144, 238);
    font-size: 1.4rem;
}

.user-card-icons{
    display: flex;
}

.user-card-icons div{
    margin:0 5px;
}


.modal{
    background-color:rgba(0,0,0,0.4);
    top:0;
    left:0;
    bottom:0;
    position:fixed;
    display:flex;
    margin:auto;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height:100vh;
    z-index:100;

}

.modal__close:hover{
background-color: rgba(187, 187, 187, 0.287);
border-radius: 100%;

}

.modal__close{
    margin-right: 30px;
    color:white;
    position: absolute;
    top:0;
    right:0;
    font-size: 2rem;
    padding:10px;
   
}
</style>