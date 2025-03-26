import { graphql } from '@keystone-6/core'

import { Addon } from './lists/Addon'
import { Announcement } from './lists/Announcement'
import { Availability } from './lists/Availability'
import { Booking } from './lists/Booking'
import { CartItem } from './lists/CartItem'
import { Category } from './lists/Category'
import { Coupon } from './lists/Coupon'
import { Event } from './lists/Event'
import { Location } from './lists/Location'
import { Order } from './lists/Order'
import { OrderItem } from './lists/OrderItem'
import { Page } from './lists/Page'
import { Post } from "./lists/Post"
import { Product } from './lists/Product'
import { Rental } from './lists/Rental'
import { Role } from "./lists/Role"
import { Service } from './lists/Service'
import { SubscriptionItem } from './lists/SubscriptionItem'
import { SubscriptionPlan } from './lists/SubscriptionPlan'
import { Tag } from './lists/Tag'
import { Ticket } from './lists/Ticket'
import { User } from "./lists/User"
import { addToCart } from "./mutations/addToCart"
import { bookAService } from "./mutations/bookAService"
import { checkout } from "./mutations/checkout"
import { checkoutSubscription } from "./mutations/checkoutSubscription"
import { checkoutTickets } from "./mutations/checkoutTickets"
import { contact } from "./mutations/contact"
import { passwordRequestLink } from "./mutations/passwordRequestLink"
import { passwordReset } from "./mutations/passwordReset"
import { redeemCoupon } from "./mutations/redeemCoupon"
import { registerAnAccount } from "./mutations/registerAnAccount"
import { verifyEmail } from "./mutations/verifyEmail"
import { verifyEmailRequest } from "./mutations/verifyEmailRequest"
import { type Lists } from '.keystone/types'

export const lists = {
  Addon,
  Announcement,
  Availability,
  Booking,
  CartItem,
  Category,
  Coupon,
  Event,
  Location,
  Order,
  OrderItem,
  Page,
  Post,
  Product,
  Rental,
  Role,
  Service,
  SubscriptionItem,
  SubscriptionPlan,
  Tag,
  Ticket,
  User,
  
} satisfies Lists

export const extendGraphqlSchema = graphql.extend((base) => {
	return {
		mutation: {
			registerAnAccount: registerAnAccount(base),
			passwordRequestLink: passwordRequestLink(base),
			passwordReset: passwordReset(base),
			verifyEmailRequest: verifyEmailRequest(base),
			verifyEmail: verifyEmail(base),
			contact: contact(base),
			bookAService: bookAService(base),
      checkoutTickets: checkoutTickets(base),
      checkout: checkout(base),
      checkoutSubscription: checkoutSubscription(base),
      addToCart: addToCart(base),
      redeemCoupon: redeemCoupon(base),
		},
	}
})
