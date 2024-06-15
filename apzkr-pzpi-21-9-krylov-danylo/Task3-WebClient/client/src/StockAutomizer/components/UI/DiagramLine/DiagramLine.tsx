import React from "react";
import { IPosition } from "../../../../interfaces/IPosition";
import cl from "./DiagramLine.module.css";
import { ILineConnection } from "../../DiagramConnections/DiagramConnections";

interface IProps {
  lineConnection: ILineConnection;
}

export const DiagramLine = ({ lineConnection }: IProps) => {
  return (
    <>
      <path
        className={cl.line}
        d={`M ${lineConnection.start.start.x} ${lineConnection.start.start.y}
      L ${lineConnection.start.end.x} ${lineConnection.start.end.y}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      ></path>
      <path
        className={cl.line}
        d={`M ${lineConnection.middle.start.x} ${lineConnection.middle.start.y}
      L ${lineConnection.middle.end.x} ${lineConnection.middle.end.y}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      ></path>
      <path
        className={cl.line}
        d={`M ${lineConnection.end.start.x} ${lineConnection.end.start.y}
      L ${lineConnection.end.end.x} ${lineConnection.end.end.y}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      ></path>
    </>
  );
};
