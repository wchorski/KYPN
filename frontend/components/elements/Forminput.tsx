// cred - https://github.com/safak/youtube/blob/react-form/src/components/FormInput.jsx

// import { useState } from "react";
import styles from '@styles/menus/input.module.scss'


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

  // const [focused, setFocused] = useState(false);

  // const handleFocus = (e: React.FormEvent) => {
  //   setFocused(true);
  // };

  if(inputProps.type === 'textarea') return (
    <label htmlFor={inputProps.name} className={styles.input} >
      <span className="label">{label}</span>
      <textarea 
        {...inputProps} 
        onChange={onChange} 
        // onBlur={handleFocus} 
        // focused={focused.toString()} 
      />
    </label>
  )

  if(inputProps.type === 'select') return (
    <label htmlFor={inputProps.name} className={styles.input} >
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
    </label>
  )

  // if(inputProps.type === 'checkbox') console.log(inputProps);
  
  if(inputProps.type === 'checkbox') return (
    <label htmlFor={inputProps.name} className={styles.input} >
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
    <label className={[styles.input, className].join(' ')} htmlFor={inputProps.name}>
      <span className="label"> {label} </span>
      <input
        {...inputProps}
        // value={value}
        onChange={onChange}
        disabled={isDisabled}
        // onFocus={() =>
        //   inputProps.name === "confirmPassword" && setFocused(true)
        // }
        // onBlur={handleFocus}
        // focused={focused.toString()}
      />
      <span className="tooltip error">{errorMessage}</span>
      <span className="tooltip hint">{hint}</span>
    </label>
  )
}

