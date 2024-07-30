// Welcome to your
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

import { graphql } from "@keystone-6/core"
import type { Lists } from ".keystone/types"

import { User } from "./schemas/User"
import { Role } from "./schemas/Role"
import { registerAnAccount } from "./mutations/registerAnAccount"

// todo fix type error with this - https://github.com/keystonejs/keystone/issues/8228

export const lists: Lists = {
	User,
	Role,
}

export const extendGraphqlSchema = graphql.extend((base) => {
	return {
		mutation: {
			registerAnAccount: registerAnAccount(base),
		},
	}
})
