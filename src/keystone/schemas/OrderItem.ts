import { list } from "@keystone-6/core"
import type { Lists } from ".keystone/types"
import {
	integer,
	relationship,
	select,
	text,
	timestamp,
} from "@keystone-6/core/fields"
import { isLoggedIn, permissions, rules } from "../access"
import { hasOnlyOneValue } from "../../lib/utils"

export const OrderItem: Lists.OrderItem = list({
	access: {
		filter: {
			query: rules.canViewOrderItems,
			update: rules.canManageOrders,
			delete: rules.canManageOrders,
		},
		operation: {
			create: isLoggedIn,
			query: isLoggedIn,
			update: permissions.canManageOrder,
			delete: permissions.canManageOrder,
		},
	},
	fields: {
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
		quantity: integer({ validation: { isRequired: true, min: 1 } }),
		product: relationship({ ref: "Product.orderItems", many: false }),
		booking: relationship({ ref: "Booking.orderItem", many: false }),
		tickets: relationship({ ref: "Ticket.orderItem", many: true }),
		subscriptionItem: relationship({ ref: "SubscriptionItem.orderItem", many: false }),
		order: relationship({ ref: "Order.items" }),
		dateCreated: timestamp({
			defaultValue: { kind: "now" },
			validation: { isRequired: true },
		}),
		dateModified: timestamp({
			defaultValue: { kind: "now" },
			validation: { isRequired: true },
		}),
	},

	hooks: {
		beforeOperation: async ({ operation, resolvedData, context, item }) => {
			// const contextSudo = context.sudo()

			if (operation === "create" || operation === "update") {
				const thisNewCombinedData = { ...item, ...resolvedData }

				const hasOnlyOne = hasOnlyOneValue(thisNewCombinedData, [
					"product",
					"booking",
					"tickets",
				])
				if (!hasOnlyOne)
					throw new Error(
						'!!! Order Item can only have one of ["product", "booking"] set'
					)
			}
		},
	},
})

// const currData:Product = {
//   stockCount: item.product.stockCount - item.quantity,
// }

// if(currData.stockCount <= 0) currData.status = 'OUT_OF_STOCK'

// const product = await context.db.Product.updateOne({
//   where: {id: item.product.id},
//   // @ts-ignore
//   data: currData
// })

// return product
