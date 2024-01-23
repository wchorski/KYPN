import { CartItem, DateRange, StringRange } from "@ks/types";
import { dateCheckAvail, isRangesOverlap } from "./dateCheck";

// dateCheckAvail()

// todo may need a few hour buffer between 
// rentals times for late returns

type RentalAvail = {
  rentalRange:StringRange,
  rentals:StringRange[],
  rentalItems:CartItem[],
}
export function checkProductRentalAvail({rentalRange, rentals, rentalItems}:RentalAvail){
  console.log({rentals});
  
  // loop through rentals, check against rentalRange
  const overlapRentals = rentals.filter(rental => isRangesOverlap(rentalRange, rental))
  console.log({overlapRentals});

  
    // if date overlaps, check products
      // products.stockCount > (cartQuantity + rental.order.orderItem.quantity)?
      // if false - not enough stock
  const isProductRentalAvail = true
  const message = 'check is good'
  console.log({isProductRentalAvail});
  
  return { isProductRentalAvail, message }
}