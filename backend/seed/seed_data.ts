
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
        altText: 'banana cherry photo'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: {
        name: ['red', 'yellow', 'two-eyes', 'nose', 'leaf']
      }
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
        altText: 'penguine pear featured photo'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: {
        name: ['red', 'white', 'two-eyes', 'nose', 'leaf', 'black']
      }
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
        altText: 'sideways pinapple featured photo'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
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
        altText: 'tiger tomatoe photo'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
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
        altText: 'scared pear photo'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
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
        altText: 'strawberry puff featured photo'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
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
        altText: 'Apple Pillow featured photo'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
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
        altText: 'Blue Drop featured photo'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
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
        altText: 'Azure Cyclops featured photo'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
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
        altText: 'Purple Blob featured photo'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
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
        altText: 'Inky Indigo featured photo'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
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
        altText: 'Yellow Pearabol featured photo'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
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
        altText: 'Kiwi Kidz featured photo'
      }
    },
    user: {
      connect: {
        email: 'adam@m.lan'
      }
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
        altText: 'Quad Kumquats featured photo'
      }
    },

    user: {
      connect: {
        email: 'adam@m.lan'
      }
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
  // {
  //   altText: 'sideways pinapple featured photo',
  //   filename: 'cf-3.png'
  // },
  // {
  //   altText: 'tiger tomatoe photo',
  //   filename: 'cf-4.png'
  // },
  // {
  //   altText: 'scared pear photo',
  //   filename: 'cf-5.png'
  // },
  // {
  //   altText: 'strawberry puff featured photo',
  //   filename: 'cf-6.png'
  // },
  // {
  //   altText: 'Apple Pillow featured photo',
  //   filename: 'cf-7.png'
  // },
  // {
  //   altText: 'Blue Drop featured photo',
  //   filename: 'cf-8.png'
  // },
  // {
  //   altText: 'Azure Cyclops featured photo',
  //   filename: 'cf-9.png'
  // },
  // {
  //   altText: 'Purple Blob featured photo',
  //   filename: 'cf-10.png'
  // },
  // {
  //   altText: 'Inky Indigo featured photo',
  //   filename: 'cf-11.png'
  // },
  // {
  //   altText: 'Yellow Pearabol featured photo',
  //   filename: 'cf-12.png'
  // },
  // {
  //   altText: 'Kiwi Kidz featured photo',
  //   filename: 'cf-13.png'
  // },
  // {
  //   altText: 'Quad Kumquats featured photo',
  //   filename: 'cf-14.png'
  // },
]
