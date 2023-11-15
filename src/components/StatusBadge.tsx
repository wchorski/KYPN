import { Booking, SubscriptionItem, Ticket } from "@ks/types"
import { stringCapFirstLetter } from "@lib/slugFormat"
import styles from '@styles/blocs/status.module.scss'

type Props = 
| { type: 'subscriptionItem', status?:SubscriptionItem['status']|undefined  }
| { type: 'ticket', status?:Ticket['status']|undefined  }
| { type: 'booking', status?:Booking['status']  }

export function StatusBadge ({ type, status }:Props) {

  if(!status) return null

  const stylesArr = [styles.status, styles[status]].join(' ')
  const prettyStatus = stringCapFirstLetter(status)

  return (
    <span className={stylesArr}>
      {prettyStatus}
    </span>
  )
}