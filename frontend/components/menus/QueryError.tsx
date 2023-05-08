import React from 'react'

type Props = {
  error: any
}

export const QueryError = ({error}:Props) => {

  console.log({error});
  

  return (
    <p className='error'>QueryError. {error.message}</p>
  )
}
