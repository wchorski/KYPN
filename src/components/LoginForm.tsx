"use client"
import { Button } from "@components/elements/Button"
import { SubmitButton } from "@components/forms/SubmitButton"
import { InputField } from "@components/InputField"
import Flex from "@components/layouts/Flex"
import stylesAnim from "@styles/eyecandy/SpinCycle.module.scss"
import { form } from "@styles/menus/form.module.scss"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useFormState } from "react-dom"
import {
	FaFacebookSquare,
	FaGithub,
	FaGoogle,
	FaTwitterSquare,
} from "react-icons/fa"
import { TbCheck, TbExclamationCircle, TbLoader } from "react-icons/tb"

import { envs } from "@/envs"

type State = "pending" | "error" | "success" | undefined

type Fields = {
	email: string
	password: string
}

type FormState = {
	message: string
	status: "success" | "error" | "unknown" | ""
	errors: Record<keyof Fields, string> | undefined
	fieldValues: Fields
}

type Props = {
	providers: any
	callbackUrl?: string
}

export function LoginForm({ providers, callbackUrl }: Props) {
	const [state, setstate] = useState<State>(undefined)

	const router = useRouter()
	// const { session, setSession } = useGlobalContext()
	const defaultFormData: FormState = {
		message: "",
		status: "",
		errors: undefined,
		fieldValues: {
			email: "",
			password: "",
		},
	}

	const [formState, formAction] = useFormState(onSubmit, defaultFormData)

	async function onSubmit(
		prevState: FormState,
		data: FormData
	): Promise<FormState> {
		const email = data.get("email") as string
		const password = data.get("password") as string

		const inputValues = {
			email,
			password,
		}

		try {
			const res = await signIn("credentials", {
				email,
				password,
				redirect: false,
				callbackUrl: callbackUrl || envs.FRONTEND_URL + "/account",
			})

			if (res?.error)
				return {
					...formState,
					status: "error",
					message: "Login failed. Please check credentials",
				}

			//? just using `res.ok` instead
			// if (res?.status === 200)

			if (res?.ok) {
				// todo but with next 14 not getting session on sudo page load
				// router.refresh()
				// router.push(`/account`)
				// window.location.replace("/account")

				router.push(res?.url || "/account")
				return {
					...formState,
					status: "success",
					message: "login successful",
				}
			}
			return {
				...formState,
				status: "unknown",
				message: "login unknown",
			}
		} catch (error: any) {
			console.log("!!! Login Form ERROR: ", error.message)
			return {
				status: "error",
				message: error?.message,
				// TODO validate each field
				errors: {
					email: "",
					password: "",
				},
				fieldValues: inputValues,
			}
		}
	}

	async function socialSignin(id: string) {
		try {
			setstate("pending")
			await signIn(id)
			// setstate('success')
		} catch (error) {
			console.log(error)
			setstate("error")
		}
	}

	const getIcon = (id: string) => {
		switch (id) {
			case "github":
				return <FaGithub />

			case "facebook":
				return <FaFacebookSquare />

			case "twitter":
				return <FaTwitterSquare />

			case "google":
				return <FaGoogle />

			default:
				return null
		}
	}

	const statusIcon = (state: State) => {
		switch (state) {
			case "pending":
				return <TbLoader className={stylesAnim.spin} />

			case "success":
				return <TbCheck />

			case "error":
				return <TbExclamationCircle />

			default:
				return null
		}
	}

	return (
		<form action={formAction} className={form}>
			<fieldset>
				<InputField
					name={"email"}
					type={"email"}
					required={true}
					autoComplete={"email"}
					placeholder={"sam@hotmail.com"}
					defaultValue={formState.fieldValues.email}
					error={formState.errors?.email}
				/>
				<InputField
					name={"password"}
					type={"password"}
					required={true}
					autoComplete={"password"}
					placeholder={"***"}
					defaultValue={formState.fieldValues.password}
					error={formState.errors?.password}
				/>

				<p className={formState.status}>{formState.message}</p>

				{formState.status !== "success" && (
					<Flex alignItems="center">
						<SubmitButton label={"Login"} />

						<Link href={`?${new URLSearchParams({ popup: "modal" })}`}>
							password reset
						</Link>
					</Flex>
				)}
			</fieldset>

			{providers && providers.length > 0 && (
				<fieldset>
					<legend> or with Social {statusIcon(state)}</legend>
					{Object.values(providers)
						.filter((prov: any) => prov.id !== "credentials")
						.map((provider: any) => (
							<Button
								key={provider.name}
								type="button"
								disabled={state === "pending"}
								onClick={() => socialSignin(provider.id)}
							>
								Login with {provider.name} {getIcon(provider.id)}
							</Button>
						))}
				</fieldset>
			)}
		</form>
	)
}
