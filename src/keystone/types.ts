// @ts-nocheck
// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/types.ts
// NOTE -- these types are commented out in master because they aren't generated by the build (yet)
// To get full List and GraphQL API type support, uncomment them here and use them below
// import type { KeystoneListsTypeInfo } from './.keystone/schema-types';

import { KeystoneGraphQLAPI, KeystoneListsAPI } from "@keystone-6/core/types"
import type { Permission } from "./schemas/fields"
//todo hopefully types will be auto imported from keystone context.
// for now we will manually import types
// https://github.com/keystonejs/keystone/discussions/8498
import type { Lists } from ".keystone/types"

export type CalloutStatus = "info" | "warning" | "error" | "success"

export type Session = {
	user?:
		| {
				name?: string | null | undefined
				email?: string | null | undefined
				image?: string | null | undefined
		  }
		| undefined
	authId: string
	id: string
	itemId: string
	data: {
		role?: Role
	}
	expires: string
}

export type SpaceSize =
	| "xxs"
	| "xs"
	| "s"
	| "ms"
	| "m"
	| "ml"
	| "l"
	| "xl"
	| "xxl"
	| 0
	| "0"
export type ColorsTheme =
	| "bg_c_plain"
	| "bg_c_primary"
	| "bg_c_secondary"
	| "bg_c_tertiary"
	| "bg_c_accent"
	| "bg_c_transparent"
	| "bg_c_reverse_theme"
export type WidthLayoutSize =
	| "layout-full"
	| "layout-wide"
	| "layout-breakout"
	| "layout-content"
export type WidthLayoutSize2 =
	| "layout_full"
	| "layout_wide"
	| "layout_breakout"
	| "layout_content"
	| "layout_site"

export type GridLayout =
	| "1"
	| "1_1"
	| "1_2"
	| "2_1"
	| "1_4"
	| "1_1_1"
	| "1_2_1"
	| "1_1_1_1"

export type SelectOption = {
	value: string
	label: string
}

export type CheckboxOption = {
	value: string
	label: string
	isChecked: boolean
}

export type DayTimes = {
	day: Date
	times: string[]
}

export type TOCLink = {
	type: string
	level: number
	slug: string
	text: string
}
export type KSHeading = {
	type: string
	level: number
	children: { text: string }[]
}

//** Schema Lists */
export type User = Lists.User.Item & { role: Role }

export type Category = Lists.Category.Item

export type Tag = Lists.Tag.Item

export type Page = Lists.Page.Item & {
	categories: Category[]
	tags: Tag[]
	author: User
	content: { document: any }
}
export type Post = Lists.Post.Item & {
	categories: Category[]
	tags: Tag[]
	author: User
	content: { document: any }
}

export type Announcement = Lists.Announcement.Item & {
	// link: string
	// start: string
	// end: string
	// colorTheme: string
	// type: "MAINTENANCE" | "NORMAL" | "CRITICAL" | "SALE"
	content: {
		document: any
	}
}
// ? didn't like "[key in Permission]: boolean;"
// export type Session = {
//   itemId?: string;
//   listKey?: string;
//   data?: {
//     name: string;
//     role?: {
//       id?: string;
//       name?: string;
//     } & {
//       [key in Permission]: boolean;
//     };
//   };
// }|null

export type ListsAPI = KeystoneListsAPI<any /* KeystoneListsTypeInfo */>
export type GraphqlAPI = KeystoneGraphQLAPI<any /* KeystoneListsTypeInfo */>

export type AccessArgs = {
	session?: Session
	item?: any
}

export type AccessControl = {
	[key: string]: (args: AccessArgs) => any
}

export type ListAccessArgs = {
	itemId?: string
	session?: Session
	context?: any
}

export type CartItem = {
	id: string
	type: "SALE" | "RENTAL"
	quantity: number
	product: Product
}

export type Coupon = {
	name: string
	amount_off: number
	percent_off: number
	duration_in_months: number
	duration: "once" | "repeating" | "forever"
}

export type Event = {
	typeof: "event"
	id: string
	summary: string
	location: Location
	start: string
	end: string
	price: number
	hosts: User[]
	tickets: Ticket[]
	seats: number
	description: {
		document: any
	}
	excerpt: string
	image: string
	status: string
	dateCreated: string
	dateModified: string
	tags: Tag[]
	categories: Category[]
}

