
 function addToCart(change,Cart){

    delete Cart.__typename

    Cart.detailProducts.forEach((p,i)=>{

        delete Cart.detailProducts[i].__typename
        if(change.id == Cart.detailProducts[i].idProduct){

            console.log(p.quantity,change.quantity);

            let diff =  change.quantity - p.quantity
            console.log(diff);
           
            Cart.detailProducts[i].subTotal += diff*p.price;
            Cart.total += diff*p.price
           
            Cart.detailProducts[i].quantity = change.quantity;

        }
    }) 

  return Cart;


}

function deleteProduct(idProduct,Cart) {

    delete Cart.__typename
    let res;
    Cart.detailProducts = Cart.detailProducts.filter((p,i)=>{

        delete Cart.detailProducts[i].__typename
        if(p.idProduct !== idProduct) return p
        if(p.idProduct === idProduct)res = p.subTotal
       
    }) 

    Cart.total -= res;
  
    return Cart



   


}




function cleanCart(Cart){
    delete Cart.__typename
    Cart.detailProducts = Cart.detailProducts.filter((p,i)=>{

        delete Cart.detailProducts[i].__typename
      
    }) 


  
    return Cart
   
}


function cleanDetail(detail){

    let obj = JSON.parse(JSON.stringify(detail))
    

    obj = obj.map((p,i)=>{
       delete p.__typename 
    
        return p
        
      
    }) 


return obj



}
module.exports= {addToCart,deleteProduct,cleanCart,cleanDetail}