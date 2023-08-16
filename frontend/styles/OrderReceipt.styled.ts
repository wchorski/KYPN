import styled from 'styled-components';

export const StyledOrderReceipt = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  padding: 2rem;
  border-top: 10px dashed var(--c-accent);
  & > p {
    display: grid;
    grid-template-columns: 1fr 5fr;
    margin: 0;
    border-bottom: 1px solid var(--offWhite);
    span {
      padding: 1rem;
      &:first-child {
        font-weight: 900;
        text-align: right;
      }
    }
  }
  .order-item {
    border-bottom: 1px solid var(--offWhite);
    display: grid;
    grid-template-columns: 300px 1fr;
    align-items: center;
    grid-gap: 2rem;
    margin: 2rem 0;
    padding-bottom: 2rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  ul{
    padding: 0;
  }

  table{
    td{
      padding: 1rem;
      background-color: var(--c-dark);
    }
  }
`
