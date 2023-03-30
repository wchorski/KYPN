
import { createTransport, getTestMessageUrl } from "nodemailer";

const MAIL_HOST = process.env.MAIL_HOST || 'update .env file'
const MAIL_PORT = process.env.MAIL_PORT || 'update .env file'
const MAIL_USER = process.env.MAIL_USER || 'update .env file'

const transport = createTransport({
  // @ts-ignore
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
  }
})

function makeANiceEmail(text: string):string {
  return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>

      <p>😘, Will is Boss</p>
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
    from: 'wes@wesbos.com',
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your Password Reset Token is here!
      <a href="${process.env.FRONTEND_URL}/auth/reset?token=${resetToken}">Click Here to reset</a>
    `),
  }));
  if(MAIL_USER.includes('ethereal.email')) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);

  }
}