import { useEffect, useState } from "react"

// const API_URI =  || 'http://localhost:3000/api/graphql'

export const cgql = ([content]: TemplateStringsArray) => content

export function useFetchGraphQL(
	query: string,
	variables?: Record<string, any>
) {
	const [data, setData] = useState<any | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			setError(null)

			try {
				const res = await fetch(
          //? it's possible to call the CMS api route
          // envs.CMS_URL + 
          //? can use web app with yoga gql api (best option to keep it self reliant)
          `/api/graphql`, {
					method: "POST",
					body: JSON.stringify({ query, variables }),
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				})
				if (!res.ok) throw new Error("Failed to fetch GraphQL")
				const response = await res.json()
				setData(response.data)
			} catch (err) {
				setError(err as Error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { data, loading, error }
}
