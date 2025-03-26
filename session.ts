require("dotenv").config()
import { getContext } from "@keystone-6/core/context"
import { getServerSession } from "next-auth/next"
import type { DefaultJWT } from "next-auth/jwt"
import type { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import type { Context } from ".keystone/types"
var bcrypt = require("bcryptjs")
import { envs } from "./envs"
import { AdapterUser } from "next-auth/adapters"
import { User } from "./src/keystone/types"

// WARNING: you need to change this
// console.log(process.env.NEXTAUTH_URL);
const NODE_ENV = process.env.NODE_ENV
const NEXTAUTH_URL = envs.NEXTAUTH_URL!

const sessionSecret = envs.NEXTAUTH_SECRET
const useSecureCookies = NEXTAUTH_URL.startsWith("https://")
const cookiePrefix = useSecureCookies ? "__Secure-" : ""
const hostName = new URL(NEXTAUTH_URL).hostname
const baseHostName = hostName.split(".").slice(-2).join(".")

let _keystoneContext: Context = (globalThis as any)._keystoneContext

//todo why can't i set this one query here so i don't have to change in 2 places here
const userQuery = `
    id
    stripeCustomerId
    name
    email
    password
    authId
    image
    dateCreated
    role {
      id
      name
      canManageUsers
      canViewUsers
      canManageRoles
      canManagePages
      canManagePosts
      canCreatePosts
      canManageCategories
      canManageTags
      canManageAnnouncements
      canManageProducts
      canViewProducts
      canManageAddons
      canManageBookings
      canManageAvailability
      canCreateAvailability
      canManageEvents
      canManageTickets
      canManageCart
      canManageOrders
      canManageLocations
      canViewPrivateLocations
      canManageServices
      canManageSubscriptionPlans
      canManageSubscriptionItems
      canManageCoupons
      canManageRentals
    }
  `
async function getKeystoneContext() {
	if (_keystoneContext) return _keystoneContext

	// TODO: this could probably be better
	_keystoneContext = getContext(
		(await import("./keystone")).default,

		await import("@prisma/client")
	)
	if (NODE_ENV !== "production") {
		;(globalThis as any)._keystoneContext = _keystoneContext
	}

	return _keystoneContext
}

// see https://next-auth.js.org/configuration/options for more
export const nextAuthOptions: NextAuthOptions = {
	secret: sessionSecret,
	pages: {
		signIn: envs.FRONTEND_URL + "/login",
	},
	callbacks: {
		async signIn({ user }: { user: DefaultUser }) {
			// console.log('callbacks, signIn ------- ');

			// console.log({user});
			// console.error('next-auth signIn', { user, account, profile });
			const sudoContext = (await getKeystoneContext()).sudo()

			let idObj: any = { authId: user.id }
			// let idObj = { authId: user.id }
			// @ts-ignore
			if (user._type === "credentials") idObj = { id: user.id }

			// check if the user exists in keystone ? don't need to fetch roles here right?
			const author = await sudoContext.query.User.findOne({
				where: idObj,
				query: `
          id
        `,
			})
			
			if (!author) {
				console.log("### no user found in db")
			}
			// console.log({author});

			// if not, sign up
			if (!author) {
				await sudoContext.query.User.createOne({
					data: {
						authId: user.id,
						name: user.name,
						email: user.email,
						image: user.image,
					},
				})
			}

			return true // accept the signin
		},
		async session({
			session,
			token,
		}: {
			session: DefaultSession // required by next-auth, not by us
			token: DefaultJWT
		}) {
			const sudoContext = (await getKeystoneContext()).sudo()
			const data = (await sudoContext.graphql.run({
				query: `
          query Users($where: UserWhereInput!) {
            users(where: $where) {
              ${userQuery}
            }
          }
        `,
				variables: {
					where: {
						email: {
							equals: session.user?.email,
							mode: "insensitive",
						},
					},
				},
			})) as { users: User[] }
			const foundUser = data.users[0]
			// const foundUser = await sudoContext.query.User.findOne({
			// 	where: { email: session.user?.email },
			// 	query: userQuery,
			// })
			// unauthorized
			if (!foundUser)
				console.log(
					`!!! session attempt failed: ${JSON.stringify(session, null, 2)}`
				)

			return {
				...session,
        //TODO why isn't spread ...session giving other user props?
        user: {
          id: foundUser.id,
          name: foundUser.name,
          nameLast: foundUser.nameLast,
          image: foundUser.image,
          email: foundUser.email,
          dateCreated: foundUser.dateCreated,
        },
				authId: token.sub,
				id: foundUser?.id,
				stripeCustomerId: foundUser?.stripeCustomerId,
				itemId: foundUser?.id,
				data: {
					role: foundUser?.role,
				},
			}
		},
		redirect: async ({ url, baseUrl }: { url: string; baseUrl: string }) => {
			if (new URL(url).hostname === hostName) return Promise.resolve(url)
			return Promise.resolve(baseUrl)
		},
	},

	cookies: {
		sessionToken: {
			name: `${cookiePrefix}next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: useSecureCookies,
				// todo was told to remove this. conflicts with subdomains - https://stackoverflow.com/a/76542770/15579591
				// added this back in and it made pvo webiste work again??? idk wtf is going on. auth is the most frustrating part about webdev
				domain: hostName === "localhost" ? hostName : "." + baseHostName,
			},
		},
	},
	providers: [
		// allow anyone with a GitHub account to sign up as an author
		GithubProvider({
			clientId: envs.GITHUB_AUTH_ID,
			clientSecret: envs.GITHUB_AUTH_SECRET,
		}),
		GoogleProvider({
			clientId: envs.GOOGLE_AUTH_ID,
			clientSecret: envs.GOOGLE_AUTH_SECRET,
		}),

		CredentialProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "name@mail.com" },
				password: {
					label: "Password",
					type: "password",
					placeholder: "******",
				},
			},
			authorize: async (credentials: any, req: any) => {
				if (!credentials.email && !credentials.password && !credentials)
					console.log("!!! insufficent credentials")

				//todo create a `login-count` variable on a user to track how many successful logins?

				const sudoContext = (await getKeystoneContext()).sudo()
				// check if the user exists in keystone
        const data = (await sudoContext.graphql.run({
					query: `
            query Users($where: UserWhereInput!) {
              users(where: $where) {
                ${userQuery}
              }
            }
          `,
					variables: {
						where: {
							email: {
								equals: credentials.email,
								mode: "insensitive",
							},
						},
					},
				})) as { users: User[] }
				const foundUser = data.users[0]
				// const foundUser = await sudoContext.query.User.findOne({
				// 	where: { email: credentials?.email },
				// 	query: userQuery,
				// })
				//? for debuging only
				// .then(data => {
				//   console.log('### query.User.findOne: );
				//   console.log({data})
				// }).catch(error => {
				//   console.log({error})
				// })

				// unauthorized
				if (!foundUser) {
					console.log("!!! Credentials: no foundUser found in db")
					return null
				}

				if (!foundUser.password) {
					console.log("!!! no password set for User")
					return null
				}
        
				// const match = (credentials?.password === foundUser.password)
				const isPasswordMatch = await bcrypt.compare(
					credentials?.password,
					foundUser.password
				)
				// if(!match) return {status: 401, message: 'incorrect password'}

        //? proper way to compair strings in case insensative manor. but do i even need it?
				// if (isPasswordMatch && (credentials.email.localeCompare(foundUser.email, undefined, { sensitivity: 'base' }) === 0)) {
				if (isPasswordMatch) {
					console.log("### user is authenticated, ", foundUser.email)
					return {
						_type: "credentials",
						id: foundUser.id,
						authId: foundUser.email,
						role: foundUser.role,
            email: foundUser.email,
						user: {
              id: foundUser.id,
              name: foundUser.name,
							email: foundUser.email,
              image: foundUser.image,
							stripeCustomerId: foundUser.stripeCustomerId,
						},
					}
				}

				// login failed catch all
				console.log("!!!!! login no work. Passwords did not match ", credentials?.email)
				return null
			},
		}),
	],
}

export type Session = {
	id: string
}

export const nextAuthSessionStrategy = {
	async get({ context }: { context: Context }) {
		const { req, res } = context
		const { headers } = req ?? {}
		if (!headers?.cookie || !res) return

		// next-auth needs a different cookies structure
		const cookies: Record<string, string> = {}
		for (const part of headers.cookie.split(";")) {
			const [key, value] = part.trim().split("=")
			cookies[key] = decodeURIComponent(value)
		}

		const nextAuthSession = await getServerSession(
			// todo idk next-auth still works
			//@ts-ignore
			{ headers, cookies } as any,
			res,
			nextAuthOptions
		)
		if (!nextAuthSession) return

		const { authId, user } = nextAuthSession

		// @ts-ignore
		const { email } = user
		// todo will this cause problems between ks and next?
		// const { authId } = nextAuthSession.keystone;

		if (!authId && !email) return
		// todo do i need to use authId? can i just use email?
		// if(authId && !authId?.includes('@')) whereObj = { where: { authId } }

		const author = await context.sudo().db.User.findOne({ where: { email } })
		if (!author) return console.log("!!! no user found for auth")
		const roleId = author.roleId || "no_roleId"
		const role = await context.sudo().db.Role.findOne({
			where: { id: roleId },
		})

		const sessionObj = {
			id: author.id,
			itemId: author.id,
			data: {
				id: author.id,
				image: author.image,
				dateCreated: author.dateCreated,
				name: author.name,
				email: author.email,
			},
		}

		// if (!role) console.log('!!!!!! user has no role assigned for auth');
		if (role) Object.assign(sessionObj, { data: { role: role } })

		return sessionObj
	},

	// we don't need these as next-auth handle start and end for us
	async start() {},
	async end() {},
}
