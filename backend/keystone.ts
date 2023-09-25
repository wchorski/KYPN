// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

require('dotenv').config()

import type { KeystoneConfig } from '@keystone-6/core/types';
import { config } from '@keystone-6/core';
import { extendGraphqlSchema, lists } from './schema';
import { withAuth, session,} from './auth';
import { Context, TypeInfo } from '.keystone/types';
import { seedDatabase } from './seed/seedDatabase';
import { envs } from './envs';

const DB_URL = envs.DB_PROTOCOL + envs.DB_USER + ':' + envs.DB_PASSWORD + '@' + envs.DB_DOMAIN + ":" + envs.DB_PORT + '/' 
console.log('💾 💾 💾' + DB_URL + envs.DB_COLLECTION);


const db: KeystoneConfig<TypeInfo>['db'] = {

  
  provider: 'postgresql',
  url: DB_URL + envs.DB_COLLECTION + '?connect_timeout=300',
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
      port: Number(envs.BACKEND_PORT),
      cors: { origin: [envs.FRONTEND_URL], credentials: true },
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
        generateUrl: path => `${envs.BACKEND_URL}:${envs.BACKEND_PORT}/assets/images${path}`,
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
