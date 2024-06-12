// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from '@keystone-6/core';
// @ts-ignore
import { Context } from '.keystone/types';
// import { relationship } from '@keystone-6/core/fields';
import stripeConfig from '../../lib/stripe';
import { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import { CartItem, OrderItem, Product } from '../types';
import { calcTotalPrice } from '../../lib/calcTotalPrice';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../../session';

type PartialProduct = Partial<Product>

const IMG_PLACEHOLD = process.env.FRONTEND_URL + '/assets/product-placeholder.png'
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS || 'no_admin_email@m.lan'

export const checkout = (base: BaseSchemaMeta) => graphql.field({
  type: base.object('CartItem'),

  args: { 
    chargeId: graphql.arg({ type: graphql.String }), 
    customerEmail: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    start: graphql.arg({ type: graphql.String }),
    end: graphql.arg({ type: graphql.String }),
    durationInHours: graphql.arg({ type: graphql.String }),
    location: graphql.arg({ type: graphql.String }),
    notes: graphql.arg({ type: graphql.String }),
    delivery: graphql.arg({ type: graphql.Boolean }),
  },

  // 1. Make sure they are signed in
  async resolve(source, { chargeId, customerEmail, start, end, durationInHours, location, delivery, notes }, context: Context) {

    const contextSudo = context.sudo()
    //Query the current user
    const user = await contextSudo.query.User.findOne({
      where: { email: customerEmail },
      query:
        `
          id
          name
          email
          orders {
            id
          }
          cart {
            id
            type
            quantity
            product {
              id
              name
              price
              stockCount
              image
            }
          }
        `,
    })

    if(!user) throw new Error(`!!! checkout, No user Found with email: ${customerEmail}`)

    if(user.cart.length <= 0) throw new Error('!!! No cart items found')
    //Create an order based on the cart item
    const orderItems = user.cart.map((cartItem: CartItem) => {

      return {
        name: cartItem.product.name,
        description: cartItem.product.description,
        price: cartItem.product.price,
        type: cartItem.type,
        quantity: cartItem.quantity,
        image: cartItem.product.image,
        product: { connect: { id: cartItem.product.id }}
        // productId: cartItem.product.id,
        // photo: { connect: { id: cartItem.product.photo.id } },
      }

    }) as OrderItem[]  
    
    const now = new Date
    const order = await contextSudo.db.Order.createOne({
      data: {
        total: calcTotalPrice(user.cart),
        // @ts-ignore
        items: { create: orderItems },
        email: customerEmail,
        user: { connect: { id: user.id } },
        charge: chargeId ? chargeId : '',
        dateCreated: now.toISOString(),
        // todo make logic that handles open, expired, unpaid, no_payment states
        status: calcTotalPrice(user.cart) <= 0 ? 'PROCESSING' : chargeId ? 'PAYMENT_RECIEVED' : 'PAYMENT_PENDING',
        // payment_status: chargeId ? 'PAID' : 'UNPAID',
        notes,
      },
    })

    // Clean up! Delete all cart items
    await context.db.CartItem.deleteMany({
      where: user.cart.map((cartItem: CartItem) => { return { id: cartItem.id } })
    })

    // remove saleItems from stock 
    const updatedSaleItems = user.cart.map(async (cartItem:CartItem) => {
      
      // if it's a RENTAL ignore stock update
      if(cartItem.type === 'RENTAL') return 

      const currProduct = await contextSudo.db.Product.findOne({
        where: {id: cartItem.product.id}
      })
      if(!currProduct) return 

      // @ts-ignore
      const currData:Product = {
        stockCount: currProduct.stockCount - cartItem.quantity,
      }
      
      if(currData.stockCount <= 0) currData.status = 'OUT_OF_STOCK'
      
      const updatedProduct = await contextSudo.db.Product.updateOne({
        where: {id: cartItem.product.id},
        // @ts-ignore
        data: currData
      })
    })

    const rentalItems = orderItems.filter(item => item.type === 'RENTAL')
    if(rentalItems.length <= 0) return { 
      status: 'success', 
      message: 'checkout cart successful', 
      order,
      id: order.id,
    }
    // const saleItems = orderItems.filter(item => item.type === 'SALE')

    const rental = await contextSudo.db.Rental.createOne({
      data: {
        status: chargeId ? 'PAID' : 'HOLD',
        start,
        end,
        durationInHours,
        location,
        delivery,
        notes,
        customer: customerEmail ? { connect: { email: customerEmail } } : null,
        order: order ? { connect: { id: order.id} } : null
      }
    })

    // return order w rental
    
    return { 
      status: 'success', 
      message: 'checkout cart successful', 
      order,
      rental,
      id: order.id,
    }
  }
})