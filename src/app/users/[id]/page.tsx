import { ArticleList } from "@components/layouts/ArticleList"
import ErrorPage from "@components/layouts/ErrorPage"
import Flex from "@components/layouts/Flex"
import { fetchPosts } from "@lib/fetchdata/fetchPosts"
import { fetchUser } from "@lib/fetchdata/fetchUser"
import { IconUserAccountAvatar } from "@lib/useIcons"
import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import Image from "next/image"
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

export default async function UserByIdPage({ params }: Props) {
	const { id } = await params
	const session = await getServerSession(nextAuthOptions)
	const { user, error } = await fetchUser(id, QUERY_USER_THIN, session)
	const { posts, error: errorPosts } = await fetchPosts({
		query: `
      id
      slug
      title
      featured_image
      excerpt
      dateCreated
      author {
        id
        name
        image
        email
      }
    `,
		authorIds: [id],
		session,
	})

	if (error || errorPosts)
		return (
			<ErrorPage error={error || errorPosts}>
				<p>data fetch error </p>
			</ErrorPage>
		)
	// if (!user) return notFound()
	if (user) {
		const { name, email, role, image } = user

		return (
			<main className={[page_layout].join(" ")}>
				<header className={layout_site}>
					<Flex alignItems={"center"} gap={"ml"}>
						<h1>{name}</h1>
						<figure style={{ margin: "0" }}>
							{image ? (
								<Image
									src={image}
									alt={"user avatar"}
									width={100}
									height={100}
								/>
							) : (
								<IconUserAccountAvatar />
							)}
						</figure>
					</Flex>
				</header>
				<div className={[page_content].join(" ")}>
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
							{session?.data.role.canManageUsers ? (
								<>
									<tr>
										<td>Role: </td>
										<td>{role?.name || "unverified"}</td>
									</tr>
									<tr>
										<td>
											<Link href={envs.CMS_URL + `/users/${id}`}>
												<BiEdit />
												<span>Edit</span>
											</Link>
										</td>
										<td></td>
									</tr>
								</>
							) : null}
						</tbody>
					</table>
					{posts ? (
						<section className={layout_site}>
							<h2>Posts</h2>
							<ArticleList items={posts} type={"post"} />
						</section>
					) : null}
				</div>
			</main>
		)
	}
	if (posts && posts.length > 0) {
		const { name, image, email } = posts[0].author || {}
		return (
			<main className={[page_layout].join(" ")}>
				<header className={layout_site}>
					<Flex alignItems={"center"} gap={"ml"}>
						<h1>{name}</h1>
						<figure style={{ margin: "0" }}>
							{image ? (
								<Image
									src={image}
									alt={"user avatar"}
									width={100}
									height={100}
								/>
							) : null}
						</figure>
					</Flex>
				</header>
				<div className={[page_content].join(" ")}>
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
						</tbody>
					</table>
					{posts ? (
						<section className={layout_site}>
							<h2>Posts</h2>
							<ArticleList items={posts} type={"post"} />
						</section>
					) : null}
				</div>
			</main>
		)
	}
	return notFound()
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
