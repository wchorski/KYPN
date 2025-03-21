import { envs } from "../../envs"
import type { User } from "../keystone/types"


export const userVeryHtml = (user: User, token: string) => {
	const verifyLink = envs.FRONTEND_URL + `/verify?email=${user.email}&token=${token}`
	return `
    <p>New account created for ${user.name}. <a href="${verifyLink}">click here</a> to verify</p>
  `
}
