import React, { Dispatch, SetStateAction, useContext } from "react";
import { ContextMenuContext, DiagramContext } from "../../..";
import { Button } from "../../../components/UI/Button/Button";
import { ContextMenu } from "../../../components/UI/ContextMenu/ContextMenu";
import { CustomSelect } from "../../../components/UI/CustomSelect/CustomSelect";
import { DefaultInput } from "../../../components/UI/Input/DefaultInput";
import { Input } from "../../../components/UI/Input/Input";
import { useContextMenu } from "../../../hooks/useContextMenu";
import { UMLTableColumnDto } from "../../../interfaces/Dto/UMLTableColumnDto";
import { ISelect } from "../../../interfaces/ISelect";
import { UMLDiagram } from "../../../interfaces/Models/UMLDiagram";
import { UMLTable } from "../../../interfaces/Models/UMLTable";
import { UMLTableColumn } from "../../../interfaces/Models/UMLTableColumn";
import { columnDataTypes } from "../../../types/UMLColumnDataType";
import cl from "./TableItemInfo.module.css";
import contextStyle from "../../../components/UI/ContextMenu/ContextMenu.module.css";
import { MenuButton } from "../../../components/UI/MenuButton/MenuButton";

interface IProps {
  columns: UMLTableColumn[];
  table: UMLTable;
}

export const TableItemInfo = ({ columns, table }: IProps) => {
  const {showMenu, hideMenu} = useContext(ContextMenuContext)!;

  const selectItems: ISelect[] = columnDataTypes.map((type, index) => ({
    value: index.toString(),
    label: type,
  }));
  const { editColumn, addColumn, deleteColumn } = useContext(DiagramContext)!;

  const editColumnName = (column: UMLTableColumn, value: string) => {
    editColumn({ ...column, name: value });
  };

  const editColumnType = (column: UMLTableColumn, value: string) => {
    editColumn({ ...column, dataType: parseInt(value) });
  };

  const handleDeleteColumn = (columnId: string) => {
    deleteColumn(columnId);
    hideMenu();
  };

  const contextMenuChildren = (column: UMLTableColumn) => {
    return <div className={contextStyle.item} onClick={() => handleDeleteColumn(column.tableColumnId)}>
    Delete column
  </div>
  } 

  return (
    <div className={cl.content}>
      <div className={cl.items}>
        {columns.map((column) => (
          <div key={column.tableColumnId} className={cl.item}>
            <div className={cl.block}>
              <div className={cl.columnInfo}>
                <DefaultInput
                  value={column.name}
                  setValue={(val) => editColumnName(column, val)}
                  inputType="text"
                ></DefaultInput>
                <CustomSelect
                  items={selectItems}
                  value={column.dataType}
                  onChange={(value: string) => editColumnType(column, value)}
                ></CustomSelect>
              </div>
            </div>
            <div className={cl.block}>
              <MenuButton
                size={15}
                onClick={(e: any) => showMenu(e, contextMenuChildren(column))}
              ></MenuButton>
            </div>
          </div>
        ))}
        <div className={cl.addButton}>
          <Button type="button" onClick={() => addColumn(table.tableId)}>
            Add column
          </Button>
        </div>
      </div>
    </div>
  );
};
