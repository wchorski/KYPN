
import { createTransport, getTestMessageUrl } from "nodemailer";

const MAIL_HOST = process.env.MAIL_HOST || 'update .env file'
const MAIL_PORT = process.env.MAIL_PORT || 'update .env file'
const MAIL_USER = process.env.MAIL_USER || 'update .env file'
const MAIL_PASS = process.env.MAIL_PASS || 'update .env file'
const SITE_TITLE = process.env.SITE_TITLE || ''
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS || 'no_admin_email'

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
  start:string,
  service: {
    id:string,
    name:string,
  }
}

type Customer = {
  id:string,
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

function templateBooking(id: string, customer:Customer, employee:Employee, name: string, email: string, formValues:FormValues, msg: string): string {
  return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2> New Booking Info, </h2>

      <h4> Client: </h4>
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
            <td>${formValues.service.name}</td>
          </tr>
          <tr>
            <td> Event Start: </td>
            <td>${formValues.start}</td>
          </tr>
          <tr>
            <td> Employees: </td>
            <td><a href="${process.env.FRONTEND_URL}/users/${employee.id}"> ${employee.name}  </a> </td>
          </tr>
        </tbody>
      </table>
      <br />

      <h4> Message: </h4>
      <p>${msg}</p>
      <br />

      <p>
        <a href="${process.env.FRONTEND_URL}/bookings/${id}"> View Booking </a>
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
      <a href="${process.env.FRONTEND_URL}/auth/reset?token=${resetToken}">Click Here to reset</a>
    `),
  }).catch(err => {
    
    console.log('%%%% mail.ts ERROR: ', err)
    throw new Error("mail smpt error: " + err);
    
  } ))

  if (MAIL_USER.includes('ethereal.email') && info) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);

  }
}

export async function mailBookingCreated(id: string, to: string[], customer:Customer, employee:Employee, name: string, email: string, formValues:FormValues, message: string,
): Promise<void> {
  // email the user a token

  const info = (await transport.sendMail({
    to,
    from: ADMIN_EMAIL_ADDRESS,
    subject: 'New Booking Created!',
    html: templateBooking(
      id,
      customer,
      employee,
      name,
      email,
      formValues,
      `
        ${message}
      `
    ),
    // html: makeANiceEmail(`
    //   Here is the info, \n\n
    //   - name: ${name} \n
    //   - email: ${email} \n\n

    //   message: ${message} \n\n

    //   <a href="${process.env.FRONTEND_URL}/booking/${id}> View Booking | Admin Dashboard </a>
    // `),
  }).catch(err => console.log('%%%% mail.ts ERROR: ', err) ))

  if (MAIL_USER.includes('ethereal.email') && info) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);

  }
}