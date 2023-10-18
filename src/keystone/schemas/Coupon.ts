import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, select, text, } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
import stripe from "../../lib/stripe";



export const Coupon:Lists.Coupon = list({
  
  access: allowAll,
  // access: {
  //   filter: {
  //     query: () => true,
  //     update: rules.canManagecoupons,
  //     delete: rules.canManagecoupons,
  //   },
  //   operation: {
  //     create: () => true,
  //     query: () => true,
  //     update: permissions.isLoggedIn,
  //     delete: permissions.isLoggedIn,
  //   }
  // },

  // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  // todo hide these again
  // ui: {
  //   isHidden: true,
  // },

  fields: {
    name: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    stripeId: text(),
    amount_off: integer(),
    percent_off: integer({
      validation: {
        min: 1,
        max: 100,
      }
    }),
    // percent_off: decimal({
    //   // defaultValue: '23.9',
    //   precision: 5,
    //   scale: 2,
    //   validation: {
    //     // isRequired: true,
    //     max: '100',
    //     min: '.01',
    //   },
    // }),
    duration_in_months: integer(),
    duration: select({
      options: [
        { label: 'once', value: 'once' },
        { label: 'repeating', value: 'repeating' },
        { label: 'forever', value: 'forever' },
      ],
      // defaultValue: 'once',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      },
      validation: {isRequired:true}
    }),
    // this can be helpful to find out all the Posts associated with a Tag

    // todo add coupon relations
    // products: relationship({ ref: 'Product.coupons', many: true }),
    subscriptionItems: relationship({ ref: 'SubscriptionItem.coupons', many: true }),
    // subscription: relationship({ ref: 'SubscriptionPlan.coupons', many: true }),
    // events: relationship({ ref: 'Event.coupons', many: true }),
    // tickets: relationship({ ref: 'Event.coupons', many: true }),
    // bookings: relationship({ ref: 'Booking.coupons', many: true }),
    // services: relationship({ ref: 'Service.coupons', many: true }),
  },

  hooks: {
    beforeOperation: async ({ operation,resolvedData, item, context, }) => {
      if(operation === 'create'){
        console.log('+ + + + + start stripe thingy ');
        
        try {
          const resStripe = await stripe.coupons.create({
            name: resolvedData.name,
            percent_off: resolvedData.percent_off,
            duration: resolvedData.duration,
            duration_in_months: resolvedData.duration_in_months,
          })
          resolvedData.stripeId = resStripe.id
          console.log({resStripe});
          
        } catch (error) {
          console.log('!!! coupon create err: ', error); 
        }
      }
    }
  }
})