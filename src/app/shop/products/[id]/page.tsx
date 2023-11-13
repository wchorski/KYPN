
import ErrorMessage from '@components/ErrorMessage';
import { TagsPool } from '@components/menus/TagsPool';
import { CategoriesPool } from '@components/menus/CategoriesPool';
import { BreadCrumbs } from '@components/elements/BreadCrumbs';
import { ImageDynamic } from '@components/elements/ImageDynamic';
import { Product,} from '@ks/types';
import { envs } from '@/envs';
import { PageTHeaderMain } from '@components/layouts/PageTemplates';
import { BlockRender } from '@components/blocks/BlockRender'
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/session';
import { Metadata, ResolvingMetadata } from 'next';
import { Card } from '@components/layouts/Card';
import { fetchProduct } from '@lib/fetchdata/fetchProduct';
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
  const { product } = await fetchProduct(String(params?.id), session)

  if(!product) return {
    title: envs.SITE_TITLE,
    description: envs.SITE_DESC,
  }

  const { name, excerpt, image, tags, author } = product
  
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
      url: envs.FRONTEND_URL + '/shop/products/' + params.id,
      type: 'article'
    },
    keywords: tags?.map(tag => tag.name).join(', '),
    authors: [{name: author?.name, url: author?.url}]
  }
}


export default async function ProductPageById({ params }:Props) {
  
  const session = await getServerSession(nextAuthOptions)
  const { product, error } = await fetchProduct(String(params.id), session)

  if (error) return <ErrorMessage error={error} />

  if(!product) return <p> post not found </p>

  return (
    <>
    <PageTHeaderMain 
      header={Header(product?.name)}
      main={Main({product, session})}
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
      <h1> Product: {name} </h1>

    </header>
  </>
}

type Main = {
  product:Product,
  session:any,
}


function Main({ product, session }:Main) {

  const { id, name, image, price, description, excerpt, status, categories, tags, author} = product

  return <>

    <Section layout={'1'}>

      {status === 'DRAFT' && <p className='warning'>This product is still a draft</p>}
      {status === 'PRIVATE' && <p className='warning'>This product is private</p>}
        
      <article className={styles.product}  data-testid='singleProduct'>

        <aside>
          {status === 'OUT_OF_STOCK' && <OutOfStockLabel /> }

          <figure className="img-frame featured_img">
            <ImageDynamic photoIn={ {url: image, altText: 'subscription image'}}/>
            
          </figure>
        </aside>

        <div className="content">
          <div className="details">
            <h2>{name}</h2>

            <p> <PriceTag price={price} /></p>
  
            <AddToCart productId={id} sessionId={session.itemId}/>

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