import styled from "styled-components";

export const StyledCartItem = styled.li`
  padding: 1em 0;
  border-bottom: 1px solid var(--c-1);
  display: grid;
  grid-template-columns: auto 1fr auto;

  img{
    margin-right: 1rem;
    width: 50px;
    height: auto;
    object-fit: contain;
  }

  h3, p{
    margin: 0;
  }

  em{
    font-size: 1rem;
  }
`