import LoginForm from "../../components/menus/LoginForm";
import RegisterForm from "../../components/menus/RegisterForm";

export default function LoginPage() {
  return (
    <section>
      <div className="container" >
        <div 
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '1rem',
            margin: '1rem auto',
          }}
        >
          <LoginForm />
          <br />

          <RegisterForm />
          <br />
          
        </div>
      </div>
    </section>
  )
}
