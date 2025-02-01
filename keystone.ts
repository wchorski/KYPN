require("dotenv").config()
import { envs } from "./envs"
import { config } from "@keystone-6/core"
import { extendGraphqlSchema, lists } from "./src/keystone/schema"
import type { Context } from ".keystone/types"
import { seedDatabase } from "./src/keystone/seed/seedDatabase"
import { nextAuthSessionStrategy } from "./session"
import { extractDBData } from "./src/keystone/seed/extractDBData"
import Stripe from "stripe"
import express from 'express'

if (!envs.STRIPE_SECRET) throw new Error("!!! ❌ envs.STRIPE_SECRET not set")
const stripe = new Stripe(envs.STRIPE_SECRET)

const FRONTEND_URL =
	process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"
const DB_PROTOCOL = process.env.DB_PROTOCOL
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DOMAIN = process.env.DB_DOMAIN
const DB_PORT = process.env.DB_PORT
const DB_COLLECTION = process.env.DB_COLLECTION

const DB_ENDPOINT =
	DB_PROTOCOL +
	"://" +
	DB_USER +
	":" +
	DB_PASSWORD +
	"@" +
	DB_DOMAIN +
	":" +
	DB_PORT +
	"/" +
	DB_COLLECTION +
	"?connect_timeout=300"
// console.log('🔌 DB_ENDPOINT: ', DB_ENDPOINT);

export default config({
	db: {
		provider: "postgresql",
		//? makes `email` or other options not case sensative when searching or filtering
		// cred - https://github.com/keystonejs/keystone/discussions/8963#discussioncomment-8211316
		//TODO how to "enable the citext type with CREATE EXTENSION "citext"; on the relevant database. for postgres"
		// extendPrismaSchema(schema) {
		//   return schema
		//     .split('\n')
		//     .map(line => {
		//       if (line.includes('email') || line.includes('clientEmail')) {
		//         return line + ' @postgresql.Citext'
		//       }
		//       return line
		//     })
		//     .join('\n')
		//  },
		url: DB_ENDPOINT,
		onConnect: async (context: Context) => {
			console.log(`💾✅ Database Connected`)
			// TODO why argv doesn't work?
			if (
				process.env.SEED_EXTRACT_NONE === "seed" &&
				process.env.NODE_ENV === "development"
			) {
				//todo would like to have this as an arg instead of env var
				// if (process.argv.includes('--seed-database')) {
				await seedDatabase(context)
			} else if (
				process.env.SEED_EXTRACT_NONE === "extract" &&
				process.env.NODE_ENV === "development"
			) {
				await extractDBData(context)
			}

			// if (envs.BACKEND_URL.startsWith("http://")) return
			// const endpoint = await stripe.webhookEndpoints.create({
			// 	url: `${envs.BACKEND_URL}/api/webhooks/stripe`,
			// 	enabled_events: [
			// 		"payment_intent.payment_failed",
			// 		"payment_intent.succeeded",
			// 	],
			// })
		},
	},
	server: {
		port: Number(process.env.BACKEND_PORT) || 3001,
		cors: { origin: [FRONTEND_URL], credentials: true },
    
    //? if using KS as standalone. Might shift over to using KS for all stripe stuff
		// extendExpressApp: (app, commonContext) => {
		// 	app.post("/api/webhooks/stripe", express.raw({type: 'application/json'}), async (request, response) => {
        
		// 		if (!envs.STRIPE_WEBHOOK_SECRET || !envs.STRIPE_PUBLIC_KEY)
		// 			return response.status(500).json({ recieved: false, message: "Stripe integration is not setup" })
		// 		// const context = await commonContext.withRequest(request, response)
		// 		const signature = request.headers["stripe-signature"] as string
		// 		let event
        
    //     const payload = request.body

		// 		try {
		// 			event = stripe.webhooks.constructEvent(
		// 				payload,
		// 				signature,
		// 				envs.STRIPE_WEBHOOK_SECRET
		// 			)
		// 			console.log("💳 STRIPE event.type:: ", event.type)
          
		// 		} catch (err: any) {
    //       console.log('!!! ks /api/webhooks/stripe:: ', err)
		// 			return response.status(400).send(`Webhook Error: ${err.message}`)
		// 		}

    //     switch (event.type) {
    //       case 'product.created':
    //         break;

    //       case 'price.created':
    //         break;
        
    //       default:
    //         break;
    //     }

		// 		return response.status(200).json({
		// 			recieved: true,
		// 			message: "stripe integration is connected",
		// 		})
		// 	})
		// },
	},
	lists,
	graphql: {
		extendGraphqlSchema,
	},
	ui: {
		// the following api routes are required for nextauth.js
		publicPages: [
			"/api/auth/csrf",
			"/api/auth/signin",
			"/api/auth/callback",
			"/api/auth/session",
			"/api/auth/providers",
			"/api/auth/signout",
			"/api/auth/error",

			//! each provider will need a separate callback and signin page listed here
			"/api/auth/signin/github",
			"/api/auth/callback/github",
			"/api/auth/signin/credentials",
			"/api/auth/callback/credentials",
		],

		// adding page middleware ensures that users are redirected to the signin page if they are not signed in.
		pageMiddleware: async ({ wasAccessAllowed }) => {
			if (wasAccessAllowed) return

			return {
				kind: "redirect",
				to: "/api/auth/signin",
			}
		},
	},
	session: nextAuthSessionStrategy,
})
