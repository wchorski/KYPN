import styled from 'styled-components';

export const StyledOrderItem = styled.li`
  list-style: none;

  /* a{} contains everything */
  a{
    padding: 2rem;
    box-shadow: var(--boxs-1);
    border: 1px solid var(--c-edge);
    border-radius: var(--br-1);
    /* display: flex; */
    /* justify-content: flex-start; */
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    transition: 1s;
    text-decoration: none;
    height: 10em;
    overflow: hidden;
  }

  h5 {
    border-bottom: 2px solid red;
    margin-top: 0;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }

  p{
    color: var(--c-txt);
  }

  .images {
    display: flex;
    flex-wrap: wrap;
    /* grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-top: 1rem; */

    img {
      object-fit: cover;
      height: 100px;
      width: 100px;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }


  .order-meta {
    text-align: right;
    margin-right: 1em;
    width: 8em;
    /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
    display: grid;
    grid-gap: 1rem;
    text-align: center;
    
    & > * {
      margin: 0;
      background: rgba(0, 0, 0, 0.03);
      padding: 1rem 0;
    }
    strong {
      display: block;
      margin-bottom: 1rem;
    } */
  }
`
