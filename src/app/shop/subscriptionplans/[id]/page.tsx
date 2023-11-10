
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
import styles from '@styles/ecommerce/productSingle.module.scss'
import { Section } from '@components/layouts/Section';
import { PriceTag } from '@components/ecommerce/PriceTag';

export const revalidate = 5;

type Props = {
  params:{
    id:string | string[] | undefined,
  },
  searchParams: { [key: string]: string | string[] | undefined }
  template:string,
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

  const { name, excerpt, image, tags, author } = subscriptionPlan
  
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  
  return {
    metadataBase: new URL(envs.FRONTEND_URL),
    title: name,
    description: String(excerpt),
    openGraph: {
      images: [String(image), ...previousImages],
      title: name,
      description: excerpt,
      url: envs.FRONTEND_URL + '/shop/SubscriptionPlans/' + params.id,
      type: 'article'
    },
    keywords: tags?.map((tag:Tag) => tag.name).join(', '),
    authors: [{name: author?.name, url: author?.url}]
  }
}


export default async function SubscriptionPlanPageById({ params }:Props) {
  
  const session = await getServerSession(nextAuthOptions)
  const { subscriptionPlan, error } = await fetchSubscriptionPlan(String(params.id), session)

  if (error) return <ErrorMessage error={error} />

  if(!subscriptionPlan) return <p> post not found </p>

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
    <header style={{display: 'none'}}>
      <div className={[styles.breadcrumbs_wrap, 'siteWrapper'].join(' ')}>
        <BreadCrumbs />
      </div>
      <h1> SubscriptionPlan: {name} </h1>

    </header>
  </>
}

type Main = {
  subscriptionPlan:SubscriptionPlan,
  session:any,
}


function Main({ subscriptionPlan, session }:Main) {

  const { id, name, image, price, description, excerpt, status, categories, tags, author, billing_interval} = subscriptionPlan

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
            <button className={'button'} >
              TODO START SUBSCRIPTION with STRIPE
            </button>

            <div className={styles.description_wrap}>
              <BlockRender document={description.document} />
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