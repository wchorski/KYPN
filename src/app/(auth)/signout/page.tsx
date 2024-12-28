import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { Callout } from "@components/blocks/Callout"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import DialogPopup from "@components/menus/Dialog"
import { LoginForm } from "@components/menus/LoginForm"
import { PasswordRequestForm } from "@components/menus/PasswordRequestForm"
import { PasswordResetForm } from "@components/menus/PasswordResetForm"
import { RegsiterForm } from "@components/menus/RegisterFormOLD"
import SignOutButton from "@components/menus/SignOutButton"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { getCsrfToken, getProviders } from "next-auth/react"
import Link from "next/link"
import { CSSProperties } from "react"
import { BlockLayout } from "@components/layouts/BlockLayout"
import {
	layout_content,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { Header } from "@components/elements/Header"

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
	const { error, callbackUrl } = await searchParams

	return (
		<main className={page_layout}>
			<Header widthOfContent={"layout_content"}>
				<h1> Sign Out </h1>
			</Header>

			<div className={[page_content, layout_content].join(" ")}>
					<SignOutButton />
			</div>
			<DialogPopup buttonLabel="">
				<p> Forgot your password? </p>
				<PasswordRequestForm />
			</DialogPopup>
		</main>
	)
}
