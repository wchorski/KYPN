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

export const user_seeddata = []

export const roles_seedjson = []

export const posts_seed = []

export const categories_seedjson = []

export const tags_seedjson = []

export const products_seed = []

export const productImage_seedjson = []

export const posts_seedjson = []

export const subscriptions_seedjson = []

export const services_seedjson = []

export const addons_seedjson  = []

export const avail_seedjson = []