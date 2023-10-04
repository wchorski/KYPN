import { LoadingAnim } from "@components/elements/LoadingAnim"

type Props = {
  prop:string
}

export default function ShopLoading ({ prop }:Props) {
  return (
    <div>
      ShopLoading...
      <LoadingAnim />
    </div>
  )
}