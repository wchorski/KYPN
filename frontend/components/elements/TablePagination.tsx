import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

type Props = {
  currPage:number,
  setPage:Dispatch<SetStateAction<number>>,
  perPage:number,
  setPerPage:Dispatch<SetStateAction<number>>,
  dataCount:number,
}

export const TablePagination = ({currPage, setPage, dataCount, perPage, setPerPage}:Props) => {

  let numOfPages = Math.ceil(dataCount / perPage);
  let pages = [];
  for (let i = 1; i <= numOfPages; i++) {
    pages.push(i);
  }

  // for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  //     pages.push(i);
  // }

  return (
    <StyledPagination className='pagination'>
      <div className="buttons-cont">
        {pages.map(page => {
          return (
            <button
                key={page}
                onClick={() => setPage(page)}
                className={page == currPage ? "active" : ""}
              >
                {page}
            </button>
          );
        })}
      </div>

        <select name="perPage" 
          defaultValue={25}
          onChange={(e) => {setPerPage(Number(e.target.value)); setPage(1)}}
        >
          <option value="5"> 5 </option>
          <option value="10"> 10 </option>
          <option value="25"> 25 </option>
          <option value="50"> 50 </option>
          <option value="100"> 100 </option>
          <option value="99999" > *All </option>
        </select>
    </StyledPagination>
  );
};

const StyledPagination = styled.div`

  margin: 1em 0;
  display: flex;
  justify-content: space-between;

  .buttons-cont{
    display: flex;
    flex-wrap: wrap;
  }
  button{
    margin: 0 3px 3px 0;
    background: transparent;
    border: none;
    border-bottom: solid 1px var(--c-primary);
    opacity: .3;
    transition: all .3s;

    &:hover{
      border-bottom: solid 1px var(--c-2);
      opacity: 1;
    }
  }
  .active{
    border-bottom: solid 1px var(--c-accent);
    opacity: 1;
    color: var(--c-primary);
    /* background-color: var(--c-accent); */
  }

`