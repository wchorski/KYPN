import { render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import { Nav } from '../components/menus/Nav'
import { fakeUser, fakeCartItem, makePaginationMocksFor } from '../lib/testUtils'
import { CartStateProvider } from '../lib/cartState'
import { QUERY_USER_CURRENT } from '../components/menus/Session'
import { Pagination } from '../components/Pagination'

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
  },
  result: {
    data: {
      authenticatedItem: fakeUser({})
    }
  }
}]

const mocksUserWithCart: any = [{
  request: {
    query: QUERY_USER_CURRENT,
  },
  result: {
    data: {
      authenticatedItem: fakeUser({
        cart: [fakeCartItem, fakeCartItem, fakeCartItem]
      })
    }
  }
}]

// describe('<Nav />', () => {

//   it('renders minimal nav when no login', () => {

//     const { container, debug } = render(
//       <CartStateProvider>
//         <MockedProvider mocks={mocksNoLogin} addTypename={false}>
//           <Nav />
//         </MockedProvider>
//       </CartStateProvider>
//     )

//     // debug()
//     expect(container).toHaveTextContent('Login')
//     expect(container).toMatchSnapshot()
//     const link = screen.getByText('Login')
//     // screen.debug(link)
//     expect(link).toHaveAttribute('href', '/auth/login')

//     const productsLink = screen.getByText('Shop')
//     expect(productsLink).toBeInTheDocument()
//     expect(productsLink).toHaveAttribute('href', '/shop')
//   })


//   it('renders nav when user islogged in', async () => {

//     const { container, debug } = render(
//       <CartStateProvider>
//         <MockedProvider mocks={mocksIsLoggedIn} >
//           <Nav />

//         </MockedProvider>
//       </CartStateProvider>
//     )

//     // TODO doesn't think it's logged back in
//     // await screen.findByText('My Account')
//     await waitFor(() => {
//       // screen.findByText('My Account')
//       // expect(container).toHaveTextContent('Sign Out')
//       // debug()
//     })
//   })


//   it('user with cart items', async () => {
//     const { container, debug } = render(
//       <CartStateProvider>
//         <MockedProvider mocks={mocksUserWithCart} >
//           <Nav />

//         </MockedProvider>
//       </CartStateProvider>
//     )

//     // await screen.findByText('My Account')
//     // debug()
//   })

// })

describe('<Pagination /> testing', () => {

  it('is still loading pagination', () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(1)}>
        <Pagination page={1} />
      </MockedProvider>
    )

    expect(container).toHaveTextContent('Loading...')
    // debug()
  })

  it('18 items of pagination', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(1000)}>
        <Pagination page={1} />
      </MockedProvider>
    )

    await screen.findByTestId('pagination')
    const pageCountTotal = screen.getByTestId('pagination-countTotal')
    expect(pageCountTotal).toHaveTextContent('1000 Total Products')
    expect(container).toMatchSnapshot()

    // debug()
    // await waitFor(() => {

    //   debug()
    // })

  })

  it('disables prev page on first page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(1000)}>
        <Pagination page={1} />
      </MockedProvider>
    )

    await screen.findByTestId('pagination')
    // debug()
    const prevButton = screen.getByText(/Prev/i)
    const nextButton = screen.getByText(/Next/i)
    expect(prevButton).toHaveAttribute('aria-disabled', 'true')
    expect(nextButton).toHaveAttribute('aria-disabled', 'false')
  })

  it('disables next page on last page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(1000)}>
        <Pagination page={50} />
      </MockedProvider>
    )

    await screen.findByTestId('pagination')
    // debug()
    const prevButton = screen.getByText(/Prev/i)
    const nextButton = screen.getByText(/Next/i)
    expect(prevButton).toHaveAttribute('aria-disabled', 'false')
    expect(nextButton).toHaveAttribute('aria-disabled', 'true')
  })

  it('enabled prev and next navigation', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(1000)}>
        <Pagination page={23} />
      </MockedProvider>
    )

    await screen.findByTestId('pagination')
    // debug()
    const prevButton = screen.getByText(/Prev/i)
    const nextButton = screen.getByText(/Next/i)
    expect(prevButton).toHaveAttribute('aria-disabled', 'false')
    expect(nextButton).toHaveAttribute('aria-disabled', 'false')
  })

})