
import ErrorMessage from '@components/ErrorMessage';
import { TagsPool } from '@components/menus/TagsPool';
import { CategoriesPool } from '@components/menus/CategoriesPool';
import { BreadCrumbs } from '@components/elements/BreadCrumbs';
import { ImageDynamic } from '@components/elements/ImageDynamic';
import { SubscriptionPlan, Tag,} from '@ks/types';
import { envs } from '@/envs';
import { PageTHeaderMain } from '@components/layouts/PageTemplates';
import { BlockRender } from '@components/blocks/BlockRender'
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/session';
import { Metadata, ResolvingMetadata } from 'next';
import { Card } from '@components/layouts/Card';
import { fetchSubscriptionPlan } from '@lib/fetchdata/fetchSubscriptionPlan';
import { OutOfStockLabel } from '@components/elements/OutOfStockLabel';
import moneyFormatter from '@lib/moneyFormatter';
import AddToCart from '@components/ecommerce/AddToCart';
import { Section } from '@components/layouts/Section';
import { PriceTag } from '@components/ecommerce/PriceTag';
import StripeSubscriptionButton from '@components/ecommerce/StripeSubscriptionButton';
import Link from 'next/link';
import styles from '@styles/ecommerce/productSingle.module.scss'
import { List } from '@components/elements/List';

export const revalidate = 5;

type Props = {
  params:{
    id:string | string[] | undefined,
  },
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
 
  // fetch data
  const session = await getServerSession(nextAuthOptions)
  const { subscriptionPlan } = await fetchSubscriptionPlan(String(params?.id), session)

  if(!subscriptionPlan) return {
    title: envs.SITE_TITLE,
    description: envs.SITE_DESC,
  }

  const { name, excerpt, image, tags, author, categories } = subscriptionPlan
  
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  
  return {
    metadataBase: new URL(envs.FRONTEND_URL),
    title: name,
    description: excerpt,
    openGraph: {
      images: [image, ...previousImages],
      title: name,
      description: excerpt,
      url: envs.FRONTEND_URL + '/shop/subscriptionplans/' + params.id,
      type: 'article'
    },
    keywords: tags?.map((tag:Tag) => tag.name).join(', ') + + ' ' + categories?.map(cat => cat.name).join(', '),
    authors: [{name: author?.name, url: author?.url}]
  }
}


export default async function SubscriptionPlanPageById({ params }:Props) {
  
  const session = await getServerSession(nextAuthOptions)
  const { subscriptionPlan, error } = await fetchSubscriptionPlan(String(params.id), session)

  if (error) return <ErrorMessage error={error} />

  if(!subscriptionPlan) return <p> subscription plan not found </p>

  return (
    <>
    <PageTHeaderMain 
      header={Header(subscriptionPlan?.name)}
      main={Main({subscriptionPlan, session})}
    />
    </>
  )
}

function Header(name:string){

  return <>

    <Section layout={'1'}>
      <div className={[styles.breadcrumbs_wrap, 'siteWrapper'].join(' ')}>
        <BreadCrumbs />
      </div>
      <h1 style={{display: 'none'}}> SubscriptionPlan: {name} </h1>
    </Section>

  </>
}

type Main = {
  subscriptionPlan:SubscriptionPlan,
  session:any,
}


function Main({ subscriptionPlan, session }:Main) {

  const { id, name, image, price, description, excerpt, status, categories, tags, author, billing_interval, addons} = subscriptionPlan

  return <>

    <Section layout={'1'}>

      {status === 'DRAFT' && <p className='warning'>This SubscriptionPlan is still a draft</p>}
      {status === 'PRIVATE' && <p className='warning'>This SubscriptionPlan is private</p>}
        
      <article className={styles.product}  data-testid='singleSubscriptionPlan'>

        <aside>
          {status === 'OUT_OF_STOCK' && <OutOfStockLabel /> }

          <figure className="img-frame featured_img">
            <ImageDynamic photoIn={ {url: image, altText: 'subscription image'}}/>
            
          </figure>
        </aside>

        <div className="content">
          <div className="details">
            <h2>{name}</h2>

            <p> <PriceTag price={price} subtext={`/${billing_interval}`}/> </p>
  
            {/* <AddToCart SubscriptionPlanId={id} sessionId={session.itemId}/> */}
            {session ? (
              <Link href={`/checkout/subscriptionplan/${id}`} className='button large'> Start Subscription </Link>
            ): (
              <p> <Link href={`/api/auth/signin`} > Login </Link> or <Link href={`/auth/register`}> Create an Account </Link></p>
            )}

            <div className={styles.description_wrap}>
              <BlockRender document={description.document} />
            </div>

            <div>
              <h2> Add-Ons</h2>
              <p> Available add-ons that can be selected during checkout </p>
              <hr  style={{margin: '1rem 0'}}/>
              <ul>
                {addons.map(ad => <li key={ad.id}>
                  <h5>{ad.name} <PriceTag price={ad.price}/> </h5>
                  <p>{ad.excerpt}</p>
                  <hr  style={{margin: '1rem 0'}}/>
                </li>)}
              </ul>
            </div>
          </div>

          <footer>

            <Card>
              <h4 className='categories'>Categories: </h4>
              <CategoriesPool />
            </Card>

            <Card>
              <h4 className='tags'>Tags:</h4>
              <TagsPool />
            </Card>
            
          </footer>

        </div>

      </article>
    </Section>

  </>
}