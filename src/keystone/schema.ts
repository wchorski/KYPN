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
import { Post } from "./schemas/Post"
import { Page } from "./schemas/Page"
import { Category } from "./schemas/Category"
import { Tag } from "./schemas/Tag"
import { passwordRequestLink } from "./mutations/passwordRequestLink"
import { verifyEmailRequest } from "./mutations/verifyEmailRequest"
import { verifyEmail } from "./mutations/verifyEmail"
import { passwordReset } from "./mutations/passwordReset"
import { contact } from "./mutations/contact"

// todo fix type error with this - https://github.com/keystonejs/keystone/issues/8228

export const lists: Lists = {
	User,
	Role,
  Post,
  Page,
  Category,
  Tag,
}

export const extendGraphqlSchema = graphql.extend((base) => {
	return {
		mutation: {
			registerAnAccount: registerAnAccount(base),
      passwordRequestLink: passwordRequestLink(base),
      passwordReset: passwordReset(base),
      verifyEmailRequest: verifyEmailRequest(base),
      verifyEmail: verifyEmail(base),
      contact: contact(base),
		},
	}
})
