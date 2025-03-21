'use client'
import { Button } from "@components/elements/Button"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { Section } from "@components/layouts/Section"
import { useCart } from "@hooks/CartStateContext"
import type {   CartItem as CartItemType, Order, OrderItem, Rental  } from "@ks/types"
import { calcCartRentalTotal, calcCartSaleTotal } from "@lib/calcTotalPrice"
import { checkProductRentalAvail } from "@lib/checkProductRentalAvail"
import { datePrettyLocal } from "@lib/dateFormatter"
import { isTimeCheckStartEnd, timeCalcHours } from "@lib/timeUtils"
import styles from '@styles/menus/form.module.scss'
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect, useReducer, useRef, useState } from "react"
import { 
  // @ts-ignore
  experimental_useFormState as useFormState, 
  // @ts-ignore
  experimental_useFormStatus as useFormStatus 
} from "react-dom"

import CartItem from "./CartItem"
import { PriceTag } from "./PriceTag"
import StripeCheckoutButton from "./StripeCheckoutButton"

type Props = {
  sessionId:string,
  data: {
    rentalItems:CartItemType[],
    rentals:Rental[],
    saleItems:CartItemType[],
  }
}

type Fields = {
  items:string[],
  customerId:string,
  couponName:string,
  start:string,
  end:string,
  total:number,
  location:string,
  delivery:boolean,
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
  isDelivery:boolean,
  start:string,
  end:string,
  hours:number,
  rental_subtotal:number,
  sale_subtotal:number,
  total:number,
  order?:any,
  rental?:any,
  location?:any,
  // order?:Order,
  // rental?:Rental,
}

type FormAsideAction =
  | { type: 'RESET' }
  // | { type: 'SET_ADDON_OPTIONS'; payload:AddonCheckboxOptions[] }
  | { type: 'SET_TOTAL'; payload:number }
  | { type: 'SET_RENTAL'; payload:Rental }
  | { type: 'SET_ORDER'; payload:Order }
  | { type: 'SET_COUPON'; payload:string }
  | { type: 'SET_START'; payload:string }
  | { type: 'SET_END'; payload:string }
  | { type: 'APPLY_COUPON'; payload:string }
  | { type: 'SET_LOCATION'; payload:string }
  | { type: 'APPLY_COUPON'; payload:string }
  | { type: 'DELIVERY_CHECKBOX'; payload:{value:string, isChecked:boolean} }
  | { type: 'SET_CUSTOMER'; payload:{
    name?:string,
    email:string,
    phone?:string,
  }}

const today = new Date()

