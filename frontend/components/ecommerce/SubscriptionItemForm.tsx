import { gql, useMutation } from "@apollo/client"
import ErrorMessage from "../ErrorMessage"
import { FormEvent } from "react"
import { useUser } from "../menus/Session"

type Props = {
  planId:string
}

export function SubscriptionItemForm({planId}:Props) {

  const session = useUser()

  const [createSubscriptionItem, { data, error, loading }] = useMutation(CREATE_SUBSCRIPTIONITEM)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const formattedInputs = {
      custom_price: 0,
      isActive: true,
      isDelinquent: false,
    }

    if (planId !== '' ) {
      Object.assign(formattedInputs, {
        subscriptionPlan: {
          connect: {
            id: planId
          }
        },
      })
    }

    if (session) {
      Object.assign(formattedInputs, {
        user: {
          connect: {
            id: session.id
          }
        }
      })
    }

    const res = await createSubscriptionItem({
      variables: {
        data: formattedInputs
      }
    })

    console.log(res);
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <ErrorMessage error={error} />

      <button type="submit"> Subscribe </button>
    </form>
  )
}

const CREATE_SUBSCRIPTIONITEM = gql`
  mutation CreateSubscriptionItem($data: SubscriptionItemCreateInput!) {
  createSubscriptionItem(data: $data) {
    user {
      id
    }
    custom_price
    id
    isActive
    isDelinquent
    subscriptionPlan {
      id
      name
    }
  }
}
`