export function calcTotalPrice(cart:any){
  
  return cart?.reduce((tally:any, cartItem:any) => {
    if(!cartItem.product) return tally

    return tally + cartItem.quantity * cartItem.product.price
  }, 0)

}