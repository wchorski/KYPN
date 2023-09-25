import { TbCircleDotted } from "react-icons/tb";
import styled from "styled-components";

export function NoData() {
  return (
    <StyledNoData>
      <TbCircleDotted />
      <p className="message"> no data available </p>
    </StyledNoData>
  )
}


const StyledNoData = styled.span`
  background: var(--c-light);
  background: linear-gradient(90deg, rgba(0,0,0,0) 0%, var(--c-light) 18%, var(--c-light) 84%, rgba(0,0,0,0) 100%);
  color: var(--c-desaturated);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: .7;

  svg{
    margin-right: 1rem;
  }
`
