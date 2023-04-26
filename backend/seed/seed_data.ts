// cred - http://facsfinalproject.weebly.com/6-categories-of-fruits.html

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

export const categories_seedjson = [
  {
    name: 'Pomes',
    description: 'Fruits that have smooth skin and an enlarged fleshy area that surrounds the core. Examples of pomes are apples, pears, and kiwis.',
  },
  {
    name: 'Drupes',
    description: 'Fruits that contain a single seed, or pit, surrounded by juicy flesh. Examples of drupes are peaches, cherries, plums, nectarines, and apricots.',
  },
  {
    name: 'Berries',
    description: 'Fruits with a fragile cell structure, that are pulpy and juicy with tiny seeds embedded in the flesh. Examples of berries are blackberries, cranberries, strawberries, and grapes.',
  },
  {
    name: 'Melons',
    description: ': Fruits that have a hard outer surface that is either smooth or netted with a juicy flesh. Examples of melons include, cantaloupes, honeydew, watermelon, casaba, crenshaw, and muskmelon.',
  },
  {
    name: 'Citrus',
    description: ' Fruits that grow in warm regions, and have a firm rind and a pulpy flesh. Examples of citrus fruits are, oranges, grapefruits, tangerines, lemons, limes, kumquats, citrons, tengelows, and ugli fruit.',
  },
  {
    name: 'Tropical',
    description: 'Fruits that grow in very warm climates, and differ in skin composition and seed characteristics. Examples, of tropical fruits are bananas, pineapples, avocados, dates, figs, mangoes, pomegranates, and papayas.',
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
        { name: 'red' },
        { name: 'yellow' },
        { name: 'two-eyes' },
        { name: 'nose' },
        { name: 'leaf' },
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
        { name: 'red' },
        { name: 'white' },
        { name: 'two-eyes' },
        { name: 'nose' },
        { name: 'black' },
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
        { name: 'yellow' },
        { name: 'red' },
        { name: 'two-eyes' },
        { name: 'mouth' },
        { name: 'green' },
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
        { name: 'red' },
        { name: 'green' },
        { name: 'two-eyes' },
        { name: 'mouth' },
        { name: 'nose' },
        { name: 'green' },
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
        { name: 'yellow' },
        { name: 'green' },
        { name: 'two-eyes' },
        { name: 'stuffed' },
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
        { name: 'white' },
        { name: 'green' },
        { name: 'two-eyes' },
        { name: 'stuffed' },
        { name: 'ears' },
        { name: 'red' },
        { name: 'leaf' },
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
        { name: 'yellow' },
        { name: 'green' },
        { name: 'red' },
        { name: 'two-eyes' },
        { name: 'stuffed' },
        { name: 'mouth' },
        { name: 'leaf' },
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
        { name: 'blue' },
        { name: 'yellow' },

        { name: 'stuffed' },

        { name: 'one-eyed' },

        { name: 'leaf' },

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
        { name: 'blue' },
        { name: 'black' },
        { name: 'green' },
        { name: 'stuffed' },
        { name: 'one-eyed' },

        { name: 'mouth' },
        { name: 'leaf' },

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
        { name: 'green' },
        { name: 'purple' },
        { name: 'stuffed' },
        { name: 'two-eyes' },
        { name: 'leaf' },
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
        { name: 'purple' },

        { name: 'stuffed' },

        { name: 'two-eyes' },
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

        { name: 'yellow' },

        { name: 'green' },
        { name: 'stuffed' },

        { name: 'one-eyed' },

        { name: 'leaf' },

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


        { name: 'green' },
        { name: 'stuffed' },

        { name: 'two-eyes' },


        { name: 'bundle' },
        { name: 'nose' },
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
        { name: 'purple' },
        { name: 'yellow' },
        { name: 'red' },

        { name: 'green' },
        { name: 'stuffed' },
        { name: 'orange' },


        { name: 'leaf' },
        { name: 'bundle' },

      ]
    },
  },

]

