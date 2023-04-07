import PasswordResetForm from "../components/menus/PasswordResetForm"
import PasswordReset from "../components/menus/PasswordResetRequest"
import { useRouter } from "next/router"


export default function ResetPage() {

  const { query } = useRouter()

  if (!query.token) return (
    <div>
      <PasswordReset />
    </div>
  )

  return (
    <div>
      <PasswordResetForm token={query.token} />
    </div>
  )
}
