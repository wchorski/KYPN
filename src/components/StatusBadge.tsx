import type { 
  Addon,
	Booking,
	Event,
	Order,
	Page,
	Post,
	Product,
	Rental,
	Service,
	SubscriptionItem,
	SubscriptionPlan,
	Ticket,
 } from "@ks/types"
import { stringCapFirstLetter } from "@lib/slugFormat"
import styles from "@styles/blocs/status.module.css"

export type StatusType =
	| {
			type: "subscriptionPlan"
			status?: SubscriptionPlan["status"] | string | null | undefined
	  }
	| {
			type: "subscriptionItem"
			status?: SubscriptionItem["status"] | string | null | undefined
	  }
	| { type: "product"; status?: Product["status"] | string | null | undefined }
	| { type: "ticket"; status?: Ticket["status"] | string | null | undefined }
	| { type: "event"; status?: Event["status"] | string | null | undefined }
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
	| { type: "service"; status?: Service["status"] | string | null | undefined }
	| { type: "addon"; status?: Addon["status"] | string | null | undefined }
  | { type: "any"; status?: string | null | undefined }

export function StatusBadge({ type, status }: StatusType) {
	if (!status) return null
  //@ts-ignore
	const stylesArr = [styles.status, styles[status], 'status-badge'].join(" ")
	const prettyStatus = stringCapFirstLetter(status)

	return <span className={stylesArr}>{prettyStatus}</span>
}
