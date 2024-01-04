'use client'
import { 
  // @ts-ignore
  experimental_useFormState as useFormState, 
  // @ts-ignore
  experimental_useFormStatus as useFormStatus 
} from "react-dom"
import { Addon, AddonCheckboxOptions, Coupon, SubscriptionPlan } from "@ks/types"
import { useReducer } from "react"
import formStyles from '@styles/menus/form.module.scss'
import moneyFormatter from "@lib/moneyFormatter"
import { PriceTag } from "./PriceTag"

type Props = {
  subscriptionPlan:SubscriptionPlan,
  customerId:string,
  addons?:Addon[],
  coupons?:Coupon[],
}

type State = {
  subscriptionPlanPrice:number,
  addonOptions:AddonCheckboxOptions[],
  customerId:string,
  couponName:string,
  total:number,
}

type FormAsideAction =
  | { type: 'RESET' }
  | { type: 'SET_ADDON_OPTIONS'; payload:AddonCheckboxOptions[] }
  | { type: 'SET_TOTAL'; payload:number }
  | { type: 'SET_COUPON'; payload:string }
  | { type: 'APPLY_COUPON'; payload:string }
  | { type: 'ADDON_CHECKBOX'; payload:{value:string, isChecked:boolean} }
  | { type: 'SET_CUSTOMER'; payload:{
    name?:string,
    email:string,
    phone?:string,
  }}

export function CheckoutSubscriptionPlanForm ({ subscriptionPlan, addons, customerId, coupons }:Props) {

  const defaultState:State = {
    subscriptionPlanPrice: subscriptionPlan.price,
    customerId: customerId,
    addonOptions: addons?.map(ad => ({
      name: ad.name,
      label: ad.name,
      id: ad.id,
      isChecked:false,
      price: ad.price,
    })) || [],
    couponName: '',
    total: subscriptionPlan.price,
  }
  const reducer = (state:State, action:FormAsideAction):State => {
    
    switch (action.type) {
      
      case 'SET_COUPON':
        return { ...state, couponName: action.payload}

      case 'APPLY_COUPON':
        const addonsTotal = state.addonOptions.filter(opt => opt.isChecked).reduce((accumulator, addon) => {
          return accumulator + addon.price;
        }, 0)
        return { ...state, total: calcTotalPrice(state, addonsTotal)}

      case 'SET_ADDON_OPTIONS':
        return { ...state, addonOptions: action.payload}

      case 'ADDON_CHECKBOX':
        const addonBoxId = action.payload.value
        const updatedCheckboxes = state.addonOptions.map((checkbox) => {
          if (checkbox.id === addonBoxId) {
            return { ...checkbox, isChecked: action.payload.isChecked};
          }
          return checkbox;
        })

        const addonsPriceTotal = updatedCheckboxes.filter(opt => opt.isChecked).reduce((accumulator, addon) => {
          return accumulator + addon.price;
        }, 0)

        return {
          ...state,
          addonOptions: updatedCheckboxes,
          total: calcTotalPrice(state, addonsPriceTotal)
        }

      case 'RESET':
        return defaultState

      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, defaultState)

  function calcTotalPrice(state:State, addonAccumulatedTotal:number){

    const couponApplied = coupons?.find(coup => coup.name === state.couponName)
    if(!couponApplied) return subscriptionPlan.price + addonAccumulatedTotal
    let discountedTotal = couponApplied.amount_off ? subscriptionPlan.price - couponApplied.amount_off : subscriptionPlan.price * (couponApplied.percent_off/100)
    return discountedTotal + addonAccumulatedTotal
  }
  
  return (
    <form>

       <p> 
        <PriceTag price={subscriptionPlan.price}/>
        - {subscriptionPlan.name} Subscription
      </p>

      {addons && addons.length > 0 && <>

        <h5> Add-Ons</h5>
        {state.addonOptions.length === 0 && <p className="subtext"> no addons available </p>}
        <div className={formStyles.addons_wrap} >
          {state.addonOptions.map(addon => (
              <label 
                key={addon.name}
                htmlFor={addon.name}
                className={'checkbox'}
              >
                <input 
                  name={addon.name}
                  value={addon.id} 
                  type={'checkbox'}
                  readOnly={false}
                  defaultChecked={addon.isChecked}
                  onChange={(e) => {
                    dispatch({type: 'ADDON_CHECKBOX', payload: {
                      value: e.target.value,
                      isChecked: e.target.checked
                    }})
                  }}
                />
                <span> 
                  <strong> {moneyFormatter(addon.price)} </strong>  
                  {addon.name}
                </span>
              </label>
            ))}
        </div>
        </>}

        <label className={formStyles.coupon}>
          <input 
            name="coupon"
            type="text"
            onChange={e => dispatch({type: 'SET_COUPON', payload: e.target.value})}
          />
          <button 
            type="button" 
            className="button"
            onClick={() => dispatch({type: 'APPLY_COUPON', payload: state.couponName})} 
          > Apply Coupon </button>
        </label>

        <p> 
          Total: <PriceTag price={state.total}/>
        </p>
    </form>
  )
}