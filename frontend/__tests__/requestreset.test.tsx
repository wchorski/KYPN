import { render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import { Nav } from '../components/Nav'
import { fakeUser, } from '../lib/testUtils'
import { QUERY_USER_CURRENT } from '../components/menus/Session'
import userEvent from "@testing-library/user-event";
import LoginForm from '../components/menus/LoginForm'
import RegisterForm, { MUTATION_USER_REGSITER } from '../components/menus/RegisterForm'
import PasswordResetRequest, { MUTATION_PASSWORD_RESET } from '../components/menus/PasswordResetRequest'
import PasswordResetForm from '../components/menus/PasswordResetForm'

const newUser = fakeUser({})
console.log(newUser);
const newPass = 'fakepassword'

const mocks = [
  {
    request: {
      query: MUTATION_PASSWORD_RESET,
      variables: {
        email: newUser.email,
      }
    },
    result: {
      data: {
        sendUserPasswordResetLink: null
      }
    },
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

describe('<PasswordResetRequest /> testing', () => {

  it('renders and matches snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <PasswordResetRequest />
      </MockedProvider>
    )

    expect(container).toMatchSnapshot()
    // debug()
  })

  it('calls mutation when submitted', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <PasswordResetRequest />
      </MockedProvider>
    )

    userEvent.type(screen.getByLabelText(/Email/i), newUser.email)
    userEvent.click(screen.getByText('Send Email'))
    // debug()
  })
})