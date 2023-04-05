const FRONTEND_URL = process.env.FRONTEND_URL

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

export const productImages_seeddata = [
  {
    altText: 'banana cherry photo',
    id: 'cf-1-photo'
  },
  {
    altText: 'banana cherry photo',
    id: 'cf-2-photo'
  },
  {
    altText: 'banana cherry photo',
    id: 'cf-3-photo'
  }
]

export const productImages_seeddat_2 = [
  {
    altText: 'banana cherry photo',
    id: 'cf-1-photo',
    image: {
      extension: 'png',
      filesize: 666,
      height: 300,
      width: 300,
      id: 'cf-1-img',
      url: `${FRONTEND_URL}/assets/images/cf-1.png`
    }
  },
  {
    altText: 'banana cherry photo',
    id: 'cf-2-photo',
    image: {
      extension: 'png',
      filesize: 666,
      height: 300,
      width: 300,
      id: 'cf-2-img',
      url: `${FRONTEND_URL}/assets/images/cf-2.png`
    }
  },
  {
    altText: 'banana cherry photo',
    id: 'cf-3-photo',
    image: {
      extension: 'png',
      filesize: 666,
      height: 300,
      width: 300,
      id: 'f-3-img',
      url: `${FRONTEND_URL}/assets/images/cf-3.png`
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

export const products_seed = [
  {
    name: 'Banana Cherry',
    description: 'Fluffy and fruity',
    status: 'AVAILABLE',
    price: 3423,
    stockCount: 12,
    slug: 'banana-cherry',
    photo: {
      image: {
        extension: 'png',
        filesize: 666,
        height: 300,
        width: 300,
        id: 'cf-1-img',
        url: `${FRONTEND_URL}/assets/images/cf-1.png`,
      },
      altText: 'banana cherry photo',
      id: 'cf-1-photo',
      user: {
        connect: {
          email: 'adam@m.lan'
        }
      },
    },
  },
  {
    name: 'Penguin Pear',
    description: 'Cute and fruit',
    status: 'AVAILABLE',
    price: 1212,
    stockCount: 1,
    slug: 'penguin-pear',
    photo: {
      image: {
        extension: 'png',
        filesize: 666,
        height: 300,
        width: 300,
        id: 'cf-2-img',
        url: `${FRONTEND_URL}/assets/images/cf-2.png`,
      },
      altText: 'banana cherry photo',
      id: 'cf-2-photo',
      user: {
        connect: {
          email: 'adam@m.lan'
        }
      },
    },
  },
  {
    name: 'Sidways Pinapple',
    description: 'Wadda head turner',
    status: 'AVAILABLE',
    price: 54321,
    stockCount: 10,
    slug: 'sidways-pinapple',
    photo: {
      image: {
        extension: 'png',
        filesize: 666,
        height: 300,
        width: 300,
        id: 'cf-3-img',
        url: `${FRONTEND_URL}/assets/images/cf-3.png`,
      },
      altText: 'banana cherry photo',
      id: 'cf-3-photo',
      user: {
        connect: {
          email: 'adam@m.lan'
        }
      },
    },
  },
  
]
