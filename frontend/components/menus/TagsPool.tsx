import Link from "next/link"
import styled from "styled-components"

type Props = {
  tags: {
    id:string,
    name:string,
  }[]
}

export function TagsPool({ tags }:Props) {
  return (
    <StyledTagsPool>
      {tags.map((t: any) => (
        <Link key={t.name} className='tag' href={`/tag/${t.name}`} >{t.name}</Link>
      ))}
    </StyledTagsPool>
  )
}

const StyledTagsPool = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .3rem;

  a.tag{
    background-color: #c5c5c5;
    color: var(--c-txt-rev);
    text-decoration: none;

    border-radius: var(--br-soft);
    padding: 0 1em;
    font-size: .7rem;
    transition: all .3s;

    &:hover{
      background-color: var(--c-primary);
    }
  }
`