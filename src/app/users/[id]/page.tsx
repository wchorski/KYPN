import ErrorPage from "@components/layouts/ErrorPage"
import { fetchUser } from "@lib/fetchdata/fetchUser"
import { IconUserAccountAvatar } from "@lib/useIcons"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { BiEdit } from "react-icons/bi"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

type Props = {
	searchParams: { q: string }
	params: { id: string }
}


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
	if (!user) return notFound()

	const { name, email, role, image } = user

	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_site}>
				<h1>User: {name}</h1>
				<figure style={{ margin: "0" }}>
					{image ? (
						<img
							src={image}
							alt={"user avatar"}
							width={100}
							height={100}
						/>
					) : (
						<IconUserAccountAvatar />
					)}
				</figure>
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
							<td>{role?.name || "unverified"}</td>
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
  image
  role {
    name
  }
`
