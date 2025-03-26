"use client"
import { cgql, useFetchGraphQL } from "@hooks/useFetchGraphql"

type Data = {
	users: {
		id: string
		name: string
		email: string
		role: {
			id: string
			name: string
		}
	}[]
}

type Variables = {
	orderBy: [
		{
			name: "asc"
		}
	]
}

export function UsersListClient() {
	const { data, loading, error } = useFetchGraphQL(
		cgql`
			query Users($orderBy: [UserOrderByInput!]!) {
				users(orderBy: $orderBy) {
					id
					name
					email
					role {
						id
						name
					}
				}
			}
		`,
		{
			orderBy: [
				{
					name: "asc",
				},
			],
		}
	)

	if (loading) return <Loading />
	if (error) return <p>error</p>
	if (!data?.users || data.users.length === 0) return <NoData />

	// return <pre>{JSON.stringify(data, null, 2)}</pre>
	return <Users users={data.users} />
}

const Loading = () => <p className={'anim_border_spin'} >Loading...</p>
const NoData = () => <p>No users found</p>

function Users({ users }: Data) {
	return (
		<ol>
			{users.map((u) => (
				<li key={u.id}>
					<span title={u.id}>{u.name}</span>
					<br />
					<span>{u.email}</span>
					<br />
					<span>role: {u?.role?.name || 'unverified'}</span>
					<hr />
				</li>
			))}
		</ol>
	)
}
