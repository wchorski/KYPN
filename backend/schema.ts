// Welcome to your    
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { graphql, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  checkbox,
  select,
} from '@keystone-6/core/fields';

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';

import { Product } from "./schemas/Product";
import { ProductImage } from "./schemas/ProductImage";
import { CartItem } from "./schemas/CartItem";

// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from '.keystone/types';
import { Context } from '.keystone/types';
import { OrderItem } from './schemas/OrderItem';
import { User } from './schemas/User';
import { Order } from './schemas/Order';
import { addToCart } from './mutations/addToCart';
import { checkout } from './mutations/checkout';
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

export const lists: Lists = {
  User,
  Role,
  Booking,
  Service,
  Location,
  Addon,
  Availability,
  SubscriptionPlan,
  SubscriptionItem,
  Product,
  ProductImage,
  CartItem,
  OrderItem,
  Order,
  Page,
  Post,
  Category,
  Tag,
  // Post: list({
  //   // WARNING
  //   //   for this starter project, anyone can create, query, update and delete anything
  //   //   if you want to prevent` random people on the internet from accessing your data,
  //   //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  //   access: allowAll,

  //   // this is the fields for our Post list
  //   fields: {
  //     title: text({ validation: { isRequired: true } }),
  //     slug: text({ isIndexed: 'unique', validation: { isRequired: true } }),
  //     publishDate:  timestamp({
  //       // this sets the timestamp to Date.now() when the user is first created
  //       defaultValue: { kind: 'now' },
  //     }),

  //     // the document field can be used for making rich editable content
  //     //   you can find out more at https://keystonejs.com/docs/guides/document-fields
  //     content: document({
  //       formatting: true,
  //       layouts: [
  //         [1, 1],
  //         [1, 1, 1],
  //         [2, 1],
  //         [1, 2],
  //         [1, 2, 1],
  //       ],
  //       links: true,
  //       dividers: true,
  //     }),

  //     // with this field, you can set a User as the author for a Post
  //     author: relationship({
  //       // we could have used 'User', but then the relationship would only be 1-way
  //       ref: 'User.posts',

  //       // this is some customisations for changing how this will look in the AdminUI
  //       ui: {
  //         displayMode: 'cards',
  //         cardFields: ['name', 'email'],
  //         inlineEdit: { fields: ['name', 'email'] },
  //         linkToItem: true,
  //         inlineConnect: true,
  //       },

  //       // a Post can only have one author
  //       //   this is the default, but we show it here for verbosity
  //       many: false,
  //     }),

  //     // with this field, you can add some Tags to Posts
  //     tags: relationship({
  //       // we could have used 'Tag', but then the relationship would only be 1-way
  //       ref: 'Tag.posts',

  //       // a Post can have many Tags, not just one
  //       many: true,

  //       // this is some customisations for changing how this will look in the AdminUI
  //       ui: {
  //         displayMode: 'cards',
  //         cardFields: ['name'],
  //         inlineEdit: { fields: ['name'] },
  //         linkToItem: true,
  //         inlineConnect: true,
  //         inlineCreate: { fields: ['name'] },
  //       },
  //     }),
  //   },
  // }),

  // this last list is our Tag list, it only has a name field for now
  // Tag: list({
  //   // WARNING
  //   //   for this starter project, anyone can create, query, update and delete anything
  //   //   if you want to prevent random people on the internet from accessing your data,
  //   //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  //   access: allowAll,

  //   // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  //   // todo hide these again
  //   // ui: {
  //   //   isHidden: true,
  //   // },

  //   // this is the fields for our Tag list
  //   fields: {
  //     name: text({ isIndexed: 'unique', validation: {isRequired: true} }),
  //     // this can be helpful to find out all the Posts associated with a Tag
  //     posts: relationship({ ref: 'Post.tags', many: true }),
  //     products: relationship({ ref: 'Product.tags', many: true }),
  //   },
  // }),
}


export const extendGraphqlSchema = graphql.extend(base => {
  return {
    mutation: {
      addToCart: addToCart(base),
      checkout: checkout(base),
    },
  }
})