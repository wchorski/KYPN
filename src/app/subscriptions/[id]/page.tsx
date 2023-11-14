import { StatusBadge } from '@components/StatusBadge'
import { PriceTag } from '@components/ecommerce/PriceTag'
import { ImageDynamic } from '@components/elements/ImageDynamic'
import { Card } from '@components/layouts/Card'
import { PageTHeaderMain } from '@components/layouts/PageTemplates'
import { Section } from '@components/layouts/Section'
import DialogPopup from '@components/menus/Dialog'
import { SubItemUpdateForm } from '@components/subscriptions/SubItemUpdateForm'
import { SubscriptionItem } from '@ks/types'
import { dateDaysLapsed, datePrettyLocal } from '@lib/dateFormatter'
import fetchSubscriptionItem from '@lib/fetchdata/fetchSubscriptionItem'
import moneyFormatter from '@lib/moneyFormatter'
import Link from 'next/link'
type Props = {
  searchParams:{q:string}
  params:{id:string}
}

export default async function SubscriptionItemByIdPage ({ params, searchParams }:Props) {

  const { id } = params

  const { subscriptionItem, error } = await fetchSubscriptionItem(id)
  return (
    <PageTHeaderMain
      header={Header(subscriptionItem?.status, subscriptionItem?.subscriptionPlan.excerpt)}
      main={Main(subscriptionItem)}
    />
  )
}

function Header(status:SubscriptionItem['status']|undefined, excerpt:string|undefined){

  return<header>
    <h1> Subscription </h1>
    <StatusBadge type={'subscriptionItem'} status={status} />
    <Link 
      className=''
      style={{margin: '0 1rem'}}
      href={`?${new URLSearchParams({ popup: 'modal'})}`}
    > 
      edit 
    </Link>
  </header>
}

function Main(subscriptionItem:SubscriptionItem|undefined){

  if(!subscriptionItem) return <p> subscription not found </p>

  const { id, status, subscriptionPlan, user, dateCreated, dateModified, custom_price, billing_interval } = subscriptionItem

  return<>
    <DialogPopup
      title='Update Subscription'
      buttonLabel='ok'
    >
      {status === 'CANCELED' ? (
        <p>Cancled subscriptions can not be re-activated. Head to our shop and <Link href={`/shop`}> start new subscription </Link></p>
      ):(<>
        <p> change the status </p>
        <SubItemUpdateForm status={status} subPlanId={id} />
      </>)

      }
    </DialogPopup>

    <Section layout={'1'}>

      <Card
        layout={'flex'}
      >
        <div>
          <Link href={`/shop/subscriptionplans/${subscriptionPlan.id}`} target={'_blank'}> 
            <h3>{subscriptionPlan.name}</h3> 
          </Link>

          <p>{subscriptionPlan.excerpt}</p>
        </div>

        <ImageDynamic 
          photoIn={subscriptionPlan.image}
        />

      </Card>

      <table>
        <tbody>
          <tr>
            <td> <label>Client: </label> </td>
            <td>
              {user ? (
                <Link href={`/users/${user.id}`}>
                  {user?.name}
                </Link>
              ) : (
                // @ts-ignore
                <span> {user.name ? user.name : 'Unregistered User'} </span>
              )}
              <br />
              <span>{user?.email} </span>
              <br />
              <span>{user?.phone}</span>
            </td>
          </tr>

          <tr>
            <td><label>started: </label> </td>
            <td>{datePrettyLocal(dateCreated, 'full')} </td>
          </tr>
          <tr>
            <td><label>updated: </label> </td>
            <td> {datePrettyLocal(dateModified, 'full')} </td>
          </tr>
          <tr>
            <td><label>days lapsed: </label> </td>
            <td> {dateDaysLapsed(dateCreated, new Date().toISOString())} </td>
          </tr>
          <tr>
            <td><label>Status: </label> </td>
            <td> <span className="status"> {status} </span></td>
          </tr>

          <tr>
            <td><label>Price: </label> </td>
            <td> <PriceTag price={custom_price} subtext={`/${billing_interval}`}/> </td>
          </tr>
        </tbody>
      </table>
    </Section>
  </>
}