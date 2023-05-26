import { useEffect, useState } from "react";
import { Table } from "../elements/Table";
import { gql, useQuery } from "@apollo/client";
import { perPage } from "../../config";
import { QueryLoading } from "../menus/QueryLoading";
import { QueryError } from "../menus/QueryError";
import { User } from "../../lib/types";

export function UserTable() {

  const [cellsState, setCellsState] = useState([])

  const page = 1

  const { loading, error, data } = useQuery(QUERY_USERS_ALL, {
    variables: {
      skip: page * perPage - perPage,
      take: perPage,
      orderBy: [
        {
          name: 'asc'
        }
      ]
    },
  })

  useEffect(() => {
    if(!data?.users) return 

    const cells = data.users.map((user:User) => ({
      name: user.name,
      email: user.email,
      account: user.id,
    }))

    setCellsState(cells)
  
    // return () => 
  }, [data?.users])

  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />
  
  return (
    <Table 
      caption="All Users"
      route="/events/e"
      headers={[
        'name',
        'email',
        'account',
      ]}
      cells={cellsState}
    />
  )
}

const QUERY_USERS_ALL = gql`
  query Users($orderBy: [UserOrderByInput!]!) {
    users(orderBy: $orderBy) {
      id
      name
      nameLast
      email
    }
  }
`