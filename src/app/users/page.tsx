import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { Table } from "@components/elements/Table"
import ErrorMessage from "@components/ErrorMessage"
import ErrorPage from "@components/layouts/ErrorPage"
import { NoDataFoundPage } from "@components/layouts/NoDataFoundPage"
import { fetchUsers } from "@lib/fetchdata/fetchUsers"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

const page = 1
const perPage = envs.PERPAGE

export default async function Page({ params, searchParams }: Props) {
	const session = await getServerSession(nextAuthOptions)
	const { users, error } = await fetchUsers({
		query: QUERY_USER_THIN,
		page,
		perPage,
		session,
	})

	if (error)
		return (
			<ErrorPage error={error}>
				<p>data fetch error </p>
			</ErrorPage>
		)
	if (!users) return notFound()

	const cells = users.map((user: any) => ({
		name: user.name,
		email: user.email,
		role: user.role?.name,
		account: user.id,
	}))

	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_site}>
				<h1>Users</h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
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
const QUERY_USER_THIN = `
  id
  name
  email
  role {
    name
  }
`
