// ! This is old keystone from Wes Bos

import { graphql } from "@keystone-6/core";
import { addToWes } from "./addToWes";

const gql = String.raw

export const extendGraphqlWES = graphQLSchemaExtension({
  typeDefs: gql`
    type Mutation {
      addToCart(productID: ID): CartItem
    } 
  `,

  resolvers: {
    Mutation: {
      addToWes,
    },
  }
})