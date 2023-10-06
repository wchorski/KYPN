import { fetchUserById } from '@lib/fetchdata/fetchUsers'
import { User } from '@lib/types';
import { ReactNode } from 'react'
  
type Props = {
  params:{
    id:string | string[] | undefined,
  },
}



export default async function UserById ({ params }:Props) {

  const {data, error} = await fetchUserById(String(params.id))

  console.log("USER BY ID ------ ");
  
  console.log(data);

  if(!data?.user) return <p> user not found </p>

  const {name, nameLast, email, image, isAdmin, tickets, dateCreated, dateModified, posts}:User = data?.user
  

  return (
    <div>
      <span> User By ID: {params.id} </span>

      <ul>
        <li>{name}</li>
        <li>{email}</li>
      </ul>
    </div>
  )
}