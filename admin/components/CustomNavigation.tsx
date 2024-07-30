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
				<>
					<p style={{ paddingInline: "1rem" }}> logged in as </p>
					<ul
						style={{
							paddingInline: "1rem",
							display: "flex",
							gap: "1rem",
							flexDirection: "column",
						}}
					>
						<li>
							<strong>{session.user.name}</strong>
						</li>
						<li>{session.user.email}</li>
						<li>
							<a
								href={envs.FRONTEND_URL + `/api/auth/signout`}
								className="button"
							>
								{" "}
								Sign Out{" "}
							</a>
						</li>
					</ul>
				</>
			)}

			<hr style={{ border: "solid 1px #9999991f" }} />
			<NavItem href="/">Dashboard</NavItem>
      <ListNavItems lists={lists} include={['User', 'Role']}/>
			{/* <NavItem href="/users">Users</NavItem>
			<NavItem href="/roles">Roles</NavItem> */}

			<hr style={{ border: "solid 1px #9999991f" }} />
      <ListNavItems lists={lists} include={['Page', 'Post']}/>

			<hr style={{ border: "solid 1px #9999991f" }} />
      <ListNavItems lists={lists} include={['Category', 'Tag']}/>

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
