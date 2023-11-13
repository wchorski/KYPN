import { nextAuthOptions } from '@/session';
import { keystoneContext } from '@ks/context';
import { SubscriptionItem } from '@ks/types';
import { getServerSession } from 'next-auth';

export default async function fetchSubscriptionItem(id:string){

  try {

    const session = await getServerSession(nextAuthOptions)
    

    const subscriptionItem = await keystoneContext.withSession(session).query.SubscriptionItem.findOne({
      query: query,
      where: {
        id: id,
      }
    }) as SubscriptionItem
    
    return { subscriptionItem }
    
  } catch (error) {
    console.log('!!! fetch sub item: ', error)
    return { error }
  }
}

const query = `
  custom_price
  dateCreated
  dateModified
  billing_interval
  id
  status

  subscriptionPlan {
    id
    image
    name
    excerpt
  }
  addons{
    id
    name
  }
  user {
    email
    id
    name
  }
`