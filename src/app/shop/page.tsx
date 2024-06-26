import { Pagination } from "@components/Pagination";
import ErrorMessage from "@components/ErrorMessage";

import { PageTHeaderMain } from "@components/layouts/PageTemplates";
import { envs } from "@/envs";
import { Metadata } from "next";
import { ProductsList } from "@components/ecommerce/ProductsList";
import { fetchProducts } from "@lib/fetchdata/fetchProducts";
import { Product, SubscriptionPlan } from "@ks/types";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/session";
import { fetchSubscriptionPlans } from "@lib/fetchdata/fetchSubscriptionPlans";
import { SubscriptionPlanList } from "@components/ecommerce/SubscriptionPlanList";
import { Section } from "@components/layouts/Section";
import NoDataFoundError404 from "../not-found";

export const revalidate = 5;

type Props = {
  params: {
    page: string | string[] | undefined;
    categories: string | string[] | undefined;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
    categories: string | undefined;
    page: string | undefined;
  };
};

export const metadata: Metadata = {
  title: `Shop | ` + envs.SITE_TITLE,
  description: envs.SITE_DESC,
};

export default async function ShopPage({ params, searchParams }: Props) {
  const session = await getServerSession(nextAuthOptions);
  const { page, categories } = searchParams;
  const currPage = Number(page) || 1;
  const categoryNames = categories?.split(",") || [];

  const {
    products,
    count: countProducts,
    error: errorProducts,
  } = await fetchProducts(currPage, categoryNames, session);
  const {
    subscriptionPlans,
    count: countSubPlans,
    error: errorSubPlans,
  } = await fetchSubscriptionPlans(currPage, categoryNames, session);

  if (errorProducts) return <ErrorMessage error={errorProducts} />;
  if (errorSubPlans) return <ErrorMessage error={errorSubPlans} />;

  return (
    <PageTHeaderMain
      header={Header()}
      main={Main({
        page: currPage,
        categoryNames,
        products,
        countProducts,
        subscriptionPlans,
        countSubPlans,
      })}
    />
  );
}

function Header() {
  return (
    <>
      <Section layout={"1"}>
        <h1> Shop </h1>
      </Section>
    </>
  );
}

type Main = {
  page: number;
  categoryNames: string[];
  products: Product[] | undefined;
  countProducts: number | undefined;
  subscriptionPlans: SubscriptionPlan[] | undefined;
  countSubPlans: number | undefined;
};

function Main({
  page,
  categoryNames = [],
  products = [],
  countProducts,
  subscriptionPlans = [],
  countSubPlans,
}: Main) {
  if (!products && !subscriptionPlans)
    return (
      <NoDataFoundError404>
        {" "}
        <p> no public items for sale </p>{" "}
      </NoDataFoundError404>
    );

  return (
    <>
      {subscriptionPlans?.length > 0 && (
        <Section layout={"1"}>
          <h2> Subscription Plans </h2>
          <Pagination route="/shop" page={page || 1} count={countSubPlans} />
          <SubscriptionPlanList
            page={page}
            categoryNames={categoryNames}
            plans={subscriptionPlans}
          />
          <Pagination route="/shop" page={page || 1} count={countSubPlans} />
        </Section>
      )}

      <hr />

      {products?.length > 0 && (
        <Section layout={"1"}>
          <h2> Products </h2>
          <Pagination route="/shop" page={page || 1} count={countProducts} />
          <ProductsList
            page={page}
            categoryNames={categoryNames}
            products={products}
          />
          <Pagination route="/shop" page={page || 1} count={countProducts} />
        </Section>
      )}
    </>
  );
}
