const dateNow = new Date()

import type {
	UserCreateInput,
	RoleCreateInput,
	PageCreateInput,
	PostCreateInput,
	CategoryCreateInput,
	TagCreateInput,
	AnnouncementCreateInput,
	AddonCreateInput,
	LocationCreateInput,
	BookingCreateInput,
	EventCreateInput,
} from ".keystone/types"
import { SeedBookings, SeedEvent, SeedLocations, SeedPost, SeedService } from "@ks/types"
import { dateAdjuster } from "../../lib/dateCheck"

export const locations_seed: SeedLocations[] = [
	{
		name: "Zesty Lounge",
		address: "123 Zelst Blvd, Chicago IL 60606",
		rooms: 1,
		status: "PUBLIC",
		notes:
			"Our Bar/Restaurant lounge area can be rented out for your next event! ",
		tags: [],
		categories: [],
	},
	{
		name: "Live Stream",
		address: "/live",
		rooms: 1,
		status: "PUBLIC",
		notes:
			"Broadcasting live right here on our channel. Give your event a digital edge with our live streaming options.",
		tags: [],
		categories: [],
	},
	{
		name: "On-Site",
		address: "n/a",
		rooms: 999,
		status: "PUBLIC",
		notes:
			"You tell us where and when and we show up with a truck load of fruit fun! *On-Site availability varies per location.",
		tags: [],
		categories: [],
	},
	{
		name: "Honorary Orchards",
		address: "5006 S Sylvania Ave, Sturtevant, WI 53177",
		rooms: 3,
		status: "PUBLIC",
		notes:
			"It includes a fun train ride to the orchards and has lots of family-friendly activities including a corn maze, petting zoo, slides and more",
		tags: [],
		categories: [],
	},
	{
		name: "Hidden Valley",
		address: "Sudden Valley Subdivision, Newport Beach, CA 92657",
		rooms: 1,
		status: "PRIVATE",
		notes:
			"Tucked away from view, this hidden gem is sure to spark curiosity and wonder as guests roam its 6,255-square-foot interior",
		tags: [],
		categories: [],
	},
]

export const addons_seed: AddonCreateInput[] = [
	{
		name: "Organic Upgrade",
		slug: "organic-upgrade",
		excerpt:
			"All fruits in your order will be certified organic, grown without synthetic pesticides or fertilizers.",
		price: 26000,
	},
	{
		name: "Personalized Packaging",
		slug: "personalized-packaging",
		excerpt:
			"Customized packaging with handwritten notes or branding for gifting or corporate events.",
		price: 10000,
	},
	{
		name: "Reusable Tote Bags",
		slug: "reusable-tote-bags",
		excerpt:
			"10 Cute FruitFruit™️ branded, eco-friendly tote bag for easy and sustainable fruit carrying for all your guests.",
		price: 8000,
	},
]

export const services_seed: SeedService[] = [
	{
		name: "Fresh Fruit Fiesta",
		excerpt:
			"A variety of fruit flavored spreads and fruity fun decore all provided by our friendly hosts.",
		price: 100000,
		status: "PUBLIC",
		addons: [
			{ slug: "organic-upgrade" },
			{ slug: "personalized-packaging" },
			{ slug: "reusable-tote-bags" },
		],
	},
	{
		name: "Smoothie Bar Social",
		excerpt:
			"On-site smoothie bar offering customizable fruit blends for events and gatherings.",
		price: 15000,
		status: "PUBLIC",
		addons: [{ slug: "organic-upgrade" }],
	},
	{
		name: "Juicing Workshops",
		excerpt:
			"Interactive sessions teaching you how to make fresh, nutrient-packed fruit juices at home.",
		price: 45,
		status: "PUBLIC",
		addons: [
			{ slug: "organic-upgrade" },
			{ slug: "personalized-packaging" },
			{ slug: "reusable-tote-bags" },
		],
	},
]

export const user_seeddata: UserCreateInput[] = [
	{
		name: "CuteFruitAdmin",
		email: "admin@tawtaw.site",
		authId: "admin@tawtaw.site",
		image:
			"https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Avery&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,546e7a,5e35b1,6d4c41,757575,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,d1d4f9,b6e3f4,c0aede,ffd5dc,ffdfbf,transparent",
		stripeCustomerId: undefined,
		password: "it5-a-secret-t0-everybodY",
		role: { connect: { name: "admin" } },
	},
	{
		name: "Eddy",
		email: "eddy@tawtaw.site",
		authId: "eddy@tawtaw.site",
		image:
			"https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Vivian&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,546e7a,5e35b1,6d4c41,757575,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,d1d4f9,b6e3f4,c0aede,ffd5dc,ffdfbf,transparent",
		stripeCustomerId: undefined,
		password: "eddy@tawtaw.site",
		role: { connect: { name: "editor" } },
	},
	{
		name: "Arthur",
		email: "arthur@tawtaw.site",
		authId: "arthur@tawtaw.site",
		image:
			"https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Wyatt&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,546e7a,5e35b1,6d4c41,757575,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,d1d4f9,b6e3f4,c0aede,ffd5dc,ffdfbf,transparent",
		stripeCustomerId: undefined,
		password: "arthur@tawtaw.site",
		role: { connect: { name: "author" } },
	},
	{
		name: "Cinda",
		email: "cinda@tawtaw.site",
		authId: "cinda@tawtaw.site",
		password: "cinda@tawtaw.site",
		image:
			"https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Emery&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,546e7a,5e35b1,6d4c41,757575,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,d1d4f9,b6e3f4,c0aede,ffd5dc,ffdfbf,transparent",
		stripeCustomerId: undefined,
		role: { connect: { name: "client" } },
	},
	{
		name: "Catherine",
		email: "Catherine@tawtaw.site",
		authId: "Catherine@tawtaw.site",
		password: "Catherine@tawtaw.site",
		image:
			"https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Katherine&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,546e7a,5e35b1,6d4c41,757575,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,d1d4f9,b6e3f4,c0aede,ffd5dc,ffdfbf,transparent",
		stripeCustomerId: undefined,
		role: { connect: { name: "client" } },
	},
	{
		name: "Cinderella",
		email: "Cinderella@tawtaw.site",
		authId: "Cinderella@tawtaw.site",
		password: "Cinderella@tawtaw.site",
		image:
			"https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Vivian&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,546e7a,5e35b1,6d4c41,757575,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,d1d4f9,b6e3f4,c0aede,ffd5dc,ffdfbf,transparent",
		stripeCustomerId: undefined,
		role: { connect: { name: "client" } },
	},
	{
		name: "Colin",
		email: "Colin@tawtaw.site",
		authId: "Colin@tawtaw.site",
		password: "Colin@tawtaw.site",
		image:
			"https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Aidan&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,546e7a,5e35b1,6d4c41,757575,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,d1d4f9,b6e3f4,c0aede,ffd5dc,ffdfbf,transparent",
		stripeCustomerId: undefined,
		role: { connect: { name: "client" } },
	},
	{
		name: "Cole",
		email: "Cole@tawtaw.site",
		authId: "Cole@tawtaw.site",
		password: "Cole@tawtaw.site",
		image:
			"https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Maria&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,546e7a,5e35b1,6d4c41,757575,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,d1d4f9,b6e3f4,c0aede,ffd5dc,ffdfbf,transparent",
		stripeCustomerId: undefined,
		role: { connect: { name: "client" } },
	},
	{
		name: "Ulric the Unverified",
		email: "ulric@tawtaw.site",
		authId: "ulric@tawtaw.site",
		image: "",
		stripeCustomerId: undefined,
		password: "ulric@tawtaw.site",
	},
]

export const bookings_seedjson: SeedBookings[] = [
	{
		start: "2025-01-15T19:15:00.000Z",
		end: "2025-01-16T01:15:00.000Z",
		timeZone: "America/Chicago",
		address: "",
		service: {
			name: "Smoothie Bar Social",
		},
		location: {
			name: "On-Site",
		},
		addons: [],
		employees: [],
		customer: {
			email: "Cole@tawtaw.site",
		},
		email: "Cole@tawtaw.site",
		phone: "123 122-1234",
		name: "Cole",
		status: "REQUESTED",
		notes: "",
		secretNotes: "",
		revision: 1,
		dateCreated: "2025-01-07T00:38:02.934Z",
		dateModified: "2025-01-07T00:38:03.543Z",
	},
	{
		start: "2025-02-05T17:15:00.000Z",
		end: "2025-02-05T23:15:00.000Z",
		timeZone: "America/Chicago",
		address: "",
		service: {
			name: "Fresh Fruit Fiesta",
		},
		location: {
			name: "On-Site",
		},
		addons: [
			{
				slug: "reusable-tote-bags",
			},
			{
				slug: "personalized-packaging",
			},
		],
		employees: [],
		customer: {
			email: "Colin@tawtaw.site",
		},
		email: "Colin@tawtaw.site",
		phone: "123 122-1234",
		name: "Colin",
		status: "REQUESTED",
		notes: "",
		secretNotes: "",
		revision: 1,
		dateCreated: "2025-01-07T01:28:05.116Z",
		dateModified: "2025-01-07T01:28:05.517Z",
	},
	{
		start: "2025-02-03T18:15:00.000Z",
		end: "2025-02-04T00:15:00.000Z",
		timeZone: "America/Chicago",
		address: "",
		service: {
			name: "Juicing Workshops",
		},
		location: {
			name: "On-Site",
		},
		addons: [
			{
				slug: "reusable-tote-bags",
			},
			{
				slug: "personalized-packaging",
			},
		],
		employees: [],
		customer: {
			email: "Catherine@tawtaw.site",
		},
		email: "Catherine@tawtaw.site",
		phone: "123 122-1234",
		name: "Catherine",
		status: "REQUESTED",
		notes: "",
		secretNotes: "",
		revision: 1,
		dateCreated: "2025-01-07T01:30:50.703Z",
		dateModified: "2025-01-07T01:30:51.262Z",
	},
]

// export const roles_seedjson:Lists.Role['fields'] = [
export const roles_seedjson: RoleCreateInput[] = [
	{
		name: "admin",
		label: "Admin",
		canViewUsers: true,
		canManageUsers: true,
		canManageRoles: true,
		canManagePosts: true,
		canCreatePosts: true,
		canManagePages: true,
		canManageCategories: true,
		canManageTags: true,
		canManageAnnouncements: true,
		canManageProducts: true,
		canViewProducts: true,
		canManageAddons: true,
		canManageBookings: true,
		canManageAvailability: true,
		canCreateAvailability: true,
		canManageEvents: true,
		canManageTickets: true,
		canManageCart: true,
		canManageOrders: true,
		canManageLocations: true,
		canViewPrivateLocations: true,
		canManageServices: true,
		canManageSubscriptionPlans: true,
		canManageSubscriptionItems: true,
		canManageCoupons: true,
		description: "Users with permission to create, edit, delete all data",
		// assignedTo: {
		// 	connect: {
		// 		email: "admin@tawtaw.site",
		// 	},
		// },
	},
	{
		name: "editor",
		label: "Editor",
		canManagePosts: true,
		canCreatePosts: true,
		canManageCategories: true,
		canManageTags: true,
		description:
			"Users with permission to manage all site posts, categories, and tags",
		// assignedTo: {
		// 	connect: {
		// 		email: "eddy@tawtaw.site",
		// 	},
		// },
	},
	{
		name: "author",
		label: "Author",
		canCreatePosts: true,
		canManageCategories: true,
		canManageTags: true,
		description:
			"Users with permission to create and edit only their own posts",
		// assignedTo: {
		// 	connect: {
		// 		email: "arthur@tawtaw.site",
		// 	},
		// },
	},
	{
		name: "client",
		label: "Client",
		description:
			"Users that are verified account holders. Users with no role are unverified",
		// assignedTo: {
		// 	connect: {
		// 		email: "cinda@tawtaw.site",
		// 	},
		// },
	},
]

