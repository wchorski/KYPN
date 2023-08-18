import Link from "next/link"
import styled from "styled-components"


export function TagsPool({ tags }: any) {
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

  a.tag{
    background-color: #c5c5c5;
    color: var(--c-txt-rev);
    text-decoration: none;

    border-radius: var(--br-soft);
    padding: 0 1em;
    margin-right: .3rem;
    font-size: .7rem;
    transition: all .3s;

    &:hover{
      background-color: var(--c-primary);
    }
  }
`