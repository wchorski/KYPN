import { Booking, Order, Post, Product, Rental, SubscriptionItem, Ticket } from "@ks/types"
import { stringCapFirstLetter } from "@lib/slugFormat"
import styles from '@styles/blocs/status.module.scss'

type Props = 
| { type: 'subscriptionItem', status?:SubscriptionItem['status']|undefined  }
| { type: 'product', status?:Product['status']|undefined  }
| { type: 'ticket', status?:Ticket['status']|undefined  }
| { type: 'booking', status?:Booking['status']  }
| { type: 'order', status?:Order['status']  }
| { type: 'rental', status?:Rental['status']  }
| { type: 'post', status?:Post['status']  }
| { type: 'page', status?:Page['status']  }

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