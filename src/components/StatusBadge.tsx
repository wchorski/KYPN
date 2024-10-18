import {
	Booking,
	Order,
	Page,
	Post,
	Product,
	Rental,
	SubscriptionItem,
	Ticket,
} from "@ks/types"
import { stringCapFirstLetter } from "@lib/slugFormat"
import styles from "@styles/blocs/status.module.scss"

type Props =
	| {
			type: "subscriptionItem"
			status?: SubscriptionItem["status"] | string | null | undefined
	  }
	| { type: "product"; status?: Product["status"] | string | null | undefined }
	| { type: "ticket"; status?: Ticket["status"] | string | null | undefined }
	| {
			type: "booking"
			status?:
				| Booking["status"]
				| ""
				| "CONFIRMED"
				| "DECLINED"
				| string
				| null
				| undefined
	  }
	| { type: "order"; status?: Order["status"] | string | null | undefined }
	| { type: "rental"; status?: Rental["status"] | string | null | undefined }
	| { type: "post"; status?: Post["status"] | string | null | undefined }
	| { type: "page"; status?: Page["status"] | string | null | undefined }

export function StatusBadge({ type, status }: Props) {
	if (!status) return null
  //@ts-ignore
	const stylesArr = [styles.status, styles[status]].join(" ")
	const prettyStatus = stringCapFirstLetter(status)

	return <span className={stylesArr}>{prettyStatus}</span>
}
