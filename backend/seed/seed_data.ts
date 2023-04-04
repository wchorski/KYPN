const FRONTEND_URL = process.env.FRONTEND_URL

function timestamp() {
  // sometime in the last 30 days
  const stampy =
    Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30);
  return new Date(stampy).toISOString();
}

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
    },
  },
  
]
