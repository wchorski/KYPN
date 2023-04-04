// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import type { KeystoneConfig } from '@keystone-6/core/types';
import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { extendGraphqlSchema, lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';
import { Context, TypeInfo } from '.keystone/types';

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://admin:admin@localhost:5432/keystone'
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost'
const BACKEN_PORT = process.env.BACKEND_PORT || "3001"
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
import { seedDatabase } from './seed/seedDatabase';

// const sessionConfig = {
//   maxAge: 60 * 60 * 24 * 360,
//   secret: process.env.COOKIE_SECRET
// }

const db: KeystoneConfig<TypeInfo>['db'] = {

  provider: 'postgresql',
  url: DATABASE_URL,
  async onConnect (context: Context) { 
    console.log('--- POSTGRES CONNECTED ---')

    // TODO why argv doesn't work?
    if (process.env.SEED_ME === 'true') {
    // if (process.argv.includes('--seed-database')) {
      console.log('+++++ SEED DATA +++++');
      
      await seedDatabase(context);

    }
  },
  enableLogging: true,
  idField: { kind: 'uuid' },
  shadowDatabaseUrl: 'postgres://admin:admin@localhost:5432/shadowdb'
    
}

export default withAuth(
  config({
    server:{
      port: Number(BACKEN_PORT),
      cors: { origin: [FRONTEND_URL], credentials: true },
    },
    db,
    lists,
    extendGraphqlSchema,
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
        storagePath: 'public/assets/images',
      },
    }
  }),
);
