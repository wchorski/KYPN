// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config
require('dotenv').config()

import { config } from '@keystone-6/core';

import { lists } from './src/keystone/schema';
import { nextAuthSessionStrategy } from './session';
// @ts-ignore
import type { Context } from '.keystone/types';
import { seedDatabase } from './src/keystone/seed/seedDatabase';


const DB_PROTOCOL = process.env.DB_PROTOCOL
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DOMAIN = process.env.DB_DOMAIN
const DB_PORT = process.env.DB_PORT
const DB_COLLECTION = process.env.DB_COLLECTION

const DB_ENDPOINT = DB_PROTOCOL
                    +'://'
                    +DB_USER
                    +':'
                    +DB_PASSWORD
                    +'@'
                    +DB_DOMAIN
                    +':'
                    +DB_PORT
                    +'/'
                    +DB_COLLECTION
                    +'?connect_timeout=300'
// console.log({DB_ENDPOINT});


export default config({
  db: {

    provider: 'postgresql',
    url: DB_ENDPOINT,
    onConnect: async (context: Context) => {
      // TODO why argv doesn't work?
    if (process.env.SEED_ME === 'true') {
      // if (process.argv.includes('--seed-database')) {
      await seedDatabase(context);

    }
    },

  },
  server: {
    port: 3001,
  },
  ui: {
    // the following api routes are required for nextauth.js
    publicPages: [
      '/api/auth/csrf',
      '/api/auth/signin',
      '/api/auth/callback',
      '/api/auth/session',
      '/api/auth/providers',
      '/api/auth/signout',
      '/api/auth/error',

      //! each provider will need a separate callback and signin page listed here
      '/api/auth/signin/github',
      '/api/auth/callback/github',
      '/api/auth/signin/credentials',
      '/api/auth/callback/credentials',
    ],

    // adding page middleware ensures that users are redirected to the signin page if they are not signed in.
    pageMiddleware: async ({ wasAccessAllowed }) => {
      console.log(wasAccessAllowed);
      if (wasAccessAllowed) return;
      
      return {
        kind: 'redirect',
        to: '/api/auth/signin',
      };
    },
  },
  lists,
  session: nextAuthSessionStrategy,
})

