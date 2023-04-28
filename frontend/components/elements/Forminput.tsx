// cred - https://github.com/safak/youtube/blob/react-form/src/components/FormInput.jsx

import { useState } from "react";
import styled from "styled-components";

export const FormInput = (props:any) => {
  const { label, errorMessage, onChange, id, hint, ...inputProps } = props;

  const [focused, setFocused] = useState(false);

  const handleFocus = (e: React.FormEvent) => {
    setFocused(true);
  };

  if(inputProps.type === 'textarea') return (
    <label htmlFor="notes">
      {label}
      <textarea {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}/>
    </label>
  )

  if(inputProps.type === 'select') return (
    <StyledInputLabel htmlFor={inputProps.name}>
      {label}
      <select 
        {...inputProps}
        // onChange={handleChange}
        onChange={onChange}
      >
        <option key={0} value={''}> -- Select a {label} -- </option>
        {inputProps.options.map((opt: any, i:number) => (
          <option key={i+1} value={opt.value}> {opt.label} </option>
        ))}
      </select>
    </StyledInputLabel>
  )

  return (
    <StyledInputLabel className="formInput" htmlFor={inputProps.name}>
      {label}
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className="error">{errorMessage}</span>
      <span className="hint">{hint}</span>
    </StyledInputLabel>
  )
};

const StyledInputLabel = styled.label`
  font-size: 1rem;
  color: gray;
  margin-bottom: 0;

  .formInput{
    display: flex;
    flex-direction: column;
    width: 280px;
  }

  input{
    padding: 15px;
    margin: 10px 0px;
    border-radius: 5px;
    border: 1px solid gray;
  }
  

  span{
    font-size: 12px;
    padding: 3px;
    display: block;

    transition: all .3s;
    max-height: 0;
    overflow: hidden;
    
    &.error{
      color: red;
      /* display: none; */
    }

    &.hint{
      color: #858585;
    }
  }

  input:invalid[focused="true"]{
    border: 1px solid red;
  }

  input:invalid[focused="true"] ~ span{
    /* display: block; */
    max-height: 30px;
  }
`

