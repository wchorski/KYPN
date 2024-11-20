import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { Callout } from "@components/blocks/Callout"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import DialogPopup from "@components/menus/Dialog"
import { LoginForm } from "@components/menus/LoginForm"
import { PasswordRequestForm } from "@components/menus/PasswordRequestForm"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { getProviders } from "next-auth/react"
import Link from "next/link"
import { CSSProperties } from "react"
import { BlockLayout } from "@components/layouts/BlockLayout"
import { Header } from "@components/elements/Header"
import {
	layout_full,
	layout_site,
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.scss"
import { Grid } from "@components/layouts/Grid"

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

	const session = await getServerSession(nextAuthOptions)
	const providers = await getProviders()

	return (
		<main className={page_layout}>
			<DialogPopup buttonLabel="">
				<p> Forgot your password? </p>
				<PasswordRequestForm />
			</DialogPopup>

			<Header widthOfContent={'layout_wide'}>
				<h1> Login </h1>
				{callbackUrl && (
					<p className="error"> You must login first to access the page </p>
				)}
			</Header>
			<div className={[page_content, layout_wide].join(" ")}>
				<Grid isAuto={true} gap={"ml"} colWidth={'17rem'}>
					<div>
						<LoginForm providers={providers} />
					</div>

					<div>
						{session?.user.email && (
							<Callout intent={"info"}>
								<p>
									{" "}
									currently logged in with email{" "}
									<strong> {session.user.email} </strong>. Go to your{" "}
									<Link href={`/account`}> Account </Link>
								</p>
							</Callout>
						)}

						{error && (
							<Callout intent={"error"}>
								{" "}
								<p> Login failed. Please try again </p>
							</Callout>
						)}
						<h4> Create a New Account </h4>
						<p>
							<Link href={`/register`}> Register Now </Link>
						</p>
					</div>
				</Grid>
			</div>
		</main>
	)
}