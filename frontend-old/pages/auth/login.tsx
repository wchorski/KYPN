import LoginForm from "../../components/menus/LoginForm";
import { QueryLoading } from "../../components/menus/QueryLoading";
import RegisterForm from "../../components/menus/RegisterForm";
import styled from 'styled-components'

export default function LoginPage() {
  return (
    <section>
      <div className="container" >
        <StyledLoginWrap>

          <LoginForm />
 
          <RegisterForm />
         
        </StyledLoginWrap>
      </div>
    </section>
  )
}


const StyledLoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem auto;

  @media screen and (width > 600px){
    flex-direction: row;
  }
`