import { useRouter } from "next/router";
import { UserSingle } from "../../components/user/UserSingle";

export default function UserById() {
  
  const router = useRouter()

  return (
    <>
      <UserSingle id={String(router.query.id)}/>
    </>
  )
}
