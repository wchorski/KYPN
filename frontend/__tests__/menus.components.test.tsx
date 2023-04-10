import { render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import { Nav } from '../components/Nav'
import { fakeUser, fakeCartItem } from '../lib/testUtils'
import { CartStateProvider } from '../lib/cartState'
import { QUERY_USER_CURRENT } from '../components/menus/Session'

const mocksNoLogin: any = [{
  request: {
    query: QUERY_USER_CURRENT,
    variables: {
      where: {
        id: '123',
      }
    }
  },
  result: {
    data: {
      authenticatedItem: null
    }
  }
}]

const mocksIsLoggedIn: any = [{
  request: {
    query: QUERY_USER_CURRENT,
    // variables: {
    //   where: {
    //     id: '123',
    //   }
    // }
  },
  result: {
    data: {
      authenticatedItem: fakeUser
    }
  }
}]

const mocksUserWithCart: any = [{
  request: {
    query: QUERY_USER_CURRENT,
    // variables: {
    //   where: {
    //     id: '4234',
    //   }
    // }
  },
  result: {
    data: {
      authenticatedItem: fakeUser({
        cart: [fakeCartItem, fakeCartItem, fakeCartItem]
      })
    }
  }
}]

describe('<Nav />', () => {

  it('renders minimal nav when no login', () => {

    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={mocksNoLogin} addTypename={false}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    )

    // debug()
    expect(container).toHaveTextContent('Login')
    expect(container).toMatchSnapshot()
    const link = screen.getByText('Login')
    // screen.debug(link)
    expect(link).toHaveAttribute('href', '/auth/login')

    const productsLink = screen.getByText('Shop')
    expect(productsLink).toBeInTheDocument()
    expect(productsLink).toHaveAttribute('href', '/shop')
  })


  it('renders nav when user islogged in', async () => {

    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={mocksIsLoggedIn} >
          <Nav />

        </MockedProvider>
      </CartStateProvider>
    )

    // TODO doesn't think it's logged back in
    // await screen.findByText('My Account')
    await waitFor(() => {
      // screen.findByText('My Account')
      // expect(container).toHaveTextContent('Sign Out')
      // debug()
    })
  })


  it('user with cart items', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={mocksUserWithCart} >
          <Nav />

        </MockedProvider>
      </CartStateProvider>
    )

    // await screen.findByText('My Account')
    debug()
  })

})