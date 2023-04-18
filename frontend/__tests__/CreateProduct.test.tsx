import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/react-testing";
import { withRouter } from "next-router-mock";
import Router from 'next/router'; // We will MOCK THIS
import { fakeUser, fakeItem, makePaginationMocksFor } from '../lib/testUtils'
import { ProductCreate, CREATE_PRODUCT_MUTATION } from "../components/ecommerce/ProductCreate";
import { GET_ALL_PRODUCTS } from "../components/ecommerce/ProductsList";

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

const newItem = fakeItem()

describe('<ProductCreate />', () => {

  it('render and match snapshot', () => {
    const { container, debug } = render(
      <MockedProvider >
        <ProductCreate />
      </MockedProvider>
    )

    expect(container).toMatchSnapshot()
    // debug()

  })

  it('handles and updating', async () => {
    const { container, debug } = render(
      <MockedProvider >
        <ProductCreate />
      </MockedProvider>
    )


    await userEvent.type(screen.getByPlaceholderText(/Name/i), newItem.name)
    await userEvent.type(screen.getByPlaceholderText(/Price/i), String(newItem.price))
    await userEvent.type(screen.getByPlaceholderText(/Description/i), newItem.description)

    expect(screen.getByDisplayValue(newItem.name)).toBeInTheDocument()
    expect(screen.getByDisplayValue(newItem.price)).toBeInTheDocument()
    expect(screen.getByDisplayValue(newItem.description)).toBeInTheDocument()
  });


  fit('create items when form is submitted', async () => {
    const mocks = [
      {
        request: {
          query: CREATE_PRODUCT_MUTATION,
          variables: {
            name: newItem.name,
            description: newItem.description,
            price: newItem.price,
            slug: newItem.slug,
          },
        },
        result: {
          data: {
            createProduct: {
              ...newItem,
              id: 'abc123',
              __typename: 'Item',
            }
          }
        }
      },
      {
        request: {
          query: GET_ALL_PRODUCTS,
          variables: {
            skip: 0,
            take: 8,
          }
        },
        result: {
          data: {
            allProducts: [newItem]
          }
        },
      }
    ]

    const ProductCreateRoute = withRouter(ProductCreate)

    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <ProductCreateRoute />
      </MockedProvider>
    )

    await userEvent.type(screen.getByPlaceholderText(/Name/i), newItem.name)
    await userEvent.type(screen.getByPlaceholderText(/Price/i), String(newItem.price))
    await userEvent.type(screen.getByPlaceholderText(/Description/i), newItem.description)

    await userEvent.click(screen.getByText('Add'))
    // await waitFor(() => wait(0));
    await waitFor(() => {
      // debug()
      // expect(Router.push).toHaveBeenCalled();
      // expect(Router.push).toHaveBeenCalledWith({ pathname: '/shop/product/abc123' });
      // expect(container).toHaveTextContent('Store Page')

    })

  });
})