export const pages_seeddata: PageCreateInput[] = [
	{
		title: "Admin",
		slug: "admin",
		dateCreated: "2024-11-13T00:29:07.546Z",
		dateModified: "2024-11-15T00:51:41.410Z",
		status: "PRIVATE",
		template: "FULLWIDTH",
		pinned: 0,
		excerpt: "",
		featured_image: "",
		featured_video: "",
		content: {
			document: [
				{
					type: "paragraph",
					children: [
						{
							text: "This page is reserved for custom admin tools that the KeysoneJs dashboard does not provide. ",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Things such as ",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Post template creation.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Batch User processing",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "etc.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "This page is meant to be built by a web dev and not here in the KeystoneJs editor.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "",
						},
					],
				},
			],
			author: {
				connect: {
					email: "admin@tawtaw.site",
				},
			},
			// "privateAccess": []
		},
	},
	{
		title: "Home",
		slug: "home",
		dateCreated: "2024-08-05T03:08:43.565Z",
		dateModified: "2024-11-19T00:28:09.692Z",
		status: "PUBLIC",
		template: "FULLWIDTH",
		pinned: 0,
		excerpt: "",
		featured_image: "",
		featured_video: "",
		content: {
			document: [
				{
					type: "layout",
					layout: [1, 2],
					children: [
						{
							type: "layout-area",
							children: [
								{
									type: "component-block",
									props: {
										width: "initial",
										content: null,
										padding: 1,
										fontSize: "1",
										imageSrc: "",
										colorTheme: "bg_c_transparent",
										marginBlock: "var(--space-m)",
										marginInline: "",
										verticleAlign: "center",
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "heading",
													level: 2,
													children: [
														{
															text: "Cute Fruit ",
														},
													],
												},
												{
													type: "paragraph",
													children: [
														{
															text: "At FruitFusion, we're on a mission to revolutionize your daily dose of nutrition and flavor. We've blended the best of nature's bounty to create a range of mouthwatering smoothies that don't just taste incredible but also nourish your body from the inside out.",
														},
													],
												},
											],
											propPath: ["content"],
										},
									],
									component: "card",
								},
							],
						},
						{
							type: "layout-area",
							children: [
								{
									type: "component-block",
									props: {
										alt: "",
										color: "lightgray",
										width: "",
										border: 0,
										padding: 1,
										imageSrc:
											"https://media.giphy.com/media/l4jDyg9cuka44xkEqn/giphy.gif",
									},
									children: [
										{
											type: "component-inline-prop",
											children: [
												{
													text: "",
												},
											],
										},
									],
									component: "image",
								},
							],
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "layout",
					layout: [1, 1, 1],
					children: [
						{
							type: "layout-area",
							children: [
								{
									type: "component-block",
									props: {
										width: "initial",
										content: null,
										padding: 1,
										fontSize: "1",
										imageSrc: "",
										colorTheme: "bg_c_primary",
										marginBlock: "var(--space-m)",
										marginInline: "",
										verticleAlign: "start",
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "heading",
													level: 4,
													children: [
														{
															text: "Unparalleled Freshness",
														},
													],
												},
												{
													type: "paragraph",
													children: [
														{
															text: "source the finest, locally grown fruits and vegetables to craft our signature smoothies. Our ingredients are picked at their peak ripeness, ensuring you get the maximum flavor and nutrients in every blend.",
														},
													],
												},
											],
											propPath: ["content"],
										},
									],
									component: "card",
								},
								{
									type: "component-block",
									props: {
										width: "initial",
										content: null,
										padding: 1,
										fontSize: "1",
										imageSrc: "",
										colorTheme: "bg_c_accent",
										marginBlock: "var(--space-m)",
										marginInline: "",
										verticleAlign: "start",
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "heading",
													level: 4,
													children: [
														{
															text: "Boost Health ",
														},
													],
												},
												{
													type: "paragraph",
													children: [
														{
															text: "Eating fruit regularly can significantly enhance your overall health. Fruits are packed with essential vitamins, minerals, and antioxidants that help strengthen your immune system, improve digestion, and reduce the risk of chronic diseases.",
														},
													],
												},
											],
											propPath: ["content"],
										},
									],
									component: "card",
								},
							],
						},
						{
							type: "layout-area",
							children: [
								{
									type: "component-block",
									props: {
										width: "initial",
										content: null,
										padding: 1,
										fontSize: "1",
										imageSrc: "",
										colorTheme: "bg_c_secondary",
										marginBlock: "var(--space-m)",
										marginInline: "",
										verticleAlign: "start",
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "heading",
													level: 4,
													children: [
														{
															text: "No Artificial Anything",
														},
													],
												},
												{
													type: "paragraph",
													children: [
														{
															text: "At FruitFusion, we believe in the power of real, whole ingredients. You won't find any artificial flavors, colors, or sweeteners in our smoothies. Just pure, unadulterated goodness.",
														},
													],
												},
											],
											propPath: ["content"],
										},
									],
									component: "card",
								},
								{
									type: "component-block",
									props: {
										width: "initial",
										content: null,
										padding: 1,
										fontSize: "1",
										imageSrc: "",
										colorTheme: "bg_c_reverse_theme",
										marginBlock: "var(--space-m)",
										marginInline: "",
										verticleAlign: "start",
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "heading",
													level: 4,
													children: [
														{
															text: "Enhance Your Energy ",
														},
													],
												},
												{
													type: "paragraph",
													children: [
														{
															text: "Incorporating fruit into your diet can be a fantastic way to boost your energy levels naturally. Fruits are rich in natural sugars,",
														},
													],
												},
											],
											propPath: ["content"],
										},
									],
									component: "card",
								},
							],
						},
						{
							type: "layout-area",
							children: [
								{
									type: "component-block",
									props: {
										width: "initial",
										content: null,
										padding: 1,
										fontSize: "1",
										imageSrc: "",
										colorTheme: "bg_c_tertiary",
										marginBlock: "var(--space-m)",
										marginInline: "",
										verticleAlign: "start",
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "heading",
													level: 4,
													children: [
														{
															text: "Customizable Creations",
														},
													],
												},
												{
													type: "paragraph",
													children: [
														{
															text: "Your taste buds, your rules. We offer a wide range of smoothie options, from classic green blends bursting with vitamins to indulgent, protein-packed treats. Plus, you can customize your smoothie with a variety of add-ins and boosts to suit your unique needs.",
														},
													],
												},
											],
											propPath: ["content"],
										},
									],
									component: "card",
								},
								{
									type: "component-block",
									props: {
										width: "initial",
										content: null,
										padding: 1,
										fontSize: "1",
										imageSrc: "",
										colorTheme: "bg_c_plain",
										marginBlock: "var(--space-m)",
										marginInline: "",
										verticleAlign: "start",
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "heading",
													level: 4,
													children: [
														{
															text: "Support the Heart",
														},
													],
												},
												{
													type: "paragraph",
													children: [
														{
															text: "Eating fruit is a delicious way to support your heart health. Many fruits, such as berries, apples, and citrus fruits, are rich in antioxidants and fiber, which help lower cholesterol levels and reduce the risk of heart disease",
														},
													],
												},
											],
											propPath: ["content"],
										},
									],
									component: "card",
								},
							],
						},
					],
				},
				{
					type: "component-block",
					props: {
						content: null,
						imageSrc: "",
						colorTheme: "bg_c_secondary",
						paddingBlock: "10vh",
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "",
										},
									],
								},
								{
									type: "heading",
									level: 2,
									children: [
										{
											text: "Join the FruitFusion Family",
										},
									],
									textAlign: "center",
								},
								{
									type: "paragraph",
									children: [
										{
											text: "Say ",
										},
										{
											text: "goodbye",
											italic: true,
										},
										{
											text: " to tedious prep and cleanup. With ",
										},
										{
											text: "FruitFusion",
											underline: true,
										},
										{
											text: ", your daily dose of nutrition is as simple as grabbing a bottle and sipping away. We're here to make healthy living ",
										},
										{
											bold: true,
											text: "effortless",
										},
										{
											text: ".",
										},
									],
								},
								{
									type: "paragraph",
									children: [
										{
											text: "Join our family in promoting healthier lifestyles with drinks made from responsibly-sourced ingredients, crafted to balance flavor and nutrition.",
										},
									],
									textAlign: "center",
								},
								{
									type: "paragraph",
									children: [
										{
											text: "Enjoy exclusive access to new flavors, special events, and opportunities to shape our future offerings. Sip, savor, celebrate!",
										},
									],
									textAlign: "end",
								},
							],
							propPath: ["content"],
						},
					],
					component: "section",
				},
				{
					type: "paragraph",
					children: [
						{
							text: "",
						},
					],
					textAlign: "end",
				},
				{
					type: "paragraph",
					children: [
						{
							text: "",
						},
					],
					textAlign: "end",
				},
				{
					type: "layout",
					layout: [2, 1],
					children: [
						{
							type: "layout-area",
							children: [
								{
									type: "component-block",
									props: {
										alt: "",
										color: "lightgray",
										width: "",
										border: 0,
										padding: 1,
										imageSrc:
											"https://media.giphy.com/media/l0IpXwyCXikRK9Yl2/giphy.gif",
									},
									children: [
										{
											type: "component-inline-prop",
											children: [
												{
													text: "",
												},
											],
										},
									],
									component: "image",
								},
							],
						},
						{
							type: "layout-area",
							children: [
								{
									type: "component-block",
									props: {
										width: "initial",
										content: null,
										padding: 1,
										fontSize: "1",
										imageSrc: "",
										colorTheme: "bg_c_transparent",
										marginBlock: "var(--space-m)",
										marginInline: "",
										verticleAlign: "center",
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "paragraph",
													children: [
														{
															text: "What started as a simple idea now blossomed into a full-fledged start-up",
														},
													],
												},
												{
													type: "heading",
													level: 4,
													children: [
														{
															text: "Committed",
														},
													],
												},
												{
													type: "paragraph",
													children: [
														{
															text: "to making wholesome living deliciously convenient.",
														},
													],
												},
												{
													type: "paragraph",
													children: [
														{
															text: "",
														},
														{
															href: "/blog",
															type: "link",
															children: [
																{
																	text: "Find Out More",
																},
															],
														},
														{
															text: "",
														},
													],
												},
											],
											propPath: ["content"],
										},
									],
									component: "card",
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "See What Our Customers Are Saying About Us",
						},
					],
					textAlign: "center",
				},
				{
					type: "layout",
					layout: [1, 2, 1],
					children: [
						{
							type: "layout-area",
							children: [
								{
									type: "component-block",
									props: {
										href: "https://www.realtimecolors.com/?colors=110604-fbf0ee-1b6874-ffffff-1b6874&fonts=Poppins-Poppins",
										content: null,
										attribution: null,
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "paragraph",
													children: [
														{
															text: "Juicy and ripe choices that are mouth watering good",
														},
													],
												},
											],
											propPath: ["content"],
										},
										{
											type: "component-inline-prop",
											children: [
												{
													text: "red",
												},
											],
											propPath: ["attribution"],
										},
									],
									component: "quote",
								},
								{
									type: "component-block",
									props: {
										href: "",
										content: null,
										attribution: null,
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "paragraph",
													children: [
														{
															text: "Great!",
														},
													],
												},
											],
											propPath: ["content"],
										},
										{
											type: "component-inline-prop",
											children: [
												{
													text: "grape",
												},
											],
											propPath: ["attribution"],
										},
									],
									component: "quote",
								},
								{
									type: "component-block",
									props: {
										href: "",
										content: null,
										attribution: null,
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "paragraph",
													children: [
														{
															text: "Tasty",
														},
													],
												},
											],
											propPath: ["content"],
										},
										{
											type: "component-inline-prop",
											children: [
												{
													text: "Nectarine",
												},
											],
											propPath: ["attribution"],
										},
									],
									component: "quote",
								},
							],
						},
						{
							type: "layout-area",
							children: [
								{
									type: "component-block",
									props: {
										href: "",
										content: null,
										attribution: null,
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "paragraph",
													children: [
														{
															text: "that's crazy",
														},
													],
												},
											],
											propPath: ["content"],
										},
										{
											type: "component-inline-prop",
											children: [
												{
													text: "banana",
												},
											],
											propPath: ["attribution"],
										},
									],
									component: "quote",
								},
								{
									type: "component-block",
									props: {
										href: "",
										content: null,
										attribution: null,
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "paragraph",
													children: [
														{
															text: "woh",
														},
													],
												},
											],
											propPath: ["content"],
										},
										{
											type: "component-inline-prop",
											children: [
												{
													text: "strawberry",
												},
											],
											propPath: ["attribution"],
										},
									],
									component: "quote",
								},
								{
									type: "component-block",
									props: {
										href: "",
										content: null,
										attribution: null,
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "paragraph",
													children: [
														{
															text: "They had my color!!!",
														},
													],
												},
											],
											propPath: ["content"],
										},
										{
											type: "component-inline-prop",
											children: [
												{
													text: "green",
												},
											],
											propPath: ["attribution"],
										},
									],
									component: "quote",
								},
							],
						},
						{
							type: "layout-area",
							children: [
								{
									type: "component-block",
									props: {
										href: "",
										content: null,
										attribution: null,
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "paragraph",
													children: [
														{
															text: "how bout them apples",
														},
													],
												},
											],
											propPath: ["content"],
										},
										{
											type: "component-inline-prop",
											children: [
												{
													text: "blue",
												},
											],
											propPath: ["attribution"],
										},
									],
									component: "quote",
								},
								{
									type: "component-block",
									props: {
										href: "",
										content: null,
										attribution: null,
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "paragraph",
													children: [
														{
															text: "yum",
														},
													],
												},
											],
											propPath: ["content"],
										},
										{
											type: "component-inline-prop",
											children: [
												{
													text: "raspberry",
												},
											],
											propPath: ["attribution"],
										},
									],
									component: "quote",
								},
								{
									type: "component-block",
									props: {
										href: "",
										content: null,
										attribution: null,
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "paragraph",
													children: [
														{
															text: "Nutritious",
														},
													],
												},
											],
											propPath: ["content"],
										},
										{
											type: "component-inline-prop",
											children: [
												{
													text: "blueberry",
												},
											],
											propPath: ["attribution"],
										},
									],
									component: "quote",
								},
							],
						},
					],
				},
				{
					type: "layout",
					layout: [1, 1],
					children: [
						{
							type: "layout-area",
							children: [
								{
									type: "component-block",
									props: {
										color: "",
										header: "Contact",
										isDate: true,
										isName: true,
										isNotes: true,
										isPhone: true,
										imageSrc: "",
										buttonLabel: "Submit",
									},
									children: [
										{
											type: "component-inline-prop",
											children: [
												{
													text: "",
												},
											],
										},
									],
									component: "contactform",
								},
							],
						},
						{
							type: "layout-area",
							children: [
								{
									type: "component-block",
									props: {
										alt: "",
										color: "lightgray",
										width: "20rem",
										border: 0,
										padding: 20,
										imageSrc:
											"https://media.giphy.com/media/WWDUeExVrpG9KdfkaK/giphy.gif",
									},
									children: [
										{
											type: "component-inline-prop",
											children: [
												{
													text: "",
												},
											],
										},
									],
									component: "image",
								},
								{
									type: "component-block",
									props: {
										width: "initial",
										content: null,
										padding: 0,
										fontSize: "1",
										imageSrc: "",
										colorTheme: "bg_c_transparent",
										marginBlock: "var(--space-m)",
										marginInline: "",
										verticleAlign: "start",
									},
									children: [
										{
											type: "component-block-prop",
											children: [
												{
													type: "heading",
													level: 2,
													children: [
														{
															text: "Drop A Lime",
														},
													],
												},
												{
													type: "paragraph",
													children: [
														{
															text: "Let us know what our next big and bold flavor should be.",
														},
													],
												},
											],
											propPath: ["content"],
										},
									],
									component: "card",
								},
							],
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "",
						},
					],
				},
			],
		},
	},
	{
		title: "Terms and Privacy",
		slug: "terms-and-privacy",
		dateCreated: "2024-08-05T03:08:43.584Z",
		dateModified: "2024-11-12T23:49:38.058Z",
		status: "PUBLIC",
		template: "WITH_TABLEOFCONTENTS",
		pinned: 0,
		excerpt: "",
		featured_image: "",
		featured_video: "",
		content: {
			document: [
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Terms and Conditions",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Agreement between User and cutefruit.tawtaw.site",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: 'Welcome to cutefruit.tawtaw.site. The cutefruit.tawtaw.site website (the "Site") is comprised of various web pages operated by Cute Fruit LLC. ("Cute Fruit"). cutefruit.tawtaw.site is offered to you conditioned on your acceptance without modification of the terms, conditions, and notices contained herein (the "Terms"). Your use of cutefruit.tawtaw.site constitutes your agreement to all such Terms. Please read these terms carefully, and keep a copy of them for your reference.',
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "cutefruit.tawtaw.site is an E-Commerce Site.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "We provide DJ/MC, lighting and photo booth services for weddings and events. We also rent out sound and lighting/FX equipment for events that do not need a DJ or host.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Electronic Communications",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Visiting cutefruit.tawtaw.site or sending emails to Cute Fruit constitutes electronic communications. You consent to receive electronic communications and you agree that all agreements, notices, disclosures and other communications that we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communications be in writing.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Your Account",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "If you use this site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password. You may not assign or otherwise transfer your account to any other person or entity. You acknowledge that Cute Fruit is not responsible for third party access to your account that results from theft or misappropriation of your account. Cute Fruit and its associates reserve the right to refuse or cancel service, terminate accounts, or remove or edit content in our sole discretion.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Children Under Thirteen",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Cute Fruit does not knowingly collect, either online or offline, personal information from persons under the age of thirteen. If you are under 18, you may use cutefruit.tawtaw.site only with permission of a parent or guardian.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Cancellation/Rescheduling/Refund Policy",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "For all services, a contract will be required to be signed by you and Cute Fruit. Therein will be terms specific to your event that will supersede any statement in this document. That said, below is a general guideline of our refund, rescheduling and cancellation policies. For DJ, lighting, and/or photo booth contracts/agreements, your deposit is non-refundable under any circumstance and is due 30 days after finalizing the contract between you and Cute Fruit. Your final balance is due 8 -16 weeks before your wedding or event date, depending on your contract's terms. You may cancel, at the cost of the deposit, before your final payment due date. Cancellations made after final payment due date will not receive a refund of either the deposit or the final payment and will be charged the full amount owed. We offer rescheduling options for weddings and events that need to change dates, even if dates have to change more than once, and even if the type of event changes. This is subject to availability and will be pursuant, above all else, to the terms in the contract signed by the User and Cute Fruit during the booking process. For equipment rental, deposit is non-refundable under any circumstance and is due at the time of finalizing the contract between you and Cute Fruit. Final balance is due 14 days before drop off date and will not be refunded if contract is cancelled after this time. Rescheduling is subject to availability.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Links to Third Party Sites/Third Party Services",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: 'cutefruit.tawtaw.site may contain links to other websites ("Linked Sites"). The Linked Sites are not under the control of Cute Fruit and Cute Fruit is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site. Cute Fruit is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by Cute Fruit of the site or any association with its operators.',
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: " ",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Certain services made available via cutefruit.tawtaw.site are delivered by third party sites and organizations. By using any product, service or functionality originating from the cutefruit.tawtaw.site domain, you hereby acknowledge and consent that Cute Fruit may share such information and data with any third party with whom Cute Fruit has a contractual relationship to provide the requested product, service or functionality on behalf of cutefruit.tawtaw.site users and customers.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "No Unlawful or Prohibited Use/Intellectual Property",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "You are granted a non-exclusive, non-transferable, revocable license to access and use cutefruit.tawtaw.site strictly in accordance with these terms of use. As a condition of your use of the Site, you warrant to Cute Fruit that you will not use the Site for any purpose that is unlawful or prohibited by these Terms. You may not use the Site in any manner which could damage, disable, overburden, or impair the Site or interfere with any other party's use and enjoyment of the Site. You may not obtain or attempt to obtain any materials or information through any means not intentionally made available or provided for through the Site. ",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "All content included as part of the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Site, is the property of Cute Fruit or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights. You agree to observe and abide by all copyright and other proprietary notices, legends or other restrictions contained in any such content and will not make any changes thereto.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: " You will not modify, publish, transmit, reverse engineer, participate in the transfer or sale, create derivative works, or in any way exploit any of the content, in whole or in part, found on the Site. Cute Fruit content is not for resale. Your use of the Site does not entitle you to make any unauthorized use of any protected content, and in particular you will not delete or alter any proprietary rights or attribution notices in any content. You will use protected content solely for your personal use, and will make no other use of the content without the express written permission of Cute Fruit and the copyright owner. You agree that you do not acquire any ownership rights in any protected content. We do not grant you any licenses, express or implied, to the intellectual property of Cute Fruit or our licensors except as expressly authorized by these Terms.",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Privacy",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Your use of ",
						},
						{
							bold: true,
							text: "cutefruit.tawtaw.site",
						},
						{
							text: " is subject to Cute Fruit's Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Third Party Accounts",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "You will be able to connect your Cute Fruit account to third party accounts. By connecting your Cute Fruit account to your third party account, you acknowledge and agree that you are consenting to the continuous release of information about you to others (in accordance with your privacy settings on those third party sites). If you do not want information about you to be shared in this manner, do not use this feature.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: " ",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "International Users",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "The Service is controlled, operated and administered by Cute Fruit from our offices within the USA. If you access the Service from a location outside the USA, you are responsible for compliance with all local laws. You agree that you will not use the Cute Fruit Content accessed through cutefruit.tawtaw.site in any country or in any manner prohibited by any applicable laws, restrictions or regulations. ",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Indemnification",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "You agree to indemnify, defend and hold harmless Cute Fruit, its officers, directors, employees, agents and third parties, for any losses, costs, liabilities and expenses (including reasonable attorney's fees) relating to or arising out of your use of or inability to use the Site or services, any user postings made by you, your violation of any terms of this Agreement or your violation of any rights of a third party, or your violation of any applicable laws, rules or regulations. Cute Fruit reserves the right, at its own cost, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will fully cooperate with Cute Fruit in asserting any available defenses.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Arbitration",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "In the event the parties are not able to resolve any dispute between them arising out of or concerning these Terms and Conditions, or any provisions hereof, whether in contract, tort, or otherwise at law or in equity for damages or any other relief, then such dispute shall be resolved only by final and binding arbitration pursuant to the Federal Arbitration Act, conducted by a single neutral arbitrator and administered by the American Arbitration Association, or a similar arbitration service selected by the parties, in a location mutually agreed upon by the parties. The arbitrator's award shall be final, and judgment may be entered upon it in any court having jurisdiction. In the event that any legal or equitable action, proceeding or arbitration arises out of or concerns these Terms and Conditions, the prevailing party shall be entitled to recover its costs and reasonable attorney's fees. The parties agree to arbitrate all disputes and claims in regards to these Terms and Conditions or any disputes arising as a result of these Terms and Conditions, whether directly or indirectly, including Tort claims that are a result of these Terms and Conditions. The parties agree that the Federal Arbitration Act governs the interpretation and enforcement of this provision. The entire dispute, including the scope and enforceability of this arbitration provision shall be determined by the Arbitrator. This arbitration provision shall survive the termination of these Terms and Conditions. ",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Class Action Waiver",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Any arbitration under these Terms and Conditions will take place on an individual basis; class arbitrations and class/representative/collective actions are not permitted. THE PARTIES AGREE THAT A PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN EACH'S INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PUTATIVE CLASS, COLLECTIVE AND/ OR REPRESENTATIVE PROCEEDING, SUCH AS IN THE FORM OF A PRIVATE ATTORNEY GENERAL ACTION AGAINST THE OTHER. Further, unless both you and Cute Fruit agree otherwise, the arbitrator may not consolidate more than one person's claims, and may not otherwise preside over any form of a representative or class proceeding. ",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Liability Disclaimer",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN. Cute Fruit LLC. AND/OR ITS SUPPLIERS MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THE SITE AT ANY TIME.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: " ",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: 'Cute Fruit LLC. AND/OR ITS SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY OF THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS CONTAINED ON THE SITE FOR ANY PURPOSE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE PROVIDED "AS IS" WITHOUT WARRANTY OR CONDITION OF ANY KIND. Cute Fruit LLC. AND/OR ITS SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT.',
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: " ",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL Cute Fruit LLC. AND/OR ITS SUPPLIERS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OR PERFORMANCE OF THE SITE, WITH THE DELAY OR INABILITY TO USE THE SITE OR RELATED SERVICES, THE PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS OBTAINED THROUGH THE SITE, OR OTHERWISE ARISING OUT OF THE USE OF THE SITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF Cute Fruit LLC. OR ANY OF ITS SUPPLIERS HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES. BECAUSE SOME STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SITE, OR WITH ANY OF THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: " ",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Termination/Access Restriction",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Cute Fruit reserves the right, in its sole discretion, to terminate your access to the Site and the related services or any portion thereof at any time, without notice. To the maximum extent permitted by law, this agreement is governed by the laws of the State of Illinois and you hereby consent to the exclusive jurisdiction and venue of courts in Illinois in all disputes arising out of or relating to the use of the Site. Use of the Site is unauthorized in any jurisdiction that does not give effect to all provisions of these Terms, including, without limitation, this section.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: " ",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "You agree that no joint venture, partnership, employment, or agency relationship exists between you and Cute Fruit as a result of this agreement or use of the Site. Cute Fruit's performance of this agreement is subject to existing laws and legal process, and nothing contained in this agreement is in derogation of Cute Fruit's right to comply with governmental, court and law enforcement requests or requirements relating to your use of the Site or information provided to or gathered by Cute Fruit with respect to such use. If any part of this agreement is determined to be invalid or unenforceable pursuant to applicable law including, but not limited to, the warranty disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision and the remainder of the agreement shall continue in effect.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: " ",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Unless otherwise specified herein, this agreement constitutes the entire agreement between the user and Cute Fruit with respect to the Site and it supersedes all prior or contemporaneous communications and proposals, whether electronic, oral or written, between the user and Cute Fruit with respect to the Site. A printed version of this agreement and of any notice given in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to this agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form. It is the express wish to the parties that this agreement and all related documents be written in English.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: " ",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Changes to Terms",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Cute Fruit reserves the right, in its sole discretion, to change the Terms under which ",
						},
						{
							bold: true,
							text: "cutefruit.tawtaw.site",
						},
						{
							text: " is offered. The most current version of the Terms will supersede all previous versions. Cute Fruit encourages you to periodically review the Terms to stay informed of our updates.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Effective as of September 14, 2017",
						},
					],
				},
			],
			author: {
				connect: {
					email: "admin@tawtaw.site",
				},
			},
			// "privateAccess": []
		},
	},
]

