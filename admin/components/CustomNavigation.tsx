import { envs } from "../../envs"
import {
	NavigationContainer,
	NavItem,
	ListNavItems,
} from "@keystone-6/core/admin-ui/components"
import type { NavigationProps } from "@keystone-6/core/admin-ui/components"
import { useSession } from "next-auth/react"

export function CustomNavigation({
	authenticatedItem,
	lists,
}: NavigationProps) {
	const { data: session, status } = useSession()

	return (
		<NavigationContainer authenticatedItem={authenticatedItem}>
			{session?.user && (
				<div
					style={{
						borderLeft: "solid 5px #3b82f6",
						paddingInline: "1rem",
						display: "flex",
						gap: ".3rem",
						flexDirection: "column",
					}}
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
			)}

			<hr style={{ border: "solid 1px #9999991f" }} />
			<NavItem href="/">Dashboard</NavItem>
			<ListNavItems lists={lists} include={["User", "Role"]} />

			<hr style={{ border: "solid 1px #9999991f" }} />
			<ListNavItems lists={lists} include={["Page", "Post"]} />

			<hr style={{ border: "solid 1px #9999991f" }} />
			<ListNavItems lists={lists} include={["Category", "Tag"]} />

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
