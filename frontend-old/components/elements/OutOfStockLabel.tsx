import styled from "styled-components"

export function OutOfStockLabel() {
  return (
    <StyledOutOfStock>
      Out of Stock
    </StyledOutOfStock>
  )
}

const StyledOutOfStock = styled.span`
  padding: 2rem;
  background-color: white;
  color: black;
  opacity: .9;
  position: absolute;
  top: 25%;
  width: 103%;
  left: -.5rem;
  text-align: center;
  transform: skew(0deg, 2deg);
  box-shadow: var(--boxs-1);
`