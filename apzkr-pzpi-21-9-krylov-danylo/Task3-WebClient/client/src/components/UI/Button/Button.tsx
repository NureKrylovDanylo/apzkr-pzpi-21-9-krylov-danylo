import React, { MouseEvent, ReactNode } from 'react'
import cl from './Button.module.css';

interface IProps {
    children: ReactNode,
    type: ButtonType
    onClick?: () => void
}

type ButtonType = "submit" | "button";

export const Button = ({children, type, onClick}: IProps) => {
  return (
    <button className={cl.button} onClick={onClick} type={type}>{children}</button>
  )
}
