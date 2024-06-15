import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
  MutableRefObject
} from "react";
import { DiagramContext } from "../../..";
import { Button } from "../../../components/UI/Button/Button";
import { useDimension } from "../../../hooks/useDimension";
import { IDimension } from "../../../interfaces/IDimension";
import { DiagramConnections } from "../DiagramConnections/DiagramConnections";
import { DiagramLine } from "../UI/DiagramLine/DiagramLine";
import { DiagramTable } from "../UI/DiagramTable/DiagramTable";
import cl from "./UmlView.module.css";

export const UmlView = () => {
  const { diagram, saveDiagram } = useContext(DiagramContext)!;
  const areaRef = useRef<HTMLDivElement>(null);
  const {dimensions} = useDimension({elementRef: areaRef});

  const handleSave = () => {
    saveDiagram();
  };

  return (
    <div className={cl.container}>
      <header className={cl.header}>
        <div className={cl.headerContent}>
          <div className={cl.block}>
            <div className={cl.name}>{diagram?.name}</div>
          </div>
          <div className={cl.block}>
            <div className={cl.saveButton}>
              <Button type="button" onClick={handleSave}>
                Save diagram
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className={cl.area} ref={areaRef}>
        <DiagramConnections></DiagramConnections>
        {diagram?.tables.map((table) => (
          <DiagramTable
            areaDemension={dimensions}
            table={table}
            key={table.tableId}
          />
        ))}
      </div>
    </div>
  );
};
