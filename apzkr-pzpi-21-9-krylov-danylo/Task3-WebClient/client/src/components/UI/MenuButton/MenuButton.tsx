import React from "react";
import { MouseEvent } from "react";
import cl from "./MenuButton.module.css";

interface IProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void,
  size?: number,
}

export const MenuButton = ({ onClick, size = 15}: IProps) => {
  return (
    <button style={{width: size, height: size}} className={cl.button} onClick={onClick}>
      <div className={cl.dotContainer}>
        <span className={cl.dot}></span>
        <span className={cl.dot}></span>
        <span className={cl.dot}></span>
      </div>
    </button>
  );
};
