import LoginForm from "@components/menus/LoginForm";
import { QueryLoading } from "@components/menus/QueryLoading";
// import RegisterForm from "@components/menus/RegisterForm";
import styles from '@styles/menus/auth.module.scss'

export default function LoginPage() {
  return (
    <section>
      <div className="container" >
        <div className={styles.auth_wrap} >

          <LoginForm />
 
          {/* <RegisterForm /> */}
         
        </div>
      </div>
    </section>
  )
}


