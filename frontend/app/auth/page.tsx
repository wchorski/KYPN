import { Section } from "@components/layouts/Section";
import LoginForm from "@components/menus/LoginForm";
import { RegisterForm } from "@components/menus/RegisterForm";
// import RegisterForm from "@components/menus/RegisterForm";
import styles from '@styles/menus/auth.module.scss'

type Props = {
  searchParams: {
    state:'login'|'signout'|'reset'|'register'
  }
}

export default async function LoginPage({ searchParams }:Props) {

  const { state } = searchParams
  

  return (
    <Section layout={'1_1'}>

      <div>
        {state === 'signout' && <p className="success"> You are now signed out. See you again soon! </p>}
        <LoginForm />
      </div>

      <RegisterForm />
        
    </Section>
  )
}


