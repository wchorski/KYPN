// @ts-nocheck
// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/types.ts
// NOTE -- these types are commented out in master because they aren't generated by the build (yet)
// To get full List and GraphQL API type support, uncomment them here and use them below
// import type { KeystoneListsTypeInfo } from './.keystone/schema-types';

import { KeystoneGraphQLAPI, KeystoneListsAPI } from '@keystone-6/core/types';
import type { Permission } from './schemas/fields';


export type Session = {
  itemId: string;
  listKey: string;
  data: {
    name: string;
    role?: {
      id: string;
      name: string;
    } & {
      [key in Permission]: boolean;
    };
  };
};

export type ListsAPI = KeystoneListsAPI<any /* KeystoneListsTypeInfo */>;
export type GraphqlAPI = KeystoneGraphQLAPI<any /* KeystoneListsTypeInfo */>;

export type AccessArgs = {
  session?: Session;
  item?: any;
};

export type AccessControl = {
  [key: string]: (args: AccessArgs) => any;
};

export type ListAccessArgs = {
  itemId?: string;
  session?: Session;
};

export type CartItem = {
  id: string,
  name: string,
  price: number,
  quantity: number,
  product: Product

}

export type Product = {
  id: string,
  price: number,
  name: string,
  slug: string,
  status: string,
  stockCount: string,
  description: string,
  photo: Photo,
  stripeProductId: string,
  stripePriceId: string,
  tags: Tag[],
  categories: Category[],
  dateCreated: string,
  dateModified: string,
}

export type ProductImage = {
  image: any,
  url: string,
  altText: string,
  filename: string,
  product: Product,
  subscription: any,
}

export type Photo = {
  id: string,
  altText: string,
  image: {
    url: string
  }
}

export type Orders = {
  Orders: [Order]
}

export type Order = {
  id: string,
  charge: string,
  total: number,
  createdAt: string,
  user: {
    id: string,
  }
  items: [OrderItem]
}

export type OrderItem = {
  id: string,
  name: string,
  description: string,
  price: number,
  quantity: number,
  productId: string,
  photo: Photo,
  dateCreated: string,
  dateModified: string,
}

export type User = {
  id: string,
  name: string,
  email: string,
  password: string,
  isAdmin: boolean,
  isActive: boolean,
  stripeCustomerId: string,
  posts: any[],
  pages: any[],
  servicesProvided: Service[],
  bookings: any[],
  gigs: any[],
  availability: Availability[],
  cart: CartItem[],
  createdAt: string,
  products: Product[],
  subscriptionPlans: any[],
  subscriptions: any[],
  orders: OrderItem[],
  role: any,
  dateCreated: string,
  dateModified: string,
}

export type Availability = {
  id: string,
  dateTime: string,
  durationInHours: string,
  employee: User,
  type: string,
  status: string,
  dateCreated: string,
  dateModified: string,
}

export type Booking = {
  id: string,
  dateTime: string,
  durationInHours: string,
  service: Service[],
  price: number,
  employees: User[],
  customer: User,
  notes: string,
  dateCreated: string,
  dateModified: string,
}

export type Category = {
  id: string,
  name: string,
  description: string,
  pages: Page[],
  posts: Post[],
  products: Product[],
  subscriptions: any[],
  services: Service[],
}

export type Tag = {
  id: string,
  name: string,
  pages: Page[],
  posts: Post[],
  products: Product[],
  subscriptions: any[],
  services: Service[],
}

export type Page = {
  id: string,
  title: string,
  slug: string,
  dateCreated: string,
  dateModified: string,
  status: string,
  template: string,
  pinned: number,
  excerpt: string,
  featured_image: string,
  featured_video: string,
  content: any,
  author: User,
  categories: Category[],
  tags: Tag[],
}

export type Post = {
  id: string,
  title: string,
  slug: string,
  dateCreated: string,
  dateModified: string,
  status: string,
  template: string,
  pinned: number,
  excerpt: string,
  featured_image: string,
  featured_video: string,
  content: any,
  author: User,
  categories: Category[],
  tags: Tag[],
}

export type Role = {
  id: string,
  name: string,
  assignedTo: User,
}

export type Service = {
  id: string,
  name: string,
  description: string,
  price: number,
  durationInHours: string,
  buisnessHourOpen: string,
  buisnessHourClosed: string,
  employees: User[],
  bookings: Booking[],
  categories: Category[],
  tags: Tag[],
}

export type SubscriptionPlan = {
  id: string,
  photo: ProductImage,
  author: User,
  name: string,
  slug: string,
  description: string,
  status: string,
  price: number,
  stripeProductId: string,
  stripePriceId: string,
  billing_interval: string,
  items: any[]
  stockCount: number,
  tags: Tag[],
  categories: Category[],
}

export type SubscriptionItem = {
  id: string,
  custom_price: number,
  subscriptionPlan: SubscriptionPlan,
  isActive: boolean,
  isDelinquent: boolean,
  user: User,

}

export type Addon = {
  id: string,
  name: string,
  description: string,
  price: number,
  services: Service[],
  bookings: Booking[],
  categories: Category[],
  tags: Tag[],
}

export type IDObj = {
  id: string,
}