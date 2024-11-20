import { Table } from "@components/elements/Table"
import { envs } from "@/envs"
import { fetchUsers } from "@lib/fetchdata/fetchUsers"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/session"
import { Metadata } from "next"
import Link from "next/link"
import { VerifyEmailCard } from "@components/menus/VerifyEmailCard"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.scss"
import ErrorPage from "@components/layouts/ErrorPage"
import { NoDataFoundPage } from "@components/layouts/NoDataFoundPage"

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
	if (error) return <ErrorPage error={error} ><p>data fetch error </p></ErrorPage>
	if (!users) return <NoDataFoundPage><p>No users found</p></NoDataFoundPage>

	const cells = users.map((user: any) => ({
		name: user.name,
		email: user.email,
		role: user.role?.name,
		account: user.id,
	}))

	return (
		<main className={page_layout}>
			<header className={layout_site}>
				<h1> My Account </h1>
				<pre>
					<h6>Session:</h6>
					{JSON.stringify(session, null, 2)}
				</pre>
				{session && !session.data.role && (
					<VerifyEmailCard email={session.user.email} />
				)}
				<ul>
					<li>
						{" "}
						If you have permission to <strong>Manage Users</strong> you will see
						all users{" "}
					</li>
					<li>
						{" "}
						If you do not have permission, you will only see the current logged
						in user
					</li>
					<li>
						{" "}
						If you are not logged in then you will see <strong>no data</strong>
					</li>
				</ul>

				<Link href={envs.BACKEND_URL} className="button medium">
					KeystoneJs Admin Panel
				</Link>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				<h2>Users</h2>
				<Table
					caption=""
					route="/users"
					headers={["name", "email", "role", "account"]}
					cells={cells}
				/>
			</div>
		</main>
	)
}
