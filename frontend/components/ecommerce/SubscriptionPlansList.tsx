import Image from 'next/image';
import Link from 'next/link';
import { ProductThumbnail } from "../ProductThumbnail";
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components';
import { QueryLoading } from '../menus/QueryLoading';
import { QueryError } from '../menus/QueryError';
import { perPage } from '../../config';
import { SubscriptionPlan } from '../../lib/types';
import { SubscriptionThumbnail } from './SubscriptionThumbnail';

type ProdProps = {
  page: number
}

export function SubscriptionPlansList({ page }: ProdProps) {
  // const { loading, error, data } = useQuery(GET_ALL_PRODUCTS)
  const { loading, error, data } = useQuery(GET_ALL_SUBSCRIPTIONPLANS, {
    variables: {
      skip: page * perPage - perPage,
      take: perPage
    }
  })

  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />
  // console.log({ data });

  const { subscriptionPlans } = data

  return (
    <StyledProductsList>
      {subscriptionPlans.length <= 0 && (
        <h2> No Subscription Plans Available </h2>
      )}
      {subscriptionPlans.map((item: any) => {
        // console.log(prod);

        if(item.status === 'DRAFT') return null

        return (
          <li key={item.id}>
            <SubscriptionThumbnail item={item}/>
          </li>
        );
      })}
    </StyledProductsList>
  )
}


const StyledProductsList = styled.ul`
  /* display: grid; */
  /* grid-template-columns: 1fr 1fr; */
  /* grid-gap: 60px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;

  > li{
    background-color: var(--c-desaturated);
    /* padding: .3em; */
    box-shadow: #0000004d 2px 2px 8px;
    margin: 1em;
    width: 20em;
  }

  img.featured{
    width: 100%;
    height: auto;
  }
`

export const GET_ALL_SUBSCRIPTIONPLANS = gql`
  query Query($skip: Int!, $take: Int)  {
    subscriptionPlans(skip: $skip, take: $take)  {
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
      description {
        document(hydrateRelationships: true)
      }
      billing_interval
      image
      photo {
        url
        id
      }
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
