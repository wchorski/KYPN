'use client'
import { 
  // @ts-ignore
  experimental_useFormState as useFormState, 
  // @ts-ignore
  experimental_useFormStatus as useFormStatus 
} from "react-dom"
import { CartItem as CartItemType } from "@ks/types"
import CartItem from "./CartItem"
import { useEffect, useReducer, useRef, useState } from "react"
import { PriceTag } from "./PriceTag"
import { Card } from "@components/layouts/Card"
import styles from '@styles/menus/form.module.scss'
import { List } from "@components/elements/List"
import { Section } from "@components/layouts/Section"
import { timeCalcHours } from "@lib/timeUtils"
import { useCart } from "@components/hooks/CartStateContext"
import { calcCartRentalTotal, calcCartSaleTotal } from "@lib/calcTotalPrice"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { useSession } from "next-auth/react"

type Props = {
  sessionId:string,
  rentalItems:CartItemType[],
  saleItems:CartItemType[],
}

type Fields = {
  items:string[],
  customerId:string,
  couponName:string,
  start:string,
  end:string,
  total:number,
  notes:string,
}

type Form = {
  message: string,
  errors: Record<keyof Fields, string> | undefined,
  fieldValues: Fields,
}

type State = {
  rentalItems:CartItemType[],
  saleItems:CartItemType[],
  customerId:string,
  couponName:string,
  start:string,
  end:string,
  hours:number,
  rental_subtotal:number,
  sale_subtotal:number,
  total:number,
}

type FormAsideAction =
  | { type: 'RESET' }
  // | { type: 'SET_ADDON_OPTIONS'; payload:AddonCheckboxOptions[] }
  | { type: 'SET_TOTAL'; payload:number }
  | { type: 'SET_COUPON'; payload:string }
  | { type: 'SET_START'; payload:string }
  | { type: 'SET_END'; payload:string }
  | { type: 'APPLY_COUPON'; payload:string }
  // | { type: 'ADDON_CHECKBOX'; payload:{value:string, isChecked:boolean} }
  | { type: 'SET_CUSTOMER'; payload:{
    name?:string,
    email:string,
    phone?:string,
  }}

