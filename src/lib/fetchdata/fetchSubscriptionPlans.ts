import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"
import {  SubscriptionPlan } from "@ks/types"

const perPage = envs.PERPAGE

export async function fetchSubscriptionPlans(page:number, categoryNames:string[], session:any){

  const catConnects = categoryNames.map(name => ({categories: { some: { name: { equals: name }}}}))

  
  try {
    
    const count = await keystoneContext.withSession(session).query.SubscriptionPlan.count({
    
    })
    

    const subscriptionPlans = await keystoneContext.withSession(session).query.SubscriptionPlan.findMany({
      skip: page * perPage - perPage,
      take: perPage,
      orderBy: [
        {
          dateModified: "desc"
        }
      ],
      where: {
        OR: [
          ...catConnects,
          {
            NOT: [
              {
                OR: [
                  {
                    status: {
                      equals: "DRAFT"
                    }
                  },
                  // todo if added a new state
                  {
                    status: {
                      equals: "PRIVATE"
                    }
                  },
                ]
              }
            ]
          },
        ],
      },
      query: query
    }) as SubscriptionPlan[]
    
    
    return { subscriptionPlans, count }
    
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