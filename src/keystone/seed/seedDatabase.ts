// @ts-ignore
import { Context } from '.keystone/types';
import { 
  addons_seedjson, 
  avail_seedjson, 
  categories_seedjson, 
  events_seeddata, 
  locations_seeddata, 
  pages_seeddata, 
  posts_seedjson, 
  // productImage_seedjson, 
  products_seed, 
  roles_seedjson, 
  services_seedjson, 
  subscriptionPlans_seedjson, 
  tags_seedjson, 
  user_seeddata 
} from './seed_data';
//@ts-ignore
import { prepareToUpload } from '../prepareToUpload.js';
import { Category, Post, Product, Tag, User } from '../types';

const seedUsers = async (context: Context) => {
  const { db } = context.sudo();
  const rawJSONData = JSON.stringify(user_seeddata);
  const seedUsers: any[] = JSON.parse(rawJSONData);
  const usersAlreadyInDatabase = await db.User.findMany({
    where: {
      email: { in: seedUsers.map(user => user.email) },
    },
  });
  const usersToCreate = seedUsers.filter(
    // @ts-ignore
    seedUser => !usersAlreadyInDatabase.some((u:User) => u.email === seedUser.email)
  )

  usersToCreate.map(obj => {
    console.log(" + USER: " + obj.name)
  })

  await db.User.createMany({
    data: usersToCreate,
  });
};

const seedAvail = async (context: Context) => {
  const { db } = context.sudo();
  const seedObjs: any[] = avail_seedjson;
  const objsAlreadyInDatabase = await db.Availability.findMany({
    where: {
      // @ts-ignore
      start: { in: seedObjs.map(obj => obj.start) },
    },
  });
  const objsToCreate = seedObjs.filter(
    seedObj => !objsAlreadyInDatabase.some((obj:any) => obj.start === seedObj.start)
  )

  objsToCreate.map(obj => {
    console.log(" + Avail: " + obj.start)
  })

  await db.Availability.createMany({
    data: objsToCreate,
  });
};

const seedRoles = async (context: Context) => {
  const { db } = context.sudo();
  // const rawJSONData = JSON.stringify(roles_seedjson);
  const seedRoles: any[] = roles_seedjson
  // @ts-ignore
  const objsAlreadyInDatabase = await db.Role.findMany({
    where: {
      name: { in: seedRoles.map(i => i.name) },
    },
  });
  const itemsToCreate = seedRoles.filter(
    seedRole => !objsAlreadyInDatabase.some((u: any) => u.name === seedRole.name)
  );
  
  itemsToCreate.map(obj => {
    console.log(" + Role: " + obj.name)
  })

  // @ts-ignore
  await db.Role.createMany({
    data: itemsToCreate,
  });
};

// seed posts and connect with users
const seedPosts = async (context: Context) => {
  const { db } = context.sudo();
  const seedPosts: any[] = posts_seedjson;
  const postsAlreadyInDatabase = await db.Post.findMany({
    where: {
      slug: { in: seedPosts.map(post => post.slug) },
    },
  });
  
  const postsToCreate = seedPosts.filter(
    // @ts-ignore
    seedPost => !postsAlreadyInDatabase.some((p:Post)=> p.slug === seedPost.slug)
  );

  postsToCreate.map(obj => {
    console.log(" + Post: " + obj.slug)
  })

  await db.Post.createMany({
    data: postsToCreate.map(p => ({ ...p, content: p?.content?.document })),
  });
};

const seedTags = async (context: Context) => {
  const { db } = context.sudo();
  const seedObjects: any[] = tags_seedjson;
  const objectsAlreadyInDatabase = await db.Tag.findMany({
    where: {
      name: { in: seedObjects.map(obj => obj.name) },
    },
  });
  const objsToCreate = seedObjects.filter(
    //@ts-ignore
    seedObj => !objectsAlreadyInDatabase.some((dbObj:Tag) => dbObj.name === seedObj.name)
  );

  objsToCreate.map(obj => {
    console.log(" + Tag: " + obj.name)
  })

  await db.Tag.createMany({
    data: objsToCreate.map(obj => ({ ...obj })),
  });
};

const seedCategories = async (context: Context) => {
  const { db } = context.sudo();
  const seedObjects: any[] = categories_seedjson;
  const objectsAlreadyInDatabase = await db.Category.findMany({
    where: {
      name: { in: seedObjects.map(obj => obj.name) },
    },
  });
  const objsToCreate = seedObjects.filter(
    //@ts-ignore
    seedObj => !objectsAlreadyInDatabase.some((dbObj:Category) => dbObj.name === seedObj.name)
  );

  objsToCreate.map(obj => {
    console.log(" + Category: " + obj.name)
  })

  await db.Category.createMany({
    data: objsToCreate.map(obj => ({ ...obj })),
  });
};

const seedProducts = async (context: Context) => {
  const { db } = context.sudo();
  const seedObjects: any[] = products_seed;
  const objectsAlreadyInDatabase = await db.Product.findMany({
    where: {
      slug: { in: seedObjects.map(obj => obj.slug) },
    },
  });
  const objsToCreate = seedObjects.filter(
    //@ts-ignore
    seedObj => !objectsAlreadyInDatabase.some((p:Product) => p.slug === seedObj.slug)
  );

  objsToCreate.map(obj => {
    console.log(" + Product: " + obj.slug)
  })

  await db.Product.createMany({
    data: objsToCreate.map(obj => ({ ...obj })),
  });
};

