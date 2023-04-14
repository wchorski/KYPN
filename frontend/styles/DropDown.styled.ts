// @ts-nocheck
import styled, { keyframes } from 'styled-components';

export const StyledDropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 999999;
  border: 1px solid var(--lightGray);

  ul{
    list-style: none;
    margin: 0;
    padding: 0;
    box-shadow: #00000022 3px 3px 3px 10px;
    background-color: var(--c-txt-rev);
    z-index: 9999999;
  }

`;

export const StyledDropDownItem = styled.li`
  border-bottom: 1px solid grey;
  background: ${(props) => (props.highlighted ? 'whitesmoke' : 'white')};

  a{
    padding: 1rem;
    transition: all 0.2s;
    ${(props) => (props.highlighted ? 'padding-left: 2rem;' : null)};
    display: flex;
    align-items: center;
    border-left: 10px solid
    ${(props) => (props.highlighted ? props.theme.lightgrey : 'white')};
  }


  img {
    margin-right: 10px;
  }

  h5{
    margin: 0;
  }

  p.description{
    text-decoration: none;
    color: var(--c-txt);
    font-size: 1rem;
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
  position: relative;
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
    font-size: 2rem;

    transition: all 1s;

    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`
