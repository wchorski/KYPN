// Welcome to your    
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { graphql } from '@keystone-6/core';

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';

import { Product } from "./schemas/Product";
// import { ProductImage } from "./schemas/ProductImage";
import { CartItem } from "./schemas/CartItem";
import { Event } from "./schemas/Event";
import { Ticket } from "./schemas/Ticket";

// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
// @ts-ignore
import type { Lists } from '.keystone/types';

import { OrderItem } from './schemas/OrderItem';
import { User } from './schemas/User';
import { Order } from './schemas/Order';
import { addToCart } from './mutations/addToCart';
import { checkout } from './mutations/checkout';
import { passwordRequestLink } from './mutations/passwordRequestLink';
import { Role } from './schemas/Role';
import { Page } from './schemas/Page';
import { Post } from './schemas/Post';
import { Tag } from './schemas/Tag';
import { Category } from './schemas/Category';
import { SubscriptionPlan } from './schemas/SubscriptionPlan';
import { SubscriptionItem } from './schemas/SubscriptionItem';
import { Booking } from './schemas/Booking';
import { Service } from './schemas/Service';
import { Location } from './schemas/Location';
import { Availability } from './schemas/Availability';
import { Addon } from './schemas/Addon';
import { contact } from './mutations/contact';
import { Announcement } from './schemas/Announcement';
import { checkoutSubscription } from './mutations/checkoutSubscription';
import { Coupon } from './schemas/Coupon';
import { checkoutTickets } from './mutations/checkoutTickets';
import { bookAService } from './mutations/bookAService';
import { passwordReset } from './mutations/passwordReset';
import { verifyEmail } from './mutations/verifyEmail';
import { verifyEmailRequest } from './mutations/verifyEmailRequest';
import { Rental } from './schemas/Rental';

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
  // ProductImage,
}


export const extendGraphqlSchema = graphql.extend(base => {
  return {
    mutation: {
      addToCart: addToCart(base),
      checkout: checkout(base),
      bookAService: bookAService(base),
      checkoutSubscription: checkoutSubscription(base),
      checkoutTickets: checkoutTickets(base),
      contact: contact(base),
      passwordRequestLink: passwordRequestLink(base),
      passwordReset: passwordReset(base),
      verifyEmailRequest: verifyEmailRequest(base),
      verifyEmail: verifyEmail(base),
    },
  }
})