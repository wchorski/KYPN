// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

require('dotenv').config()

import type { KeystoneConfig } from '@keystone-6/core/types';
import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { extendGraphqlSchema, lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';
import { Context, TypeInfo } from '.keystone/types';

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://admin:admin@localhost:5432/keystone'
const DB_PROTOCOL   = process.env.DB_PROTOCOL || 'nodbprotocol'
const DB_USER       = process.env.DB_USER || 'nodbuser'
const DB_PASSWORD   = process.env.DB_PASSWORD || 'nodbpassword'
const DB_DOMAIN     = process.env.DB_DOMAIN || 'nodbdomain'
const DB_PORT       = ':' + process.env.DB_PORT || ''
const DB_COLLECTION = process.env.DB_COLLECTION || 'nodbcollection'
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost'
const BACKEN_PORT = process.env.BACKEND_PORT || "3001"
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
import { seedDatabase } from './seed/seedDatabase';
import { permissionsList } from './schemas/permissions';

const DB_URL = DB_PROTOCOL + DB_USER + ':' + DB_PASSWORD + '@' + DB_DOMAIN + DB_PORT + '/' 
console.log('💾' + DB_URL + DB_COLLECTION);


const db: KeystoneConfig<TypeInfo>['db'] = {

  
  provider: 'postgresql',
  url: DB_URL + DB_COLLECTION + '?connect_timeout=300',
  async onConnect(context: Context) {
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
  shadowDatabaseUrl: DB_URL + 'shadowdb'

}

export default withAuth(
  config({
    server: {
      port: Number(BACKEN_PORT),
      cors: { origin: [FRONTEND_URL], credentials: true },
    },
    db,
    lists,
    extendGraphqlSchema,
    session,
    // @ts-ignore //todo i dont think this does anythings
    // startSession: () => {      
    //   return {
    //     // GraphQL Query
    //     User: `id name email role { ${permissionsList.join(' ')} }`,
    //   }
    // },
    ui: {
      isAccessAllowed: ({ session }) => {
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
        generateUrl: path => `${BACKEND_URL}:${BACKEN_PORT}/assets/images${path}`,
        // The route that will be created in Keystone's backend to serve the images
        serverRoute: {
          path: '/assets/images',
        },
        // Set serverRoute to null if you don't want a route to be created in Keystone
        // serverRoute: null
        storagePath: 'public/assets/images',
      },
    }
  }),
);
