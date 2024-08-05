import ErrorMessage from "@components/ErrorMessage"
import { Table } from "@components/elements/Table"
import { PageTHeaderMain } from "@components/layouts/PageTemplates"
import { Section } from "@components/layouts/Section"
import { envs } from "@/envs"
import { fetchUsers } from "@lib/fetchdata/fetchUsers"
import { getServerSession } from "next-auth"
import type { Session } from "next-auth"
import { nextAuthOptions } from "@/session"
import { Metadata } from "next"
import Link from "next/link"
import NotAuthorized403 from "../not-authorized"
import NoDataFoundError404 from "../not-found"
import { VerifyEmailCard } from "@components/menus/VerifyEmailCard"

export const metadata: Metadata = {
	title: "Account | " + envs.SITE_TITLE,
	description: envs.SITE_DESC,
}

type Props = {
	params: {
		id: string | string[] | undefined
	}
	searchParams: { [key: string]: string | string[] | undefined }
}

const page = 1
const perPage = envs.PERPAGE

export default async function UsersPage({ params, searchParams }: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { users, error } = await fetchUsers(page, perPage, session)
	if (error) return <ErrorMessage error={error} />
	if (!users) return <p> no users found </p>

	const cells = users.map((user: any) => ({
		name: user.name,
		email: user.email,
		role: user.role?.name,
		account: user.id,
	}))

	return <PageTHeaderMain header={Header({ session })} main={Main({ cells })} />
}

function Header({ session }: { session: Session | null }) {
	return (
		<>
			<Section layout={"1"}>
				<h1> My Account </h1>
				<pre>
				  <h6>Session:</h6>
          {JSON.stringify(session, null, 2)}
        </pre>
        {session && !session.data.role && (
          <VerifyEmailCard email={session.user.email} />
        )}
				<p>
					{" "}
					If you have permission to <strong>Manage Users</strong> you will see
					all users{" "}
				</p>
				<p>
					{" "}
					If you do not have permission, you will only see the current logged in
					user
				</p>
				<p>
					{" "}
					If you are not logged in then you will see <strong>no data</strong>
				</p>
			</Section>
		</>
	)
}

type Main = {
	cells: any
}

function Main({ cells }: Main) {
	return (
		<>
			<Section layout={"1"}>
				<h2>Users</h2>
				<Table
					caption=""
					route="/users"
					headers={["name", "email", "role", "account"]}
					cells={cells}
				/>
			</Section>
		</>
	)
}
