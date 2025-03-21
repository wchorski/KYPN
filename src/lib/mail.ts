import { render } from "@react-email/render"
import { createTransport, getTestMessageUrl } from "nodemailer"

import { envs } from "../../envs"
import BookingEmail from "../emails/bookings"
import ContactEmail from "../emails/contact"
import OrdersEmail from "../emails/orders"
import PasswordResetEmail from "../emails/passwordReset"
import PasswordResetConfirmEmail from "../emails/passwordResetConfirm"
import SubscriptionItemEmail from "../emails/subscriptionItem"
import UserVerifyEmail from "../emails/userVerify"
import type { Booking, Order, SubscriptionItem } from "../keystone/types"

const MAIL_HOST = envs.MAIL_HOST
const MAIL_PORT = envs.MAIL_PORT
const MAIL_USER = envs.MAIL_USER
const MAIL_PASS = envs.MAIL_PASS
const SITE_TITLE = envs.SITE_TITLE
const ADMIN_EMAIL_ADDRESS = envs.ADMIN_EMAIL_ADDRESS
const FRONTEND_URL = envs.FRONTEND_URL

const transport = createTransport({
	service: "gmail",
	// host: MAIL_HOST,
	// port: MAIL_PORT,
	auth: {
		user: MAIL_USER,
		pass: MAIL_PASS,
	},
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
  `
}

type FormValues = {
	name?: string
	tel?: string
	email: string
	notes?: string
	start?: string
	service?: {
		id: string
		name: string
	}
}

type Customer = {
	id: string | undefined | null
	name?: string
	email?: string
	tel?: string
}

type Employee = {
	id: string
	name?: string
	email?: string
	tel?: string
}

type OrderItem = {
	image: string
	name: string
	quantity: number
	price: number
}

type PasswordRequest = {
	to: string[]
	resetToken: string
	user: {
		email: string
		name?: string
		id: string
	}
}
export async function mailPasswordRequest({
	to,
	resetToken,
	user,
}: PasswordRequest): Promise<void> {
	// email the user a token

	const resetLink =
		envs.FRONTEND_URL +
		`/password-reset?email=${user.email}&token=${resetToken}`

	const html = render(
		PasswordResetEmail({ user, updatedDate: new Date(), resetToken, resetLink })
	)
	const info = await transport
		.sendMail({
			to,
			from: ADMIN_EMAIL_ADDRESS,
			subject: "Password Reset Requested",
			html,
		})
		.catch((err) => {
			console.log("!!! mailPasswordReset ERROR: ", err)
			throw new Error("mail smpt error: " + err.message)
		})

	if (MAIL_USER?.includes("ethereal.email") && info) {
		console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`)
	}
}

type UserVerify = {
	to: string[]
	token: string
	user: {
		email: string
		name?: string
		id: string
	}
}
export async function mailVerifyUser({
	to,
	user,
	token,
}: UserVerify): Promise<void> {
	// email the user a token

	const verifyLink =
		envs.FRONTEND_URL + `/verify?email=${user.email}&token=${token}`

	const html = render(
		UserVerifyEmail({ user, updatedDate: new Date(), verifyLink })
	)
	const info = await transport
		.sendMail({
			to,
			from: ADMIN_EMAIL_ADDRESS,
			subject: "New Account Registered",
			html,
		})
		.catch((err) => {
			console.log("!!! mailVerifyUser ERROR: ", err)
			throw new Error("!!! mailVerifyUser: " + err.message)
		})

	if (MAIL_USER?.includes("ethereal.email") && info) {
		console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`)
	}
}

type PasswordResetConfirm = {
	to: string[]
	user: {
		email: string
		name?: string
		id: string
	}
}
export async function mailPasswordResetConfirm({
	to,
	user,
}: PasswordResetConfirm): Promise<void> {
	// email the user a token

	const html = render(
		PasswordResetConfirmEmail({ user, updatedDate: new Date() })
	)
	const info = await transport
		.sendMail({
			to,
			from: ADMIN_EMAIL_ADDRESS,
			subject: "Password Reset Confirmed",
			html,
		})
		.catch((err) => {
			console.log("!!! mailPasswordResetConfirm ERROR: ", err)
			throw new Error("mail smpt error: " + err.message)
		})

	if (MAIL_USER?.includes("ethereal.email") && info) {
		console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`)
	}
}

type MailBooking= {
  to: string[], 
  operation:'create'|'update'|'delete',
  booking:Booking, 
  employeeNames:string[]
}


// const bookingHtml = render(<BookingEmail />)

export async function mailBooking({
  to, 
  operation,
  booking, 
  employeeNames,
}:MailBooking
): Promise<void> {

  const bookingHtml = render(BookingEmail({booking, operation, employeeNames}))

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

type MailContact= {
  to: string[], 
  contact: {
    name?:string,
    customerId?:string,
    tel?:string,
    start?:string,
    notes?:string,
    email:string,
  }
}

export async function mailContact({
  to, 
  contact,
}:MailContact
): Promise<void> {

  const html = render(ContactEmail({contact}))

  const info = (await transport.sendMail({
    to,
    from: ADMIN_EMAIL_ADDRESS,
    subject: `New Contact Info`,
    html,

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