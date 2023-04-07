import casual from 'casual';
import { QUERY_PRODUCTS_COUNT } from '../components/Pagination';

// seed it so we get consistent results
casual.seed(777);

const fakeItem = () => ({
  // __typename: 'Item',
  id: 'abc123',
  price: 5000,
  user: null,
  photo: {
    id: 'abc123',
    altText: 'dogs are best',
    image: {
      url: 'dog.jpg',
    },
  },
  name: 'dogs are best',
  description: 'dogs',
});

const fakeUser = (overrides: any | void) => ({
  __typename: 'User',
  id: '4234',
  name: casual.name,
  email: casual.email,
  permissions: ['ADMIN'],
  orders: [],
  cart: [],
  ...overrides,
});

const fakeOrderItem = () => ({
  __typename: 'OrderItem',
  id: casual.uuid,
  image: {
    image: `${casual.word}.jpg`,
  },
  name: casual.words(),
  price: 4234,
  quantity: 1,
  description: casual.words(),
});

const fakeOrder = () => ({
  __typename: 'Order',
  id: 'ord123',
  charge: 'ch_123',
  total: 40000,
  items: [fakeOrderItem(), fakeOrderItem()],
  createdAt: '2022-12-11T20:16:13.797Z',
  // @ts-ignore
  user: fakeUser(),
});

const fakeCartItem = (overrides: any | void) => ({
  __typename: 'CartItem',
  id: 'omg123',
  quantity: 3,
  product: fakeItem(),
  // @ts-ignore
  user: fakeUser(),
  ...overrides,
});

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    // @ts-ignore
    this.store = {};
  }

  clear() {
    // @ts-ignore
    this.store = {};
  }

  getItem(key: any) {
    // @ts-ignore
    return this.store[key] || null;
  }

  setItem(key: any, value: any) {
    // @ts-ignore
    this.store[key] = value.toString();
  }

  removeItem(key: any) {
    // @ts-ignore
    delete this.store[key];
  }
}

function makePaginationMocksFor(length: any) {
  return [
    {
      request: { query: QUERY_PRODUCTS_COUNT },
      result: {
        data: {
          _allProductsMeta: {
            count: length,
          },
          itemsConnection: {
            __typename: 'aggregate',
            aggregate: {
              count: length,
              __typename: 'count',
            },
          },
        },
      },
    },
  ];
}

export {
  makePaginationMocksFor,
  LocalStorageMock,
  fakeItem,
  fakeUser,
  fakeCartItem,
  fakeOrder,
  fakeOrderItem,
};
