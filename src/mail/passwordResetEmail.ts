import type { User } from "../keystone/types"

export const passwordResetEmail = (
	user: User,
	resetLink: string,
	
) => {
	
	return `
    <p>
      Password reset request for ${user.name}. 
      <a href="${resetLink}">click here</a> to change password
    </p>
  `
}
