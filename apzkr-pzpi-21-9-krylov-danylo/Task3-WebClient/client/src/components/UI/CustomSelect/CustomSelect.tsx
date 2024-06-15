import React from "react";
import { ISelect } from "../../../interfaces/ISelect";
import cl from "./CustomSelect.module.css";

interface IProps {
  items: ISelect[];
  onChange: (value: string) => void,
  value?:any
}

export const CustomSelect = ({ items, onChange, value}: IProps) => {
  return (
    <select className={cl.select} value={value} onChange={(e) => onChange(e.target.value)}>
      {items.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};
