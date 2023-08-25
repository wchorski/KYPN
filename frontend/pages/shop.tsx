import { Pagination } from "../components/Pagination";
import { ProductsList } from "../components/ecommerce/ProductsList";
import { useRouter } from 'next/router'
import { SubscriptionPlansList } from "../components/ecommerce/SubscriptionPlansList";
import { LoadingAnim } from "../components/elements/LoadingAnim";
import { QueryLoading } from "../components/menus/QueryLoading";
import { envvars } from "../lib/envvars";
import Head from "next/head";
import { ProductListBlock } from "@/components/blocks/ProductListBlock";

export default function StorePage() {

  const { query } = useRouter()

  return (
    <>
      <Head>
        <title> Shop | {envvars.SITE_TITLE} </title>
        <meta name="description"        content={envvars.SITE_DESCRIPTION} />
        {/* <meta name='keywords'           content={tags.map(tag => tag.name).join(', ')} /> */}
        {/* <meta name="author"             content={author.name} /> */}
        <meta property="og:title"       content={envvars.SITE_TITLE} />
        <meta property="og:description" content={envvars.SITE_DESCRIPTION} />
        <meta property="og:image"       content={envvars.SITE_URI + '/assets/private/logo.png'} />
        <meta property="og:url"         content={envvars.SITE_URI + '/shop'} />
        <meta property="og:type"        content="website" />
      </Head>
      
      <div className="container">
      
      <Pagination route='/shop' page={Number(query.page) || 1} />
      <section>
        <ProductsList page={Number(query.page) || 1} />
      </section>
      <Pagination route='/shop' page={Number(query.page) || 1} />
      
      <hr />

      <Pagination route='/shop/subscriptions' page={Number(query.page) || 1} />
      <section>
        <SubscriptionPlansList page={Number(query.page) || 1} />
      </section>
      <Pagination route='/shop/subscriptions' page={Number(query.page) || 1} />
      
      </div>

    </>
  );
}