export const posts_seedjson: SeedPost[] = [
	{
		title: "The Health Benefits of Berries",
		slug: "health-benefits-berries",
		dateCreated: "2023-05-01T10:00:00.000Z",
		dateModified: "2024-12-16T21:49:48.819Z",
		status: "PUBLIC",
		template: "FULLWIDTH",
		pinned: 5,
		excerpt:
			"Learn about the amazing health benefits of various types of berries, including blueberries, strawberries, and raspberries.",
		featured_image:
			"https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118263/cutefruit/banners/cf-banner-13_ywbvao.png",
		featured_video: "",
		content: {
			document: [
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Top Health Benefits of Berries",
						},
					],
				},
				{
					type: "ordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Rich in Antioxidants",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Berries are loaded with antioxidants, particularly anthocyanins, which help protect cells from damage caused by free radicals.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "These antioxidants support your immune system and may help reduce the risk of chronic diseases.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Boost Heart Health",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: 'Studies show that regular consumption of berries can help lower blood pressure and reduce "bad" LDL cholesterol levels.',
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Berries, especially strawberries and blueberries, can also improve vascular health and decrease inflammation.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Support Healthy Digestion",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Berries are an excellent source of dietary fiber, which promotes healthy digestion and helps maintain regular bowel movements.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Fiber also helps to regulate blood sugar levels and supports a healthy weight.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Enhance Skin Health",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Vitamin C-rich berries, like strawberries and blackberries, can support collagen production, which is essential for skin elasticity and healing.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Antioxidants in berries also help protect the skin from aging caused by sun exposure and environmental toxins.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Improve Brain Function",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Regular berry consumption has been linked to better cognitive function, including improved memory and focus.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "The flavonoids in berries have neuroprotective effects that may help slow down age-related cognitive decline.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Conclusion: A Simple Superfood",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Berries are not only delicious, but they also offer a wide range of health benefits. Whether you eat them fresh, frozen, or blended, adding berries to your daily diet is an easy way to support your health.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "",
						},
					],
				},
			],
		},
		tags: [
			{
				name: "red",
			},
			{
				name: "leaf",
			},
			{
				name: "yellow",
			},
		],
		categories: [
			{
				name: "berries",
			},
		],
		author: {
			email: "admin@tawtaw.site",
		},
	},
	{
		title: "Fruit Smoothies: A Healthy and Delicious Option",
		slug: "fruit-smoothies-healthy-delicious",
		dateCreated: "2023-07-10T16:45:00.000Z",
		dateModified: "2024-12-16T21:48:11.367Z",
		status: "PUBLIC",
		template: "WITHSIDEBAR",
		pinned: 0,
		excerpt:
			"Find out how to make nutritious and tasty fruit smoothies using a variety of fruits, such as bananas, strawberries, and kiwis.",
		featured_image:
			"https://cdn.pixabay.com/photo/2022/07/02/11/30/blender-7297149_1280.png",
		featured_video: "",
		content: {
			document: [
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "The Perfect Smoothie",
						},
					],
				},
				{
					type: "ordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Base Fruits",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Bananas: Add creaminess and sweetness.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Berries: Boost antioxidants and vibrant flavors.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Mango or Pineapple: For a tropical twist.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Liquid Choices",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Water: A calorie-free option.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Milk or Plant-Based Milk: Adds creaminess.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Juice: Enhances sweetness and fruity flavor.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Add-Ins for Extra Nutrition",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Spinach or Kale: Sneak in some greens.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Chia or Flaxseeds: Add fiber and omega-3s.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Protein Powder or Yogurt: Make it more filling.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Optional Sweeteners",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Honey, agave, or dates for an extra touch of sweetness if needed.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
				{
					type: "component-block",
					props: {
						href: "https://www.youtube.com/watch?v=9pvjDY5w9SY",
						content: null,
						attribution: null,
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "Blend it brown, suck it down.",
										},
									],
								},
							],
							propPath: ["content"],
						},
						{
							type: "component-inline-prop",
							children: [
								{
									text: "Internet Shaquille",
								},
							],
							propPath: ["attribution"],
						},
					],
					component: "quote",
				},
				{
					type: "component-block",
					props: {
						url: "https://www.youtube.com/watch?v=9pvjDY5w9SY",
						altText: "Embedded YouTube video about smoothies",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "youtubeVideo",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Your Smoothie Adventure Awaits",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Fruit smoothies are more than just a healthy option—they’re a fun and delicious way to get creative in the kitchen. Try experimenting with different combinations, and you’ll never run out of flavorful ideas.",
						},
					],
				},
			],
		},
		tags: [
			{
				name: "leaf",
			},
			{
				name: "yellow",
			},
		],
		categories: [
			{
				name: "drupes",
			},
			{
				name: "pomes",
			},
			{
				name: "melons",
			},
			{
				name: "tropical",
			},
		],
		author: {
			email: "admin@tawtaw.site",
		},
	},
	{
		title: "Block Test",
		slug: "block-test",
		dateCreated: "2024-11-06T06:00:00.000Z",
		dateModified: "2024-12-16T21:46:47.303Z",
		status: "PRIVATE",
		template: "WITHSIDEBAR",
		pinned: 0,
		excerpt:
			"Testing custom block components that users can write into their rich text editor",
		featured_image: "",
		featured_video: "",
		content: {
			document: [
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Block List",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "The paragraph block is the most basic text based block. the most simple yet effect way to convey a message",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Block List",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Here is a list of blocks denoted by their header",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Block Quote ",
						},
					],
				},
				{
					type: "blockquote",
					children: [
						{
							type: "paragraph",
							children: [
								{
									text: 'Block quote. "I can say anything here" - myself',
								},
							],
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "List",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "a ",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "bullet ",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "list",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "is ",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "fun",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "ordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "orderd",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "lists",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "have ",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "numbers",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Button",
						},
					],
				},
				{
					type: "component-block",
					props: {
						link: "/blog/block-test",
						color: "var(--c-accent)",
						label: "Button: Click Me",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "buttonlink",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Callout",
						},
					],
				},
				{
					type: "component-block",
					props: {
						intent: "info",
						content: null,
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											bold: true,
											text: "Callout",
										},
									],
								},
								{
									type: "paragraph",
									children: [
										{
											text: "Important text + icon that can contain editable rich text inside",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "callout",
				},
				{
					type: "component-block",
					props: {
						intent: "warning",
						content: null,
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "Callouts can have different icons and colors",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "callout",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Card",
						},
					],
				},
				{
					type: "component-block",
					props: {
						width: "initial",
						content: null,
						padding: 1,
						fontSize: "1",
						imageSrc: "",
						colorTheme: "bg_c_primary",
						marginBlock: "var(--space-m)",
						marginInline: "",
						verticleAlign: "start",
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											bold: true,
											text: "Card",
										},
										{
											text: " that I can put content inside of. Super fun and cool",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "card",
				},
				{
					type: "component-block",
					props: {
						width: "initial",
						content: null,
						padding: 1,
						fontSize: "1",
						imageSrc: "",
						colorTheme: "bg_c_plain",
						marginBlock: "var(--space-m)",
						marginInline: "",
						verticleAlign: "start",
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "Plain card theme",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "card",
				},
				{
					type: "component-block",
					props: {
						width: "initial",
						content: null,
						padding: 1,
						fontSize: "1",
						imageSrc: "",
						colorTheme: "bg_c_secondary",
						marginBlock: "var(--space-m)",
						marginInline: "",
						verticleAlign: "start",
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											bold: true,
											text: "Secondary ",
										},
										{
											text: "color theme",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "card",
				},
				{
					type: "component-block",
					props: {
						width: "initial",
						content: null,
						padding: 1,
						fontSize: "1",
						imageSrc: "",
						colorTheme: "bg_c_tertiary",
						marginBlock: "var(--space-m)",
						marginInline: "",
						verticleAlign: "start",
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											bold: true,
											text: "Tertiary ",
										},
										{
											text: "color theme",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "card",
				},
				{
					type: "component-block",
					props: {
						width: "initial",
						content: null,
						padding: 1,
						fontSize: "1",
						imageSrc: "",
						colorTheme: "bg_c_accent",
						marginBlock: "var(--space-m)",
						marginInline: "",
						verticleAlign: "start",
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											bold: true,
											text: "Accent: ",
										},
										{
											text: "color theme",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "card",
				},
				{
					type: "component-block",
					props: {
						width: "initial",
						content: null,
						padding: 1,
						fontSize: "1",
						imageSrc: "",
						colorTheme: "bg_c_transparent",
						marginBlock: "var(--space-m)",
						marginInline: "",
						verticleAlign: "start",
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "Transparent color theme",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "card",
				},
				{
					type: "component-block",
					props: {
						width: "initial",
						content: null,
						padding: 1,
						fontSize: "1",
						imageSrc: "",
						colorTheme: "bg_c_reverse_theme",
						marginBlock: "var(--space-m)",
						marginInline: "",
						verticleAlign: "start",
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "Inverted Color theme",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "card",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Carousel",
						},
					],
				},
				{
					type: "component-block",
					props: {
						items: [
							{
								title: "Orange",
								imageSrc:
									"https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDZ3Nnl0dWR5bWVlazNmYXV2bm50cnRqeHo1Znh1dmd3c242MnpsaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4FGEbli278gPBPYA/giphy.gif",
							},
							{
								title: "Basket",
								imageSrc:
									"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGdmNjJ4MWgwbmRzb2RvdXZ4NHFsazA2Z2ZwdHIyMTR4MzhkYzZkMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lcv7NCKzJJ2XC/giphy.gif",
							},
							{
								title: "Raspberry",
								imageSrc:
									"https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHZxdmxtandnZTExYjBtanZpaTlhd2lxeTh3amg3eGRuMmh6Z2JyeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPd5iphX59nQTjq/giphy.gif",
							},
						],
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "carousel",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Codeblock",
						},
					],
				},
				{
					type: "code",
					children: [
						{
							text: ".carouselItem {\n  scroll-snap-align: center;\n  scroll-snap-stop: always;\n  padding: 8px;\n  box-sizing: border-box;\n  border-radius: 6px;\n  background: var(--c-txt-bg);\n  margin: 0;\n}",
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Contact Form",
						},
					],
				},
				{
					type: "component-block",
					props: {
						color: "green",
						header: "Reusable Contact Form",
						isDate: true,
						isName: true,
						isNotes: true,
						isPhone: true,
						imageSrc: "",
						buttonLabel: "Submit",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "contactform",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Gallery",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							bold: true,
							text: "Grid layout",
						},
						{
							text: ". Cropping images to match framing with ",
						},
						{
							code: true,
							text: "cover",
						},
					],
				},
				{
					type: "component-block",
					props: {
						gap: 3,
						items: [
							{
								alt: "",
								src: "https://media.giphy.com/media/Iu0WVXXIMTOD1HtzIP/giphy.gif?cid=790b7611cftg0mfmzxy0jsh42bbpoij7fk7vqgao4uoamsfg&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								caption: "",
							},
							{
								alt: "",
								src: "https://media.giphy.com/media/29s9fNQFkfLfXmGk7U/giphy.gif?cid=790b7611g4yqad5hb2dedetq1hon4njumki26hddy0h1n8li&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								caption: "",
							},
							{
								alt: "",
								src: "https://media.giphy.com/media/3o72F4nTnhd0fxsVhK/giphy.gif?cid=790b7611cftg0mfmzxy0jsh42bbpoij7fk7vqgao4uoamsfg&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								caption: "",
							},
							{
								alt: "",
								src: "https://media.giphy.com/media/12g8vXmxMuA3wnIdjI/giphy.gif?cid=790b7611g4yqad5hb2dedetq1hon4njumki26hddy0h1n8li&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								caption: "",
							},
							{
								alt: "",
								src: "https://media.giphy.com/media/LkL4dGbQId8ezdHEoX/giphy.gif?cid=790b7611cftg0mfmzxy0jsh42bbpoij7fk7vqgao4uoamsfg&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								caption: "",
							},
							{
								alt: "",
								src: "https://media.giphy.com/media/j5i2tzUmDA2OFeMJVL/giphy.gif?cid=ecf05e47xt1ttz5e5gl49jzu10rhe9tunoiucp6lxzrne5fu&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								caption: "",
							},
						],
						layout: "grid",
						columns: 3,
						objectFit: "cover",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "imagegallery",
				},
				{
					type: "paragraph",
					children: [
						{
							text: "or ",
						},
						{
							bold: true,
							text: "Masonry layout",
						},
						{
							text: ". Images may look uneven because they are not cropped but instead using ",
						},
						{
							code: true,
							text: "contain",
						},
						{
							text: " property",
						},
					],
				},
				{
					type: "component-block",
					props: {
						gap: 3,
						items: [
							{
								alt: "",
								src: "https://media.giphy.com/media/5xtDarztN4Auy4RtLws/giphy.gif?cid=790b7611cftg0mfmzxy0jsh42bbpoij7fk7vqgao4uoamsfg&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								caption: "",
							},
							{
								alt: "",
								src: "https://media.giphy.com/media/29s9fNQFkfLfXmGk7U/giphy.gif?cid=790b7611g4yqad5hb2dedetq1hon4njumki26hddy0h1n8li&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								caption: "",
							},
							{
								alt: "",
								src: "https://media.giphy.com/media/cJtzdZtXStihTq8rQe/giphy.gif?cid=790b7611g4yqad5hb2dedetq1hon4njumki26hddy0h1n8li&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								caption: "",
							},
							{
								alt: "",
								src: "https://media.giphy.com/media/3o72F4nTnhd0fxsVhK/giphy.gif?cid=790b7611cftg0mfmzxy0jsh42bbpoij7fk7vqgao4uoamsfg&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								caption: "",
							},
							{
								alt: "",
								src: "https://media.giphy.com/media/TlK63EwPt59cg4UrUsM/giphy.gif?cid=ecf05e47f1zsle4qrm8phcm5p9ge1obr1nn8dry0ac81leg5&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								caption: "",
							},
							{
								alt: "",
								src: "https://media.giphy.com/media/j5i2tzUmDA2OFeMJVL/giphy.gif?cid=ecf05e47xt1ttz5e5gl49jzu10rhe9tunoiucp6lxzrne5fu&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								caption: "",
							},
						],
						layout: "masonry",
						columns: 2,
						objectFit: "contain",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "imagegallery",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Hero",
						},
					],
				},
				{
					type: "component-block",
					props: {
						color: "white",
						caption: {
							value: null,
							discriminant: true,
						},
						imageSrc:
							"https://media.giphy.com/media/LkL4dGbQId8ezdHEoX/giphy.gif?cid=ecf05e4794pkvkurocd23t49e541340v5ljefr9ow0k813nw&ep=v1_gifs_search&rid=giphy.gif&ct=g",
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "Sunset Orange Dream",
										},
									],
								},
							],
							propPath: ["caption", "value"],
						},
					],
					component: "hero",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "IFrame Embed",
						},
					],
				},
				{
					type: "component-block",
					props: {
						src: "https://www.williamusic.com/",
						color: "transparent",
						height: "800px",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "iframe",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Image",
						},
					],
				},
				{
					type: "component-block",
					props: {
						alt: "3 strawberries",
						color: "lightgray",
						width: "",
						border: 0,
						padding: 0,
						imageSrc:
							"https://media.giphy.com/media/TTtcRVnXxriHyjzXG4/giphy.gif?cid=ecf05e478bsk2zcet6p4jk8igdbbmpf3x0fwlro437ekobkc&ep=v1_gifs_search&rid=giphy.gif&ct=g",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "image",
				},
				{
					type: "component-block",
					props: {
						alt: "",
						color: "lightgray",
						width: "",
						border: 0,
						padding: 0,
						imageSrc:
							"https://media.giphy.com/media/Kds38Lhus8D3YxkIAz/giphy.gif?cid=ecf05e4762c79gufeumgz4ikoj3byy7xh0yf7w0eno5m7240&ep=v1_gifs_search&rid=giphy.gif&ct=g",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "image",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Image Link List",
						},
					],
				},
				{
					type: "component-block",
					props: {
						items: [
							{
								color: "paleblue",
								header: "Lemon",
								content: null,
								imageSrc:
									"https://media.giphy.com/media/xT0GqjBCkO9BEiSEOk/giphy.gif?cid=ecf05e4762c79gufeumgz4ikoj3byy7xh0yf7w0eno5m7240&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								imageSize: "250px",
								buttonLink: "/block-test",
								buttonLabel: "",
							},
							{
								color: "paleblue",
								header: "Grapes",
								content: null,
								imageSrc:
									"https://media.giphy.com/media/XwZ6aHOx2wwjgPdPkT/giphy.gif?cid=ecf05e47yrw41nionsr9v73xfr1n5k771ehy2lgeyd76glyo&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								imageSize: "250px",
								buttonLink: "/block-test",
								buttonLabel: "",
							},
							{
								color: "paleblue",
								header: "Watermelon",
								content: null,
								imageSrc:
									"https://media.giphy.com/media/l56r3x5ZRZ2T7fs4tu/giphy.gif?cid=ecf05e47zyy0w7ippnq36hkou8p81p1zwh2vsp36gk3wjpzt&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								imageSize: "250px",
								buttonLink: "/block-test",
								buttonLabel: "",
							},
						],
						isLink: true,
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "Lemons are sour!",
										},
									],
								},
							],
							propPath: ["items", 0, "content"],
						},
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "",
										},
									],
								},
							],
							propPath: ["items", 1, "content"],
						},
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "",
										},
									],
								},
							],
							propPath: ["items", 2, "content"],
						},
					],
					component: "imagelinklist",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Info Card",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Putting this card on the back burner. I'd reach for ",
						},
						{
							bold: true,
							text: "Card",
						},
						{
							text: " or ",
						},
						{
							bold: true,
							text: "Section",
						},
						{
							text: " instead",
						},
					],
				},
				{
					type: "component-block",
					props: {
						color: "Gainsboro",
						width: "initial",
						header: "Head of the Info",
						content: null,
						padding: 1,
						fontSize: "1",
						imageSrc: "",
						buttonLink: "/blog/block-test",
						buttonText: "",
						verticleAlign: "start",
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "An info card for info needs",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "infocard",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Info Card List",
						},
					],
				},
				{
					type: "component-block",
					props: {
						items: [
							{
								color: "paleblue",
								header: "Oranges",
								content: null,
								imageSrc:
									"https://media.giphy.com/media/buaZzuG1gxjErgc9sD/giphy.gif?cid=ecf05e47hxctk5c91tjp47v2axnfdls8z1oflfx21hofnh05&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								buttonLink: "https://giphy.com/search/oranges",
								buttonLabel: "",
							},
							{
								color: "paleblue",
								header: "Apple Worm",
								content: null,
								imageSrc:
									"https://media.giphy.com/media/na57DU1C5cqs7SsRxP/giphy.gif?cid=ecf05e47ypr9letu7tqvjj7z8ozy7zrw3ug133c8njx4lz5q&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								buttonLink: "",
								buttonLabel: "",
							},
							{
								color: "paleblue",
								header: "Pinapple Cat",
								content: null,
								imageSrc:
									"https://media.giphy.com/media/s6PGeVYNWs6pEs4EQj/giphy.gif?cid=ecf05e47ypr9letu7tqvjj7z8ozy7zrw3ug133c8njx4lz5q&ep=v1_gifs_search&rid=giphy.gif&ct=g",
								buttonLink: "",
								buttonLabel: "",
							},
						],
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "This card links us to a different page",
										},
									],
								},
							],
							propPath: ["items", 0, "content"],
						},
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "It's on the inside what counts",
										},
									],
								},
							],
							propPath: ["items", 1, "content"],
						},
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "",
										},
									],
								},
							],
							propPath: ["items", 2, "content"],
						},
					],
					component: "infocardlist",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Local Video",
						},
					],
				},
				{
					type: "component-block",
					props: {
						url: "https://assets.tawtaw.site/pvo/2023--PVO_MIX--DJ_William--Millennial_Throwbacks%20snippit%20v2.webm",
						altText: "DJ Mix clip",
						autoPlay: false,
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "videoLocal",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Media & Text",
						},
					],
				},
				{
					type: "component-block",
					props: {
						content: null,
						imageAlt: "glitter strawberry",
						imageSrc:
							"https://media.giphy.com/media/fD4x1OC7pHnlPdnltm/giphy.gif?cid=ecf05e47mvh9ru91x3hgdxrn9es23iuqy538jwzqdo2vnafo&ep=v1_gifs_search&rid=giphy.gif&ct=g",
						rowReverse: false,
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "heading",
									level: 5,
									children: [
										{
											text: "Side text",
										},
									],
								},
								{
									type: "paragraph",
									children: [
										{
											text: "can help describe a bit more info with a fun graphic",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "mediatext",
				},
				{
					type: "paragraph",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "component-block",
					props: {
						content: null,
						imageAlt: "Same photo",
						imageSrc:
							"https://media.giphy.com/media/fD4x1OC7pHnlPdnltm/giphy.gif?cid=ecf05e47mvh9ru91x3hgdxrn9es23iuqy538jwzqdo2vnafo&ep=v1_gifs_search&rid=giphy.gif&ct=g",
						rowReverse: true,
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "Now I should be on the Right side",
										},
									],
								},
								{
									type: "paragraph",
									children: [
										{
											text: "You can reverse order of text and media without affecting the markdown",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "mediatext",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Posts List",
						},
					],
				},
				{
					type: "component-block",
					props: {
						color: "gray",
						header: "Posts!!!",
						imageSrc:
							"https://cdn.pixabay.com/photo/2022/07/10/20/15/raspberries-7313700_1280.jpg",
						categories: [],
						colorOverlay: "rgba(56, 56, 56, 0.63)",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "postslist",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Quote",
						},
					],
				},
				{
					type: "component-block",
					props: {
						href: "",
						content: null,
						attribution: null,
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "Don't quote me on this",
										},
									],
								},
							],
							propPath: ["content"],
						},
						{
							type: "component-inline-prop",
							children: [
								{
									text: "Myself",
								},
							],
							propPath: ["attribution"],
						},
					],
					component: "quote",
				},
				{
					type: "component-block",
					props: {
						href: "/home",
						content: null,
						attribution: null,
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											text: "You can even link a quote and have it open in a new tab",
										},
									],
								},
							],
							propPath: ["content"],
						},
						{
							type: "component-inline-prop",
							children: [
								{
									text: "Myself",
								},
							],
							propPath: ["attribution"],
						},
					],
					component: "quote",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Section Background",
						},
					],
				},
				{
					type: "component-block",
					props: {
						content: null,
						imageSrc: "",
						colorTheme: "bg_c_plain",
						paddingBlock: "15vh",
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "heading",
									level: 4,
									children: [
										{
											text: "A section that has title",
										},
									],
								},
								{
									type: "paragraph",
									children: [
										{
											text: "But can also set a solid color for the background",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "section",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Social Link Nav",
						},
					],
				},
				{
					type: "component-block",
					props: {
						color: "gray",
						github: "https://www.github.com",
						twitch: "",
						custom1: "https://www.custom1.com",
						twitter: "",
						youtube: "",
						bandcamp: "https://www.bandcamp.com",
						facebook: "https://www.facebook.com",
						linkedin: "",
						instagram: "https://www.instagram.com",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "sociallinknav",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Table",
						},
					],
				},
				{
					type: "component-block",
					props: {
						rows: [
							{
								cells: [
									{
										text: "Calories",
									},
									{
										text: "61 kcal ",
									},
									{
										text: "-",
									},
								],
							},
							{
								cells: [
									{
										text: "Carbohydrates",
									},
									{
										text: "14.7 g",
									},
									{
										text: "-",
									},
								],
							},
							{
								cells: [
									{
										text: "Fiber",
									},
									{
										text: "3.0 g   ",
									},
									{
										text: "12%",
									},
								],
							},
						],
						caption: "Kiwi Nutrition",
						headers: [
							{
								text: "Nutrient",
							},
							{
								text: "Amount",
							},
							{
								text: "Daily Value % ",
							},
						],
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "table",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Youtube Video",
						},
					],
				},
				{
					type: "component-block",
					props: {
						url: "https://www.youtube.com/watch?v=fPWRlmedCbo",
						altText: "Embedded YouTube video",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "youtubeVideo",
				},
				{
					type: "paragraph",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "",
						},
					],
				},
			],
		},
		tags: [],
		categories: [],
		author: {
			email: "admin@tawtaw.site",
		},
	},
	{
		title: "The Many Uses of Pomegranates",
		slug: "uses-pomegranates",
		dateCreated: "2023-10-15T10:00:00.000Z",
		dateModified: "2024-12-16T21:50:17.838Z",
		status: "PUBLIC",
		template: "WITHSIDEBAR",
		pinned: 0,
		excerpt:
			"Discover the many culinary and medicinal uses of pomegranates, including how to juice them and use their seeds in recipes.",
		featured_image:
			"https://cdn.pixabay.com/photo/2023/09/20/12/12/ai-generated-8264735_960_720.png",
		featured_video: "",
		content: {
			document: [
				{
					type: "paragraph",
					children: [
						{
							text: "Pomegranates aren't just a fall treat; they're versatile, health-boosting, and add vibrancy to food, skincare, and even home decor. Let's explore a few ways to enjoy this jewel-toned fruit.",
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Culinary Uses",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							bold: true,
							text: "Juices and Smoothies",
						},
						{
							text: "\nA refreshing antioxidant boost, pomegranate juice is perfect on its own, in smoothies, or cocktails.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							bold: true,
							text: "Salads and Garnishes",
						},
						{
							text: "\nSprinkle pomegranate seeds over salads for a hint of sweetness, crunch, and color. They pair beautifully with greens, nuts, and cheese—try a mix with kale and feta.",
						},
					],
				},
				{
					type: "component-block",
					props: {
						intent: "error",
						content: null,
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											bold: true,
											text: "Cooking with Pomegranate Molasses",
										},
									],
								},
								{
									type: "paragraph",
									children: [
										{
											text: "Tangy and thick, pomegranate molasses is perfect for marinades and glazes, adding depth to dishes like roasted veggies, chicken, or lamb.",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "callout",
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Health and Wellness Benefits",
						},
					],
				},
				{
					type: "component-block",
					props: {
						alt: "",
						color: "lightgray",
						width: "",
						border: 0,
						padding: 1,
						imageSrc:
							"https://media.giphy.com/media/3osBLwx8M3B8e4cyk0/giphy.gif?cid=790b761105bfik4fopoesc8cjtyjb9icdpkva3x8xe27jyzi&ep=v1_gifs_search&rid=giphy.gif&ct=g",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "image",
				},
				{
					type: "layout",
					layout: [1, 1],
					children: [
						{
							type: "layout-area",
							children: [
								{
									type: "paragraph",
									children: [
										{
											bold: true,
											text: "Packed with Antioxidants",
										},
										{
											text: "\nPomegranates are high in vitamin C and antioxidants, which fight inflammation and boost immunity, making them a great addition to daily smoothies or snacks.",
										},
									],
								},
							],
						},
						{
							type: "layout-area",
							children: [
								{
									type: "paragraph",
									children: [
										{
											bold: true,
											text: "Skin Care",
										},
										{
											text: "\nRich in antioxidants, pomegranate seed oil is a popular addition to skincare for its ability to repair skin and reduce fine lines.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "component-block",
					props: {
						content: null,
						imageSrc: "",
						colorTheme: "bg_c_plain",
						paddingBlock: "10vh",
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "heading",
									level: 4,
									children: [
										{
											text: "Home and Decorative Uses",
										},
									],
								},
								{
									type: "paragraph",
									children: [
										{
											bold: true,
											text: "Natural Centerpiece",
										},
										{
											text: "\nPomegranates' vibrant color makes them a stunning, natural table centerpiece, especially when mixed with candles or fall decor.",
										},
									],
								},
								{
									type: "paragraph",
									children: [
										{
											bold: true,
											text: "DIY Dried Garland",
										},
										{
											text: "\nCreate a festive pomegranate and eucalyptus garland for an aromatic, seasonal touch in your home.",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "section",
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Fun DIY Ideas",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							bold: true,
							text: "Natural Dye",
						},
						{
							text: "\nBoil pomegranate rinds to create a soft yellow dye, perfect for fabric.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							bold: true,
							text: "Pomegranate Stamps",
						},
						{
							text: "\nCut a pomegranate in half, dip in paint, and stamp onto paper or fabric for a fun, geometric print.",
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Final Thoughts",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "From health benefits to creative DIYs, pomegranates bring so much more to the table than meets the eye. Next time, think beyond the snack!",
						},
					],
				},
			],
		},
		tags: [
			{
				name: "red",
			},
			{
				name: "snack",
			},
		],
		categories: [
			{
				name: "berries",
			},
		],
		author: {
			email: "admin@tawtaw.site",
		},
	},
	{
		title: "Fruit and Cheese Pairings for a Perfect Charcuterie Board",
		slug: "fruit-cheese-pairings-charcuterie-board",
		dateCreated: "2024-02-28T14:00:00.000Z",
		dateModified: "2024-12-16T21:47:51.920Z",
		status: "PUBLIC",
		template: "WITHSIDEBAR",
		pinned: 0,
		excerpt:
			"Take your charcuterie board to the next level with these delicious fruit and cheese pairings, featuring combinations like figs and goat cheese and apples and cheddar.",
		featured_image:
			"https://cdn.pixabay.com/photo/2023/08/19/23/46/ai-generated-8201391_960_720.png",
		featured_video: "",
		content: {
			document: [
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Why Pair Fruit and Cheese?",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Combining fruit with cheese not only enhances the taste but also adds a pop of color to your board. The sweetness of the fruit can balance the saltiness or creaminess of the cheese, creating a harmonious flavor profile.",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Chose Fruits and Cheeses",
						},
					],
				},
				{
					type: "ordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Seasonality",
										},
										{
											text: ": Use seasonal fruits for the freshest flavors.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Variety",
										},
										{
											text: ": Incorporate a range of textures and flavors—think creamy, crumbly, sharp, and sweet.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Presentation",
										},
										{
											text: ": Cut fruits into bite-sized pieces for easy serving and enjoyment.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Perfect Pairings",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Here are some delightful fruit and cheese pairings that will impress your guests:",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "1. ",
						},
						{
							bold: true,
							text: "Brie + Fresh Berries",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Cheese",
										},
										{
											text: ": Creamy Brie",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Fruit",
										},
										{
											text: ": Strawberries, blueberries, or raspberries",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Why it works",
							italic: true,
						},
						{
							text: ": The richness of Brie complements the tartness of fresh berries, making for a light and refreshing pairing.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "2. ",
						},
						{
							bold: true,
							text: "Aged Cheddar + Apples",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Cheese",
										},
										{
											text: ": Sharp aged cheddar",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Fruit",
										},
										{
											text: ": Crisp apples (like Honeycrisp or Granny Smith)",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Why it works",
							italic: true,
						},
						{
							text: ": The sharpness of the cheddar enhances the crisp, sweet-tart flavors of the apples, creating a satisfying crunch.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "3. ",
						},
						{
							bold: true,
							text: "Goat Cheese + Fig Jam",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Cheese",
										},
										{
											text: ": Soft goat cheese",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Fruit",
										},
										{
											text: ": Figs or fig jam",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Why it works",
							italic: true,
						},
						{
							text: ": The creamy texture of goat cheese combined with the sweetness of figs provides a delightful contrast, perfect for spreading on crackers.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "4. ",
						},
						{
							bold: true,
							text: "Gorgonzola + Pears",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Cheese",
										},
										{
											text: ": Blue-veined Gorgonzola",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Fruit",
										},
										{
											text: ": Sliced ripe pears",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Why it works",
							italic: true,
						},
						{
							text: ": The strong, pungent flavor of Gorgonzola pairs beautifully with the sweet, juicy pears, creating a rich flavor experience.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "5. ",
						},
						{
							bold: true,
							text: "Manchego + Quince Paste",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Cheese",
										},
										{
											text: ": Manchego",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Fruit",
										},
										{
											text: ": Quince paste or slices",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Why it works",
							italic: true,
						},
						{
							text: ": The nutty, buttery flavor of Manchego is perfectly complemented by the sweet, floral notes of quince.",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Additional Pairing Ideas",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Havarti + Grapes",
										},
										{
											text: ": The creamy texture of Havarti goes well with juicy grapes.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Parmesan + Dried Apricots",
										},
										{
											text: ": The salty, nutty flavors of Parmesan contrast with the sweetness of dried apricots.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Feta + Watermelon",
										},
										{
											text: ": The briny flavor of feta is enhanced by the sweetness of watermelon, making it a perfect summer combo.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Final Thoughts",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "When building your charcuterie board, remember that variety is key. Mixing different cheeses and fruits not only enhances the visual appeal but also ensures that there’s something for everyone to enjoy. Experiment with these pairings and find your favorite combinations!",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Share Your Board!",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "What are your favorite fruit and cheese pairings? Share your ideas in the comments below, and let’s inspire each other for our next charcuterie board creation!",
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Happy pairing! 🍇🧀",
						},
					],
				},
			],
		},
		tags: [
			{
				name: "nutrition",
			},
			{
				name: "snack",
			},
		],
		categories: [
			{
				name: "berries",
			},
			{
				name: "citrus",
			},
		],
		author: {
			email: "admin@tawtaw.site",
		},
	},
	{
		title: "Secrets of the Loom",
		slug: "secrets-of-the-loom",
		dateCreated: "2024-11-15T19:39:55.004Z",
		dateModified: "2024-12-16T21:48:43.974Z",
		status: "PRIVATE",
		template: "WITHSIDEBAR",
		pinned: 0,
		excerpt:
			"Fruits are a staple of health-conscious diets, but did you know they hide some surprising secrets? These juicy delights don’t just pack vitamins; they boast unique properties you might not have heard of before. Let’s unravel the loom of fruit benefits.",
		featured_image:
			"https://cdn.pixabay.com/photo/2012/04/12/20/35/grapes-30550_1280.png",
		featured_video: "",
		content: {
			document: [
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "1. Pineapple: Nature’s Anti-Inflammatory",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Pineapple isn’t just tropical and sweet—it’s rich in bromelain, an enzyme known for reducing inflammation and aiding digestion.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Quick Tip:",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Add fresh pineapple to post-workout smoothies for a natural recovery boost.",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "2. Blackberries: Brain Boosters in Disguise",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Packed with anthocyanins, blackberries help improve memory and reduce the risk of neurodegenerative diseases. These powerful antioxidants also fight oxidative stress, keeping your mind sharp as you age.",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Did You Know?",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Blackberries may enhance communication between neurons, optimizing cognitive functions.",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "3. Figs: Your Secret Skin Savior",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Often overlooked, figs are brimming with polyphenols and vitamins that promote collagen production. This makes them a natural ally for radiant skin. Plus, their high calcium content strengthens nails and bones.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Quick DIY:",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Mash fresh figs into a face mask with a touch of honey for a glowing complexion.",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "4. Papaya Seeds: Gut Guardians",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "While most people toss papaya seeds, they’re surprisingly nutritious! These tiny seeds have antimicrobial properties and support digestive health by eliminating harmful parasites.",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "Fun Fact:",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Papaya seeds have a peppery flavor—try them dried and crushed as a spice.",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "5. Starfruit: The Hydration Hero",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Low in calories but high in water content, starfruit is excellent for hydration. It also contains ",
						},
						{
							text: "oxalic acid",
							italic: true,
						},
						{
							text: ", which may help dissolve kidney stones (with doctor approval, of course).",
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "In Conclusion:",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "The next time you reach for a fruit, think beyond its surface sweetness. These hidden health benefits are nature’s way of weaving wellness into your life.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Which fruit secret surprised you most? Share your thoughts in the comments below.",
						},
					],
				},
			],
		},
		tags: [
			{
				name: "red",
			},
			{
				name: "purple",
			},
		],
		categories: [
			{
				name: "pomes",
			},
			{
				name: "melons",
			},
		],
		author: {
			email: "admin@tawtaw.site",
		},
	},
	{
		title: "The Beauty and Benefits of Dragon Fruit",
		slug: "dragon-fruit-beauty-benefits",
		dateCreated: "2024-01-12T09:15:00.000Z",
		dateModified: "2024-12-16T21:48:55.455Z",
		status: "PUBLIC",
		template: "WITHSIDEBAR",
		pinned: 0,
		excerpt:
			"Discover the unique appearance and nutritional benefits of dragon fruit, also known as pitaya, and learn how to incorporate it into your diet.",
		featured_image:
			"https://cdn.pixabay.com/photo/2024/07/03/09/23/ai-generated-8869297_960_720.jpg",
		featured_video: "",
		content: {
			document: [
				{
					type: "paragraph",
					children: [
						{
							text: "Dragon fruit, also known as pitaya, is not just a feast for the eyes; it's also a nutritional powerhouse. In this post, we'll explore the beauty and myriad benefits of this exotic fruit.",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "What is Dragon Fruit?",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "![Dragon Fruit](https://example.com/dragon-fruit.jpg)\n",
						},
						{
							text: "The vibrant exterior of dragon fruit makes it a standout in any fruit bowl.",
							italic: true,
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Dragon fruit comes from several different cactus species, predominantly the ",
						},
						{
							text: "Hylocereus",
							italic: true,
						},
						{
							text: " and ",
						},
						{
							text: "Selenicereus",
							italic: true,
						},
						{
							text: " varieties. Its unique appearance—bright pink or yellow skin with green-tipped scales—makes it a favorite among food lovers and photographers alike.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Nutritional Profile",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Dragon fruit is low in calories but packed with nutrients. Here’s a quick breakdown of its nutritional benefits:",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "\n| Protein            | 1g               |\n| Fat                | 0.1g             |\n| Fiber              | 3g               |\n| Vitamin C          | 5% DV            |\n| Calcium            | 1% DV            |\n| Iron               | 4% DV            |",
						},
					],
				},
				{
					type: "component-block",
					props: {
						rows: [
							{
								cells: [
									{
										text: "Calories",
									},
									{
										text: "60",
									},
								],
							},
							{
								cells: [
									{
										text: "Carbohydrates",
									},
									{
										text: "13g",
									},
								],
							},
							{
								cells: [
									{
										text: "Protein",
									},
									{
										text: "1g",
									},
								],
							},
							{
								cells: [
									{
										text: "Fat",
									},
									{
										text: "0.1g",
									},
								],
							},
							{
								cells: [
									{
										text: "Fiber",
									},
									{
										text: "3g",
									},
								],
							},
							{
								cells: [
									{
										text: "Vitamin C",
									},
									{
										text: "5% DV",
									},
								],
							},
							{
								cells: [
									{
										text: "Calcium",
									},
									{
										text: "1% DV",
									},
								],
							},
							{
								cells: [
									{
										text: "Iron",
									},
									{
										text: "4% DV",
									},
								],
							},
						],
						caption: "",
						headers: [
							{
								text: "Nutrient",
							},
							{
								text: "Amount per 100g",
							},
						],
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "table",
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Health Benefits",
						},
					],
				},
				{
					type: "ordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Rich in Antioxidants",
										},
										{
											text: "\nDragon fruit is loaded with antioxidants, such as vitamin C and flavonoids, which help combat oxidative stress in the body.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Supports Digestive Health",
										},
										{
											text: "\nThe high fiber content aids digestion and can help prevent constipation.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Boosts Immune System",
										},
										{
											text: "\nWith its high vitamin C content, dragon fruit can strengthen your immune system, making you less susceptible to illness.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Promotes Healthy Skin",
										},
										{
											text: "\nThe antioxidants and vitamin C in dragon fruit can contribute to glowing skin and help reduce signs of aging.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "May Aid Weight Loss",
										},
										{
											text: "\nLow in calories and high in fiber, dragon fruit can help you feel fuller for longer, making it a great addition to a weight loss diet.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "How to Enjoy Dragon Fruit",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Dragon fruit can be enjoyed in various ways:",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Raw",
										},
										{
											text: ": Simply cut it in half and scoop out the flesh with a spoon.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Smoothies",
										},
										{
											text: ": Blend it with other fruits for a refreshing drink.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Salads",
										},
										{
											text: ": Add it to fruit salads for a pop of color and flavor.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Desserts",
										},
										{
											text: ": Use it in sorbets or as a topping for yogurt.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Conclusion",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Dragon fruit is not only visually stunning but also packed with health benefits. Incorporating it into your diet can provide essential nutrients and contribute to overall well-being. So why not add a little color to your plate with this exotic fruit?",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							bold: true,
							text: "Have you tried dragon fruit? Share your favorite ways to enjoy it in the comments below!",
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "References",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "",
										},
										{
											href: "https://example.com/nutrition",
											type: "link",
											children: [
												{
													text: "Nutrition Data",
												},
											],
										},
										{
											text: "",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "",
										},
										{
											href: "https://example.com/health-benefits",
											type: "link",
											children: [
												{
													text: "Health Benefits of Dragon Fruit",
												},
											],
										},
										{
											text: "",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "",
						},
					],
				},
			],
		},
		tags: [
			{
				name: "red",
			},
			{
				name: "purple",
			},
			{
				name: "yellow",
			},
		],
		categories: [
			{
				name: "tropical",
			},
		],
		author: {
			email: "admin@tawtaw.site",
		},
	},
	{
		title: "The Beauty of Fruit Art",
		slug: "fruit-art",
		dateCreated: "2023-09-30T14:00:00.000Z",
		dateModified: "2024-12-16T21:49:08.146Z",
		status: "PUBLIC",
		template: "WITHSIDEBAR",
		pinned: 0,
		excerpt:
			"Discover the creative and beautiful world of fruit art, from simple designs like watermelon baskets to intricate sculptures made from a variety of fruits.",
		featured_image:
			"https://cdn.pixabay.com/photo/2018/04/04/14/36/seamless-3289971_1280.png",
		featured_video: "",
		content: {
			document: [
				{
					type: "paragraph",
					children: [
						{
							text: "The art of transforming fruits into stunning visual masterpieces has captivated people for centuries. From simple slices arranged beautifully to intricate carvings, fruit art is a delightful way to combine nature's bounty with artistic flair.",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Why Fruit Art?",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Healthy and Fun",
										},
										{
											text: ": It’s a nutritious alternative to processed snacks while also being visually exciting.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Engaging Activity",
										},
										{
											text: ": A great way to bond with kids, family, or friends over creativity.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Perfect for Events",
										},
										{
											text: ": Fruit platters and carvings elevate any gathering with their charm.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Tools of the Trade",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Creating fruit art requires only a few basic tools:",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Sharp paring knife",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Melon baller",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Cookie cutters",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Toothpicks or skewers",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Ideas to Get You Started",
						},
					],
				},
				{
					type: "ordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Simple Arrangements",
										},
										{
											text: ": Arrange colorful fruit slices like a rainbow or flower.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Carved Masterpieces",
										},
										{
											text: ": Turn a watermelon into a basket or carve roses from apples.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Fun Shapes",
										},
										{
											text: ": Use cookie cutters to make stars, hearts, or other shapes from melons and pineapple.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Inspiring Examples",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Take inspiration from social media or cooking shows. Artists worldwide are crafting animals, faces, and even towering sculptures—all from fruit!",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "So, next time you pick up a juicy piece of fruit, consider turning it into art. You’ll find joy not just in eating it, but in admiring its beauty too.",
						},
					],
				},
			],
		},
		tags: [
			{
				name: "blue",
			},
			{
				name: "red",
			},
			{
				name: "white",
			},
			{
				name: "green",
			},
			{
				name: "orange",
			},
			{
				name: "leaf",
			},
			{
				name: "purple",
			},
			{
				name: "yellow",
			},
			{
				name: "black",
			},
		],
		categories: [
			{
				name: "drupes",
			},
			{
				name: "pomes",
			},
			{
				name: "berries",
			},
			{
				name: "melons",
			},
			{
				name: "citrus",
			},
			{
				name: "tropical",
			},
		],
		author: {
			email: "admin@tawtaw.site",
		},
	},
	{
		title: "The Best Fruits for a Summer Picnic",
		slug: "fruits-summer-picnic",
		dateCreated: "2023-11-20T12:30:00.000Z",
		dateModified: "2024-12-16T21:49:20.300Z",
		status: "PUBLIC",
		template: "WITHSIDEBAR",
		pinned: 0,
		excerpt:
			"Get ready for your next summer picnic with this guide to the best fruits to pack, including watermelon, cherries, and grapes.",
		featured_image:
			"https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118262/cutefruit/banners/cf-banner-3_uuufb0.png",
		featured_video: "",
		content: {
			document: [
				{
					type: "paragraph",
					children: [
						{
							text: "Fruits not only add vibrant colors to your picnic spread but also keep you refreshed under the sun. Here's a guide to the best fruits for your next outing.",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Why Choose Fruit for Picnics?",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Portable and Easy to Eat",
										},
										{
											text: ": No utensils needed—just grab and enjoy!",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Hydrating",
										},
										{
											text: ": Many fruits are packed with water, helping you stay cool.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Healthy Snack",
										},
										{
											text: ": Fruits are naturally sweet and loaded with vitamins, making them guilt-free treats.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Top Fruits to Pack",
						},
					],
				},
				{
					type: "ordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Watermelon",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "The ultimate picnic fruit. Slice it into wedges or pack it as bite-sized cubes.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Tip",
															italic: true,
														},
														{
															text: ": Chill it before packing for an extra refreshing treat.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Berries",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Strawberries, blueberries, and raspberries are small, mess-free, and bursting with flavor.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Pack them in individual containers for easy snacking.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Grapes",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Perfectly poppable and naturally sweet. Opt for seedless varieties for convenience.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Tip",
															italic: true,
														},
														{
															text: ": Freeze them ahead of time—they double as a cool snack!",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Pineapple",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Pre-cut into chunks or skewered for a tropical vibe.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Pairs wonderfully with savory picnic foods like grilled chicken.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Apples and Oranges",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Durable and travel-friendly, they stay fresh longer than other fruits.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Slice apples beforehand and sprinkle with lemon juice to prevent browning.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Bonus Tip: Mix It Up!",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Create a colorful fruit salad or pack fruit kabobs to add variety and save space in your picnic basket.",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Refreshing and Delicious",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Fruits are the perfect addition to any summer picnic. They’re sweet, hydrating, and a hit with both kids and adults. So, stock up on your favorites, and make your next picnic a fruity success!",
						},
					],
				},
			],
		},
		tags: [
			{
				name: "blue",
			},
			{
				name: "red",
			},
			{
				name: "white",
			},
		],
		categories: [
			{
				name: "berries",
			},
			{
				name: "melons",
			},
		],
		author: {
			email: "admin@tawtaw.site",
		},
	},
	{
		title: "The Sweet and Sour World of Citrus Fruits",
		slug: "sweet-sour-citrus-fruits",
		dateCreated: "2023-04-17T14:00:00.000Z",
		dateModified: "2024-12-16T21:52:35.925Z",
		status: "PUBLIC",
		template: "WITHSIDEBAR",
		pinned: 0,
		excerpt:
			"Discover the delicious and tangy world of citrus fruits, from lemons and limes to oranges and grapefruits.",
		featured_image:
			"https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118260/cutefruit/banners/cf-banner-15_w0csbb.jpg",
		featured_video: "",
		content: {
			document: [
				{
					type: "paragraph",
					children: [
						{
							text: "Citrus fruits are a vibrant family of fruits known for their refreshing flavors and nutritional benefits. From the tangy taste of lemons to the sweetness of oranges, these fruits add a burst of flavor to our daily lives. We'll explore some of the most popular citrus fruits, their unique characteristics, and their surprising uses.",
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "🍊 Oranges: The All-Time Favorite",
						},
					],
				},
				{
					type: "component-block",
					props: {
						alt: "",
						color: "lightgray",
						width: "",
						border: 0,
						padding: 1,
						imageSrc:
							"https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_600/ncom/en_US/games/switch/p/pikmin-3-deluxe-switch/description-image",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "image",
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Oranges are perhaps the most well-known citrus fruit. Not only are they delicious, but they are also packed with vitamin C. Here's a quick overview:",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Scientific Name",
										},
										{
											text: ": ",
										},
										{
											text: "Citrus sinensis",
											italic: true,
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Flavor",
										},
										{
											text: ": Sweet, with a hint of tartness",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Uses",
										},
										{
											text: ": Juice, salads, desserts",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "blockquote",
					children: [
						{
							type: "paragraph",
							children: [
								{
									text: '"An orange a day keeps the doctor away."\n— A twist on the classic saying',
								},
							],
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Oranges are incredibly versatile. You can enjoy them as a snack, squeeze them into juice, or even use their zest to add flavor to baked goods.",
						},
					],
				},
				{
					type: "component-block",
					props: {
						intent: "success",
						content: null,
					},
					children: [
						{
							type: "component-block-prop",
							children: [
								{
									type: "paragraph",
									children: [
										{
											bold: true,
											text: "Fun Fact: ",
										},
										{
											text: "Oranges are actually a hybrid of pomelo and mandarin!",
										},
									],
								},
							],
							propPath: ["content"],
						},
					],
					component: "callout",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "🍋 Lemons: The Zesty Powerhouse",
						},
					],
				},
				{
					type: "component-block",
					props: {
						alt: "",
						color: "lightgray",
						width: "",
						border: 0,
						padding: 1,
						imageSrc:
							"https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/c_scale,w_700/ncom/software/switch/70010000005302/a6260af9456f2e4a87b5b3e186678cf2780a3f367ba968d790ac3918e5e4b636",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "image",
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Lemons are known for their sharp, tangy flavor. They are a kitchen staple for their ability to brighten up any dish.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Why We Love Lemons:",
						},
					],
				},
				{
					type: "ordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Rich in Vitamin C",
										},
										{
											text: ": Boosts the immune system",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Detoxifying",
										},
										{
											text: ": Great for cleansing the body",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Flavor Enhancer",
										},
										{
											text: ": A squeeze of lemon can elevate the taste of many dishes",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							bold: true,
							text: "Tip",
						},
						{
							text: ":\nAdd a slice of lemon to your water for a refreshing twist!",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Lemons are not just for eating—they're also great for cleaning! The acidity of lemon juice makes it a natural disinfectant.",
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "🍈 Grapefruits: The Bittersweet Contender",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Grapefruits have a unique flavor profile, combining bitterness with a touch of sweetness. They are an acquired taste for some but highly prized for their health benefits.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Nutritional Benefits:",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "High in Antioxidants",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Supports Weight Loss",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Promotes Healthy Skin",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "blockquote",
					children: [
						{
							type: "paragraph",
							children: [
								{
									text: "Did you know?\nGrapefruit can interact with certain medications, so it's important to consult with a doctor if you're on prescription meds.",
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Recipe Highlight:",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Try a ",
						},
						{
							bold: true,
							text: "grapefruit salad",
						},
						{
							text: " with avocado, honey, and a sprinkle of sea salt for a refreshing, healthy dish.",
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "🍊 Mandarins: The Sweet Little Sibling",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Mandarins are small, easy-to-peel, and perfect for snacking. They are less acidic than other citrus fruits, making them a favorite among kids and adults alike.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Quick Facts:",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Scientific Name",
										},
										{
											text: ": ",
										},
										{
											text: "Citrus reticulata",
											italic: true,
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Varieties",
										},
										{
											text: ": Clementines, tangerines, satsumas",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Best Season",
										},
										{
											text: ": Winter",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Did You Know?",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Mandarins are one of the oldest cultivated fruits, with origins dating back to ancient China.",
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Conclusion",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Citrus fruits are a delightful blend of sweet, sour, and sometimes bitter flavors. Whether you prefer the sweetness of oranges or the zing of lemons, there's a citrus fruit for everyone. So next time you're at the grocery store, pick up a few and enjoy the sweet and sour world of citrus!",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "",
						},
					],
				},
			],
		},
		tags: [
			{
				name: "blue",
			},
			{
				name: "purple",
			},
		],
		categories: [
			{
				name: "citrus",
			},
		],
		author: {
			email: "admin@tawtaw.site",
		},
	},
	{
		title: "The Wonderful World of Apples",
		slug: "wonderful-world-apples",
		dateCreated: "2023-08-22T09:15:00.000Z",
		dateModified: "2024-12-16T21:52:59.612Z",
		status: "PUBLIC",
		template: "WITHSIDEBAR",
		pinned: 0,
		excerpt:
			"Explore the diverse world of apples, from sweet and crisp varieties like Honeycrisp and Pink Lady to tart and tangy options like Granny Smith and Braeburn.",
		featured_image:
			"https://cdn.pixabay.com/photo/2017/02/22/14/42/mace-2089603_1280.png",
		featured_video: "",
		content: {
			document: [
				{
					type: "paragraph",
					children: [
						{
							text: "Did you know apples have been cultivated for thousands of years? Originating in Central Asia, they’ve spread across the globe, becoming a staple in countless cuisines and cultures.",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Popular Apple Varieties",
						},
					],
				},
				{
					type: "ordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Granny Smith",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Bright green, crisp, and tart.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Perfect for baking or adding zing to salads.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Honeycrisp",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Known for its sweet, juicy crunch.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Ideal for snacking or pairing with cheese.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Fuji",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "A super-sweet variety with a dense texture.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Great for raw eating or homemade applesauce.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Red Delicious",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Classic deep red skin with a mild flavor.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "A great addition to fruit bowls for its visual appeal.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Pink Lady",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "A delightful balance of sweetness and tartness.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Perfect for snacking or slicing onto oatmeal.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
				{
					type: "component-block",
					props: {
						gap: 1,
						items: [
							{
								alt: "Granny Smith",
								src: "https://cdn.pixabay.com/photo/2015/06/11/13/40/apple-805819_1280.png",
								caption: "Granny Smith",
							},
							{
								alt: "Honey Crisp",
								src: "https://cdn.pixabay.com/photo/2022/06/30/16/47/apple-7294069_1280.png",
								caption: "Honey Crisp",
							},
							{
								alt: "Fuji Mountain",
								src: "https://cdn.pixabay.com/photo/2020/02/07/21/12/everest-4828404_1280.png",
								caption: "Fuji Mountain",
							},
							{
								alt: "Bunch o Apples",
								src: "https://cdn.pixabay.com/photo/2014/12/21/23/25/apples-575317_1280.png",
								caption: "Bunch o Apples",
							},
							{
								alt: "Pink Lady",
								src: "https://cdn.pixabay.com/photo/2014/04/02/16/23/apple-307118_1280.png",
								caption: "Pink Lady",
							},
						],
						layout: "grid",
						columns: 3,
						objectFit: "contain",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "imagegallery",
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "A Bite of Happiness",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Whether you prefer them fresh, baked, or pressed into juice, apples are a simple joy that everyone can savor. ",
						},
					],
				},
			],
		},
		tags: [
			{
				name: "red",
			},
			{
				name: "green",
			},
		],
		categories: [
			{
				name: "pomes",
			},
		],
		author: {
			email: "admin@tawtaw.site",
		},
	},
	{
		title: "Exotic Fruits",
		slug: "exotic-fruits",
		dateCreated: "2023-06-15T12:30:00.000Z",
		dateModified: "2024-12-16T21:53:22.827Z",
		status: "PUBLIC",
		template: "WITHSIDEBAR",
		pinned: 1,
		excerpt:
			"Take a journey to discover some of the most unique and exotic fruits from around the world, including jackfruit, durian, and mangosteen.",
		featured_image:
			"https://cdn.pixabay.com/photo/2016/10/27/12/41/bali-1774736_1280.jpg",
		featured_video: "",
		content: {
			document: [
				{
					type: "paragraph",
					children: [
						{
							text: "Exotic fruits often come from distant tropical regions and may be unfamiliar to your local grocery store. They boast striking appearances and unusual flavors, making them a delight for adventurous eaters.",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Must-Try Exotic Fruits",
						},
					],
				},
				{
					type: "ordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Dragon Fruit (Pitaya)",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Known for its vibrant pink skin and speckled white or red interior.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Flavor: Mildly sweet, similar to kiwi.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "How to Enjoy",
															italic: true,
														},
														{
															text: ": Eat it fresh or blend it into smoothies.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Rambutan",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "A spiky, red fruit with a sweet, grape-like flavor.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Tip",
															italic: true,
														},
														{
															text: ": Peel back the hairy skin to reveal its juicy interior.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Mangosteen",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Small, purple fruit with a thick rind and a soft, sweet-tart interior.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: 'Often called the "queen of fruits."',
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Durian",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Famous for its strong aroma and creamy, custard-like flesh.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Flavor: Rich and unique—people either love it or hate it!",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Passion Fruit",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "A small fruit with a wrinkly shell and tangy, seed-filled pulp.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "How to Enjoy",
															italic: true,
														},
														{
															text: ": Scoop out the pulp or mix it into desserts and drinks.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Salak (Snake Fruit)",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Named for its reddish-brown scaly skin, this fruit offers a crunchy texture and sweet-tart taste.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Bringing Exotic Fruits to Your Table",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "You can find exotic fruits at specialty stores, farmers' markets, or online retailers. Next time you shop, pick one and start your journey into the world of exotic fruits.",
						},
					],
				},
			],
		},
		tags: [
			{
				name: "red",
			},
			{
				name: "yellow",
			},
		],
		categories: [
			{
				name: "berries",
			},
			{
				name: "citrus",
			},
		],
		author: {
			email: "admin@tawtaw.site",
		},
	},
	{
		title: "In the Jungle with Tropical Fruits",
		slug: "tropical-fruits",
		dateCreated: "2023-12-05T16:45:00.000Z",
		dateModified: "2024-12-16T21:53:53.076Z",
		status: "PUBLIC",
		template: "WITHSIDEBAR",
		pinned: 0,
		excerpt:
			"Explore the amazing diversity of tropical fruits, including mangos, pineapples, and papayas, and learn about their health benefits and culinary uses.",
		featured_image:
			"https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118261/cutefruit/banners/cf-banner-4_a1mzp8.png",
		featured_video: "",
		content: {
			document: [
				{
					type: "paragraph",
					children: [
						{
							text: "When you think of tropical fruits, images of vibrant colors, unique shapes, and tantalizing tastes may come to mind. These fruits not only bring a splash of color and flavor to our plates but are also packed with nutrients that contribute to a healthier lifestyle. ",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Why Tropical Fruits?",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Tropical fruits often have:",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "High water content",
										},
										{
											text: " – Great for hydration!",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Rich antioxidants",
										},
										{
											text: " – Boosts immunity.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Unique flavors",
										},
										{
											text: " – From sweet to sour, tropical fruits cover all taste profiles.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Whether you’re sipping on a smoothie or adding them to a salad, these fruits add a refreshing touch to any meal.",
						},
					],
				},
				{
					type: "component-block",
					props: {
						alt: "",
						color: "lightgray",
						width: "",
						border: 0,
						padding: 1,
						imageSrc:
							"https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3hjeG05Z25tbDd1cnpsZDlkcjh6bzNxOXNlaGE0aXZobTlnMXlzbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l378yCCaMVfzb60HS/giphy.gif",
					},
					children: [
						{
							type: "component-inline-prop",
							children: [
								{
									text: "",
								},
							],
						},
					],
					component: "image",
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Popular Tropical Fruits",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Here are some of the most popular tropical fruits and why they're worth trying!",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "1. ",
						},
						{
							bold: true,
							text: "Mango",
						},
						{
							text: " ",
						},
						{
							text: "(Mangifera indica)",
							italic: true,
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Taste",
										},
										{
											text: ": Sweet, with hints of floral and citrus.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Nutrition",
										},
										{
											text: ": High in Vitamin C, Vitamin A, and fiber.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Fun Fact",
										},
										{
											text: ': Known as the "king of fruits" in many parts of Asia!',
										},
									],
								},
							],
						},
					],
				},
				{
					type: "blockquote",
					children: [
						{
							type: "paragraph",
							children: [
								{
									text: '"The mango\'s unique sweetness and versatility make it a top choice for fruit lovers worldwide."',
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "2. ",
						},
						{
							bold: true,
							text: "Pineapple",
						},
						{
							text: " ",
						},
						{
							text: "(Ananas comosus)",
							italic: true,
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Taste",
										},
										{
											text: ": A blend of sweet and tangy.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Nutrition",
										},
										{
											text: ": Loaded with bromelain, an enzyme that aids digestion.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Did you know?",
										},
										{
											text: " Pineapples take up to 2 years to mature!",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							bold: true,
							text: "Recipe Idea:",
						},
						{
							text: "\nTry grilling pineapple slices for a delicious smoky flavor. Perfect as a side dish or dessert!",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "3. ",
						},
						{
							bold: true,
							text: "Dragon Fruit",
						},
						{
							text: " ",
						},
						{
							text: "(Hylocereus undatus)",
							italic: true,
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Appearance",
										},
										{
											text: ": Bright pink or yellow skin with green scales.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Taste",
										},
										{
											text: ": Mildly sweet with a kiwi-like texture.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Health Benefits",
										},
										{
											text: ": Rich in antioxidants and Vitamin C.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Tip: Scoop out the flesh and use it in a smoothie bowl for a beautiful breakfast!",
							italic: true,
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "4. ",
						},
						{
							bold: true,
							text: "Papaya",
						},
						{
							text: " ",
						},
						{
							text: "(Carica papaya)",
							italic: true,
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Taste",
										},
										{
											text: ": Soft, buttery texture with a mild sweetness.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Nutritional Highlight",
										},
										{
											text: ": Contains the enzyme papain, which helps in protein digestion.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Quick Tip",
										},
										{
											text: ": Add a squeeze of lime juice to enhance its flavor.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Lesser-Known Tropical Fruits",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "While mangoes and pineapples are well-known, there are other tropical gems to explore:",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							bold: true,
							text: "Rambutan",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Looks",
										},
										{
											text: ": Red and hairy!",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Taste",
										},
										{
											text: ": Sweet and juicy, similar to lychee.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Fun Fact",
										},
										{
											text: ": Despite its intimidating appearance, the rambutan is a favorite in Southeast Asia.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							bold: true,
							text: "Mangosteen",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Taste",
										},
										{
											text: ": A perfect balance of sweet and sour.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Nutrition",
										},
										{
											text: ": High in xanthones, known for their antioxidant properties.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Note",
										},
										{
											text: ": Mangosteen is known as the “queen of fruits” and is often paired with mango, the king.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Tips for Buying and Storing Tropical Fruits",
						},
					],
				},
				{
					type: "ordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Buy fresh",
										},
										{
											text: " – Check for firmness and aroma.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Avoid bruises",
										},
										{
											text: " – Look for intact skins.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Store properly",
										},
										{
											text: " – Some tropical fruits, like bananas and pineapples, ripen best at room temperature.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "blockquote",
					children: [
						{
							type: "paragraph",
							children: [
								{
									text: "Pro Tip:",
									italic: true,
								},
								{
									text: " Many tropical fruits can be frozen. Slice and freeze for smoothies or desserts!",
								},
							],
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Conclusion",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "The world of tropical fruits is a vibrant adventure for your taste buds and your health. From juicy mangoes to nutrient-rich dragon fruits, each variety brings its unique benefits and flavors. So, the next time you’re at the market, why not try something new?",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							bold: true,
							text: "Enjoy the taste of the tropics, one bite at a time!",
						},
					],
				},
			],
		},
		tags: [
			{
				name: "blue",
			},
			{
				name: "white",
			},
			{
				name: "leaf",
			},
			{
				name: "yellow",
			},
		],
		categories: [
			{
				name: "drupes",
			},
			{
				name: "tropical",
			},
		],
		author: {
			email: "admin@tawtaw.site",
		},
	},
]

