"use client"
//* Test script 
import { cgql, useFetchGraphQL } from "@hooks/useFetchGraphql"

import ErrorMessage from "./ErrorMessage"

type Props = {
	slug: string
}

export function DocumentContentClientFetch({ slug }: Props) {
	const { data, loading, error } = useFetchGraphQL(query, {
		where: {
			slug: {
				equals: slug,
			},
		},
		hydrateRelationships: true,
	})
	if (error) return <ErrorMessage error={error} />
	if (loading) return <p>Loading...</p>
	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}

const query = cgql`
  query Page($where: PageWhereInput!, $hydrateRelationships: Boolean!) {
    pages(where: $where) {
      id
      title
      content {
        document(hydrateRelationships: $hydrateRelationships)
      }
    }
  }
`

// const query = cgql`
//   query Page($where: PageWhereInput!) {
//     pages(where: $where) {
//       id
//       title
//       content {
//         document
//       }
//     }
//   }
// `
