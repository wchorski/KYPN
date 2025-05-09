import { keystoneContext } from "@ks/context"
import type { Post } from "@ks/types"
import { type PostWhereInput } from ".keystone/types"
import { envs } from "@/envs"

const perPage = envs.PERPAGE

type Props = {
	query: string
	page?: number
	categoryIds?: string[]
	authorIds?: string[]
	authorEmails?: string[]
	categoryNames?: string[]
	tagIds?: string[]
	session: any
}

// export async function fetchPosts(page:number, categoryIds:string[], session:any){
export async function fetchPosts({
	query,
	page = 1,
	categoryIds = [],
	authorIds = [],
	authorEmails = [],
	categoryNames = [],
	tagIds,
	session,
}: Props) {
	try {
		const context = keystoneContext.withSession(session)
		//TODO how to type this correctly?
		let where: PostWhereInput | undefined = {
			...(categoryIds.length > 0
				? { categories: { some: { id: { in: categoryIds } } } }
				: categoryNames.length > 0
				? { categories: { some: { name: { in: categoryNames } } } }
				: {}),
			...(tagIds && tagIds.length > 0
				? { tags: { some: { id: { in: tagIds } } } }
				: {}),
			...(authorIds.length > 0
				? { author: { id: { in: authorIds } } }
				: authorEmails.length > 0
				? { author: { email: { in: authorEmails } } }
				: {}),
		}

		const count = (await context.query.Post.count({
			where,
		})) as number

		const posts = (await context.query.Post.findMany({
			skip: page * perPage - perPage,
			take: perPage,
			orderBy: [
				{
					dateCreated: "desc",
				},
			],
			where,
			query,
		})) as Post[]

		return { posts, count }
	} catch (error) {
		return { error }
	}
}

//? moved query to `page.tsx` so I can reuse this script more
// const query = `
//   id
//   title
//   featured_image
//   featured_video
//   author {
//     id
//     name
//     nameLast
//   }
//   dateModified
//   excerpt
//   pinned
//   slug
//   status
//   template
//   tags {
//     id
//     name
//   }
//   categories {
//     id
//     name
//   }
// `
