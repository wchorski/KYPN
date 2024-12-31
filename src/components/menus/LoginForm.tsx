"use client"
import styles from "@styles/menus/form.module.scss"
import {
	FaGithub,
	FaFacebookSquare,
	FaTwitter,
	FaGoogle,
	FaTwitterSquare,
} from "react-icons/fa"
import { useFormState, useFormStatus } from "react-dom"
import { useRef, useState } from "react"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { envs } from "@/envs"
import { useRouter } from "next/navigation"
import { TbCheck, TbExclamationCircle, TbLoader } from "react-icons/tb"
import stylesAnim from "@styles/eyecandy/SpinCycle.module.scss"
import { Button } from "@components/elements/Button"
import Flex from "@components/layouts/Flex"

type State = "pending" | "error" | "success" | undefined

type Fields = {
	email: string
	password: string
}

type FormState = {
	message: string
	status: "success" | "error" | ""
	errors: Record<keyof Fields, string> | undefined
	fieldValues: Fields
}

type Props = {
	providers: any
}

export function LoginForm({ providers }: Props) {
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
	const formRef = useRef<HTMLFormElement>(null)
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
				callbackUrl: envs.FRONTEND_URL + "/account",
			})
			console.log({ res })
			// @ts-ignore
			const { error, status, ok, url } = res

			if (error)
				return {
					...formState,
					status: "error",
					message: "Login failed. Please check credentials",
				}

			// todo but with next 14 not getting session on sudo page load
			// router.refresh()
			// router.push(`/account`)
			window.location.replace("/account")

			return {
				...formState,
				status: "success",
				message: "login successful",
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
		<form action={formAction} className={styles.form} ref={formRef}>
			<fieldset>
				<label htmlFor="email">
					Email
					<input
						name={"email"}
						id={"email"}
						placeholder="sam@hotmail.com"
						type={"text"}
						required={true}
						defaultValue={formState.fieldValues.email}
						autoComplete={"email"}
					/>
				</label>

				<label htmlFor="password">
					Password
					<input
						name={"password"}
						id={"password"}
						placeholder="***"
						type={"password"}
						required={true}
						defaultValue={formState.fieldValues.password}
					/>
				</label>

				<p className={formState.status}>{formState.message}</p>

				{formState.status !== "success" && (
					<Flex alignItems="center">
						<SubmitButton />

						<Link href={`?${new URLSearchParams({ popup: "modal" })}`}>
							password reset
						</Link>
					</Flex>
				)}
			</fieldset>

			<fieldset>
				<legend> or with Social {statusIcon(state)}</legend>

				{providers &&
					Object.values(providers)
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
		</form>
	)
}

function SubmitButton() {
	const { pending } = useFormStatus()

	return (
		// <button
		//   disabled={pending}
		//   type={'submit'}
		// >
		//   {pending ? <LoadingAnim /> : 'Login'}
		// </button>
		<Button size={"medium"} disabled={pending} type={"submit"}>
			{" "}
			Login{" "}
		</Button>
	)
}
