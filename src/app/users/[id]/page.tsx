import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import ErrorPage from "@components/layouts/ErrorPage"
import { NoDataFoundPage } from "@components/layouts/NoDataFoundPage"
import { fetchUser } from "@lib/fetchdata/fetchUser"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { BiEdit } from "react-icons/bi"

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

const page = 1
const perPage = envs.PERPAGE
export default async function UserByIdPage({ params, searchParams }: Props) {
	const { id } = await params
	const session = await getServerSession(nextAuthOptions)
	const { user, error } = await fetchUser(id, QUERY_USER_THIN, session)

	if (error)
		return (
			<ErrorPage error={error}>
				<p>data fetch error </p>
			</ErrorPage>
		)
	if (!user)
		return (
			<NoDataFoundPage>
				<p>No users found</p>
			</NoDataFoundPage>
		)

	const { name, email, role } = user

	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_site}>
				<h1>User: {name}</h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				<table>
					<tbody>
						<tr>
							<td>Name: </td>
							<td>{name}</td>
						</tr>
						<tr>
							<td>Email: </td>
							<td>{email}</td>
						</tr>
						<tr>
							<td>Role: </td>
							<td>{role.name}</td>
						</tr>
					</tbody>
				</table>
				<p>
					<Link href={envs.BACKEND_URL + `/users/${id}`}>
						<BiEdit />
						<span>Edit</span>
					</Link>
				</p>
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