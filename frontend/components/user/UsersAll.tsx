import { gql, useQuery } from "@apollo/client";
import { QueryLoading } from "../menus/QueryLoading";
import { QueryError } from "../menus/QueryError";
import { perPage } from "../../config";
import { User } from "../../lib/types";
import styled from "styled-components";
import { Table } from "../elements/Table";

type Props = {
  page?:number
}

export function UsersAll({page = 1}:Props) {

  const { loading, error, data } = useQuery(QUERY_USERS_ALL, {
    variables: {
      skip: page * perPage - perPage,
      take: perPage,
      orderBy: [
        {
          dateModified: "desc"
        }
      ]
    }
  })

  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />

  // const {name, email, id, role}:User = data?.users
  
  return (
    <StyledUsersTableCont>
      <Table 
        caption="All Users"
        route="/users"
        headers={[
          'name',
          'email',
          'role',
          'account'
        ]}
        cells={data.users.map((user:User) => ({
          name: user.name,
          email: user.email,
          role: user.role.name,
          account: user.id,
        }))}
      />
    </StyledUsersTableCont>
  )
}

const StyledUsersTableCont = styled.div`
  background-color: yellowgreen;
`


const QUERY_USERS_ALL = gql`
  query Users($skip: Int!, $take: Int, $orderBy: [UserOrderByInput!]!) {
    users(skip: $skip, take: $take, orderBy: $orderBy) {
      role {
        id
        name
      }
      name
      id
      email
    }
  }
`