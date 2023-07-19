import { ProductThumbnail } from '../../components/ProductThumbnail';
import moneyFormatter from '../../lib/moneyFormatter';

import Image from 'next/image';

import { StyledPriceTag } from "../../styles/PriceTag.styled";
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import AddToCart from './AddToCart';
import { handlePhoto } from '../../lib/handleProductPhoto';
import { gql, useQuery } from '@apollo/client';
import { QueryLoading } from '../menus/QueryLoading';
import ErrorMessage from '../ErrorMessage';
import { TagsPool } from '../menus/TagsPool';
import { CategoriesPool } from '../menus/CategoriesPool';
import { ImageDynamic } from '../elements/ImageDynamic';
import { PopupAnim } from '../menus/PopupAnim';
import { useState } from 'react';
import { CheckoutForm } from './CheckoutForm';
import { SubscriptionItemForm } from './SubscriptionItemForm';

const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE

export function SubscriptionPlanSingle({ id }: any) {

  const [isPopup, setIsPopup] = useState(false)

  const { loading, error, data } = useQuery(
    SINGLE_SUBSCRIPTIONPLAN_QUERY, {
    variables: { where: { id: id } }
  })
  // console.log(data);

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  const { name, photo, image, price, description, status, categories, tags } = data.subscriptionPlan

// console.log(image);

  return (<>

    <Head>
      <title> {name} | {SITE_TITLE} </title>
    </Head>

    <StyledProductSingle data-testid='singleProduct'>
      <aside>
        <picture className="img-frame">
          <ImageDynamic photoIn={ {url: image, altText: 'subscription image'}}/>
          
        </picture>
      </aside>

      <div className="content">
        <div className="details">
          <h2>{name}</h2>

          <ul>
            <li><span className="price"> {moneyFormatter(price)} </span> / month</li>
            <li><span>status: {status}</span></li>
          </ul>

          <p className='description'>{description}</p>
        </div>

        <button onClick={() => setIsPopup(!isPopup)}> Start Subscription </button>
        
        <Link href={{ pathname: '/shop/subscriptionplan/update', query: { id: id }, }}> Edit ✏️ </Link>

        <footer>

          <h5>Categories: </h5>
          <CategoriesPool categories={categories} />

          <h5>Tags:</h5>
          <TagsPool tags={tags} />

        </footer>

      </div>

    </StyledProductSingle>

    <PopupAnim isPopup={isPopup} setIsPopup={setIsPopup}>

      <StyledCheckoutForm>
        <h2>Subscription: </h2>
        <h4> {name} </h4>
        <ul>
          <li> <span className="price"> {moneyFormatter(price)} </span> / month </li>
        </ul>

        <SubscriptionItemForm planId={id}/>

        <CheckoutForm />

      </StyledCheckoutForm>

    </PopupAnim>
  </>)
}

const StyledCheckoutForm = styled.div`
  h2{
    font-size: 1rem;
    margin-bottom: .5rem;
    color: var(--c-accent);
  }
  h4{
    margin-top: 0;
  }
  ul{
    padding: 0;
    list-style: none;
  }

  .price{
    font-weight: bolder;
  }
`

export const SINGLE_SUBSCRIPTIONPLAN_QUERY = gql`
  query Query($where: SubscriptionPlanWhereUniqueInput!) {
    subscriptionPlan(where: $where) {
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
      image
      photo {
        url
        id
      }
      description
      price
      slug
      status
      stockCount
      tags {
        id
        name
      }
    }
  }
`

const StyledProductSingle = styled.article`
  position: relative;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  max-width: var(--maxWidth);
  align-items: start;
  gap: 2em;

  picture{
    overflow: auto;
    display: grid;
    grid-template-rows: minmax(0,1fr) auto;
    resize: both;
    /* border: 2px dashed var(--c-accent); */
    
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: 50% 0;
    }
  }

  .description{
    padding: 1rem 2rem;
    transform: translateX(-2rem);
    backdrop-filter: contrast(80%) blur(3px);
    border-radius: var(--br-sharp);
  }

  ul{
    padding: 0;
    list-style: none;
  }

  .price{
    font-size: 2rem;
    font-weight: bolder;
  }

`