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
import { SubscriptionItemForm, SubscriptionItemFormStripe } from './SubscriptionItemForm';
import { LoadingAnim } from '../elements/LoadingAnim';
import StatusMessage from '../elements/StatusMessage';
import { OutOfStockLabel } from '../elements/OutOfStockLabel';

const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE
let formStateInit:'success'|'failure'|undefined = undefined

export function SubscriptionPlanSingle({ id }: any) {

  const [isPopup, setIsPopup] = useState(false)
  const [isOtherPayment, setIsOtherPayment] = useState(false)
  const [formState, setFormState] = useState(formStateInit)

  const { loading, error, data } = useQuery(
    SINGLE_SUBSCRIPTIONPLAN_QUERY, {
    variables: { where: { id: id } }
  })
  // console.log(data);

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />
  if(!data.subscriptionPlan) return <p> no data found </p>
  const { name, photo, image, price, description, status, categories, tags } = data.subscriptionPlan


  return (<>

    <Head>
      <title> {name} | {SITE_TITLE} </title>
    </Head>

    <StyledProductSingle data-testid='singleProduct'>
      {data.subscriptionPlan.length <= 0 && (
        <h2> No Products Available </h2>
      )}
      <aside>
        {status === 'OUT_OF_STOCK' && <OutOfStockLabel /> }

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

        <button onClick={() => setIsPopup(!isPopup)}> Subscribe </button>
        
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

      <StyledCheckoutCard>
        <h2>Subscription: </h2>
        <h4> {name} </h4>
        
        <ul>
          <li>
            <span className="price"> {moneyFormatter(price)} </span> 
            <small> / month </small> 
          </li>
        </ul>

        {!formState && (<>
          <div className="payment-choice-cont">
            <button 
              className={isOtherPayment ? 'left' : 'active left'}
              onClick={() => setIsOtherPayment(false)}  
            > Payment on File </button>
            <button 
              className={isOtherPayment ? 'active right' : 'right'}
              onClick={() => setIsOtherPayment(true)}  
            > Other Payment Options </button>
          </div>
          
          <div className={isOtherPayment ? 'form-cont' : 'active form-cont'}>
            <SubscriptionItemForm planId={id} setFormState={setFormState}/>
          </div>
          <br />

          <div className={isOtherPayment ? 'active form-cont' : 'form-cont'}>
            <SubscriptionItemFormStripe planId={id} setFormState={setFormState}/>
          </div>
          <br />
        </>)}

        {formState === 'success' && (<>
          <StatusMessage  status={formState} message={'subscription successful'}>
            <Link href={`/account`}> My Account </Link>
          </StatusMessage>
        </>)}

        {formState === 'failure' && (<>
          <p> subscription failure, refresh the page and try again </p>
        </>)}


      </StyledCheckoutCard>

    </PopupAnim>
  </>)
}

const StyledCheckoutCard = styled.div`
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

  .payment-choice-cont{
    display: flex;
    justify-content: center;
    padding: 1rem;

    button{
      padding: 1rem;

      &.active{
        background-color: var(--c-accent);
      }
    }

    button.left{
      border-radius: 10px 0 0 10px;
    }
    button.right{
      border-radius: 0 10px 10px 0;
    }
  }

  .form-cont{
    opacity: .2;
    pointer-events: none;
    transition: all .5s;

    &.active{
      pointer-events: all;
      opacity: 1;
    }
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
      stockMax
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

  aside{
    position: relative;
  }

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