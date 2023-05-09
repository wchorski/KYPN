
const EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL_ADDRESS || 'no_admin_email_set'

type Props = {
  error: any
}

export const QueryError = ({error}:Props) => {

  console.log({error});
  

  return (<>
    <h2>Query Error: </h2>
    <p className='error'>{error.message}</p>
    <p>Please contact <strong>{EMAIL}</strong> if problem persists</p>
  </>)
}
