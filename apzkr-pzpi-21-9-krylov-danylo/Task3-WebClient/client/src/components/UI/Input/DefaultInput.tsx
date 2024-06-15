import React from "react";
import { InputType } from "./Input";
import cl from "./Input.module.css";

interface IProps {
  inputType: InputType;
  label?: string,
  value?: string,
  setValue: (val: string) => void
}

export const DefaultInput = ({inputType, label, value, setValue}: IProps) => {
    const onChange = (val: string) => {
        setValue(val);
    }

  return (
    <div className={cl.content}>
      {label && <label>{label}</label>}
      <input type={inputType} defaultValue={value} onChange={(e) => onChange(e.target.value)}></input>
    </div>
  );
};