export type Ticket = {
	id: string
	email: string
	qrcode: string
	event: Event
	holder: User
	status: string
	orderCount: string
}

export type Product = {
	id: string
	price: number
	rental_price: number
	name: string
	slug: string
	status: string
	stockCount: number
	excerpt: string
	description: {
		document: any
	}
	photo: Photo
	image: string
	stripeProductId: string
	stripePriceId: string
	tags: Tag[]
	categories: Category[]
	dateCreated: string
	dateModified: string
	author: User
	rentals: Rental
	isForSale: boolean
	isForRent: boolean
}

export type Rental = {
	id: string
	start: string
	end: string
	summary?: string
	durationInHours?: string
	order: Order
	price?: number
	// employees: User[],
	addons?: Addon[]
	customer?: User
	location: string
	email?: string
	phone?: string
	name?: string
	notes: string
	status:
		| "ACTIVE"
		| "POSTPONED"
		| "CANCELED"
		| "LEAD"
		| "PAID"
		| "DOWNPAYMENT"
		| "HOLD"
	dateCreated?: string
	dateModified?: string
	delivery: boolean
	google?: {
		id?: string
		kind?: string
		status?: string
		message?: string
		htmlLink?: string
	}
}

export type ProductImage = {
	image: any
	url: string
	altText: string
	filename: string
	product: Product
	subscription: any
}

export type Photo = {
	id: string
	altText: string
	image: {
		url: string
	}
}

export type Orders = {
	Orders: [Order]
}

export type Order = {
	id: string
	charge?: string
	total: number
	dateCreated?: string
	user?: User
	items: OrderItem[]
	ticketItems?: Ticket[]
	status:
		| "OPEN"
		| "CANCELLED"
		| "FULFILLED"
		| "REFUNDED"
		| "RETURNED"
		| "EXPIRED"
		| "STARTED"
		| "PAYMENT_PENDING"
		| "PAYMENT_RECIEVED"
		| "PROCESSING"
		| "SHIPPED"
		| "DELIVERED"
}

export type OrderItem = {
	id: string
	name: string
	description: string
	price: number
	quantity: number
	type: "RENTAL" | "SALE"
	productId: string
	product: Product
	photo: Photo
	image: string
	dateCreated: string
	dateModified: string
}

// export type User = {
// 	id: string
// 	name: string
// 	nameLast: string
// 	email: string
// 	phone: string
// 	image: string
// 	password: string
// 	url: string
// 	isActive: boolean
// 	stripeCustomerId: string
// 	posts: Post[]
// 	pages: Page[]
// 	servicesProvided: Service[]
// 	bookings: Booking[]
// 	gigs: Booking[]
// 	gig_requests: Booking[]
// 	availability: Availability[]
// 	cart: CartItem[]
// 	dateCreated: string
// 	dateModified: string
// 	products: Product[]
// 	subscriptionPlans: SubscriptionPlan[]
// 	subscriptions: SubscriptionItem[]
// 	orders: OrderItem[]
// 	role: Role
// 	tickets: Ticket[]
// }

export type Availability = {
	id: string
	start: string
	end: string
	durationInHours: string
	employee: User
	type: string
	status: string
	dateCreated: string
	dateModified: string
}

export type Booking = {
	typeof: "booking"
	id: string
	start: string
	end: string
	summary: string
	durationInHours: string
	service?: Service
	price: number
	employees: User[]
	employee_requests: User[]
	addons: Addon[]
	customer: User
	location: Location
	email: string
	phone: string
	name: string
	notes: string
	status:
		| "CONFIRMED"
		| "POSTPONED"
		| "CANCELED"
		| "LEAD"
		| "PAID"
		| "DOWNPAYMENT"
		| "HOLD"
	dateCreated: string
	dateModified: string
	google?: {
		id?: string
		kind?: string
		status?: string
		message?: string
		htmlLink?: string
	}
	details: {
		document: any
	}
}

export type BookingPrevious = {
	bookingId: string
	serviceId: string
	date: string
	time: string
}

// export type Category = {
// 	id: string
// 	name: string
// 	description: string
// 	pages: Page[]
// 	posts: Post[]
// 	products: Product[]
// 	subscriptions: SubscriptionPlan[]
// 	services: Service[]
// }

