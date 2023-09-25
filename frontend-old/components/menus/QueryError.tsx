import styles from '@/styles/error.module.scss'
import { BiErrorAlt } from 'react-icons/bi'
const EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL_ADDRESS || 'no_admin_email_set'

type Props = {
  error: any
}

export const QueryError = ({error}:Props) => {

  console.log({error});
  

  return (<>
    <div className={styles.error}>
      <h3> <BiErrorAlt /> Query Error: </h3>
      <blockquote className='error'>{error.message}</blockquote>
      <p>Please contact <strong>{EMAIL}</strong> if problem persists</p>
    </div>
  </>)
}
