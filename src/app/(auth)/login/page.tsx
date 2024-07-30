import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { Callout } from "@components/blocks/Callout"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { Section } from "@components/layouts/Section"
import DialogPopup from "@components/menus/Dialog"
import { LoginForm } from "@components/menus/LoginForm"
import { PasswordRequestForm } from "@components/menus/PasswordRequestForm"
import { PasswordResetForm } from "@components/menus/PasswordResetForm"
import { RegsiterForm } from "@components/menus/RegisterForm"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { getCsrfToken, getProviders } from "next-auth/react"
import Link from "next/link"
import { CSSProperties } from "react"

export const metadata: Metadata = {
	title: "Login | " + envs.SITE_TITLE,
	description: "Login, register, or recover account",
}

type Props = {
	searchParams: {
		reset: string
		error: string
		callbackUrl?: string
	}
}

export default async function LoginPage({ searchParams }: Props) {
	const { error, callbackUrl } = searchParams
	// todo next-auth is aight idk
	//@ts-ignore
	const session = await getServerSession(nextAuthOptions)

	const providers = await getProviders()

	return (
		<PageTHeaderMain
			header={Header(callbackUrl)}
			main={Main(providers, session?.user?.email, error)}
		/>
	)
}

function Header(callbackUrl?: string) {
	return (
		<>
			<Section layout={"1"}>
				<h1> Login </h1>
				{callbackUrl && (
					<p className="error"> You must login first to access the page </p>
				)}
			</Section>
		</>
	)
}

function Main(
	providers: any,
	sessionEmail?: string | null,
	error?: "CredentialsSignin" | string
) {
	return (
		<>
			<DialogPopup buttonLabel="">
				<p> Forgot your password? </p>
				<PasswordRequestForm />
			</DialogPopup>

			<Section layout={"1"}>
				<div style={styleForms}>
					{sessionEmail && (
						<Callout intent={"info"}>
							<p>
								{" "}
								currently logged in with email <strong> {sessionEmail} </strong>
								. Go to your <Link href={`/account`}> Account </Link>
							</p>
						</Callout>
					)}

					{error && (
						<Callout intent={"error"}>
							{" "}
							<p> Login failed. Please try again </p>
						</Callout>
					)}
					<LoginForm providers={providers} />
				</div>

				<div>
					<h4> Create a New Account </h4>
					<Link href={`/register`}> Register Now </Link>
				</div>
			</Section>
		</>
	)
}

const styleForms = {
	display: "grid",
	gap: "1rem",
} as CSSProperties
