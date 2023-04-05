import fs from 'fs';
import path from 'path';
import { Context } from '.keystone/types';
import { productImages_seeddata, roles_seedjson, user_seeddata } from './seed_data';
import { prepareToUpload } from '../prepareToUpload';

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
  console.log({usersToCreate})
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
    seedRole => !objsAlreadyInDatabase.some((u:any) => u.name === seedRole.name)
  );
  console.log('roles seeded, ', {itemsToCreate})
  // @ts-ignore
  await db.Role.createMany({
    data: itemsToCreate,
  });
};

// seed posts and connect with users
const seedPosts = async (context: Context) => {
  const { db } = context.sudo();
  const rawJSONData = fs.readFileSync(path.join(process.cwd(), './seed/posts_seed.json'), 'utf-8');
  const seedPosts: any[] = JSON.parse(rawJSONData);
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

const seedProducts = async (context: Context) => {
  const { db } = context.sudo();
  const rawJSONData = fs.readFileSync(path.join(process.cwd(), './seed/products_seed.json'), 'utf-8');
  const seedObjects: any[] = JSON.parse(rawJSONData);
  const objectsAlreadyInDatabase = await db.Product.findMany({
    where: {
      slug: { in: seedObjects.map(obj => obj.slug) },
    },
  });
  const objsToCreate = seedObjects.filter(
    seedObj => !objectsAlreadyInDatabase.some(p => p.slug === seedObj.slug)
  );

  console.log('products seeded, ', {objsToCreate})

  await db.Product.createMany({
    data: objsToCreate.map(obj => ({ ...obj })),
  });
};

const seedProductImages = async (context: Context) => {
  const { db } = context.sudo();
  const rawJSONData = JSON.stringify(productImages_seeddata);
  const seedObjects: any[] = JSON.parse(rawJSONData);
  const objectsAlreadyInDatabase = await db.ProductImage.findMany({
    where: {
      altText: { in: seedObjects.map(obj => obj.altText) },
    },
  });
  const objsToCreate = seedObjects.filter(
    seedObj => !objectsAlreadyInDatabase.some(p => p.altText === seedObj.altText)
  );

  await db.ProductImage.createMany({
    data: objsToCreate.map(obj => ({ 
      ...obj,  
      upload: prepareToUpload(path.join(process.cwd() + `./public/assets/images/${obj.name}.png`))
    })),
  });
};

export const seedDatabase = async (context: Context) => {
  console.log(`🌱🌱🌱 Seeding database... 🌱🌱🌱`);
  await seedUsers(context)
  await seedRoles(context)
  // await seedPosts(context);
  // await seedProductImages(context)
  await seedProducts(context)
  console.log(`🌱🌱🌱 Seeding database completed. 🌱🌱🌱`);
};