const seedSubscriptions = async (context: Context) => {
  const { db } = context.sudo();
  const seedObjects: any[] = subscriptionPlans_seedjson;
  const objectsAlreadyInDatabase = await db.SubscriptionPlan.findMany({
    where: {
      slug: { in: seedObjects.map(obj => obj.slug) },
    },
  });
  const objsToCreate = seedObjects.filter(
    seedObj => !objectsAlreadyInDatabase.some((p: any) => p.slug === seedObj.slug)
  );

  objsToCreate.map(obj => {
    console.log(" + SubPlan: " + obj.slug)
  })

  await db.SubscriptionPlan.createMany({
    data: objsToCreate.map(obj => ({ ...obj })),
  });
};

const seedEventData = async (context: Context) => {
  const { db } = context.sudo();
  const seedObjects: any[] = events_seeddata;
  const objectsAlreadyInDatabase = await db.Event.findMany({
    where: {
      summary: { in: seedObjects.map(obj => obj.summary) },
    },
  });
  const objsToCreate = seedObjects.filter(
    seedObj => !objectsAlreadyInDatabase.some((p: any) => p.summary === seedObj.summary)
  );

  objsToCreate.map(obj => {
    console.log(" + Event: " + obj.summary)
  })

  await db.Event.createMany({
    data: objsToCreate.map(obj => ({ ...obj })),
  });
};

const seedLocations = async (context: Context) => {
  const { db } = context.sudo();
  const seedObjects: any[] = locations_seeddata;
  const objectsAlreadyInDatabase = await db.Location.findMany({
    where: {
      name: { in: seedObjects.map(obj => obj.name) },
    },
  });
  const objsToCreate = seedObjects.filter(
    seedObj => !objectsAlreadyInDatabase.some((p: any) => p.name === seedObj.name)
  );

  objsToCreate.map(obj => {
    console.log(" + Location: " + obj.name)
  })

  await db.Location.createMany({
    data: objsToCreate.map(obj => ({ ...obj })),
  });
};
const seedServices = async (context: Context) => {
  const { db } = context.sudo();
  const seedObjects: any[] = services_seedjson;
  const objectsAlreadyInDatabase = await db.Service.findMany({
    where: {
      name: { in: seedObjects.map(obj => obj.name) },
    },
  });
  const objsToCreate = seedObjects.filter(
    seedObj => !objectsAlreadyInDatabase.some((p: any) => p.name === seedObj.name)
  );

  objsToCreate.map(obj => {
    console.log(" + Service: " + obj.name)
  })

  await db.Service.createMany({
    data: objsToCreate.map(obj => ({ ...obj })),
  });
};

const seedAddons = async (context: Context) => {
  const { db } = context.sudo();
  const seedObjects: any[] = addons_seedjson;
  const objectsAlreadyInDatabase = await db.Addon.findMany({
    where: {
      name: { in: seedObjects.map(obj => obj.name) },
    },
  });
  const objsToCreate = seedObjects.filter(
    seedObj => !objectsAlreadyInDatabase.some((p: any) => p.name === seedObj.name)
  );

  objsToCreate.map(obj => {
    console.log(" + Addon: " + obj.name)
  })

  await db.Addon.createMany({
    data: objsToCreate.map(obj => ({ ...obj })),
  });
};

const seedPages = async (context: Context) => {
  const { db } = context.sudo();
  const seedObjects: any[] = pages_seeddata;
  const objectsAlreadyInDatabase = await db.Page.findMany({
    where: {
      slug: { in: seedObjects.map(obj => obj.slug) },
    },
  });
  const objsToCreate = seedObjects.filter(
    seedObj => !objectsAlreadyInDatabase.some((obj: any) => obj.slug === seedObj.slug)
  );

  objsToCreate.map(obj => {
    console.log(" + Page: " + obj.slug)
  })

  await db.Page.createMany({
    data: objsToCreate.map(obj => ({ ...obj })),
  });
};

// const seedProductImages = async (context: Context) => {
//   const { db } = context.sudo();
//   const seedObjects: any[] = productImage_seedjson;
//   const objectsAlreadyInDatabase = await db.ProductImage.findMany({
//     where: {
//       // @ts-ignore
//       filename: { in: seedObjects.map(obj => obj.filename) },
//     },
//   });

//   const objsToCreate = seedObjects.filter(
//     // @ts-ignore
//     seedObj => !objectsAlreadyInDatabase.some(p => p.filename === seedObj.filename)
//   );

//   console.log({ objsToCreate });


//   await db.ProductImage.createMany({
//     data: objsToCreate.map(obj => {
//       // console.log(path.join(process.cwd() + `/public/assets/images/${obj.filename}`))


//       return ({
//         ...obj,
//         // image: {
//         //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-9_mevrrl.png',
//         //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-9_mevrrl.png',
//         //   //   upload: prepareToUpload(path.join(process.cwd() + `/public/assets/images/${obj.filename}`))
//         // }
//         // TODO why no seed upload files work?
//         // upload: prepareToUpload(path.join(process.cwd() + `/public/seedfiles/${obj.filename}`))
//       })
//     }),
//   });
// };

export const seedDatabase = async (context: Context) => {
  console.log(`🌱🌱🌱 Seeding database... 🌱🌱🌱`);
  await seedUsers(context)
  await seedRoles(context)
  await seedCategories(context)
  await seedTags(context)
  // // await seedAvail(context)
  await seedPosts(context)
  // await seedLocations(context)
  
  // await seedServices(context)
  // // await seedProductImages(context)
  await seedProducts(context)
  // await seedSubscriptions(context)
  await seedEventData(context)
  // await seedAddons(context)
  await seedPages(context)
  console.log(`🌱🌱🌱 Seeding database completed. 🌱🌱🌱`);
};