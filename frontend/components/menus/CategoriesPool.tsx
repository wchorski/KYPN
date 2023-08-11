import Link from "next/link"
import styled from "styled-components"


export function CategoriesPool({ categories }: any) {
  return (
    <StyledCatsPool>
      {categories.map((c: any) => (
        <Link key={c.name} className='cat' href={`/category/${c.name}`} >{c.name}</Link>
      ))}
    </StyledCatsPool>
  )
}

const StyledCatsPool = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1em;

  a.cat{
    background-color: #c5c5c5;
    color: var(--c-txt-rev);
    text-decoration: none;
    border: solid 1px var(--c-primary);

    border-radius: 50px;
    padding: 0 1em;
    margin-left: .2em;
    font-size: .7rem;
    transition: all .3s;

    &:hover{
      color: var(--c-primary);
    }
  }
`