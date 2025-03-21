require("dotenv").config()
import { config } from "@keystone-6/core"
import { extendGraphqlSchema, lists } from "./src/keystone/schema"
import type { Context } from ".keystone/types"
import { envs } from "./envs"
import { nextAuthSessionStrategy } from "./session"
import { seedDatabase } from "./src/keystone/seed/seedDatabase"
import { extractDBData } from "./src/keystone/seed/extractDBData"

const {
	CMS_PORT,
	DATABASE_URL,
	DB_PROVIDER,
	FRONTEND_URL,
	SEED_EXTRACT_NONE,
} = envs

export default config({
	db: {
		provider: DB_PROVIDER,
		url: DATABASE_URL,

		onConnect: async (context: Context) => {
			console.log(`💾✅ Database Connected`)
			// TODO why argv doesn't work?
			if (
				SEED_EXTRACT_NONE === "seed"
				// && NODE_ENV === "development"
			) {
				//todo would like to have this as an arg instead of env var
				// if (process.argv.includes('--seed-database')) {
				await seedDatabase(context)
			} else if (
				SEED_EXTRACT_NONE === "extract"
				// && NODE_ENV === "development"
			) {
				await extractDBData(context)
			}
		},
		// WARNING: this is only needed for our monorepo examples, dont do this
		// prismaClientPath: 'node_modules/myprisma',
	},
	server: {
		port: CMS_PORT,
		cors: { origin: [FRONTEND_URL], credentials: true },
	},
	graphql: {
		extendGraphqlSchema,
	},
	session: nextAuthSessionStrategy,
	lists,
	// https://github.com/keystonejs/keystone/discussions/7746
	ui: {
		isDisabled: false,
		// basePath: "/admin",
		// TODO add rule that checks Role.adminDashboardAccess
		// isAccessAllowed: ({session}) => true,
		//? must append `basePath` to front of pages
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
  //! breaks next-auth. session data returns undefined (yet i'm still logged in because it doesn't redirect me to login)
	// ui: {
	// 	isDisabled: false,
	// 	basePath: "/admin",
	// 	// TODO add rule that checks Role.adminDashboardAccess
	// 	// isAccessAllowed: ({session}) => true,
	// 	//? must append `basePath` to front of pages
	// 	publicPages: [
	// 		"/admin" + "/api/auth/csrf",
	// 		"/admin" + "/api/auth/signin",
	// 		"/admin" + "/api/auth/callback",
	// 		"/admin" + "/api/auth/session",
	// 		"/admin" + "/api/auth/providers",
	// 		"/admin" + "/api/auth/signout",
	// 		"/admin" + "/api/auth/error",

	// 		//! each provider will need a separate callback and signin page listed here
	// 		"/admin" + "/api/auth/signin/github",
	// 		"/admin" + "/api/auth/callback/github",
	// 		"/admin" + "/api/auth/signin/credentials",
	// 		"/admin" + "/api/auth/callback/credentials",
	// 	],

	// 	// adding page middleware ensures that users are redirected to the signin page if they are not signed in.
	// 	pageMiddleware: async ({ wasAccessAllowed }) => {
	// 		if (wasAccessAllowed) return

	// 		return {
	// 			kind: "redirect",
	// 			to: "/admin" + "/api/auth/signin",
	// 		}
	// 	},
	// },
})
