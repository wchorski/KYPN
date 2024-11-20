import type {
	UserCreateInput,
	RoleCreateInput,
	PageCreateInput,
	PostCreateInput,
	CategoryCreateInput,
	TagCreateInput,
	AnnouncementCreateInput,
} from ".keystone/types"

export const user_seeddata: UserCreateInput[] = [
	{
		name: "CuteFruitAdmin",
		email: "admin@tawtaw.site",
		authId: "admin@tawtaw.site",
		stripeCustomerId: undefined,
		password: "it5-a-secret-t0-everybodY",
		isVerified: true,
	},
	{
		name: "Eddy",
		email: "eddy@tawtaw.site",
		authId: "eddy@tawtaw.site",
		stripeCustomerId: undefined,
		password: "eddy@tawtaw.site",
		isVerified: true,
	},
	{
		name: "Cinda",
		email: "cinda@tawtaw.site",
		authId: "cinda@tawtaw.site",
		stripeCustomerId: undefined,
		password: "cinda@tawtaw.site",
		isVerified: true,
	},
]

// export const roles_seedjson:Lists.Role['fields'] = [
export const roles_seedjson: RoleCreateInput[] = [
	{
		name: "admin",
		label: "Admin",
		canSeeOtherUsers: true,
		canManageUsers: true,
		canManageRoles: true,
		canManagePosts: true,
		canManagePages: true,
		canManageCategories: true,
		canManageTags: true,
		canManageAnnouncements: true,
		assignedTo: {
			connect: {
				email: "admin@tawtaw.site",
			},
		},
	},
	{
		name: "editor",
		label: "Editor",
		canManagePosts: true,
		canManagePages: true,
    canManageCategories: true,
		canManageTags: true,
		assignedTo: {
			connect: {
				email: "eddy@tawtaw.site",
			},
		},
	},
	{
		name: "client",
		label: "Client",
		assignedTo: {
			connect: {
				email: "cinda@tawtaw.site",
			},
		},
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
		content: [
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
		content: [
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
									margin: "var(--space-m)",
									content: null,
									padding: 1,
									fontSize: "1",
									imageSrc:
										"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
									colorTheme: "bg_c_transparent",
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
									width: 0,
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
									margin: "1rem",
									content: null,
									padding: 1,
									fontSize: "1",
									imageSrc:
										"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
									colorTheme: "bg_c_plain",
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
						],
					},
					{
						type: "layout-area",
						children: [
							{
								type: "component-block",
								props: {
									width: "initial",
									margin: "var(--space-m)",
									content: null,
									padding: 1,
									fontSize: "1",
									imageSrc:
										"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
									colorTheme: "bg_c_plain",
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
						],
					},
					{
						type: "layout-area",
						children: [
							{
								type: "component-block",
								props: {
									width: "initial",
									margin: "var(--space-m)",
									content: null,
									padding: 1,
									fontSize: "1",
									imageSrc:
										"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
									colorTheme: "bg_c_plain",
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
						],
					},
				],
			},
			{
				type: "component-block",
				props: {
					content: null,
					imageSrc:
						"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
					colorTheme: "bg_c_secondary",
					paddingBlock: "10vh",
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
									width: 0,
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
									margin: "var(--space-m)",
									content: null,
									padding: 1,
									fontSize: "1",
									imageSrc:
										"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
									colorTheme: "bg_c_transparent",
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
									width: 200,
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
								type: "heading",
								level: 2,
								children: [
									{
										text: "Drop a Lime",
									},
								],
							},
							{
								type: "paragraph",
								children: [
									{
										text: "Let us know what our next big and bold flavor should be. ",
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
		content: [
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
]

export const posts_seedjson: PostCreateInput[] = [
	{
		title: "The Beauty of Fruit Art",
		slug: "fruit-art",
		dateCreated: "2023-09-30T14:00:00.000Z",
		dateModified: "2023-09-30T14:00:00.000Z",
		status: "PUBLIC",
		template: "FULLWIDTH",
		pinned: 0,
		excerpt:
			"Discover the creative and beautiful world of fruit art, from simple designs like watermelon baskets to intricate sculptures made from a variety of fruits.",
		featured_image:
			"https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118261/cutefruit/banners/cf-banner-8_muquqs.png",
		featured_video: "",
		// TODO make meaningful and relevant tags and cats
		tags: {
			connect: [
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
			],
		},
		categories: {
			connect: [
				{
					name: "pomes",
				},
				{
					name: "drupes",
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
		},
		content: [
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
	// {
	// 	title: "The Best Fruits for a Summer Picnic",
	// 	slug: "fruits-summer-picnic",
	// 	dateCreated: "2023-11-20T12:30:00.000Z",
	// 	dateModified: "2023-12-05T16:45:00.000Z",
	// 	status: "PUBLIC",
	// 	template: "FULLWIDTH",
	// 	pinned: 0,
	// 	excerpt:
	// 		"Get ready for your next summer picnic with this guide to the best fruits to pack, including watermelon, cherries, and grapes.",
	// 	featured_image:
	// 		"https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118262/cutefruit/banners/cf-banner-3_uuufb0.png",
	// 	featured_video: "",
	// 	content: [
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	author: {
	// 		connect: {
	// 			email: "admin@tawtaw.site",
	// 		},
	// 	},
	// 	// "privateAccess": []
	// 	tags: {
	// 		connect: [
	// 			{
	// 				name: "blue",
	// 			},
	// 			{
	// 				name: "red",
	// 			},
	// 			{
	// 				name: "green",
	// 			},
	// 			{
	// 				name: "orange",
	// 			},
	// 			{
	// 				name: "cluster",
	// 			},
	// 			{
	// 				name: "nutrition",
	// 			},
	// 			{
	// 				name: "snack",
	// 			},
	// 		],
	// 	},
	// 	categories: {
	// 		connect: [
	// 			{
	// 				name: "berries",
	// 			},
	// 			{
	// 				name: "melons",
	// 			},
	// 			{
	// 				name: "citrus",
	// 			},
	// 			{
	// 				name: "tropical",
	// 			},
	// 		],
	// 	},
	// },
	// {
	// 	title: "The Many Uses of Pomegranates",
	// 	slug: "uses-pomegranates",
	// 	dateCreated: "2023-10-15T10:00:00.000Z",
	// 	dateModified: "2024-11-14T20:50:31.227Z",
	// 	status: "PUBLIC",
	// 	template: "FULLWIDTH",
	// 	pinned: 0,
	// 	excerpt:
	// 		"Discover the many culinary and medicinal uses of pomegranates, including how to juice them and use their seeds in recipes.",
	// 	featured_image:
	// 		"https://cdn.pixabay.com/photo/2023/09/20/12/12/ai-generated-8264735_960_720.png",
	// 	featured_video: "",
	// 	content: [
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Pomegranates aren't just a fall treat; they're versatile, health-boosting, and add vibrancy to food, skincare, and even home decor. Let's explore a few ways to enjoy this jewel-toned fruit.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Culinary Uses",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					bold: true,
	// 					text: "Juices and Smoothies",
	// 				},
	// 				{
	// 					text: "\nA refreshing antioxidant boost, pomegranate juice is perfect on its own, in smoothies, or cocktails.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					bold: true,
	// 					text: "Salads and Garnishes",
	// 				},
	// 				{
	// 					text: "\nSprinkle pomegranate seeds over salads for a hint of sweetness, crunch, and color. They pair beautifully with greens, nuts, and cheese—try a mix with kale and feta.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				intent: "error",
	// 				content: null,
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Cooking with Pomegranate Molasses",
	// 								},
	// 							],
	// 						},
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "Tangy and thick, pomegranate molasses is perfect for marinades and glazes, adding depth to dishes like roasted veggies, chicken, or lamb.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "callout",
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Health and Wellness Benefits",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				alt: "",
	// 				color: "lightgray",
	// 				width: 0,
	// 				border: 0,
	// 				padding: 1,
	// 				imageSrc:
	// 					"https://media.giphy.com/media/3osBLwx8M3B8e4cyk0/giphy.gif?cid=790b761105bfik4fopoesc8cjtyjb9icdpkva3x8xe27jyzi&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "image",
	// 		},
	// 		{
	// 			type: "layout",
	// 			layout: [1, 1],
	// 			children: [
	// 				{
	// 					type: "layout-area",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Packed with Antioxidants",
	// 								},
	// 								{
	// 									text: "\nPomegranates are high in vitamin C and antioxidants, which fight inflammation and boost immunity, making them a great addition to daily smoothies or snacks.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "layout-area",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Skin Care",
	// 								},
	// 								{
	// 									text: "\nRich in antioxidants, pomegranate seed oil is a popular addition to skincare for its ability to repair skin and reduce fine lines.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				color: "black",
	// 				content: null,
	// 				imageSrc:
	// 					"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
	// 				backgroundColor: "peachpuff",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "heading",
	// 							level: 4,
	// 							children: [
	// 								{
	// 									text: "Home and Decorative Uses",
	// 								},
	// 							],
	// 						},
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Natural Centerpiece",
	// 								},
	// 								{
	// 									text: "\nPomegranates' vibrant color makes them a stunning, natural table centerpiece, especially when mixed with candles or fall decor.",
	// 								},
	// 							],
	// 						},
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "DIY Dried Garland",
	// 								},
	// 								{
	// 									text: "\nCreate a festive pomegranate and eucalyptus garland for an aromatic, seasonal touch in your home.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "section",
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Fun DIY Ideas",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					bold: true,
	// 					text: "Natural Dye",
	// 				},
	// 				{
	// 					text: "\nBoil pomegranate rinds to create a soft yellow dye, perfect for fabric.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					bold: true,
	// 					text: "Pomegranate Stamps",
	// 				},
	// 				{
	// 					text: "\nCut a pomegranate in half, dip in paint, and stamp onto paper or fabric for a fun, geometric print.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Final Thoughts",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "From health benefits to creative DIYs, pomegranates bring so much more to the table than meets the eye. Next time, think beyond the snack!",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	author: {
	// 		connect: {
	// 			email: "admin@tawtaw.site",
	// 		},
	// 	},
	// 	// "privateAccess": []
	// 	tags: {
	// 		connect: [
	// 			{
	// 				name: "red",
	// 			},
	// 			{
	// 				name: "purple",
	// 			},
	// 			{
	// 				name: "cluster",
	// 			},
	// 			{
	// 				name: "nutrition",
	// 			},
	// 			{
	// 				name: "snack",
	// 			},
	// 		],
	// 	},
	// 	categories: {
	// 		connect: [
	// 			{
	// 				name: "berries",
	// 			},
	// 		],
	// 	},
	// },
	// {
	// 	title: "The World of Tropical Fruits",
	// 	slug: "tropical-fruits",
	// 	dateCreated: "2023-12-05T16:45:00.000Z",
	// 	dateModified: "2024-11-04T20:38:34.875Z",
	// 	status: "PUBLIC",
	// 	template: "WITHSIDEBAR",
	// 	pinned: 0,
	// 	excerpt:
	// 		"Explore the amazing diversity of tropical fruits, including mangos, pineapples, and papayas, and learn about their health benefits and culinary uses.",
	// 	featured_image:
	// 		"https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118261/cutefruit/banners/cf-banner-4_a1mzp8.png",
	// 	featured_video: "",
	// 	content: [
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "When you think of tropical fruits, images of vibrant colors, unique shapes, and tantalizing tastes may come to mind. These fruits not only bring a splash of color and flavor to our plates but are also packed with nutrients that contribute to a healthier lifestyle. Let's dive into the world of tropical fruits and discover some of the most exotic varieties out there!",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "Why Tropical Fruits?",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Tropical fruits often have:",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "High water content",
	// 								},
	// 								{
	// 									text: " – Great for hydration!",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Rich antioxidants",
	// 								},
	// 								{
	// 									text: " – Boosts immunity.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Unique flavors",
	// 								},
	// 								{
	// 									text: " – From sweet to sour, tropical fruits cover all taste profiles.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Whether you’re sipping on a smoothie or adding them to a salad, these fruits add a refreshing touch to any meal.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				alt: "",
	// 				color: "lightgray",
	// 				width: 0,
	// 				border: 0,
	// 				padding: 1,
	// 				imageSrc:
	// 					"https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3hjeG05Z25tbDd1cnpsZDlkcjh6bzNxOXNlaGE0aXZobTlnMXlzbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l378yCCaMVfzb60HS/giphy.gif",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "image",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "Popular Tropical Fruits",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Here are some of the most popular tropical fruits and why they're worth trying!",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "1. ",
	// 				},
	// 				{
	// 					bold: true,
	// 					text: "Mango",
	// 				},
	// 				{
	// 					text: " ",
	// 				},
	// 				{
	// 					text: "(Mangifera indica)",
	// 					italic: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Taste",
	// 								},
	// 								{
	// 									text: ": Sweet, with hints of floral and citrus.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Nutrition",
	// 								},
	// 								{
	// 									text: ": High in Vitamin C, Vitamin A, and fiber.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Fun Fact",
	// 								},
	// 								{
	// 									text: ': Known as the "king of fruits" in many parts of Asia!',
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "blockquote",
	// 			children: [
	// 				{
	// 					type: "paragraph",
	// 					children: [
	// 						{
	// 							text: '"The mango\'s unique sweetness and versatility make it a top choice for fruit lovers worldwide."',
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "2. ",
	// 				},
	// 				{
	// 					bold: true,
	// 					text: "Pineapple",
	// 				},
	// 				{
	// 					text: " ",
	// 				},
	// 				{
	// 					text: "(Ananas comosus)",
	// 					italic: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Taste",
	// 								},
	// 								{
	// 									text: ": A blend of sweet and tangy.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Nutrition",
	// 								},
	// 								{
	// 									text: ": Loaded with bromelain, an enzyme that aids digestion.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Did you know?",
	// 								},
	// 								{
	// 									text: " Pineapples take up to 2 years to mature!",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					bold: true,
	// 					text: "Recipe Idea:",
	// 				},
	// 				{
	// 					text: "\nTry grilling pineapple slices for a delicious smoky flavor. Perfect as a side dish or dessert!",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "3. ",
	// 				},
	// 				{
	// 					bold: true,
	// 					text: "Dragon Fruit",
	// 				},
	// 				{
	// 					text: " ",
	// 				},
	// 				{
	// 					text: "(Hylocereus undatus)",
	// 					italic: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Appearance",
	// 								},
	// 								{
	// 									text: ": Bright pink or yellow skin with green scales.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Taste",
	// 								},
	// 								{
	// 									text: ": Mildly sweet with a kiwi-like texture.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Health Benefits",
	// 								},
	// 								{
	// 									text: ": Rich in antioxidants and Vitamin C.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Tip: Scoop out the flesh and use it in a smoothie bowl for a beautiful breakfast!",
	// 					italic: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "4. ",
	// 				},
	// 				{
	// 					bold: true,
	// 					text: "Papaya",
	// 				},
	// 				{
	// 					text: " ",
	// 				},
	// 				{
	// 					text: "(Carica papaya)",
	// 					italic: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Taste",
	// 								},
	// 								{
	// 									text: ": Soft, buttery texture with a mild sweetness.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Nutritional Highlight",
	// 								},
	// 								{
	// 									text: ": Contains the enzyme papain, which helps in protein digestion.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Quick Tip",
	// 								},
	// 								{
	// 									text: ": Add a squeeze of lime juice to enhance its flavor.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "Lesser-Known Tropical Fruits",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "While mangoes and pineapples are well-known, there are other tropical gems to explore:",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					bold: true,
	// 					text: "Rambutan",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Looks",
	// 								},
	// 								{
	// 									text: ": Red and hairy!",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Taste",
	// 								},
	// 								{
	// 									text: ": Sweet and juicy, similar to lychee.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Fun Fact",
	// 								},
	// 								{
	// 									text: ": Despite its intimidating appearance, the rambutan is a favorite in Southeast Asia.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					bold: true,
	// 					text: "Mangosteen",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Taste",
	// 								},
	// 								{
	// 									text: ": A perfect balance of sweet and sour.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Nutrition",
	// 								},
	// 								{
	// 									text: ": High in xanthones, known for their antioxidant properties.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Note",
	// 								},
	// 								{
	// 									text: ": Mangosteen is known as the “queen of fruits” and is often paired with mango, the king.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "Tips for Buying and Storing Tropical Fruits",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "ordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Buy fresh",
	// 								},
	// 								{
	// 									text: " – Check for firmness and aroma.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Avoid bruises",
	// 								},
	// 								{
	// 									text: " – Look for intact skins.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Store properly",
	// 								},
	// 								{
	// 									text: " – Some tropical fruits, like bananas and pineapples, ripen best at room temperature.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "blockquote",
	// 			children: [
	// 				{
	// 					type: "paragraph",
	// 					children: [
	// 						{
	// 							text: "Pro Tip:",
	// 							italic: true,
	// 						},
	// 						{
	// 							text: " Many tropical fruits can be frozen. Slice and freeze for smoothies or desserts!",
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "Conclusion",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "The world of tropical fruits is a vibrant adventure for your taste buds and your health. From juicy mangoes to nutrient-rich dragon fruits, each variety brings its unique benefits and flavors. So, the next time you’re at the market, why not try something new?",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					bold: true,
	// 					text: "Enjoy the taste of the tropics, one bite at a time!",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	author: {
	// 		connect: {
	// 			email: "admin@tawtaw.site",
	// 		},
	// 	},
	// 	// "privateAccess": [],
	// 	tags: {
	// 		connect: [
	// 			{
	// 				name: "yellow",
	// 			},
	// 			{
	// 				name: "green",
	// 			},
	// 			{
	// 				name: "orange",
	// 			},
	// 			{
	// 				name: "leaf",
	// 			},
	// 			{
	// 				name: "cluster",
	// 			},
	// 			{
	// 				name: "nutrition",
	// 			},
	// 		],
	// 	},
	// 	categories: {
	// 		connect: [
	// 			{
	// 				name: "drupes",
	// 			},
	// 			{
	// 				name: "citrus",
	// 			},
	// 			{
	// 				name: "tropical",
	// 			},
	// 		],
	// 	},
	// },
	// {
	// 	title: "The Sweet and Sour World of Citrus Fruits",
	// 	slug: "sweet-sour-citrus-fruits",
	// 	dateCreated: "2023-04-17T14:00:00.000Z",
	// 	dateModified: "2024-08-26T16:56:52.752Z",
	// 	status: "PUBLIC",
	// 	template: "WITHSIDEBAR",
	// 	pinned: 0,
	// 	excerpt:
	// 		"Discover the delicious and tangy world of citrus fruits, from lemons and limes to oranges and grapefruits.",
	// 	featured_image:
	// 		"https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118260/cutefruit/banners/cf-banner-15_w0csbb.jpg",
	// 	featured_video: "",
	// 	content: [
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Citrus fruits are a vibrant family of fruits known for their refreshing flavors and nutritional benefits. From the tangy taste of lemons to the sweetness of oranges, these fruits add a burst of flavor to our daily lives. In this post, we'll explore some of the most popular citrus fruits, their unique characteristics, and their surprising uses.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "🍊 Oranges: The All-Time Favorite",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				alt: "",
	// 				color: "lightgray",
	// 				width: 0,
	// 				border: 0,
	// 				padding: 1,
	// 				imageSrc:
	// 					"https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_600/ncom/en_US/games/switch/p/pikmin-3-deluxe-switch/description-image",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "image",
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Oranges are perhaps the most well-known citrus fruit. Not only are they delicious, but they are also packed with vitamin C. Here's a quick overview:",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Scientific Name",
	// 								},
	// 								{
	// 									text: ": ",
	// 								},
	// 								{
	// 									text: "Citrus sinensis",
	// 									italic: true,
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Flavor",
	// 								},
	// 								{
	// 									text: ": Sweet, with a hint of tartness",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Uses",
	// 								},
	// 								{
	// 									text: ": Juice, salads, desserts",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "blockquote",
	// 			children: [
	// 				{
	// 					type: "paragraph",
	// 					children: [
	// 						{
	// 							text: '"An orange a day keeps the doctor away."\n— A twist on the classic saying',
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Oranges are incredibly versatile. You can enjoy them as a snack, squeeze them into juice, or even use their zest to add flavor to baked goods.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				intent: "success",
	// 				content: null,
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Fun Fact: ",
	// 								},
	// 								{
	// 									text: "Oranges are actually a hybrid of pomelo and mandarin!",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "callout",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "🍋 Lemons: The Zesty Powerhouse",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				alt: "",
	// 				color: "lightgray",
	// 				width: 0,
	// 				border: 0,
	// 				padding: 1,
	// 				imageSrc:
	// 					"https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/c_scale,w_700/ncom/software/switch/70010000005302/a6260af9456f2e4a87b5b3e186678cf2780a3f367ba968d790ac3918e5e4b636",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "image",
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Lemons are known for their sharp, tangy flavor. They are a kitchen staple for their ability to brighten up any dish.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "Why We Love Lemons:",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "ordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Rich in Vitamin C",
	// 								},
	// 								{
	// 									text: ": Boosts the immune system",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Detoxifying",
	// 								},
	// 								{
	// 									text: ": Great for cleansing the body",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Flavor Enhancer",
	// 								},
	// 								{
	// 									text: ": A squeeze of lemon can elevate the taste of many dishes",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					bold: true,
	// 					text: "Tip",
	// 				},
	// 				{
	// 					text: ":\nAdd a slice of lemon to your water for a refreshing twist!",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Lemons are not just for eating—they're also great for cleaning! The acidity of lemon juice makes it a natural disinfectant.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "🍈 Grapefruits: The Bittersweet Contender",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Grapefruits have a unique flavor profile, combining bitterness with a touch of sweetness. They are an acquired taste for some but highly prized for their health benefits.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "Nutritional Benefits:",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "High in Antioxidants",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Supports Weight Loss",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Promotes Healthy Skin",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "blockquote",
	// 			children: [
	// 				{
	// 					type: "paragraph",
	// 					children: [
	// 						{
	// 							text: "Did you know?\nGrapefruit can interact with certain medications, so it's important to consult with a doctor if you're on prescription meds.",
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "Recipe Highlight:",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Try a ",
	// 				},
	// 				{
	// 					bold: true,
	// 					text: "grapefruit salad",
	// 				},
	// 				{
	// 					text: " with avocado, honey, and a sprinkle of sea salt for a refreshing, healthy dish.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "🍊 Mandarins: The Sweet Little Sibling",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Mandarins are small, easy-to-peel, and perfect for snacking. They are less acidic than other citrus fruits, making them a favorite among kids and adults alike.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "Quick Facts:",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Scientific Name",
	// 								},
	// 								{
	// 									text: ": ",
	// 								},
	// 								{
	// 									text: "Citrus reticulata",
	// 									italic: true,
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Varieties",
	// 								},
	// 								{
	// 									text: ": Clementines, tangerines, satsumas",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Best Season",
	// 								},
	// 								{
	// 									text: ": Winter",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "Did You Know?",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Mandarins are one of the oldest cultivated fruits, with origins dating back to ancient China.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "Conclusion",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Citrus fruits are a delightful blend of sweet, sour, and sometimes bitter flavors. Whether you prefer the sweetness of oranges or the zing of lemons, there's a citrus fruit for everyone. So next time you're at the grocery store, pick up a few and enjoy the sweet and sour world of citrus!",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	author: {
	// 		connect: {
	// 			email: "admin@tawtaw.site",
	// 		},
	// 	},
	// 	// "privateAccess": [],
	// 	tags: {
	// 		connect: [
	// 			{
	// 				name: "yellow",
	// 			},

	// 			{
	// 				name: "orange",
	// 			},
	// 			{
	// 				name: "leaf",
	// 			},

	// 			{
	// 				name: "nutrition",
	// 			},
	// 		],
	// 	},
	// 	categories: {
	// 		connect: [
	// 			{
	// 				name: "drupes",
	// 			},

	// 			{
	// 				name: "citrus",
	// 			},
	// 		],
	// 	},
	// },
	// {
	// 	title: "The Beauty and Benefits of Dragon Fruit",
	// 	slug: "dragon-fruit-beauty-benefits",
	// 	dateCreated: "2024-01-12T09:15:00.000Z",
	// 	dateModified: "2024-11-14T20:48:53.471Z",
	// 	status: "PUBLIC",
	// 	template: "WITHSIDEBAR",
	// 	pinned: 0,
	// 	excerpt:
	// 		"Discover the unique appearance and nutritional benefits of dragon fruit, also known as pitaya, and learn how to incorporate it into your diet.",
	// 	featured_image:
	// 		"https://cdn.pixabay.com/photo/2024/07/03/09/23/ai-generated-8869297_960_720.jpg",
	// 	featured_video: "",
	// 	content: [
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "The Beauty and Benefits of Dragon Fruit",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Dragon fruit, also known as pitaya, is not just a feast for the eyes; it's also a nutritional powerhouse. In this post, we'll explore the beauty and myriad benefits of this exotic fruit.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "What is Dragon Fruit?",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "![Dragon Fruit](https://example.com/dragon-fruit.jpg)\n",
	// 				},
	// 				{
	// 					text: "The vibrant exterior of dragon fruit makes it a standout in any fruit bowl.",
	// 					italic: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Dragon fruit comes from several different cactus species, predominantly the ",
	// 				},
	// 				{
	// 					text: "Hylocereus",
	// 					italic: true,
	// 				},
	// 				{
	// 					text: " and ",
	// 				},
	// 				{
	// 					text: "Selenicereus",
	// 					italic: true,
	// 				},
	// 				{
	// 					text: " varieties. Its unique appearance—bright pink or yellow skin with green-tipped scales—makes it a favorite among food lovers and photographers alike.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "Nutritional Profile",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Dragon fruit is low in calories but packed with nutrients. Here’s a quick breakdown of its nutritional benefits:",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "\n| Protein            | 1g               |\n| Fat                | 0.1g             |\n| Fiber              | 3g               |\n| Vitamin C          | 5% DV            |\n| Calcium            | 1% DV            |\n| Iron               | 4% DV            |",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				rows: [
	// 					{
	// 						cells: [
	// 							{
	// 								text: "Calories",
	// 							},
	// 							{
	// 								text: "60",
	// 							},
	// 						],
	// 					},
	// 					{
	// 						cells: [
	// 							{
	// 								text: "Carbohydrates",
	// 							},
	// 							{
	// 								text: "13g",
	// 							},
	// 						],
	// 					},
	// 					{
	// 						cells: [
	// 							{
	// 								text: "Protein",
	// 							},
	// 							{
	// 								text: "1g",
	// 							},
	// 						],
	// 					},
	// 					{
	// 						cells: [
	// 							{
	// 								text: "Fat",
	// 							},
	// 							{
	// 								text: "0.1g",
	// 							},
	// 						],
	// 					},
	// 					{
	// 						cells: [
	// 							{
	// 								text: "Fiber",
	// 							},
	// 							{
	// 								text: "3g",
	// 							},
	// 						],
	// 					},
	// 					{
	// 						cells: [
	// 							{
	// 								text: "Vitamin C",
	// 							},
	// 							{
	// 								text: "5% DV",
	// 							},
	// 						],
	// 					},
	// 					{
	// 						cells: [
	// 							{
	// 								text: "Calcium",
	// 							},
	// 							{
	// 								text: "1% DV",
	// 							},
	// 						],
	// 					},
	// 					{
	// 						cells: [
	// 							{
	// 								text: "Iron",
	// 							},
	// 							{
	// 								text: "4% DV",
	// 							},
	// 						],
	// 					},
	// 				],
	// 				caption: "",
	// 				headers: [
	// 					{
	// 						text: "Nutrient",
	// 					},
	// 					{
	// 						text: "Amount per 100g",
	// 					},
	// 				],
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "table",
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "Health Benefits",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "ordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Rich in Antioxidants",
	// 								},
	// 								{
	// 									text: "\nDragon fruit is loaded with antioxidants, such as vitamin C and flavonoids, which help combat oxidative stress in the body.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Supports Digestive Health",
	// 								},
	// 								{
	// 									text: "\nThe high fiber content aids digestion and can help prevent constipation.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Boosts Immune System",
	// 								},
	// 								{
	// 									text: "\nWith its high vitamin C content, dragon fruit can strengthen your immune system, making you less susceptible to illness.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Promotes Healthy Skin",
	// 								},
	// 								{
	// 									text: "\nThe antioxidants and vitamin C in dragon fruit can contribute to glowing skin and help reduce signs of aging.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "May Aid Weight Loss",
	// 								},
	// 								{
	// 									text: "\nLow in calories and high in fiber, dragon fruit can help you feel fuller for longer, making it a great addition to a weight loss diet.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "How to Enjoy Dragon Fruit",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Dragon fruit can be enjoyed in various ways:",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Raw",
	// 								},
	// 								{
	// 									text: ": Simply cut it in half and scoop out the flesh with a spoon.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Smoothies",
	// 								},
	// 								{
	// 									text: ": Blend it with other fruits for a refreshing drink.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Salads",
	// 								},
	// 								{
	// 									text: ": Add it to fruit salads for a pop of color and flavor.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Desserts",
	// 								},
	// 								{
	// 									text: ": Use it in sorbets or as a topping for yogurt.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "Conclusion",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Dragon fruit is not only visually stunning but also packed with health benefits. Incorporating it into your diet can provide essential nutrients and contribute to overall well-being. So why not add a little color to your plate with this exotic fruit?",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					bold: true,
	// 					text: "Have you tried dragon fruit? Share your favorite ways to enjoy it in the comments below!",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "References",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									text: "",
	// 								},
	// 								{
	// 									href: "https://example.com/nutrition",
	// 									type: "link",
	// 									children: [
	// 										{
	// 											text: "Nutrition Data",
	// 										},
	// 									],
	// 								},
	// 								{
	// 									text: "",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									text: "",
	// 								},
	// 								{
	// 									href: "https://example.com/health-benefits",
	// 									type: "link",
	// 									children: [
	// 										{
	// 											text: "Health Benefits of Dragon Fruit",
	// 										},
	// 									],
	// 								},
	// 								{
	// 									text: "",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	author: {
	// 		connect: {
	// 			email: "admin@tawtaw.site",
	// 		},
	// 	},
	// 	// "privateAccess": [],
	// 	tags: {
	// 		connect: [
	// 			{
	// 				name: "red",
	// 			},
	// 			{
	// 				name: "purple",
	// 			},

	// 			{
	// 				name: "leaf",
	// 			},
	// 			{
	// 				name: "nutrition",
	// 			},
	// 			{
	// 				name: "snack",
	// 			},
	// 		],
	// 	},
	// 	categories: {
	// 		connect: [
	// 			{
	// 				name: "tropical",
	// 			},
	// 		],
	// 	},
	// },
	// {
	// 	title: "Fruit and Cheese Pairings for a Perfect Charcuterie Board",
	// 	slug: "fruit-cheese-pairings-charcuterie-board",
	// 	dateCreated: "2024-02-28T14:00:00.000Z",
	// 	dateModified: "2024-11-14T20:49:34.746Z",
	// 	status: "PUBLIC",
	// 	template: "WITHSIDEBAR",
	// 	pinned: 0,
	// 	excerpt:
	// 		"Take your charcuterie board to the next level with these delicious fruit and cheese pairings, featuring combinations like figs and goat cheese and apples and cheddar.",
	// 	featured_image:
	// 		"https://cdn.pixabay.com/photo/2023/08/19/23/46/ai-generated-8201391_960_720.png",
	// 	featured_video: "",
	// 	content: [
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "Why Pair Fruit and Cheese?",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Combining fruit with cheese not only enhances the taste but also adds a pop of color to your board. The sweetness of the fruit can balance the saltiness or creaminess of the cheese, creating a harmonious flavor profile.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "Tips for Choosing Fruits and Cheeses",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "ordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Seasonality",
	// 								},
	// 								{
	// 									text: ": Use seasonal fruits for the freshest flavors.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Variety",
	// 								},
	// 								{
	// 									text: ": Incorporate a range of textures and flavors—think creamy, crumbly, sharp, and sweet.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Presentation",
	// 								},
	// 								{
	// 									text: ": Cut fruits into bite-sized pieces for easy serving and enjoyment.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "Perfect Pairings",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Here are some delightful fruit and cheese pairings that will impress your guests:",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "1. ",
	// 				},
	// 				{
	// 					bold: true,
	// 					text: "Brie + Fresh Berries",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Cheese",
	// 								},
	// 								{
	// 									text: ": Creamy Brie",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Fruit",
	// 								},
	// 								{
	// 									text: ": Strawberries, blueberries, or raspberries",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Why it works",
	// 					italic: true,
	// 				},
	// 				{
	// 					text: ": The richness of Brie complements the tartness of fresh berries, making for a light and refreshing pairing.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "2. ",
	// 				},
	// 				{
	// 					bold: true,
	// 					text: "Aged Cheddar + Apples",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Cheese",
	// 								},
	// 								{
	// 									text: ": Sharp aged cheddar",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Fruit",
	// 								},
	// 								{
	// 									text: ": Crisp apples (like Honeycrisp or Granny Smith)",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Why it works",
	// 					italic: true,
	// 				},
	// 				{
	// 					text: ": The sharpness of the cheddar enhances the crisp, sweet-tart flavors of the apples, creating a satisfying crunch.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "3. ",
	// 				},
	// 				{
	// 					bold: true,
	// 					text: "Goat Cheese + Fig Jam",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Cheese",
	// 								},
	// 								{
	// 									text: ": Soft goat cheese",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Fruit",
	// 								},
	// 								{
	// 									text: ": Figs or fig jam",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Why it works",
	// 					italic: true,
	// 				},
	// 				{
	// 					text: ": The creamy texture of goat cheese combined with the sweetness of figs provides a delightful contrast, perfect for spreading on crackers.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "4. ",
	// 				},
	// 				{
	// 					bold: true,
	// 					text: "Gorgonzola + Pears",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Cheese",
	// 								},
	// 								{
	// 									text: ": Blue-veined Gorgonzola",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Fruit",
	// 								},
	// 								{
	// 									text: ": Sliced ripe pears",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Why it works",
	// 					italic: true,
	// 				},
	// 				{
	// 					text: ": The strong, pungent flavor of Gorgonzola pairs beautifully with the sweet, juicy pears, creating a rich flavor experience.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "5. ",
	// 				},
	// 				{
	// 					bold: true,
	// 					text: "Manchego + Quince Paste",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Cheese",
	// 								},
	// 								{
	// 									text: ": Manchego",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Fruit",
	// 								},
	// 								{
	// 									text: ": Quince paste or slices",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Why it works",
	// 					italic: true,
	// 				},
	// 				{
	// 					text: ": The nutty, buttery flavor of Manchego is perfectly complemented by the sweet, floral notes of quince.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "Additional Pairing Ideas",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Havarti + Grapes",
	// 								},
	// 								{
	// 									text: ": The creamy texture of Havarti goes well with juicy grapes.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Parmesan + Dried Apricots",
	// 								},
	// 								{
	// 									text: ": The salty, nutty flavors of Parmesan contrast with the sweetness of dried apricots.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Feta + Watermelon",
	// 								},
	// 								{
	// 									text: ": The briny flavor of feta is enhanced by the sweetness of watermelon, making it a perfect summer combo.",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "Final Thoughts",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "When building your charcuterie board, remember that variety is key. Mixing different cheeses and fruits not only enhances the visual appeal but also ensures that there’s something for everyone to enjoy. Experiment with these pairings and find your favorite combinations!",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "Share Your Board!",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "What are your favorite fruit and cheese pairings? Share your ideas in the comments below, and let’s inspire each other for our next charcuterie board creation!",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Happy pairing! 🍇🧀",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	author: {
	// 		connect: {
	// 			email: "admin@tawtaw.site",
	// 		},
	// 	},
	// 	// "privateAccess": [],
	// 	tags: {
	// 		connect: [
	// 			{
	// 				name: "blue",
	// 			},
	// 			{
	// 				name: "yellow",
	// 			},
	// 			{
	// 				name: "red",
	// 			},
	// 			{
	// 				name: "purple",
	// 			},
	// 			{
	// 				name: "white",
	// 			},
	// 			{
	// 				name: "black",
	// 			},
	// 			{
	// 				name: "green",
	// 			},
	// 			{
	// 				name: "orange",
	// 			},
	// 			{
	// 				name: "leaf",
	// 			},
	// 			{
	// 				name: "cluster",
	// 			},
	// 			{
	// 				name: "nutrition",
	// 			},
	// 			{
	// 				name: "snack",
	// 			},
	// 		],
	// 	},
	// 	categories: {
	// 		connect: [
	// 			{
	// 				name: "pomes",
	// 			},
	// 			{
	// 				name: "drupes",
	// 			},
	// 			{
	// 				name: "berries",
	// 			},
	// 			{
	// 				name: "melons",
	// 			},
	// 			{
	// 				name: "citrus",
	// 			},
	// 			{
	// 				name: "tropical",
	// 			},
	// 		],
	// 	},
	// },
	// {
	// 	title: "The Wonderful World of Apples",
	// 	slug: "wonderful-world-apples",
	// 	dateCreated: "2023-08-22T09:15:00.000Z",
	// 	dateModified: "2023-08-22T09:15:00.000Z",
	// 	status: "PUBLIC",
	// 	template: "FULLWIDTH",
	// 	pinned: 0,
	// 	excerpt:
	// 		"Explore the diverse world of apples, from sweet and crisp varieties like Honeycrisp and Pink Lady to tart and tangy options like Granny Smith and Braeburn.",
	// 	featured_image:
	// 		"https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118262/cutefruit/banners/cf-banner-9_kybrry.png",
	// 	featured_video: "",
	// 	content: [
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	author: {
	// 		connect: {
	// 			email: "admin@tawtaw.site",
	// 		},
	// 	},
	// 	// "privateAccess": [],
	// 	tags: {
	// 		connect: [
	// 			{
	// 				name: "yellow",
	// 			},
	// 			{
	// 				name: "red",
	// 			},

	// 			{
	// 				name: "green",
	// 			},

	// 			{
	// 				name: "leaf",
	// 			},

	// 			{
	// 				name: "nutrition",
	// 			},
	// 			{
	// 				name: "snack",
	// 			},
	// 		],
	// 	},
	// 	categories: {
	// 		connect: [
	// 			{
	// 				name: "pomes",
	// 			},
	// 		],
	// 	},
	// },
	// {
	// 	title: "Fruity Suprise",
	// 	slug: "fruity-suprise",
	// 	dateCreated: "2022-08-24T14:00:00.000Z",
	// 	dateModified: "2022-08-24T14:00:00.000Z",
	// 	status: "PUBLIC",
	// 	template: "FULLWIDTH",
	// 	pinned: 0,
	// 	excerpt:
	// 		"A delightful suprise in every box. Get to know your fruity friends.",
	// 	featured_image:
	// 		"https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118260/cutefruit/banners/cf-banner-16_znh0zo.jpg",
	// 	featured_video: "",
	// 	content: [
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	author: {
	// 		connect: {
	// 			email: "admin@tawtaw.site",
	// 		},
	// 	},
	// 	// "privateAccess": [],
	// 	tags: {
	// 		connect: [
	// 			{
	// 				name: "blue",
	// 			},
	// 			{
	// 				name: "yellow",
	// 			},
	// 			{
	// 				name: "red",
	// 			},
	// 			{
	// 				name: "purple",
	// 			},
	// 			{
	// 				name: "white",
	// 			},
	// 			{
	// 				name: "black",
	// 			},
	// 			{
	// 				name: "green",
	// 			},
	// 			{
	// 				name: "orange",
	// 			},
	// 			{
	// 				name: "leaf",
	// 			},
	// 			{
	// 				name: "cluster",
	// 			},
	// 			{
	// 				name: "nutrition",
	// 			},
	// 			{
	// 				name: "snack",
	// 			},
	// 		],
	// 	},
	// 	categories: {
	// 		connect: [
	// 			{
	// 				name: "pomes",
	// 			},
	// 			{
	// 				name: "drupes",
	// 			},
	// 			{
	// 				name: "berries",
	// 			},
	// 			{
	// 				name: "melons",
	// 			},
	// 			{
	// 				name: "citrus",
	// 			},
	// 			{
	// 				name: "tropical",
	// 			},
	// 		],
	// 	},
	// },
	// {
	// 	title: "Fruit Smoothies: A Healthy and Delicious Option",
	// 	slug: "fruit-smoothies-healthy-delicious",
	// 	dateCreated: "2023-07-10T16:45:00.000Z",
	// 	dateModified: "2023-07-10T16:45:00.000Z",
	// 	status: "PUBLIC",
	// 	template: "FULLWIDTH",
	// 	pinned: 0,
	// 	excerpt:
	// 		"Find out how to make nutritious and tasty fruit smoothies using a variety of fruits, such as bananas, strawberries, and kiwis.",
	// 	featured_image:
	// 		"https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118262/cutefruit/banners/cf-banner-3_uuufb0.png",
	// 	featured_video: "",
	// 	content: [
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	author: {
	// 		connect: {
	// 			email: "admin@tawtaw.site",
	// 		},
	// 	},
	// 	// "privateAccess": [],
	// 	tags: {
	// 		connect: [
	// 			{
	// 				name: "blue",
	// 			},
	// 			{
	// 				name: "yellow",
	// 			},
	// 			{
	// 				name: "red",
	// 			},
	// 			{
	// 				name: "purple",
	// 			},
	// 			{
	// 				name: "orange",
	// 			},
	// 			{
	// 				name: "nutrition",
	// 			},
	// 			{
	// 				name: "snack",
	// 			},
	// 		],
	// 	},
	// 	categories: {
	// 		connect: [
	// 			{
	// 				name: "drupes",
	// 			},
	// 			{
	// 				name: "berries",
	// 			},
	// 			{
	// 				name: "melons",
	// 			},
	// 			{
	// 				name: "citrus",
	// 			},
	// 			{
	// 				name: "tropical",
	// 			},
	// 		],
	// 	},
	// },
	// {
	// 	title: "The World of Exotic Fruits",
	// 	slug: "exotic-fruits",
	// 	dateCreated: "2023-06-15T12:30:00.000Z",
	// 	dateModified: "2023-06-15T12:30:00.000Z",
	// 	status: "PUBLIC",
	// 	template: "FULLWIDTH",
	// 	pinned: 1,
	// 	excerpt:
	// 		"Take a journey to discover some of the most unique and exotic fruits from around the world, including jackfruit, durian, and mangosteen.",
	// 	featured_image:
	// 		"https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118262/cutefruit/banners/cf-banner-6_nsc9sd.png",
	// 	featured_video: "",
	// 	content: [
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	author: {
	// 		connect: {
	// 			email: "admin@tawtaw.site",
	// 		},
	// 	},
	// 	// "privateAccess": [],
	// 	tags: {
	// 		connect: [
	// 			{
	// 				name: "blue",
	// 			},
	// 			{
	// 				name: "yellow",
	// 			},
	// 			{
	// 				name: "red",
	// 			},
	// 			{
	// 				name: "purple",
	// 			},
	// 			{
	// 				name: "white",
	// 			},
	// 			{
	// 				name: "black",
	// 			},
	// 			{
	// 				name: "green",
	// 			},
	// 			{
	// 				name: "orange",
	// 			},
	// 			{
	// 				name: "leaf",
	// 			},
	// 		],
	// 	},
	// 	categories: {
	// 		connect: [
	// 			{
	// 				name: "drupes",
	// 			},
	// 			{
	// 				name: "berries",
	// 			},
	// 			{
	// 				name: "citrus",
	// 			},
	// 			{
	// 				name: "tropical",
	// 			},
	// 		],
	// 	},
	// },
	// {
	// 	title: "Block Test",
	// 	slug: "block-test",
	// 	dateCreated: "2024-11-06T06:00:00.000Z",
	// 	dateModified: "2024-11-15T00:27:17.569Z",
	// 	status: "PUBLIC",
	// 	template: "WITHSIDEBAR",
	// 	pinned: 0,
	// 	excerpt:
	// 		"Testing custom block components that users can write into their rich text editor",
	// 	featured_image: "",
	// 	featured_video: "",
	// 	content: [
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "A List of Example Blocks Usable ",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "The paragraph block is the most basic text based block. the most simple yet effect way to convey a message.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "Block List",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Here is a list of blocks denoted by their header",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Block Quote ",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "blockquote",
	// 			children: [
	// 				{
	// 					type: "paragraph",
	// 					children: [
	// 						{
	// 							text: 'Block quote. "I can say anything here" - myself',
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "List",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "unordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									text: "a ",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									text: "bullet ",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									text: "list",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									text: "is ",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									text: "fun",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "ordered-list",
	// 			children: [
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									text: "orderd",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									text: "lists",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									text: "have ",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					type: "list-item",
	// 					children: [
	// 						{
	// 							type: "list-item-content",
	// 							children: [
	// 								{
	// 									text: "numbers",
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Button",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				link: "/blog/block-test",
	// 				color: "var(--c-accent)",
	// 				label: "Button: Click Me",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "buttonlink",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Callout",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				intent: "info",
	// 				content: null,
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Callout",
	// 								},
	// 							],
	// 						},
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "Important text + icon that can contain editable rich text inside",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "callout",
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				intent: "warning",
	// 				content: null,
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "Callouts can have different icons and colors",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "callout",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Card",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				width: "initial",
	// 				margin: "",
	// 				content: null,
	// 				padding: 1,
	// 				fontSize: "1",
	// 				imageSrc:
	// 					"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
	// 				colorTheme: "bg_c_primary",
	// 				verticleAlign: "start",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Card",
	// 								},
	// 								{
	// 									text: " that I can put content inside of. Super fun and cool",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "card",
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				width: "initial",
	// 				margin: "",
	// 				content: null,
	// 				padding: 1,
	// 				fontSize: "1",
	// 				imageSrc:
	// 					"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
	// 				colorTheme: "bg_c_plain",
	// 				verticleAlign: "start",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "Plain card theme",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "card",
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				width: "initial",
	// 				margin: "",
	// 				content: null,
	// 				padding: 1,
	// 				fontSize: "1",
	// 				imageSrc:
	// 					"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
	// 				colorTheme: "bg_c_secondary",
	// 				verticleAlign: "start",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Secondary ",
	// 								},
	// 								{
	// 									text: "color theme",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "card",
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				width: "initial",
	// 				margin: "",
	// 				content: null,
	// 				padding: 1,
	// 				fontSize: "1",
	// 				imageSrc:
	// 					"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
	// 				colorTheme: "bg_c_tertiary",
	// 				verticleAlign: "start",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Tertiary ",
	// 								},
	// 								{
	// 									text: "color theme",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "card",
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				width: "initial",
	// 				margin: "",
	// 				content: null,
	// 				padding: 1,
	// 				fontSize: "1",
	// 				imageSrc:
	// 					"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
	// 				colorTheme: "bg_c_accent",
	// 				verticleAlign: "start",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									bold: true,
	// 									text: "Accent: ",
	// 								},
	// 								{
	// 									text: "color theme",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "card",
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				width: "initial",
	// 				margin: "",
	// 				content: null,
	// 				padding: 1,
	// 				fontSize: "1",
	// 				imageSrc:
	// 					"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
	// 				colorTheme: "bg_c_transparent",
	// 				verticleAlign: "start",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "Transparent color theme",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "card",
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				width: "initial",
	// 				margin: "",
	// 				content: null,
	// 				padding: 1,
	// 				fontSize: "1",
	// 				imageSrc:
	// 					"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
	// 				colorTheme: "bg_c_reverse_theme",
	// 				verticleAlign: "start",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "Inverted Color theme",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "card",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Carousel",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				items: [
	// 					{
	// 						title: "Orange",
	// 						imageSrc:
	// 							"https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDZ3Nnl0dWR5bWVlazNmYXV2bm50cnRqeHo1Znh1dmd3c242MnpsaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4FGEbli278gPBPYA/giphy.gif",
	// 					},
	// 					{
	// 						title: "Basket",
	// 						imageSrc:
	// 							"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGdmNjJ4MWgwbmRzb2RvdXZ4NHFsazA2Z2ZwdHIyMTR4MzhkYzZkMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lcv7NCKzJJ2XC/giphy.gif",
	// 					},
	// 					{
	// 						title: "Raspberry",
	// 						imageSrc:
	// 							"https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHZxdmxtandnZTExYjBtanZpaTlhd2lxeTh3amg3eGRuMmh6Z2JyeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPd5iphX59nQTjq/giphy.gif",
	// 					},
	// 				],
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "carousel",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Codeblock",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "code",
	// 			children: [
	// 				{
	// 					text: ".carouselItem {\n  scroll-snap-align: center;\n  scroll-snap-stop: always;\n  padding: 8px;\n  box-sizing: border-box;\n  border-radius: 6px;\n  background: var(--c-txt-bg);\n  margin: 0;\n}",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Contact Form",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				color: "green",
	// 				header: "Reusable Contact Form",
	// 				isDate: true,
	// 				isName: true,
	// 				isNotes: true,
	// 				isPhone: true,
	// 				imageSrc: "",
	// 				buttonLabel: "Submit",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "contactform",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Gallery",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					bold: true,
	// 					text: "Grid layout",
	// 				},
	// 				{
	// 					text: ". Cropping images to match framing with ",
	// 				},
	// 				{
	// 					code: true,
	// 					text: "cover",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				gap: 3,
	// 				items: [
	// 					{
	// 						alt: "",
	// 						src: "https://media.giphy.com/media/Iu0WVXXIMTOD1HtzIP/giphy.gif?cid=790b7611cftg0mfmzxy0jsh42bbpoij7fk7vqgao4uoamsfg&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						caption: "",
	// 					},
	// 					{
	// 						alt: "",
	// 						src: "https://media.giphy.com/media/29s9fNQFkfLfXmGk7U/giphy.gif?cid=790b7611g4yqad5hb2dedetq1hon4njumki26hddy0h1n8li&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						caption: "",
	// 					},
	// 					{
	// 						alt: "",
	// 						src: "https://media.giphy.com/media/3o72F4nTnhd0fxsVhK/giphy.gif?cid=790b7611cftg0mfmzxy0jsh42bbpoij7fk7vqgao4uoamsfg&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						caption: "",
	// 					},
	// 					{
	// 						alt: "",
	// 						src: "https://media.giphy.com/media/12g8vXmxMuA3wnIdjI/giphy.gif?cid=790b7611g4yqad5hb2dedetq1hon4njumki26hddy0h1n8li&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						caption: "",
	// 					},
	// 					{
	// 						alt: "",
	// 						src: "https://media.giphy.com/media/LkL4dGbQId8ezdHEoX/giphy.gif?cid=790b7611cftg0mfmzxy0jsh42bbpoij7fk7vqgao4uoamsfg&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						caption: "",
	// 					},
	// 					{
	// 						alt: "",
	// 						src: "https://media.giphy.com/media/j5i2tzUmDA2OFeMJVL/giphy.gif?cid=ecf05e47xt1ttz5e5gl49jzu10rhe9tunoiucp6lxzrne5fu&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						caption: "",
	// 					},
	// 				],
	// 				layout: "grid",
	// 				columns: 3,
	// 				objectFit: "cover",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "imagegallery",
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "or ",
	// 				},
	// 				{
	// 					bold: true,
	// 					text: "Masonry layout",
	// 				},
	// 				{
	// 					text: ". Images may look uneven because they are not cropped but instead using ",
	// 				},
	// 				{
	// 					code: true,
	// 					text: "contain",
	// 				},
	// 				{
	// 					text: " property",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				gap: 3,
	// 				items: [
	// 					{
	// 						alt: "",
	// 						src: "https://media.giphy.com/media/5xtDarztN4Auy4RtLws/giphy.gif?cid=790b7611cftg0mfmzxy0jsh42bbpoij7fk7vqgao4uoamsfg&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						caption: "",
	// 					},
	// 					{
	// 						alt: "",
	// 						src: "https://media.giphy.com/media/29s9fNQFkfLfXmGk7U/giphy.gif?cid=790b7611g4yqad5hb2dedetq1hon4njumki26hddy0h1n8li&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						caption: "",
	// 					},
	// 					{
	// 						alt: "",
	// 						src: "https://media.giphy.com/media/cJtzdZtXStihTq8rQe/giphy.gif?cid=790b7611g4yqad5hb2dedetq1hon4njumki26hddy0h1n8li&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						caption: "",
	// 					},
	// 					{
	// 						alt: "",
	// 						src: "https://media.giphy.com/media/3o72F4nTnhd0fxsVhK/giphy.gif?cid=790b7611cftg0mfmzxy0jsh42bbpoij7fk7vqgao4uoamsfg&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						caption: "",
	// 					},
	// 					{
	// 						alt: "",
	// 						src: "https://media.giphy.com/media/TlK63EwPt59cg4UrUsM/giphy.gif?cid=ecf05e47f1zsle4qrm8phcm5p9ge1obr1nn8dry0ac81leg5&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						caption: "",
	// 					},
	// 					{
	// 						alt: "",
	// 						src: "https://media.giphy.com/media/j5i2tzUmDA2OFeMJVL/giphy.gif?cid=ecf05e47xt1ttz5e5gl49jzu10rhe9tunoiucp6lxzrne5fu&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						caption: "",
	// 					},
	// 				],
	// 				layout: "masonry",
	// 				columns: 2,
	// 				objectFit: "contain",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "imagegallery",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Hero",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				color: "white",
	// 				caption: {
	// 					value: null,
	// 					discriminant: true,
	// 				},
	// 				imageSrc:
	// 					"https://media.giphy.com/media/LkL4dGbQId8ezdHEoX/giphy.gif?cid=ecf05e4794pkvkurocd23t49e541340v5ljefr9ow0k813nw&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "Sunset Orange Dream",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["caption", "value"],
	// 				},
	// 			],
	// 			component: "hero",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "IFrame Embed",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				src: "https://www.williamusic.com/",
	// 				color: "transparent",
	// 				height: "800px",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "iframe",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Image",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				alt: "3 strawberries",
	// 				color: "lightgray",
	// 				width: 0,
	// 				border: 0,
	// 				padding: 1,
	// 				imageSrc:
	// 					"https://media.giphy.com/media/TTtcRVnXxriHyjzXG4/giphy.gif?cid=ecf05e478bsk2zcet6p4jk8igdbbmpf3x0fwlro437ekobkc&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "image",
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				alt: "",
	// 				color: "lightgray",
	// 				width: 0,
	// 				border: 1,
	// 				padding: 0,
	// 				imageSrc:
	// 					"https://media.giphy.com/media/Kds38Lhus8D3YxkIAz/giphy.gif?cid=ecf05e4762c79gufeumgz4ikoj3byy7xh0yf7w0eno5m7240&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "image",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Image Link List",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				items: [
	// 					{
	// 						color: "paleblue",
	// 						header: "Lemon",
	// 						content: null,
	// 						imageSrc:
	// 							"https://media.giphy.com/media/xT0GqjBCkO9BEiSEOk/giphy.gif?cid=ecf05e4762c79gufeumgz4ikoj3byy7xh0yf7w0eno5m7240&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						imageSize: "250px",
	// 						buttonLink: "/block-test",
	// 						buttonLabel: "",
	// 					},
	// 					{
	// 						color: "paleblue",
	// 						header: "Grapes",
	// 						content: null,
	// 						imageSrc:
	// 							"https://media.giphy.com/media/XwZ6aHOx2wwjgPdPkT/giphy.gif?cid=ecf05e47yrw41nionsr9v73xfr1n5k771ehy2lgeyd76glyo&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						imageSize: "250px",
	// 						buttonLink: "/block-test",
	// 						buttonLabel: "",
	// 					},
	// 					{
	// 						color: "paleblue",
	// 						header: "Watermelon",
	// 						content: null,
	// 						imageSrc:
	// 							"https://media.giphy.com/media/l56r3x5ZRZ2T7fs4tu/giphy.gif?cid=ecf05e47zyy0w7ippnq36hkou8p81p1zwh2vsp36gk3wjpzt&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						imageSize: "250px",
	// 						buttonLink: "/block-test",
	// 						buttonLabel: "",
	// 					},
	// 				],
	// 				isLink: true,
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "Lemons are sour!",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["items", 0, "content"],
	// 				},
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["items", 1, "content"],
	// 				},
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["items", 2, "content"],
	// 				},
	// 			],
	// 			component: "imagelinklist",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Info Card",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Putting this card on the back burner. I'd reach for ",
	// 				},
	// 				{
	// 					bold: true,
	// 					text: "Card",
	// 				},
	// 				{
	// 					text: " or ",
	// 				},
	// 				{
	// 					bold: true,
	// 					text: "Section",
	// 				},
	// 				{
	// 					text: " instead",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				color: "Gainsboro",
	// 				width: "initial",
	// 				header: "Head of the Info",
	// 				content: null,
	// 				padding: 1,
	// 				fontSize: "1",
	// 				imageSrc:
	// 					"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
	// 				buttonLink: "/blog/block-test",
	// 				buttonText: "",
	// 				verticleAlign: "start",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "An info card for info needs",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "infocard",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Info Card List",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				items: [
	// 					{
	// 						color: "paleblue",
	// 						header: "Oranges",
	// 						content: null,
	// 						imageSrc:
	// 							"https://media.giphy.com/media/buaZzuG1gxjErgc9sD/giphy.gif?cid=ecf05e47hxctk5c91tjp47v2axnfdls8z1oflfx21hofnh05&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						buttonLink: "https://giphy.com/search/oranges",
	// 						buttonLabel: "",
	// 					},
	// 					{
	// 						color: "paleblue",
	// 						header: "Apple Worm",
	// 						content: null,
	// 						imageSrc:
	// 							"https://media.giphy.com/media/na57DU1C5cqs7SsRxP/giphy.gif?cid=ecf05e47ypr9letu7tqvjj7z8ozy7zrw3ug133c8njx4lz5q&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						buttonLink: "",
	// 						buttonLabel: "",
	// 					},
	// 					{
	// 						color: "paleblue",
	// 						header: "Pinapple Cat",
	// 						content: null,
	// 						imageSrc:
	// 							"https://media.giphy.com/media/s6PGeVYNWs6pEs4EQj/giphy.gif?cid=ecf05e47ypr9letu7tqvjj7z8ozy7zrw3ug133c8njx4lz5q&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 						buttonLink: "",
	// 						buttonLabel: "",
	// 					},
	// 				],
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "This card links us to a different page",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["items", 0, "content"],
	// 				},
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "It's on the inside what counts",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["items", 1, "content"],
	// 				},
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["items", 2, "content"],
	// 				},
	// 			],
	// 			component: "infocardlist",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Local Video",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				url: "https://assets.tawtaw.site/pvo/2023--PVO_MIX--DJ_William--Millennial_Throwbacks%20snippit%20v2.webm",
	// 				altText: "DJ Mix clip",
	// 				autoPlay: false,
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "videoLocal",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Media & Text",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				content: null,
	// 				imageAlt: "glitter strawberry",
	// 				imageSrc:
	// 					"https://media.giphy.com/media/fD4x1OC7pHnlPdnltm/giphy.gif?cid=ecf05e47mvh9ru91x3hgdxrn9es23iuqy538jwzqdo2vnafo&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 				rowReverse: false,
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "heading",
	// 							level: 5,
	// 							children: [
	// 								{
	// 									text: "Side text",
	// 								},
	// 							],
	// 						},
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "can help describe a bit more info with a fun graphic",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "mediatext",
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				content: null,
	// 				imageAlt: "Same photo",
	// 				imageSrc:
	// 					"https://media.giphy.com/media/fD4x1OC7pHnlPdnltm/giphy.gif?cid=ecf05e47mvh9ru91x3hgdxrn9es23iuqy538jwzqdo2vnafo&ep=v1_gifs_search&rid=giphy.gif&ct=g",
	// 				rowReverse: true,
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "Now I should be on the Right side",
	// 								},
	// 							],
	// 						},
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "You can reverse order of text and media without affecting the markdown",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "mediatext",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Posts List",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				color: "gray",
	// 				header: "Posts!!!",
	// 				imageSrc:
	// 					"https://cdn.pixabay.com/photo/2022/07/10/20/15/raspberries-7313700_1280.jpg",
	// 				categories: [
	// 					{
	// 						id: "clzgewmlf000811f4apznlhcs",
	// 					},
	// 					{
	// 						id: "clzgewmlf000611f4btbbaden",
	// 					},
	// 				],
	// 				colorOverlay: "rgba(56, 56, 56, 0.63)",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "postslist",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Quote",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				href: "",
	// 				content: null,
	// 				attribution: null,
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "Don't quote me on this",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "Myself",
	// 						},
	// 					],
	// 					propPath: ["attribution"],
	// 				},
	// 			],
	// 			component: "quote",
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				href: "/home",
	// 				content: null,
	// 				attribution: null,
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "You can even link a quote and have it open in a new tab",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "Myself",
	// 						},
	// 					],
	// 					propPath: ["attribution"],
	// 				},
	// 			],
	// 			component: "quote",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Section Background",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				content: null,
	// 				imageSrc:
	// 					"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
	// 				colorTheme: "bg_c_plain",
	// 				paddingBlock: "15vh",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-block-prop",
	// 					children: [
	// 						{
	// 							type: "heading",
	// 							level: 4,
	// 							children: [
	// 								{
	// 									text: "A section that has title",
	// 								},
	// 							],
	// 						},
	// 						{
	// 							type: "paragraph",
	// 							children: [
	// 								{
	// 									text: "But can also set a solid color for the background",
	// 								},
	// 							],
	// 						},
	// 					],
	// 					propPath: ["content"],
	// 				},
	// 			],
	// 			component: "section",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Social Link Nav",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				color: "gray",
	// 				github: "https://www.github.com",
	// 				twitch: "",
	// 				custom1: "https://www.custom1.com",
	// 				twitter: "",
	// 				youtube: "",
	// 				bandcamp: "https://www.bandcamp.com",
	// 				facebook: "https://www.facebook.com",
	// 				linkedin: "",
	// 				instagram: "https://www.instagram.com",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "sociallinknav",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Table",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				rows: [
	// 					{
	// 						cells: [
	// 							{
	// 								text: "Calories",
	// 							},
	// 							{
	// 								text: "61 kcal ",
	// 							},
	// 							{
	// 								text: "-",
	// 							},
	// 						],
	// 					},
	// 					{
	// 						cells: [
	// 							{
	// 								text: "Carbohydrates",
	// 							},
	// 							{
	// 								text: "14.7 g",
	// 							},
	// 							{
	// 								text: "-",
	// 							},
	// 						],
	// 					},
	// 					{
	// 						cells: [
	// 							{
	// 								text: "Fiber",
	// 							},
	// 							{
	// 								text: "3.0 g   ",
	// 							},
	// 							{
	// 								text: "12%",
	// 							},
	// 						],
	// 					},
	// 				],
	// 				caption: "Kiwi Nutrition",
	// 				headers: [
	// 					{
	// 						text: "Nutrient",
	// 					},
	// 					{
	// 						text: "Amount",
	// 					},
	// 					{
	// 						text: "Daily Value % ",
	// 					},
	// 				],
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "table",
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Youtube Video",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "component-block",
	// 			props: {
	// 				url: "https://www.youtube.com/watch?v=fPWRlmedCbo",
	// 				altText: "Embedded YouTube video",
	// 			},
	// 			children: [
	// 				{
	// 					type: "component-inline-prop",
	// 					children: [
	// 						{
	// 							text: "",
	// 						},
	// 					],
	// 				},
	// 			],
	// 			component: "youtubeVideo",
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	author: {
	// 		connect: {
	// 			email: "admin@tawtaw.site",
	// 		},
	// 	},
	// 	// "privateAccess": []
	// },
	// {
	// 	title: "Secrets of the Loom",
	// 	slug: "secrets-of-the-loom",
	// 	dateCreated: "2024-11-15T19:39:55.004Z",
	// 	dateModified: "2024-11-15T19:39:55.004Z",
	// 	status: "PRIVATE",
	// 	template: "WITHSIDEBAR",
	// 	pinned: 0,
	// 	excerpt:
	// 		"Fruits are a staple of health-conscious diets, but did you know they hide some surprising secrets? These juicy delights don’t just pack vitamins; they boast unique properties you might not have heard of before. Let’s unravel the loom of fruit benefits.",
	// 	featured_image: "",
	// 	featured_video: "",
	// 	content: [
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "1. Pineapple: Nature’s Anti-Inflammatory",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Pineapple isn’t just tropical and sweet—it’s rich in bromelain, an enzyme known for reducing inflammation and aiding digestion. It’s even been studied for its potential to accelerate recovery from surgery and intense workouts.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "Quick Tip:",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Add fresh pineapple to post-workout smoothies for a natural recovery boost.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "2. Blackberries: Brain Boosters in Disguise",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Packed with anthocyanins, blackberries help improve memory and reduce the risk of neurodegenerative diseases. These powerful antioxidants also fight oxidative stress, keeping your mind sharp as you age.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Did You Know?",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Blackberries may enhance communication between neurons, optimizing cognitive functions.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "3. Figs: Your Secret Skin Savior",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Often overlooked, figs are brimming with polyphenols and vitamins that promote collagen production. This makes them a natural ally for radiant skin. Plus, their high calcium content strengthens nails and bones.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "Quick DIY:",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Mash fresh figs into a face mask with a touch of honey for a glowing complexion.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "4. Papaya Seeds: Gut Guardians",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "While most people toss papaya seeds, they’re surprisingly nutritious! These tiny seeds have antimicrobial properties and support digestive health by eliminating harmful parasites.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 4,
	// 			children: [
	// 				{
	// 					text: "Fun Fact:",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Papaya seeds have a peppery flavor—try them dried and crushed as a spice.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					text: "5. Starfruit: The Hydration Hero",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Low in calories but high in water content, starfruit is excellent for hydration. It also contains ",
	// 				},
	// 				{
	// 					text: "oxalic acid",
	// 					italic: true,
	// 				},
	// 				{
	// 					text: ", which may help dissolve kidney stones (with doctor approval, of course).",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "divider",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "heading",
	// 			level: 3,
	// 			children: [
	// 				{
	// 					text: "In Conclusion:",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "The next time you reach for a fruit, think beyond its surface sweetness. These hidden health benefits are nature’s way of weaving wellness into your life.",
	// 				},
	// 			],
	// 		},
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "Which fruit secret surprised you most? Share your thoughts in the comments below!",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	author: {
	// 		connect: {
	// 			email: "admin@tawtaw.site",
	// 		},
	// 	},
	// 	// "privateAccess": [],
	// 	tags: {
	// 		connect: [
	// 			{
	// 				name: "red",
	// 			},
	// 			{
	// 				name: "purple",
	// 			},
	// 			{
	// 				name: "white",
	// 			},

	// 			{
	// 				name: "green",
	// 			},

	// 			{
	// 				name: "cluster",
	// 			},
	// 			{
	// 				name: "nutrition",
	// 			},
	// 			{
	// 				name: "snack",
	// 			},
	// 		],
	// 	},
	// 	categories: {
	// 		connect: [
	// 			{
	// 				name: "berries",
	// 			},
	// 		],
	// 	},
	// },
	// {
	// 	title: "The Health Benefits of Berries",
	// 	slug: "health-benefits-berries",
	// 	dateCreated: "2023-05-01T10:00:00.000Z",
	// 	dateModified: "2023-05-01T10:00:00.000Z",
	// 	status: "PUBLIC",
	// 	template: "FULLWIDTH",
	// 	pinned: 5,
	// 	excerpt:
	// 		"Learn about the amazing health benefits of various types of berries, including blueberries, strawberries, and raspberries.",
	// 	featured_image:
	// 		"https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118263/cutefruit/banners/cf-banner-13_ywbvao.png",
	// 	featured_video: "",
	// 	content: [
	// 		{
	// 			type: "paragraph",
	// 			children: [
	// 				{
	// 					text: "",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	author: {
	// 		connect: {
	// 			email: "admin@tawtaw.site",
	// 		},
	// 	},
	// 	// "privateAccess": [],
	// 	tags: {
	// 		connect: [
	// 			{
	// 				name: "red",
	// 			},
	// 			{
	// 				name: "purple",
	// 			},
	// 			{
	// 				name: "white",
	// 			},

	// 			{
	// 				name: "green",
	// 			},
				// {
				// 	name: "cluster",
				// },
				// {
				// 	name: "nutrition",
				// },
				// {
				// 	name: "snack",
				// },
	// 		],
	// 	},
	// 	categories: {
	// 		connect: [
	// 			{
	// 				name: "berries",
	// 			},
	// 		],
	// 	},
	// },
]

export const announcements_seed: AnnouncementCreateInput[] = [
	{
		link: "/blog/dragon-fruit-beauty-benefits",
		start: "2024-11-18T06:00:00.000Z",
		end: "2027-08-29T05:00:00.000Z",
		colorTheme: "bg_c_tertiary",
		type: "NORMAL",
		content: [
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
