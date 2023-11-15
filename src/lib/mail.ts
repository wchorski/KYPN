
import { createTransport, getTestMessageUrl } from "nodemailer";
import moneyFormatter from '../lib/moneyFormatter'
import { datePrettyLocal } from "./dateFormatter";
import { envs } from "../../envs";

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


type TemplateBooking = {
  id: string, 
  formValues:FormValues, 
  customer:Customer, 
  employee?:Employee, 
}

function templateBooking({
  id, 
  formValues, 
  customer, 
  employee, 
}: TemplateBooking) {
  return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2> New Booking Info, </h2>

      <h4> Registered User: </h4>
      <table>
        <tbody>
          <tr>
            <td>Name: </td>
            <td> <a href="${process.env.FRONTEND_URL}/users/${customer.id}"> ${customer.name}  </a> </td>
          </tr>
          <tr>
            <td>Email: </td>
            <td>${customer.email}</td>
          </tr>
          <tr>
            <td>Phone: </td>
            <td>${customer.phone}</td>
          </tr>
        </tbody>
      </table>
      <br />

      <h4> Form Info: </h4>
      <table>
        <tbody>
          <tr>
            <td> Name: </td>
            <td>${formValues.name}</td>
          </tr>
          <tr>
            <td> Email: </td>
            <td>${formValues.email}</td>
          </tr>
          <tr>
            <td> Phone: </td>
            <td>${formValues.phone}</td>
          </tr>
          <tr>
            <td> Service: </td>
            <td>${formValues?.service?.name}</td>
          </tr>
          <tr>
            <td> Event Start: </td>
            <td>${formValues.start}</td>
          </tr>
          <tr>
            <td> Employees: </td>
            <td><a href="${FRONTEND_URL}/users/${employee?.id}"> ${employee?.name}  </a> </td>
          </tr>
        </tbody>
      </table>
      <br />

      <h4> Notes: </h4>
      <p>${formValues.notes}</p>
      <br />

      <p>
        <a href="${FRONTEND_URL}/bookings/${id}"> View Booking </a>
      </p>

      <p>- ${SITE_TITLE}</p>
    </div>
  `;
}


// export interface MailResponse {
//   accepted?: (string)[] | null;
//   rejected?: (null)[] | null;
//   envelopeTime: number;
//   messageTime: number;
//   messageSize: number;
//   response: string;
//   envelope: Envelope;
//   messageId: string;
// }
// export interface Envelope {
//   from: string;
//   to?: (string)[] | null;
// }

export async function sendPasswordResetEmail(resetToken: string, to: string
): Promise<void> {
  // email the user a token
  const info = (await transport.sendMail({
    to,
    from: ADMIN_EMAIL_ADDRESS,
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your Password Reset Token is here!
      <a href="${FRONTEND_URL}/auth/reset?token=${resetToken}">Click Here to reset</a>
    `),
  }).catch(err => {
    
    console.log('%%%% mail.ts ERROR: ', err)
    throw new Error("mail smpt error: " + err);
    
  } ))

  if (MAIL_USER?.includes('ethereal.email') && info) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);

  }
}

type MailBookingCreate = {
  id: string, 
  to: string[], 
  customer:Customer, 
  employee?:Employee, 
  formValues:FormValues, 
  message?: string,
}

export async function mailBookingCreated({
  id, 
  to, 
  customer, 
  employee, 
  formValues, 
}:MailBookingCreate
): Promise<void> {
  // email the user a token

  const info = (await transport.sendMail({
    to,
    from: ADMIN_EMAIL_ADDRESS,
    subject: 'New Booking Created!',
    html: templateBooking({
      id,
      customer,
      employee,
      formValues,
    }),

  }).catch(err => console.log('%%%% mail.ts ERROR: ', err) ))

  if (MAIL_USER?.includes('ethereal.email') && info) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);

  }
}

export async function mailCheckoutReceipt(id: string, to: string[], customerName:string, emailAdmin: string, items:OrderItem[], date:string, totalOrder:number
): Promise<void> {
  // email the user a token

  const info = (await transport.sendMail({
    to,
    from: ADMIN_EMAIL_ADDRESS,
    subject: 'Order Receipt',
    html: templateReceipt(
      id,
      customerName || 'anonymous',
      emailAdmin,
      items,
      date,
      totalOrder,
    ),
  }).catch(err => console.log('%%%% mail.ts Checkout ERROR: ', err) ))

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