import styled from 'styled-components';

export const StyledShoppingCart = styled.div`
  padding: 20px;
  position: relative;
  background: var(--c-desaturated);
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);


  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 90010;
  display: grid;
  grid-template-rows: auto 1fr auto;

  header {
    border-bottom: 5px solid black;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  footer {
    border-top: 2px dashed black;
    margin-top: 2rem;
    padding-top: 2rem;
    /* display: grid; */
    /* grid-template-columns: auto auto; */
    align-items: center;
    font-size: 3rem;
    font-weight: 900;
    p {
      margin: 0;
      font-size: 2rem;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow-y: auto;
  }

  button.close{
    position: absolute;
    top: 0;
    left: -13%;
    background-color: var(--c-desaturated);
    border: none;
    padding: 1rem;
    font-size: 2rem;
    transition: all .3s;
    transition-delay: .1s;
    transform: scaleX(0);
    transform-origin: center right;
    pointer-events: none;

    &:hover, &:focus{
      color: var(--c-txt);
    }
  }

  &.open{
    transform: translateX(0%);

    button.close{
      transform: scaleX(1);
      pointer-events: initial;
    }
  }
`;
