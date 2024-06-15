import React, {
  Dispatch,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Control, FieldValues, useFieldArray } from "react-hook-form";
import { Arrow } from "../../../components/UI/Arrow/Arrow";
import { MenuButton } from "../../../components/UI/MenuButton/MenuButton";
import { UMLDiagram } from "../../../interfaces/Models/UMLDiagram";
import { UMLTable } from "../../../interfaces/Models/UMLTable";
import { TableItemInfo } from "../TableItemInfo/TableItemInfo";
import cl from "./TableListItem.module.css";
import CSSTransition from "react-transition-group";
import { DefaultInput } from "../../../components/UI/Input/DefaultInput";
import { ContextMenu } from "../../../components/UI/ContextMenu/ContextMenu";
import { useContextMenu } from "../../../hooks/useContextMenu";
import contextStyle from "../../../components/UI/ContextMenu/ContextMenu.module.css";
import { ContextMenuContext, DiagramContext } from "../../..";
import { Button } from "../../../components/UI/Button/Button";

interface IProps {
  table: UMLTable;
  isOpen: boolean;
  toggleTable: (tableId: string) => void;
}

export const TableListItem = ({ table, isOpen, toggleTable }: IProps) => {
  const [nameEditionOpen, setNameEditionOpen] = useState<boolean>(false);
  const { addColumn, deleteTable, editTableName } = useContext(DiagramContext)!;
  const { showMenu, hideMenu } = useContext(ContextMenuContext)!;

  const toggleNameEdition = () => {
    setNameEditionOpen(!nameEditionOpen);
    hideMenu();
  };

  const handleDeleteTable = () => {
    deleteTable(table.tableId);
    hideMenu();
  };

  const handleAddColumn = () => {
    addColumn(table.tableId);
    hideMenu();
  };

  const contextMenuChildren = () => {
    return <>
        <div className={contextStyle.item} onClick={toggleNameEdition}>
          Edit table name
        </div>
        <div className={contextStyle.item} onClick={handleAddColumn}>
          Add column
        </div>
        <div className={contextStyle.item} onClick={handleDeleteTable}>
          Delete table
        </div>
      </>
  };

  return (
    <div>
      <li
        className={cl.item}
        onClick={() => toggleTable(table.tableId)}
        onContextMenu={(e: any) => showMenu(e, contextMenuChildren())}
      >
        <div className={cl.itemContent}>
          <div className={cl.block}>
            <div className={cl.color}></div>
            <Arrow size={15} active={isOpen} />
            {nameEditionOpen ? (
              <div
                className={cl.editionName}
                onClick={(e: any) => e.stopPropagation()}
              >
                <DefaultInput
                  inputType="text"
                  value={table.name}
                  setValue={(val) => editTableName(table.tableId, val)}
                ></DefaultInput>
                <Button type="button" onClick={toggleNameEdition}>
                  Close
                </Button>
              </div>
            ) : (
              <div className={cl.title}>{table.name}</div>
            )}
          </div>
          <div className={cl.block}>
            <MenuButton
              size={15}
              onClick={(e: any) => showMenu(e, contextMenuChildren())}
            ></MenuButton>
          </div>
        </div>
      </li>
      <div className={[cl.data, isOpen && cl.active].join(" ")}>
        <TableItemInfo columns={table.columns} table={table}></TableItemInfo>
      </div>
    </div>
  );
};
