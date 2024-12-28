"use server"
import { TestFormFields } from "@components/FormState"
// cred ByteGrad - https://www.youtube.com/watch?v=GgyP0_b-WPY

import { revalidatePath } from "next/cache"

export async function testAction(prevState: any, formData: FormData) {
	await new Promise((resolve) => setTimeout(resolve, 2000))

	try {
		// throw Error('Fake error')
		const text = formData.get("text")?.toString() || null
		console.log("🐸 testAction: ", text)
	} catch (error) {
		return `!!! testAction error: ${error} `
	}

	revalidatePath("/")
}

type TestUsernameValues = {
	user_name: string
	nick_name: string
}

export type TestUsernameState = {
	values?: TestUsernameValues
	valueErrors?: Record<keyof TestUsernameValues, string> | undefined
	error?: string
	success?: string
  url?:string
}

export async function submitTestUsername(
	prevState: TestUsernameState,
	formData: FormData
): Promise<TestUsernameState> {
	await new Promise((resolve) => setTimeout(resolve, 2500))
	// console.log({prevState});

	try {
		const values = Object.fromEntries(formData) as TestUsernameValues
		// console.log({ values })
		const { user_name, nick_name } = values

		if (!user_name) {
			return {
				...prevState,
				valueErrors: {
					user_name: "User name is required",
					nick_name: "",
				},
				error: "error in User Name field",
				success: undefined,
			}
		}
		if (user_name?.includes("fuck") || nick_name?.includes("fuck"))
			return {
				...prevState,
				valueErrors: {
					user_name: user_name?.includes("fuck") ? "No Swearing" : "",
					nick_name: nick_name?.includes("fuck") ? "No Swearing" : "",
				},
        success: undefined
			}

		if (user_name?.includes("grinch"))
			throw Error("The Grinch is not allowed for Christmas")

		return {
			success: `Success! User Name excepted: ${user_name}`,
		}
	} catch (error) {
		return {
			...prevState,
			error: `!!! getTestUsername: ${error} `,
		} as any
	} finally {
		revalidatePath("/")
	}
}

// export async function submitTestUsername(data: TestUsernameState) {
// 	await new Promise((resolve) => setTimeout(resolve, 2500))

// 	try {
// 		const { username } = data

// 		if (!username) {
// 			return {
// 				fieldErrors: {
// 					userName: "User name is required",
// 				},
// 			}
// 		}
// 		if (username?.includes("fuck"))
// 			return {
// 				fieldErrors: {
// 					userName: "No Swearing",
// 				},
// 			}

// 		if (username?.includes("grinch"))
// 			throw Error("The Grinch is not allowed for Christmas")
// 		// throw Error('Fake error')
// 		console.log("🪪 getTestUsername: ", username)

// 		return {
// 			success: `Success! Username excepted: ${username}`,
// 			username,
// 		}
// 	} catch (error) {
// 		return {
// 			// ...prevState,
// 			fieldErrors: undefined,
// 			error: `!!! getTestUsername: ${error} `,
// 		}
// 	} finally {
// 		revalidatePath("/")
// 	}
// }
