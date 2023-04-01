import { graphql } from "@keystone-6/core";
import { Context } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema";

export const addToCart = graphql.extend(base => {


  return {
    mutation: {
      addToCart: graphql.field({
        type: base.object('CartItem'),
        args: { id: graphql.arg({ type: graphql.nonNull(graphql.ID) }) },
        resolve(source, { id }, context:Context) {
          return context.db.CartItem.updateOne({
            where: { id: '10bf2515-b0eb-4b41-9b65-98ba83176b40' },
            data: { quantity: 3 },
          })
        },
      }),
    },
  }
})