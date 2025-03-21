import { list } from "@keystone-6/core"
import { integer, relationship, select, text } from "@keystone-6/core/fields"

import { permissions, rules } from "../access"
// @ts-ignore
import type { Lists } from ".keystone/types"

export const Location: Lists.Location = list({
	access: {
		filter: {
			query: rules.canViewPrivateLocations,
			// query: () => true,
			update: rules.canManageLocations,
			delete: rules.canManageLocations,
		},
		operation: {
			create: permissions.canManageLocations,
			// query: permissions.canManageLocations ? permissions.canManageLocations : permissions.canViewPrivateLocations,
      query: () => true,
			update: permissions.canManageLocations,
			delete: permissions.canManageLocations,
		},
	},

	// todo hide these again
	ui: {
		// hide backend from non admins
		// isHidden: true,
    isHidden: (args) => !permissions.canManageLocations(args),
		listView: {
			initialColumns: ["name", "status", "rooms", "address"],
			initialSort: { field: "name", direction: "DESC" },
		},
	},

	fields: {
		name: text({ isIndexed: "unique", validation: { isRequired: true, length: { min: 3 } } }),
    image: text({}),
		address: text({ isIndexed: "unique", validation: { isRequired: true, length: { min: 3 }} }),
		rooms: integer({ defaultValue: 1, validation: {isRequired: true } }),
		// events: relationship({ ref: 'Event.location', many: true }),
		status: select({
			options: [
				{ label: "Public", value: "PUBLIC" },
				{ label: "Private", value: "PRIVATE" },
			],
			defaultValue: "PRIVATE",
			ui: {
				displayMode: "segmented-control",
				createView: { fieldMode: "edit" },
			},
		}),
		notes: text({
			ui: {
				displayMode: "textarea",
			},
		}),
		services: relationship({ ref: "Service.locations", many: true }),
		bookings: relationship({ ref: "Booking.location", many: true }),
		events: relationship({ ref: "Event.location", many: true }),
		categories: relationship({
			ref: "Category.locations",
			many: true,
		}),
		tags: relationship({
			ref: "Tag.locations",
			many: true,
		}),
	},
})
