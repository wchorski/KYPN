import { render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import { Nav } from '../components/menus/Nav'
import { fakeUser, } from '../lib/testUtils'
import { QUERY_USER_CURRENT } from '../components/menus/Session'
import userEvent from "@testing-library/user-event";
import LoginForm from '../components/menus/LoginForm'
import RegisterForm, { MUTATION_USER_REGSITER } from '../components/menus/RegisterForm'

const newUser = fakeUser({})
console.log(newUser);
const newPass = 'fakepassword'

const mocks = [
  {
    request: {
      query: MUTATION_USER_REGSITER,
      variables: {
        name: newUser.name,
        // @ts-ignore
        email: newUser.email,
        password: newPass,
      }
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'abc123',
          name: newUser.name,
          // @ts-ignore
          email: newUser.email,
        }
      }
    }
  },

  {
    request: {
      query: QUERY_USER_CURRENT,
    },
    result: {
      data: {
        authenticatedItem: newUser
      }
    }
  },
]

describe('<RegisterForm /> testing', () => {

  it('renders and matches snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <RegisterForm />
      </MockedProvider>
    )

    expect(container).toMatchSnapshot()
    // debug()
  })

  it('calls the mutation properly', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <RegisterForm />
      </MockedProvider>
    )

    await userEvent.type(screen.getByLabelText(/Name/i), newUser.name)
    // @ts-ignore
    await userEvent.type(screen.getByLabelText(/Email/i), newUser.email)
    await userEvent.type(screen.getByLabelText(/Password/i), newPass)

    await userEvent.click(screen.getByText('Create Account'))
    await screen.findByText(`Success! New account registered: ${newUser.email}`)
    // const success = await screen.findByText(/success/i)
    // screen.debug(success)
    // expect(success).toBeInTheDocument()
    // debug()

    // expect(container).toMatchSnapshot()
    // debug()
  })
})
