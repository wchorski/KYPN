'use client'

import { fetchGqlProtected } from "@lib/fetchdata/fetchGqlProtected"


export function CheckoutTest () {

  async function handleCheckout(){

    const variables = {
      chargeId: 'lolololol',
    }

    try {
      const res = await fetch(`/api/gql/protected`, {
        method: 'POST',
        body: JSON.stringify({query, variables})
      })
      const data = await res.json()
      console.log({data});
      

    } catch (error) {
      console.log('!!! checkout test ERROR: ', error);
      
    }
  }
  return (
    <button onClick={handleCheckout}>
      CheckoutTest
    </button>
  )
}

// ? complains when i query anything other than quantity.... idk why
const query = `
  mutation Checkout($chargeId: String!) {
    checkout(chargeId: $chargeId) {
      quantity
    }
  }
`