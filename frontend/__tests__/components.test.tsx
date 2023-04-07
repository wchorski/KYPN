import { render, screen, waitFor } from '@testing-library/react'
import { fakeItem } from '../lib/testUtils'
import { ProductSingle } from '../components/ecommerce/ProductSingle'
import { MockedProvider } from '@apollo/react-testing'
import { act } from 'react-dom/test-utils';
import { QUERY_USER_CURRENT } from '../components/menus/Session';

const mocks = [
  {
    request: {
      query: QUERY_USER_CURRENT,
      variables: {
        id: 1
      },
    },
    result: {
      data: {
        myQueryResult: {
          id: 1,
          name: 'My Item'
        },
      },
    },
  },
];

const fakeProduct = fakeItem()

describe('<ProductSingle />', () => {

  // act(() => {
  it('renders price tag & title', async () => {
    const { container, debug } = render(
      <MockedProvider>
        <ProductSingle product={fakeProduct} />
      </MockedProvider>
    )

    await waitFor(() => {
      //   expect(screen.getByText('$50')).toBeInTheDocument()
      debug()
    })
  })

  // })

})

