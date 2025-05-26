import { IconAccountBox } from "@lib/useIcons"
import styles, {
	session_btn,
	session_image,
	sub_menu,
} from "@styles/menus/session.module.css"
import { desktop_label } from "@styles/nav.module.css"
import Image from "next/image"
import Link from "next/link"
import { getServerSession } from "next-auth"
import type { ReactElement } from "react"

import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"

import { NavLink } from "./NavLink"
import SignOutButton from "./SignOutButton"

type Props = {
	label: string
}

// @ts-ignore
export async function SessionBadge({ label }: Props): ReactElement<any, any> {
	const session = await getServerSession(nextAuthOptions)

	if (!session) return <NavLink href="/login"> Login </NavLink>

	return (
		<div
			className={[styles.session_badge, "toggle-menu"].join(" ")}
			id="session-badge"
			aria-label="account menu link"
		>
			<NavLink
				href={`/account`}
				className={[session_btn, "flex", "gap-0"].join(" ")}
				style={{ padding: "0" }}
			>
				<figure className={session_image}>
					{session.user.image ? (
						<Image
							src={session.user.image}
							alt={"user avatar"}
							// width={50}
							// height={50}
              fill={true}
							unoptimized={true}
						/>
					) : (
						<IconAccountBox />
					)}
				</figure>
				<span className={desktop_label} style={{ padding: "var(--space-m)" }}>
					{session.user.name || label}
				</span>
			</NavLink>

			<ul className={sub_menu}>
				<li className="user">
					<span>{session?.user?.name}</span>
					<br />
					<span className={"sub-text"}>{session?.user?.email}</span>
				</li>
				<li>
					<Link href={`/account`}>My Account</Link>
				</li>
				{session?.data.role && session?.data.role.name === "admin" && (
					<>
						<li>
							<Link href={envs.CMS_URL}>Admin Dashboard</Link>
						</li>
						<li>
							<Link href={`/admin`}>Admin Tools</Link>
						</li>
					</>
				)}
				<li>
					<SignOutButton />
				</li>
			</ul>
		</div>
	)
}

// export function useSession() {
//   // TODO server side fetching GET THIS WORKING
//   // const client = getClient()
//   // const { data, error, loading } = await client.query({query})

//   const { data, loading, error } = useQuery(QUERY_USER_CURRENT)
//   // console.log({data});

//   // const client = getClient()
//   // const { data, error } = await client.query({query})

//   // console.log('++++++ useSession data: ', data);
//   const session = data?.authenticatedItem
//   return {session, loading, error }

//   // const ctx = useGlobalContext()
//   // return ctx?.session
// }

// export const QUERY_USER_CURRENT = gql`
//   query AuthenticatedItem {
//     authenticatedItem {
//       ... on User {
//         email
//         id
//         name
//         nameLast
//         role {
//           canManageCart
//           canManageOrders
//           canManageProducts
//           canManageServices
//           canManageRoles
//           canManageUsers
//           canViewUsers
//           canManageTickets
//           canManageEvents
//           canManagePosts
//           canManagePages
//           canManageLocations
//           canManageTags
//           canManageCategories
//           canManageSubscriptionPlans
//           canManageSubscriptionItems
//           canManageCoupons
//         }
//         tickets {
//           event {
//             id
//             start
//             summary
//           }
//           id
//           status
//         }
//         subscriptions {
//           id
//           subscriptionPlan {
//             id
//           }
//         }
//         cart {
//           id
//           quantity
//           product {
//             id
//             price
//             name
//             image
//             # photo {
//             #   image {
//             #     publicUrlTransformed
//             #   }
//             # }
//           }
//         }
//       }
//     }
//   }
// `
