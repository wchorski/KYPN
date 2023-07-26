import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

export const StyledForm = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  /* background-color: rgba(var(--c-cont-light), 0.6); */
  backdrop-filter: blur(3px) contrast(70%);
  border-radius: 1em;
  /* border: 5px solid white; */
  padding: 1em;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 600;
  /* min-width: 25em; */
  max-width: 30em;
  /* margin: 1em auto; */


  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: .7rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: var(--c-accent);
    }

    border-radius: 3px;
    border: solid var(--c-3) 1px;
    box-shadow: #0000002b 2px 2px 8px;
  }
  button,
  input[type='submit'] {
    width: auto;
    background: var(--c-3);
    border-radius: var(--br-sharp);
    color: white;
    border: solid 2px transparent;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    transition: all .3s;

    &:hover, &:focus{
      background-color: var(--c-accent);
      border: solid 2px var(--c-3);
      color: var(--c-3);
    }
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        var(--c-accent) 0%,
        var(--c-desaturated) 50%,
        var(--c-3) 100%
      );
      margin-bottom: 1em;
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }

    &.radio-cont{
      display: flex;
      flex-direction: column;

      input[type='radio']{
        width: inherit;
      }
    }
  }

  button.forgot-password{
    background-color: transparent;
    font-size: .7rem;
    border: none;

    &:hover, &:focus{
      border: none;
    }
  }

  

  textarea{
    min-height: 10em;
  }

  .hidden{
    visibility: hidden;
    height: 0;
    display: none;
  }

  .error{
    background-color: red;
    padding: 0 1rem;
  }
`;

