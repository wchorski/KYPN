// Welcome to your
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

import { graphql } from "@keystone-6/core"
import type { Lists } from ".keystone/types"

import { User } from "./schemas/User"
import { Role } from "./schemas/Role"
import { registerAnAccount } from "./mutations/registerAnAccount"
import { Post } from "./schemas/Post"
import { Page } from "./schemas/Page"
import { Category } from "./schemas/Category"
import { Ticket } from "./schemas/Ticket"
import { Event } from "./schemas/Event"
import { Order } from "./schemas/Order"
import { Tag } from "./schemas/Tag"
import { passwordRequestLink } from "./mutations/passwordRequestLink"
import { verifyEmailRequest } from "./mutations/verifyEmailRequest"
import { verifyEmail } from "./mutations/verifyEmail"
import { passwordReset } from "./mutations/passwordReset"
import { contact } from "./mutations/contact"
import { Announcement } from "./schemas/Announcement"
import { Booking } from "./schemas/Booking"
import { Location } from "./schemas/Location"
import { Availability } from "./schemas/Availability"
import { Service } from "./schemas/Service"
import { Addon } from "./schemas/Addon"
import { bookAService } from "./mutations/bookAService"
import { Coupon } from "./schemas/Coupon"
import { OrderItem } from "./schemas/OrderItem"
import { Rental } from "./schemas/Rental"
import { Product } from "./schemas/Product"
import { SubscriptionItem } from "./schemas/SubscriptionItem"
import { SubscriptionPlan } from "./schemas/SubscriptionPlan"
import { CartItem } from "./schemas/CartItem"

// todo fix type error with this - https://github.com/keystonejs/keystone/issues/8228

export const lists: Lists = {
	User,
  Role,
  Announcement,
  Booking,
  Service,
  Location,
  Addon,
  Availability,
  SubscriptionPlan,
  SubscriptionItem,
  Product,
  Rental,
  CartItem,
  OrderItem,
  Order,
  Coupon,
  Page,
  Post,
  Event,
  Ticket,
  Category,
  Tag,
}

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
		},
	}
})
