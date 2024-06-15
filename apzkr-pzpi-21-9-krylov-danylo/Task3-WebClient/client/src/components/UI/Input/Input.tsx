import React from 'react'
import { Control, Controller, FieldValues, Path, RegisterOptions, UseControllerProps } from 'react-hook-form'
import cl from './Input.module.css';

interface IProps <T extends FieldValues, TName extends Path<T>> extends UseControllerProps<T, TName> {
  inputType: InputType,
  label?: string
  errorMessage?: string
}

export type InputType = "password" | "text" | "number";

export const Input = <T extends FieldValues, TName extends Path<T>>({ control, inputType, name, rules, label, errorMessage }: IProps<T, TName>) => {
return (
  <div className={cl.content}>
    {label && <label>{label}</label>}
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }:any) => (
        <input type={inputType} {...field}></input>
      )}
    ></Controller>
    <p className={cl.errorMessage}>{errorMessage}</p>
  </div>
)
}