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
import SignOutButton from "@components/menus/SignOutButton"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { getCsrfToken, getProviders } from "next-auth/react"
import Link from "next/link"
import { CSSProperties } from "react"

export const metadata: Metadata = {
	title: "Sign Out | " + envs.SITE_TITLE,
	description: "Login, register, or recover account",
}

type Props = {
	searchParams: {
		reset: string
		error: string
		callbackUrl?: string
	}
}

export default async function SignOutPage({ searchParams }: Props) {
	const { error, callbackUrl } = searchParams

	return (
		<PageTHeaderMain
			header={Header(callbackUrl)}
			main={Main()}
		/>
	)
}

function Header(callbackUrl?: string) {
	return (
		<>
			<Section layout={"1"}>
				<h1> Sign Out </h1>
			</Section>
		</>
	)
}

function Main() {
	return (
		<>
			<DialogPopup buttonLabel="">
				<p> Forgot your password? </p>
				<PasswordRequestForm />
			</DialogPopup>

			<Section layout={"1"}>
				<SignOutButton />
			</Section>
		</>
	)
}