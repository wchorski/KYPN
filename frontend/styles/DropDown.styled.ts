// @ts-nocheck
import styled, { keyframes } from 'styled-components';

export const StyledDropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 999999;
  border: 1px solid var(--c-accent);

  ul{
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: var(--c-txt-rev);
    z-index: 9999999;
  }

`;

export const StyledDropDownItem = styled.li`
  border-bottom: 1px solid grey;
  background: ${(props) => (props.highlighted ? 'whitesmoke' : 'white')};

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  ${(props) => (props.highlighted ? 'padding-left: 2rem;' : null)};
  transition: all 0.2s;
  /* border-left: 10px solid white; */
  ${(props) => (props.highlighted ? 'border-left: 10px solid var(--c-accent);' : '')} 
  padding: 1rem;
  color: var(--c-txt-rev);
  
  /* div.meta{
    margin-left: 2em;
  } */

  a{
    /* display: flex; */
    align-items: center;
  }


  img {
    margin-right: 10px;
  }

  h5{
    margin: 0;
    color: var(--c-txt-rev);
  }

  p.description{
    text-decoration: none;
    color: var(--c-txt-rev);
    font-size: 1rem;
  }

  .edit-button-cont{
    margin: 0 1em 0 auto;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

export const StyledSearch = styled.div`
  /* position: absolute; */
  top: 0;
  left: 0;
  /* background-color: darkcyan; */
  /* padding: 1em; */
  height: 0em;
  overflow: hidden;
  transition: all 0.5s;

  &.open{
    height: 3em;
    overflow: initial;
  }

  .input-cont{

    button{
      padding: 1em;
    }
  }

  input {
    width: 100%;
    padding: 10px;
    border: 0;
    font-size: 1rem;

    transition: all 1s;

    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }

  /* ul{
    opacity: .3;
    pointer-events: none;
  } */

  &:has(input:focus){
    
    ul{
      opacity: 1;
      pointer-events: all;
      box-shadow: #00000022 3px 3px 3px 10px;
    }
  }
`
