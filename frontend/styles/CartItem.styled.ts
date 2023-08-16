import styled from "styled-components";

export const StyledCartItem = styled.li`
  padding: 1em 0;
  border-bottom: 1px solid var(--c-accent);
  display: flex;
  justify-content: space-between;
  grid-template-columns: auto 1fr auto;
  background-color: var(--c-dark);
  border-radius: var(--br-dull);

  img{
    margin-inline: 1rem;
    width: 50px;
    height: auto;
    object-fit: contain;
  }

  h5, p{
    margin: 0;
  }

  em{
    font-size: 1rem;
  }

  h5{
    margin-right: auto;
  }

  .perItemTotal{
    padding: 0 1em;
  }

  input{
    text-align: right;
    width: 5em;
  }
`