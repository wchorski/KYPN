import { CartItem, DateRange, Rental, StringRange } from "@ks/types";
import { dateCheckAvail, isRangesOverlap } from "./dateCheck";

// dateCheckAvail()

// todo may need a few hour buffer between 
// rentals times for late returns

type RentalAvail = {
  rentalRange:StringRange,
  rentals:Rental[],
  rentalItems:CartItem[],
}
export function checkProductRentalAvail({rentalRange, rentals, rentalItems}:RentalAvail){

  // console.log({rentalRange});
  // console.log({rentals});
  // console.log({rentalItems});
  
  const overlapRentals = rentals.filter(rental => isRangesOverlap(rentalRange, rental))  
  
  let message = ''

  const isRentalConflict = overlapRentals.some(overlapRent => {

    const orderItems = overlapRent.order.items

    const isStockOverlapPerProduct = orderItems.some(bookedOrderItem => {

      const cartItem = rentalItems.find(item => item.product.id === bookedOrderItem.product.id)
      if(!cartItem) return false
      
      // console.table({
      //   product: bookedOrderItem.product.name,
      //   stock: bookedOrderItem.product.stockCount,
      //   cartQuant: cartItem.quantity,
      //   bookedQuant: bookedOrderItem.quantity,
      // })
      if(bookedOrderItem.product.stockCount < (cartItem.quantity + bookedOrderItem.quantity)){
        
        message = `
          Not enough stock available for ${cartItem.quantity} 
          "${bookedOrderItem.product.name}"(s). 
          Only ${bookedOrderItem.product.stockCount - bookedOrderItem.quantity} 
          available for the selected time range.
        `

        return true
      }


    })

    return isStockOverlapPerProduct
  })
  
  return { isRentalConflict, message }
}