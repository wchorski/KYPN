import { useEffect, useState } from "react";
import { Table } from "../elements/Table";
import { gql, useQuery } from "@apollo/client";
import { QueryLoading } from "../menus/QueryLoading";
import { QueryError } from "../menus/QueryError";
import { User } from "../../lib/types";
import { TablePagination } from "../elements/TablePagination";

export function UserTable() {

  const [cellsState, setCellsState] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(25)

  const { loading, error, data } = useQuery(QUERY_USERS_ALL, {
    variables: {
      skip: page * perPage - perPage,
      take: perPage,
      // skip: page * perPage - perPage,
      // take: perPage,
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
  
  return (<>

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

    <TablePagination currPage={page} setPage={setPage} dataCount={data.usersCount} perPage={perPage} setPerPage={setPerPage}/>
  </>)
}

const QUERY_USERS_ALL = gql`
  query Users($take: Int, $skip: Int!, $orderBy: [UserOrderByInput!]!) {
    usersCount
    users(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      name
      nameLast
      email
    }
  }
`