export function CheckoutForm ({ sessionId, data:{rentalItems, rentals, saleItems} }:Props) {

  const formRef = useRef<HTMLFormElement>(null)
  const { data: session, status }  = useSession()
  const [isPending, setIsPending] = useState(true)
  const { cartItems, getUserCart, setCartItems } = useCart()  

  const defaultState:State = {
    rentalItems,
    saleItems,
    customerId: sessionId,
    couponName: '',
    start: '',
    end: '',
    hours: 6,
    isDelivery: false,
    rental_subtotal: rentalItems.reduce((accumulator, item) => {
      return (accumulator + item.product.rental_price) * item.quantity;
    }, 0),
    sale_subtotal: saleItems.reduce((accumulator, item) => {
      return (accumulator + item.product.price) * item.quantity;
    }, 0),
    total: 0,
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
      
      case 'DELIVERY_CHECKBOX':
        return { ...state, isDelivery: action.payload.isChecked }

      case 'SET_ORDER':
        return { ...state, order: action.payload }

      case 'SET_LOCATION':
        return { ...state, location: action.payload }

      case 'SET_RENTAL':
        return { ...state, rental: action.payload }

      case 'SET_TOTAL':
        return { ...state, total: action.payload }

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
        throw new Error('something bad happened, and i am not sure what');
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
      location: '',
      delivery: false,
      notes: '',
    }
  } 

  // todo pay later checkout makes status
  const [formState, formAction] = useFormState<Form>(onSubmit, defaultForm)
  async function onSubmit(prevState: Form, formdata: FormData): Promise<Form> {
    
    const start   = formdata.get('start') as string
    const end   = formdata.get('end') as string
    const location   = formdata.get('location') as string
    const delivery   = formdata.get('delivery') as string
    const notes   = formdata.get('notes') as string
    
    dispatch({type: 'SET_TOTAL', payload: calcCartSaleTotal(cartItems) + (calcCartRentalTotal(cartItems) * state.hours)})

    const inputValues:Fields = {
      start,
      end,
      location,
      items: [],
      couponName: '',
      customerId: '',
      delivery: delivery ? true : false,
      notes,
      total: calcCartSaleTotal(cartItems) + (calcCartRentalTotal(cartItems) * state.hours)
    } 
    

    try {

      // if(typeof start !== 'string') throw new Error('start is not string')
      if(isTimeCheckStartEnd(start, end)) throw new Error('Date/Time Range Error: End time is set to happen before the start time')

      const { isRentalConflict, message } = checkProductRentalAvail({
        rentalRange: {start, end}, 
        rentals, 
        rentalItems: cartItems.filter(item => item.type === 'RENTAL')
      })
      if(isRentalConflict) throw Error(message)

      const res = await fetch(`/api/gql/noauth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation Checkout($customerEmail: String!, $chargeId: String, $start: String, $end: String, $durationInHours: String, $location: String, $delivery: Boolean) {
              checkout(customerEmail: $customerEmail, chargeId: $chargeId, start: $start, end: $end, durationInHours: $durationInHours, location: $location, delivery: $delivery) {
                id
              }
            }
          `,
          variables:{ 
            customerEmail: session?.user.email || '',
            start: new Date(start).toISOString(),
            end: new Date(end).toISOString(),
            durationInHours: String(timeCalcHours(state.start, state.end)),
            location,
            delivery: delivery ? true : false,
            notes,
          }
        }),
      })

      const { checkout, error } = await res.json()
      if(error) throw new Error(error.message)
      // console.log({checkout});

      const newOrder = {
        id: checkout.id,
        items: cartItems as OrderItem[],
        total: calcCartSaleTotal(cartItems) + (calcCartRentalTotal(cartItems) * state.hours),
        status: 'success',
      }

      if(cartItems.filter(i => i.type === 'SALE').length > 0)
        dispatch({type: 'SET_ORDER', payload: newOrder as Order})

      if(cartItems.filter(i => i.type === 'RENTAL').length > 0)
        dispatch({type: 'SET_RENTAL', payload: {
          id: checkout.id,
          start: state.start,
          end: state.end,
          location,
          notes,
          status: 'HOLDING',
          delivery: state.isDelivery,
          order: newOrder as Order,
        }})

      if(checkout.id) setCartItems([])
      // console.log(bookAService);
      // dispatch({type: 'SET_BOOKING_ID', payload: bookAService.id})
      // dispatch({type: 'SET_CUSTOMER', payload: {name, email, phone}})
      

      return {
        ...formState,
        message: 'Order Complete',
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
          location: '',
          delivery: '',
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
  

  if(state.order || state.rental) return <Section layout={'1'}>
    {/* <p className={(formState.message === 'success') ? 'success' : 'error'}> 
      {formState.message} 
    </p> */}
    <p>{formState.message}</p>

    {state.order && <>
      <h4> Items: </h4>
      <table>
        <tbody>
          <tr>
            <td>Items: </td>
            <td> 
              <ul>
                {state.order.items.map((item:CartItemType, i:number) => (
                  <li key={i}>{item.product.name} x{item.quantity}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </>}

    {state.rental && <>
      <h4> Rental </h4>
      <table>
        <tbody>
          <tr>
            <td> Status: </td>
            <td>{state.rental.status}</td>
          </tr>
          <tr>
            <td> Start: </td>
            <td>{datePrettyLocal(state.rental.start, 'full')}</td>
          </tr>
          <tr>
            <td> End: </td>
            <td>{datePrettyLocal(state.rental.end, 'full')}</td>
          </tr>
          <tr>
            <td> Total Hours: </td>
            <td>{state.hours}</td>
          </tr>
          <tr>
            <td>Items: </td>
            <td> 
              <ul>
                {state.rental.order.items.map((i:CartItemType) => <li key={i.id}>{i.product.name} x{i.quantity}</li>)}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </>}

    <p className="total"> 
      <span>Total: </span> 
      <PriceTag price={state.total}/>
    </p>

    <p>
      <Link href={`/account?dashState=orders#orders`}> Account Orders ⇢ </Link> <br /> 
    </p>
    
  </Section>

  if(isPending || !cartItems) return <LoadingAnim /> 
  if(cartItems.length <= 0) return <p> No items in your cart. Go to <Link href={`/shop`}> shop </Link> </p>
  return <>
    <form
      ref={formRef}
      // className={styles.form} 
      action={formAction}
    >
      <Section 
        // layout={(cartItems.filter(i => i.type === 'SALE').length <= 0 || cartItems.filter(i => i.type === 'SALE').length <= 0 ) ? '1' : '1_1'}
        layout={'1_1'}
      >

      {cartItems.filter(i => i.type === 'SALE').length > 0 && (
        <fieldset  >
          <legend> <h3 style={{margin: '0'}}> Cart </h3> </legend>

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
      )}

      {cartItems.filter(i => i.type === 'RENTAL').length > 0 && (
        <fieldset>
          <legend> <h3 style={{margin: '0'}}>Rental Booking Info </h3> </legend>

            <ul className="unstyled" style={{display: 'grid', gap: '1rem', padding: '0'}}>
            {cartItems.filter(item => item.type === 'RENTAL')?.map((item: any) => <CartItem key={item.id} item={item} sessionId={sessionId}/>)}
            </ul>

            <div 
              // className={'flex gap_1'}
            >
              <label htmlFor="location" className={styles.input_label}>
                <span> Event Location </span>
                <input 
                  name={'location'}
                  id={'location'}
                  type={'text'}
                  defaultValue={formState.fieldValues.location}
                  required={true}
                  onChange={(e) => dispatch({type: 'SET_LOCATION', payload: e.target.value}) }
                />
                <span className="error"> {formState.errors?.location} </span>
              </label>

              <label 
                key={'delivery'}
                htmlFor={'delivery'}
                className={'checkbox'}
                style={{margin: '1rem 0'}}
              >
                <input 
                  name={'delivery'}
                  value={'mydeliverycheckbox'}
                  type={'checkbox'}
                  readOnly={false}
                  // defaultChecked={false}
                  onChange={(e) => {
                    dispatch({type: 'DELIVERY_CHECKBOX', payload: {
                      value: e.target.value,
                      isChecked: e.target.checked
                    }})
                  }}
                />
                
                <span> 
                  Delivery:
                </span>
                <small> Deliver this rental to the above location </small>
              </label>


              <label htmlFor="start" className={styles.input_label}>
                <span> Start Time </span>
                <input 
                  name={'start'}
                  id={'start'}
                  type={'datetime-local'}
                  defaultValue={formState.fieldValues.start}
                  required={true}
                  min={today.toISOString().split('T')[0] + 'T00:00:00'}
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
                  min={state.start}
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
        )}

      </Section>


      <hr />
      <footer>

        <label htmlFor="notes" className={styles.input_label}>
          <span> Notes </span>
          <textarea 
            name={'email'}
            id={'email'}
            placeholder="..."
            defaultValue={formState.fieldValues.notes}
          />
          <span className="error"> {formState.errors?.notes} </span>
        </label>

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

        <p className={(formState.message === 'success') ? 'success' : 'error'}> 
          {formState.message} 
        </p>
    
        <SubmitButtons
          cartItems={cartItems} 
          currentRentals={rentals}
          rental={{
            hours: state.hours,
            start: state.start ? new Date(state.start).toISOString() : '',
            end: state.end ? new Date(state.end).toISOString() : '',
            location: state.location,
            delivery: state.isDelivery,
          }} 
        />
        
        {/* <StripeCheckoutButton /> */}
      </footer>
    </form>
  </>
  
}

type SubmitButtons = {
  cartItems:CartItemType[],
  rental?: {
    hours:number,
    start:string,
    end:string,
    location:string,
    delivery:boolean,
  },
  currentRentals:Rental[],
}

function SubmitButtons({cartItems, rental, currentRentals}:SubmitButtons){

  const { pending, } = useFormStatus()

  return<div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
    <StripeCheckoutButton cartItems={cartItems} rental={rental} currentRentals={currentRentals}/>
    
    {/* <button
      disabled={pending}
      type={'submit'}
      className="button large"
    >
      {pending ? <LoadingAnim /> : 'Pay Later'}
    </button> */}
    <Button
      disabled={pending}
      type={'submit'}
      size={'large'}
    >
      Pay Later
    </Button>
  </div>
  
}