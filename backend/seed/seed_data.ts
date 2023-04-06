
function timestamp() {
  // sometime in the last 30 days
  const stampy =
    Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30);
  return new Date(stampy).toISOString();
}

export const user_seeddata = [
  {
    name: 'Adam',
    email: 'adam@m.lan',
    password: 'adam@m.lan',
    isAdmin: true,
  },
  {
    name: 'Eddy',
    email: 'eddy@m.lan',
    password: 'eddy@m.lan',
    isAdmin: false,
  },
  {
    name: 'Cinda',
    email: 'cinda@m.lan',
    password: 'cinda@m.lan',
    isAdmin: false,
  },
]

export const roles_seedjson = [
  {
    name: 'admin',
    canManageProducts: true,
    canSeeOtherUsers: true,
    canManageUsers: true,
    canManageRoles: true,
    canManageCart: true,
    canManageOrders: true,
    assignedTo: {
      connect: {
        email: 'adam@m.lan'
      }
    }
  },
  {
    name: 'editor',
    canManageProducts: true,
    canSeeOtherUsers: true,
    canManageUsers: false,
    canManageRoles: false,
    canManageCart: true,
    canManageOrders: true,
    assignedTo: {
      connect: {
        email: 'eddy@m.lan'
      }
    }
  },
  {
    name: 'client',
    canManageProducts: false,
    canSeeOtherUsers: false,
    canManageUsers: false,
    canManageRoles: false,
    canManageCart: false,
    canManageOrders: false,
    assignedTo: {
      connect: {
        email: 'cinda@m.lan'
      }
    }
  }
]

export const posts_seed = [
  {
    title: 'on3',
    slug: 'on3',
  },
  {
    title: '2wo',
    slug: '2wo',
  },
  {
    title: 'thre3',
    slug: 'thre3',
  },
]

