import React, {
  LegacyRef,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DiagramContext } from "../../../..";
import { useDimension } from "../../../../hooks/useDimension";
import { usePosition } from "../../../../hooks/usePosition";
import { IDimension } from "../../../../interfaces/IDimension";
import { IPosition } from "../../../../interfaces/IPosition";
import { UMLTable } from "../../../../interfaces/Models/UMLTable";
import { columnDataTypes } from "../../../../types/UMLColumnDataType";
import cl from "./DiagramTable.module.css";

interface IProps {
  table: UMLTable;
  areaDemension: IDimension;
}

export const DiagramTable = ({ table, areaDemension}: IProps) => {
  const { changeTablePosition, updateTableDimensions} = useContext(DiagramContext)!;
  const tableRef = useRef<HTMLDivElement>(null);
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    setAreaDemension,
    position,
  } = usePosition({
    elementPosition: { x: table.position.x, y: table.position.y },
    onMove: () => changeTablePosition(table.tableId, position),
    elementRef: tableRef
  });

  useEffect(() => {
    setAreaDemension(areaDemension);
  }, [areaDemension]);

  useEffect(() => {
    if (tableRef?.current) {
      updateTableDimensions(table.tableId, {width: tableRef.current?.offsetWidth, height: tableRef.current?.offsetHeight})
    }
  }, [tableRef.current?.offsetHeight])

  return (
    <div
      className={cl.container}
      ref={tableRef}
      style={{ top: position.y, left: position.x }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <header className={cl.header}>
        <div className={cl.color}></div>
        <div className={cl.title}>
          <span>{table.name}</span>
        </div>
      </header>
      <div className={cl.content}>
        <div className={cl.items}>
          {table.columns.map((column) => (
            <div className={cl.item} key={column.tableColumnId}>
              <div className={cl.name}>
                <span>{column.name}</span>
              </div>
              <div className={cl.type}>
                <span>{columnDataTypes[column.dataType]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
