import { LoadingAnim } from "@components/elements/LoadingAnim"

type Props = {
  prop:string
}

export default function ShopLoading ({ prop }:Props) {
  return (
    <div>
      loading app...
      <LoadingAnim />
    </div>
  )
}