export const tags_seedjson = [
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

export const products_seed = [
  {
    name: 'Banana Cherry',
    description: 'Fluffy and fruity',
    status: 'AVAILABLE',
    price: 3423,
    stockCount: 12,
    slug: 'banana-cherry',
    photo: {
      connect: {
        filename: 'cf-1.png'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'red'},
        { name: 'yellow'},
        { name: 'two-eyes'},
        { name: 'nose'},
        { name: 'leaf'},
      ],
    }
  },
  {
    name: 'Penguin Pear',
    description: 'Cute and fruit',
    status: 'AVAILABLE',
    price: 1212,
    stockCount: 1,
    slug: 'penguin-pear',
    photo: {
      connect: {
        filename: 'cf-2.png'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
          { name: 'red'},
          { name: 'white'},
          { name: 'two-eyes'},
          { name: 'nose'},
          { name: 'black'},
        ]
    }
  },
  {
    name: 'Sidways Pinapple',
    description: 'Wadda head turner',
    status: 'AVAILABLE',
    price: 54321,
    stockCount: 10,
    slug: 'sidways-pinapple',
    photo: {
      connect: {
        filename: 'cf-3.png'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
          { name: 'yellow'},
          { name: 'red'},
          { name: 'two-eyes'},
          { name: 'mouth'},
          { name: 'green'},
        ]
    },
  },
  {
    name: 'Tiger Tomatoe',
    description: 'Rawr',
    status: 'AVAILABLE',
    price: 3433,
    stockCount: 16,
    slug: 'tiger-tomatoe',
    photo: {
      connect: {
        filename: 'cf-4.png'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
          { name: 'red'},
          { name: 'green'},
          { name: 'two-eyes'},
          { name: 'mouth'},
          { name: 'nose'},
          { name: 'green'},
        ]
    },
  },
  {
    name: 'Scared Pear',
    description: 'yellow Green',
    status: 'AVAILABLE',
    price: 1111,
    stockCount: 3,
    slug: 'scared-pear',
    photo: {
      connect: {
        filename: 'cf-5.png'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'yellow'},
        { name: 'green'},
        { name: 'two-eyes'},
        { name: 'stuffed'},
      ]
    },  
  },
  {
    name: 'Strawberry Puff',
    description: 'super cutie',
    status: 'AVAILABLE',
    price: 454,
    stockCount: 956,
    slug: 'strawberry-puff',
    photo: {
      connect: {
        filename: 'cf-6.png'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'white'},
        { name: 'green'},
        { name: 'two-eyes'},
        { name: 'stuffed'},
        { name: 'ears'},
        { name: 'red'},
        { name: 'leaf'},
      ]
    }, 
  },
  {
    name: 'Apple Pillow',
    description: 'an apple a day keeps the frowns away',
    status: 'AVAILABLE',
    price: 77,
    stockCount: 68,
    slug: 'apple-pillow',
    photo: {
      connect: {
        filename: 'cf-7.png'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'yellow'},
        { name: 'green'},
        { name: 'red'},
        { name: 'two-eyes'},
        { name: 'stuffed'},
        { name: 'mouth'},
        { name: 'leaf'},
      ]
    }, 
  },
  {
    name: 'Blue Drop',
    description: 'A little shy, but super friendly once it settles in',
    status: 'AVAILABLE',
    price: 27,
    stockCount: 8,
    slug: 'blue-drop',
    photo: {
      connect: {
        filename: 'cf-8.png'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'blue'},
        { name: 'yellow'},

        { name: 'stuffed'},

        { name: 'one-eyed'},

        { name: 'leaf'},

      ]
    }, 
  },
  {
    name: 'Azure Cyclops',
    description: 'The monster within is brought to life with every stick. This stuffed creature makes a big statement',
    status: 'AVAILABLE',
    price: 27,
    stockCount: 8,
    slug: 'azure-cyclops',
    photo: {
      connect: {
        filename: 'cf-9.png'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'blue'},
        { name: 'black'},
        { name: 'green'},
        { name: 'stuffed'},
        { name: 'one-eyed'},

        { name: 'mouth'},
        { name: 'leaf'},

      ]
    }, 
  },
  {
    name: 'Purple Fuzz Blob',
    description: "This extra fuzzy cutie sproutes a lil green leaf atop it's head",
    status: 'AVAILABLE',
    price: 590,
    stockCount: 81,
    slug: 'purple-blob',
    photo: {
      connect: {
        filename: 'cf-10.png'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'green'},
        { name: 'purple'},
        { name: 'stuffed'},
        { name: 'two-eyes'},
        { name: 'leaf'},
      ]
    }, 
  },
  {
    name: 'Inky Indigo',
    description: 'Wide eyed, 2 legged, cute and cuddly',
    status: 'AVAILABLE',
    price: 25657,
    stockCount: 999,
    slug: 'inky-indigo',
    photo: {
      connect: {
        filename: 'cf-11.png'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'purple'},
        
        { name: 'stuffed'},
        
        { name: 'two-eyes'},
      ]
    }, 
  },
  {
    name: 'Yellow Pearabol',
    description: 'Deliciously spooky, all around frighting',
    status: 'AVAILABLE',
    price: 237,
    stockCount: 8111,
    slug: 'yellow-pearabol',
    photo: {
      connect: {
        filename: 'cf-12.png'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        
        { name: 'yellow'},
        
        { name: 'green'},
        { name: 'stuffed'},
        
        { name: 'one-eyed'},
        
        { name: 'leaf'},

      ]
    }, 
  },
  {
    name: 'Kiwi Kidz',
    description: 'Rag tag team from down unda!',
    status: 'AVAILABLE',
    price: 27,
    stockCount: 8,
    slug: 'kiwi-kidz',
    photo: {
      connect: {
        filename: 'cf-13.png'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        

        { name: 'green'},
        { name: 'stuffed'},
        
        { name: 'two-eyes'},
 
        
        { name: 'bundle'},
        { name: 'nose'},
      ]
    }, 
  },
  {
    name: 'Quad Kumquats',
    description: '4 of the most adorable citrus fruits',
    status: 'AVAILABLE',
    price: 2557,
    stockCount: 89,
    slug: 'quad-kumquats',
    photo: {
      connect: {
        filename: 'cf-14.png'
      }
    },

    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'purple'},
        { name: 'yellow'},
        { name: 'red'},

        { name: 'green'},
        { name: 'stuffed'},
        { name: 'orange'},


        { name: 'leaf'},
        { name: 'bundle'},

      ]
    }, 
  },
  
]

export const productImage_seedjson = [
  {
    altText: 'banana cherry photo',
    filename: 'cf-1.png'
  },
  {
    altText: 'penguine pear featured photo',
    filename: 'cf-2.png'
  },
  {
    altText: 'sideways pinapple featured photo',
    filename: 'cf-3.png'
  },
  {
    altText: 'tiger tomatoe photo',
    filename: 'cf-4.png'
  },
  {
    altText: 'scared pear photo',
    filename: 'cf-5.png'
  },
  {
    altText: 'strawberry puff featured photo',
    filename: 'cf-6.png'
  },
  {
    altText: 'Apple Pillow featured photo',
    filename: 'cf-7.png'
  },
  {
    altText: 'Blue Drop featured photo',
    filename: 'cf-8.png'
  },
  {
    altText: 'Azure Cyclops featured photo',
    filename: 'cf-9.png'
  },
  {
    altText: 'Purple Fuzz Blob featured photo',
    filename: 'cf-10.png'
  },
  {
    altText: 'Inky Indigo featured photo',
    filename: 'cf-11.png'
  },
  {
    altText: 'Yellow Pearabol featured photo',
    filename: 'cf-12.png'
  },
  {
    altText: 'Kiwi Kidz featured photo',
    filename: 'cf-13.png'
  },
  {
    altText: 'Quad Kumquats featured photo',
    filename: 'cf-14.png'
  },
]
