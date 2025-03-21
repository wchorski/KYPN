import { promises as fs } from "fs"

import type { Context } from ".keystone/types"

const now = new Date()
const timestamp = now
	.toISOString()
	.replace(/T/, "_")
	.replace(/:/g, "-")
	.split(".")[0] // Format: YYYY-MM-DD_HH-mm-ss

export async function extractDBData(context: Context) {
	console.log("📄📄📄 EXTRACT_SEED from current database 📄📄📄")

	try {
		const allDBData = (await context.sudo().graphql.run({
			query,
		})) as JSON

		const fileName = `extData.${timestamp}.json`
		const filePath = `./src/keystone/seed/extracted/`

		saveToFile(fileName, filePath, allDBData)
		saveToFile("seedData.json", filePath, allDBData)
	} catch (error) {
		console.log("!!! extract: ", error)
	}
}

export const saveToFile = async (
	fileName: string,
	filePath: string,
	data: object
) => {
	try {
		const jsonData = JSON.stringify(data, null, 2)
		await fs.writeFile(filePath + fileName, jsonData, "utf-8")

		console.log("📄 created: ", fileName)
		console.log(`📄📄📄 DB has been extracted 📄📄📄`)
	} catch (error: any) {
		console.error(`Error writing to file: ${error.message}`)
	}
}

const query = `
  query AllData {
    users {
      id
      name
      nameLast
      authId
      password
      image
      phone
      email
      url
      isActive
      stripeCustomerId
      dateCreated
      dateModified
      buisnessHourOpen
      buisnessHourClosed
      role {
        name
        id
      }
    }
    roles {
      id
      name
      label
      description
      canViewUsers
      canManageUsers
      canManageRoles
      canManagePages
      canManagePosts
      canCreatePosts
      canManageCategories
      canManageTags
      canManageAnnouncements
      canManageProducts
      canViewProducts
      canManageAddons
      canManageBookings
      canManageAvailability
      canCreateAvailability
      canManageEvents
      canManageTickets
      canManageCart
      canManageOrders
      canManageLocations
      canViewPrivateLocations
      canManageServices
      canManageSubscriptionPlans
      canManageSubscriptionItems
      canManageCoupons
    }
    categories {
      id
      name
      excerpt
    }
    tags {
      id
      name
    }
    pages {
      id
      title
      slug
      dateCreated
      dateModified
      status
      template
      pinned
      excerpt
      featured_image
      featured_video
      content {
        document
      }
      author {
        id
        email
      }
      privateAccess {
        id
        email
      }
      categories {
        id
        name
      }
      tags {
        id
        name
      }
    }
    posts {
      id
      title
      slug
      status
      template
      pinned
      excerpt
      featured_image
      featured_video
      content {
        document
      }
      author {
        id
        email
      }
      privateAccess {
        id
        email
      }
      categories {
        id
        name
      }
      tags {
        id
        name
      }
      dateCreated
      dateModified
    }
    announcements {
      id
      link
      start
      end
      colorTheme
      type
      content {
        document
      }
    }
    locations {
      id
      name
      address
      rooms
      status
      notes
      image
      tags {
        id
        name
      }
      categories {
        id
        name
      }
    }
    addons {
      id
      name  
      slug
      image
      excerpt
      price
      status
      author {
        id
        email
      }
      categories {
        id
        name
      }
      tags {
        id
        name
      }
      dateCreated
      dateModified
    }
    events {
      id
      summary
      start
      end
      price
      seats
      image
      excerpt
      description {
        document
      }
      status
      location {
        id
        name
        address
      }
      hosts {
        id
        email
      }
      cohosts {
        id
        email
      }
      dateCreated
      dateModified
      categories {
        id
        name
      }
      tags {
        id
        name
      }
    }
    services {
      id
      name
      image
      excerpt
      description {
        document
      }
      price
      durationInHours
      buisnessHourOpen
      buisnessHourClosed
      buisnessDays
      status
      addons {
        id
        name
      }
      employees {
        id
        email
      }
      locations {
        id
        address
      }
      coupons {
        id
        name
      }
      categories {
        id
        name
      }
      tags {
        id
        name
      }
      dateCreated
      dateModified
      author {
        id
        email
      }
    }
    tickets {
      id
      typeof
      email
      status
      event {
        id
        summary
      }
      holder {
        id
        email
      }
      orderItem {
        id
      }
      dateCreated
      dateModified
    }
    bookings {
      id
      start
      end
      timeZone
      address
      service {
        id
        name
      }
      location {
        id
        address
        name
      }
      addons {
        id
        name
      }
      employees {
        id
        email
      }
      employee_requests {
        id
        name
        email
      }
      customer {
        id
        email
      }
      email
      phone
      name
      status
      details {
        document
      }
      notes
      secretNotes
      revision
      dateCreated
      dateModified
      google
    }
    products {
      image
      name
      slug
      excerpt
      description {
        document
      }
      status
      isForSale
      price
      isForRent
      rental_price
      stockCount
      author {
        id
        email
      }
      addons {
        id
        name
      }
      coupons {
        id
        name
      }
      dateCreated
      dateModified
      categories {
        id
        name
      }
      tags {
        id
        name
      }
      stripeProductId
      stripePriceId
    }
    subscriptionPlans {
      id
      name
      slug
      image
      excerpt
      status
      price
      billing_interval
      stockMax
      dateCreated
      dateModified
      stripeProductId
      stripePriceId
      description {
        document
      }
      author {
        id
        email
      }
      addons {
        id
        name
      }
      coupons {
        id
        name
      }
      categories {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`

//? first attempt didn't work
// const schemaTypes = [
//   "User",
//   "Role",
//   "Category",
//   "Tag",
//   "Page",
//   "Post",
//   "Announcement",
//   "Booking",
//   "Service",
//   "Location",
//   "Addon",
//   "Availability",
//   "SubscriptionPlan",
//   "SubscriptionItem",
//   "Product",
//   "Rental",
//   "CartItem",
//   "OrderItem",
//   "Order",
//   "Coupon",
//   "Event",
//   "Ticket",
// ]

// const allDBData = Object.fromEntries(
// 	await Promise.all(
//     schemaTypes.map(async (schema: any) => {

// 			// @ts-ignore
//       //! doesn't return all relationship connection datas. not even as "itemId"
// 			const data = await sudoDB[schema].findMany({})
// 			const formattedSchema = pluralizeString(schema.toLowerCase())
// 			return [formattedSchema, data] // Return the key-value pair
// 		})
// 	)
// )