import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/react-testing";
import { withRouter } from "next-router-mock";
import { fakeUser, fakeItem, makePaginationMocksFor } from '../lib/testUtils'
import { ProductCreate, CREATE_PRODUCT_MUTATION } from "../components/ecommerce/ProductCreate";
import { GET_ALL_PRODUCTS } from "../components/ProductsList";

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
    // @ts-ignore
    await userEvent.type(screen.getByPlaceholderText(/Price/i), String(newItem.price))
    await userEvent.type(screen.getByPlaceholderText(/Description/i), newItem.description)

    expect(screen.getByDisplayValue(newItem.name)).toBeInTheDocument()
  });
})