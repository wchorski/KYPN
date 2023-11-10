import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import {  SubscriptionPlan } from "@ks/types"

const perPage = envs.PERPAGE

export async function fetchSubscriptionPlan(id:string, session:any){

  
  try {
    
    const count = await keystoneContext.withSession(session).query.SubscriptionPlan.count({
    
    })
    

    const subscriptionPlan = await keystoneContext.withSession(session).query.SubscriptionPlan.findOne({
      where: {
        id
      },
      query: query
    }) as SubscriptionPlan
    
    
    return { subscriptionPlan, count }
    
  } catch (error) {
    return {error}
  }
}

const query = `
  id
  author {
    id
    name
  }
  categories {
    id
    name
  }
  name
  excerpt
  description {
    document
  }
  billing_interval
  image
  image
  price
  slug
  status
  stockMax
  tags {
    id
    name
  }
`