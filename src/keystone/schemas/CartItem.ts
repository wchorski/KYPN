import { graphql, list } from "@keystone-6/core"
import type { Lists } from ".keystone/types"
import { integer, relationship, select, virtual } from "@keystone-6/core/fields"
import { permissions, rules } from "../access"
import { type Event } from "../types"

export const CartItem: Lists.CartItem = list({
	// TODO allow non users to order items. only should be a sudo thing i think?

	access: {
		filter: {
			query: rules.canViewCart,
		},
		operation: {
			query: () => true,
			create: permissions.canManageCart,
			update: permissions.canManageCart,
			delete: permissions.canManageCart,
		},
	},

	fields: {
		typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "cartitem"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
		quantity: integer({
			defaultValue: 1,
			validation: { isRequired: true },
		}),
		type: select({
			options: [
				{ label: "Sale", value: "SALE" },
				{ label: "Rental", value: "RENTAL" },
			],
			validation: { isRequired: true },
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
		}),
		subTotal: virtual({
			field: graphql.field({
				type: graphql.Int,
				async resolve(item, args, context) {

					const event = await context.query.Event.findOne({
						where: { id: item.eventId || 'no_event' },
            query: `price`
					}) as Event

					const product = await context.query.Product.findOne({
						where: { id: item.productId || 'no_product' },
            query: `price`
					})
          //? if cart has a mix of tickets or products it could get messy
          if(event) return event.price * item.quantity
          if(product) return product.price * item.quantity
				},
			}),
		}),
		product: relationship({ ref: "Product" }),
		event: relationship({ ref: "Event" }),
		user: relationship({ ref: "User.cart" }),
	},

  // TODO on 'update' check product.stockCount or event.seats
})
