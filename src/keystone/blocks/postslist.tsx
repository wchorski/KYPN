import {
	component,
	fields,
	NotEditable,
} from "@keystone-6/fields-document/component-blocks"
import React from "react"

export const postslist = component({
	label: "Posts List",
	schema: {
		header: fields.text({
			label: "Header Title",
		}),
		imageSrc: fields.url({
			label: "Image URL",
			defaultValue:
				"https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
		}),
		colorOverlay: fields.text({
			label: "Overlay Color",
			defaultValue: "rgba(56, 56, 56, 0.63)",
		}),
		color: fields.text({
			label: "Fallback background color",
		}),
		categories: fields.relationship({
			label: "Categories",
			listKey: "Category",
			selection: "name",
			many: true,
		}),
		authors: fields.relationship({
			label: "Authors",
			listKey: "User",
			selection: "name",
			many: true,
		}),
	},
	preview: function Preview(props) {
		return (
			<NotEditable
				style={{
					backgroundColor: props.fields.color.value,
					backgroundImage: props.fields.imageSrc.value,
				}}
			>
				<h2>{props.fields.header.value}</h2>

				{props.fields.authors.value.length > 0 ? (
					<>
						<h5>Authors Filter</h5>
						<ul>
							{props.fields.authors.value.map((user, i) => (
								<li key={i}>{user.label}</li>
							))}
						</ul>
					</>
				) : (
					<p>authors filter not enabled</p>
				)}

				{props.fields.categories.value.length > 0 ? (
					<>
						<h5>Categories Filter</h5>
						<ul>
							{props.fields.categories.value.map((cat, i) => (
								<li key={i}>{cat.label}</li>
							))}
						</ul>
					</>
				) : (
					<p>categories filter not enabled</p>
				)}

				<h5>View frontend to see the list of posts</h5>
			</NotEditable>
		)
	},
})

//! it's impossible to query data via async function
// async function posts(categoryIds: string[] = [], authorIds: string[] = []) {

// 	try {
// 		const posts = (await keystoneContext.query.Post.findMany({
// 			where: {
// 				...(categoryIds.length > 0
// 					? { categories: { some: { id: { in: categoryIds } } } }
// 					: {}),
// 				...(authorIds.length > 0
// 					? { author: { id: { in: categoryIds } } }
// 					: {}),
// 			},
// 			query: `
// 	      title
// 	    `,
// 		})) as Post[]

// 	  console.log({posts});
// 		return []
// 		// if (!posts) return []
// 		// return posts
// 	} catch (error: any) {
// 		throw new Error("postslist block: ", error)
// 	}
// }
