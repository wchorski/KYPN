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


const StyledNoData = styled.div`
  background-color: var(--c-light);
  color: var(--c-desaturated);
  display: flex;
  align-items: center;
  justify-content: center;

  svg{
    margin-right: 1rem;
  }
`
