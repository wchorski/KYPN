import { render, screen, waitFor } from '@testing-library/react'
import { fakeItem } from '../lib/testUtils'
import { ProductSingle, SINGLE_PRODUCT_QUERY } from '../components/ecommerce/ProductSingle'
import { MockedProvider } from '@apollo/react-testing'
import { withRouter } from "next-router-mock";
import CartCount from '../components/ecommerce/CartCount';

jest.mock('next/dist/client/router', () => require('next-router-mock'));



const fakeProduct = fakeItem()

const myMocks = [
  {
    request: {
      query: SINGLE_PRODUCT_QUERY,
      variables: {
        id: '123',
      }
    },

    result: {
      data: {
        Product: fakeProduct
      }
    }

  }
]

describe('<ProductSingle />', () => {
  // it('render proper query data, ', async () => {

  //   const ProductSingleWrap = withRouter(ProductSingle)

  //   const { container, debug } = render(
  //     <MockedProvider mocks={myMocks} addTypename={false}>
  //       <ProductSingleWrap product={fakeProduct} />
  //     </MockedProvider>
  //   )

  //   await waitFor(() => {
  //     // debug()
  //     screen.findByTestId('singleProduct')
  //     expect(container).toMatchSnapshot()
  //   })
  // })

  it('apollo error if item not found, ', async () => {
    const errorMocks: any = [{
      request: {
        query: SINGLE_PRODUCT_QUERY,
        variables: {
          where: {
            id: '123',
          }
        }
      },
      result: {
        errors: [{ message: 'Items not found' }]
      }
    }]

    const ProductSingleWrap = withRouter(ProductSingle)

    const { container, debug } = render(
      <MockedProvider mocks={errorMocks} >
        <ProductSingleWrap id='123' />
      </MockedProvider>
    )

    await waitFor(() => {
      screen.findByTestId('graphql-error')
      expect(container).toHaveTextContent('Items not found')
      // debug()
    })
  })
})

// describe('<ProductSingle />', () => {

//   const mocks: any = []

//   it('renders price tag & title', async () => {

//     const ProductSingleWrap = withRouter(ProductSingle)

//     const { container, debug } = render(
//       <MockedProvider mocks={mocks} addTypename={false}>
//         <ProductSingleWrap product={fakeProduct} />
//       </MockedProvider>
//     )


//     await waitFor(() => {
//       // debug()
//       const img = screen.getByAltText(fakeProduct.name);
//       expect(img).toBeInTheDocument();

//       const priceTag = screen.getByText('$50');
//       expect(priceTag).toBeInTheDocument();

//       const link = container.querySelector('a');
//       expect(link).toHaveAttribute('href', '/shop/product/update?id=abc123');
//       expect(link).toHaveTextContent('Edit ');

//     })
//   })

//   it('renders photo properly', async () => {
//     const ProductSingleWrap = withRouter(ProductSingle)

//     const { container, debug } = render(
//       <MockedProvider mocks={mocks} addTypename={false}>
//         <ProductSingleWrap product={fakeProduct} />
//       </MockedProvider>
//     )


//     await waitFor(() => {

//     })
//   })
// })


describe('<CartCount />', () => {
  // useRouter.mockReturnValue({ query: {} })
  const mocks: any = []

  it('renders cart count', async () => {


    const { container, debug } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CartCount count={23} />
      </MockedProvider>
    )

    await waitFor(() => {

      // debug()
    })
  })

  it('matches snapshot', () => {

    const { container } = render(
      <CartCount count={11} />
    )

    expect(container).toMatchSnapshot()
  })

  it('updates via props', async () => {

    const { container, rerender, debug } = render(
      <CartCount count={11} />
    )

    await waitFor(() => {
      expect(container.textContent).toBe('11')
      rerender(<CartCount count={12} />)
      expect(container).toMatchSnapshot()
      // debug()
    })

  })
})



