import { CartItem } from "@ks/types";

export function calcTotalPrice(cart:any){
  
  return cart?.reduce((tally:any, cartItem:any) => {
    if(!cartItem.product) return tally

    return tally + cartItem.quantity * cartItem.product.price
  }, 0)

}

export function calcCartRentalTotal(cartItems:CartItem[]){

  const rentalItems = cartItems.filter(item => item.type === 'RENTAL')

  const total_per_hour = rentalItems.reduce((accumulator, item) => {
    return accumulator + (item.product.rental_price * item.quantity)
  }, 0)

  return total_per_hour
  // return total_per_hour * hours
}

export function calcCartSaleTotal(cartItems:CartItem[]){

  const saleItems = cartItems.filter(item => item.type === 'SALE')

  const total_accumulated = saleItems.reduce((accumulator, item) => {
    return accumulator + (item.product.price * item.quantity)
  }, 0)

  return total_accumulated
}