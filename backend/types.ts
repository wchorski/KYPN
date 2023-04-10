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
  description: string,
  photo: Photo
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
  photo: Photo
}