// export type Tag = {
// 	id: string
// 	name: string
// 	pages: Page[]
// 	posts: Post[]
// 	products: Product[]
// 	subscriptions: SubscriptionPlan[]
// 	services: Service[]
// }

// export type Page = {
// 	id: string
// 	title: string
// 	slug: string
// 	dateCreated: string
// 	dateModified: string
// 	status: string
// 	template: string
// 	pinned: number
// 	excerpt: string
// 	featured_image: string
// 	featured_video: string
// 	content: {
// 		document: any
// 	}
// 	author: User
// 	categories: Category[]
// 	tags: Tag[]
// }

// export type Post = {
// 	id?: string
// 	title?: string
// 	slug?: string
// 	dateCreated?: string
// 	dateModified?: string
// 	status?: string
// 	template: string
// 	pinned: number
// 	excerpt?: string
// 	featured_image?: string
// 	featured_video?: string
// 	content?:
// 		| {
// 				document: any
// 		  }
// 		| any
// 	allow_comments?: boolean
// 	author?: User
// 	// |{connect:any},
// 	categories?: Category[] | { connect: any }
// 	tags?: Tag[]
// 	// |{connect:any},
// }

export type Role = {
	id: string
	name: string
	assignedTo: User
	name: string
	canManageProducts: boolean
	canManageAddons: boolean
	canManageBookings: boolean
	canManageAvailability: boolean
	canManageEvents: boolean
	canManageAnnouncements: boolean
	canManageTickets: boolean
	canSeeOtherUsers: boolean
	canManagePosts: boolean
	canManageUsers: boolean
	canManageRoles: boolean
	canManageCart: boolean
	canManageOrders: boolean
	canManageCategories: boolean
	canManageTags: boolean
	canManageLocations: boolean
	canManagePages: boolean
	canManageServices: boolean
	canManageSubscriptionPlans: boolean
	canManageSubscriptionItems: boolean
	canManageCoupons: boolean
}

export type Service = {
	id: string
	name: string
	image: string
	excerpt: string
	description: {
		document: any
	}
	price: number
	durationInHours: string
	buisnessHourOpen: string
	buisnessHourClosed: string
	buisnessDays: number[]
	employees: User[]
	bookings: Booking[]
	categories: Category[]
	tags: Tag[]
	locations: Location[]
	addons: Addon[]
	dateCreated: string
	dateModified: string
}

export type Location = {
	id: string
	name: string
	address: string
	rooms: number
	services: Service[]
	bookings: Booking[]
	categories: Category[]
	tags: Tag[]
	bookings: Booking[]
}

export type Billing_Interval = "day" | "week" | "month" | "year"
export type Duration = "forever" | "once" | "repeating"

export type SubscriptionPlan = {
	id: string
	image: string
	author: User
	name: string
	slug: string
	excerpt: string
	description: {
		document: any
	}
	status: string
	price: number
	stripeProductId: string
	stripePriceId: string
	billing_interval: Billing_Interval
	items: SubscriptionItem[]
	stockMax: number
	tags: Tag[]
	categories: Category[]
	addons: Addon[]
	coupons: Coupon[]
}

export type SubscriptionItem = {
	id: string
	status:
		| "ACTIVE"
		| "TRIAL"
		| "EXPIRED"
		| "CANCELED"
		| "SUSPENDED"
		| "PAUSED"
		| "DELINQUENT"
	custom_price: number
	billing_interval: Billing_Interval
	subscriptionPlan: SubscriptionPlan
	isActive: boolean
	isDelinquent: boolean
	user: User
	stripeSubscriptionId: string
	stripeChargeId: string
	dateCreated: string
	dateModified: string
	notes: string
}

export type Addon = {
	id: string
	name: string
	slug: string
	image: string
	description: string
	price: number
	stripeProductId: string
	services: Service[]
	bookings: Booking[]
	categories: Category[]
	tags: Tag[]
	excerpt: string
	status: "DRAFT" | "PUBLIC" | "OUT_OF_STOCK" | "PRIVATE"
	dateCreated: string
	dateModified: string
}

export type AddonCheckboxOptions = {
	name: string
	label: string
	id: string
	isChecked: boolean
	price: number
}

export type IDObj = {
	id: string
}

export type DateRange = {
	start: Date
	end: Date
}
export type StringRange = {
	start: string
	end: string
}
