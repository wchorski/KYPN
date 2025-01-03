import Link from "next/link"
import { User } from "@ks/types"
import { ImageDynamic } from "@components/elements/ImageDynamic"
import styles from '@styles/menus/userbadge.module.css'

export function UserBadge({user}:{user:User}){

  return(
    <div className={styles.user_badge} >
      <figure>
        <ImageDynamic photoIn={user?.image}/>
      </figure>

      <div className="content">
        <Link href={`/users/${user?.id}`} target={'_blank'}> {user?.name} {user?.nameLast}</Link>
        <br />
        <small>{user?.email}</small>

      </div>
    </div>
  )
}