export const productImage_seedjson = [
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-1_vl6py2.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-1_vl6py2.png',
    // },
    altText: 'banana cherry photo',
    filename: 'cf-1.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-2_irpljj.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-2_irpljj.png',
    // },
    altText: 'penguine pear featured photo',
    filename: 'cf-2.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-3_jjjfad.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-3_jjjfad.png',
    // },
    altText: 'sideways pinapple featured photo',
    filename: 'cf-3.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-4_z3zuqd.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-4_z3zuqd.png',
    // },
    altText: 'tiger tomatoe photo',
    filename: 'cf-4.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-5_osljd5.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-5_osljd5.png',
    // },
    altText: 'scared pear photo',
    filename: 'cf-5.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-6_dct4dt.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-6_dct4dt.png',
    // },
    altText: 'strawberry puff featured photo',
    filename: 'cf-6.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-7_jhczgi.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-7_jhczgi.png',
    // },
    altText: 'Apple Pillow featured photo',
    filename: 'cf-7.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-8_dqp2gy.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-8_dqp2gy.png',
    // },
    altText: 'Blue Drop featured photo',
    filename: 'cf-8.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-9_mevrrl.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-9_mevrrl.png',
    // },
    altText: 'Azure Cyclops featured photo',
    filename: 'cf-9.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-10_c0juxo.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-10_c0juxo.png',
    // },
    altText: 'Purple Fuzz Blob featured photo',
    filename: 'cf-10.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-11_o8r6mg.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-11_o8r6mg.png',
    // },
    altText: 'Inky Indigo featured photo',
    filename: 'cf-11.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-12_if5w53.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-12_if5w53.png',
    // },
    altText: 'Yellow Pearabol featured photo',
    filename: 'cf-12.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-13_ah8qyb.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-13_ah8qyb.png',
    // },
    altText: 'Kiwi Kidz featured photo',
    filename: 'cf-13.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-14_f2xb2o.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-14_f2xb2o.png',
    // },
    altText: 'Quad Kumquats featured photo',
    filename: 'cf-14.png'
  },
]

export const posts_seedjson = [
  {
    "title": "The Health Benefits of Berries",
    "slug": "health-benefits-berries",
    "dateCreated": "2023-05-01T10:00:00.000Z",
    dateModified: "2023-05-01T10:00:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 5,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      "connect": {
        "email": "adam@m.lan"
      }
    },
    categories: {
      connect: [
        { name: 'Berries' }
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
    "excerpt": "Learn about the amazing health benefits of various types of berries, including blueberries, strawberries, and raspberries."
  },
  {
    "title": "The World of Exotic Fruits",
    "slug": "exotic-fruits",
    "dateCreated": "2023-06-15T12:30:00.000Z",
    dateModified: "2023-06-15T12:30:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 1,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: true,
    "author": {
      "connect": {
        "email": "adam@m.lan"
      }
    },
    categories: {
      connect: [
        { name: 'Berries' },
        { name: 'Citrus' },
      ]
    },
    tags: {
      connect: [
        { name: 'red' },
        { name: 'yellow' },
        { name: 'two-eyes' },

      ],
    },
    "excerpt": "Take a journey to discover some of the most unique and exotic fruits from around the world, including jackfruit, durian, and mangosteen."
  },
  {
    "title": "Fruit Smoothies: A Healthy and Delicious Option",
    "slug": "fruit-smoothies-healthy-delicious",
    "dateCreated": "2023-07-10T16:45:00.000Z",
    dateModified: "2023-07-10T16:45:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      "connect": {
        "email": "adam@m.lan"
      }
    },
    categories: {
      connect: [
        { name: 'Tropical' },
        { name: 'Pomes' },
        { name: 'Drupes' },
        { name: 'Melons' },
      ]
    },
    tags: {
      connect: [

        { name: 'yellow' },
        { name: 'two-eyes' },

        { name: 'leaf' },
      ],
    },
    "excerpt": "Find out how to make nutritious and tasty fruit smoothies using a variety of fruits, such as bananas, strawberries, and kiwis."
  },
  {
    "title": "The Wonderful World of Apples",
    "slug": "wonderful-world-apples",
    "dateCreated": "2023-08-22T09:15:00.000Z",
    dateModified: "2023-08-22T09:15:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      "connect": {
        "email": "adam@m.lan"
      }
    },
    "excerpt": "Explore the diverse world of apples, from sweet and crisp varieties like Honeycrisp and Pink Lady to tart and tangy options like Granny Smith and Braeburn."
  },
  {
    "title": "The Beauty of Fruit Art",
    "slug": "fruit-art",
    "dateCreated": "2023-09-30T14:00:00.000Z",
    dateModified: "2023-09-30T14:00:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      "connect": {
        "email": "adam@m.lan"
      }
    },
    "excerpt": "Discover the creative and beautiful world of fruit art, from simple designs like watermelon baskets to intricate sculptures made from a variety of fruits."
  },
  {
    "title": "Fruity Suprise",
    "slug": "fruity-suprise",
    "dateCreated": "2022-08-24T14:00:00.000Z",
    dateModified: "2022-08-24T14:00:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      "connect": {
        "email": "adam@m.lan"
      }
    }
  },
  {
    "title": "Exploring the World of Exotic Fruits",
    "slug": "exploring-exotic-fruits",
    "dateCreated": "2022-08-24T14:00:00.000Z",
    dateModified: "2023-04-17T14:00:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      "connect": {
        "email": "adam@m.lan"
      }
    },
    "excerpt": "Have you ever wondered what other fruits are out there beyond the ones you see at your local grocery store? There's a whole world of exotic fruits waiting to be discovered and tasted!",
  },
  {
    "title": "The Sweet and Sour World of Citrus Fruits",
    "slug": "sweet-sour-citrus-fruits",
    "dateCreated": "2023-04-17T14:00:00.000Z",
    dateModified: "2024-02-28T14:00:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      "connect": {
        "email": "adam@m.lan"
      }
    },
    "excerpt": "Discover the delicious and tangy world of citrus fruits, from lemons and limes to oranges and grapefruits.",
  },
  {
    "title": "Fruit and Cheese Pairings for a Perfect Charcuterie Board",
    "slug": "fruit-cheese-pairings-charcuterie-board",
    "dateCreated": "2024-02-28T14:00:00.000Z",
    dateModified: "2024-02-28T14:00:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      "connect": {
        "email": "adam@m.lan"
      }
    },
    "excerpt": "Take your charcuterie board to the next level with these delicious fruit and cheese pairings, featuring combinations like figs and goat cheese and apples and cheddar."
  },
  {
    "title": "The Beauty and Benefits of Dragon Fruit",
    "slug": "dragon-fruit-beauty-benefits",
    "dateCreated": "2024-01-12T09:15:00.000Z",
    dateModified: "2024-01-12T09:15:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      "connect": {
        "email": "adam@m.lan"
      }
    },
    "excerpt": "Discover the unique appearance and nutritional benefits of dragon fruit, also known as pitaya, and learn how to incorporate it into your diet."
  },
  {
    "title": "The World of Tropical Fruits",
    "slug": "tropical-fruits",
    "dateCreated": "2023-12-05T16:45:00.000Z",
    dateModified: "2023-12-05T16:45:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      "connect": {
        "email": "adam@m.lan"
      }
    },
    "excerpt": "Explore the amazing diversity of tropical fruits, including mangos, pineapples, and papayas, and learn about their health benefits and culinary uses."
  },
  {
    "title": "The Best Fruits for a Summer Picnic",
    "slug": "fruits-summer-picnic",
    "dateCreated": "2023-11-20T12:30:00.000Z",
    dateModified: "2023-12-05T16:45:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      "connect": {
        "email": "adam@m.lan"
      }
    },
    "excerpt": "Get ready for your next summer picnic with this guide to the best fruits to pack, including watermelon, cherries, and grapes."
  },
  {
    "title": "The Many Uses of Pomegranates",
    "slug": "uses-pomegranates",
    "dateCreated": "2023-10-15T10:00:00.000Z",
    dateModified: "2023-12-05T16:45:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      "connect": {
        "email": "adam@m.lan"
      }
    },
    "excerpt": "Discover the many culinary and medicinal uses of pomegranates, including how to juice them and use their seeds in recipes."
  }
]

