import Link from "next/link"
import styled from "styled-components"

type Props = {
  categories: {
    id:string,
    name:string,
  }[]
}

export function CategoriesPool({ categories }:Props) {
  return (
    <StyledCatsPool>
      {categories.map((c: any) => (
        <Link key={c.name} className='cat' href={`/categories/${c.name}`} >{c.name}</Link>
      ))}
    </StyledCatsPool>
  )
}

const StyledCatsPool = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .3rem;
  margin-bottom: 1em;

  a.cat{
    background-color: #c5c5c5;
    color: var(--c-txt-rev);
    text-decoration: none;
    border: solid 1px var(--c-primary);

    border-radius: var(--br-sharp);
    padding: 0 1em;
    font-size: .7rem;
    transition: all .3s;

    &:hover{
      color: var(--c-primary);
    }
  }
`