export function RentalCheckoutForm ({ sessionId, rentalItems, saleItems }:Props) {

  const formRef = useRef<HTMLFormElement>(null)
  const { data: session, status }  = useSession()
  const [isPending, setIsPending] = useState(true)
  const { cartItems, getUserCart } = useCart()  

  const defaultState:State = {
    rentalItems,
    saleItems,
    customerId: sessionId,
    couponName: '',
    start: '',
    end: '',
    hours: 1,
    rental_subtotal: rentalItems.reduce((accumulator, item) => {
      return (accumulator + item.product.rental_price) * item.quantity;
    }, 0),
    sale_subtotal: saleItems.reduce((accumulator, item) => {
      return (accumulator + item.product.price) * item.quantity;
    }, 0),
    total: 0
  }
  const reducer = (state:State, action:FormAsideAction):State => {
    
    switch (action.type) {
      
      case 'SET_START':
        if(state.end) return {
          ...state,
          start: action.payload,
          hours: timeCalcHours(action.payload, state.end),
          rental_subtotal: calcRentalTotal(timeCalcHours(action.payload, state.end)),
        }
        return { ...state, start: action.payload}

      case 'SET_END':
        if(state.start) return {
          ...state,
          end: action.payload,
          hours: timeCalcHours(state.start, action.payload),
          rental_subtotal: calcRentalTotal(timeCalcHours(state.start, action.payload)),
        }
        return { ...state, end: action.payload}

      // case 'SET_COUPON':
      //   return { ...state, couponName: action.payload}

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

  function calcRentalTotal(hours:number){

    const total_per_hour = rentalItems.reduce((accumulator, item) => {
      return (accumulator + item.product.rental_price) * item.quantity;
    }, 0)

    return total_per_hour * hours
  }

  // function calcCouponTotal(state:State, addonAccumulatedTotal:number){

  //   const couponApplied = coupons?.find(coup => coup.name === state.couponName)
  //   if(!couponApplied) return subscriptionPlan.price + addonAccumulatedTotal
  //   let discountedTotal = couponApplied.amount_off ? subscriptionPlan.price - couponApplied.amount_off : subscriptionPlan.price * (couponApplied.percent_off/100)
  //   return discountedTotal + addonAccumulatedTotal
  // }

  const defaultForm:Form = {
    message: '',
    errors: undefined,
    fieldValues: {
      items: [],
      customerId: '',
      couponName: '',
      start: '',
      end: '',
      total: 0,
      notes: '',
    }
  } 

  const [formState, formAction] = useFormState<Form>(onSubmit, defaultForm)
  async function onSubmit(prevState: Form, formdata: FormData): Promise<Form> {

    console.log(formdata);
    
    const start   = formdata.get('start') as string
    
    //@ts-ignore
    const inputValues:Fields = {
      start
    } 
    

    try {

      // if(typeof start !== 'string') throw new Error('start is not string')

      // const data = {

      // }

      // const res = await fetch(`/api/gql/noauth`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     query: `
      //       mutation BookAService($serviceId: String!, $start: String!, $locationId: String, $addonIds: [String], $employeeId: String, $customerName: String, $customerEmail: String!, $customerPhone: String, $notes: String, $amountTotal: Int) {
      //         bookAService(serviceId: $serviceId, start: $start, locationId: $locationId, addonIds: $addonIds, employeeId: $employeeId, customerName: $customerName, customerEmail: $customerEmail, customerPhone: $customerPhone, notes: $notes, amount_total: $amountTotal) {
      //           id
      //         }
      //       }
      //     `,
      //     variables:{ ...data },
      //   }),
      // })

      // const { checkout, error } = await res.json()
      // if(error) throw new Error(error.message)
      // console.log(bookAService);
      // dispatch({type: 'SET_BOOKING_ID', payload: bookAService.id})
      // dispatch({type: 'SET_CUSTOMER', payload: {name, email, phone}})
      

      return {
        ...formState,
        message: 'success',
      }
      
    } catch (error:any) {
      console.log(error);
      
      return {
        message: error?.message,
        errors: {
          items: '',
          customerId: '',
          couponName: '',
          start: '',
          end: '',
          total: '',
          notes: '',
        },
        fieldValues: inputValues
      }
    }
  }

  useEffect(() => {
    
    if(formState.message === 'success'){
      formRef.current?.reset()
    }
  }, [formState])

  useEffect(() => {
    
    if(!session?.itemId) return 
    
    (async () => {
      //TODO id how to get getUserCart to be async
      // @ts-ignore
      await getUserCart(session?.itemId).then(
        setIsPending(false),
        
      )
    })();
  }, [session])
  

  if(isPending || !cartItems || cartItems.length <= 0) return <LoadingAnim /> 
  return <form
    ref={formRef}
    // className={styles.form} 
    action={formAction}
  >
    <Section layout={'1_1'}>

      <fieldset className={'grid'} >
        <ul className="unstyled" style={{display: 'grid', gap: '1rem', padding: '0'}}>
          {cartItems.filter(item => item.type === 'SALE')?.map((item: any) => <CartItem key={item.id} item={item} sessionId={sessionId}/>)}
        </ul>

        <hr style={{width: '100%', height: '1px', margin: '1rem 0'}} />
        <footer className={styles.footer} >
          <p className="subtotal">
            <span> Cart subtotal: </span>
            <PriceTag price={calcCartSaleTotal(cartItems)}/>

          </p>
        </footer>
      </fieldset>

      <fieldset>
        <ul className="unstyled" style={{display: 'grid', gap: '1rem', padding: '0'}}>
        {cartItems.filter(item => item.type === 'RENTAL')?.map((item: any) => <CartItem key={item.id} item={item} sessionId={sessionId}/>)}
        </ul>
        <legend> <h3 style={{margin: '0'}}>Rental Booking Info </h3> </legend>

        <div 
          // className={'flex gap-1'}
        >
          <label htmlFor="start" className={styles.input_label}>
            <span> Start Time </span>
            <input 
              name={'start'}
              id={'start'}
              type={'datetime-local'}
              defaultValue={formState.fieldValues.start}
              required={true}
              onChange={(e) => dispatch({type: 'SET_START', payload: e.target.value}) }
            />
            <span className="error"> {formState.errors?.start} </span>
          </label>

          <label htmlFor="end" className={styles.input_label}>
            <span> End Time </span>
            <input 
              name={'end'}
              id={'end'}
              type={'datetime-local'}
              defaultValue={formState.fieldValues.end}
              required={true}
              onChange={(e) => dispatch({type: 'SET_END', payload: e.target.value}) }
            />
            <span className="error"> {formState.errors?.end} </span>
          </label>

        </div>

        <hr style={{width: '100%', height: '1px', margin: '1rem 0'}} />
        <footer className={styles.footer}>
          <table>
            <tbody>
              <tr>
                <td>Rental hours: </td>
                <td>{state.hours} <small>hours</small></td>
              </tr>
              <tr>
                <td>Rental subtotal: </td>
                <td><PriceTag price={calcCartRentalTotal(cartItems) * state.hours}/></td>
              </tr>
            </tbody>
          </table>
        </footer>

      </fieldset>

    </Section>


    <hr />
    <footer>

      <p className="total"> 
        {/* <label className={styles.coupon}>
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
        </label> */}

        <span>Total: </span> 
        <PriceTag price={calcCartSaleTotal(cartItems) + (calcCartRentalTotal(cartItems) * state.hours)}/>
      </p>
  
      <button  className="button medium" type={'submit'}> SUBMITTOTME </button>
      
      {/* <StripeCheckoutButton /> */}
    </footer>
  </form>
  
}