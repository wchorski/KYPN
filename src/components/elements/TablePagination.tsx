import { Dispatch, SetStateAction } from "react";
import styles from '@styles/blocs/tablepagination.module.scss'

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
    <div className={styles.pagination}>
      <div className={styles.buttons_wrap}>
        {pages.map(page => {
          return (
            <button
                key={page}
                onClick={() => setPage(page)}
                className={page == currPage ? styles.active : ""}
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
    </div>
  );
}