// cred - http://facsfinalproject.weebly.com/6-categories-of-fruits.html

function timestamp() {
  // sometime in the last 30 days
  const stampy =
    Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30);
  return new Date(stampy).toISOString();
}

export const locations_seeddata = []
export const pages_seeddata = []
export const subscriptionPlans_seedjson = []

export const events_seeddata = []

export const user_seeddata = [
  {
    name: 'Admin',
    email: 'admin@m.lan',
    authId: 'admin@m.lan',
    password: 'admin@m.lan',
    isAdmin: true,
    isVerified: true,
  },
]

export const roles_seedjson = [
  {
    name: 'admin',
    label: 'Admin',
    canManageProducts: true,
    canManagePosts: true,
    canManageEvents: true,
    canManageTickets: true,
    canSeeOtherUsers: true,
    canManageUsers: true,
    canManageRoles: true,
    canManageCart: true,
    canManageOrders: true,
    canManageAddons: true,
    canManageServices: true,
    canManageBookings: true,
    canManageAvailability: true,
    canManagePages: true,
    canManageLocations: true,
    canManageAnnouncements: true,
    // TODO why this no work?
    // canOrder: true,
    // canManageOrderItems: true,
    canReadProducts: true,
    canManageCategories: true,
    canManageTags: true,
    canManageSubscriptionPlans: true,
    canManageCoupons: true,
    canManageSubscriptionItems: true,
    assignedTo: {
      connect: {
        email: 'admin@m.lan'
      }
    }
  },
  {
    name: 'editor',
    label: 'Editor',
    canManageProducts: true,
    canManageEvents: true,
    canSeeOtherUsers: true,
    canManageUsers: false,
    canManageRoles: false,
    canManageCart: true,
    canManageOrders: true,
  },
  {
    name: 'ticket taker',
    label: 'ticket taker',
    canManageTickets: true,
  },
  {
    name: 'client',
    label: 'Client',
    canSeeOtherUsers: false,
    canManageCart: false,
  }
]

export const posts_seedjson = []

export const categories_seedjson = []

export const tags_seedjson = []

export const products_seed = []

export const productImage_seedjson = []

export const subscriptions_seedjson = []

export const services_seedjson = []

export const addons_seedjson  = []

export const avail_seedjson = []