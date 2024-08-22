import ErrorMessage from "@components/ErrorMessage"
import { Callout } from "@components/blocks/Callout"
import { BlockLayout } from "@components/layouts/BlockLayout"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { VerifyEmailCard } from "@components/menus/VerifyEmailCard"
import { fetchVerifyEmail } from "@lib/fetchdata/fetchVerifyEmail"
import Link from "next/link"
type Props = {
	searchParams: {
		email: string
		token: string
	}
}

export default async function VerifyPage({ searchParams }: Props) {
	const { email, token } = searchParams

	if (!email || !token)
		return (
			<main>
				<BlockLayout layout={"1"}>
					<p> not sure how you got here without a key... </p>
					<p>
						{" "}
						<Link href={`/account`}> Get otta here </Link>{" "}
					</p>
				</BlockLayout>
			</main>
		)

	const { data, error } = await fetchVerifyEmail(email, token)

	return (
		<PageTHeaderMain header={Header()} main={Main(email, token, data, error)} />
	)
}

function Header() {
	return (
		<>
			<BlockLayout layout={"1"}>
				<h1> Verify Account </h1>
			</BlockLayout>
		</>
	)
}

function NotSuccessMessage({ error, email }: any) {
	switch (true) {
		case String(error).includes("user already is of role"):
			return (
				<>
					<Callout intent={"success"}>
						<p> This account is already verified. </p>
						<p>
							{" "}
							<Link href={"/account"}> View account </Link>
						</p>
					</Callout>
				</>
			)

		default:
			return (
				<>
					<ErrorMessage error={error}> </ErrorMessage>
					<VerifyEmailCard email={email} />
				</>
			)
	}
}

function Main(email: string, token: string, data?: unknown, error?: any) {
	if (error)
		return (
			<BlockLayout layout={"1"}>
				<NotSuccessMessage error={error} email={email} />
			</BlockLayout>
		)

	return (
		<>
			<BlockLayout layout={"1"}>
				<h3 className="success"> Success </h3>
				<p>
					{" "}
					The email <strong>{email}</strong> has been verified
				</p>
				<p>
					{" "}
					<Link href={"/account"}> View account </Link>
				</p>
			</BlockLayout>
		</>
	)
}
