import { NavigationContainer, NavItem, ListNavItems } from '@keystone-6/core/admin-ui/components';
import type { NavigationProps } from '@keystone-6/core/admin-ui/components';
import { SessionProvider, useSession } from 'next-auth/react';

export function CustomNavigation({ authenticatedItem, lists }: NavigationProps) {

  const {data: session, status} = useSession()

  return (
      <NavigationContainer authenticatedItem={authenticatedItem}>

        <p style={{padding: '1rem'}}> logged in as {session?.user.email} </p>

        <hr style={{border: 'solid 1px #9999991f'}} />
        <NavItem href="/">Dashboard</NavItem>
        <NavItem href="/users">Users</NavItem>
        <NavItem href="/roles">Roles</NavItem>
        <NavItem href="/availabilities"> Availabilities</NavItem>

        <hr style={{border: 'solid 1px #9999991f'}} />
        <NavItem href="/services"> Services </NavItem>
        <NavItem href="/bookings"> Bookings </NavItem>

        <hr style={{border: 'solid 1px #9999991f'}} />
        <NavItem href="/subscription-plans"> Subscription Plans </NavItem>
        <NavItem href="/subscription-items"> Subscription Items </NavItem>

        <hr style={{border: 'solid 1px #9999991f'}} />
        <NavItem href="/events"> Events </NavItem>
        <NavItem href="/tickets"> Tickets </NavItem>

        <hr style={{border: 'solid 1px #9999991f'}} />
        <NavItem href="/locations"> Locations </NavItem>
        <NavItem href="/addons"> Addons </NavItem>
        <NavItem href="/coupons"> Coupons </NavItem>

        <hr style={{border: 'solid 1px #9999991f'}} />
        <NavItem href="/products"> Products </NavItem>
        <NavItem href="/rentals"> Rentals </NavItem>
        <NavItem href="/orders"> Orders </NavItem>
        <NavItem href="/cart-items"> Cart Items </NavItem>
        <NavItem href="/order-items"> Order Items </NavItem>

        <hr style={{border: 'solid 1px #9999991f'}} />
        <NavItem href="/pages"> Pages </NavItem>
        <NavItem href="/posts"> Posts </NavItem>
        <NavItem href="/announcements"> Announcements </NavItem>
        <NavItem href="/categories"> Categories </NavItem>
        <NavItem href="/tags"> Tags </NavItem>

        <hr style={{border: 'solid 1px #9999991f'}} />


        {/* <NavItem href="https://keystonejs.com/">
          Keystone Docs
        </NavItem> */}
        {/* //? auto gen from schema list */}
        {/* <ListNavItems lists={lists}/> */}
        {/* //? only allow certain list types */}
        {/* <ListNavItems lists={lists} include={["User"]}/> */}
      </NavigationContainer>
  )
}