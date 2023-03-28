// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://admin:admin@localhost:5432/keystone'
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost'
const BACKEN_PORT = process.env.BACKEND_PORT || "3001"
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
import { posts_seed, products_seed } from "./seed-data/seed-data";

// const sessionConfig = {
//   maxAge: 60 * 60 * 24 * 360,
//   secret: process.env.COOKIE_SECRET
// }

export default withAuth(
  config({
    server:{
      port: Number(BACKEN_PORT),
      cors: { origin: [FRONTEND_URL], credentials: true },
    },
    // db: {
    //   // we're using sqlite for the fastest startup experience
    //   //   for more information on what database might be appropriate for you
    //   //   see https://keystonejs.com/docs/guides/choosing-a-database#title
    //   provider: 'sqlite',
    //   url: 'file:./keystone.db',
    // },
    db: {
      provider: 'postgresql',
      url: DATABASE_URL,
      onConnect: async context => { 
        console.log('--- POSTGRES CONNECTED ---')

        products_seed.map(async dt => {
          try {
            await context.db.Product.createOne({ data: { ...dt } })

          } catch (error) {
            console.log('!!! seed error: ', error);      
          }
        })

        // posts_seed.map(async dt => {
        //   try {
        //     await context.db.Post.createOne({ data: { ...dt } })

        //   } catch (error) {
        //     console.log(`seed ${dt.slug} already exists, ignoring `);
            
        //   }
        // })


      },
      // Optional advanced configuration
      enableLogging: true,
      idField: { kind: 'uuid' },
      shadowDatabaseUrl: 'postgres://admin:admin@localhost:5432/shadowdb'
    },
    lists,
    session,
    ui: {
      isAccessAllowed: ({session}) => {
        return !!session?.data
        
      }
    },
    storage: {
      my_local_images: {
        // Images that use this store will be stored on the local machine
        kind: 'local',
        // This store is used for the image field type
        type: 'image',
        // The URL that is returned in the Keystone GraphQL API
        generateUrl: path => `${BACKEND_URL}:${BACKEN_PORT}/images${path}`,
        // The route that will be created in Keystone's backend to serve the images
        serverRoute: {
          path: '/images',
        },
        // Set serverRoute to null if you don't want a route to be created in Keystone
        // serverRoute: null
        storagePath: 'public/images',
      },
    }
  }),
);