export const announcements_seed: AnnouncementCreateInput[] = [
	{
		link: "/blog/dragon-fruit-beauty-benefits",
		start: "2024-11-18T06:00:00.000Z",
		end: "2027-08-29T05:00:00.000Z",
		colorTheme: "bg_c_tertiary",
		type: "NORMAL",
		content: {
			document: [
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Juicy Stories About Nature’s Sweetest Gifts",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Discover the fascinating world of fruits with us! From health benefits to delicious recipes, our blog serves up fresh content to keep you informed and inspired. Dive in and let the sweetness unfold.",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Follow the link or view our other ",
						},
						{
							href: "/blog",
							type: "link",
							children: [
								{
									text: "blog posts",
								},
							],
						},
						{
							text: "",
						},
					],
				},
			],
		},
	},
]

export const categories_seedjson: CategoryCreateInput[] = [
	{
		name: "pomes",
		excerpt:
			"Fruits that have smooth skin and an enlarged fleshy area that surrounds the core. Examples of pomes are apples, pears, and kiwis.",
	},
	{
		name: "drupes",
		excerpt:
			"Fruits that contain a single seed, or pit, surrounded by juicy flesh. Examples of drupes are peaches, cherries, plums, nectarines, and apricots.",
	},
	{
		name: "berries",
		excerpt:
			"Fruits with a fragile cell structure, that are pulpy and juicy with tiny seeds embedded in the flesh. Examples of berries are blackberries, cranberries, strawberries, and grapes.",
	},
	{
		name: "melons",
		excerpt:
			": Fruits that have a hard outer surface that is either smooth or netted with a juicy flesh. Examples of melons include, cantaloupes, honeydew, watermelon, casaba, crenshaw, and muskmelon.",
	},
	{
		name: "citrus",
		excerpt:
			" Fruits that grow in warm regions, and have a firm rind and a pulpy flesh. Examples of citrus fruits are, oranges, grapefruits, tangerines, lemons, limes, kumquats, citrons, tengelows, and ugli fruit.",
	},
	{
		name: "tropical",
		excerpt:
			"Fruits that grow in very warm climates, and differ in skin composition and seed characteristics. Examples, of tropical fruits are bananas, pineapples, avocados, dates, figs, mangoes, pomegranates, and papayas.",
	},
]

