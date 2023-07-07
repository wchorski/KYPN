import styled from 'styled-components';

export const StyledPagination = styled.div`
  /* text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid var(--lightGray);
  border-radius: 10px;
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid var(--lightGray);
    &:last-child {
      border-right: 0;
    }
  } */

  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
  text-align: center;



  .count-cont{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: .7rem;
  }
  a[aria-disabled='true'] {
    color: var(--c-disabled);
    pointer-events: none;
  }
`
