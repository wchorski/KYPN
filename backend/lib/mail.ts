
import { createTransport, getTestMessageUrl } from "nodemailer";

const MAIL_HOST = process.env.MAIL_HOST || 'update .env file'
const MAIL_PORT = process.env.MAIL_PORT || 'update .env file'
const MAIL_USER = process.env.MAIL_USER || 'update .env file'
const SITE_TITLE = process.env.SITE_TITLE || ''
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS || ''

const transport = createTransport({
  // @ts-ignore
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
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

function templateBooking(id: string, name: string, email: string, msg: string): string {
  return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2> Booking Info, </h2>

      <ul>
        <li> name: <strong> ${name} </strong> </li>
        <li> email: <strong> ${email} </strong> </li>
      </ul>

      <p>${msg}</p>

      <p>
        <a href="${process.env.FRONTEND_URL}/booking/${id}"> View Booking | Admin Dashboard </a>
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
    from: EMAIL_ADDRESS,
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your Password Reset Token is here!
      <a href="${process.env.FRONTEND_URL}/auth/reset?token=${resetToken}">Click Here to reset</a>
    `),
  }).catch(err => console.log('%%%% mail.ts ERROR: ', err) ))

  if (MAIL_USER.includes('ethereal.email') && info) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);

  }
}

export async function mailBookingCreated(id: string, to: string, name: string, email: string, message: string,
): Promise<void> {
  // email the user a token
  const info = (await transport.sendMail({
    to,
    from: EMAIL_ADDRESS,
    subject: 'New Booking Created!',
    html: templateBooking(
      id,
      name,
      email,
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