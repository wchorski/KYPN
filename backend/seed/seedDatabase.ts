import fs from 'fs';
import path from 'path';
// @ts-ignore
import { Context } from '.keystone/types';
import { addons_seedjson, avail_seedjson, categories_seedjson, events_seeddata, locations_seeddata, pages_seeddata, posts_seedjson, productImage_seedjson, products_seed, roles_seedjson, services_seedjson, subscriptions_seedjson, tags_seedjson, user_seeddata } from './seed_data';
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
    seedUser => !usersAlreadyInDatabase.some((u:User) => u.email === seedUser.email)
  )
  console.log({ usersToCreate })
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
  console.log({ objsToCreate })
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
  console.log('roles seeded, ', { itemsToCreate })
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
    seedPost => !postsAlreadyInDatabase.some((p:Post)=> p.slug === seedPost.slug)
  );
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
    seedObj => !objectsAlreadyInDatabase.some((dbObj:Tag) => dbObj.name === seedObj.name)
  );

  console.log({ objsToCreate })

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
    seedObj => !objectsAlreadyInDatabase.some((dbObj:Category) => dbObj.name === seedObj.name)
  );

  console.log({ objsToCreate })

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
    seedObj => !objectsAlreadyInDatabase.some((p:Product) => p.slug === seedObj.slug)
  );

  console.log('products seeded, ', { objsToCreate })

  await db.Product.createMany({
    data: objsToCreate.map(obj => ({ ...obj })),
  });
};

const seedSubscriptions = async (context: Context) => {
  const { db } = context.sudo();
  const seedObjects: any[] = subscriptions_seedjson;
  const objectsAlreadyInDatabase = await db.SubscriptionPlan.findMany({
    where: {
      slug: { in: seedObjects.map(obj => obj.slug) },
    },
  });
  const objsToCreate = seedObjects.filter(
    seedObj => !objectsAlreadyInDatabase.some((p: any) => p.slug === seedObj.slug)
  );

  console.log('SubscriptionPlans seeded, ', { objsToCreate })

  await db.SubscriptionPlan.createMany({
    data: objsToCreate.map(obj => ({ ...obj })),
  });
};

const seedServices = async (context: Context) => {
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

  console.log('Events seeded, ', { objsToCreate })

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

  console.log('Locations seeded, ', { objsToCreate })

  await db.Location.createMany({
    data: objsToCreate.map(obj => ({ ...obj })),
  });
};
const seedEvents = async (context: Context) => {
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

  console.log('Services seeded, ', { objsToCreate })

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

  console.log('Addons seeded, ', { objsToCreate })

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

  console.log('Pages seeded, ', { objsToCreate })

  await db.Page.createMany({
    data: objsToCreate.map(obj => ({ ...obj })),
  });
};

const seedProductImages = async (context: Context) => {
  const { db } = context.sudo();
  const seedObjects: any[] = productImage_seedjson;
  const objectsAlreadyInDatabase = await db.ProductImage.findMany({
    where: {
      // @ts-ignore
      filename: { in: seedObjects.map(obj => obj.filename) },
    },
  });

  const objsToCreate = seedObjects.filter(
    // @ts-ignore
    seedObj => !objectsAlreadyInDatabase.some(p => p.filename === seedObj.filename)
  );

  console.log({ objsToCreate });


  await db.ProductImage.createMany({
    data: objsToCreate.map(obj => {
      // console.log(path.join(process.cwd() + `/public/assets/images/${obj.filename}`))


      return ({
        ...obj,
        // image: {
        //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-9_mevrrl.png',
        //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-9_mevrrl.png',
        //   //   upload: prepareToUpload(path.join(process.cwd() + `/public/assets/images/${obj.filename}`))
        // }
        // TODO why no seed upload files work?
        // upload: prepareToUpload(path.join(process.cwd() + `/public/seedfiles/${obj.filename}`))
      })
    }),
  });
};

export const seedDatabase = async (context: Context) => {
  console.log(`🌱🌱🌱 Seeding database... 🌱🌱🌱`);
  await seedUsers(context)
  await seedRoles(context)
  // await seedAvail(context)
  await seedCategories(context)
  await seedTags(context)
  await seedPosts(context)
  await seedLocations(context)
  
  await seedEvents(context)
  await seedProductImages(context)
  await seedProducts(context)
  await seedSubscriptions(context)
  await seedServices(context)
  await seedAddons(context)
  await seedPages(context)
  console.log(`🌱🌱🌱 Seeding database completed. 🌱🌱🌱`);
};