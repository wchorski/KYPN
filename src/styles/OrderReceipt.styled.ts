import styled from 'styled-components';

export const StyledOrderReceipt = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  padding: 2rem;
  
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

  ul.orderItems{
    padding: 0;
  }

  ul.orderItems > li {
    border-bottom: 1px solid var(--offWhite);
    display: flex;
    /* grid-template-columns: 200px 1fr; */
    align-items: center;
    gap: 2rem;
    margin-bottom: .3rem;
    border-bottom: solid var(--c-accent) 1px;
    /* padding-bottom: 2rem; */
    img {
      width: 100px;
      height: 100%;
      object-fit: contain;
    }
  }

  table{
    border-bottom: 3px dashed var(--c-accent);

    td{
      padding: 1rem;
      background-color: var(--c-txt-cont);
    }
  }
`
