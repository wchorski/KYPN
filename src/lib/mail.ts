
import { createTransport, getTestMessageUrl } from "nodemailer";
import moneyFormatter from '../lib/moneyFormatter'
import { datePrettyLocal } from "./dateFormatter";
import { envs } from "../../envs";
import { render } from "@react-email/render";
import  BookingEmail  from "../emails/bookings";
import { Booking, Order, SubscriptionItem } from "../keystone/types";
import OrdersEmail from "../emails/orders";
import SubscriptionItemEmail from "../emails/subscriptionItem";
import PasswordResetEmail from "../emails/passwordReset";
import PasswordResetConfirmEmail from "../emails/passwordResetConfirm";
import UserVerifyEmail from "../emails/userVerify";


const MAIL_HOST = envs.MAIL_HOST
const MAIL_PORT = envs.MAIL_PORT
const MAIL_USER = envs.MAIL_USER
const MAIL_PASS = envs.MAIL_PASS
const SITE_TITLE = envs.SITE_TITLE
const ADMIN_EMAIL_ADDRESS = envs.ADMIN_EMAIL_ADDRESS
const FRONTEND_URL = envs.FRONTEND_URL

const transport = createTransport({
  service: 'gmail',
  // host: MAIL_HOST,
  // port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
})

function makeANiceEmail(text: string): string {
  return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello,</h2>
      <p>${text}</p>

      <p>- ${SITE_TITLE}</p>
    </div>
  `;
}

type FormValues = {
  name?:string,
  phone?:string,
  email:string,
  notes?:string,
  start?:string,
  service?: {
    id:string,
    name:string,
  }
}

type Customer = {
  id:string|undefined|null,
  name?:string,
  email?:string,
  phone?:string,
}

type Employee = {
  id:string,
  name?:string,
  email?:string,
  phone?:string,
}

type OrderItem = {
  image:string,
  name:string,
  quantity:number,
  price:number,
}


type PasswordRequest = {
  to:string[],
  resetToken:string,
  user:{
    email:string,
    name?:string,
    id:string,
  }
}
export async function mailPasswordRequest({to, resetToken, user}:PasswordRequest): Promise<void> {
  // email the user a token

  const resetLink = envs.FRONTEND_URL + `/auth/password-reset?email=${user.email}&token=${resetToken}`

  const html = render(PasswordResetEmail({user, updatedDate: new Date(), resetToken, resetLink }))
  const info = (await transport.sendMail({
    to,
    from: ADMIN_EMAIL_ADDRESS,
    subject: 'Password Reset Requested',
    html,
  }).catch(err => {
    
    console.log('!!! mailPasswordReset ERROR: ', err)
    throw new Error("mail smpt error: " + err.message);
    
  } ))

  if (MAIL_USER?.includes('ethereal.email') && info) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);

  }
}

type UserVerify = {
  to:string[],
  token:string,
  user:{
    email:string,
    name?:string,
    id:string,
  }
}
export async function mailVerifyUser({to, user, token}:UserVerify): Promise<void> {
  // email the user a token

  const verifyLink = envs.FRONTEND_URL + `/auth/verify?email=${user.email}&token=${token}`

  const html = render(UserVerifyEmail({user, updatedDate: new Date(), verifyLink }))
  const info = (await transport.sendMail({
    to,
    from: ADMIN_EMAIL_ADDRESS,
    subject: 'New Account Registered',
    html,
  }).catch(err => {
    
    console.log('!!! mailVerifyUser ERROR: ', err)
    throw new Error("!!! mailVerifyUser: " + err.message);
    
  } ))

  if (MAIL_USER?.includes('ethereal.email') && info) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);

  }
}

type PasswordResetConfirm = {
  to:string[],
  user:{
    email:string,
    name?:string,
    id:string,
  }
}
export async function mailPasswordResetConfirm({to, user}:PasswordResetConfirm): Promise<void> {
  // email the user a token

  const html = render(PasswordResetConfirmEmail({user, updatedDate: new Date() }))
  const info = (await transport.sendMail({
    to,
    from: ADMIN_EMAIL_ADDRESS,
    subject: 'Password Reset Confirmed',
    html,
  }).catch(err => {
    
    console.log('!!! mailPasswordResetConfirm ERROR: ', err)
    throw new Error("mail smpt error: " + err.message);
    
  } ))

  if (MAIL_USER?.includes('ethereal.email') && info) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);

  }
}

type MailBooking= {
  to: string[], 
  operation:'create'|'update'|'delete',
  booking:Booking, 
}


// const bookingHtml = render(<BookingEmail />)

export async function mailBooking({
  to, 
  operation,
  booking, 
}:MailBooking
): Promise<void> {

  const bookingHtml = render(BookingEmail({booking, operation}))

  const info = (await transport.sendMail({
    to,
    from: ADMIN_EMAIL_ADDRESS,
    subject: `Booking: ${operation} ${booking.status}`,
    html: bookingHtml,

  }).catch(err => console.log('!!! mailBooking ERROR: ', err) ))

  if (MAIL_USER?.includes('ethereal.email') && info) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);

  }
}

type MailOrder = {
  to:string[],
  operation:'create'|'update'|'delete',
  order:Order, 
}


export async function mailOrder({to, operation, order }:MailOrder): Promise<void> {
  // email the user a token

  const html = render(OrdersEmail({operation, order}))

  const info = (await transport.sendMail({
    to,
    from: ADMIN_EMAIL_ADDRESS,
    subject: `Order: ${order.status}`,
    html,
  }).catch(err => console.log('!!! mailOrder ERROR: ', err) ))

  if (MAIL_USER?.includes('ethereal.email') && info) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
  }

}

type MailSub = {
  to:string[],
  operation:'create'|'update'|'delete',
  subscriptionItem:SubscriptionItem, 
}

export async function mailSubscription({to, operation, subscriptionItem }:MailSub): Promise<void> {
  // email the user a token

  const html = render(SubscriptionItemEmail({operation, subscriptionItem}))

  const info = (await transport.sendMail({
    to,
    from: ADMIN_EMAIL_ADDRESS,
    subject: `Subscription: ${subscriptionItem.status}`,
    html,
  }).catch(err => console.log('!!! mailSubscription ERROR: ', err) ))

  if (MAIL_USER?.includes('ethereal.email') && info) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);

  }
}

function templateReceipt(id:string, customerName:string, emailAdmin:string, orderItems:OrderItem[], date:string, totalOrder:number){
  
  const itemRows = orderItems.map(item => 
    `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: left;" align="left"> 
          <img class="product" src="${item.image}" alt="product image" width="100" height="100" style="width: 100px; height: 100px; object-fit: contain;"> 
        </td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: left;" align="left">
          ${item.name}
        </td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: left;" align="left">
          ${item.quantity}
        </td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: left;" align="left">
          ${ moneyFormatter(item.price) }
        </td>
      </tr>
    `
  ).join('')

  return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Receipt</title>
      
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
      
      <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border: 1px solid #ccc; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <img src="${FRONTEND_URL}/assets/private/logo.png" alt="product image" width="100" height="100" style="width: 100px; height: 100px; object-fit: contain;"> 
        <h2>${SITE_TITLE}</h2>
        <h3 class="title" style="font-size: 2rem; margin-bottom: 0;"> 
          Order Receipt
        </h3>
        <p class="sub-title" style="margin-top: 0; margin-bottom: 2rem;">
          ${datePrettyLocal(date, 'full')}
          <br />
          ${id}
        </p>

        <p>${customerName}, thank you for your order! Here are the details:</p>
        <hr style="border: dashed lightgrey 1px;">
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;" width="100%">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;" align="left" bgcolor="#f2f2f2">Image</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;" align="left" bgcolor="#f2f2f2">Item</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;" align="left" bgcolor="#f2f2f2">Quantity</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;" align="left" bgcolor="#f2f2f2">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>
        
        <p class="total" style="text-align: right;">Total Amount: <strong> ${moneyFormatter(totalOrder)} </strong></p>
        <hr style="border: dashed lightgrey 1px;">
        
        <p><a href="${FRONTEND_URL}/account"> View Your Account </a></p>
        <p>For any questions, please reply to <strong><a href="mailto:${emailAdmin}">${emailAdmin}</a></strong></p>
    </div>
    </body>
    </html>
  `
}