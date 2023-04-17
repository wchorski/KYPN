import fs from 'fs';
import path from 'path';
import { Context } from '.keystone/types';
import { categories_seedjson, posts_seedjson, productImage_seedjson, products_seed, roles_seedjson, tags_seedjson, user_seeddata } from './seed_data';
//@ts-ignore
import { prepareToUpload } from '../prepareToUpload.js';

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
    seedUser => !usersAlreadyInDatabase.some(u => u.email === seedUser.email)
  )
  console.log({ usersToCreate })
  await db.User.createMany({
    data: usersToCreate,
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
    seedPost => !postsAlreadyInDatabase.some(p => p.slug === seedPost.slug)
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
    seedObj => !objectsAlreadyInDatabase.some(dbObj => dbObj.name === seedObj.name)
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
    seedObj => !objectsAlreadyInDatabase.some((dbObj: any) => dbObj.name === seedObj.name)
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
    seedObj => !objectsAlreadyInDatabase.some(p => p.slug === seedObj.slug)
  );

  console.log('products seeded, ', { objsToCreate })

  await db.Product.createMany({
    data: objsToCreate.map(obj => ({ ...obj })),
  });
};

const seedProductImages = async (context: Context) => {
  const { db } = context.sudo();
  const rawJSONData = JSON.stringify(productImage_seedjson);
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
  await seedCategories(context)
  await seedTags(context)
  await seedPosts(context)

  await seedProductImages(context)
  await seedProducts(context)
  console.log(`🌱🌱🌱 Seeding database completed. 🌱🌱🌱`);
};