import type { UserCreateInput, RoleCreateInput, PageCreateInput, PostCreateInput, CategoryCreateInput, TagCreateInput  } from ".keystone/types"

export const user_seeddata: UserCreateInput[] = [
	{
		name: "AdminOfWebsite",
		email: "admin@tawtaw.site",
		authId: "admin@tawtaw.site",
		stripeCustomerId: undefined,
		password: "itsasecrettoeverybody",
		isAdmin: true,
		isVerified: true,
	},
	{
		name: "Eddy",
		email: "eddy@tawtaw.site",
		authId: "eddy@tawtaw.site",
		stripeCustomerId: undefined,
		password: "eddy@tawtaw.site",
		isAdmin: false,
		isVerified: true,
	},
	{
		name: "Cinda",
		email: "cinda@tawtaw.site",
		authId: "cinda@tawtaw.site",
		stripeCustomerId: undefined,
		password: "cinda@tawtaw.site",
		isAdmin: false,
		isVerified: true,
	},
]

// export const roles_seedjson:Lists.Role['fields'] = [
export const roles_seedjson:RoleCreateInput[] = [
	{
		name: "admin",
		label: "Admin",
		canSeeOtherUsers: true,
		canManageUsers: true,
		canManageRoles: true,
		canManagePosts: true,
		canManagePages: true,
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

export const pages_seeddata:PageCreateInput[] = [
  {
    title: "Home",
    slug: "home",
    status: "PUBLIC",
    template: "FULLWIDTH",
    author: {
      connect: {
        email: "admin@tawtaw.site"
      }
    },
    content: [
      {
        "type": "layout",
        "layout": [
          1,
          2
        ],
        "children": [
          {
            "type": "layout-area",
            "children": [
              {
                "type": "component-block",
                "props": {
                  "color": "transparent",
                  "width": "initial",
                  "header": "",
                  "content": null,
                  "padding": 0,
                  "fontSize": "1.3",
                  "imageSrc": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
                  "buttonLink": "",
                  "buttonText": "",
                  "verticleAlign": "center"
                },
                "children": [
                  {
                    "type": "component-block-prop",
                    "children": [
                      {
                        "type": "heading",
                        "level": 2,
                        "children": [
                          {
                            "text": "Cute Fruit"
                          }
                        ]
                      },
                      {
                        "type": "paragraph",
                        "children": [
                          {
                            "text": "At FruitFusion, we're on a mission to revolutionize your daily dose of nutrition and flavor. We've blended the best of nature's bounty to create a range of mouthwatering smoothies that don't just taste incredible but also nourish your body from the inside out."
                          }
                        ]
                      }
                    ],
                    "propPath": [
                      "content"
                    ]
                  }
                ],
                "component": "infocard"
              }
            ]
          },
          {
            "type": "layout-area",
            "children": [
              {
                "type": "component-block",
                "props": {
                  "color": "lightgray",
                  "width": 0,
                  "border": 0,
                  "padding": 1,
                  "imageSrc": "https://media.giphy.com/media/l4jDyg9cuka44xkEqn/giphy.gif"
                },
                "children": [
                  {
                    "type": "component-inline-prop",
                    "children": [
                      {
                        "text": ""
                      }
                    ]
                  }
                ],
                "component": "image"
              }
            ]
          }
        ]
      },
      {
        "type": "paragraph",
        "children": [
          {
            "text": ""
          }
        ]
      },
      {
        "type": "layout",
        "layout": [
          1,
          1,
          1
        ],
        "children": [
          {
            "type": "layout-area",
            "children": [
              {
                "type": "component-block",
                "props": {
                  "color": "var(--c-desaturated)",
                  "width": "fit-content",
                  "header": "Unparalleled Freshness",
                  "content": null,
                  "padding": 1,
                  "fontSize": "1",
                  "imageSrc": "",
                  "buttonLink": "",
                  "buttonText": "",
                  "verticleAlign": "start"
                },
                "children": [
                  {
                    "type": "component-block-prop",
                    "children": [
                      {
                        "type": "paragraph",
                        "children": [
                          {
                            "text": "We source the finest, locally grown fruits and vegetables to craft our signature smoothies. Our ingredients are picked at their peak ripeness, ensuring you get the maximum flavor and nutrients in every blend."
                          }
                        ]
                      }
                    ],
                    "propPath": [
                      "content"
                    ]
                  }
                ],
                "component": "infocard"
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "text": ""
                  }
                ]
              }
            ]
          },
          {
            "type": "layout-area",
            "children": [
              {
                "type": "component-block",
                "props": {
                  "color": "var(--c-desaturated)",
                  "width": "fit-content",
                  "header": "No Artificial Anything",
                  "content": null,
                  "padding": 1,
                  "fontSize": "1",
                  "imageSrc": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
                  "buttonLink": "",
                  "buttonText": "",
                  "verticleAlign": "start"
                },
                "children": [
                  {
                    "type": "component-block-prop",
                    "children": [
                      {
                        "type": "paragraph",
                        "children": [
                          {
                            "text": "At FruitFusion, we believe in the power of real, whole ingredients. You won't find any artificial flavors, colors, or sweeteners in our smoothies. Just pure, unadulterated goodness."
                          }
                        ]
                      }
                    ],
                    "propPath": [
                      "content"
                    ]
                  }
                ],
                "component": "infocard"
              }
            ]
          },
          {
            "type": "layout-area",
            "children": [
              {
                "type": "component-block",
                "props": {
                  "color": "var(--c-desaturated)",
                  "width": "fit-content",
                  "header": "Customizable Creations",
                  "content": null,
                  "padding": 1,
                  "fontSize": "1",
                  "imageSrc": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
                  "buttonLink": "",
                  "buttonText": "",
                  "verticleAlign": "start"
                },
                "children": [
                  {
                    "type": "component-block-prop",
                    "children": [
                      {
                        "type": "paragraph",
                        "children": [
                          {
                            "text": "Your taste buds, your rules. We offer a wide range of smoothie options, from classic green blends bursting with vitamins to indulgent, protein-packed treats. Plus, you can customize your smoothie with a variety of add-ins and boosts to suit your unique needs."
                          }
                        ]
                      }
                    ],
                    "propPath": [
                      "content"
                    ]
                  }
                ],
                "component": "infocard"
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "children": [
          {
            "text": "Join the FruitFusion Family"
          }
        ],
        "textAlign": "center"
      },
      {
        "type": "paragraph",
        "children": [
          {
            "text": "Say "
          },
          {
            "text": "goodbye",
            "italic": true
          },
          {
            "text": " to tedious prep and cleanup. With "
          },
          {
            "text": "FruitFusion",
            "underline": true
          },
          {
            "text": ", your daily dose of nutrition is as simple as grabbing a bottle and sipping away. We're here to make healthy living "
          },
          {
            "bold": true,
            "text": "effortless"
          },
          {
            "text": "."
          }
        ]
      },
      {
        "type": "paragraph",
        "children": [
          {
            "text": "Say "
          },
          {
            "text": "goodbye",
            "italic": true
          },
          {
            "text": " to tedious prep and cleanup. With "
          },
          {
            "text": "FruitFusion",
            "underline": true
          },
          {
            "text": ", your daily dose of nutrition is as simple as grabbing a bottle and sipping away. We're here to make healthy living "
          },
          {
            "bold": true,
            "text": "effortless"
          },
          {
            "text": "."
          }
        ],
        "textAlign": "center"
      },
      {
        "type": "paragraph",
        "children": [
          {
            "text": "Say "
          },
          {
            "text": "goodbye",
            "italic": true
          },
          {
            "text": " to tedious prep and cleanup. With "
          },
          {
            "text": "FruitFusion",
            "underline": true
          },
          {
            "text": ", your daily dose of nutrition is as simple as grabbing a bottle and sipping away. We're here to make healthy living "
          },
          {
            "bold": true,
            "text": "effortless"
          },
          {
            "text": ".\n"
          }
        ],
        "textAlign": "end"
      },
      {
        "type": "paragraph",
        "children": [
          {
            "text": "",
            "strikethrough": true
          }
        ],
        "textAlign": "center"
      },
      {
        "type": "paragraph",
        "children": [
          {
            "text": ""
          }
        ],
        "textAlign": "end"
      },
      {
        "type": "layout",
        "layout": [
          2,
          1
        ],
        "children": [
          {
            "type": "layout-area",
            "children": [
              {
                "type": "component-block",
                "props": {
                  "color": "lightgray",
                  "width": 0,
                  "border": 0,
                  "padding": 1,
                  "imageSrc": "https://media.giphy.com/media/l0IpXwyCXikRK9Yl2/giphy.gif"
                },
                "children": [
                  {
                    "type": "component-inline-prop",
                    "children": [
                      {
                        "text": ""
                      }
                    ]
                  }
                ],
                "component": "image"
              }
            ]
          },
          {
            "type": "layout-area",
            "children": [
              {
                "type": "component-block",
                "props": {
                  "color": "slategrey",
                  "width": "initial",
                  "header": "",
                  "content": null,
                  "padding": 1,
                  "fontSize": "1",
                  "imageSrc": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
                  "buttonLink": "/shop",
                  "buttonText": "Click Me",
                  "verticleAlign": "center"
                },
                "children": [
                  {
                    "type": "component-block-prop",
                    "children": [
                      {
                        "type": "paragraph",
                        "children": [
                          {
                            "text": "What started as a simple idea now blossomed into a full-fledged start-up"
                          }
                        ]
                      },
                      {
                        "type": "heading",
                        "level": 3,
                        "children": [
                          {
                            "text": "Committed"
                          }
                        ]
                      },
                      {
                        "type": "paragraph",
                        "children": [
                          {
                            "text": "to making wholesome living deliciously convenient."
                          }
                        ]
                      }
                    ],
                    "propPath": [
                      "content"
                    ]
                  }
                ],
                "component": "infocard"
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "children": [
          {
            "text": "See What Our Customers Are Saying About Us"
          }
        ],
        "textAlign": "center"
      },
      {
        "type": "layout",
        "layout": [
          1,
          2,
          1
        ],
        "children": [
          {
            "type": "layout-area",
            "children": [
              {
                "type": "component-block",
                "props": {
                  "href": "https://www.realtimecolors.com/?colors=110604-fbf0ee-1b6874-ffffff-1b6874&fonts=Poppins-Poppins",
                  "content": null,
                  "attribution": null
                },
                "children": [
                  {
                    "type": "component-block-prop",
                    "children": [
                      {
                        "type": "paragraph",
                        "children": [
                          {
                            "text": "Juicy and ripe choices that are mouth watering good"
                          }
                        ]
                      }
                    ],
                    "propPath": [
                      "content"
                    ]
                  },
                  {
                    "type": "component-inline-prop",
                    "children": [
                      {
                        "text": "red"
                      }
                    ],
                    "propPath": [
                      "attribution"
                    ]
                  }
                ],
                "component": "quote"
              },
              {
                "type": "component-block",
                "props": {
                  "href": "",
                  "content": null,
                  "attribution": null
                },
                "children": [
                  {
                    "type": "component-block-prop",
                    "children": [
                      {
                        "type": "paragraph",
                        "children": [
                          {
                            "text": "Great!"
                          }
                        ]
                      }
                    ],
                    "propPath": [
                      "content"
                    ]
                  },
                  {
                    "type": "component-inline-prop",
                    "children": [
                      {
                        "text": "grape"
                      }
                    ],
                    "propPath": [
                      "attribution"
                    ]
                  }
                ],
                "component": "quote"
              },
              {
                "type": "component-block",
                "props": {
                  "href": "",
                  "content": null,
                  "attribution": null
                },
                "children": [
                  {
                    "type": "component-block-prop",
                    "children": [
                      {
                        "type": "paragraph",
                        "children": [
                          {
                            "text": "Tasty"
                          }
                        ]
                      }
                    ],
                    "propPath": [
                      "content"
                    ]
                  },
                  {
                    "type": "component-inline-prop",
                    "children": [
                      {
                        "text": "Nectarine"
                      }
                    ],
                    "propPath": [
                      "attribution"
                    ]
                  }
                ],
                "component": "quote"
              }
            ]
          },
          {
            "type": "layout-area",
            "children": [
              {
                "type": "heading",
                "level": 2,
                "children": [
                  {
                    "text": ""
                  }
                ],
                "textAlign": "center"
              },
              {
                "type": "component-block",
                "props": {
                  "href": "",
                  "content": null,
                  "attribution": null
                },
                "children": [
                  {
                    "type": "component-block-prop",
                    "children": [
                      {
                        "type": "paragraph",
                        "children": [
                          {
                            "text": "that's crazy"
                          }
                        ]
                      }
                    ],
                    "propPath": [
                      "content"
                    ]
                  },
                  {
                    "type": "component-inline-prop",
                    "children": [
                      {
                        "text": "banana"
                      }
                    ],
                    "propPath": [
                      "attribution"
                    ]
                  }
                ],
                "component": "quote"
              },
              {
                "type": "component-block",
                "props": {
                  "href": "",
                  "content": null,
                  "attribution": null
                },
                "children": [
                  {
                    "type": "component-block-prop",
                    "children": [
                      {
                        "type": "paragraph",
                        "children": [
                          {
                            "text": "woh"
                          }
                        ]
                      }
                    ],
                    "propPath": [
                      "content"
                    ]
                  },
                  {
                    "type": "component-inline-prop",
                    "children": [
                      {
                        "text": "strawberry"
                      }
                    ],
                    "propPath": [
                      "attribution"
                    ]
                  }
                ],
                "component": "quote"
              },
              {
                "type": "component-block",
                "props": {
                  "href": "",
                  "content": null,
                  "attribution": null
                },
                "children": [
                  {
                    "type": "component-block-prop",
                    "children": [
                      {
                        "type": "paragraph",
                        "children": [
                          {
                            "text": "They had my color!!!"
                          }
                        ]
                      }
                    ],
                    "propPath": [
                      "content"
                    ]
                  },
                  {
                    "type": "component-inline-prop",
                    "children": [
                      {
                        "text": "green"
                      }
                    ],
                    "propPath": [
                      "attribution"
                    ]
                  }
                ],
                "component": "quote"
              }
            ]
          },
          {
            "type": "layout-area",
            "children": [
              {
                "type": "component-block",
                "props": {
                  "href": "",
                  "content": null,
                  "attribution": null
                },
                "children": [
                  {
                    "type": "component-block-prop",
                    "children": [
                      {
                        "type": "paragraph",
                        "children": [
                          {
                            "text": "how bout them apples"
                          }
                        ]
                      }
                    ],
                    "propPath": [
                      "content"
                    ]
                  },
                  {
                    "type": "component-inline-prop",
                    "children": [
                      {
                        "text": "blue"
                      }
                    ],
                    "propPath": [
                      "attribution"
                    ]
                  }
                ],
                "component": "quote"
              },
              {
                "type": "component-block",
                "props": {
                  "href": "",
                  "content": null,
                  "attribution": null
                },
                "children": [
                  {
                    "type": "component-block-prop",
                    "children": [
                      {
                        "type": "paragraph",
                        "children": [
                          {
                            "text": "yum"
                          }
                        ]
                      }
                    ],
                    "propPath": [
                      "content"
                    ]
                  },
                  {
                    "type": "component-inline-prop",
                    "children": [
                      {
                        "text": "raspberry"
                      }
                    ],
                    "propPath": [
                      "attribution"
                    ]
                  }
                ],
                "component": "quote"
              },
              {
                "type": "component-block",
                "props": {
                  "href": "",
                  "content": null,
                  "attribution": null
                },
                "children": [
                  {
                    "type": "component-block-prop",
                    "children": [
                      {
                        "type": "paragraph",
                        "children": [
                          {
                            "text": "Nutritious"
                          }
                        ]
                      }
                    ],
                    "propPath": [
                      "content"
                    ]
                  },
                  {
                    "type": "component-inline-prop",
                    "children": [
                      {
                        "text": "blueberry"
                      }
                    ],
                    "propPath": [
                      "attribution"
                    ]
                  }
                ],
                "component": "quote"
              }
            ]
          }
        ]
      },
      {
        "type": "layout",
        "layout": [
          1,
          1
        ],
        "children": [
          {
            "type": "layout-area",
            "children": [
              {
                "type": "component-block",
                "props": {
                  "color": "var(--c-desaturated)",
                  "header": "Contact",
                  "isDate": true,
                  "isName": true,
                  "isNotes": true,
                  "isPhone": true,
                  "imageSrc": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
                  "buttonLabel": "Submit"
                },
                "children": [
                  {
                    "type": "component-inline-prop",
                    "children": [
                      {
                        "text": ""
                      }
                    ]
                  }
                ],
                "component": "contactform"
              }
            ]
          },
          {
            "type": "layout-area",
            "children": [
              {
                "type": "component-block",
                "props": {
                  "color": "lightgray",
                  "width": 300,
                  "border": 0,
                  "padding": 20,
                  "imageSrc": "https://media.giphy.com/media/WWDUeExVrpG9KdfkaK/giphy.gif"
                },
                "children": [
                  {
                    "type": "component-inline-prop",
                    "children": [
                      {
                        "text": ""
                      }
                    ]
                  }
                ],
                "component": "image"
              },
              {
                "type": "heading",
                "level": 2,
                "children": [
                  {
                    "text": "Drop a Lime"
                  }
                ]
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "text": "Let us know what our next big and bold flavor should be. "
                  }
                ]
              },
              {
                "type": "paragraph",
                "children": [
                  {
                    "text": ""
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "paragraph",
        "children": [
          {
            "text": ""
          }
        ]
      }
    ]
  },
  {
    "status": "PUBLIC",
    "title": "Terms and Privacy",
    "slug": "terms-and-privacy",
    "content": [
        {
          "type": "heading",
          "level": 2,
          "children": [
            {
              "text": "Terms and Conditions"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "Agreement between User and cutefruit.tawtaw.site"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "Welcome to cutefruit.tawtaw.site. The cutefruit.tawtaw.site website (the \"Site\") is comprised of various web pages operated by Cute Fruit LLC. (\"Cute Fruit\"). cutefruit.tawtaw.site is offered to you conditioned on your acceptance without modification of the terms, conditions, and notices contained herein (the \"Terms\"). Your use of cutefruit.tawtaw.site constitutes your agreement to all such Terms. Please read these terms carefully, and keep a copy of them for your reference."
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "cutefruit.tawtaw.site is an E-Commerce Site."
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "We provide DJ/MC, lighting and photo booth services for weddings and events. We also rent out sound and lighting/FX equipment for events that do not need a DJ or host."
            }
          ]
        },
        {
          "type": "heading",
          "level": 3,
          "children": [
            {
              "text": "Privacy"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "Your use of cutefruit.tawtaw.site is subject to Cute Fruit's Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices."
            }
          ]
        },
        {
          "type": "heading",
          "level": 3,
          "children": [
            {
              "text": "Electronic Communications"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "Visiting cutefruit.tawtaw.site or sending emails to Cute Fruit constitutes electronic communications. You consent to receive electronic communications and you agree that all agreements, notices, disclosures and other communications that we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communications be in writing."
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "Your Account"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "If you use this site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password. You may not assign or otherwise transfer your account to any other person or entity. You acknowledge that Cute Fruit is not responsible for third party access to your account that results from theft or misappropriation of your account. Cute Fruit and its associates reserve the right to refuse or cancel service, terminate accounts, or remove or edit content in our sole discretion."
            }
          ]
        },
        {
          "type": "heading",
          "level": 3,
          "children": [
            {
              "text": "Children Under Thirteen"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "Cute Fruit does not knowingly collect, either online or offline, personal information from persons under the age of thirteen. If you are under 18, you may use cutefruit.tawtaw.site only with permission of a parent or guardian."
            }
          ]
        },
        {
          "type": "heading",
          "level": 3,
          "children": [
            {
              "text": "Cancellation/Rescheduling/Refund Policy"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "For all services, a contract will be required to be signed by you and Cute Fruit. Therein will be terms specific to your event that will supersede any statement in this document. That said, below is a general guideline of our refund, rescheduling and cancellation policies. For DJ, lighting, and/or photo booth contracts/agreements, your deposit is non-refundable under any circumstance and is due 30 days after finalizing the contract between you and Cute Fruit. Your final balance is due 8 -16 weeks before your wedding or event date, depending on your contract's terms. You may cancel, at the cost of the deposit, before your final payment due date. Cancellations made after final payment due date will not receive a refund of either the deposit or the final payment and will be charged the full amount owed. We offer rescheduling options for weddings and events that need to change dates, even if dates have to change more than once, and even if the type of event changes. This is subject to availability and will be pursuant, above all else, to the terms in the contract signed by the User and Cute Fruit during the booking process. For equipment rental, deposit is non-refundable under any circumstance and is due at the time of finalizing the contract between you and Cute Fruit. Final balance is due 14 days before drop off date and will not be refunded if contract is cancelled after this time. Rescheduling is subject to availability."
            }
          ]
        },
        {
          "type": "heading",
          "level": 3,
          "children": [
            {
              "text": "Links to Third Party Sites/Third Party Services"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "cutefruit.tawtaw.site may contain links to other websites (\"Linked Sites\"). The Linked Sites are not under the control of Cute Fruit and Cute Fruit is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site. Cute Fruit is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by Cute Fruit of the site or any association with its operators."
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": " "
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "Certain services made available via cutefruit.tawtaw.site are delivered by third party sites and organizations. By using any product, service or functionality originating from the cutefruit.tawtaw.site domain, you hereby acknowledge and consent that Cute Fruit may share such information and data with any third party with whom Cute Fruit has a contractual relationship to provide the requested product, service or functionality on behalf of cutefruit.tawtaw.site users and customers."
            }
          ]
        },
        {
          "type": "heading",
          "level": 3,
          "children": [
            {
              "text": "No Unlawful or Prohibited Use/Intellectual Property"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "You are granted a non-exclusive, non-transferable, revocable license to access and use cutefruit.tawtaw.site strictly in accordance with these terms of use. As a condition of your use of the Site, you warrant to Cute Fruit that you will not use the Site for any purpose that is unlawful or prohibited by these Terms. You may not use the Site in any manner which could damage, disable, overburden, or impair the Site or interfere with any other party's use and enjoyment of the Site. You may not obtain or attempt to obtain any materials or information through any means not intentionally made available or provided for through the Site. "
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "All content included as part of the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Site, is the property of Cute Fruit or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights. You agree to observe and abide by all copyright and other proprietary notices, legends or other restrictions contained in any such content and will not make any changes thereto."
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": " You will not modify, publish, transmit, reverse engineer, participate in the transfer or sale, create derivative works, or in any way exploit any of the content, in whole or in part, found on the Site. Cute Fruit content is not for resale. Your use of the Site does not entitle you to make any unauthorized use of any protected content, and in particular you will not delete or alter any proprietary rights or attribution notices in any content. You will use protected content solely for your personal use, and will make no other use of the content without the express written permission of Cute Fruit and the copyright owner. You agree that you do not acquire any ownership rights in any protected content. We do not grant you any licenses, express or implied, to the intellectual property of Cute Fruit or our licensors except as expressly authorized by these Terms."
            }
          ]
        },
        {
          "type": "heading",
          "level": 3,
          "children": [
            {
              "text": "Third Party Accounts"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "You will be able to connect your Cute Fruit account to third party accounts. By connecting your Cute Fruit account to your third party account, you acknowledge and agree that you are consenting to the continuous release of information about you to others (in accordance with your privacy settings on those third party sites). If you do not want information about you to be shared in this manner, do not use this feature."
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": " "
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "International Users"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "The Service is controlled, operated and administered by Cute Fruit from our offices within the USA. If you access the Service from a location outside the USA, you are responsible for compliance with all local laws. You agree that you will not use the Cute Fruit Content accessed through cutefruit.tawtaw.site in any country or in any manner prohibited by any applicable laws, restrictions or regulations. "
            }
          ]
        },
        {
          "type": "heading",
          "level": 3,
          "children": [
            {
              "text": "Indemnification"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "You agree to indemnify, defend and hold harmless Cute Fruit, its officers, directors, employees, agents and third parties, for any losses, costs, liabilities and expenses (including reasonable attorney's fees) relating to or arising out of your use of or inability to use the Site or services, any user postings made by you, your violation of any terms of this Agreement or your violation of any rights of a third party, or your violation of any applicable laws, rules or regulations. Cute Fruit reserves the right, at its own cost, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will fully cooperate with Cute Fruit in asserting any available defenses."
            }
          ]
        },
        {
          "type": "heading",
          "level": 3,
          "children": [
            {
              "text": "Arbitration"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "In the event the parties are not able to resolve any dispute between them arising out of or concerning these Terms and Conditions, or any provisions hereof, whether in contract, tort, or otherwise at law or in equity for damages or any other relief, then such dispute shall be resolved only by final and binding arbitration pursuant to the Federal Arbitration Act, conducted by a single neutral arbitrator and administered by the American Arbitration Association, or a similar arbitration service selected by the parties, in a location mutually agreed upon by the parties. The arbitrator's award shall be final, and judgment may be entered upon it in any court having jurisdiction. In the event that any legal or equitable action, proceeding or arbitration arises out of or concerns these Terms and Conditions, the prevailing party shall be entitled to recover its costs and reasonable attorney's fees. The parties agree to arbitrate all disputes and claims in regards to these Terms and Conditions or any disputes arising as a result of these Terms and Conditions, whether directly or indirectly, including Tort claims that are a result of these Terms and Conditions. The parties agree that the Federal Arbitration Act governs the interpretation and enforcement of this provision. The entire dispute, including the scope and enforceability of this arbitration provision shall be determined by the Arbitrator. This arbitration provision shall survive the termination of these Terms and Conditions. "
            }
          ]
        },
        {
          "type": "heading",
          "level": 3,
          "children": [
            {
              "text": "Class Action Waiver"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "Any arbitration under these Terms and Conditions will take place on an individual basis; class arbitrations and class/representative/collective actions are not permitted. THE PARTIES AGREE THAT A PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN EACH'S INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PUTATIVE CLASS, COLLECTIVE AND/ OR REPRESENTATIVE PROCEEDING, SUCH AS IN THE FORM OF A PRIVATE ATTORNEY GENERAL ACTION AGAINST THE OTHER. Further, unless both you and Cute Fruit agree otherwise, the arbitrator may not consolidate more than one person's claims, and may not otherwise preside over any form of a representative or class proceeding. "
            }
          ]
        },
        {
          "type": "heading",
          "level": 3,
          "children": [
            {
              "text": "Liability Disclaimer"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN. Cute Fruit LLC. AND/OR ITS SUPPLIERS MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THE SITE AT ANY TIME."
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": " "
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "Cute Fruit LLC. AND/OR ITS SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY OF THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS CONTAINED ON THE SITE FOR ANY PURPOSE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE PROVIDED \"AS IS\" WITHOUT WARRANTY OR CONDITION OF ANY KIND. Cute Fruit LLC. AND/OR ITS SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT."
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": " "
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL Cute Fruit LLC. AND/OR ITS SUPPLIERS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OR PERFORMANCE OF THE SITE, WITH THE DELAY OR INABILITY TO USE THE SITE OR RELATED SERVICES, THE PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS OBTAINED THROUGH THE SITE, OR OTHERWISE ARISING OUT OF THE USE OF THE SITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF Cute Fruit LLC. OR ANY OF ITS SUPPLIERS HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES. BECAUSE SOME STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SITE, OR WITH ANY OF THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE."
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": " "
            }
          ]
        },
        {
          "type": "heading",
          "level": 3,
          "children": [
            {
              "text": "Termination/Access Restriction"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "Cute Fruit reserves the right, in its sole discretion, to terminate your access to the Site and the related services or any portion thereof at any time, without notice. To the maximum extent permitted by law, this agreement is governed by the laws of the State of Illinois and you hereby consent to the exclusive jurisdiction and venue of courts in Illinois in all disputes arising out of or relating to the use of the Site. Use of the Site is unauthorized in any jurisdiction that does not give effect to all provisions of these Terms, including, without limitation, this section."
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": " "
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "You agree that no joint venture, partnership, employment, or agency relationship exists between you and Cute Fruit as a result of this agreement or use of the Site. Cute Fruit's performance of this agreement is subject to existing laws and legal process, and nothing contained in this agreement is in derogation of Cute Fruit's right to comply with governmental, court and law enforcement requests or requirements relating to your use of the Site or information provided to or gathered by Cute Fruit with respect to such use. If any part of this agreement is determined to be invalid or unenforceable pursuant to applicable law including, but not limited to, the warranty disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision and the remainder of the agreement shall continue in effect."
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": " "
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "Unless otherwise specified herein, this agreement constitutes the entire agreement between the user and Cute Fruit with respect to the Site and it supersedes all prior or contemporaneous communications and proposals, whether electronic, oral or written, between the user and Cute Fruit with respect to the Site. A printed version of this agreement and of any notice given in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to this agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form. It is the express wish to the parties that this agreement and all related documents be written in English."
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": " "
            }
          ]
        },
        {
          "type": "heading",
          "level": 3,
          "children": [
            {
              "text": "Changes to Terms"
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "Cute Fruit reserves the right, in its sole discretion, to change the Terms under which cutefruit.tawtaw.site is offered. The most current version of the Terms will supersede all previous versions. Cute Fruit encourages you to periodically review the Terms to stay informed of our updates."
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": ""
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "text": "Effective as of September 14, 2017"
            }
          ]
        }
    ]
  },
]


export const posts_seedjson:PostCreateInput[] = [
  {
    "title": "The Health Benefits of Berries",
    "slug": "health-benefits-berries",
    "dateCreated": "2023-05-01T10:00:00.000Z",
    dateModified: "2023-05-01T10:00:00.000Z",
    status: "PUBLIC",
    template: "FULLWIDTH",
    pinned: 5,
    featured_image: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118263/cutefruit/banners/cf-banner-13_ywbvao.png',
    
    
    "author": {
      connect: {
        email: "admin@tawtaw.site"
      }
    },
    "excerpt": "Learn about the amazing health benefits of various types of berries, including blueberries, strawberries, and raspberries.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "Learn about the amazing health benefits of various types of berries, including blueberries, strawberries, and raspberries."
          }
        ]
      }
    ],
    categories: {
      connect: [
        { name: 'berries' }
      ]
    },
    tags: {
      connect: [
        { name: 'red' },
        { name: 'yellow' },
        { name: 'two-eyes' },
        { name: 'nose' },
        { name: 'leaf' },
      ],
    },
  },
  {
    "title": "The World of Exotic Fruits",
    "slug": "exotic-fruits",
    "dateCreated": "2023-06-15T12:30:00.000Z",
    dateModified: "2023-06-15T12:30:00.000Z",
    status: "PUBLIC",
    template: "FULLWIDTH",
    pinned: 1,
    featured_image: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118262/cutefruit/banners/cf-banner-6_nsc9sd.png',
    
    
    "author": {
      connect: {
        email: "admin@tawtaw.site"
      }
    },
    categories: {
      connect: [
        { name: 'berries' },
        { name: 'citrus' },
      ]
    },
    tags: {
      connect: [
        { name: 'red' },
        { name: 'yellow' },
        { name: 'two-eyes' },

      ],
    },
    "excerpt": "Take a journey to discover some of the most unique and exotic fruits from around the world, including jackfruit, durian, and mangosteen.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "Take a journey to discover some of the most unique and exotic fruits from around the world, including jackfruit, durian, and mangosteen."
          }
        ]
      }
    ],
  },
  {
    "title": "Fruit Smoothies: A Healthy and Delicious Option",
    "slug": "fruit-smoothies-healthy-delicious",
    "dateCreated": "2023-07-10T16:45:00.000Z",
    dateModified: "2023-07-10T16:45:00.000Z",
    status: "PUBLIC",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118262/cutefruit/banners/cf-banner-3_uuufb0.png',
    
    
    "author": {
      connect: {
        email: "admin@tawtaw.site"
      }
    },
    categories: {
      connect: [
        { name: 'tropical' },
        { name: 'pomes' },
        { name: 'drupes' },
        { name: 'melons' },
      ]
    },
    tags: {
      connect: [

        { name: 'yellow' },
        { name: 'two-eyes' },

        { name: 'leaf' },
      ],
    },
    "excerpt": "Find out how to make nutritious and tasty fruit smoothies using a variety of fruits, such as bananas, strawberries, and kiwis.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "Find out how to make nutritious and tasty fruit smoothies using a variety of fruits, such as bananas, strawberries, and kiwis."
          }
        ]
      }
    ],
  },
  {
    "title": "The Wonderful World of Apples",
    "slug": "wonderful-world-apples",
    "dateCreated": "2023-08-22T09:15:00.000Z",
    dateModified: "2023-08-22T09:15:00.000Z",
    status: "PUBLIC",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118262/cutefruit/banners/cf-banner-9_kybrry.png',
    
    
    "author": {
      connect: {
        email: "admin@tawtaw.site"
      }
    },
    "excerpt": "Explore the diverse world of apples, from sweet and crisp varieties like Honeycrisp and Pink Lady to tart and tangy options like Granny Smith and Braeburn.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "Explore the diverse world of apples, from sweet and crisp varieties like Honeycrisp and Pink Lady to tart and tangy options like Granny Smith and Braeburn."
          }
        ]
      }
    ],
  },
  {
    "title": "The Beauty of Fruit Art",
    "slug": "fruit-art",
    "dateCreated": "2023-09-30T14:00:00.000Z",
    dateModified: "2023-09-30T14:00:00.000Z",
    status: "PUBLIC",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118261/cutefruit/banners/cf-banner-8_muquqs.png',
    
    
    "author": {
      connect: {
        email: "admin@tawtaw.site"
      }
    },
    "excerpt": "Discover the creative and beautiful world of fruit art, from simple designs like watermelon baskets to intricate sculptures made from a variety of fruits.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "Discover the creative and beautiful world of fruit art, from simple designs like watermelon baskets to intricate sculptures made from a variety of fruits."
          }
        ]
      }
    ],
  },
  {
    "title": "Fruity Suprise",
    "slug": "fruity-suprise",
    "dateCreated": "2022-08-24T14:00:00.000Z",
    dateModified: "2022-08-24T14:00:00.000Z",
    status: "PUBLIC",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118260/cutefruit/banners/cf-banner-16_znh0zo.jpg',
    
    
    "author": {
      connect: {
        email: "admin@tawtaw.site"
      }
    },
    "excerpt": "A delightful suprise in every box. Get to know your fruity friends.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "A delightful suprise in every box. Get to know your fruity friends."
          }
        ]
      }
    ],
  },
  {
    "title": "Exploring the World of Exotic Fruits",
    "slug": "exploring-exotic-fruits",
    "dateCreated": "2022-08-24T14:00:00.000Z",
    dateModified: "2023-04-17T14:00:00.000Z",
    status: "PUBLIC",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118261/cutefruit/banners/cf-banner-4_a1mzp8.png',
    
    
    "author": {
      connect: {
        email: "admin@tawtaw.site"
      }
    },
    "excerpt": "Have you ever wondered what other fruits are out there beyond the ones you see at your local grocery store? There's a whole world of exotic fruits waiting to be discovered and tasted!",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "Have you ever wondered what other fruits are out there beyond the ones you see at your local grocery store? There's a whole world of exotic fruits waiting to be discovered and tasted!"
          }
        ]
      }
    ],
  },
  {
    "title": "The Sweet and Sour World of Citrus Fruits",
    "slug": "sweet-sour-citrus-fruits",
    "dateCreated": "2023-04-17T14:00:00.000Z",
    dateModified: "2024-02-28T14:00:00.000Z",
    status: "PUBLIC",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118260/cutefruit/banners/cf-banner-15_w0csbb.jpg',
    
    
    "author": {
      connect: {
        email: "admin@tawtaw.site"
      }
    },
    "excerpt": "Discover the delicious and tangy world of citrus fruits, from lemons and limes to oranges and grapefruits.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "Discover the delicious and tangy world of citrus fruits, from lemons and limes to oranges and grapefruits."
          }
        ]
      }
    ],
  },
  {
    "title": "Fruit and Cheese Pairings for a Perfect Charcuterie Board",
    "slug": "fruit-cheese-pairings-charcuterie-board",
    "dateCreated": "2024-02-28T14:00:00.000Z",
    dateModified: "2024-02-28T14:00:00.000Z",
    status: "PUBLIC",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118260/cutefruit/banners/cf-banner-14_opozkm.jpg',
    
    
    "author": {
      connect: {
        email: "admin@tawtaw.site"
      }
    },
    "excerpt": "Take your charcuterie board to the next level with these delicious fruit and cheese pairings, featuring combinations like figs and goat cheese and apples and cheddar.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "Take your charcuterie board to the next level with these delicious fruit and cheese pairings, featuring combinations like figs and goat cheese and apples and cheddar."
          }
        ]
      }
    ],
  },
  {
    "title": "The Beauty and Benefits of Dragon Fruit",
    "slug": "dragon-fruit-beauty-benefits",
    "dateCreated": "2024-01-12T09:15:00.000Z",
    dateModified: "2024-01-12T09:15:00.000Z",
    status: "PUBLIC",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118260/cutefruit/banners/cf-banner-14_opozkm.jpg',
    
    
    "author": {
      connect: {
        email: "admin@tawtaw.site"
      }
    },
    "excerpt": "Discover the unique appearance and nutritional benefits of dragon fruit, also known as pitaya, and learn how to incorporate it into your diet.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "Discover the unique appearance and nutritional benefits of dragon fruit, also known as pitaya, and learn how to incorporate it into your diet."
          }
        ]
      }
    ],
  },
  {
    "title": "The World of Tropical Fruits",
    "slug": "tropical-fruits",
    "dateCreated": "2023-12-05T16:45:00.000Z",
    dateModified: "2023-12-05T16:45:00.000Z",
    status: "PUBLIC",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118261/cutefruit/banners/cf-banner-4_a1mzp8.png',
    
    
    "author": {
      connect: {
        email: "admin@tawtaw.site"
      }
    },
    "excerpt": "Explore the amazing diversity of tropical fruits, including mangos, pineapples, and papayas, and learn about their health benefits and culinary uses.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "Explore the amazing diversity of tropical fruits, including mangos, pineapples, and papayas, and learn about their health benefits and culinary uses."
          }
        ]
      }
    ],
  },
  {
    "title": "The Best Fruits for a Summer Picnic",
    "slug": "fruits-summer-picnic",
    "dateCreated": "2023-11-20T12:30:00.000Z",
    dateModified: "2023-12-05T16:45:00.000Z",
    status: "PUBLIC",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118262/cutefruit/banners/cf-banner-3_uuufb0.png',
    
    
    "author": {
      connect: {
        email: "admin@tawtaw.site"
      }
    },
    "excerpt": "Get ready for your next summer picnic with this guide to the best fruits to pack, including watermelon, cherries, and grapes.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "Get ready for your next summer picnic with this guide to the best fruits to pack, including watermelon, cherries, and grapes."
          }
        ]
      }
    ],
  },
  {
    "title": "The Many Uses of Pomegranates",
    "slug": "uses-pomegranates",
    "dateCreated": "2023-10-15T10:00:00.000Z",
    dateModified: "2023-12-05T16:45:00.000Z",
    status: "PUBLIC",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118261/cutefruit/banners/cf-banner-5_hjsqjv.png',
    
    
    "author": {
      connect: {
        email: "admin@tawtaw.site"
      }
    },
    "excerpt": "Discover the many culinary and medicinal uses of pomegranates, including how to juice them and use their seeds in recipes.",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "Discover the many culinary and medicinal uses of pomegranates, including how to juice them and use their seeds in recipes."
          }
        ]
      }
    ],
  }
]
export const categories_seedjson:CategoryCreateInput[] = [
  {
    name: 'pomes',
    excerpt: 'Fruits that have smooth skin and an enlarged fleshy area that surrounds the core. Examples of pomes are apples, pears, and kiwis.',
  },
  {
    name: 'drupes',
    excerpt: 'Fruits that contain a single seed, or pit, surrounded by juicy flesh. Examples of drupes are peaches, cherries, plums, nectarines, and apricots.',
  },
  {
    name: 'berries',
    excerpt: 'Fruits with a fragile cell structure, that are pulpy and juicy with tiny seeds embedded in the flesh. Examples of berries are blackberries, cranberries, strawberries, and grapes.',
  },
  {
    name: 'melons',
    excerpt: ': Fruits that have a hard outer surface that is either smooth or netted with a juicy flesh. Examples of melons include, cantaloupes, honeydew, watermelon, casaba, crenshaw, and muskmelon.',
  },
  {
    name: 'citrus',
    excerpt: ' Fruits that grow in warm regions, and have a firm rind and a pulpy flesh. Examples of citrus fruits are, oranges, grapefruits, tangerines, lemons, limes, kumquats, citrons, tengelows, and ugli fruit.',
  },
  {
    name: 'tropical',
    excerpt: 'Fruits that grow in very warm climates, and differ in skin composition and seed characteristics. Examples, of tropical fruits are bananas, pineapples, avocados, dates, figs, mangoes, pomegranates, and papayas.',
  },

]

export const tags_seedjson:TagCreateInput[] = [
  {
    name: 'blue'
  },
  {
    name: 'yellow'
  },
  {
    name: 'red'
  },
  {
    name: 'purple'
  },
  {
    name: 'white'
  },
  {
    name: 'black'
  },
  {
    name: 'green'
  },
  {
    name: 'stuffed'
  },
  {
    name: 'orange'
  },
  {
    name: 'two-eyes'
  },
  {
    name: 'one-eyed'
  },
  {
    name: 'ears'
  },
  {
    name: 'mouth'
  },
  {
    name: 'leaf'
  },
  {
    name: 'bundle'
  },
  {
    name: 'nose'
  },
]
