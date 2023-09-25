import styled from "styled-components";

export const StyledPriceTag = styled.div`
  color: var(--c-txt);
  /* text-shadow: var(--c-dark) 1px 1px 3px; */
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 2rem;
  display: inline-block;

  sup {
    /* vertical-align: top; */
    font-size: 1.6rem;
    font-weight: lighter;
  }

  span.amount, .cents{
    font-weight: bold;
  }

  span.cents{
    font-size: 1.7rem;
  }
`

// export const StyledPriceTag = styled.span`
//   background: var(--c-primary);
//   transform: rotate(3deg);
//   color: white;
//   font-weight: 600;
//   padding: 5px;
//   line-height: 1;
//   font-size: 3rem;
//   display: inline-block;
//   position: absolute;
//   top: -3px;
//   right: -3px;
// `;