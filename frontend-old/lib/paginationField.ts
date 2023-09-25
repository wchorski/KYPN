import { QUERY_PRODUCTS_COUNT } from "../components/Pagination";

export default function paginationField() {

  return {
    keyArgs: false, //? tells Apollo we take care of everything

    read(exisiting = [], { args, cache }: any) {
      // console.log({exisiting, args, cache})
      const { skip, take } = args

      const data = cache.readQuery({ query: QUERY_PRODUCTS_COUNT })
      const count = data?.productsCount
      const currPage = skip / take + 1
      const pagesTotal = Math.ceil(count / take)

      const items = exisiting.slice(skip, skip + take).filter(x => x)
      if (items.length && items.length !== take && currPage === pagesTotal) return items

      if (items.length !== take) return false

      if (items.length) return items

      return false //? fallback

    },
    merge(existing: any, incoming: any, { args }: any) {
      const { skip, take } = args
      // runs when Apollo Client comes back from network with data
      const merged = existing ? existing.slice(0) : []

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip]
      }

      return merged
    }
  }
}