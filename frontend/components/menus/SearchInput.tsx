import styled from "styled-components"

export const SearchInput = () => {
  return (
    <StyledSearchCont>
      <input type="text" placeholder='search...'/>
      <button> search </button>
    </StyledSearchCont>
  )
}


const StyledSearchCont = styled.div`
  background-color: yellow;
  width: 100%;
  display: flex;

  input{
    width: 100%;
    padding: 1em;
  }
`