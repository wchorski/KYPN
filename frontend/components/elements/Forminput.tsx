// cred - https://github.com/safak/youtube/blob/react-form/src/components/FormInput.jsx

import { useState } from "react";
import styled from "styled-components";


type SelectOpt = {
  label:string,
  value:string,
  isSelected:boolean,
}

type Props = {
  label?:string,
  errorMessage?:string,
  onChange?:any,
  id?:number,
  hint?:string,
  isDisabled?:boolean,
  selectOpt?:SelectOpt,
  name:string,
}

export const FormInput = (props:any) => {
  // todo type this shit
  const {  label, errorMessage, onChange, id, hint, isDisabled, className, ...inputProps }:any = props;

  const [focused, setFocused] = useState(false);

  const handleFocus = (e: React.FormEvent) => {
    setFocused(true);
  };

  if(inputProps.type === 'textarea') return (
    <StyledInputLabel htmlFor={inputProps.name}>
      <span className="label">{label}</span>
      <textarea {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()} />
    </StyledInputLabel>
  )

  if(inputProps.type === 'select') return (
    <StyledInputLabel htmlFor={inputProps.name}>
      <span className="label">{label} </span>
      <select 
        {...inputProps}
        // onChange={handleChange}
        onChange={onChange}
        defaultValue={{value: 'hehehe', label: 'hahah'}}
        // value={value}
        disabled={isDisabled}
      >
        <option key={0} value={''}> -- Select a {label} -- </option>
        {inputProps.options.map((opt:SelectOpt, i:number) => (
          <option key={i+1} value={opt.value} > {opt.label} </option>
        ))}
      </select>
    </StyledInputLabel>
  )

  // if(inputProps.type === 'checkbox') console.log(inputProps);
  
  if(inputProps.type === 'checkbox') return (
    <label htmlFor={inputProps.name}>
      <input 
        {...inputProps}
        type="checkbox" 
        name={inputProps.name} 
        // value={value}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  )

  // ? for any other input type
  return (
    <StyledInputLabel className={`formInput ${className}`} htmlFor={inputProps.name}>
      <span className="label"> {label} </span>
      <input
        {...inputProps}
        // value={value}
        onChange={onChange}
        onBlur={handleFocus}
        disabled={isDisabled}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className="tooltip error">{errorMessage}</span>
      <span className="tooltip hint">{hint}</span>
    </StyledInputLabel>
  )
};



const StyledInputLabel = styled.label`
  font-size: 1rem;
  /* color: var(--c-desaturated); */
  margin-bottom: 0;
  position: relative;

  .formInput{
    display: flex;
    /* flex-direction: column; */
    width: 280px;
  }

  &:has(input:hover, input:focus){
    span.label{
      background-color: var(--c-accent);
      color: var(--c-dark);
    }

    input{
      border: solid var(--c-accent) 1px;
    }
  }

  input{
    padding: 15px;
    margin: 10px 0px;
    border-radius: 5px;
    border: 1px solid gray;


    /* &:hover, &:focus{
      border: solid var(--c-accent) 1px;
    } */
  }

  /* fixes slight offset with other inputs */
  input[type=date]{
    padding: 16px;
  }

  select{
    padding: 1em;
    margin-top: 1em;
  }

  /* input, select {
    max-width: 20rem;
  } */
  label{
    display: block;
  }
  
  span.label{
    background-color: var(--c-primary);
    color: var(--c-label);
    border-radius: var(--br-sharp);
    font-size: .8rem;
    padding: 0 8px;
    /* display: block; */
    position: absolute;
    white-space: nowrap;
    z-index: 1;
    
    left: 5px;
    transform: translateY(40%);
    transition: all .3s;
    
  }

  span.tooltip {
    font-size: 12px;
    /* padding: 3px; */
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

    &:empty{
      padding: 0;
    }
  }

  input:invalid:not(:placeholder-shown):focus{
    border: 1px solid red;
  }

  input:invalid:not(:placeholder-shown):focus ~ span{
    max-height: 30px;
  }

  textarea{
    min-height: 10em;
    padding: 2em 1em;
  }

  &.hidden{
    /* visibility: hidden; */
    display: none;
  }
`

