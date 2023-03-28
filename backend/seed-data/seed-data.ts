function timestamp() {
  // sometime in the last 30 days
  const stampy =
    Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30);
  return new Date(stampy).toISOString();
}

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
    name: 'Hand Bag 1',
    description: 'soo nice',
    status: 'AVAILABLE',
    price: 3423,
    // photo: {
    //   image: {
    //     url: "http://localhost:3001/images/b6ec3f2f-c365-4135-b9b1-dbfa5270ae1b.jpg",
    //   },
    // },
  },
  {
    name: 'Hand Bag 2',
    description: 'soo nice',
    status: 'AVAILABLE',
    price: 3423,
    // photo: {
    //   image: {
    //     url: "http://localhost:3001/images/b6ec3f2f-c365-4135-b9b1-dbfa5270ae1b.jpg",
    //   },
    // },
  },
  {
    name: 'Hand Bag 3',
    description: 'soo nice',
    status: 'AVAILABLE',
    price: 3423,
    // photo: {
    //   image: {
    //     url: "http://localhost:3001/images/b6ec3f2f-c365-4135-b9b1-dbfa5270ae1b.jpg",
    //   },
    // },
  },
]