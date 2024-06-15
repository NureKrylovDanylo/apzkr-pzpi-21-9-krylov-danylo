import React, { ReactNode } from "react";
import cl from "./FormLayout.module.css";

interface IProps {
    onSubmit: () => Promise<void>,
    children: ReactNode
}

export const FormLayout = ({onSubmit, children}: IProps) => {
  return (
    <div className={cl.form}>
      <form onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};
