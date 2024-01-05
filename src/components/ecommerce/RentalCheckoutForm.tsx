'use client'
import { CartItem as CartItemType } from "@ks/types"
import CartItem from "./CartItem"
import { useReducer } from "react"
import { PriceTag } from "./PriceTag"

type Props = {
  sessionId:string,
  rentalItems:CartItemType[],
}

type State = {
  rentalItems:CartItemType[],
  customerId:string,
  couponName:string,
  start:string,
  end:string,
  hours:number,
  total:number,
}

type FormAsideAction =
  | { type: 'RESET' }
  // | { type: 'SET_ADDON_OPTIONS'; payload:AddonCheckboxOptions[] }
  | { type: 'SET_TOTAL'; payload:number }
  | { type: 'SET_COUPON'; payload:string }
  // | { type: 'APPLY_COUPON'; payload:string }
  // | { type: 'ADDON_CHECKBOX'; payload:{value:string, isChecked:boolean} }
  | { type: 'SET_CUSTOMER'; payload:{
    name?:string,
    email:string,
    phone?:string,
  }}

export function RentalCheckoutForm ({ sessionId, rentalItems }:Props) {

  const defaultState:State = {
    rentalItems,
    customerId: sessionId,
    couponName: '',
    start: '',
    end: '',
    hours: 6,
    total: rentalItems.reduce((accumulator, item) => {
      return accumulator + item.product.rental_price;
    }, 0),
  }
  const reducer = (state:State, action:FormAsideAction):State => {
    
    switch (action.type) {
      
      case 'SET_COUPON':
        return { ...state, couponName: action.payload}

      // case 'APPLY_COUPON':
      //   const addonsTotal = state.addonOptions.filter(opt => opt.isChecked).reduce((accumulator, addon) => {
      //     return accumulator + addon.price;
      //   }, 0)
      //   return { ...state, total: calcTotalPrice(state, addonsTotal)}

      case 'RESET':
        return defaultState

      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, defaultState)

  // function calcTotalPrice(state:State, addonAccumulatedTotal:number){

  //   const couponApplied = coupons?.find(coup => coup.name === state.couponName)
  //   if(!couponApplied) return subscriptionPlan.price + addonAccumulatedTotal
  //   let discountedTotal = couponApplied.amount_off ? subscriptionPlan.price - couponApplied.amount_off : subscriptionPlan.price * (couponApplied.percent_off/100)
  //   return discountedTotal + addonAccumulatedTotal
  // }
  

  return (
    <form
      
      // action={formAction}
    >
      {rentalItems?.map((item: any) => <CartItem key={item.id} item={item} sessionId={sessionId}/>)}

      <input type="date"/>
      <input type="time"/>

      <table>
        <tbody>
          <tr>
            <td>Total Hours: </td>
            <td>{state.hours}</td>
          </tr>
          <tr>
            <td>Total Price: </td>
            <td><PriceTag price={state.total}/></td>
          </tr>
        </tbody>
      </table>

      <button type="submit"> Checkout Rental </button>
    </form>
  )
}