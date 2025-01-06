import { envs } from "../../envs"
import {
	NavigationContainer,
	NavItem,
	ListNavItems,
} from "@keystone-6/core/admin-ui/components"
import type { NavigationProps } from "@keystone-6/core/admin-ui/components"
import { useSession } from "next-auth/react"
import { PiUsersThreeFill } from "react-icons/pi"
import { BsFilePostFill } from "react-icons/bs"
import { IoBookmarks } from "react-icons/io5"
import { FaTags } from "react-icons/fa6"
import type { CSSProperties } from "react"

export function CustomNavigation({
	authenticatedItem,
	lists,
}: NavigationProps) {
	const { data: session, status } = useSession()

  const styleBorder = {
    borderLeft: "solid 5px #3b82f6",
    paddingInline: "1rem",
    display: "flex",
    gap: ".3rem",
    flexDirection: "column",
  } as CSSProperties

	return (
		<NavigationContainer authenticatedItem={authenticatedItem}>
			{status === "loading" ? (
				<p style={styleBorder}>Loading...</p>
			) : (
				session?.user && (
					<div
						style={styleBorder}
					>
						<small> logged in as </small>

						<strong>{session.user.name}</strong>

						<span>{session.user.email}</span>

						<small>
							<a
								href={envs.FRONTEND_URL + `/api/auth/signout`}
								className="button"
								style={{ color: "red" }}
							>
								{" "}
								Sign Out{" "}
							</a>
						</small>
					</div>
				)
			)}

			<hr style={{ border: "solid 1px #9999991f" }} />
			<div className="nav-link-group">
				<PiUsersThreeFill />
				<NavItem href="/">Dashboard</NavItem>
				<ListNavItems lists={lists} include={["User", "Role"]} />
			</div>

			<hr style={{ border: "solid 1px #9999991f" }} />
			<div className="nav-link-group">
				<BsFilePostFill />
				<ListNavItems
					lists={lists}
					include={["Page", "Post", "Announcement"]}
				/>
			</div>

			<hr style={{ border: "solid 1px #9999991f" }} />
			<div className="nav-link-group">
				<IoBookmarks />
				<ListNavItems
					lists={lists}
					include={["Booking", "Service", "Addon", "Availability", "Location"]}
				/>
			</div>

			<hr style={{ border: "solid 1px #9999991f" }} />
			<div className="nav-link-group">
				<FaTags />
				<ListNavItems lists={lists} include={["Category", "Tag"]} />
			</div>

			{/* //? from ks schema: single item*/}
			{/* <ListNavItems lists={lists}/> */}
			{/* //? from ks schema: multi items*/}
			{/* <ListNavItems lists={lists} include={["User"]}/> */}
			{/* //? external link */}
			{/* <NavItem href="https://keystonejs.com/">
          Keystone Docs
        </NavItem> */}
		</NavigationContainer>
	)
}