export const subscriptions_seedjson = [
  {
    "name": "The Fruit Fiesta",
    "slug": "fruit-fiesta",
    "description": "Join the party with a fully loaded fruit basket every month!",
    "price": 30003,
    "stockCount": 4,
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    }
  },
  {
    "name": "The Double Trouble Fruity Bundle",
    "slug": "double-trouble-fruity-bundle",
    "description": "Twice the fruit, twice the fun! Receive a fully loaded fruit basket every two months.",
    "price": 160002,
    "stockCount": 4,
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    }
  },
  {
    "name": "The Great Fruit Escape",
    "slug": "great-fruit-escape",
    "description": "Escape into the world of fresh fruit every three months with a fully loaded fruit basket!",
    "price": 450009,
    "stockCount": 4,
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    }
  }
]

export const services_seedjson = [
  {
    "name": "Fruit Basket Service",
    "price": 100010,
    "durationInHours": "1.5",
    "employees": {
      "connect": [
        { "email": "adam@m.lan" },
        { "email": "eddy@m.lan" }
      ]
    }
  },
  {
    "name": "Citrus Platter Service",
    "price": 220000,
    "durationInHours": "2.5",
    "employees": {
      "connect": [
        { "email": "adam@m.lan" },
        { "email": "eddy@m.lan" }
      ]
    }
  },
  {
    "name": "Open Smoothie Bar",
    "price": 33320000,
    "durationInHours": "4.5",
    "employees": {
      "connect": [
        { "email": "adam@m.lan" },
        { "email": "eddy@m.lan" }
      ]
    }
  }
]