export const tags_seedjson: TagCreateInput[] = [
	{
		name: "blue",
	},
	{
		name: "yellow",
	},
	{
		name: "red",
	},
	{
		name: "purple",
	},
	{
		name: "white",
	},
	{
		name: "black",
	},
	{
		name: "green",
	},

	{
		name: "orange",
	},

	{
		name: "leaf",
	},
	{
		name: "cluster",
	},
	{
		name: "nutrition",
	},
	{
		name: "snack",
	},
]

export const events_seedjson: SeedEvent[] = [
	{
		summary: "Citrus Yoga Retreat",
		start: dateAdjuster(dateNow, { days: 5}),
		end: dateAdjuster(dateNow, { days: 5}),
		price: 100,
		seats: 20,
		image:
			"https://res.cloudinary.com/dh5vxixzn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682288910/cutefruit/product_images/clgtzdr2o0000dwsv5pe0hjiv.jpg",
		excerpt:
			"Experience a rejuvenating retreat combining yoga, citrus-inspired refreshments, wellness workshops, and activities like meditation, citrus-picking, and aromatherapy, designed for all levels to recharge and refresh.",
		description: {
			document: [
				{
					type: "paragraph",
					children: [
						{
							text: "Immerse yourself in a rejuvenating retreat that blends the calming practice of yoga with the vibrant zest of citrus. Perfect for anyone seeking relaxation, wellness, and a touch of sunshine.",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "What’s Included",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Daily Yoga Sessions",
										},
										{
											text: ": Guided classes for all skill levels, set amidst a serene citrus grove.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Citrus-Inspired Refreshments",
										},
										{
											text: ": Enjoy fresh-squeezed juices, citrus-infused water, and healthy snacks.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Wellness Workshops",
										},
										{
											text: ": Learn about the benefits of citrus for mind, body, and nutrition.",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "Activities to Enjoy",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Guided meditation in the grove",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Citrus-picking experience",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Aromatherapy sessions featuring citrus essential oils",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "Who Can Attend?",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "This retreat is designed for anyone looking to recharge, from seasoned yogis to beginners seeking a fresh start.",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "Why Join?",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "The Citrus Yoga Retreat offers the perfect blend of relaxation, health, and the refreshing essence of citrus. Leave feeling renewed, energized, and inspired!",
						},
					],
				},
			],
		},
		status: "ACTIVE",
		location: {
			name: "Hidden Valley",
		},
		hosts: [],
		cohosts: [],
		dateCreated: "2025-01-10T20:15:17.720Z",
		dateModified: "2025-01-10T20:15:17.720Z",
		categories: [],
		tags: [],
	},
	{
		summary: "Berrylicious Smoothie Workshop",
		start: dateAdjuster(dateNow, { days: 10}),
		end: dateAdjuster(dateNow, { days: 10}),
		price: 100,
		seats: 9999,
		image:
			"https://res.cloudinary.com/dh5vxixzn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682290024/cutefruit/product_images/clgu01m7x0004dwsv0b05di5c.png",
		excerpt:
			"Join a fun, hands-on workshop to craft delicious berry smoothies, learn tips for flavor and nutrition, and enjoy fresh ingredients, recipes, and a berry delightful experience for all ages.",
		description: {
			document: [
				{
					type: "paragraph",
					children: [
						{
							text: "Discover the art of making delicious, healthy berry smoothies at our hands-on workshop. Whether you’re a smoothie novice or a blending pro, this event is perfect for anyone who loves berries and fun in the kitchen.",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "What You’ll Learn",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "How to select the freshest berries",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Tips for balancing flavors and textures",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Creative ways to boost nutrition with add-ins",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "What’s Included",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "A variety of fresh berries and ingredients",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "All the tools you need for blending",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Take-home recipes to recreate your favorites",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "Who Can Join?",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "This workshop is open to all ages and skill levels. It’s a great activity for families, friends, or anyone looking to try something new.",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "Why Attend?",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "The Berrylicious Smoothie Workshop is a fun and interactive way to enjoy the flavors of berries while learning how to create your own delicious and healthy smoothies. Don’t miss out on this berry delightful experience",
						},
					],
				},
			],
		},
		status: "ACTIVE",
		location: {
			name: "Zesty Lounge",
		},
		hosts: [],
		cohosts: [],
		dateCreated: dateAdjuster(dateNow, { months: 1}),
		dateModified: dateAdjuster(dateNow, { months: 1}),
		categories: [],
		tags: [],
	},
	{
		summary: "Apple Harvest Festival",
		start: dateAdjuster(dateNow, { days: 15}),
		end: dateAdjuster(dateNow, { days: 15}),
		price: 100,
		seats: 20,
		image:
			"https://res.cloudinary.com/dh5vxixzn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682290294/cutefruit/product_images/clgu07ezt0000jssvguqp688x.jpg",
		excerpt:
			"Celebrate autumn at the Apple Harvest Festival with live music, apple-inspired treats, games, orchard tours, and fun activities for all ages. Perfect for a festive fall outing!",
		description: {
			document: [
				{
					type: "paragraph",
					children: [
						{
							text: "Join us for a day filled with apple-themed fun and festivities!\n Enjoy live music, seasonal games, and delicious treats that highlight \nthe beloved fruit of autumn.",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "Delicious Apple Treats",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Indulge in a variety of apple-inspired delights, including:",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Fresh apple cider",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Caramel-dipped apples",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Homemade apple pies",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "Fun and Festive Activities",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Get involved in exciting activities and competitions, such as:",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Apple bobbing",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Pie-baking contest",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Orchard tours",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "Perfect for All Ages",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "This\n family-friendly event offers something for everyone. Whether you’re an \napple enthusiast or simply looking for a festive fall outing, the Apple \nHarvest Festival promises a crisp and memorable experience!",
						},
					],
				},
			],
		},
		status: "ACTIVE",
		location: {
			name: "Honorary Orchards",
		},
		hosts: [],
		cohosts: [],
		dateCreated: "2025-01-10T20:15:17.714Z",
		dateModified: "2025-01-10T20:15:17.714Z",
		categories: [],
		tags: [],
	},
	{
		summary: "Watermelon Summer Bash",
		start: dateAdjuster(dateNow, { months: 1}),
		end: dateAdjuster(dateNow, { months: 1}),
		price: 100,
		seats: 20,
		image:
			"https://res.cloudinary.com/dh5vxixzn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682274836/cutefruit/product_images/clgtr03ia0000gksv9qx8g9iz.jpg",
		excerpt:
			"Enjoy a refreshing day at the Watermelon Summer Bash with live music, watermelon treats, fun activities like eating contests and carving, perfect for all ages to celebrate summer.",
		description: {
			document: [
				{
					type: "paragraph",
					children: [
						{
							text: "Dive into a day filled with watermelon-themed fun and festivities! Experience live music, interactive games, and delicious treats that highlight the refreshing taste of summer’s favorite fruit.",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "Tasty Watermelon Treats",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Savor a variety of watermelon-inspired delights, including:",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Freshly sliced watermelon",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Watermelon sorbet",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Watermelon coolers and smoothies",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "Exciting Activities and Games",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Get ready for a lineup of entertaining activities, such as:",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Watermelon eating contest",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Seed-spitting competition",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Watermelon carving showcase",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "Family-Friendly Fun",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Perfect for all ages, this event is designed to bring everyone together for a day of juicy fun. The Watermelon Summer Bash is your ultimate destination for a refreshing and memorable summer experience!",
						},
					],
				},
			],
		},
		status: "ACTIVE",
		location: {
			name: "Zesty Lounge",
		},
		hosts: [],
		cohosts: [],
		dateCreated: "2025-01-10T20:15:17.725Z",
		dateModified: "2025-01-10T20:15:17.725Z",
		categories: [],
		tags: [],
	},
	{
		summary: "Tropical Fruit Tasting Tour",
		start: dateAdjuster(dateNow, { months: 1, days: 5}),
		end: dateAdjuster(dateNow, { months: 1, days: 5}),
		price: 100,
		seats: 20,
		image:
			"https://res.cloudinary.com/dh5vxixzn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682275682/cutefruit/product_images/clgtri8ac00033ssve0n2do08.png",
		excerpt:
			"Join the Berry-Filled Festival for delicious treats, exciting competitions like pie-eating and berry-picking, live music, and family-friendly fun, promising a sweet, memorable day for all.",
		description: {
			document: [
				{
					type: "paragraph",
					children: [
						{
							text: "Get ready for a day packed with fruity fun and berry-filled delights!",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "What to Expect",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Tasty Treats",
										},
										{
											text: "\nIndulge in an array of mouthwatering goodies, including:",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Strawberry shortcakes",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Blueberry pies",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Raspberry lemonades",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Exciting Competitions",
										},
										{
											text: "\nParticipate in berry-themed challenges:",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Pie-eating contest",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Berry-picking challenge",
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "Entertainment for All",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Enjoy live music, games, and a festive atmosphere that’s perfect for the entire family.",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							bold: true,
							text: "Why Attend?",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Whether you’re a berry enthusiast or just looking for a fun-filled day, this family-friendly event guarantees a sweet and memorable experience!",
						},
					],
				},
			],
		},
		status: "ACTIVE",
		location: {
			name: "Hidden Valley",
		},
		hosts: [],
		cohosts: [],
		dateCreated: "2025-01-10T20:15:17.721Z",
		dateModified: "2025-01-10T20:15:17.721Z",
		categories: [],
		tags: [],
	},
	{
		summary: "PAST: Fruit Through the Ages",
		start: dateAdjuster(dateNow, { days: 1}),
		end: dateAdjuster(dateNow, { days: 1}),
		price: 0,
		seats: 100,
		image:
			"https://cdn.pixabay.com/photo/2016/12/10/21/28/plums-1898196_960_720.jpg",
		excerpt:
			"Combine the fruity fun with historical nostalgia! Each guest (or group) picks a fruit and dresses as how people in a specific time period might have celebrated or used that fruit.",
		description: {
			document: [
				{
					type: "heading",
					level: 3,
					children: [
						{
							bold: true,
							text: "Key Party Elements",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "🥭 ",
						},
						{
							bold: true,
							text: "Dress Code",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: 'Guests come as a "fruit with a past."',
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Examples:",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															bold: true,
															text: "Roman Grape God/Goddess",
														},
														{
															text: ": Togas with grape garlands.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															bold: true,
															text: "Medieval Apple Peasant",
														},
														{
															text: ": Rustic clothes with apples as accessories.",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															bold: true,
															text: "1970s Banana Boogie",
														},
														{
															text: ": Disco vibes in yellow!",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															bold: true,
															text: "Future Kiwi Warrior",
														},
														{
															text: ": Silver/space-age vibes with kiwi accents.",
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "🍉 ",
						},
						{
							bold: true,
							text: "Games & Activities",
						},
					],
				},
				{
					type: "ordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Fruit History Trivia",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: 'Fun facts about fruits (e.g., "What fruit was banned in 17th-century France?")',
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Fruit Peel Art Contest",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Who can make the funniest or most intricate art from fruit peels?",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Fruit Toss Relay",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Teams pass fruit items in goofy ways (spoons, elbows, etc.).",
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "🍋 ",
						},
						{
							bold: true,
							text: "Snacks & Drinks",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: '"Historical Smoothie Bar"',
										},
										{
											text: ": Drinks inspired by different eras (e.g., ancient Greek honey-and-fig smoothie, 1950s soda shop banana split milkshake).",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											bold: true,
											text: "Fruit Pizza Station",
										},
										{
											text: ': Guests can make their own "historical masterpiece" on a sugar cookie crust.',
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: 'Retro-themed fruit punches, like a 90s neon-blue "Blueberry Bomb."',
										},
									],
								},
							],
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 4,
					children: [
						{
							text: "🍍 ",
						},
						{
							bold: true,
							text: "Decor",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: 'Retro posters featuring fruit from famous eras (e.g., "The Great Grapefruit Gatsby").',
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Fruit-shaped balloons with vintage motifs.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Centerpieces made of fruit bowls styled like famous works of art (e.g., Renaissance still life).",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Funny Add-Ons",
						},
					],
				},
				{
					type: "unordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: 'Create "fruit personas" for guests: ',
										},
										{
											bold: true,
											text: '"Detective Clementine, 1940s Noir"',
										},
										{
											text: " or ",
										},
										{
											bold: true,
											text: '"80s Pineapple Rockstar"',
										},
										{
											text: "!",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Hand out gag prizes like ",
										},
										{
											bold: true,
											text: '"Best Use of a Banana"',
										},
										{
											text: " or ",
										},
										{
											bold: true,
											text: '"Most Historically Accurate Pear."',
										},
									],
								},
							],
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Would you like more details on any part of this? 😊",
						},
					],
				},
			],
		},
		status: "ACTIVE",
		location: {
			name: "Live Stream",
		},
		hosts: [],
		cohosts: [],
		dateCreated: "2025-01-20T22:50:57.604Z",
		dateModified: "2025-01-20T22:50:57.604Z",
		categories: [],
		tags: [],
	},
	{
		summary: "Banana Bread Bakeoff",
		start: dateAdjuster(dateNow, { days: 3}),
		end: dateAdjuster(dateNow, { days: 3}),
		price: 0,
		seats: 300,
		image:
			"https://cdn.pixabay.com/photo/2024/09/06/09/27/banana-9027011_1280.jpg",
		excerpt:
			"Think your banana bread is the best? Prove it! Join us for a fun-filled Banana Bread Bakeoff, where bakers and banana bread lovers unite for some friendly competition and delicious treats.",
		description: {
			document: [
				{
					type: "paragraph",
					children: [
						{
							text: "Join us as a guest or as baker. Either way we all win! 🍌🍞",
						},
					],
				},
				{
					type: "heading",
					level: 3,
					children: [
						{
							text: "Bakers",
						},
					],
				},
				{
					type: "ordered-list",
					children: [
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Bake your signature banana bread and bring it to the event.",
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Compete in categories like:",
										},
									],
								},
								{
									type: "unordered-list",
									children: [
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Best Overall",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Most Creative Twist",
														},
													],
												},
											],
										},
										{
											type: "list-item",
											children: [
												{
													type: "list-item-content",
													children: [
														{
															text: "Crowd Favorite",
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: "list-item",
							children: [
								{
									type: "list-item-content",
									children: [
										{
											text: "Taste, vote, and enjoy!",
										},
									],
								},
							],
						},
					],
				},
				{
					type: "heading",
					level: 2,
					children: [
						{
							text: "Guests",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "No need to slip on a peel. Enjoy the day by RSVP'ing.",
						},
					],
				},
				{
					type: "divider",
					children: [
						{
							text: "",
						},
					],
				},
				{
					type: "paragraph",
					children: [
						{
							text: "Prizes for winners and plenty of banana bread for everyone. Don’t miss out!",
						},
					],
				},
			],
		},
		status: "ACTIVE",
		location: {
			name: "Zesty Lounge",
		},
		hosts: [],
		cohosts: [],
		dateCreated: "2025-01-18T16:37:59.721Z",
		dateModified: "2025-01-18T16:37:59.721Z",
		categories: [],
		tags: [],
	},
]
// export const events_seedjson: SeedEvents[] = [
// 	{
// 		summary: "Apple Harvest Festival",
// 		start: `${todaysYear}-${todaysMonth}-30T10:00:00.000Z`,
// 		end: "2023-09-30T18:00:00.000Z",
// 		seats: 20,
// 		price: 100,
// 		excerpt:
// 			"Join us for a day of fruity fun at the Berrylicious Summer Festival! Celebrate the vibrant flavors of berries with live music, games, and mouthwatering treats. Indulge in delicious strawberry shortcakes, blueberry pies, and raspberry lemonades. Enjoy berry-themed competitions, such as a pie-eating contest and a berry picking challenge. This family-friendly event guarantees a sweet and memorable experience for all berry enthusiasts!",
// 		image:
// 			"https://res.cloudinary.com/dh5vxixzn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682290294/cutefruit/product_images/clgu07ezt0000jssvguqp688x.jpg",
// 		location: {
// 			name: "Honorary Orchards",
// 		},
// 		hosts: [{ email: "admin@tawtaw.site" }, { email: "eddy@tawtaw.site" }],
//     cohosts: [],
// 	},
// 	{
// 		summary: "Berrylicious Smoothie Workshop",
// 		start: `${todaysYear}-${todaysMonth}-15T15:00:00.000Z`,
// 		end: "2023-07-15T17:00:00.000Z",
// 		seats: 20,
// 		price: 100,
// 		excerpt:
// 			"Join us for a day of fruity fun at the Berrylicious Summer Festival! Celebrate the vibrant flavors of berries with live music, games, and mouthwatering treats. Indulge in delicious strawberry shortcakes, blueberry pies, and raspberry lemonades. Enjoy berry-themed competitions, such as a pie-eating contest and a berry picking challenge. This family-friendly event guarantees a sweet and memorable experience for all berry enthusiasts!",
// 		image:
// 			"https://res.cloudinary.com/dh5vxixzn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682290024/cutefruit/product_images/clgu01m7x0004dwsv0b05di5c.png",
// 		location: {
// 			name: "Zesty Lounge",
// 		},
// 		hosts: [{ email: "admin@tawtaw.site" }, { email: "eddy@tawtaw.site" }],
//     cohosts: [],
// 	},
// 	{
// 		summary: "Citrus Yoga Retreat",
// 		start: `${todaysYear}-${todaysMonth}-10T08:00:00.000Z`,
// 		end: "2023-06-12T18:00:00.000Z",
// 		seats: 20,
// 		price: 100,
// 		excerpt:
// 			"Join us for a day of fruity fun at the Berrylicious Summer Festival! Celebrate the vibrant flavors of berries with live music, games, and mouthwatering treats. Indulge in delicious strawberry shortcakes, blueberry pies, and raspberry lemonades. Enjoy berry-themed competitions, such as a pie-eating contest and a berry picking challenge. This family-friendly event guarantees a sweet and memorable experience for all berry enthusiasts!",
// 		image:
// 			"https://res.cloudinary.com/dh5vxixzn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682288910/cutefruit/product_images/clgtzdr2o0000dwsv5pe0hjiv.jpg",
// 		location: {
// 			name: "Hidden Valley",
// 		},
// 		hosts: [{ email: "admin@tawtaw.site" }],
// 		cohosts: [{ email: "arthur@tawtaw.site" }],
// 	},
// 	{
// 		summary: "Tropical Fruit Tasting Tour",
// 		start: `${todaysYear}-${chosenMonth}-05T11:00:00.000Z`,
// 		end: "2023-08-05T15:00:00.000Z",
// 		seats: 20,
// 		price: 100,
// 		excerpt:
// 			"Join us for a day of fruity fun at the Berrylicious Summer Festival! Celebrate the vibrant flavors of berries with live music, games, and mouthwatering treats. Indulge in delicious strawberry shortcakes, blueberry pies, and raspberry lemonades. Enjoy berry-themed competitions, such as a pie-eating contest and a berry picking challenge. This family-friendly event guarantees a sweet and memorable experience for all berry enthusiasts!",
// 		image:
// 			"https://res.cloudinary.com/dh5vxixzn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682275682/cutefruit/product_images/clgtri8ac00033ssve0n2do08.png",
// 		location: {
// 			name: "Hidden Valley",
// 		},
// 		hosts: [{ email: "admin@tawtaw.site" }],
// 		cohosts: [{ email: "arthur@tawtaw.site" }],
// 	},
// 	{
// 		summary: "Watermelon Summer Bash",
// 		start: `${todaysYear}-${chosenMonth}-01T16:00:00.000Z`,
// 		end: "2023-07-01T20:00:00.000Z",
// 		seats: 20,
// 		price: 100,
// 		excerpt:
// 			"Join us for a day of fruity fun at the Berrylicious Summer Festival! Celebrate the vibrant flavors of berries with live music, games, and mouthwatering treats. Indulge in delicious strawberry shortcakes, blueberry pies, and raspberry lemonades. Enjoy berry-themed competitions, such as a pie-eating contest and a berry picking challenge. This family-friendly event guarantees a sweet and memorable experience for all berry enthusiasts!",
// 		image:
// 			"https://res.cloudinary.com/dh5vxixzn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682274836/cutefruit/product_images/clgtr03ia0000gksv9qx8g9iz.jpg",
// 		location: {
// 			name: "Zesty Lounge",
// 		},
// 		hosts: [{ email: "admin@tawtaw.site" }],
// 		cohosts: [{ email: "arthur@tawtaw.site" }],
// 	},
// ]
